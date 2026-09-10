"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  Clock3,
  ExternalLink,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ScanLine,
  Star,
  Wrench,
  X,
  Zap,
} from "lucide-react";

const logo = "https://res.cloudinary.com/dvvuwigmy/image/upload/v1788232533/IMG_1016_y4atye.jpg";
const background = "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1040_ioaslw.jpg";
const phone = "+58 422 287 2237";
const whatsapp = "584222872237";
const email = "godiag2023@gmail.com";
const address = "F338+3R, Caracas 1090, Distrito Capital, Venezuela";
const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Autotrónica Go Diagnosis, " + address)}`;

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>;
}

function TikTokIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.35 3c.28 1.62 1.24 2.93 2.62 3.76a6.38 6.38 0 0 0 3.03.84v3.2a9.48 9.48 0 0 1-5.65-1.93v6.06a6.08 6.08 0 1 1-5.27-6.02v3.27a2.86 2.86 0 1 0 2.07 2.75V3h3.2Z"/></svg>;
}

function FacebookIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.6 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V10H8v3h2.6v8h3Z"/></svg>;
}

function YoutubeIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.1a2.8 2.8 0 0 0-2-2C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.9 2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.9ZM10 15.5v-7l6 3.5-6 3.5Z"/></svg>;
}

const socials = [
  { label: "Instagram", handle: "@godiag.ve", href: "https://www.instagram.com/godiag.ve", icon: InstagramIcon },
  { label: "TikTok", handle: "@godiag.ve", href: "https://www.tiktok.com/@godiag.ve", icon: TikTokIcon },
  { label: "Facebook", handle: "Go Diagnosis", href: "https://www.facebook.com/share/1BvVCyMgEn/", icon: FacebookIcon },
  { label: "YouTube", handle: "@autotronicagodiag", href: "https://youtube.com/@autotronicagodiag", icon: YoutubeIcon },
];

const symptoms = [
  { label: "Testigo encendido", icon: ScanLine },
  { label: "Falla eléctrica", icon: Zap },
  { label: "Pérdida de potencia", icon: Wrench },
  { label: "Programación de ECU", icon: Bot },
];

function whatsappUrl(message: string) {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
}

export default function BioPage() {
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [symptom, setSymptom] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [detail, setDetail] = useState("");

  const diagnosticMessage = useMemo(
    () =>
      [
        "Hola Autotrónica Go Diagnosis. Completé el diagnóstico guiado desde Instagram.",
        "",
        `Motivo: ${symptom || "A confirmar"}`,
        `Vehículo: ${vehicle || "A confirmar"}`,
        `Detalle: ${detail || "Sin detalle adicional"}`,
        "",
        "Quiero coordinar una evaluación técnica.",
      ].join("\n"),
    [symptom, vehicle, detail],
  );

  function closeDiagnostic() {
    setDiagnosticOpen(false);
    setTimeout(() => {
      setStep(0);
      setSymptom("");
      setVehicle("");
      setDetail("");
    }, 250);
  }

  return (
    <main className="bio-page">
      <div className="bio-ambient" aria-hidden="true" />
      <div className="bio-photo" aria-hidden="true">
        <Image src={background} alt="" fill priority sizes="100vw" />
      </div>

      <section className="bio-shell" aria-label="Enlaces oficiales de Autotrónica Go Diagnosis">
        <header className="bio-profile">
          <div className="bio-logo-ring">
            <Image src={logo} alt="Logo de Autotrónica Go Diagnosis" fill priority sizes="96px" />
            <span className="bio-online" title="Atención disponible"><Check size={12} strokeWidth={3} /></span>
          </div>
          <span className="bio-eyebrow">AUTOTRÓNICA · CARACAS</span>
          <h1>Go Diagnosis</h1>
          <p>Diagnóstico, programación y electrónica automotriz con criterio técnico.</p>
          <div className="bio-trust-row">
            <span><Clock3 size={13} /> Lun–Vie 8:00–18:00</span>
            <span><MapPin size={13} /> Caracas</span>
          </div>
        </header>

        <div className="bio-actions">
          <button className="bio-card bio-card-primary" type="button" onClick={() => setDiagnosticOpen(true)}>
            <span className="bio-card-icon"><ScanLine size={23} /></span>
            <span className="bio-card-copy"><b>Diagnóstico guiado</b><small>Contanos qué le pasa a tu vehículo en 3 pasos</small></span>
            <span className="bio-card-arrow"><ChevronRight size={20} /></span>
          </button>

          <a className="bio-card bio-card-ai" href={whatsappUrl("Hola Autotrónica Go Diagnosis. Quiero usar la herramienta técnica inteligente para orientar una falla de mi vehículo.")} target="_blank" rel="noreferrer">
            <span className="bio-card-icon"><Bot size={23} /></span>
            <span className="bio-card-copy"><span className="bio-card-label">ASISTENCIA INTELIGENTE</span><b>Herramienta técnica</b><small>Orientá tu consulta antes de hablar con el especialista</small></span>
            <span className="bio-card-arrow"><ArrowRight size={20} /></span>
          </a>

          <Link className="bio-card" href="/">
            <span className="bio-card-icon"><Globe2 size={22} /></span>
            <span className="bio-card-copy"><b>Visitar el sitio web</b><small>Servicios, trabajos realizados y tecnología</small></span>
            <span className="bio-card-arrow"><ExternalLink size={18} /></span>
          </Link>

          <a className="bio-card" href={maps} target="_blank" rel="noreferrer">
            <span className="bio-card-icon bio-star"><Star size={21} fill="currentColor" /></span>
            <span className="bio-card-copy"><b>Dejanos tu reseña en Google</b><small>Tu experiencia ayuda a otros conductores</small></span>
            <span className="bio-card-arrow"><ExternalLink size={18} /></span>
          </a>
        </div>

        <section className="bio-contact">
          <div className="bio-section-title"><span>CONTACTO DIRECTO</span><i /></div>
          <div className="bio-contact-grid">
            <a href={whatsappUrl("Hola Autotrónica Go Diagnosis. Vengo desde Instagram y quiero hacer una consulta.")} target="_blank" rel="noreferrer"><MessageCircle size={19} /><span><b>WhatsApp</b><small>{phone}</small></span></a>
            <a href={`tel:${whatsapp}`}><Phone size={19} /><span><b>Llamar</b><small>{phone}</small></span></a>
            <a href={`mailto:${email}`}><Mail size={19} /><span><b>Email</b><small>{email}</small></span></a>
            <a href={maps} target="_blank" rel="noreferrer"><MapPin size={19} /><span><b>Cómo llegar</b><small>Ver ubicación</small></span></a>
          </div>
          <p className="bio-address"><MapPin size={14} /> {address}</p>
        </section>

        <section className="bio-social-section">
          <div className="bio-section-title"><span>SEGUINOS</span><i /></div>
          <div className="bio-socials">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`${social.label}: ${social.handle}`}>
                <span><social.icon /></span><small>{social.label}</small>
              </a>
            ))}
          </div>
        </section>

        <footer className="bio-footer">© {new Date().getFullYear()} AUTOTRÓNICA GO DIAGNOSIS</footer>
      </section>

      {diagnosticOpen && (
        <div className="bio-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeDiagnostic()}>
          <section className="bio-modal" role="dialog" aria-modal="true" aria-labelledby="bio-diagnostic-title">
            <button className="bio-modal-close" type="button" onClick={closeDiagnostic} aria-label="Cerrar diagnóstico"><X size={20} /></button>
            <span className="bio-modal-kicker">ORIENTACIÓN INICIAL</span>
            <h2 id="bio-diagnostic-title">Diagnóstico guiado</h2>
            <div className="bio-progress" aria-label={`Paso ${step + 1} de 3`}><i className={step >= 0 ? "active" : ""} /><i className={step >= 1 ? "active" : ""} /><i className={step >= 2 ? "active" : ""} /></div>

            {step === 0 && <div className="bio-modal-stage"><p>¿Qué describe mejor lo que le pasa a tu vehículo?</p><div className="bio-symptom-list">{symptoms.map(({ label, icon: Icon }) => <button type="button" key={label} onClick={() => { setSymptom(label); setStep(1); }}><Icon size={19} /><span>{label}</span><ChevronRight size={17} /></button>)}</div></div>}

            {step === 1 && <div className="bio-modal-stage"><p>¿Qué vehículo tenés?</p><label className="bio-field"><span>Marca, modelo y año</span><input autoFocus value={vehicle} onChange={(e) => setVehicle(e.target.value)} placeholder="Ej. Toyota Corolla 2022" /></label><label className="bio-field"><span>Contanos un poco más</span><textarea value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="Cuándo aparece la falla, qué testigo ves o qué notaste..." /></label><div className="bio-modal-nav"><button type="button" className="bio-back" onClick={() => setStep(0)}><ArrowLeft size={16} /> Volver</button><button type="button" className="bio-next" disabled={!vehicle.trim()} onClick={() => setStep(2)}>Continuar <ArrowRight size={16} /></button></div></div>}

            {step === 2 && <div className="bio-modal-stage"><div className="bio-result"><span><Check size={18} /></span><div><b>Consulta preparada</b><p>El especialista recibirá el síntoma, los datos del vehículo y tu descripción.</p></div></div><dl className="bio-summary"><div><dt>Motivo</dt><dd>{symptom}</dd></div><div><dt>Vehículo</dt><dd>{vehicle}</dd></div></dl><a className="bio-send" href={whatsappUrl(diagnosticMessage)} target="_blank" rel="noreferrer" onClick={closeDiagnostic}><MessageCircle size={19} /> Enviar por WhatsApp <ArrowRight size={17} /></a><button type="button" className="bio-back bio-back-final" onClick={() => setStep(1)}><ArrowLeft size={16} /> Corregir datos</button></div>}
          </section>
        </div>
      )}
    </main>
  );
}
