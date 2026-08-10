import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          reply:
            "🙏 Radhe Radhe 🙏\nGROQ_API_KEY abhi Vercel mein set nahi hai.",
        },
        { status: 500 }
      );
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { reply: "🙏 Radhe Radhe 🙏\nAapka message nahi mila." },
        { status: 400 }
      );
    }

    const firstUserMessage =
      messages.find((message: any) => message.role === "user")?.content || "";

    const groqMessages = [
      {
        role: "system",
        content: `You are PriyaVRana-Ai, a friendly Hindi AI assistant.

IMPORTANT:
- Your first response in every new conversation must begin exactly with "🙏 Radhe Radhe 🙏".
- Be helpful, respectful and clear.
- You can answer in Hindi, Hinglish or English according to the user's language.
- Do not claim to be ChatGPT.
- Your name is PriyaVRana-Ai.`,
      },
      ...messages.map((message: any) => ({
        role: message.role,
        content: String(message.content),
      })),
    ];

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: groqMessages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq error:", data);

      return NextResponse.json(
        {
          reply:
            "🙏 Radhe Radhe 🙏\nAI server se response nahi aa paya.",
        },
        { status: response.status }
      );
    }

    const reply =
      data?.choices?.[0]?.message?.content ||
      "🙏 Radhe Radhe 🙏\nMujhe response nahi mila.";

    return NextResponse.json({
      reply,
      firstMessageDetected: Boolean(firstUserMessage),
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        reply:
          "🙏 Radhe Radhe 🙏\nKuch technical problem aa gayi. Dobara try karo.",
      },
      { status: 500 }
    );
  }
}