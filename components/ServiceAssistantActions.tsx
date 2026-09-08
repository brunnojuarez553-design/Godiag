"use client";

import { ArrowRight } from "lucide-react";

function openAssistant(service: string) {
  window.dispatchEvent(new CustomEvent("open-assistant", { detail: { service } }));
}

export default function ServiceAssistantActions({ service }: { service: string }) {
  return (
    <div className="seo-page-actions">
      <button type="button" className="primary-btn" onClick={() => openAssistant(service)}>
        Consultar por este servicio <ArrowRight size={17} />
      </button>
    </div>
  );
}
