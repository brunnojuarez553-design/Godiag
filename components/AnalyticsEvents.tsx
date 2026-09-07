"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type EventParams = Record<string, string | number | boolean | undefined>;

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

function track(name: string, params: EventParams = {}, attempt = 0) {
  if (typeof window === "undefined") return;
  const gtag = (window as GtagWindow).gtag;

  if (!gtag) {
    if (attempt < 8) {
      window.setTimeout(() => track(name, params, attempt + 1), 250);
    }
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

export default function AnalyticsEvents() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/servicios/")) {
      const slug = pathname.split("/").filter(Boolean).pop() || "unknown";
      track("service_page_view", { service_slug: slug });
    }
  }, [pathname]);

  useEffect(() => {
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
          if (target.closest("#domicilio")) {
            track("home_service_click", { location: "domicilio", channel: "whatsapp" });
          }
          if (target.closest(".ai-premium-wrap")) {
            track("assistant_lead", { channel: "whatsapp" });
          }
        }

        if (href.startsWith("tel:")) {
          track("phone_click", { location, link_text: label });
        }

        if (href.includes("google.com/maps") || href.includes("maps.google")) {
          track("location_click", { location: "ubicacion", link_text: label });
        }
      }

      if (button) {
        const label = (button.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120);

        if (button.matches(".ai-fab")) {
          track("assistant_open", { source: "floating_button" });
        }

        if (
          button.matches(".nav-cta") ||
          (button.matches(".primary-btn") && /diagn[oó]stico|evaluaci[oó]n/i.test(label))
        ) {
          track("quote_open", { location, button_text: label });
        }

        if (button.matches(".send-btn")) {
          if (button.closest(".quiz-modal")) {
            track("quiz_submit", { location: "orientation_quiz", channel: "whatsapp" });
          } else if (button.closest(".quote-modal")) {
            track("quote_submit", { location, channel: "whatsapp" });
          }
        }
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
