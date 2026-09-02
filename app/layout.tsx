import type { Metadata } from "next";
import "./globals.css";

const logo = "https://res.cloudinary.com/dvvuwigmy/image/upload/v1788232533/IMG_1016_y4atye.jpg";
const ogImage = "https://res.cloudinary.com/dvvuwigmy/image/upload/v1788231287/IMG_1017_rx0uzq.jpg";
const title = "Autotrónica Go Diag | Diagnóstico Automotriz";
const description =
  "Diagnóstico electrónico, reparación de ECU, ABS, BCM y tuning automotriz en Caracas. Medimos antes de reemplazar.";

// TODO(Bruno): una vez que tengas el dominio final, agregá metadataBase: new URL("https://tu-dominio.com")
// para que las imágenes de Open Graph resuelvan siempre con URL absoluta.
export const metadata: Metadata = {
  title,
  description,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: logo },
  openGraph: {
    title,
    description,
    siteName: "Autotrónica Go Diag",
    locale: "es_VE",
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 1600, alt: "Ing. Elian González, especialista en autotrónica" }],
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
        {/* Preloader breve: 100% CSS, sin JS, para que no exista flash de contenido sin estilos */}
        <div className="preloader" aria-hidden="true">
          <img src={logo} alt="" />
        </div>
        {children}
      </body>
    </html>
  );
}
