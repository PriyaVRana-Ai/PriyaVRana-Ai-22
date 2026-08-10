"use client";
import { Sparkles } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
  image?: string;
};

type ChatAreaProps = {
  messages: Message[];
  loading: boolean;
};

export default function ChatArea({ messages, loading }: ChatAreaProps) {
  if (messages.length === 0) {
    return (

          🙏

        Radhe Radhe 🙏

          PriyaVRana-Ai mein aapka swagat hai.

          Aap mujhse kuch bhi pooch sakte hain

    );
  }

  return (

        {messages.map((message, index) => (

              {message.content}

              {message.image && (

              )}

        ))}

        {loading && (

            🙏 Radhe Radhe… soch raha hoon...

        )}

  );
}