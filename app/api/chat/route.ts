import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const CHAT_MODEL = "openai/gpt-oss-120b";
const EXTRACT_MODEL = "openai/gpt-oss-20b";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `Sos el asistente virtual de Autotrónica Go Diagnosis, un negocio especializado en diagnóstico, programación y electrónica automotriz en Caracas, Venezuela, atendido directamente por Elian José González Cruz.

TU PERSONALIDAD:
- Hablás de forma cercana, profesional y natural, con tono venezolano suave, sin exagerar modismos.
- Nunca repetís un saludo de bienvenida más de una vez.
- Escribís mensajes cortos, como un chat real.
- Hacés una pregunta a la vez.
- Primero entendés el problema del cliente y luego pedís, de manera natural, marca, modelo, año y síntomas si todavía faltan.
- Si el cliente ya dio un dato, no lo volvés a pedir.
- Cuando haya información suficiente, ofrecé continuar por WhatsApp con la consulta ya preparada.

INFORMACIÓN REAL DEL NEGOCIO. RESPONDÉ SOLO CON BASE EN ESTOS DATOS:
- Nombre: Autotrónica Go Diagnosis.
- Responsable: Elian José González Cruz.
- Rubro: diagnóstico, programación y electrónica automotriz.
- Experiencia: 8 años en el rubro.
- Diferencial: preparación, capacitación y estudio continuo como principal herramienta para realizar trabajos de calidad y bien ejecutados.
- Ubicación: Caracas, Venezuela. Para llegar al taller debe usarse la ubicación oficial de Google Maps: https://maps.app.goo.gl/zRVeuJy12vhZv3WL6.
- Horario: lunes a viernes de 8:00 a 18:00; sábados de 9:00 a 15:00.
- WhatsApp: +58 422 287 2237.
- Email: godiag2023@gmail.com.
- Instagram: @godiag.ve.
- TikTok: @godiag.ve.
- YouTube: @autotronicagodiag.
- Modalidades de atención: en el taller o a domicilio. TODOS los servicios pueden coordinarse a domicilio, sujeto a coordinación previa de zona, vehículo y trabajo por WhatsApp.
- Servicios:
  1. Mantenimiento y diagnóstico general.
  2. Descontaminación y descarbonización de válvulas.
  3. Entonación, limpieza y prueba de inyectores EFI/GDI.
  4. Diagnóstico electrónico.
  5. Diagnóstico con osciloscopio y trazador de curvas.
  6. Reparación de cableado.
  7. Sistemas gasolina, diésel y eléctricos.
  8. Diagnóstico diésel 12V/24V.
  9. Reparación de ECU.
  10. Reparación de ABS.
  11. Reparación de BCM/TIPM.
  12. Reparación de tablero/cluster.
  13. EGR OFF Toyota, Corolla y otros modelos, sujeto a la aplicación y normativa correspondiente.
  14. Reprogramación y software con HP Tuners, BitEdit y VFTuner.
- Marcas destacadas: Toyota, Ford, Chevrolet, Mitsubishi, Jeep, Dodge y Chrysler.
- No hay precios publicados. El alcance y presupuesto se confirman luego de revisar cada caso.

LÍMITES:
- No inventes títulos profesionales, certificaciones, garantías, precios, disponibilidad, tiempos de reparación ni servicios no confirmados.
- Si te preguntan algo no cubierto por estos datos, explicá que Elian puede confirmarlo por WhatsApp.
- No des instrucciones peligrosas para puentear, anular o manipular sistemas críticos de seguridad del vehículo.
- Si preguntan por EGR OFF u otras modificaciones de emisiones, aclarar que depende de la normativa y aplicación correspondiente.`;

const EXTRACT_PROMPT = `Analizá la conversación entre el asistente de Autotrónica Go Diagnosis y un cliente. Devolvé EXCLUSIVAMENTE JSON válido con este esquema:
{
  "nombre": string | null,
  "vehiculo": string | null,
  "servicio": string | null,
  "modalidad": string | null,
  "detalle": string | null,
  "listo": boolean
}
Reglas:
- vehiculo: marca, modelo y año si fueron mencionados; guardá lo disponible.
- servicio: necesidad principal en pocas palabras.
- modalidad: usá "En el taller" o "A domicilio" según lo que el cliente indique; si todavía no lo dijo, null.
- detalle: resumen breve del síntoma o necesidad.
- nombre: solo si el cliente lo dijo.
- listo: true solo cuando hay suficiente información sobre vehículo, servicio y detalle para continuar por WhatsApp.
- No inventes datos.`;

async function callGroq(apiKey: string, body: Record<string, unknown>) {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Groq API error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function GET() {
  const apiKey = process.env.GROQ_API_KEY;
  return NextResponse.json({
    ok: Boolean(apiKey),
    groq_api_key_detectada: Boolean(apiKey),
    largo_de_la_key: apiKey ? apiKey.length : 0,
    modelo_chat: CHAT_MODEL,
    modelo_extraccion: EXTRACT_MODEL,
    nota: apiKey
      ? "La variable de entorno está llegando al servidor."
      : "GROQ_API_KEY no está llegando a este deployment. Configurala en Vercel y redeployá.",
  });
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      error: "GROQ_API_KEY no está configurada en el servidor.",
      debug: "missing_api_key",
      reply: "Ahora mismo no puedo conectarme. Escribinos directo por WhatsApp y te atendemos por ahí.",
      lead: { nombre: null, vehiculo: null, servicio: null, modalidad: null, detalle: null, listo: true },
      fallback: true,
    });
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
    ? [{ role: "user", content: "El cliente acaba de abrir el chat. Saludalo una sola vez, presentate brevemente como el asistente de Go Diagnosis y preguntale qué sucede con su vehículo. Hacé solo una pregunta." }]
    : history.slice(-20);

  try {
    const chatCompletion = await callGroq(apiKey, {
      model: CHAT_MODEL,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...conversationMessages],
      temperature: 0.65,
      max_tokens: 350,
      reasoning_effort: "low",
      include_reasoning: false,
    });

    const reply: string = chatCompletion?.choices?.[0]?.message?.content?.trim() || "Disculpá, se me trabó algo. ¿Me contás de nuevo qué necesitás con tu vehículo?";
    let lead = null;

    if (!isKickoff) {
      try {
        const transcript = [...history, { role: "assistant" as const, content: reply }]
          .map((m) => `${m.role === "user" ? "Cliente" : "Asistente"}: ${m.content}`)
          .join("\n");
        const extraction = await callGroq(apiKey, {
          model: EXTRACT_MODEL,
          messages: [{ role: "system", content: EXTRACT_PROMPT }, { role: "user", content: transcript }],
          temperature: 0,
          max_tokens: 300,
          reasoning_effort: "low",
          include_reasoning: false,
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
        console.error("Extraction error:", e);
      }
    }

    return NextResponse.json({ reply, lead });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Groq chat error:", message);
    return NextResponse.json({
      error: "No pude responder en este momento.",
      debug: message.slice(0, 400),
      reply: "Se me complicó la conexión. Escribinos directo por WhatsApp y seguimos por ahí.",
      lead: { nombre: null, vehiculo: null, servicio: null, modalidad: null, detalle: null, listo: true },
      fallback: true,
    });
  }
}
