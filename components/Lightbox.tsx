"use client";
import { useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, AlertTriangle, CheckCircle2, Wrench } from "lucide-react";
import Image from "next/image";

type Item = { image: string; title: string; tag: string };

type CaseDetail = {
  problem: string;
  solution: string;
  scope: string;
};

const caseDetails: Record<string, CaseDetail> = {
  "Descarbonización de válvulas": {
    problem: "Acumulación de residuos y contaminación en el sistema de admisión y las válvulas, una condición que puede afectar la respuesta y el funcionamiento correcto del motor.",
    solution: "Se realizó el proceso de descontaminación y descarbonización de válvulas y admisión para recuperar condiciones de funcionamiento más limpias y correctas.",
    scope: "Descarbonización de válvulas y admisión",
  },
  "Entonación de inyectores": {
    problem: "Inyectores EFI/GDI que requieren verificación de entrega, limpieza y control de funcionamiento para descartar desbalances o contaminación.",
    solution: "Se realizó entonación, limpieza y prueba de inyectores EFI/GDI, verificando su funcionamiento antes de volver a servicio.",
    scope: "Inyección EFI / GDI",
  },
  "Reparación de ECU": {
    problem: "Unidad de control de motor con una falla electrónica que requiere diagnóstico interno antes de reemplazar componentes o módulos completos.",
    solution: "Se efectuó diagnosis electrónica de la ECU y reparación del módulo según la falla encontrada durante las comprobaciones.",
    scope: "Diagnóstico y reparación electrónica de ECU",
  },
  "EGR OFF Toyota": {
    problem: "Intervención requerida sobre la estrategia electrónica del sistema EGR en una aplicación Toyota compatible.",
    solution: "Se realizó trabajo de software EGR OFF sobre la ECU, de acuerdo con la aplicación del vehículo y sujeto a la normativa correspondiente.",
    scope: "Programación ECU / EGR OFF Toyota",
  },
  "Diagnóstico electrónico": {
    problem: "Falla electrónica que necesita ser localizada mediante lectura de sistemas, medición y análisis antes de definir una reparación.",
    solution: "Se realizó diagnóstico electrónico del vehículo, combinando lectura de sistemas y comprobaciones para orientar la intervención sobre la causa de la falla.",
    scope: "Diagnóstico electrónico automotriz",
  },
  "Reparación de tablero": {
    problem: "Tablero de instrumentos o cluster con una anomalía electrónica que requiere comprobación del circuito y del propio módulo.",
    solution: "Se diagnosticó el cluster y se realizó la reparación electrónica correspondiente sobre el tablero de instrumentos.",
    scope: "Tablero / cluster automotriz",
  },
  "Reparación de módulo ABS": {
    problem: "Módulo ABS con una falla electrónica que requiere diagnóstico específico antes de considerar su sustitución.",
    solution: "Se realizó diagnóstico y reparación electrónica del módulo ABS según la falla localizada durante las pruebas.",
    scope: "Electrónica de módulo ABS",
  },
  "Intervención BCM / TIPM": {
    problem: "Falla asociada a módulos de carrocería BCM/TIPM, capaces de generar problemas eléctricos, de comunicación o de control en distintos sistemas del vehículo.",
    solution: "Se efectuaron comprobaciones sobre el módulo y la intervención electrónica correspondiente según la falla detectada.",
    scope: "BCM / TIPM Chrysler, Jeep y Dodge",
  },
  "Reparación de cableado": {
    problem: "Anomalía en cableado o circuito eléctrico que requiere localizar continuidad deficiente, conexión incorrecta o una falla dentro del circuito.",
    solution: "Se localizó el sector comprometido mediante comprobaciones eléctricas y se realizó la reparación del cableado correspondiente.",
    scope: "Electricidad y cableado automotriz",
  },
  "Calibración y software ECU": {
    problem: "Necesidad de revisar o modificar parámetros de software de la ECU en una aplicación compatible con herramientas de programación especializadas.",
    solution: "Se realizó trabajo de calibración y software ECU utilizando herramientas especializadas según vehículo y aplicación.",
    scope: "HP Tuners / BitEdit / VFTuner",
  },
  "Diagnóstico diésel 12V/24V": {
    problem: "Sistema diésel de 12V o 24V con una falla que requiere diagnóstico específico de alimentación, señales y sistemas electrónicos compatibles.",
    solution: "Se efectuó diagnóstico especializado del sistema diésel mediante lectura y comprobaciones eléctricas/electrónicas para definir la intervención necesaria.",
    scope: "Diagnóstico diésel 12V / 24V",
  },
};

export default function Lightbox({
  items,
  index,
  onClose,
  onNav,
}: {
  items: Item[];
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  const go = useCallback(
    (dir: 1 | -1) => {
      const next = (index + dir + items.length) % items.length;
      onNav(next);
    },
    [index, items.length, onNav]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, go]);

  const item = items[index];
  if (!item) return null;

  const detail = caseDetails[item.title];

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Caso técnico: ${item.title}`} onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Cerrar galería">
        <X size={22} />
      </button>
      <button
        className="lightbox-nav lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        aria-label="Caso anterior"
      >
        <ChevronLeft size={26} />
      </button>

      <div className="lightbox-stage lightbox-case-stage" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-image">
          <Image src={item.image} alt={`${item.title} realizado por Autotrónica Go Diagnosis en Caracas`} fill sizes="(max-width: 700px) 100vw, 58vw" style={{ objectFit: "contain" }} priority />
        </div>

        <article className="lightbox-case-copy">
          <div className="lightbox-caption">
            <span>{item.tag}</span>
            <h3>{item.title}</h3>
            <small>{index + 1} / {items.length}</small>
          </div>

          {detail && (
            <div className="case-detail-grid">
              <div className="case-detail-scope">
                <Wrench size={15} />
                <span>{detail.scope}</span>
              </div>

              <section className="case-detail-block">
                <div className="case-detail-title"><AlertTriangle size={16} /><b>Problema abordado</b></div>
                <p>{detail.problem}</p>
              </section>

              <section className="case-detail-block solution">
                <div className="case-detail-title"><CheckCircle2 size={16} /><b>Intervención realizada</b></div>
                <p>{detail.solution}</p>
              </section>
            </div>
          )}
        </article>
      </div>

      <button
        className="lightbox-nav lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        aria-label="Caso siguiente"
      >
        <ChevronRight size={26} />
      </button>
    </div>
  );
}
