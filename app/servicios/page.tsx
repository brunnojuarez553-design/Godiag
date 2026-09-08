import type { Metadata } from "next";
import Link from "next/link";
import {
  ADDRESS,
  BUSINESS_NAME,
  PHONE_DISPLAY,
  SITE_URL,
  WHATSAPP,
  seoServices,
} from "@/lib/seo-services";

export const metadata: Metadata = {
  title: "Servicios de Electrónica Automotriz en Caracas | Autotrónica Go Diagnosis",
  description:
    "Servicios de diagnóstico, reparación y programación automotriz en Caracas: ECU, ABS, BCM/TIPM, inyectores GDI/EFI, diésel 12V/24V, EGR OFF y atención a domicilio.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios de Autotrónica Go Diagnosis en Caracas",
    description:
      "Diagnóstico electrónico, reparación de módulos, programación ECU, inyectores, diésel y atención a domicilio en Caracas.",
    url: `${SITE_URL}/servicios`,
    type: "website",
    locale: "es_VE",
    siteName: BUSINESS_NAME,
  },
};

const extraServices = [
  "Mantenimiento y diagnóstico general",
  "Diagnóstico con osciloscopio y trazador de curvas",
  "Reparación de cableado automotriz",
  "Reparación de tablero / cluster",
  "Descarbonización de válvulas y admisión",
  "EGR OFF Toyota en aplicaciones compatibles, sujeto a normativa",
  "Reprogramación con HP Tuners, BitEdit y VFTuner",
  "Diagnóstico en vehículos gasolina, diésel y eléctricos compatibles",
];

export default function ServicesPage() {
  const whatsappText = encodeURIComponent(
    "Hola Autotrónica Go Diagnosis. Quiero consultar por uno de sus servicios automotrices."
  );

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios de Autotrónica Go Diagnosis",
    itemListElement: seoServices.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/servicios/${service.slug}`,
      name: service.name,
    })),
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Servicios de Autotrónica Go Diagnosis",
    url: `${SITE_URL}/servicios`,
    description:
      "Servicios especializados de diagnóstico, reparación, programación y electrónica automotriz en Caracas.",
    about: { "@id": `${SITE_URL}/#business` },
  };

  return (
    <main className="seo-service-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <header className="seo-page-nav">
        <Link href="/" className="seo-page-brand">AUTOTRÓNICA GO DIAGNOSIS</Link>
        <a
          href={`https://wa.me/${WHATSAPP}?text=${whatsappText}`}
          target="_blank"
          rel="noreferrer"
          className="seo-page-nav-cta"
        >
          Consultar
        </a>
      </header>

      <section className="seo-page-hero">
        <div className="seo-page-inner">
          <nav className="seo-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Inicio</Link><span>/</span><b>Servicios</b>
          </nav>
          <span className="kicker">DIAGNÓSTICO · REPARACIÓN · PROGRAMACIÓN · CARACAS</span>
          <h1>Servicios de electrónica automotriz en Caracas.</h1>
          <p>
            Diagnóstico basado en medición, reparación electrónica y programación para vehículos que requieren una evaluación técnica antes de reemplazar piezas. Atención en taller y servicios coordinables a domicilio.
          </p>
          <div className="seo-page-actions">
            <a
              href={`https://wa.me/${WHATSAPP}?text=${whatsappText}`}
              target="_blank"
              rel="noreferrer"
              className="primary-btn"
            >
              Consultar por WhatsApp
            </a>
            <Link href="/#trabajos" className="seo-secondary-link">Ver trabajos realizados</Link>
          </div>
        </div>
      </section>

      <section className="seo-page-content seo-page-inner">
        <article className="seo-copy-card seo-copy-card-wide">
          <div>
            <span className="seo-card-label">SERVICIOS ESPECIALIZADOS</span>
            <h2>Encontrá el servicio que necesitás.</h2>
          </div>
          <p>
            Cada caso se evalúa según vehículo, síntomas y sistema afectado. Estas páginas explican las principales especialidades de Autotrónica Go Diagnosis y permiten consultar directamente por el trabajo correspondiente.
          </p>
        </article>

        <section className="seo-related-services" style={{ paddingTop: 46 }}>
          <div className="seo-related-grid">
            {seoServices.map((service) => (
              <Link href={`/servicios/${service.slug}`} key={service.slug}>
                <span style={{ color: "inherit" }}>{service.shortName}</span><span>→</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="seo-content-grid" style={{ marginTop: 48 }}>
          <article className="seo-copy-card">
            <span className="seo-card-label">OTRAS CAPACIDADES</span>
            <h2>Más servicios del taller.</h2>
            <ul>
              {extraServices.map((service) => <li key={service}>{service}</li>)}
            </ul>
          </article>

          <article className="seo-copy-card">
            <span className="seo-card-label">MARCAS Y APLICACIONES</span>
            <h2>Atención multimarca.</h2>
            <p>
              Experiencia destacada en Toyota, Ford, Chevrolet, Mitsubishi, Jeep, Dodge y Chrysler, además de otras aplicaciones compatibles según sistema y herramienta disponible.
            </p>
            <ul>
              <li>Gasolina</li>
              <li>Diésel 12V / 24V</li>
              <li>Vehículos eléctricos compatibles</li>
              <li>ECU, ABS, BCM, TIPM y cluster</li>
            </ul>
          </article>
        </div>

        <article className="seo-local-card">
          <div>
            <span className="seo-card-label">ATENCIÓN EN CARACAS</span>
            <h2>Taller y servicio a domicilio.</h2>
            <p>
              Podés acercarte al taller o coordinar atención a domicilio. La zona, el vehículo y el alcance del trabajo se confirman previamente por WhatsApp.
            </p>
          </div>
          <div className="seo-local-data">
            <p><b>Dirección</b><span>{ADDRESS}</span></p>
            <p><b>Horario</b><span>Lunes a viernes 8:00–18:00 · Sábados 9:00–15:00</span></p>
            <p><b>WhatsApp</b><span>{PHONE_DISPLAY}</span></p>
          </div>
        </article>
      </section>

      <footer className="seo-page-footer">
        <div className="seo-page-inner">
          <b>{BUSINESS_NAME}</b>
          <span>Diagnóstico, programación y electrónica automotriz en Caracas.</span>
          <Link href="/">Volver al sitio principal</Link>
        </div>
      </footer>
    </main>
  );
}
