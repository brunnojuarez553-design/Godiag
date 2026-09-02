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

/**
 * Envuelve cualquier elemento y le agrega fade+translateY al entrar en viewport.
 * No crea un wrapper extra: renderiza el tag pedido (article, div, etc.) para
 * no romper layouts de grid donde el hijo directo importa.
 */
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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
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
