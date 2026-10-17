"use client";

import { useMemo, useSyncExternalStore } from "react";

export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
};

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
};

export const COOKIE_CONSENT_STORAGE_KEY = "educanology-cookie-consent";
export const COOKIE_CONSENT_EVENT = "educanology-cookie-consent-updated";

function normalizePreferences(
  preferences: Partial<CookiePreferences>
): CookiePreferences {
  return {
    necessary: true,
    analytics: Boolean(preferences.analytics),
  };
}

function parsePreferences(value: string | null): CookiePreferences | null {
  if (!value) return null;

  try {
    return normalizePreferences(JSON.parse(value) as Partial<CookiePreferences>);
  } catch {
    return null;
  }
}

export function getCookiePreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  return parsePreferences(
    window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
  );
}

export function hasAnalyticsConsent() {
  return Boolean(getCookiePreferences()?.analytics);
}

export function saveCookiePreferences(
  preferences: CookiePreferences
): CookiePreferences {
  const normalizedPreferences = normalizePreferences(preferences);

  window.localStorage.setItem(
    COOKIE_CONSENT_STORAGE_KEY,
    JSON.stringify(normalizedPreferences)
  );
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_EVENT, {
      detail: normalizedPreferences,
    })
  );

  return normalizedPreferences;
}

function subscribeToCookieConsent(onStoreChange: () => void) {
  const handleConsentUpdate = () => onStoreChange();
  const handleStorage = (event: StorageEvent) => {
    if (event.key === COOKIE_CONSENT_STORAGE_KEY) onStoreChange();
  };

  window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentUpdate);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentUpdate);
    window.removeEventListener("storage", handleStorage);
  };
}

function getCookieConsentSnapshot(): string | null | undefined {
  return window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
}

function getServerCookieConsentSnapshot(): string | null | undefined {
  return undefined;
}

export function useCookieConsent() {
  const storedValue = useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieConsentSnapshot,
    getServerCookieConsentSnapshot
  );
  const preferences = useMemo(
    () => (storedValue === undefined ? null : parsePreferences(storedValue)),
    [storedValue]
  );

  return {
    isLoaded: storedValue !== undefined,
    preferences,
  };
}
