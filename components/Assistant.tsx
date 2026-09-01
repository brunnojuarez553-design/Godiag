"use client";
import { useEffect, useRef, useState } from "react";
import { Send, X, Phone } from "lucide-react";

const whatsapp = "584222872237";
const logo =
  "https://res.cloudinary.com/dvvuwigmy/image/upload/v1788232533/IMG_1016_y4atye.jpg";

type Role = "user" | "assistant";
type Message = { role: Role; content: string };
type Lead = {
  nombre: string | null;
  vehiculo: string | null;
  servicio: string | null;
  modalidad: string | null;
  detalle: string | null;
  listo: boolean;
};

function buildWhatsappMessage(lead: Lead) {
  const lines = [
    "Hola Autotrónica Go Diag. Vengo del asistente virtual de la página, ya te dejo mis datos:",
    "",
    `Vehículo: ${lead.vehiculo || "A confirmar"}`,
    `Servicio: ${lead.servicio || "A confirmar"}`,
    `Modalidad: ${lead.modalidad || "A confirmar"}`,
    `Detalle / síntomas: ${lead.detalle || "Sin detalle"}`,
  ];
  if (lead.nombre) lines.push(`Nombre: ${lead.nombre}`);
  lines.push("", "(Consulta pre-cargada por el asistente virtual de la web)");
  return lines.join("\n");
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lead, setLead] = useState<Lead | null>(null);
  const [started, setStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Viñeta chiquita a los 45s recordando que el asistente está para ayudar.
  useEffect(() => {
    const t = setTimeout(() => {
      setShowBubble((prev) => (open ? prev : true));
    }, 45000);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function kickoff() {
    setStarted(true);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [], kickoff: true }),
      });
      const data = await res.json();
      const reply =
        typeof data?.reply === "string" && data.reply.trim()
          ? data.reply
          : "¡Hola! Soy el asistente de Autotrónica Go Diag. Contame, ¿qué le está pasando a tu vehículo?";
      setMessages([{ role: "assistant", content: reply }]);
    } catch {
      setMessages([
        {
          role: "assistant",
          content:
            "¡Hola! Soy el asistente de Autotrónica Go Diag. Contame, ¿qué le está pasando a tu vehículo?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleOpen() {
    setOpen(true);
    setShowBubble(false);
    if (!started) kickoff();
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as Role, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      const reply =
        typeof data?.reply === "string" && data.reply.trim()
          ? data.reply
          : "Se me complicó la conexión justo ahora 😅. Escribinos directo por WhatsApp y el especialista te atiende enseguida.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      if (data.lead) {
        setLead(data.lead);
        if (data.fallback && !data.lead.listo) {
          // si Groq falló, igual dejamos salida directa por WhatsApp
        }
      }
      if (data.fallback || (data.error && !data.lead)) {
        setLead((prev) => prev ?? { nombre: null, vehiculo: null, servicio: null, modalidad: null, detalle: null, listo: true });
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Se me complicó la conexión justo ahora 😅. Escribinos directo por WhatsApp y el especialista te atiende enseguida.",
        },
      ]);
      setLead((prev) => prev ?? { nombre: null, vehiculo: null, servicio: null, modalidad: null, detalle: null, listo: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="ai-fab-wrap">
        {showBubble && !open && (
          <div className="ai-callout">
            <button className="ai-callout-close" aria-label="Cerrar" onClick={() => setShowBubble(false)}>
              <X size={12} />
            </button>
            <span>Estoy para ayudarte con tu vehículo 👋</span>
          </div>
        )}
        <button className="ai-fab" onClick={handleOpen} aria-label="Abrir asistente virtual">
          <img src={logo} alt="Asistente Go Diag" />
        </button>
      </div>

      {open && (
        <div className="ai-panel">
          <div className="ai-header">
            <div className="ai-header-id">
              <img src={logo} alt="Go Diag" />
              <div>
                <b>Asistente Go Diag</b>
                <span><i className="ai-dot" />En línea</span>
              </div>
            </div>
            <button className="ai-close" onClick={() => setOpen(false)} aria-label="Cerrar chat">
              <X size={18} />
            </button>
          </div>

          <div className="ai-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ${m.role}`}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="ai-msg assistant ai-typing">
                <span /><span /><span />
              </div>
            )}

            {lead?.listo && (
              <div className="ai-premium-wrap">
                <p>Ya tengo todo lo que necesita el especialista. Seguimos por WhatsApp para que te atienda directo 👇</p>
                <a
                  className="ai-premium-btn"
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(buildWhatsappMessage(lead))}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Phone size={18} />
                  Continuar por WhatsApp
                </a>
              </div>
            )}
          </div>

          <div className="ai-input-row">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Escribí tu mensaje..."
              rows={1}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} aria-label="Enviar">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
