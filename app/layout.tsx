import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Autotrónica Go Diag | Diagnóstico Automotriz", description: "Diagnóstico electrónico, reparación de ECU, ABS, BCM y tuning automotriz en Caracas.", icons:{icon:"https://res.cloudinary.com/dvvuwigmy/image/upload/v1788232533/IMG_1016_y4atye.jpg",apple:"https://res.cloudinary.com/dvvuwigmy/image/upload/v1788232533/IMG_1016_y4atye.jpg"}, other:{ "google": "notranslate" } };
// translate="no" + meta google:notranslate evitan que el traductor automático de Chrome reescriba el DOM y rompa el chat/React.
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es" translate="no"><body className="notranslate">{children}</body></html>}
