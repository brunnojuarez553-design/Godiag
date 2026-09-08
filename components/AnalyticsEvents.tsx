"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type EventParams = Record<string, string | number | boolean | undefined>;
type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

function track(name: string, params: EventParams = {}, attempt = 0) {
  if (typeof window === "undefined") return;
  const gtag = (window as GtagWindow).gtag;

  if (!gtag) {
    if (attempt < 8) window.setTimeout(() => track(name, params, attempt + 1), 250);
    return;
  }

  gtag("event", name, {
    page_path: window.location.pathname,
    page_title: document.title,
    ...params,
  });
}

function clickLocation(target: Element) {
  if (target.closest("header.nav")) return "header";
  if (target.closest(".hero")) return "hero";
  if (target.closest("#domicilio")) return "domicilio";
  if (target.closest("#trabajos")) return "trabajos";
  if (target.closest("#ubicacion")) return "ubicacion";
  if (target.closest("#contacto")) return "contacto";
  if (target.closest("footer")) return "footer";
  if (target.closest(".seo-service-page")) return "seo_service_page";
  if (target.closest(".ai-panel")) return "assistant";
  return "other";
}

function replaceText(selector: string, from: string, to: string) {
  document.querySelectorAll<HTMLElement>(selector).forEach((node) => {
    if (node.textContent?.includes(from)) node.textContent = node.textContent.replace(from, to);
  });
}

function applyBusinessContent() {
  if (typeof window === "undefined" || window.location.pathname !== "/") return;

  const heroCopy = document.querySelector<HTMLElement>(".hero-copy");
  if (heroCopy && !heroCopy.querySelector(".brand-slogan")) {
    const eyebrow = heroCopy.querySelector(".eyebrow");
    const slogan = document.createElement("div");
    slogan.className = "brand-slogan";
    slogan.textContent = "Diagnóstico preciso, solución efectiva";
    slogan.style.cssText = "display:inline-flex;align-items:center;gap:8px;margin:14px 0 4px;padding:8px 12px;border:1px solid rgba(255,255,255,.16);background:rgba(5,7,9,.5);backdrop-filter:blur(8px);font-size:10px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;color:#f3f4f5;";
    eyebrow?.insertAdjacentElement("afterend", slogan);
  }

  replaceText(".hero-copy p", "Atención en taller y a domicilio.", "Atención principal en taller. Programación y EGR OFF disponibles a domicilio con turno previo.");

  document.querySelectorAll<HTMLElement>(".proof-row div").forEach((item) => {
    if (item.textContent?.includes("A domicilio") || item.textContent?.includes("todos los servicios")) {
      const b = item.querySelector("b");
      const span = item.querySelector("span");
      if (b) b.textContent = "Programación + EGR";
      if (span) span.textContent = "a domicilio con turno previo";
    }
  });

  replaceText("#especialidades .section-heading > p", "Todos los servicios pueden coordinarse a domicilio.", "Los servicios se realizan en taller. Programación y EGR OFF pueden coordinarse a domicilio con turno previo.");

  const quoteModal = document.querySelector<HTMLElement>(".quote-modal");
  if (quoteModal) {
    replaceText(".quote-modal .modal-lead", "elegí si preferís atención en el taller o a domicilio.", "indicá el servicio que necesitás. La atención es en taller; programación y EGR OFF también pueden coordinarse a domicilio con turno previo.");
    replaceText(".quote-modal small", "Todos los servicios pueden coordinarse a domicilio. Zona y disponibilidad se confirman por WhatsApp.", "El servicio a domicilio aplica únicamente a programación y EGR OFF, con validación y turno previo por WhatsApp.");
    quoteModal.querySelectorAll<HTMLElement>("[role='option']").forEach((option) => {
      if (option.textContent?.trim() === "A domicilio") option.textContent = "A domicilio · solo programación / EGR OFF";
    });
  }

  const contact = document.querySelector<HTMLElement>("#contacto");
  if (contact) {
    const kicker = contact.querySelector<HTMLElement>(".kicker");
    if (kicker) kicker.textContent = "TALLER + PROGRAMACIÓN / EGR OFF A DOMICILIO";
    replaceText("#contacto > p", "Podés acercarte al taller o coordinar cualquiera de nuestros servicios a domicilio.", "La atención se realiza en taller. Programación y EGR OFF pueden coordinarse a domicilio con turno y validación previa.");
    contact.querySelectorAll<HTMLElement>(".work-proof div").forEach((item) => {
      if (item.textContent?.includes("Taller or atención a domicilio") || item.textContent?.includes("Taller o atención a domicilio")) {
        const span = item.querySelector("span");
        if (span) span.textContent = "Taller · Programación/EGR OFF a domicilio";
      }
    });
  }

  replaceText("footer > p", "Atención en taller y a domicilio.", "Atención en taller. Programación y EGR OFF a domicilio con turno previo.");
}

export default function AnalyticsEvents() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/servicios/")) {
      const slug = pathname.split("/").filter(Boolean).pop() || "unknown";
      track("service_page_view", { service_slug: slug });
    }
  }, [pathname]);

  useEffect(() => {
    applyBusinessContent();

    const onOpenAssistant = (event: Event) => {
      const detail = (event as CustomEvent<{ service?: string }>).detail;
      track("assistant_open", {
        source: detail?.service ? "service_card" : "custom_event",
        service: detail?.service,
      });
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const location = clickLocation(target);
      const anchor = target.closest("a");
      const button = target.closest("button");

      if (anchor) {
        const href = anchor.getAttribute("href") || "";
        const label = (anchor.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100);

        if (href.includes("wa.me/")) {
          track("whatsapp_click", { location, link_text: label });
          if (target.closest("#domicilio")) track("home_service_click", { location: "domicilio", channel: "whatsapp" });
          if (target.closest(".ai-premium-wrap")) track("assistant_lead", { channel: "whatsapp" });
        }

        if (href.startsWith("tel:")) track("phone_click", { location, link_text: label });
        if (href.includes("google.com/maps") || href.includes("maps.google")) track("location_click", { location: "ubicacion", link_text: label });
      }

      if (button) {
        const label = (button.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120);
        if (button.matches(".ai-fab")) track("assistant_open", { source: "floating_button" });
        if (button.matches(".nav-cta") || (button.matches(".primary-btn") && /diagn[oó]stico|evaluaci[oó]n/i.test(label))) {
          track("quote_open", { location, button_text: label });
        }
        if (button.matches(".send-btn")) {
          if (button.closest(".quiz-modal")) track("quiz_submit", { location: "orientation_quiz", channel: "whatsapp" });
          else if (button.closest(".quote-modal")) track("quote_submit", { location, channel: "whatsapp" });
        }

        // Radix dialogs mount after the click. Apply copy once after they render instead of observing the whole DOM.
        window.setTimeout(applyBusinessContent, 80);
      }
    };

    window.addEventListener("open-assistant", onOpenAssistant as EventListener);
    document.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("open-assistant", onOpenAssistant as EventListener);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
