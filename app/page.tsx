"use client";
import { useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  CircuitBoard,
  Gauge,
  Menu,
  Microscope,
  Phone,
  ScanLine,
  Settings2,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
  X,
  ZoomIn,
  Zap,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Assistant from "@/components/Assistant";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import HeroVideo from "@/components/HeroVideo";
import Stats from "@/components/Stats";
import CarQuiz from "@/components/CarQuiz";
import Faq from "@/components/Faq";
import LocationMap from "@/components/LocationMap";
import Lightbox from "@/components/Lightbox";

const whatsapp = "584222872237";
const services = [
  { n: "01", title: "Descarbonización de válvulas", text: "Limpieza profunda de válvulas y cámara de combustión para recuperar potencia, ahorro y suavidad de marcha.", icon: Sparkles, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305085/IMG_1033_y8wdqt.jpg" },
  { n: "02", title: "Entonación de inyectores EFI/GDI", text: "Prueba, limpieza y calibración de inyectores en sistemas EFI y GDI para una inyección precisa y estable.", icon: Activity, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305085/IMG_1036_f5jobx.jpg" },
  { n: "03", title: "Reparación de ECU", text: "Diagnóstico a nivel de componente y reparación de unidades de control del motor con fallas o daño interno.", icon: CircuitBoard, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305084/IMG_1037_jjr5kk.jpg" },
  { n: "04", title: "EGR OFF Toyota", text: "Anulación electrónica del sistema EGR en Toyota, para aplicaciones permitidas según normativa local.", icon: Wrench, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305085/IMG_1038_ggdubh.jpg" },
  { n: "05", title: "Diagnóstico electrónico", text: "Lectura avanzada, análisis de señales y diagnóstico preciso en gasolina, diésel y eléctricos.", icon: ScanLine, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1040_ioaslw.jpg" },
  { n: "06", title: "Reparación de tablero", text: "Reparación de tableros y clusters con fallas de encendido, testigos erráticos o pérdida de comunicación.", icon: Gauge, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1043_svrvfn.jpg" },
  { n: "07", title: "Reparación de ABS", text: "Diagnóstico y reparación de módulos ABS para restablecer el frenado antibloqueo con seguridad.", icon: ShieldCheck, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1042_jaz2yl.jpg" },
  { n: "08", title: "Reparación de BCM/TIPM", text: "Reparación de módulos de carrocería BCM/TIPM: fallas eléctricas, de comunicación y control general del vehículo.", icon: Microscope, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305083/IMG_1041_i447vu.jpg" },
  { n: "09", title: "Reparación de cableado", text: "Localización de fallas, empalmes y reparación de cableado con trazado por osciloscopio.", icon: Zap, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305084/IMG_1044_of37oy.jpg" },
  { n: "10", title: "Repro tuning HP Tuners / BitEdit / VFT", text: "Calibración y reprogramación de ECU con HP Tuners, BitEdit y VFT Tuning para ajustes de potencia y comportamiento del motor.", icon: Settings2, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1039_pnpd8p.jpg" },
  { n: "11", title: "Diagnóstico diésel 12V / 24V", text: "Vehículos livianos, camionetas y equipos pesados con instrumentación dedicada para 12V y 24V.", icon: Truck, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1045_i97gv3.jpg" },
];
const brands = ["TOYOTA", "FORD", "CHEVROLET", "MITSUBISHI", "JEEP", "DODGE", "CHRYSLER"];
const works = [
  { image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305085/IMG_1033_y8wdqt.jpg", tag: "LIMPIEZA", title: "Descarbonización de válvulas" },
  { image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305085/IMG_1036_f5jobx.jpg", tag: "INYECCIÓN", title: "Entonación de inyectores" },
  { image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305084/IMG_1037_jjr5kk.jpg", tag: "ELECTRÓNICA", title: "Reparación de ECU" },
  { image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305085/IMG_1038_ggdubh.jpg", tag: "PROGRAMACIÓN", title: "EGR OFF Toyota" },
  { image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1040_ioaslw.jpg", tag: "DIAGNÓSTICO", title: "Diagnóstico electrónico" },
  { image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1043_svrvfn.jpg", tag: "TABLERO", title: "Reparación de tablero" },
  { image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1042_jaz2yl.jpg", tag: "LABORATORIO", title: "Reparación de módulo ABS" },
  { image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305083/IMG_1041_i447vu.jpg", tag: "ELECTRÓNICA", title: "Intervención BCM / TIPM" },
  { image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305084/IMG_1044_of37oy.jpg", tag: "ELECTRICIDAD", title: "Reparación de cableado" },
  { image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1039_pnpd8p.jpg", tag: "PROGRAMACIÓN", title: "Calibración HP Tuners" },
  { image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1045_i97gv3.jpg", tag: "MULTIMARCA", title: "Diagnóstico diésel 12V/24V" },
];

function Quote({ label = "Solicitar diagnóstico", className = "" }: { label?: string; className?: string }) {
  const [vehicle, setVehicle] = useState("");
  const [service, setService] = useState("");
  const [details, setDetails] = useState("");
  const [mode, setMode] = useState("");
  const send = () => {
    const msg = `Hola Autotrónica Go Diag. Quiero solicitar una evaluación.\n\nVehículo: ${vehicle || "A confirmar"}\nServicio: ${service || "A confirmar"}\nModalidad: ${mode || "A confirmar"}\nDetalle / síntomas: ${details || "Sin detalle"}`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  };
  return (
    <Dialog>
      <DialogTrigger className={className}>
        {label}
        <ArrowRight size={17} />
      </DialogTrigger>
      <DialogContent className="quote-modal">
        <DialogHeader>
          <DialogTitle>Prepará tu diagnóstico</DialogTitle>
        </DialogHeader>
        <p className="modal-lead">Completá estos datos. Un especialista revisará tu caso antes de confirmar el alcance y presupuesto.</p>
        <div className="form-grid">
          <label>
            <span>Marca, modelo y año</span>
            <Input value={vehicle} onChange={(e) => setVehicle(e.target.value)} placeholder="Ej. Toyota Corolla 2022" />
          </label>
          <label>
            <span>¿Qué necesitás?</span>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar servicio" />
              </SelectTrigger>
              <SelectContent>
                {services.map((s) => (
                  <SelectItem key={s.title} value={s.title}>
                    {s.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          <label>
            <span>Modalidad</span>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar modalidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="En el taller">En el taller</SelectItem>
                <SelectItem value="A domicilio">Diagnóstico a domicilio</SelectItem>
                <SelectItem value="Asesoramiento">Necesito asesoramiento</SelectItem>
              </SelectContent>
            </Select>
          </label>
          <label className="full">
            <span>Contanos qué sucede</span>
            <Textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Testigos encendidos, pérdida de potencia, falla intermitente..." />
          </label>
        </div>
        <button className="send-btn" onClick={send}>
          Enviar evaluación por WhatsApp <ArrowRight size={18} />
        </button>
        <small>Esta solicitud no representa un precio definitivo.</small>
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeMenu = () => setMenu(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <header className={`nav${scrolled ? " scrolled" : ""}`}>
        <a className="brand brand-logo" href="#top" onClick={closeMenu}>
          <img src="https://res.cloudinary.com/dvvuwigmy/image/upload/v1788232533/IMG_1016_y4atye.jpg" alt="Autotrónica Go Diag" />
        </a>
        <nav className={menu ? "open" : ""}>
          <a href="#especialidades" onClick={closeMenu}>Especialidades</a>
          <a href="#trabajos" onClick={closeMenu}>Trabajos</a>
          <a href="#metodo" onClick={closeMenu}>Método</a>
          <a href="#certificaciones" onClick={closeMenu}>Certificaciones</a>
          <a href="#preguntas" onClick={closeMenu}>Preguntas</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
        </nav>
        <Magnetic>
          <Quote label="Cotizar diagnóstico" className="nav-cta" />
        </Magnetic>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label={menu ? "Cerrar menú" : "Abrir menú"} aria-expanded={menu}>
          {menu ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero video-hero" id="top">
        <HeroVideo />
        <div className="hero-shade" />
        <div className="hero-copy">
          <div className="eyebrow">
            <span />
            Ingeniería automotriz especializada · Caracas
          </div>
          <h1>
            No cambiamos piezas.
            <br />
            <em>Encontramos la causa.</em>
          </h1>
          <p>Diagnóstico electrónico de precisión, reparación de módulos y calibración ECU para quienes necesitan una solución técnica, no una suposición.</p>
          <div className="hero-actions">
            <Magnetic>
              <Quote className="primary-btn" />
            </Magnetic>
            <a href="#especialidades" className="text-link">Explorar capacidades</a>
          </div>
          <div className="proof-row">
            <div><b>Ingeniero</b><span>Mecánico certificado</span></div>
            <div><b>12V / 24V</b><span>Livianos y pesados</span></div>
            <div><b>Multimarca</b><span>Gasolina, diésel y EV</span></div>
          </div>
        </div>
      </section>

      <section className="brand-strip">
        <span>EXPERIENCIA MULTIMARCA</span>
        {brands.map((b) => (
          <b key={b}>{b}</b>
        ))}
      </section>

      <Stats />

      <section className="quiz-band">
        <Reveal as="div" className="quiz-band-inner">
          <div className="quiz-band-copy">
            <span className="kicker">DIAGNÓSTICO EXPRÉS</span>
            <h3>¿No sabés qué tiene tu auto? Contanos en 3 pasos y hablás directo con el especialista.</h3>
          </div>
          <CarQuiz />
        </Reveal>
      </section>

      <section className="services section" id="especialidades">
        <Reveal as="div" className="section-heading">
          <div>
            <span className="kicker">CAPACIDAD TÉCNICA</span>
            <h2>
              Electrónica automotriz
              <br />a nivel de ingeniería.
            </h2>
          </div>
          <p>Instrumentación avanzada, metodología y experiencia para intervenir sistemas que exigen diagnóstico real.</p>
        </Reveal>
        <div className="service-grid">
          {services.map(({ n, title, text, icon: Icon, image }, i) => (
            <Reveal
              as="article"
              key={n}
              delay={(i % 3) * 70}
              style={{ backgroundImage: `linear-gradient(105deg,rgba(5,7,9,.97) 0%,rgba(5,7,9,.86) 47%,rgba(5,7,9,.5) 100%),url("${image}")` }}
            >
              <div className="service-top">
                <span>{n}</span>
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("open-assistant", { detail: { service: title } }));
                }}
              >
                Consultar <ArrowRight size={15} />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="work-section section" id="trabajos">
        <Reveal as="div" className="section-heading work-heading">
          <div>
            <span className="kicker">TRABAJO REAL · RESULTADOS REALES</span>
            <h2>
              La precisión se
              <br />
              demuestra trabajando.
            </h2>
          </div>
          <p>Una selección de intervenciones realizadas en diagnóstico, programación y reparación electrónica multimarca. Tocá una foto para verla en grande.</p>
        </Reveal>
        <div className="work-grid">
          {works.map((work, i) => (
            <Reveal
              as="article"
              key={work.image}
              delay={(i % 4) * 60}
              className={i === 0 ? "work-wide" : ""}
              onClick={() => setLightboxIndex(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e: KeyboardEvent) => {
                if (e.key === "Enter") setLightboxIndex(i);
              }}
            >
              <Image
                src={work.image}
                alt={work.title}
                fill
                sizes="(max-width: 600px) 50vw, (max-width: 900px) 50vw, 25vw"
                style={{ objectFit: "cover" }}
              />
              <div className="work-overlay">
                <span>{work.tag}</span>
                <h3>{work.title}</h3>
                <i>0{i + 1}</i>
              </div>
              <div className="work-zoom" aria-hidden="true">
                <ZoomIn size={18} />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="work-proof">
          <div><b>Diagnóstico antes de reemplazar</b><span>Cada intervención comienza con mediciones y evidencia.</span></div>
          <div><b>Equipamiento especializado</b><span>Escáner, osciloscopio y herramientas de programación.</span></div>
          <a href="https://instagram.com/godiag.ve" target="_blank">Ver más trabajos <ArrowRight size={16} /></a>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox items={works} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNav={setLightboxIndex} />
      )}

      <section className="method" id="metodo">
        <div className="method-visual">
          <div className="scope">
            <div className="scope-grid" />
            <div className="scope-frame">
              <span className="corner tl" />
              <span className="corner tr" />
              <span className="corner bl" />
              <span className="corner br" />
            </div>
            <div className="scope-head">
              <span className="scope-live"><i /> LIVE</span>
              <span className="scope-ch">OSCILLOSCOPE // CH.A · CH.B</span>
            </div>
            <svg className="scope-wave scope-wave-b" viewBox="0 0 500 230" preserveAspectRatio="none">
              <path d="M0 172 C40 170 55 166 80 172 S130 182 160 170 L220 170 C250 170 260 150 280 168 S330 178 500 168" />
            </svg>
            <svg className="scope-wave scope-wave-a" viewBox="0 0 500 230" preserveAspectRatio="none">
              <path d="M0 150 C50 145 60 142 90 150 S140 160 175 146 L198 145 L218 45 L238 198 L259 144 L325 144 C350 144 360 115 380 142 S420 151 500 145" />
            </svg>
            <div className="scope-sweep" />
            <div className="scope-foot">
              <span><b>2.0V</b>/DIV</span>
              <span><b>5ms</b>/DIV</span>
              <span><b>842</b> Hz</span>
            </div>
          </div>
        </div>
        <div className="method-copy">
          <span className="kicker">DIAGNÓSTICO BASADO EN EVIDENCIA</span>
          <h2>
            Medir. Interpretar.
            <br />
            Resolver.
          </h2>
          <p>Cada vehículo atraviesa un proceso ordenado para localizar la causa raíz antes de intervenir. Menos prueba y error. Más control.</p>
          <ol>
            <li><b>01</b><span><strong>Recepción técnica</strong>El síntoma y sus antecedentes.</span></li>
            <li><b>02</b><span><strong>Pruebas & medición</strong>Escáner, osciloscopio y trazador.</span></li>
            <li><b>03</b><span><strong>Informe & solución</strong>Explicación, alcance y recomendación.</span></li>
          </ol>
        </div>
      </section>

      <section className="expert section" id="certificaciones">
        <Reveal as="div" className="expert-card">
          <figure className="engineer-photo">
            <Image
              src="https://res.cloudinary.com/dvvuwigmy/image/upload/v1788231287/IMG_1017_rx0uzq.jpg"
              alt="Ing. Elian González, especialista en autotrónica"
              fill
              sizes="(max-width: 900px) 100vw, 38vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
            <figcaption>ING. ELIAN GONZÁLEZ</figcaption>
          </figure>
          <div className="expert-copy">
            <span className="kicker">INGENIERÍA · EXPERIENCIA · PRECISIÓN</span>
            <h2>El conocimiento detrás del diagnóstico.</h2>
            <p>Ingeniero mecánico con formación especializada y certificaciones técnicas en electrónica, diagnóstico y sistemas automotrices. Cada trabajo se sustenta en estudio, medición y procedimientos verificables.</p>
            <div className="certs">
              <span><ShieldCheck /> Diagnóstico profesional</span>
              <span><Microscope /> Instrumentación avanzada</span>
              <span><Sparkles /> Actualización continua</span>
            </div>
          </div>
        </Reveal>
        <Reveal as="figure" delay={100} className="certificate-block">
          <Image
            src="https://res.cloudinary.com/dvvuwigmy/image/upload/v1788231283/IMG_1021_xsay5l.jpg"
            alt="Certificación profesional del Ing. Elian González"
            fill
            sizes="(max-width: 900px) 100vw, 620px"
            style={{ objectFit: "contain" }}
          />
          <figcaption>FORMACIÓN CERTIFICADA</figcaption>
        </Reveal>
      </section>

      <Faq />

      <LocationMap />

      <section className="cta-section" id="contacto">
        <span className="kicker">TU VEHÍCULO MERECE CERTEZA</span>
        <h2>
          Antes de reemplazar,
          <br />
          <em>diagnostiquemos.</em>
        </h2>
        <p>Contanos qué sucede y prepará la información de tu vehículo. Te orientamos sobre el próximo paso.</p>
        <Magnetic>
          <Quote label="Preparar mi evaluación" className="primary-btn" />
        </Magnetic>
        <a className="phone" href={`tel:+${whatsapp}`}>
          <Phone size={16} /> +58 422-2872237
        </a>
      </section>

      <footer>
        <a className="brand brand-logo footer-logo" href="#top">
          <img src="https://res.cloudinary.com/dvvuwigmy/image/upload/v1788232533/IMG_1016_y4atye.jpg" alt="Autotrónica Go Diag" />
        </a>
        <p>Diagnóstico preciso. Solución efectiva.</p>
        <div>
          <a href="https://instagram.com/godiag.ve" target="_blank">Instagram</a>
          <a href={`https://wa.me/${whatsapp}`} target="_blank">WhatsApp</a>
          <span>Caracas, Venezuela</span>
        </div>
      </footer>
      <Assistant />
    </main>
  );
}
