import AnimatedCounter from "@/components/AnimatedCounter";
import Reveal from "@/components/Reveal";

const stats = [
  { value: 8, suffix: "+", label: "Años de experiencia" },
  { value: 7, suffix: "", label: "Marcas especializadas" },
  { value: 3, suffix: "", label: "Gasolina, diésel y eléctricos" },
  { value: 2, suffix: "", label: "Sistemas 12V y 24V" },
];

export default function Stats() {
  return (
    <section className="stats-band" aria-label="Datos de Autotrónica Go Diagnosis">
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
