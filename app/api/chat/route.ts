import OpenAI from "openai";
import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/agent/systemPrompt";
import { getKnowledgeBase } from "@/lib/agent/knowledge";

export const runtime = "nodejs";

const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
});

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages as ChatMessage[] | undefined;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages payload" },
        { status: 400 }
      );
    }

    const latestUserMessage = messages
      .filter((message) => message.role === "user")
      .at(-1)?.content;

    if (!latestUserMessage || latestUserMessage.trim().length === 0) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: "Missing DEEPSEEK_API_KEY" },
        { status: 500 }
      );
    }

    const knowledgeBase = getKnowledgeBase();

    const completion = await deepseek.chat.completions.create({
      model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
      temperature: 0.4,
      max_tokens: 900,
      messages: [
        {
          role: "system",
          content: `${SYSTEM_PROMPT}

BASE DE CONOCIMIENTO:
${knowledgeBase}

Usa la base de conocimiento como referencia principal. Si algo no está en la base, responde con prudencia y explica que puede revisarlo el equipo de Educanology.`,
        },
        ...messages.slice(-10),
      ],
    });

    const answer =
      completion.choices[0]?.message?.content ||
      "Desculpe, não consegui gerar uma resposta neste momento.";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        error:
          "O assistente não está disponível neste momento. Por favor, tente novamente em alguns minutos.",
      },
      { status: 500 }
    );
  }
}