import type { Metadata } from "next";
import Link from "next/link";
import ServicesVisualGrid from "@/components/ServicesVisualGrid";
import Assistant from "@/components/Assistant";
import ServiceAssistantActions from "@/components/ServiceAssistantActions";
import {
  ADDRESS,
  BUSINESS_NAME,
  PHONE_DISPLAY,
  SITE_URL,
  seoServices,
} from "@/lib/seo-services";

const LOGO = "https://res.cloudinary.com/dvvuwigmy/image/upload/v1788232533/IMG_1016_y4atye.jpg";
const HERO_IMAGE = "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1040_ioaslw.jpg";

export const metadata: Metadata = {
  title: "Servicios de Electrónica Automotriz en Caracas | Autotrónica Go Diagnosis",
  description:
    "Servicios de diagnóstico, reparación y programación automotriz en Caracas: ECU, ABS, BCM/TIPM, inyectores GDI/EFI, diésel 12V/24V y programación/EGR OFF a domicilio con coordinación previa.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios de Autotrónica Go Diagnosis en Caracas",
    description:
      "Diagnóstico electrónico, reparación de módulos, programación ECU, inyectores, diésel y programación/EGR OFF a domicilio con coordinación previa.",
    url: `${SITE_URL}/servicios`,
    type: "website",
    locale: "es_VE",
    siteName: BUSINESS_NAME,
    images: [{ url: HERO_IMAGE, alt: "Diagnóstico electrónico automotriz en Autotrónica Go Diagnosis" }],
  },
};

export default function ServicesPage() {
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
    <main className="seo-service-page services-page-premium">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <header className="seo-page-nav services-page-nav">
        <Link href="/" className="services-page-logo" aria-label="Volver al inicio de Autotrónica Go Diagnosis">
          <img src={LOGO} alt="Autotrónica Go Diagnosis" />
        </Link>
        <Link href="/" className="seo-page-nav-cta services-back-btn">Volver</Link>
      </header>

      <section
        className="seo-page-hero services-page-hero"
        style={{ backgroundImage: `linear-gradient(90deg,rgba(6,8,10,.98) 0%,rgba(6,8,10,.86) 52%,rgba(13,5,7,.6) 100%),url("${HERO_IMAGE}")` }}
      >
        <div className="seo-page-inner services-hero-inner">
          <nav className="seo-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Inicio</Link><span>/</span><b>Servicios</b>
          </nav>
          <span className="kicker">DIAGNÓSTICO · REPARACIÓN · PROGRAMACIÓN · CARACAS</span>
          <h1>Servicios de electrónica automotriz en Caracas.</h1>
          <p>
            Diagnóstico basado en medición, reparación electrónica y programación para vehículos que requieren una evaluación técnica antes de reemplazar piezas. La atención se realiza en taller; programación y EGR OFF pueden coordinarse a domicilio con turno previo.
          </p>
          <ServiceAssistantActions service="Servicios de electrónica automotriz" />
        </div>
      </section>

      <section className="services-showcase seo-page-inner">
        <div className="services-showcase-heading">
          <div>
            <span className="seo-card-label">SERVICIOS ESPECIALIZADOS</span>
            <h2>Elegí el área que necesitás.</h2>
          </div>
          <p>
            Tocá cualquier servicio para ver qué se evalúa, cómo se trabaja y consultar directamente con el asistente virtual.
          </p>
        </div>
        <ServicesVisualGrid />
      </section>

      <section className="seo-page-content seo-page-inner services-support-content">
        <div className="seo-content-grid">
          <article className="seo-copy-card services-compact-card">
            <span className="seo-card-label">MARCAS Y APLICACIONES</span>
            <h2>Atención multimarca.</h2>
            <p>
              Experiencia destacada en Toyota, Ford, Chevrolet, Mitsubishi, Jeep, Dodge y Chrysler, además de otras aplicaciones compatibles según sistema y herramienta disponible.
            </p>
            <div className="services-chip-grid">
              <span>Gasolina</span><span>Diésel 12V / 24V</span><span>Eléctricos compatibles</span><span>ECU · ABS · BCM · TIPM</span>
            </div>
          </article>

          <article className="seo-copy-card services-compact-card">
            <span className="seo-card-label">FORMA DE TRABAJO</span>
            <h2>Medir antes de intervenir.</h2>
            <p>
              El objetivo es encontrar la causa de la falla con lectura, comprobación y medición antes de decidir qué reparar, programar o reemplazar.
            </p>
            <div className="services-chip-grid">
              <span>Diagnóstico previo</span><span>Instrumentación</span><span>Software especializado</span><span>Atención directa</span>
            </div>
          </article>
        </div>

        <article className="seo-local-card services-local-premium">
          <div>
            <span className="seo-card-label">ATENCIÓN EN CARACAS</span>
            <h2>Atención técnica en taller.</h2>
            <p>
              La atención principal se realiza en taller. Programación y EGR OFF pueden coordinarse a domicilio con turno y validación previa de vehículo, zona y compatibilidad.
            </p>
          </div>
          <div className="seo-local-data">
            <p><b>Dirección</b><span>{ADDRESS}</span></p>
            <p><b>Horario</b><span>Lunes a viernes 8:00–18:00 · Sábados 9:00–15:00</span></p>
            <p><b>Contacto</b><span>{PHONE_DISPLAY}</span></p>
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
      <Assistant />
    </main>
  );
}
