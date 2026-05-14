"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "educanology-cookie-consent";
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type CookiePreferences = {
  analytics?: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;

  const saved = window.localStorage.getItem(STORAGE_KEY);

  if (!saved) return false;

  try {
    const preferences = JSON.parse(saved) as CookiePreferences;
    return Boolean(preferences.analytics);
  } catch {
    return false;
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
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    function syncConsent() {
      const enabled = hasAnalyticsConsent();
      setGoogleAnalyticsDisabled(!enabled);
      setAnalyticsEnabled(enabled);
    }

    syncConsent();

    window.addEventListener("educanology-cookie-consent-updated", syncConsent);

    return () => {
      window.removeEventListener(
        "educanology-cookie-consent-updated",
        syncConsent
      );
    };
  }, []);

  useEffect(() => {
    if (!MEASUREMENT_ID || !analyticsEnabled || scriptLoaded.current) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer?.push(arguments);
      };

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    script.onload = () => {
      scriptLoaded.current = true;
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
