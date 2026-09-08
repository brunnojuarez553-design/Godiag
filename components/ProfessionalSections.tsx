"use client";

import { ArrowRight, CircuitBoard, Gauge, MapPin, Microscope, ScanLine, Settings2, ShieldCheck, Truck, Wrench } from "lucide-react";
import Reveal from "@/components/Reveal";

const whatsapp = "584222872237";

const equipment = [
  { icon: ScanLine, title: "Diagnóstico electrónico", text: "Lectura de sistemas y análisis de datos para orientar la búsqueda de la falla antes de intervenir." },
  { icon: Gauge, title: "Osciloscopio automotriz", text: "Visualización y comparación de señales eléctricas para evaluar sensores, actuadores y circuitos." },
  { icon: Microscope, title: "Trazador de curvas", text: "Comprobación electrónica aplicada al diagnóstico de componentes y módulos." },
  { icon: Settings2, title: "Programación ECU", text: "Herramientas especializadas como HP Tuners, BitEdit y VFTuner según vehículo y aplicación." },
  { icon: CircuitBoard, title: "Electrónica de módulos", text: "Trabajo sobre ECU, ABS, BCM, TIPM y tableros con enfoque de diagnóstico y reparación." },
  { icon: Truck, title: "Sistemas 12V / 24V", text: "Diagnóstico para vehículos y equipos diésel con arquitecturas eléctricas de 12 y 24 voltios." },
];

const approaches = [
  {
    tag: "ECU / MÓDULOS",
    title: "Cuando una computadora deja de responder",
    symptom: "Fallas de comunicación, encendido, funcionamiento irregular o códigos persistentes.",
    process: "Diagnóstico de alimentación, comunicación, señales y módulo antes de definir reparación o programación.",
  },
  {
    tag: "ELECTRICIDAD",
    title: "Cuando la falla aparece y desaparece",
    symptom: "Problemas intermitentes, testigos, pérdidas de señal o comportamientos eléctricos difíciles de reproducir.",
    process: "Medición de circuitos, análisis con osciloscopio y revisión de cableado para localizar la causa real.",
  },
  {
    tag: "INYECCIÓN EFI / GDI",
    title: "Cuando el motor pierde respuesta",
    symptom: "Marcha irregular, pérdida de potencia, consumo anormal o problemas asociados a inyección.",
    process: "Prueba de inyectores, evaluación electrónica y descarbonización cuando el caso lo requiere.",
  },
];

function wa(text: string) {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
}

export default function ProfessionalSections() {
  return (
    <>
      <div className="services-more-wrap">
        <a href="/servicios" className="services-more-btn">
          Ver todos los servicios <ArrowRight size={17} />
        </a>
        <span>Diagnóstico, reparación, programación y electrónica automotriz.</span>
      </div>

      <section className="mobile-service section" id="domicilio">
        <Reveal as="div" className="mobile-service-shell">
          <div className="mobile-service-copy">
            <span className="kicker">PROGRAMACIÓN + EGR OFF A DOMICILIO</span>
            <h2>Programación y EGR OFF<br /><em>hasta tu vehículo.</em></h2>
            <p>El servicio a domicilio está disponible únicamente para trabajos de programación y eliminación de EGR, siempre con coordinación previa de turno. Antes de la visita se valida vehículo, zona, compatibilidad y alcance del trabajo.</p>
            <div className="mobile-benefits">
              <span><MapPin /> Atención coordinada en Caracas</span>
              <span><Wrench /> Programación y EGR OFF</span>
              <span><ShieldCheck /> Turno y validación previa</span>
            </div>
            <a className="primary-btn" href={wa("Hola Autotrónica Go Diagnosis. Quiero coordinar programación o EGR OFF a domicilio. Mi vehículo es: ")} target="_blank" rel="noreferrer">
              Coordinar servicio a domicilio <ArrowRight size={17} />
            </a>
          </div>
          <div className="mobile-service-panel" aria-label="Proceso del servicio a domicilio">
            <div><b>01</b><span><strong>Contanos el vehículo</strong>Marca, modelo, año y trabajo requerido.</span></div>
            <div><b>02</b><span><strong>Validación previa</strong>Se confirma compatibilidad y alcance.</span></div>
            <div><b>03</b><span><strong>Coordinación</strong>Zona, día y horario de la visita.</span></div>
            <div><b>04</b><span><strong>Intervención</strong>Programación o EGR OFF en el lugar acordado.</span></div>
          </div>
        </Reveal>
      </section>

      <section className="technology-section section" id="tecnologia">
        <Reveal as="div" className="section-heading">
          <div>
            <span className="kicker">EQUIPAMIENTO + CRITERIO TÉCNICO</span>
            <h2>Diagnosticar bien exige<br />medir mejor.</h2>
          </div>
          <p>La herramienta no reemplaza el conocimiento. Se combina instrumentación, software y formación para obtener evidencia antes de decidir una intervención.</p>
        </Reveal>
        <div className="technology-grid">
          {equipment.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="article" key={title} delay={(i % 3) * 70}>
              <div className="tech-icon"><Icon /></div>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cases-section section" id="casos">
        <Reveal as="div" className="section-heading">
          <div>
            <span className="kicker">CÓMO SE ABORDA UNA FALLA</span>
            <h2>No es cambiar piezas.<br /><em>Es entender el sistema.</em></h2>
          </div>
          <p>Ejemplos del enfoque técnico aplicado según el tipo de problema. Sin diagnósticos genéricos y sin prometer resultados antes de medir el vehículo.</p>
        </Reveal>
        <div className="case-grid">
          {approaches.map((item, i) => (
            <Reveal as="article" key={item.title} delay={i * 80}>
              <span className="case-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <div className="case-line"><b>SÍNTOMAS</b><p>{item.symptom}</p></div>
              <div className="case-line"><b>ENFOQUE</b><p>{item.process}</p></div>
              <a href={wa(`Hola Autotrónica Go Diagnosis. Tengo un caso relacionado con ${item.tag}. Quiero consultar: `)} target="_blank" rel="noreferrer">Consultar mi caso <ArrowRight size={15} /></a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="reviews-ready section" id="resenas">
        <Reveal as="div" className="reviews-ready-card">
          <div>
            <span className="kicker">REPUTACIÓN REAL</span>
            <h2>La próxima capa de confianza:<br />reseñas verificadas.</h2>
            <p>La sección queda preparada para integrar opiniones reales de Google cuando el perfil de Google Business esté activo. No mostramos testimonios inventados ni valoraciones que el negocio todavía no tenga verificadas.</p>
          </div>
          <div className="reviews-status">
            <span>GOOGLE BUSINESS</span>
            <b>Próximamente</b>
            <small>Ubicación · horarios · fotos · reseñas · contacto</small>
          </div>
        </Reveal>
      </section>
    </>
  );
}
