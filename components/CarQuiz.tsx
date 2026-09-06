"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CircuitBoard, Gauge, Sparkles, Wrench, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const whatsapp = "584222872237";

type Category = {
  id: string;
  label: string;
  icon: typeof Wrench;
  follow: { q: string; options: string[] };
};

const categories: Category[] = [
  {
    id: "testigo",
    label: "Se encendió un testigo en el tablero",
    icon: Gauge,
    follow: { q: "¿Hace cuánto está encendido?", options: ["Recién apareció", "Hace unos días", "Es intermitente"] },
  },
  {
    id: "potencia",
    label: "Perdió potencia o responde menos",
    icon: Zap,
    follow: { q: "¿Cuándo lo notás más?", options: ["Siempre", "En frío", "En caliente", "Al acelerar fuerte"] },
  },
  {
    id: "electrica",
    label: "Falla eléctrica o no enciende",
    icon: CircuitBoard,
    follow: { q: "¿Qué pasa exactamente?", options: ["No arranca", "Arranca y se apaga", "Luces o accesorios fallan", "Otro"] },
  },
  {
    id: "ruido",
    label: "Ruido, vibración o tirón inusual",
    icon: Wrench,
    follow: { q: "¿Cuándo lo sentís?", options: ["Al frenar", "Al acelerar", "En marcha constante", "Al girar"] },
  },
  {
    id: "tuning",
    label: "Quiero programar o calibrar la ECU",
    icon: Sparkles,
    follow: { q: "¿Qué buscás?", options: ["Más potencia", "EGR OFF / testigo", "Corregir una falla", "Quiero asesoramiento"] },
  },
];

export default function CarQuiz() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState<Category | null>(null);
  const [detail, setDetail] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [mode, setMode] = useState("");

  function reset() {
    setStep(0);
    setCategory(null);
    setDetail("");
    setVehicle("");
    setMode("");
  }

  function handleOpenChange(v: boolean) {
    setOpen(v);
    if (!v) setTimeout(reset, 300);
  }

  function pickCategory(c: Category) {
    setCategory(c);
    setStep(1);
  }

  function pickDetail(d: string) {
    setDetail(d);
    setStep(2);
  }

  function send() {
    const msg = [
      "Hola Autotrónica Go Diagnosis. Hice la orientación rápida en la web y esto es lo que me pasa:",
      "",
      `Síntoma: ${category?.label ?? "A confirmar"}`,
      `Detalle: ${detail || "A confirmar"}`,
      `Vehículo: ${vehicle || "A confirmar"}`,
      `Modalidad: ${mode || "A confirmar"}`,
      "",
      "(Consulta generada desde la web)",
    ].join("\n");
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="quiz-trigger">
        <span className="quiz-trigger-icon"><Gauge size={18} /></span>
        ¿Qué le pasa a tu auto? Hacé una orientación rápida
        <ArrowRight size={16} />
      </DialogTrigger>

      <DialogContent className="quote-modal quiz-modal">
        <DialogHeader><DialogTitle>Orientación rápida</DialogTitle></DialogHeader>

        <div className="quiz-steps" aria-hidden="true">
          <span className={step >= 0 ? "on" : ""} />
          <span className={step >= 1 ? "on" : ""} />
          <span className={step >= 2 ? "on" : ""} />
        </div>

        {step === 0 && (
          <div className="quiz-options">
            <p className="modal-lead">Elegí lo que más se parece a lo que le pasa a tu vehículo.</p>
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <button key={c.id} type="button" className="quiz-option" onClick={() => pickCategory(c)}>
                  <Icon size={18} />
                  <span>{c.label}</span>
                  <ArrowRight size={15} />
                </button>
              );
            })}
          </div>
        )}

        {step === 1 && category && (
          <div className="quiz-options">
            <p className="modal-lead">{category.follow.q}</p>
            {category.follow.options.map((o) => (
              <button key={o} type="button" className="quiz-option" onClick={() => pickDetail(o)}>
                <span>{o}</span>
                <ArrowRight size={15} />
              </button>
            ))}
            <button type="button" className="quiz-back" onClick={() => setStep(0)}>
              <ArrowLeft size={14} /> Volver
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="quiz-final">
            <p className="modal-lead">Último paso: contanos qué vehículo tenés y dónde preferís la atención.</p>
            <div className="form-grid">
              <label className="full">
                <span>Marca, modelo y año</span>
                <Input value={vehicle} onChange={(e) => setVehicle(e.target.value)} placeholder="Ej. Toyota Corolla 2022" />
              </label>
              <label className="full">
                <span>Modalidad</span>
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar modalidad" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="En el taller">En el taller</SelectItem>
                    <SelectItem value="A domicilio">A domicilio</SelectItem>
                  </SelectContent>
                </Select>
              </label>
            </div>
            <div className="quiz-summary"><b>Resumen:</b> {category?.label} — {detail}</div>
            <button type="button" className="send-btn" onClick={send} disabled={!vehicle.trim() || !mode}>
              Enviar por WhatsApp <ArrowRight size={18} />
            </button>
            <button type="button" className="quiz-back" onClick={() => setStep(1)}>
              <ArrowLeft size={14} /> Volver
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
