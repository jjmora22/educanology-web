"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  hasAnalyticsConsent,
  useCookieConsent,
} from "@/lib/cookie-consent";

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function setGoogleAnalyticsDisabled(disabled: boolean) {
  if (!MEASUREMENT_ID || typeof window === "undefined") return;

  (window as unknown as Record<string, boolean>)[
    `ga-disable-${MEASUREMENT_ID}`
  ] = disabled;
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const { isLoaded, preferences } = useCookieConsent();
  const analyticsEnabled = isLoaded && Boolean(preferences?.analytics);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    setGoogleAnalyticsDisabled(!analyticsEnabled);
  }, [analyticsEnabled]);

  useEffect(() => {
    if (!MEASUREMENT_ID || !analyticsEnabled || scriptLoaded.current) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    script.onload = () => {
      scriptLoaded.current = true;
      if (!hasAnalyticsConsent()) return;

      window.gtag?.("js", new Date());
      window.gtag?.("config", MEASUREMENT_ID, {
        page_path: window.location.pathname,
      });
    };

    document.head.appendChild(script);
  }, [analyticsEnabled]);

  useEffect(() => {
    if (!MEASUREMENT_ID || !analyticsEnabled || !scriptLoaded.current) return;

    window.gtag?.("config", MEASUREMENT_ID, {
      page_path: pathname,
    });
  }, [analyticsEnabled, pathname]);

  return null;
}
