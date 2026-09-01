import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Autotrónica Go Diag | Diagnóstico Automotriz", description: "Diagnóstico electrónico, reparación de ECU, ABS, BCM y tuning automotriz en Caracas.", icons:{icon:"/favicon.svg"} };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>}
