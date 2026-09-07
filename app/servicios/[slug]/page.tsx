import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ADDRESS,
  BUSINESS_NAME,
  EMAIL,
  PHONE_DISPLAY,
  SITE_URL,
  WHATSAPP,
  getSeoService,
  seoServices,
} from "@/lib/seo-services";

export function generateStaticParams() {
  return seoServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getSeoService(slug);
  if (!service) return {};

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
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getSeoService(slug);
  if (!service) notFound();

  const serviceUrl = `${SITE_URL}/servicios/${service.slug}`;
  const whatsappText = encodeURIComponent(`Hola Autotrónica Go Diagnosis. Quiero consultar por ${service.shortName}.`);

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
      { "@type": "ListItem", position: 2, name: "Servicios", item: `${SITE_URL}/#especialidades` },
      { "@type": "ListItem", position: 3, name: service.shortName, item: serviceUrl },
    ],
  };

  return (
    <main className="seo-service-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="seo-page-nav">
        <Link href="/" className="seo-page-brand">AUTOTRÓNICA GO DIAGNOSIS</Link>
        <Link href="/#contacto" className="seo-page-nav-cta">Solicitar diagnóstico</Link>
      </header>

      <section className="seo-page-hero">
        <div className="seo-page-inner">
          <nav className="seo-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Inicio</Link><span>/</span><Link href="/#especialidades">Servicios</Link><span>/</span><b>{service.shortName}</b>
          </nav>
          <span className="kicker">SERVICIO ESPECIALIZADO · CARACAS</span>
          <h1>{service.name}</h1>
          <p>{service.intro}</p>
          <div className="seo-page-actions">
            <a href={`https://wa.me/${WHATSAPP}?text=${whatsappText}`} target="_blank" rel="noreferrer" className="primary-btn">Consultar por WhatsApp</a>
            <Link href="/#trabajos" className="seo-secondary-link">Ver trabajos realizados</Link>
          </div>
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
            <h2>Taller y servicio a domicilio.</h2>
            <p>Podés coordinar la evaluación en nuestro taller o solicitar atención a domicilio. La zona, el vehículo y el alcance del trabajo se confirman previamente por WhatsApp.</p>
          </div>
          <div className="seo-local-data">
            <p><b>Dirección</b><span>{ADDRESS}</span></p>
            <p><b>Horario</b><span>Lunes a viernes 8:00–18:00 · Sábados 9:00–15:00</span></p>
            <p><b>WhatsApp</b><span>{PHONE_DISPLAY}</span></p>
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
    </main>
  );
}
