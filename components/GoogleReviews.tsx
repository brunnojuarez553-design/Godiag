"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { initialGoogleReviews, type GoogleReviewsData } from "@/lib/google-reviews";
import Reveal from "@/components/Reveal";

function Stars({ rating }: { rating: number }) {
  return <span className="gr-stars" aria-label={`${rating} de 5 estrellas`}>{Array.from({ length: 5 }, (_, i) => <Star key={i} size={16} fill={i < Math.round(rating) ? "currentColor" : "none"} aria-hidden="true" />)}</span>;
}

export default function GoogleReviews() {
  const [data, setData] = useState<GoogleReviewsData>(initialGoogleReviews);
  const [expanded, setExpanded] = useState<string[]>([]);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/google-reviews", { signal: controller.signal, cache: "no-store" })
      .then(async response => { if (response.ok) { const result = await response.json(); if (result.live && Array.isArray(result.reviews)) setData(result); } })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    const width = element.firstElementChild?.getBoundingClientRect().width ?? 320;
    element.scrollBy({ left: direction * (width + 18), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <section className="reviews-ready section google-reviews" id="resenas" aria-labelledby="gr-title">
    <Reveal as="div" className="gr-heading">
      <div><span className="kicker">EXPERIENCIAS REALES</span><h2 id="gr-title">La confianza se gana.<br /><em>Ellos te lo cuentan.</em></h2><p>Opiniones de quienes eligieron Autotrónica Godiag, publicadas en Google.</p></div>
      <div className="gr-summary"><span className="gr-google" aria-label="Google"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></span><div className="gr-score"><strong>{data.rating.toFixed(1).replace(".", ",")}</strong><div><Stars rating={data.rating} /><span>{data.count} opiniones en Google</span></div></div><a href={data.url} target="_blank" rel="noopener noreferrer">Ver el perfil <ArrowUpRight size={16} /></a></div>
    </Reveal>
    <div ref={track} className="gr-track" role="region" aria-label="Opiniones de clientes" tabIndex={0}>
      {data.reviews.map((review, i) => {
        const id = `${review.author}-${i}`;
        const open = expanded.includes(id);
        return <article key={id} className="gr-card"><div className="gr-author"><span className="gr-avatar">{review.photo ? <img src={review.photo} alt="" referrerPolicy="no-referrer" /> : review.author.split(" ").slice(0, 2).map(part => part[0]).join("").toUpperCase()}</span><div><h3>{review.author}</h3><span>Opinión publicada en Google</span></div><span className="gr-mark" aria-hidden="true">G</span></div><Stars rating={review.rating} /><p className={open ? "gr-text expanded" : "gr-text"}>{review.text || "Este cliente dejó una valoración sin comentario."}</p>{review.text.length > 220 && <button className="gr-read" onClick={() => setExpanded(current => open ? current.filter(value => value !== id) : [...current, id])} aria-expanded={open}>{open ? "Leer menos" : "Leer completa"}</button>}<a className="gr-source" href={review.url ?? data.url} target="_blank" rel="noopener noreferrer">Ver en Google <ArrowUpRight size={14} /></a></article>;
      })}
    </div>
    <div className="gr-footer"><span>{data.live ? data.source === "business" ? "Opiniones de Google · Actualizadas hoy" : "Opiniones destacadas por Google · Consultadas hoy" : "Opiniones consultadas el 04/10/2026"}</span><div className="gr-controls"><button onClick={() => move(-1)} aria-label="Opiniones anteriores"><ChevronLeft size={20} /></button><button onClick={() => move(1)} aria-label="Opiniones siguientes"><ChevronRight size={20} /></button></div><a href={data.url} target="_blank" rel="noopener noreferrer">Ver todas las opiniones <ArrowUpRight size={16} /></a></div>
  </section>;
}
