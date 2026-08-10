"use client";

import { KeyboardEvent, useState } from "react";
import { Mic, Send, X } from "lucide-react";
import AttachmentButton from "./AttachmentButton";

type ChatInputProps = {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
  onImageSelect?: (file: File) => void;
};

export default function ChatInput({
  value,
  loading,
  onChange,
  onSend,
  onImageSelect,
}: ChatInputProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  }

  function handleImageSelect(file: File) {
    setSelectedImage(file);
    onImageSelect?.(file);
  }

  function removeImage() {
    setSelectedImage(null);
  }

  return (
    <div className="border-t border-blue-900/50 p-4">
      <div className="mx-auto max-w-3xl">

        {selectedImage && (
          <div className="mb-2 flex items-center gap-2 rounded-xl border border-blue-500/30 bg-[#0b234d] p-2">
            <div className="flex-1 truncate text-sm text-blue-100">
              🖼️ {selectedImage.name}
            </div>

            <button
              type="button"
              onClick={removeImage}
              className="rounded-lg p-1 text-blue-300 hover:bg-blue-900/60 hover:text-white"
              aria-label="Remove image"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className="flex items-end gap-2 rounded-2xl border border-blue-500/40 bg-[#0b234d] p-2 shadow-[0_0_25px_rgba(37,99,235,0.15)]">

          <AttachmentButton
            onImageSelect={handleImageSelect}
          />

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
    </div>
  );
}