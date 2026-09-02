import AnimatedCounter from "@/components/AnimatedCounter";
import Reveal from "@/components/Reveal";

// TODO(Bruno): ajustá estos valores a las cifras reales del taller.
const stats = [
  { value: 8, suffix: "+", label: "Años de experiencia" },
  { value: 1200, suffix: "+", label: "Vehículos diagnosticados" },
  { value: 7, suffix: "", label: "Marcas atendidas" },
  { value: 98, suffix: "%", label: "Casos resueltos sin reemplazar piezas" },
];

export default function Stats() {
  return (
    <section className="stats-band">
      {stats.map((s, i) => (
        <Reveal as="div" key={s.label} delay={i * 90} className="stat-item">
          <b>
            <AnimatedCounter value={s.value} suffix={s.suffix} />
          </b>
          <span>{s.label}</span>
        </Reveal>
      ))}
    </section>
  );
}
