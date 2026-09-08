"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";

const WHATSAPP = "584222872237";

type ServiceItem = {
  title: string;
  tag: string;
  image: string;
  summary: string;
  detail: string;
  includes: string[];
  href?: string;
};

const services: ServiceItem[] = [
  {
    title: "Diagnóstico electrónico",
    tag: "DIAGNÓSTICO",
    image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1040_ioaslw.jpg",
    summary: "Lectura avanzada, medición y análisis para encontrar la causa real de fallas eléctricas y electrónicas.",
    detail: "Se evalúan síntomas, códigos, señales, alimentación y comunicación entre sistemas antes de definir qué componente intervenir.",
    includes: ["Escáner y lectura de sistemas", "Medición de señales y circuitos", "Diagnóstico antes de reemplazar piezas"],
    href: "/servicios/diagnostico-electronico-caracas",
  },
  {
    title: "Reparación de ECU",
    tag: "ECU / MÓDULOS",
    image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305084/IMG_1037_jjr5kk.jpg",
    summary: "Diagnóstico y reparación electrónica de computadoras de motor y unidades de control.",
    detail: "Antes de considerar un reemplazo se comprueban alimentación, comunicación y condición electrónica del módulo para determinar si la ECU admite reparación o intervención.",
    includes: ["Evaluación electrónica de ECU", "Comprobación de comunicación", "Reparación según falla localizada"],
    href: "/servicios/reparacion-ecu-caracas",
  },
  {
    title: "Reparación de ABS",
    tag: "ABS",
    image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1042_jaz2yl.jpg",
    summary: "Evaluación y reparación de módulos ABS y fallas electrónicas asociadas al sistema.",
    detail: "El diagnóstico diferencia problemas de sensor, cableado, alimentación, comunicación o electrónica interna antes de intervenir el módulo.",
    includes: ["Lectura de fallas ABS", "Comprobación eléctrica", "Evaluación del módulo"],
    href: "/servicios/reparacion-abs-caracas",
  },
  {
    title: "BCM / TIPM",
    tag: "CARROCERÍA",
    image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305083/IMG_1041_i447vu.jpg",
    summary: "Diagnóstico e intervención de módulos BCM y TIPM para problemas de control, alimentación y comunicación.",
    detail: "Se trabaja especialmente sobre anomalías eléctricas y electrónicas que pueden afectar múltiples funciones del vehículo al mismo tiempo.",
    includes: ["BCM", "TIPM", "Jeep · Dodge · Chrysler y compatibles"],
    href: "/servicios/reparacion-bcm-tipm-caracas",
  },
  {
    title: "Programación ECU",
    tag: "SOFTWARE",
    image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1039_pnpd8p.jpg",
    summary: "Programación, calibración y ajustes de ECU con herramientas especializadas según vehículo y aplicación.",
    detail: "La intervención parte de una evaluación técnica y de compatibilidad antes de cualquier modificación de parámetros o software.",
    includes: ["HP Tuners", "BitEdit", "VFTuner"],
    href: "/servicios/programacion-ecu-caracas",
  },
  {
    title: "Inyectores EFI / GDI",
    tag: "INYECCIÓN",
    image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305085/IMG_1036_f5jobx.jpg",
    summary: "Entonación, limpieza y prueba de inyectores para verificar funcionamiento y entrega.",
    detail: "El servicio permite revisar la condición de los inyectores dentro de un diagnóstico del sistema de combustible e inyección.",
    includes: ["Limpieza", "Prueba", "Verificación de funcionamiento"],
    href: "/servicios/inyectores-gdi-efi-caracas",
  },
  {
    title: "Diagnóstico diésel 12V / 24V",
    tag: "DIÉSEL",
    image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1045_i97gv3.jpg",
    summary: "Diagnóstico electrónico para sistemas diésel de 12 y 24 voltios en vehículos y equipos compatibles.",
    detail: "Se comprueban alimentación, señales, sensores, actuadores y electrónica de control según el sistema y la falla reportada.",
    includes: ["Sistemas 12V", "Sistemas 24V", "Vehículos y equipos compatibles"],
    href: "/servicios/diagnostico-diesel-12v-24v-caracas",
  },
  {
    title: "Servicio a domicilio",
    tag: "CARACAS",
    image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1040_ioaslw.jpg",
    summary: "Diagnóstico, programación y electrónica automotriz coordinable en la ubicación del vehículo.",
    detail: "Antes de la visita se realiza una preevaluación por WhatsApp para conocer vehículo, síntoma, zona y equipamiento necesario.",
    includes: ["Preevaluación por WhatsApp", "Coordinación de zona", "Atención técnica en el lugar"],
    href: "/servicios/servicio-automotriz-domicilio-caracas",
  },
  {
    title: "Osciloscopio y trazador de curvas",
    tag: "MEDICIÓN",
    image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305084/IMG_1044_of37oy.jpg",
    summary: "Análisis de señales eléctricas para diagnosticar sensores, actuadores, cableado y módulos.",
    detail: "La instrumentación permite observar comportamientos que no siempre aparecen en una lectura convencional y tomar decisiones basadas en evidencia.",
    includes: ["Osciloscopio automotriz", "Trazador de curvas", "Análisis de señales"],
  },
  {
    title: "Reparación de cableado",
    tag: "ELECTRICIDAD",
    image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305084/IMG_1044_of37oy.jpg",
    summary: "Localización y reparación de fallas en circuitos y cableado eléctrico/electrónico del vehículo.",
    detail: "Se busca determinar dónde se pierde alimentación, continuidad, señal o comunicación antes de reparar el circuito afectado.",
    includes: ["Continuidad", "Alimentación", "Señales y comunicación"],
  },
  {
    title: "Tablero / cluster",
    tag: "INSTRUMENTACIÓN",
    image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305082/IMG_1043_svrvfn.jpg",
    summary: "Diagnóstico y reparación de tableros de instrumentos y clusters electrónicos.",
    detail: "Se evalúan fallas de visualización, comunicación y funcionamiento electrónico para determinar el alcance de la intervención.",
    includes: ["Cluster", "Tablero de instrumentos", "Diagnóstico electrónico"],
  },
  {
    title: "Descarbonización de válvulas",
    tag: "ADMISIÓN",
    image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305085/IMG_1033_y8wdqt.jpg",
    summary: "Descontaminación y descarbonización de válvulas y admisión según aplicación.",
    detail: "El trabajo se realiza cuando la condición del sistema y el diagnóstico indican acumulación de depósitos que requieren limpieza especializada.",
    includes: ["Válvulas", "Admisión", "Descarbonización especializada"],
  },
  {
    title: "EGR OFF Toyota",
    tag: "TOYOTA / SOFTWARE",
    image: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788305085/IMG_1038_ggdubh.jpg",
    summary: "Trabajo de software EGR OFF para Toyota Corolla y otras aplicaciones compatibles.",
    detail: "La compatibilidad se evalúa previamente y cualquier modificación se realiza únicamente cuando corresponde a la aplicación y normativa aplicable.",
    includes: ["Toyota", "Evaluación de compatibilidad", "Sujeto a normativa correspondiente"],
  },
];

export default function ServicesVisualGrid() {
  const [active, setActive] = useState<ServiceItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const wa = (service: ServiceItem) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hola Autotrónica Go Diagnosis. Quiero consultar por ${service.title}. Mi vehículo es: `)}`;

  return (
    <>
      <div className="services-visual-grid">
        {services.map((service, index) => (
          <button
            type="button"
            className="service-visual-card"
            key={service.title}
            onClick={() => setActive(service)}
            style={{ backgroundImage: `linear-gradient(180deg,rgba(4,6,8,.18),rgba(4,6,8,.94)),url("${service.image}")` }}
          >
            <div className="service-visual-top"><span>{String(index + 1).padStart(2, "0")}</span><b>{service.tag}</b></div>
            <div className="service-visual-copy">
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <span className="service-visual-open">Ver servicio <ArrowRight size={14} /></span>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="service-detail-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
          <section
            className="service-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            style={{ backgroundImage: `linear-gradient(110deg,rgba(5,7,9,.99) 0%,rgba(5,7,9,.92) 52%,rgba(5,7,9,.58) 100%),url("${active.image}")` }}
          >
            <button className="service-detail-close" onClick={() => setActive(null)} aria-label="Cerrar"><X size={20} /></button>
            <div className="service-detail-content">
              <span className="service-detail-tag">{active.tag}</span>
              <h2>{active.title}</h2>
              <p className="service-detail-lead">{active.summary}</p>
              <p className="service-detail-body">{active.detail}</p>
              <div className="service-detail-includes">
                {active.includes.map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="service-detail-actions">
                <a href={wa(active)} target="_blank" rel="noreferrer" className="primary-btn">Consultar por WhatsApp <ArrowRight size={16} /></a>
                {active.href && <Link href={active.href} className="service-detail-more">Ver detalle técnico</Link>}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
