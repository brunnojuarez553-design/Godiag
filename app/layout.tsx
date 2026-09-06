import type { Metadata } from "next";
import "./globals.css";

const logo = "https://res.cloudinary.com/dvvuwigmy/image/upload/v1788232533/IMG_1016_y4atye.jpg";
const ogImage = "https://res.cloudinary.com/dvvuwigmy/image/upload/v1788231287/IMG_1017_rx0uzq.jpg";
const title = "Autotrónica Go Diagnosis | Diagnóstico Automotriz a Domicilio en Caracas";
const description =
  "Autotrónica Go Diagnosis en Caracas: diagnóstico, programación y electrónica automotriz en taller y a domicilio. ECU, ABS, BCM/TIPM, tableros, EFI/GDI, EGR OFF, programación ECU y diésel 12V/24V.";

export const metadata: Metadata = {
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
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: logo },
  openGraph: {
    title,
    description,
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="preloader" aria-hidden="true">
          <img src={logo} alt="" />
        </div>
        {children}
      </body>
    </html>
  );
}
