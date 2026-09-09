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
import "./mobile-fixes.css";
import "./quiz-background.css";
import "./section-order.css";
import "./section-backgrounds.css";
import "./expert-premium.css";
import "./location-access.css";
import "./readability.css";
import "./premium-finish.css";
import "./final-audit.css";
import "./theme.css";

const logo = "https://res.cloudinary.com/dvvuwigmy/image/upload/v1788232533/IMG_1016_y4atye.jpg";
const specialistImage = "https://res.cloudinary.com/dvvuwigmy/image/upload/v1788231287/IMG_1017_rx0uzq.jpg";
const ogImage = logo;
const siteUrl = "https://www.autotronicagodiag.com";
const title = "Autotrónica Go Diagnosis | Diagnóstico Electrónico en Caracas";
const description =
  "Autotrónica Go Diagnosis en Caracas: diagnóstico electrónico, reparación ECU, ABS, BCM/TIPM, inyectores EFI/GDI, programación ECU y diésel 12V/24V. Atención principal en taller; programación y EGR OFF a domicilio con turno previo.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s" },
  description,
  applicationName: "Autotrónica Go Diagnosis",
  category: "Automotive",
  keywords: [
    "diagnóstico electrónico automotriz Caracas",
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
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Autotrónica Go Diagnosis",
    locale: "es_VE",
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 1200, alt: "Logo de Autotrónica Go Diagnosis" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  other: { "geo.region": "VE-A", "geo.placename": "Caracas, Venezuela", "content-language": "es-VE" },
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
  employee: { "@id": `${siteUrl}/#elian-gonzalez` },
  address: { "@type": "PostalAddress", streetAddress: "F338+3R", addressLocality: "Caracas", postalCode: "1090", addressRegion: "Distrito Capital", addressCountry: "VE" },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "15:00" },
  ],
  areaServed: { "@type": "City", name: "Caracas" },
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
    "Programación y EGR OFF a domicilio con turno previo",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Autotrónica Go Diagnosis",
    itemListElement: seoServices.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.name, url: `${siteUrl}/servicios/${service.slug}` },
    })),
  },
};

const specialistSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#elian-gonzalez`,
  name: "Elian José González Cruz",
  image: specialistImage,
  worksFor: { "@id": `${siteUrl}/#business` },
  jobTitle: "Ingeniero Mecánico y especialista en diagnóstico y electrónica automotriz",
  knowsAbout: [
    "Diagnóstico electrónico automotriz",
    "Programación ECU",
    "Reparación de módulos electrónicos automotrices",
    "Osciloscopio automotriz",
    "Inyección EFI y GDI",
    "Diagnóstico diésel 12V y 24V",
  ],
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

const themeInitScript = `
(() => {
  try {
    const stored = localStorage.getItem('godiag-theme');
    const theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.style.colorScheme = 'dark';
  }
})();
`;

const navScrollScript = `
(() => {
  const updateNav = () => {
    const header = document.querySelector('.nav');
    if (!header) return;
    header.style.transform = 'translateY(0)';
    header.classList.remove('nav-hidden');
    header.classList.add('nav-visible');
  };
  updateNav();
})();
`;

const premiumScrollScript = `
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const init = () => {
    const selectors = ['.services-more-wrap','.work-proof','.method-visual','.method-copy','.mobile-service-panel > div','.cta-section > *','footer > *'];
    const items = Array.from(document.querySelectorAll(selectors.join(','))).filter((el) => !el.classList.contains('premium-scroll-item'));
    if (!items.length) return;
    items.forEach((el, index) => {
      el.classList.add('premium-scroll-item');
      const dir = index % 3 === 0 ? 'left' : index % 3 === 1 ? 'right' : 'up';
      el.setAttribute('data-premium-dir', dir);
      el.style.setProperty('--premium-delay', String((index % 4) * 70) + 'ms');
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('premium-scroll-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    requestAnimationFrame(() => items.forEach((el) => io.observe(el)));
  };
  requestAnimationFrame(init);
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-VE" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(specialistSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
        {children}
        <GoogleAnalytics />
        <AnalyticsEvents />
        <script dangerouslySetInnerHTML={{ __html: navScrollScript }} />
        <script dangerouslySetInnerHTML={{ __html: premiumScrollScript }} />
      </body>
    </html>
  );
}
