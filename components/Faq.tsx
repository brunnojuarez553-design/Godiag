import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Reveal from "@/components/Reveal";

const faqs = [
  {
    q: "¿Qué tipo de trabajos realizan?",
    a: "Trabajamos diagnóstico electrónico, programación, reparación de ECU, ABS, BCM/TIPM, tableros, cableado, inyección EFI/GDI, descarbonización de válvulas y diagnóstico diésel 12V/24V, entre otros servicios especializados.",
  },
  {
    q: "¿Con qué marcas trabajan?",
    a: "Contamos con experiencia en Toyota, Ford, Chevrolet, Mitsubishi, Jeep, Dodge y Chrysler, además de diagnóstico multimarca según el sistema y la falla del vehículo.",
  },
  {
    q: "¿Dónde está ubicado el taller?",
    a: "Estamos en Carretera Panamericana, vía Los Teques, km 1.5, sector industrial Los Cocos, Caracas, Venezuela.",
  },
  {
    q: "¿Cuál es el horario de atención?",
    a: "Atendemos de lunes a viernes de 8:00 a 18:00 y los sábados de 9:00 a 15:00.",
  },
  {
    q: "¿Cómo solicito una evaluación?",
    a: "Podés escribirnos por WhatsApp y contarnos la marca, modelo, año y síntomas del vehículo. Con esa información podemos orientarte sobre el siguiente paso y coordinar la revisión.",
  },
];

export default function Faq() {
  return (
    <section className="faq-section section" id="preguntas">
      <Reveal as="div" className="section-heading faq-heading">
        <div>
          <span className="kicker">DUDAS FRECUENTES</span>
          <h2>
            Antes de escribirnos,
            <br />
            <em>esto te puede servir.</em>
          </h2>
        </div>
        <p>Información concreta sobre nuestros servicios, ubicación y forma de atención.</p>
      </Reveal>

      <Reveal as="div" delay={80} className="faq-wrap">
        <Accordion type="single" collapsible className="faq-accordion">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="faq-item">
              <AccordionTrigger className="faq-trigger">{f.q}</AccordionTrigger>
              <AccordionContent className="faq-content">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
