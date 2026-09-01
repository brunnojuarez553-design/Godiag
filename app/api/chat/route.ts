import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
// Modelo conversacional (calidad de respuesta) y modelo de extracción (rápido/barato, JSON).
// Si Groq descontinúa el primero, se reintenta automáticamente con el siguiente de la lista.
const CHAT_MODELS = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "openai/gpt-oss-20b"];
const EXTRACT_MODEL = "llama-3.1-8b-instant";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `Sos el asistente virtual de Autotrónica Go Diag, un taller de electrónica automotriz en Caracas, Venezuela, a cargo del Ing. Elian González (ingeniero mecánico certificado, especialista en electrónica y diagnóstico automotriz).

TU PERSONALIDAD:
- Hablás como un venezolano cercano y profesional: natural, cálido, directo, sin sonar robótico ni like un formulario. Podés usar expresiones venezolanas suaves ("claro que sí", "dale", "listo", "con gusto", "pana") con moderación, sin exagerar.
- Nunca repitas un saludo de bienvenida más de una vez en la conversación.
- Escribís mensajes cortos, como de chat/WhatsApp real (2-4 frases como máximo por mensaje), no párrafos largos ni bullet points salvo que listar sea realmente necesario.
- Hacés UNA pregunta a la vez. Nunca presentás un formulario ni pedís todos los datos de una sola vez.
- Sos consultivo: primero entendés el problema o necesidad del cliente, explicás brevemente cómo Go Diag lo puede ayudar, y de forma natural vas conociendo: qué vehículo tiene (marca, modelo y año), qué le pasa o qué servicio necesita, y si prefiere traerlo al taller o que lo revisen a domicilio.
- Si el cliente ya dio un dato en un mensaje anterior, no se lo vuelvas a preguntar.
- Cuando ya tengas una idea clara del vehículo, el problema/servicio y la modalidad, avisale con naturalidad que ya podés conectarlo directo con el especialista por WhatsApp con toda esa info, para que no tenga que repetir nada.

INFORMACIÓN REAL DEL NEGOCIO (respondé SOLO con base en esto; no inventes precios, horarios ni datos que no estén acá):
- Nombre: Autotrónica Go Diag. Ubicación: Caracas, Venezuela. Filosofía: "No cambiamos piezas, encontramos la causa" — diagnóstico basado en evidencia (medición, interpretación, resolución) antes de reemplazar piezas a prueba y error.
- Especialista a cargo: Ing. Elian González, ingeniero mecánico con formación y certificaciones en electrónica y diagnóstico automotriz.
- Proceso de trabajo: 1) Recepción técnica del síntoma y antecedentes, 2) Pruebas y medición con escáner, osciloscopio y trazador, 3) Informe y recomendación de solución.
- Servicios que ofrecen:
  1. Diagnóstico electrónico: lectura avanzada, análisis de señales, en gasolina, diésel y eléctricos.
  2. Reparación de módulos: ECU, ABS, BCM, TIPM, tableros y clusters.
  3. Tuning y programación de ECU: calibración con HP Tuners, BitEdit y VFT Tuning, reprogramación profesional.
  4. Inyección EFI / GDI: entonación y prueba de inyectores, limpieza y descarbonización de válvulas.
  5. Electricidad y cableado: localización de fallas, reparación de cableado, trazado con osciloscopio.
  6. Diagnóstico diésel 12V/24V: vehículos livianos, camionetas y equipos pesados.
  7. Eliminación EGR (EGR OFF): anulación electrónica para aplicaciones permitidas, competición u off-road, según normativa local (aclará que depende de la normativa local si preguntan por esto).
- Experiencia multimarca: Toyota, Ford, Chevrolet, Mitsubishi, Jeep, Dodge, Chrysler, tanto gasolina como diésel y eléctricos, livianos y pesados (12V/24V).
- Modalidades disponibles: en el taller, a domicilio (diagnóstico a domicilio), o solo asesoramiento/orientación.
- Contacto: WhatsApp e Instagram (@godiag.ve). No des precios cerrados: la evaluación final del alcance y presupuesto la confirma el especialista revisando el caso.

LÍMITES:
- Si te preguntan algo que no está en esta información (precios exactos, horarios, disponibilidad de fecha, temas no automotrices, etc.), decilo con naturalidad y ofrecé conectar con el especialista por WhatsApp para confirmarlo, sin inventar datos.
- No sos un chatbot de soporte genérico: si la conversación se va de tema, redirigí amablemente hacia cómo Go Diag puede ayudar con el vehículo.`;

const EXTRACT_PROMPT = `Analizá la conversación entre el asistente virtual de Autotrónica Go Diag y un cliente. Devolvé EXCLUSIVAMENTE un JSON válido (sin texto adicional, sin markdown) con este esquema exacto:

{
  "nombre": string | null,
  "vehiculo": string | null,
  "servicio": string | null,
  "modalidad": string | null,
  "detalle": string | null,
  "listo": boolean
}

Reglas:
- "vehiculo": marca, modelo y año si los mencionó (aunque falte alguno, poné lo que haya).
- "servicio": el servicio o necesidad principal del cliente, en pocas palabras.
- "modalidad": "En el taller", "A domicilio" o "Asesoramiento" si se puede inferir; si no, null.
- "detalle": breve resumen (una frase) del problema o síntoma descrito.
- "nombre": solo si el cliente lo dijo explícitamente; si no, null.
- "listo": true SOLO si ya hay suficiente información sobre vehiculo, servicio y detalle como para que un especialista humano pueda continuar sin volver a preguntar lo básico. Si falta alguno de esos tres, "listo" debe ser false.
- No inventes datos que no estén en la conversación.`;

async function callGroq(apiKey: string, body: Record<string, unknown>) {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(`Groq API error ${res.status}: ${text}`) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  return res.json();
}

// Prueba el modelo principal y, si Groq lo devuelve como no disponible (decommissioned/404/400 de modelo),
// reintenta con los siguientes de la lista antes de rendirse.
async function callGroqChat(apiKey: string, messages: unknown[], temperature: number, max_tokens: number) {
  let lastError: unknown;
  for (const model of CHAT_MODELS) {
    try {
      return await callGroq(apiKey, { model, messages, temperature, max_tokens });
    } catch (e) {
      lastError = e;
      console.error(`Fallo el modelo ${model}:`, e);
    }
  }
  throw lastError;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GROQ_API_KEY no está configurada en el servidor." },
      { status: 500 }
    );
  }

  let payload: { messages?: ChatMessage[]; kickoff?: boolean };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Body inválido." }, { status: 400 });
  }

  const history = Array.isArray(payload.messages) ? payload.messages : [];
  const isKickoff = Boolean(payload.kickoff) && history.length === 0;

  const conversationMessages: ChatMessage[] = isKickoff
    ? [
        {
          role: "user",
          content:
            "(El cliente acaba de abrir el chat. Saludalo una sola vez, presentate brevemente como el asistente de Go Diag y preguntale en qué lo podés ayudar hoy con su vehículo. No hagas más de una pregunta.)",
        },
      ]
    : history.slice(-20);

  try {
    const chatCompletion = await callGroqChat(
      apiKey,
      [{ role: "system", content: SYSTEM_PROMPT }, ...conversationMessages],
      0.65,
      350
    );

    const reply: string =
      chatCompletion?.choices?.[0]?.message?.content?.trim() ||
      "Disculpá, se me trabó algo por acá. ¿Me contás de nuevo qué necesitás con tu vehículo?";

    let lead = null;
    if (!isKickoff) {
      try {
        const transcript = [...history, { role: "assistant", content: reply }]
          .map((m) => `${m.role === "user" ? "Cliente" : "Asistente"}: ${m.content}`)
          .join("\n");

        const extraction = await callGroq(apiKey, {
          model: EXTRACT_MODEL,
          messages: [
            { role: "system", content: EXTRACT_PROMPT },
            { role: "user", content: transcript },
          ],
          temperature: 0,
          max_tokens: 300,
          response_format: { type: "json_object" },
        });

        const raw = extraction?.choices?.[0]?.message?.content;
        if (raw) {
          const parsed = JSON.parse(raw);
          lead = {
            nombre: parsed.nombre ?? null,
            vehiculo: parsed.vehiculo ?? null,
            servicio: parsed.servicio ?? null,
            modalidad: parsed.modalidad ?? null,
            detalle: parsed.detalle ?? null,
            listo: Boolean(parsed.listo && parsed.vehiculo && parsed.servicio && parsed.detalle),
          };
        }
      } catch (e) {
        // Si la extracción falla, seguimos igual: el chat sigue andando, solo no se activa el botón premium todavía.
        console.error("Extraction error:", e);
      }
    }

    return NextResponse.json({ reply, lead });
  } catch (error) {
    console.error("Groq chat error:", error);
    return NextResponse.json(
      {
        error: "No pude responder en este momento.",
        reply:
          "Se me complicó la conexión justo ahora 😅. Escribinos directo por WhatsApp y el especialista te atiende enseguida.",
        lead: null,
        fallback: true,
      },
      { status: 200 }
    );
  }
}
