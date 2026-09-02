import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Reveal from "@/components/Reveal";

const faqs = [
  {
    q: "¿Cuánto cuesta el diagnóstico?",
    a: "El diagnóstico tiene un costo fijo que te confirmamos antes de agendar la cita, según el tipo de vehículo y la falla reportada. Ese valor se descuenta del total si avanzás con la reparación en el taller.",
  },
  {
    q: "¿Cuánto tiempo tarda el proceso?",
    a: "Un diagnóstico electrónico estándar se resuelve el mismo día. Reparaciones de ECU, tablero o módulos pueden requerir más tiempo según la disponibilidad de repuestos o la complejidad de la falla, y siempre te avisamos el plazo estimado antes de empezar.",
  },
  {
    q: "¿Dan garantía sobre el trabajo?",
    a: "Sí. Toda intervención de diagnóstico y reparación queda respaldada por garantía sobre el trabajo realizado. Las condiciones específicas dependen del tipo de servicio y se detallan en el informe que te entregamos al finalizar.",
  },
  {
    q: "¿Atienden a domicilio o solo en el taller?",
    a: "Ambas modalidades están disponibles. Para diagnóstico a domicilio coordinamos según zona y disponibilidad; algunas reparaciones que requieren instrumentación de laboratorio deben hacerse en el taller.",
  },
  {
    q: "¿Qué pasa si el diagnóstico no encuentra una solución clara?",
    a: "Nuestro método está basado en medición, no en prueba y error. Si el caso requiere pruebas adicionales, te lo explicamos con evidencia antes de continuar, para que nunca pagues por una suposición.",
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
        <p>Las preguntas que más nos hacen los clientes antes de agendar una evaluación.</p>
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
