"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type EventParams = Record<string, string | number | boolean | undefined>;
type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };
type AssistantOpenDetail = { service?: string; trigger?: "service_card" | "programmatic" };

const ANALYTICS_EVENTS = {
  trafficContext: "traffic_context",
  bioPageView: "bio_page_view",
  servicePageView: "service_page_view",
  assistantOpen: "assistant_open",
  whatsappClick: "whatsapp_click",
  homeServiceClick: "home_service_click",
  assistantLead: "assistant_lead",
  phoneClick: "phone_click",
  emailClick: "email_click",
  locationClick: "location_click",
  googleReviewClick: "google_review_click",
  socialClick: "social_click",
  quoteOpen: "quote_open",
  quizSubmit: "quiz_submit",
  quoteSubmit: "quote_submit",
} as const;

const RESERVED_TRAFFIC_KEYS = new Set([
  "source",
  "medium",
  "campaign",
  "campaign_id",
  "term",
  "content",
]);

function safeParams(params: EventParams) {
  return Object.fromEntries(
    Object.entries(params).filter(([key, value]) => value !== undefined && !RESERVED_TRAFFIC_KEYS.has(key)),
  ) as EventParams;
}

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
    ...safeParams(params),
  });
}

function inferEntryChannel() {
  const url = new URL(window.location.href);
  const referrer = document.referrer ? new URL(document.referrer) : null;
  const referrerHost = referrer?.hostname.replace(/^www\./, "") || "";
  const entryUtmSource = url.searchParams.get("utm_source") || "";
  const entryUtmMedium = url.searchParams.get("utm_medium") || "";
  const entryUtmCampaign = url.searchParams.get("utm_campaign") || "";

  let entryChannel = "direct_or_unattributed";

  if (entryUtmSource || entryUtmMedium || entryUtmCampaign) entryChannel = "tagged_campaign";
  else if (/google\./i.test(referrerHost)) entryChannel = "google";
  else if (/instagram\.com$/i.test(referrerHost)) entryChannel = "instagram";
  else if (/facebook\.com$/i.test(referrerHost) || /fb\.com$/i.test(referrerHost)) entryChannel = "facebook";
  else if (/tiktok\.com$/i.test(referrerHost)) entryChannel = "tiktok";
  else if (/youtube\.com$/i.test(referrerHost) || /youtu\.be$/i.test(referrerHost)) entryChannel = "youtube";
  else if (referrerHost && referrerHost !== window.location.hostname.replace(/^www\./, "")) entryChannel = "external_referral";

  return {
    entry_channel: entryChannel,
    entry_referrer_host: referrerHost || "none",
    entry_landing_path: window.location.pathname,
    entry_utm_source: entryUtmSource || "none",
    entry_utm_medium: entryUtmMedium || "none",
    entry_utm_campaign: entryUtmCampaign || "none",
  };
}

function trackTrafficContext() {
  if (typeof window === "undefined") return;
  const key = "godiag_traffic_context_sent";

  try {
    if (window.sessionStorage.getItem(key)) return;
    window.sessionStorage.setItem(key, "1");
  } catch {}

  track(ANALYTICS_EVENTS.trafficContext, inferEntryChannel());
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
  if (target.closest(".bio-page")) return "bio";
  return "other";
}

function socialNetworkFromHref(href: string) {
  if (/instagram\.com/i.test(href)) return "instagram";
  if (/facebook\.com|fb\.com/i.test(href)) return "facebook";
  if (/tiktok\.com/i.test(href)) return "tiktok";
  if (/youtube\.com|youtu\.be/i.test(href)) return "youtube";
  return "";
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
    trackTrafficContext();

    if (pathname === "/bio") {
      track(ANALYTICS_EVENTS.bioPageView, { entry_surface: "bio" });
    }

    if (pathname.startsWith("/servicios/")) {
      const slug = pathname.split("/").filter(Boolean).pop() || "unknown";
      track(ANALYTICS_EVENTS.servicePageView, { service_slug: slug });
    }
  }, [pathname]);

  useEffect(() => {
    applyBusinessContent();

    const onOpenAssistant = (event: Event) => {
      const detail = (event as CustomEvent<AssistantOpenDetail>).detail;
      track(ANALYTICS_EVENTS.assistantOpen, {
        interaction_trigger: detail?.trigger ?? (detail?.service ? "service_card" : "programmatic"),
        service_name: detail?.service,
      });
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const uiLocation = clickLocation(target);
      const anchor = target.closest("a");
      const button = target.closest("button");

      if (anchor) {
        const href = anchor.getAttribute("href") || "";
        const label = (anchor.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100);
        const socialNetwork = socialNetworkFromHref(href);

        if (href.includes("wa.me/")) {
          track(ANALYTICS_EVENTS.whatsappClick, { ui_location: uiLocation, ui_label: label });
          if (target.closest("#domicilio")) track(ANALYTICS_EVENTS.homeServiceClick, { ui_location: "domicilio", contact_channel: "whatsapp" });
          if (target.closest(".ai-premium-wrap") || target.closest(".bio-modal")) track(ANALYTICS_EVENTS.assistantLead, { contact_channel: "whatsapp", ui_location: uiLocation });
        }

        if (href.startsWith("tel:")) track(ANALYTICS_EVENTS.phoneClick, { ui_location: uiLocation, ui_label: label });
        if (href.startsWith("mailto:")) track(ANALYTICS_EVENTS.emailClick, { ui_location: uiLocation, ui_label: label });

        if (href.includes("google.com/maps") || href.includes("maps.google") || href.includes("maps.app.goo.gl")) {
          track(ANALYTICS_EVENTS.locationClick, { ui_location: "ubicacion", ui_label: label });
        }

        if (/g\.page\/r\/.*\/review|google.*review/i.test(href)) {
          track(ANALYTICS_EVENTS.googleReviewClick, { ui_location: uiLocation, ui_label: label });
        }

        if (socialNetwork) {
          track(ANALYTICS_EVENTS.socialClick, {
            ui_location: uiLocation,
            social_network: socialNetwork,
            ui_label: label,
          });
        }
      }

      if (button) {
        const label = (button.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120);
        if (button.matches(".ai-fab")) track(ANALYTICS_EVENTS.assistantOpen, { interaction_trigger: "floating_button" });
        if (button.matches(".nav-cta") || (button.matches(".primary-btn") && /diagn[oó]stico|evaluaci[oó]n/i.test(label))) {
          track(ANALYTICS_EVENTS.quoteOpen, { ui_location: uiLocation, ui_label: label });
        }
        if (button.matches(".send-btn")) {
          if (button.closest(".quiz-modal")) track(ANALYTICS_EVENTS.quizSubmit, { ui_location: "orientation_quiz", contact_channel: "whatsapp" });
          else if (button.closest(".quote-modal")) track(ANALYTICS_EVENTS.quoteSubmit, { ui_location: uiLocation, contact_channel: "whatsapp" });
        }

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
