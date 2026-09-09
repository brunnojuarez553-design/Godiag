"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import Reveal from "@/components/Reveal";
import styles from "./CertificationsGallery.module.css";

const certifications = [
  {
    src: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788898596/IMG_1220_akwqnw.jpg",
    label: "Ingeniero Mecánico",
    featured: true,
  },
  { src: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788898595/IMG_1231_blqlmq.jpg", label: "Certificación técnica 01" },
  { src: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788898595/IMG_1227_csvke8.jpg", label: "Certificación técnica 02" },
  { src: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788898595/IMG_1225_qmsmhe.jpg", label: "Certificación técnica 03" },
  { src: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788898595/IMG_1230_v3ge0c.jpg", label: "Certificación técnica 04" },
  { src: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788898595/IMG_1229_m4vd00.jpg", label: "Certificación técnica 05" },
  { src: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788898595/IMG_1224_hkh4xx.jpg", label: "Certificación técnica 06" },
  { src: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788898596/IMG_1223_r8slky.jpg", label: "Certificación técnica 07" },
  { src: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788898596/IMG_1222_txo19q.jpg", label: "Certificación técnica 08" },
  { src: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788898596/IMG_1221_gsu2j2.jpg", label: "Certificación técnica 09" },
  { src: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788898596/IMG_1228_mockdo.jpg", label: "Certificación técnica 10" },
  { src: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788898597/IMG_1226_ycptzf.jpg", label: "Certificación técnica 11" },
  { src: "https://res.cloudinary.com/dpiavcukm/image/upload/v1788898597/IMG_1219_jzci3r.jpg", label: "Certificación técnica 12" },
];

export default function CertificationsGallery() {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = document.querySelector<HTMLElement>("#especialista");
    setTarget(section || null);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") setActive((value) => (value + 1) % certifications.length);
      if (event.key === "ArrowLeft") setActive((value) => (value - 1 + certifications.length) % certifications.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!target) return null;

  const previous = () => setActive((value) => (value - 1 + certifications.length) % certifications.length);
  const next = () => setActive((value) => (value + 1) % certifications.length);

  return createPortal(
    <>
      <Reveal as="div" className={`${styles.showcase} certifications-showcase`}>
        <div className={styles.document}>
          <img src={certifications[0].src} alt="Título de Ingeniero Mecánico de Elian José González Cruz" loading="lazy" />
          <div className={styles.documentShade} />
          <div className={styles.documentLabel}>
            <span>FORMACIÓN ACADÉMICA</span>
            <strong>Ingeniero Mecánico</strong>
          </div>
        </div>
        <div className={styles.showcaseCopy}>
          <span>FORMACIÓN + ACTUALIZACIÓN CONTINUA</span>
          <h3>Preparación técnica que respalda cada diagnóstico.</h3>
          <p>Además de su formación como Ingeniero Mecánico, Elian mantiene una actualización técnica continua aplicada al diagnóstico y la electrónica automotriz.</p>
          <button type="button" onClick={() => { setActive(0); setOpen(true); }}>
            Ver certificaciones <Maximize2 size={16} />
          </button>
          <small>{certifications.length} documentos · Formación académica y técnica</small>
        </div>
      </Reveal>

      {open && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Certificaciones y diplomas">
          <div className={styles.topbar}>
            <div>
              <span>FORMACIÓN PROFESIONAL</span>
              <strong>Certificaciones y diplomas</strong>
            </div>
            <div className={styles.counter}>{String(active + 1).padStart(2, "0")} / {String(certifications.length).padStart(2, "0")}</div>
            <button className={styles.close} type="button" onClick={() => setOpen(false)} aria-label="Cerrar certificaciones"><X /></button>
          </div>

          <div className={styles.viewer}>
            <button className={`${styles.nav} ${styles.prev}`} type="button" onClick={previous} aria-label="Certificación anterior"><ArrowLeft /></button>
            <div className={styles.stage}>
              <img src={certifications[active].src} alt={certifications[active].label} />
              <div className={styles.stageMeta}>
                <span>{certifications[active].featured ? "FORMACIÓN ACADÉMICA" : "ACTUALIZACIÓN TÉCNICA"}</span>
                <strong>{certifications[active].label}</strong>
              </div>
            </div>
            <button className={`${styles.nav} ${styles.next}`} type="button" onClick={next} aria-label="Siguiente certificación"><ArrowRight /></button>
          </div>

          <div className={styles.thumbs}>
            {certifications.map((item, index) => (
              <button key={item.src} type="button" className={index === active ? styles.activeThumb : ""} onClick={() => setActive(index)} aria-label={`Ver ${item.label}`}>
                <img src={item.src} alt="" loading="lazy" />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>,
    target,
  );
}
