import type { Metadata } from "next";
import "./bio.css";

export const metadata: Metadata = {
  title: "Enlaces y diagnóstico | Autotrónica Go Diagnosis",
  description:
    "Diagnóstico guiado, asistencia técnica, contacto, ubicación y redes oficiales de Autotrónica Go Diagnosis en Caracas.",
  alternates: { canonical: "/bio" },
};

export default function BioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
