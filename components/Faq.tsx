import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Reveal from "@/components/Reveal";

const faqs = [
  {
    q: "¿Qué tipo de trabajos realizan?",
    a: "Trabajamos diagnóstico electrónico, programación, reparación de ECU, ABS, BCM/TIPM, tableros, cableado, inyección EFI/GDI, descarbonización de válvulas y diagnóstico diésel 12V/24V, entre otros servicios especializados.",
  },
  {
    q: "¿Realizan servicios a domicilio?",
    a: "Sí. Autotrónica Go Diagnosis ofrece todos sus servicios a domicilio, coordinando previamente la zona, el vehículo y el trabajo necesario por WhatsApp.",
  },
  {
    q: "¿Con qué marcas trabajan?",
    a: "Contamos con experiencia en Toyota, Ford, Chevrolet, Mitsubishi, Jeep, Dodge y Chrysler, además de diagnóstico multimarca según el sistema y la falla del vehículo.",
  },
  {
    q: "¿Dónde está ubicado el taller?",
    a: "Estamos en F338+3R, Caracas 1090, Distrito Capital, Venezuela. También ofrecemos atención a domicilio.",
  },
  {
    q: "¿Cuál es el horario de atención?",
    a: "Atendemos de lunes a viernes de 8:00 a 18:00 y los sábados de 9:00 a 15:00.",
  },
  {
    q: "¿Cómo solicito una evaluación?",
    a: "Podés escribirnos por WhatsApp y contarnos la marca, modelo, año, síntomas del vehículo y si preferís atención en el taller o a domicilio. Con esa información coordinamos el siguiente paso.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function Faq() {
  return (
    <section className="faq-section section" id="preguntas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Reveal as="div" className="section-heading faq-heading">
        <div>
          <span className="kicker">DUDAS FRECUENTES</span>
          <h2>
            Antes de escribirnos,
            <br />
            <em>esto te puede servir.</em>
          </h2>
        </div>
        <p>Información concreta sobre nuestros servicios, ubicación y modalidades de atención.</p>
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
