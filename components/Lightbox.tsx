"use client";
import { useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

type Item = { image: string; title: string; tag: string };

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

  return (
    <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Cerrar galería">
        <X size={22} />
      </button>
      <button
        className="lightbox-nav lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        aria-label="Anterior"
      >
        <ChevronLeft size={26} />
      </button>

      <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-image">
          <Image src={item.image} alt={item.title} fill sizes="90vw" style={{ objectFit: "contain" }} priority />
        </div>
        <div className="lightbox-caption">
          <span>{item.tag}</span>
          <h3>{item.title}</h3>
          <small>
            {index + 1} / {items.length}
          </small>
        </div>
      </div>

      <button
        className="lightbox-nav lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        aria-label="Siguiente"
      >
        <ChevronRight size={26} />
      </button>
    </div>
  );
}
