"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const initialMessage: Message = {
  role: "assistant",
  content:
    "Olá. Sou o assistente virtual da Educanology. Posso ajudar com IA educativa, aprendizagem ativa, formação docente, FabLabs, MakerSpaces, modernização de escolas e projetos financiáveis. Representa uma câmara municipal, escola, agrupamento, governo, fundação, centro de formação ou empresa?",
};

export default function EducanologyAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage() {
    const trimmed = input.trim();

    if (!trimmed || isLoading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];

    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: nextMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Chat request failed");
      }

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "Desculpe, neste momento não consigo responder. Pode tentar novamente ou escrever para hello@educanology.eu.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-[2147483647] hidden items-center gap-3 rounded-full border border-white/20 bg-[#6f3e5c] px-6 py-4 text-sm font-bold text-white shadow-2xl shadow-slate-900/35 transition hover:-translate-y-1 hover:bg-[#17202a] md:flex"
      >
        <MessageCircle className="h-5 w-5" />
        Agente educativo
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[2147483647] flex items-end justify-center bg-[#17202a]/35 p-4 backdrop-blur-sm md:items-end md:justify-start md:p-8">
          <div className="flex h-[78vh] w-full max-w-[440px] flex-col overflow-hidden rounded-[2rem] border border-white/20 bg-[#f7f3ee] shadow-2xl">
            <div className="flex items-center justify-between bg-[#17202a] px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#8ce2cc]/15 text-[#8ce2cc]">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-black">Agente Educanology</p>
                  <p className="text-xs text-white/60">
                    Especialista educativo virtual
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Fechar agente"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[86%] rounded-3xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-[#6f3e5c] text-white"
                        : "border border-[#17202a]/10 bg-white text-[#17202a] shadow-sm"
                    }`}
                  >
                    <ReactMarkdown
                        components={{
                        strong: ({ children }) => (
                            <strong className="font-black">{children}</strong>
                        ),
                        p: ({ children }) => (
                            <p className="mb-3 last:mb-0">{children}</p>
                        ),
                        ul: ({ children }) => (
                            <ul className="mb-3 ml-4 list-disc space-y-1 last:mb-0">
                                {children}
                            </ul>
                        ),
                        ol: ({ children }) => (
                            <ol className="mb-3 ml-4 list-decimal space-y-1 last:mb-0">
                                {children}
                            </ol>
                        ),
                        li: ({ children }) => <li>{children}</li>,
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-3xl border border-[#17202a]/10 bg-white px-4 py-3 text-sm text-[#41514c] shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    A pensar...
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-[#17202a]/10 bg-white/70 p-4">
              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Escreva a sua pergunta..."
                  className="max-h-32 min-h-[48px] flex-1 resize-none rounded-2xl border border-[#17202a]/10 bg-white px-4 py-3 text-sm text-[#17202a] outline-none transition placeholder:text-[#41514c]/50 focus:border-[#6f3e5c]"
                />

                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={isLoading || input.trim().length === 0}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#17202a] text-white transition hover:bg-[#6f3e5c] disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Enviar mensagem"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-3 text-xs leading-5 text-[#41514c]/70">
                O agente orienta e qualifica oportunidades. Não substitui uma
                consultoria formal nem assume compromissos comerciais.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}