"use client";

import { useState } from "react";
import {
  DEFAULT_COOKIE_PREFERENCES,
  saveCookiePreferences,
  type CookiePreferences,
  useCookieConsent,
} from "@/lib/cookie-consent";

export default function CookieConsent() {
  const { isLoaded, preferences: savedPreferences } = useCookieConsent();
  const [forceVisible, setForceVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(
    DEFAULT_COOKIE_PREFERENCES
  );
  const hasSavedPreferences = savedPreferences !== null;
  const visible = isLoaded && (!hasSavedPreferences || forceVisible);

  function savePreferences(nextPreferences: CookiePreferences) {
    const normalizedPreferences = saveCookiePreferences(nextPreferences);
    setPreferences(normalizedPreferences);
    setForceVisible(false);
    setShowSettings(false);
  }

  function acceptAll() {
    savePreferences({
      necessary: true,
      analytics: true,
    });
  }

  function rejectNonEssential() {
    savePreferences(DEFAULT_COOKIE_PREFERENCES);
  }

  function togglePreference(key: keyof Omit<CookiePreferences, "necessary">) {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function openSettings() {
    setPreferences(savedPreferences ?? DEFAULT_COOKIE_PREFERENCES);
    setForceVisible(true);
    setShowSettings(true);
  }

  return (
    <>
      {!visible && hasSavedPreferences && (
        <button
          type="button"
          onClick={openSettings}
          className="fixed bottom-24 left-4 z-[2147483645] rounded-full border border-[#17202a]/10 bg-white px-4 py-2 text-xs font-bold text-[#17202a] shadow-lg hover:border-[#6f3e5c] md:bottom-24"
        >
          Cookies
        </button>
      )}

      {visible && (
        <div className="fixed inset-x-0 bottom-0 z-[2147483646] px-4 pb-4 md:px-6 md:pb-6">
          <div className="mx-auto max-w-5xl rounded-[1.5rem] border border-[#17202a]/10 bg-white p-5 text-[#17202a] shadow-2xl md:p-6">
            {!showSettings ? (
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="max-w-3xl">
                  <p className="text-lg font-black">Utilizamos cookies</p>
                  <p className="mt-2 text-sm leading-6 text-[#41514c]">
                    Guardamos a sua preferência de consentimento no navegador e,
                    apenas com a sua autorização, ativamos Google Analytics e
                    Vercel Analytics para medir a utilização do website. Pode
                    aceitar, rejeitar ou configurar esta preferência.
                  </p>
                  <a
                    href="/politica-de-cookies"
                    className="mt-2 inline-block text-sm font-bold text-[#6f3e5c] hover:text-[#2db795]"
                  >
                    Ver política de cookies
                  </a>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
                  <button
                    type="button"
                    onClick={rejectNonEssential}
                    className="rounded-full border border-[#17202a]/15 px-5 py-3 text-sm font-bold hover:border-[#6f3e5c]"
                  >
                    Rejeitar não essenciais
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSettings(true)}
                    className="rounded-full border border-[#17202a]/15 px-5 py-3 text-sm font-bold hover:border-[#6f3e5c]"
                  >
                    Configurar
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="rounded-full bg-[#6f3e5c] px-5 py-3 text-sm font-bold text-white hover:bg-[#563048]"
                  >
                    Aceitar analíticas
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-lg font-black">Configurar cookies</p>
                <p className="mt-2 text-sm leading-6 text-[#41514c]">
                  Escolha se autoriza as tecnologias analíticas. O armazenamento
                  estritamente necessário à sua escolha permanece sempre ativo.
                </p>

                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl bg-[#f7f3ee] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-black">Necessárias</p>
                        <p className="text-sm text-[#41514c]">
                          Guardam localmente a sua preferência de consentimento.
                        </p>
                      </div>
                      <span className="rounded-full bg-[#edf7f3] px-3 py-1 text-xs font-bold text-[#24675a]">
                        Sempre ativas
                      </span>
                    </div>
                  </div>

                  {[
                    {
                      key: "analytics" as const,
                      title: "Analíticas",
                      text: "Ativam Google Analytics e Vercel Analytics para medir visitas, conteúdos consultados e desempenho.",
                    },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-[#f7f3ee] p-4"
                    >
                      <div>
                        <p className="font-black">{item.title}</p>
                        <p className="text-sm text-[#41514c]">{item.text}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={preferences[item.key]}
                        onChange={() => togglePreference(item.key)}
                        className="h-5 w-5 accent-[#6f3e5c]"
                      />
                    </label>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setShowSettings(false)}
                    className="rounded-full border border-[#17202a]/15 px-5 py-3 text-sm font-bold hover:border-[#6f3e5c]"
                  >
                    Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => savePreferences(preferences)}
                    className="rounded-full bg-[#6f3e5c] px-5 py-3 text-sm font-bold text-white hover:bg-[#563048]"
                  >
                    Guardar preferências
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
