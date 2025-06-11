import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const apiKey = searchParams.get("key");
  const rules = [
    "Don't use markdown",
    "just use plain text.",
    "Only generate ONE result.",
    "ONE sentence.",
  ];
  const prompt =
    searchParams.get("prompt") || "Generate a fun/playful 404 header";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Invalid or missing API key" },
      { status: 401 }
    );
  }

  const body = {
    contents: [
      { parts: [{ text: `PROMPT: ${prompt}. RULES: ${rules.join()}` }] },
    ],
  };

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data?.error?.message || "Failed to generate content";
    return NextResponse.json(
      { error: errorMsg },
      { status: response.status || 500 }
    );
  }

  const text: string =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated";

  const returnableText = text.replaceAll("\n", "");
  return NextResponse.json({ returnableText });
}
