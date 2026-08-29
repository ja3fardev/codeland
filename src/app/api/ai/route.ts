import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, context } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const contextInfo = context
      ? `\n\nContext: Page=${context.page || "unknown"}, Time=${context.timestamp || "unknown"}`
      : "";

    const encodedText = encodeURIComponent(message + contextInfo);

    const res = await fetch(
      `https://drink-tools.vercel.app/api/claude?text=${encodedText}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) {
      throw new Error(`External API responded with status ${res.status}`);
    }

    const data = await res.json();
    const reply = data.reply || data.text || data.content || JSON.stringify(data);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      { error: "Failed to process your request", reply: "Sorry, I encountered an error processing your request." },
      { status: 500 }
    );
  }
}
