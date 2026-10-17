"use client";

import {
  Analytics,
  type BeforeSendEvent,
} from "@vercel/analytics/next";
import {
  hasAnalyticsConsent,
  useCookieConsent,
} from "@/lib/cookie-consent";

function filterWithoutConsent(event: BeforeSendEvent) {
  return hasAnalyticsConsent() ? event : null;
}

export default function VercelAnalytics() {
  const { isLoaded, preferences } = useCookieConsent();

  if (!isLoaded || !preferences?.analytics) return null;

  return <Analytics beforeSend={filterWithoutConsent} />;
}
