"use client";

import Link from "next/link";
import {
  createContext,
  type FormEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { CheckCircle2, LoaderCircle, X } from "lucide-react";

type MeetingRequestContextValue = {
  openMeetingRequest: () => void;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

type FieldName =
  | "fullName"
  | "email"
  | "organization"
  | "role"
  | "message"
  | "privacyAcknowledged";

type MeetingRequestResponse = {
  message?: string;
  fieldErrors?: Partial<Record<FieldName, string>>;
};

const MeetingRequestContext = createContext<MeetingRequestContextValue | null>(
  null
);

export function useMeetingRequest() {
  const context = useContext(MeetingRequestContext);

  if (!context) {
    throw new Error(
      "useMeetingRequest must be used within MeetingRequestProvider"
    );
  }

  return context;
}

export function MeetingRequestProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<FieldName, string>>
  >({});

  const openMeetingRequest = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    formRef.current?.reset();
    setStatus("idle");
    setErrorMessage("");
    setFieldErrors({});
    setIsOpen(true);
  }, []);

  const closeMeetingRequest = useCallback(() => {
    if (status === "submitting") return;
    setIsOpen(false);
  }, [status]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      return;
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      window.requestAnimationFrame(() => previousFocusRef.current?.focus());
    };
  }, [isOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setErrorMessage("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/meeting-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          organization: formData.get("organization"),
          role: formData.get("role"),
          message: formData.get("message"),
          privacyAcknowledged:
            formData.get("privacyAcknowledged") === "on",
          website: formData.get("website"),
        }),
      });

      const result = (await response
        .json()
        .catch(() => ({}))) as MeetingRequestResponse;

      if (!response.ok) {
        setFieldErrors(result.fieldErrors ?? {});
        setErrorMessage(
          response.status === 429
            ? "Recebemos vários pedidos num curto espaço de tempo. Aguarde alguns minutos e tente novamente."
            : result.message ??
                "Não foi possível enviar o pedido. Tente novamente dentro de alguns minutos."
        );
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setErrorMessage(
        "Não foi possível enviar o pedido. Verifique a ligação e tente novamente."
      );
      setStatus("error");
    }
  }

  const contextValue = useMemo(
    () => ({ openMeetingRequest }),
    [openMeetingRequest]
  );

  return (
    <MeetingRequestContext.Provider value={contextValue}>
      {children}

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-[2rem] bg-[#f7f3ee] p-0 text-[#17202a] shadow-2xl backdrop:bg-[#17202a]/70 backdrop:backdrop-blur-sm"
        onCancel={(event) => {
          if (status === "submitting") {
            event.preventDefault();
            return;
          }
          setIsOpen(false);
        }}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMeetingRequest();
        }}
      >
        <div className="relative p-6 sm:p-8 md:p-10">
          <button
            type="button"
            onClick={closeMeetingRequest}
            disabled={status === "submitting"}
            className="absolute right-5 top-5 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#17202a]/10 bg-white text-[#17202a] transition hover:border-[#6f3e5c] hover:text-[#6f3e5c] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Fechar formulário"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {status === "success" ? (
            <div className="py-10 text-center" role="status">
              <CheckCircle2
                className="mx-auto h-14 w-14 text-[#2db795]"
                aria-hidden="true"
              />
              <h2 id={titleId} className="mt-6 text-3xl font-black">
                Pedido recebido
              </h2>
              <p
                id={descriptionId}
                className="mx-auto mt-4 max-w-lg leading-7 text-[#41514c]"
              >
                Obrigado pelo seu interesse. Recebemos o seu pedido de reunião.
                A equipa da Educanology entrará em contacto consigo.
              </p>
              <button
                type="button"
                onClick={closeMeetingRequest}
                className="mt-8 cursor-pointer rounded-full bg-[#17202a] px-7 py-3 font-bold text-white transition hover:bg-[#6f3e5c]"
              >
                Fechar
              </button>
            </div>
          ) : (
            <>
              <p className="pr-14 text-sm font-bold uppercase tracking-[0.25em] text-[#6f3e5c]">
                Reunião de 45 minutos
              </p>
              <h2 id={titleId} className="mt-4 pr-14 text-3xl font-black">
                Fale com a equipa da Educanology
              </h2>
              <p
                id={descriptionId}
                className="mt-3 max-w-xl leading-7 text-[#41514c]"
              >
                Conte-nos brevemente como podemos ajudar. Responderemos ao seu
                pedido de contacto sem confirmar automaticamente uma reunião.
              </p>

              <form
                ref={formRef}
                className="mt-8 space-y-5"
                onSubmit={handleSubmit}
                noValidate={false}
              >
                <div>
                  <label htmlFor="meeting-full-name" className="text-sm font-bold">
                    Nome completo <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="meeting-full-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={120}
                    aria-invalid={Boolean(fieldErrors.fullName)}
                    aria-describedby={
                      fieldErrors.fullName ? "meeting-full-name-error" : undefined
                    }
                    className="mt-2 w-full rounded-2xl border border-[#17202a]/15 bg-white px-4 py-3 outline-none transition focus:border-[#2db795] focus:ring-4 focus:ring-[#2db795]/15"
                  />
                  {fieldErrors.fullName && (
                    <p
                      id="meeting-full-name-error"
                      className="mt-2 text-sm font-medium text-red-700"
                    >
                      {fieldErrors.fullName}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="meeting-email" className="text-sm font-bold">
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="meeting-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={
                        fieldErrors.email ? "meeting-email-error" : undefined
                      }
                      className="mt-2 w-full rounded-2xl border border-[#17202a]/15 bg-white px-4 py-3 outline-none transition focus:border-[#2db795] focus:ring-4 focus:ring-[#2db795]/15"
                    />
                    {fieldErrors.email && (
                      <p
                        id="meeting-email-error"
                        className="mt-2 text-sm font-medium text-red-700"
                      >
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="meeting-organization"
                      className="text-sm font-bold"
                    >
                      Organização / Entidade
                    </label>
                    <input
                      id="meeting-organization"
                      name="organization"
                      type="text"
                      autoComplete="organization"
                      maxLength={160}
                      aria-invalid={Boolean(fieldErrors.organization)}
                      aria-describedby={
                        fieldErrors.organization
                          ? "meeting-organization-error"
                          : undefined
                      }
                      className="mt-2 w-full rounded-2xl border border-[#17202a]/15 bg-white px-4 py-3 outline-none transition focus:border-[#2db795] focus:ring-4 focus:ring-[#2db795]/15"
                    />
                    {fieldErrors.organization && (
                      <p
                        id="meeting-organization-error"
                        className="mt-2 text-sm font-medium text-red-700"
                      >
                        {fieldErrors.organization}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="meeting-role" className="text-sm font-bold">
                    Cargo / Função
                  </label>
                  <input
                    id="meeting-role"
                    name="role"
                    type="text"
                    autoComplete="organization-title"
                    maxLength={120}
                    aria-invalid={Boolean(fieldErrors.role)}
                    aria-describedby={
                      fieldErrors.role ? "meeting-role-error" : undefined
                    }
                    className="mt-2 w-full rounded-2xl border border-[#17202a]/15 bg-white px-4 py-3 outline-none transition focus:border-[#2db795] focus:ring-4 focus:ring-[#2db795]/15"
                  />
                  {fieldErrors.role && (
                    <p
                      id="meeting-role-error"
                      className="mt-2 text-sm font-medium text-red-700"
                    >
                      {fieldErrors.role}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="meeting-message" className="text-sm font-bold">
                    Como podemos ajudar? <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="meeting-message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={3000}
                    rows={5}
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={
                      fieldErrors.message ? "meeting-message-error" : undefined
                    }
                    className="mt-2 w-full resize-y rounded-2xl border border-[#17202a]/15 bg-white px-4 py-3 outline-none transition focus:border-[#2db795] focus:ring-4 focus:ring-[#2db795]/15"
                  />
                  {fieldErrors.message && (
                    <p
                      id="meeting-message-error"
                      className="mt-2 text-sm font-medium text-red-700"
                    >
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="meeting-website">Website</label>
                  <input
                    id="meeting-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="rounded-2xl border border-[#17202a]/10 bg-white/70 p-4">
                  <label className="flex items-start gap-3 text-sm leading-6 text-[#41514c]">
                    <input
                      name="privacyAcknowledged"
                      type="checkbox"
                      required
                      aria-invalid={Boolean(fieldErrors.privacyAcknowledged)}
                      aria-describedby={
                        fieldErrors.privacyAcknowledged
                          ? "meeting-privacy-error"
                          : undefined
                      }
                      className="mt-1 h-4 w-4 shrink-0 accent-[#6f3e5c]"
                    />
                    <span>
                      Li e compreendi a{" "}
                      <Link
                        href="/politica-de-privacidade"
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-[#6f3e5c] underline underline-offset-2"
                      >
                        Política de Privacidade
                      </Link>{" "}
                      e confirmo que fui informado/a sobre o tratamento dos meus
                      dados para responder ao meu pedido de contacto.
                    </span>
                  </label>
                  {fieldErrors.privacyAcknowledged && (
                    <p
                      id="meeting-privacy-error"
                      className="mt-2 text-sm font-medium text-red-700"
                    >
                      {fieldErrors.privacyAcknowledged}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <p
                    className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800"
                    role="alert"
                  >
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-[#6f3e5c] px-7 py-4 font-bold text-white shadow-xl shadow-[#6f3e5c]/20 transition hover:bg-[#563048] disabled:cursor-not-allowed disabled:opacity-65"
                >
                  {status === "submitting" && (
                    <LoaderCircle
                      className="h-5 w-5 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  {status === "submitting"
                    ? "A enviar..."
                    : "Enviar pedido de reunião"}
                </button>
              </form>
            </>
          )}
        </div>
      </dialog>
    </MeetingRequestContext.Provider>
  );
}
