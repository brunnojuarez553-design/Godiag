import Link from "next/link";
import { seoServices } from "@/lib/seo-services";

export default function SeoServiceHub() {
  return (
    <section className="seo-service-hub" aria-labelledby="seo-services-title">
      <div className="seo-hub-inner">
        <div className="seo-hub-heading">
          <div>
            <span className="kicker">SERVICIOS EN CARACAS</span>
            <h2 id="seo-services-title">Especialidades técnicas con información detallada.</h2>
          </div>
          <p>Conocé cómo abordamos cada tipo de trabajo, qué sistemas evaluamos y cómo coordinar atención en taller o a domicilio en Caracas.</p>
        </div>
        <div className="seo-hub-grid">
          {seoServices.map((service, index) => (
            <Link className="seo-hub-card" href={`/servicios/${service.slug}`} key={service.slug}>
              <span>{String(index + 1).padStart(2, "0")} · CARACAS</span>
              <b>{service.shortName}</b>
              <small>Ver servicio y proceso →</small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
