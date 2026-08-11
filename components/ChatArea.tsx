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

export default function ChatArea({
  messages,
  loading,
}: ChatAreaProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-yellow-500/30 bg-black/40 text-3xl shadow-[0_0_30px_rgba(255,0,0,0.25)]">
          🙏
        </div>

        <h1 className="mb-2 text-2xl font-bold text-yellow-400">
          Radhe Radhe 🙏
        </h1>

        <p className="mb-2 text-lg font-semibold text-white">
          PriyaVRana-Ai mein aapka swagat hai.
        </p>

        <p className="text-sm text-gray-400">
          Aap mujhse kuch bhi pooch sakte hain
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-6">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex w-full ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[85%] rounded-2xl border px-4 py-3 shadow-lg ${
              message.role === "user"
                ? "border-red-500/30 bg-[#2a0b12] text-white"
                : "border-blue-500/30 bg-[#0b234d] text-blue-100"
            }`}
          >
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold">
              {message.role === "assistant" ? (
                <>
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-400">PriyaVRana-Ai</span>
                </>
              ) : (
                <span className="text-red-300">You</span>
              )}
            </div>

            <p className="whitespace-pre-wrap break-words text-sm leading-6">
              {message.content}
            </p>

            {message.image && (
              <img
                src={message.image}
                alt="Generated image"
                className="mt-3 max-w-full rounded-xl border border-white/10"
              />
            )}
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="max-w-fit rounded-2xl border border-blue-500/30 bg-[#0b234d] px-4 py-3 text-blue-200">
            🙏 Radhe Radhe… soch raha hoon...
          </div>
        </div>
      )}
    </div>
  );
}