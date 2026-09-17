"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

function cleanBioUtmUrl() {
  if (typeof window === "undefined" || window.location.pathname !== "/bio") return;

  const url = new URL(window.location.href);
  let changed = false;

  for (const key of Array.from(url.searchParams.keys())) {
    if (key.toLowerCase().startsWith("utm_")) {
      url.searchParams.delete(key);
      changed = true;
    }
  }

  if (changed) {
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }
}

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pathname = usePathname();
  const firstPath = useRef(true);

  useEffect(() => {
    cleanBioUtmUrl();

    if (!gaId) return;
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }

    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    if (!gtag) return;

    gtag("event", "page_view", {
      page_path: window.location.pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [gaId, pathname]);

  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;

          if (window.location.pathname === '/bio') {
            const bioUrl = new URL(window.location.href);
            let bioUrlChanged = false;
            Array.from(bioUrl.searchParams.keys()).forEach(function(key) {
              if (key.toLowerCase().startsWith('utm_')) {
                bioUrl.searchParams.delete(key);
                bioUrlChanged = true;
              }
            });
            if (bioUrlChanged) {
              window.history.replaceState(window.history.state, '', bioUrl.pathname + bioUrl.search + bioUrl.hash);
            }
          }

          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
            page_location: window.location.href,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
