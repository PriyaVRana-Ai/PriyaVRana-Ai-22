"use client";

import { KeyboardEvent } from "react";
import { Mic, Send } from "lucide-react";

type ChatInputProps = {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
};

export default function ChatInput({
  value,
  loading,
  onChange,
  onSend,
}: ChatInputProps) {
  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  }

  return (
    <div className="border-t border-blue-900/50 p-4">
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-blue-500/40 bg-[#0b234d] p-2 shadow-[0_0_25px_rgba(37,99,235,0.15)]">
        <button
          type="button"
          className="rounded-xl p-3 text-blue-300 transition hover:bg-blue-900/60"
          aria-label="Voice input"
        >
          <Mic size={20} />
        </button>

        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={loading}
          placeholder="Mujhse kuch bhi poochhein..."
          className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-3 text-white outline-none placeholder:text-blue-300 disabled:opacity-50"
        />

        <button
          type="button"
          onClick={onSend}
          disabled={!value.trim() || loading}
          className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </div>

      <p className="mt-2 text-center text-xs text-blue-300/70">
        PriyaVRana-Ai can make mistakes. Check important information.
      </p>
    </div>
  );
}