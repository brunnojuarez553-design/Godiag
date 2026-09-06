import Reveal from "@/components/Reveal";

const ADDRESS = "Carretera Panamericana, vía Los Teques, km 1.5, sector industrial Los Cocos, Caracas, Venezuela";

export default function LocationMap() {
  return (
    <section className="location-section section" id="ubicacion">
      <Reveal as="div" className="section-heading">
        <div>
          <span className="kicker">DÓNDE ENCONTRARNOS</span>
          <h2>
            Atención técnica
            <br />
            <em>en Caracas.</em>
          </h2>
        </div>
        <p>{ADDRESS}</p>
      </Reveal>
      <Reveal as="div" delay={80} className="map-wrap">
        <iframe
          className="map-frame"
          title="Ubicación de Autotrónica Go Diagnosis"
          src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Reveal>
    </section>
  );
}
