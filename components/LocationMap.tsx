import Reveal from "@/components/Reveal";

const ADDRESS = "Ubicación oficial de GODIAG en Caracas, Venezuela";
const MAP_EMBED_QUERY = "10.452695,-66.932602";
const ARRIVAL_VIDEO = "https://res.cloudinary.com/dpiavcukm/video/upload/v1788908637/405e1d9e-63ad-4a4f-b5c6-205eb2ad9658_wwfjql.mp4";
const MAP_URL = "https://maps.app.goo.gl/obQw9QpryJgFVdJo7";

export default function LocationMap() {
  return (
    <section className="location-section section" id="ubicacion">
      <Reveal as="div" className="section-heading">
        <div>
          <span className="kicker">UBICACIÓN · ACCESO AL TALLER</span>
          <h2>
            Encontranos fácil.
            <br />
            <em>Mirá cómo llegar.</em>
          </h2>
        </div>
        <p>
          La atención principal se realiza en el taller, en {ADDRESS}. Programación y EGR OFF pueden coordinarse a domicilio con turno previo.
        </p>
      </Reveal>

      <div className="location-experience">
        <Reveal as="div" delay={80} className="location-card map-wrap">
          <iframe
            className="map-frame"
            title="Ubicación de Autotrónica Go Diagnosis"
            src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_EMBED_QUERY)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>

        <Reveal as="article" delay={140} className="arrival-card">
          <div className="arrival-head">
            <span className="kicker">CÓMO LLEGAR</span>
            <h3>Referencia visual del acceso.</h3>
            <p>
              Mirá el recorrido antes de venir para ubicar la entrada del taller de forma simple y sin perder tiempo.
            </p>
          </div>

          <div className="arrival-video-shell">
            <video
              className="arrival-video"
              src={ARRIVAL_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              aria-label="Video de cómo llegar a Autotrónica Go Diagnosis"
            />
          </div>

          <div className="arrival-meta">
            <span>Caracas · acceso real al taller</span>
            <a className="arrival-map-link" href={MAP_URL} target="_blank" rel="noreferrer">
              Abrir en Google Maps
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
