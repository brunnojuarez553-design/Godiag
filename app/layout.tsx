import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import { seoServices } from "@/lib/seo-services";
import "./globals.css";
import "./premium.css";
import "./polish.css";
import "./audit.css";
import "./brand-marquee.css";
import "./mobile-experience.css";
import "./mobile-masonry.css";
import "./case-lightbox.css";
import "./seo-pages.css";

const logo = "https://res.cloudinary.com/dvvuwigmy/image/upload/v1788232533/IMG_1016_y4atye.jpg";
const ogImage = "https://res.cloudinary.com/dvvuwigmy/image/upload/v1788231287/IMG_1017_rx0uzq.jpg";
const siteUrl = "https://www.autotronicagodiag.com";
const title = "Autotrónica Go Diagnosis | Diagnóstico Electrónico en Caracas";
const description =
  "Autotrónica Go Diagnosis en Caracas: diagnóstico electrónico, reparación ECU, ABS, BCM/TIPM, inyectores EFI/GDI, programación ECU y diésel 12V/24V. Atención en taller y a domicilio.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s",
  },
  description,
  applicationName: "Autotrónica Go Diagnosis",
  category: "Automotive",
  keywords: [
    "diagnóstico electrónico automotriz Caracas",
    "diagnóstico automotriz a domicilio Caracas",
    "electrónica automotriz Caracas",
    "reparación ECU Caracas",
    "reparación computadora de carro",
    "reparación módulo ABS Caracas",
    "reparación BCM TIPM Caracas",
    "diagnóstico con osciloscopio automotriz",
    "reprogramación ECU HP Tuners Caracas",
    "VFTuner Toyota Caracas",
    "BitEdit ECU Caracas",
    "EGR OFF Toyota Caracas",
    "limpieza inyectores GDI EFI Caracas",
    "diagnóstico diésel 12V 24V Caracas",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: logo },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Autotrónica Go Diagnosis",
    locale: "es_VE",
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 1600, alt: "Autotrónica Go Diagnosis - electrónica automotriz en Caracas" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  other: {
    "geo.region": "VE-A",
    "geo.placename": "Caracas, Venezuela",
    "content-language": "es-VE",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": `${siteUrl}/#business`,
  name: "Autotrónica Go Diagnosis",
  url: siteUrl,
  image: logo,
  logo,
  email: "godiag2023@gmail.com",
  telephone: "+58 422 287 2237",
  description,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Carretera Panamericana, vía Los Teques, km 1.5, sector industrial Los Cocos",
    addressLocality: "Caracas",
    addressCountry: "VE",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "15:00",
    },
  ],
  areaServed: {
    "@type": "City",
    name: "Caracas",
  },
  sameAs: [
    "https://www.instagram.com/godiag.ve",
    "https://www.tiktok.com/@godiag.ve",
    "https://www.facebook.com/share/1BvVCyMgEn/",
    "https://youtube.com/@autotronicagodiag",
  ],
  knowsAbout: [
    "Diagnóstico electrónico automotriz",
    "Reparación ECU",
    "Reparación ABS",
    "Reparación BCM y TIPM",
    "Programación ECU",
    "Inyección EFI y GDI",
    "Diagnóstico diésel 12V y 24V",
    "Servicio automotriz a domicilio",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Autotrónica Go Diagnosis",
    itemListElement: seoServices.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        url: `${siteUrl}/servicios/${service.slug}`,
      },
    })),
  },
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Autotrónica Go Diagnosis",
  inLanguage: "es-VE",
  publisher: { "@id": `${siteUrl}/#business` },
};

const navScrollScript = `
(() => {
  let lastY = window.scrollY;
  let ticking = false;

  const updateNav = () => {
    const header = document.querySelector('.nav');
    if (!header) {
      ticking = false;
      return;
    }

    header.style.willChange = 'transform';
    header.style.transition = 'transform .34s cubic-bezier(.16,1,.3,1), background-color .35s ease, border-color .35s ease, backdrop-filter .35s ease';

    const y = window.scrollY;
    const menuOpen = header.querySelector('nav')?.classList.contains('open');
    const goingUp = y < lastY - 4;
    const goingDown = y > lastY + 8;

    if (y < 90 || menuOpen || goingUp) {
      header.style.transform = 'translateY(0)';
      header.classList.remove('nav-hidden');
      header.classList.add('nav-visible');
    } else if (goingDown && y > 140) {
      header.style.transform = 'translateY(calc(-100% - 10px))';
      header.classList.add('nav-hidden');
      header.classList.remove('nav-visible');
    }

    lastY = y;
    ticking = false;
  };

  const requestUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNav);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  document.addEventListener('click', () => window.requestAnimationFrame(updateNav), true);
  updateNav();
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-VE">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
        <div className="preloader" aria-hidden="true">
          <img src={logo} alt="" />
        </div>
        {children}
        <GoogleAnalytics />
        <AnalyticsEvents />
        <script dangerouslySetInnerHTML={{ __html: navScrollScript }} />
      </body>
    </html>
  );
}
