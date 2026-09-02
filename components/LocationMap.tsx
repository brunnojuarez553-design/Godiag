import Reveal from "@/components/Reveal";

// TODO(Bruno): reemplazar por la dirección exacta del taller (o el Place ID de
// Google Maps) apenas la tengas a mano. Por ahora apunta al nombre del negocio
// en Caracas, que suele resolver bien si el local ya está cargado en Google Maps.
const MAPS_QUERY = "Autotrónica Go Diag, Caracas, Venezuela";

export default function LocationMap() {
  return (
    <section className="location-section section" id="ubicacion">
      <Reveal as="div" className="section-heading">
        <div>
          <span className="kicker">DÓNDE ENCONTRARNOS</span>
          <h2>
            Un taller,
            <br />
            <em>equipado en serio.</em>
          </h2>
        </div>
        <p>Visitanos en Caracas o coordiná una evaluación a domicilio si tu caso lo permite.</p>
      </Reveal>
      <Reveal as="div" delay={80} className="map-wrap">
        <iframe
          className="map-frame"
          title="Ubicación de Autotrónica Go Diag"
          src={`https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Reveal>
    </section>
  );
}
