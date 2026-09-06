"use client";
import { useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  CircuitBoard,
  Gauge,
  Mail,
  MapPin,
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
import ProfessionalSections from "@/components/ProfessionalSections";

const whatsapp = "584222872237";
const email = "godiag2023@gmail.com";
const address = "Carretera Panamericana, vía Los Teques, km 1.5, sector industrial Los Cocos, Caracas, Venezuela";

const services = [
  { n: "01", title: "Mantenimiento y diagnóstico general", text: "Evaluación técnica del vehículo para localizar fallas y definir el camino de reparación con criterio y medición.", icon: Wrench, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1040_ioaslw.jpg" },
  { n: "02", title: "Descarbonización de válvulas", text: "Descontaminación y descarbonización de válvulas y admisión para recuperar condiciones correctas de funcionamiento.", icon: Sparkles, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305085/IMG_1033_y8wdqt.jpg" },
  { n: "03", title: "Entonación de inyectores EFI/GDI", text: "Entonación, limpieza y prueba de inyectores EFI y GDI para verificar su funcionamiento y entrega.", icon: Activity, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305085/IMG_1036_f5jobx.jpg" },
  { n: "04", title: "Diagnóstico electrónico", text: "Lectura avanzada y análisis de sistemas electrónicos en vehículos a gasolina, diésel y eléctricos.", icon: ScanLine, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1040_ioaslw.jpg" },
  { n: "05", title: "Osciloscopio y trazador de curvas", text: "Medición y análisis de señales para diagnosticar sensores, actuadores, cableado y módulos con evidencia técnica.", icon: Microscope, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305084/IMG_1044_of37oy.jpg" },
  { n: "06", title: "Reparación de cableado", text: "Localización de fallas y reparación de cableado automotriz en circuitos eléctricos y electrónicos.", icon: Zap, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305084/IMG_1044_of37oy.jpg" },
  { n: "07", title: "Reparación de ECU", text: "Diagnosis y reparación electrónica de computadoras de motor y unidades de control con fallas internas.", icon: CircuitBoard, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305084/IMG_1037_jjr5kk.jpg" },
  { n: "08", title: "Reparación de ABS", text: "Diagnóstico y reparación electrónica de módulos ABS y sus fallas asociadas.", icon: ShieldCheck, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1042_jaz2yl.jpg" },
  { n: "09", title: "Reparación de BCM / TIPM", text: "Intervención de módulos de carrocería BCM y TIPM para fallas eléctricas, de comunicación y control.", icon: Microscope, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305083/IMG_1041_i447vu.jpg" },
  { n: "10", title: "Reparación de tablero / cluster", text: "Diagnóstico y reparación de tableros de instrumentos y clusters electrónicos.", icon: Gauge, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1043_svrvfn.jpg" },
  { n: "11", title: "Reprogramación HP Tuners / BitEdit / VFTuner", text: "Reprogramación y ajustes de software de ECU con herramientas especializadas según vehículo y aplicación.", icon: Settings2, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1039_pnpd8p.jpg" },
  { n: "12", title: "EGR OFF Toyota", text: "Trabajo de software EGR OFF para Toyota Corolla y otros modelos, sujeto a la aplicación y normativa correspondiente.", icon: Wrench, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305085/IMG_1038_ggdubh.jpg" },
  { n: "13", title: "Diagnóstico diésel 12V / 24V", text: "Diagnóstico especializado en sistemas diésel de 12V y 24V para vehículos y equipos compatibles.", icon: Truck, image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1045_i97gv3.jpg" },
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
  { image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1039_pnpd8p.jpg", tag: "PROGRAMACIÓN", title: "Calibración y software ECU" },
  { image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1045_i97gv3.jpg", tag: "DIÉSEL", title: "Diagnóstico diésel 12V/24V" },
];

function Quote({ label = "Solicitar diagnóstico", className = "" }: { label?: string; className?: string }) {
  const [vehicle, setVehicle] = useState("");
  const [service, setService] = useState("");
  const [mode, setMode] = useState("");
  const [details, setDetails] = useState("");
  const send = () => {
    const msg = `Hola Autotrónica Go Diagnosis. Quiero solicitar una evaluación.\n\nVehículo: ${vehicle || "A confirmar"}\nServicio: ${service || "A confirmar"}\nModalidad: ${mode || "A confirmar"}\nDetalle / síntomas: ${details || "Sin detalle"}`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  };
  return (
    <Dialog>
      <DialogTrigger className={className}>{label}<ArrowRight size={17} /></DialogTrigger>
      <DialogContent className="quote-modal">
        <DialogHeader><DialogTitle>Prepará tu diagnóstico</DialogTitle></DialogHeader>
        <p className="modal-lead">Completá la información básica de tu vehículo y elegí si preferís atención en el taller o a domicilio.</p>
        <div className="form-grid">
          <label><span>Marca, modelo y año</span><Input value={vehicle} onChange={(e) => setVehicle(e.target.value)} placeholder="Ej. Toyota Corolla 2022" /></label>
          <label><span>¿Qué necesitás?</span><Select value={service} onValueChange={setService}><SelectTrigger><SelectValue placeholder="Seleccionar servicio" /></SelectTrigger><SelectContent>{services.map((s) => <SelectItem key={s.title} value={s.title}>{s.title}</SelectItem>)}</SelectContent></Select></label>
          <label><span>Modalidad</span><Select value={mode} onValueChange={setMode}><SelectTrigger><SelectValue placeholder="Seleccionar modalidad" /></SelectTrigger><SelectContent><SelectItem value="En el taller">En el taller</SelectItem><SelectItem value="A domicilio">A domicilio</SelectItem></SelectContent></Select></label>
          <label className="full"><span>Contanos qué sucede</span><Textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Testigos encendidos, pérdida de potencia, falla intermitente..." /></label>
        </div>
        <button className="send-btn" onClick={send}>Enviar evaluación por WhatsApp <ArrowRight size={18} /></button>
        <small>Todos los servicios pueden coordinarse a domicilio. Zona y disponibilidad se confirman por WhatsApp.</small>
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
        <a className="brand brand-logo" href="#top" onClick={closeMenu}><img src="https://res.cloudinary.com/dvvuwigmy/image/upload/v1788232533/IMG_1016_y4atye.jpg" alt="Autotrónica Go Diagnosis" /></a>
        <nav className={menu ? "open" : ""}>
          <a href="#especialidades" onClick={closeMenu}>Especialidades</a>
          <a href="#domicilio" onClick={closeMenu}>A domicilio</a>
          <a href="#tecnologia" onClick={closeMenu}>Tecnología</a>
          <a href="#trabajos" onClick={closeMenu}>Trabajos</a>
          <a href="#especialista" onClick={closeMenu}>Especialista</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
        </nav>
        <Magnetic><Quote label="Cotizar diagnóstico" className="nav-cta" /></Magnetic>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label={menu ? "Cerrar menú" : "Abrir menú"} aria-expanded={menu}>{menu ? <X /> : <Menu />}</button>
      </header>

      <section className="hero video-hero" id="top">
        <HeroVideo />
        <div className="hero-shade" />
        <div className="hero-copy">
          <div className="eyebrow"><span />Diagnóstico, programación y electrónica automotriz · Caracas</div>
          <h1>No cambiamos piezas.<br /><em>Encontramos la causa.</em></h1>
          <p>Autotrónica Go Diagnosis combina diagnóstico avanzado, medición y formación técnica continua para resolver fallas electrónicas con criterio, no por descarte. Atención en taller y a domicilio.</p>
          <div className="hero-actions"><Magnetic><Quote className="primary-btn" /></Magnetic><a href="#especialidades" className="text-link">Explorar servicios</a></div>
          <div className="proof-row">
            <div><b>8 años</b><span>de experiencia en el rubro</span></div>
            <div><b>A domicilio</b><span>todos los servicios</span></div>
            <div><b>Multimarca</b><span>gasolina, diésel y eléctricos</span></div>
          </div>
        </div>
      </section>

      <section className="brand-strip"><span>SERVICIO ESPECIALIZADO POR MARCA</span>{brands.map((b) => <b key={b}>{b}</b>)}</section>
      <Stats />

      <section className="quiz-band"><Reveal as="div" className="quiz-band-inner"><div className="quiz-band-copy"><span className="kicker">ORIENTACIÓN INICIAL</span><h3>¿No sabés qué tiene tu auto? Contanos en 3 pasos y llevamos la consulta directo al especialista.</h3></div><CarQuiz /></Reveal></section>

      <section className="services section" id="especialidades">
        <Reveal as="div" className="section-heading"><div><span className="kicker">CAPACIDAD TÉCNICA</span><h2>Electrónica automotriz<br />con método y preparación.</h2></div><p>Diagnóstico, reparación y programación para sistemas electrónicos que requieren medición, conocimiento y actualización constante. Todos los servicios pueden coordinarse a domicilio.</p></Reveal>
        <div className="service-grid">{services.map(({ n, title, text, icon: Icon, image }, i) => <Reveal as="article" key={n} delay={(i % 3) * 70} style={{ backgroundImage: `linear-gradient(105deg,rgba(5,7,9,.97) 0%,rgba(5,7,9,.86) 47%,rgba(5,7,9,.5) 100%),url("${image}")` }}><div className="service-top"><span>{n}</span><Icon /></div><h3>{title}</h3><p>{text}</p><a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("open-assistant", { detail: { service: title } })); }}>Consultar <ArrowRight size={15} /></a></Reveal>)}</div>
      </section>

      <ProfessionalSections />

      <section className="work-section section" id="trabajos">
        <Reveal as="div" className="section-heading work-heading"><div><span className="kicker">TRABAJO REAL</span><h2>La precisión se<br />demuestra trabajando.</h2></div><p>Intervenciones en diagnóstico, programación, inyección y reparación electrónica. Tocá una foto para verla en detalle.</p></Reveal>
        <div className="work-grid">{works.map((work, i) => <Reveal as="article" key={work.image} delay={(i % 4) * 60} className={i === 0 ? "work-wide" : ""} onClick={() => setLightboxIndex(i)} role="button" tabIndex={0} onKeyDown={(e: KeyboardEvent) => { if (e.key === "Enter") setLightboxIndex(i); }}><Image src={work.image} alt={work.title} fill sizes="(max-width: 600px) 50vw, (max-width: 900px) 50vw, 25vw" style={{ objectFit: "cover" }} /><div className="work-overlay"><span>{work.tag}</span><h3>{work.title}</h3><i>0{i + 1}</i></div><div className="work-zoom" aria-hidden="true"><ZoomIn size={18} /></div></Reveal>)}</div>
        <div className="work-proof"><div><b>Diagnóstico antes de intervenir</b><span>Medición y análisis antes de definir la solución.</span></div><div><b>Preparación como herramienta</b><span>Capacitación y estudio continuo aplicados al diagnóstico.</span></div><a href="https://www.instagram.com/godiag.ve" target="_blank" rel="noreferrer">Ver más trabajos <ArrowRight size={16} /></a></div>
      </section>

      {lightboxIndex !== null && <Lightbox items={works} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNav={setLightboxIndex} />}

      <section className="method" id="metodo">
        <div className="method-visual"><div className="scope"><div className="scope-grid" /><div className="scope-frame"><span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" /></div><div className="scope-head"><span className="scope-live"><i /> LIVE</span><span className="scope-ch">OSCILLOSCOPE // CH.A · CH.B</span></div><svg className="scope-wave scope-wave-b" viewBox="0 0 500 230" preserveAspectRatio="none"><path d="M0 172 C40 170 55 166 80 172 S130 182 160 170 L220 170 C250 170 260 150 280 168 S330 178 500 168" /></svg><svg className="scope-wave scope-wave-a" viewBox="0 0 500 230" preserveAspectRatio="none"><path d="M0 150 C50 145 60 142 90 150 S140 160 175 146 L198 145 L218 45 L238 198 L259 144 L325 144 C350 144 360 115 380 142 S420 151 500 145" /></svg><div className="scope-sweep" /><div className="scope-foot"><span><b>2.0V</b>/DIV</span><span><b>5ms</b>/DIV</span><span><b>842</b> Hz</span></div></div></div>
        <div className="method-copy"><span className="kicker">DIAGNÓSTICO BASADO EN EVIDENCIA</span><h2>Medir. Interpretar.<br />Resolver.</h2><p>La preparación, el estudio y la medición son la base del trabajo. El objetivo es entender la falla antes de decidir qué intervenir.</p><ol><li><b>01</b><span><strong>Recepción técnica</strong>Síntoma, antecedentes y condiciones de la falla.</span></li><li><b>02</b><span><strong>Pruebas y medición</strong>Escáner, osciloscopio, trazador y comprobaciones.</span></li><li><b>03</b><span><strong>Diagnóstico y solución</strong>Se define el alcance técnico según la evidencia encontrada.</span></li></ol></div>
      </section>

      <section className="expert section" id="especialista">
        <Reveal as="div" className="expert-card"><figure className="engineer-photo"><Image src="https://res.cloudinary.com/dvvuwigmy/image/upload/v1788231287/IMG_1017_rx0uzq.jpg" alt="Elian José González Cruz, especialista de Autotrónica Go Diagnosis" fill sizes="(max-width: 900px) 100vw, 38vw" style={{ objectFit: "cover", objectPosition: "center top" }} /><figcaption>ELIAN JOSÉ GONZÁLEZ CRUZ</figcaption></figure><div className="expert-copy"><span className="kicker">8 AÑOS · FORMACIÓN · PRECISIÓN</span><h2>El conocimiento detrás de cada diagnóstico.</h2><p>Autotrónica Go Diagnosis es atendida directamente por Elian José González Cruz. Su diferencial es claro: capacitarse y estudiar de forma continua para usar el conocimiento como principal herramienta de diagnóstico.</p><div className="certs"><span><ShieldCheck /> Diagnóstico profesional</span><span><Microscope /> Medición e instrumentación</span><span><Sparkles /> Capacitación continua</span></div></div></Reveal>
        <Reveal as="figure" delay={100} className="certificate-block"><Image src="https://res.cloudinary.com/dvvuwigmy/image/upload/v1788231283/IMG_1021_xsay5l.jpg" alt="Formación técnica de Autotrónica Go Diagnosis" fill sizes="(max-width: 900px) 100vw, 620px" style={{ objectFit: "contain" }} /><figcaption>FORMACIÓN TÉCNICA</figcaption></Reveal>
      </section>

      <Faq />
      <LocationMap />

      <section className="cta-section" id="contacto">
        <span className="kicker">TALLER + SERVICIO A DOMICILIO</span><h2>Contanos qué falla.<br /><em>Empecemos por diagnosticar.</em></h2><p>Atención en Caracas para clientes que valoran un trabajo técnico y bien realizado. Podés acercarte al taller o coordinar cualquiera de nuestros servicios a domicilio.</p><Magnetic><Quote label="Preparar mi evaluación" className="primary-btn" /></Magnetic>
        <a className="phone" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer"><Phone size={16} /> +58 422 287 2237</a>
        <a className="phone" href={`mailto:${email}`}><Mail size={16} /> {email}</a>
        <div className="work-proof"><div><b>Lunes a viernes</b><span>8:00 a 18:00</span></div><div><b>Sábados</b><span>9:00 a 15:00</span></div><div><b>Modalidades</b><span>Taller o atención a domicilio</span></div><div><b>Dirección</b><span>{address}</span></div></div>
      </section>

      <footer>
        <a className="brand brand-logo footer-logo" href="#top"><img src="https://res.cloudinary.com/dvvuwigmy/image/upload/v1788232533/IMG_1016_y4atye.jpg" alt="Autotrónica Go Diagnosis" /></a>
        <p>Diagnóstico, programación y electrónica automotriz en Caracas. Atención en taller y a domicilio.</p>
        <div>
          <a href="https://www.instagram.com/godiag.ve" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.tiktok.com/@godiag.ve" target="_blank" rel="noreferrer">TikTok</a>
          <a href="https://www.facebook.com/share/1BvVCyMgEn/" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://youtube.com/@autotronicagodiag" target="_blank" rel="noreferrer">YouTube</a>
          <a href={`mailto:${email}`}>Email</a>
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a>
          <span><MapPin size={14} /> Caracas, Venezuela</span>
        </div>
      </footer>
      <Assistant />
    </main>
  );
}
