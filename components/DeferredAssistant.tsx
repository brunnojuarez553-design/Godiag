"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Assistant = dynamic(() => import("@/components/Assistant"), {
  ssr: false,
  loading: () => null,
});

export default function DeferredAssistant() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(() => setMounted(true), { timeout: 2200 });
      return () => win.cancelIdleCallback?.(id);
    }

    const timer = window.setTimeout(() => setMounted(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return mounted ? <Assistant /> : null;
}
