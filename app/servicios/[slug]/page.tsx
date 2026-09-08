import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Assistant from "@/components/Assistant";
import ServiceAssistantActions from "@/components/ServiceAssistantActions";
import {
  ADDRESS,
  BUSINESS_NAME,
  EMAIL,
  PHONE_DISPLAY,
  SITE_URL,
  getSeoService,
  seoServices,
} from "@/lib/seo-services";

const serviceHeroImages: Record<string, string> = {
  "diagnostico-electronico-caracas": "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1040_ioaslw.jpg",
  "reparacion-ecu-caracas": "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305084/IMG_1037_jjr5kk.jpg",
  "reparacion-abs-caracas": "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1042_jaz2yl.jpg",
  "reparacion-bcm-tipm-caracas": "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305083/IMG_1041_i447vu.jpg",
  "programacion-ecu-caracas": "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1039_pnpd8p.jpg",
  "inyectores-gdi-efi-caracas": "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305085/IMG_1036_f5jobx.jpg",
  "diagnostico-diesel-12v-24v-caracas": "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1045_i97gv3.jpg",
  "servicio-automotriz-domicilio-caracas": "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305085/IMG_1038_ggdubh.jpg",
};

export function generateStaticParams() {
  return seoServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getSeoService(slug);
  if (!service) return {};
  const heroImage = serviceHeroImages[service.slug];

  return {
    title: service.title,
    description: service.description,
    keywords: service.keywords,
    alternates: { canonical: `/servicios/${service.slug}` },
    openGraph: {
      title: service.title,
      description: service.description,
      url: `${SITE_URL}/servicios/${service.slug}`,
      type: "website",
      locale: "es_VE",
      siteName: BUSINESS_NAME,
      images: heroImage ? [{ url: heroImage, alt: service.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
      images: heroImage ? [heroImage] : undefined,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getSeoService(slug);
  if (!service) notFound();

  const serviceUrl = `${SITE_URL}/servicios/${service.slug}`;
  const heroImage = serviceHeroImages[service.slug];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.shortName,
    description: service.description,
    url: serviceUrl,
    areaServed: {
      "@type": "City",
      name: "Caracas",
    },
    provider: {
      "@type": "AutoRepair",
      "@id": `${SITE_URL}/#business`,
      name: BUSINESS_NAME,
      url: SITE_URL,
      telephone: PHONE_DISPLAY,
      email: EMAIL,
      address: {
        "@type": "PostalAddress",
        streetAddress: "F338+3R",
        addressLocality: "Caracas",
        postalCode: "1090",
        addressRegion: "Distrito Capital",
        addressCountry: "VE",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Servicios", item: `${SITE_URL}/servicios` },
      { "@type": "ListItem", position: 3, name: service.shortName, item: serviceUrl },
    ],
  };

  return (
    <main className="seo-service-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="seo-page-nav">
        <Link href="/" className="seo-page-brand">AUTOTRÓNICA GO DIAGNOSIS</Link>
        <Link href="/servicios" className="seo-page-nav-cta">Volver</Link>
      </header>

      <section
        className="seo-page-hero seo-page-hero-cover"
        style={heroImage ? { backgroundImage: `linear-gradient(90deg, rgba(3,5,7,.94) 0%, rgba(3,5,7,.78) 45%, rgba(3,5,7,.42) 100%), linear-gradient(180deg, rgba(3,5,7,.2) 0%, rgba(3,5,7,.7) 100%), url(${heroImage})` } : undefined}
      >
        <div className="seo-page-inner">
          <nav className="seo-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Inicio</Link><span>/</span><Link href="/servicios">Servicios</Link><span>/</span><b>{service.shortName}</b>
          </nav>
          <span className="kicker">SERVICIO ESPECIALIZADO · CARACAS</span>
          <h1>{service.name}</h1>
          <p>{service.intro}</p>
          <ServiceAssistantActions service={service.shortName} />
        </div>
      </section>

      <section className="seo-page-content seo-page-inner">
        <article className="seo-copy-card seo-copy-card-wide">
          <span className="seo-card-label">CUÁNDO INTERVIENE ESTE SERVICIO</span>
          <h2>Diagnóstico antes de reemplazar.</h2>
          <p>{service.problem}</p>
        </article>

        <div className="seo-content-grid">
          <article className="seo-copy-card">
            <span className="seo-card-label">PROCESO DE TRABAJO</span>
            <ol>{service.process.map((step, index) => <li key={step}><b>{String(index + 1).padStart(2, "0")}</b><span>{step}</span></li>)}</ol>
          </article>
          <article className="seo-copy-card">
            <span className="seo-card-label">APLICACIONES</span>
            <ul>{service.applications.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>

        <article className="seo-local-card">
          <div>
            <span className="seo-card-label">ATENCIÓN EN CARACAS</span>
            <h2>Atención técnica en taller.</h2>
            <p>La atención principal se realiza en nuestro taller. Programación y EGR OFF pueden coordinarse a domicilio con turno y validación previa de vehículo, zona y compatibilidad.</p>
          </div>
          <div className="seo-local-data">
            <p><b>Dirección</b><span>{ADDRESS}</span></p>
            <p><b>Horario</b><span>Lunes a viernes 8:00–18:00 · Sábados 9:00–15:00</span></p>
            <p><b>Contacto</b><span>{PHONE_DISPLAY}</span></p>
          </div>
        </article>

        <section className="seo-related-services">
          <span className="seo-card-label">OTROS SERVICIOS</span>
          <h2>Especialidades relacionadas</h2>
          <div className="seo-related-grid">
            {seoServices.filter((item) => item.slug !== service.slug).slice(0, 4).map((item) => (
              <Link href={`/servicios/${item.slug}`} key={item.slug}>{item.shortName}<span>→</span></Link>
            ))}
          </div>
        </section>
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
