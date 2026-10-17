import assert from "node:assert/strict";
import test from "node:test";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_STORAGE_KEY,
  getCookiePreferences,
  hasAnalyticsConsent,
  saveCookiePreferences,
} from "../lib/cookie-consent.ts";

class MemoryStorage {
  values = new Map();

  getItem(key) {
    return this.values.get(key) ?? null;
  }

  setItem(key, value) {
    this.values.set(key, String(value));
  }

  removeItem(key) {
    this.values.delete(key);
  }
}

function installWindow() {
  const events = new EventTarget();
  const localStorage = new MemoryStorage();
  globalThis.window = {
    localStorage,
    addEventListener: events.addEventListener.bind(events),
    removeEventListener: events.removeEventListener.bind(events),
    dispatchEvent: events.dispatchEvent.bind(events),
  };
  return { events, localStorage };
}

test("sem escolha, a medição analítica permanece desativada", () => {
  installWindow();

  assert.equal(getCookiePreferences(), null);
  assert.equal(hasAnalyticsConsent(), false);
});

test("aceitar analíticas guarda a escolha e emite o evento de atualização", () => {
  const { events, localStorage } = installWindow();
  let updates = 0;
  events.addEventListener(COOKIE_CONSENT_EVENT, () => updates++);

  const saved = saveCookiePreferences({ necessary: true, analytics: true });

  assert.deepEqual(saved, { necessary: true, analytics: true });
  assert.equal(hasAnalyticsConsent(), true);
  assert.equal(updates, 1);
  assert.equal(
    localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY),
    JSON.stringify({ necessary: true, analytics: true })
  );
});

test("rejeitar ou retirar o consentimento desativa novas medições", () => {
  installWindow();
  saveCookiePreferences({ necessary: true, analytics: true });

  saveCookiePreferences({ necessary: true, analytics: false });

  assert.equal(hasAnalyticsConsent(), false);
  assert.deepEqual(getCookiePreferences(), {
    necessary: true,
    analytics: false,
  });
});

test("preferências antigas são normalizadas para as categorias atuais", () => {
  const { localStorage } = installWindow();
  localStorage.setItem(
    COOKIE_CONSENT_STORAGE_KEY,
    JSON.stringify({
      necessary: false,
      analytics: true,
      functional: true,
      marketing: true,
    })
  );

  assert.deepEqual(getCookiePreferences(), {
    necessary: true,
    analytics: true,
  });
});
