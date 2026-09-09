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

const themeControlScript = `
(() => {
  const mount = () => {
    const nav = document.querySelector('.nav');
    if (!nav || nav.querySelector('.theme-toggle')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    button.setAttribute('aria-label', 'Cambiar modo de visualización');
    button.innerHTML = '<span class="theme-toggle-track" aria-hidden="true"><svg class="theme-toggle-sun" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"></path></svg><svg class="theme-toggle-moon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"></path></svg><span class="theme-toggle-knob"></span></span><span class="theme-toggle-label"></span>';

    const sync = () => {
      const isLight = document.documentElement.dataset.theme === 'light';
      button.classList.toggle('is-light', isLight);
      button.setAttribute('aria-pressed', String(isLight));
      button.setAttribute('title', isLight ? 'Modo día' : 'Modo noche');
      const label = button.querySelector('.theme-toggle-label');
      if (label) label.textContent = isLight ? 'Día' : 'Noche';
    };

    button.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      document.documentElement.style.colorScheme = next;
      try { localStorage.setItem('godiag-theme', next); } catch {}
      sync();
    });

    const quote = nav.querySelector('.nav-cta');
    if (quote) nav.insertBefore(button, quote);
    else {
      const menu = nav.querySelector('.menu-btn');
      if (menu) nav.insertBefore(button, menu);
      else nav.appendChild(button);
    }
    sync();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
`;

const navScrollScript = `
(() => {
  let lastY = window.scrollY;
  let ticking = false;
  const updateNav = () => {
    const header = document.querySelector('.nav');
    if (!header) { ticking = false; return; }
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
    if (!ticking) { window.requestAnimationFrame(updateNav); ticking = true; }
  };
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  document.addEventListener('click', () => window.requestAnimationFrame(updateNav), true);
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
        <script dangerouslySetInnerHTML={{ __html: themeControlScript }} />
        <script dangerouslySetInnerHTML={{ __html: navScrollScript }} />
        <script dangerouslySetInnerHTML={{ __html: premiumScrollScript }} />
      </body>
    </html>
  );
}
