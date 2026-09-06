import type { Metadata } from "next";
import "./globals.css";
import "./premium.css";

const logo = "https://res.cloudinary.com/dvvuwigmy/image/upload/v1788232533/IMG_1016_y4atye.jpg";
const ogImage = "https://res.cloudinary.com/dvvuwigmy/image/upload/v1788231287/IMG_1017_rx0uzq.jpg";
const siteUrl = "https://www.autotronicagodiag.com";
const title = "Autotrónica Go Diagnosis | Diagnóstico Automotriz a Domicilio en Caracas";
const description =
  "Autotrónica Go Diagnosis en Caracas: diagnóstico, programación y electrónica automotriz en taller y a domicilio. ECU, ABS, BCM/TIPM, tableros, EFI/GDI, EGR OFF, programación ECU y diésel 12V/24V.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "diagnóstico electrónico automotriz Caracas",
    "diagnóstico automotriz a domicilio Caracas",
    "electrónica automotriz a domicilio Caracas",
    "reparación ECU Caracas",
    "reparación computadora de carro",
    "reparación módulo ABS",
    "reparación BCM TIPM",
    "diagnóstico con osciloscopio automotriz",
    "reprogramación ECU HP Tuners",
    "EGR OFF Toyota",
    "limpieza inyectores GDI EFI",
    "diagnóstico diésel 12V 24V",
  ],
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: logo },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Autotrónica Go Diagnosis",
    locale: "es_VE",
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 1600, alt: "Elian José González Cruz - Autotrónica Go Diagnosis" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Autotrónica Go Diagnosis",
  url: siteUrl,
  image: logo,
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
  areaServed: "Caracas, Venezuela",
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <div className="preloader" aria-hidden="true">
          <img src={logo} alt="" />
        </div>
        {children}
      </body>
    </html>
  );
}
