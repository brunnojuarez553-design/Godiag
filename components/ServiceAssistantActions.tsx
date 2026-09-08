"use client";

import { ArrowRight, MessageCircle } from "lucide-react";

function openAssistant(service?: string) {
  window.dispatchEvent(new CustomEvent("open-assistant", { detail: service ? { service } : {} }));
}

export default function ServiceAssistantActions({ service }: { service: string }) {
  return (
    <div className="seo-page-actions">
      <button type="button" className="primary-btn" onClick={() => openAssistant(service)}>
        Consultar por este servicio <ArrowRight size={17} />
      </button>
      <button type="button" className="seo-secondary-link seo-assistant-secondary" onClick={() => openAssistant()}>
        Evaluar mi caso <MessageCircle size={16} />
      </button>
    </div>
  );
}
