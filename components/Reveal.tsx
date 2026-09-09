"use client";
import { useEffect, useRef, useState, type ElementType, type ReactNode, type CSSProperties } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  style?: CSSProperties;
  [key: string]: unknown;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const parent = el.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter((node) => node.classList.contains("reveal"));
      const index = Math.max(0, siblings.indexOf(el));
      const isGrid = parent.matches(".service-grid,.technology-grid,.case-grid,.work-grid,.location-experience");
      if (isGrid) el.dataset.revealDir = index % 2 === 0 ? "left" : "right";
      else if (el.matches(".section-heading,.expert-card,.mobile-service-shell")) el.dataset.revealDir = "left";
      else if (el.matches(".arrival-card,.reviews-ready-card")) el.dataset.revealDir = "right";
      else el.dataset.revealDir = "up";
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setVisible(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    const frame = window.requestAnimationFrame(() => io.observe(el));
    return () => {
      window.cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, []);

  const Comp = Tag as ElementType;

  return (
    <Comp
      ref={ref}
      className={`reveal${visible ? " reveal-in" : ""}${className ? ` ${className}` : ""}`}
      style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
