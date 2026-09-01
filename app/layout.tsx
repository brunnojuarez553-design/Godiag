import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Autotrónica Go Diag | Diagnóstico Automotriz", description: "Diagnóstico electrónico, reparación de ECU, ABS, BCM y tuning automotriz en Caracas.", icons:{icon:"https://res.cloudinary.com/dvvuwigmy/image/upload/v1788232533/IMG_1016_y4atye.jpg",apple:"https://res.cloudinary.com/dvvuwigmy/image/upload/v1788232533/IMG_1016_y4atye.jpg"} };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
