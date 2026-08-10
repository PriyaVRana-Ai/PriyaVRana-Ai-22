"use client";

type MessageBubbleProps = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({
  role,
  content,
}: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-blue-500/30 bg-[#0b234d] text-blue-50"
        }`}
      >
        {!isUser && (
          <div className="mb-1 text-xs font-semibold text-blue-300">
            PriyaVRana-Ai
          </div>
        )}

        {content}
      </div>
    </div>
  );
}