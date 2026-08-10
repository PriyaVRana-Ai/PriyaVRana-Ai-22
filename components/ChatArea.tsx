"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image"; // optional, agar next/image use karna ho

type Message = {
  role: "user" | "assistant";
  content: string;
  image?: string; // <-- YE NAYI LINE JODI
};

type ChatAreaProps = {
  messages: Message[];
  loading: boolean;
};

export default function ChatArea({
  messages,
  loading,
}: ChatAreaProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600/20 text-4xl shadow-[0_0_35px_rgba(37,99,235,0.35)]">
          🙏
        </div>

        <h2 className="text-3xl font-bold text-white">
          Radhe Radhe 🙏
        </h2>

        <p className="mt-2 max-w-md text-blue-200">
          PriyaVRana-Ai mein aapka swagat hai.
        </p>

        <div className="mt-6 flex items-center gap-2 rounded-full border-blue-500/30 bg-blue-900/30 px-4 py-2 text-sm text-blue-200">
          <Sparkles size={16} />
          Aap mujhse kuch bhi pooch sakte hain
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="mx-auto max-w-3xl space-y-5">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "border border-blue-500/30 bg-[#0b234d] text-blue-50"
              }`}
            >
              {message.content}

              {/* YE NAYI LINE - IMAGE DIKHANE KE LIYE */}
              {message.image && (
                <img 
                  src={message.image} 
                  alt="AI generated" 
                  className="mt-3 rounded-xl max-w-full border border-blue-500/20" 
                />
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="max-w-fit rounded-2xl border-blue-500/30 bg-[#0b234d] px-4 py-3 text-blue-200