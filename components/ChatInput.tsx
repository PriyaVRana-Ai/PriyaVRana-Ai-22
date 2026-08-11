"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { Mic, Send, X } from "lucide-react";
import AttachmentButton from "./AttachmentButton";

type ChatInputProps = {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
  onImageSelect?: (file: File) => void;
  onImageRemove?: () => void;
};

export default function ChatInput({
  value,
  loading,
  onChange,
  onSend,
  onImageSelect,
  onImageRemove,
}: ChatInputProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedImage) {
      setImagePreview(null);
      return;
    }

    const url = URL.createObjectURL(selectedImage);
    setImagePreview(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedImage]);

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (!loading && value.trim()) {
        onSend();
      }
    }
  }

  function handleImageSelect(file: File) {
    setSelectedImage(file);
    onImageSelect?.(file);
  }

  function removeImage() {
    setSelectedImage(null);
    onImageRemove?.();
  }

  return (
    <div className="border-t border-blue-900/50 p-4">
      <div className="mx-auto max-w-3xl">

        {/* IMAGE PREVIEW */}
        {selectedImage && (
          <div className="mb-3 rounded-2xl border border-blue-500/40 bg-[#0b234d] p-3 shadow-[0_0_25px_rgba(37,99,235,0.15)]">

            <div className="relative inline-block">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Selected image"
                  className="h-28 w-28 rounded-xl object-cover border border-blue-400/40"
                />
              )}

              <button
                type="button"
                onClick={removeImage}
                className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-500"
                aria-label="Remove image"
              >
                <X size={16} />
              </button>
            </div>

            <p className="mt-2 truncate text-xs text-blue-200">
              {selectedImage.name}
            </p>

            <p className="mt-1 text-sm font-medium text-yellow-300">
              ✨ Ab bataiye image ke saath kya karna hai
            </p>
          </div>
        )}

        {/* INPUT AREA */}
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
            placeholder={
              selectedImage
                ? "Image ke saath kya karna hai? Prompt likhiye..."
                : "Mujhse kuch bhi poochhein..."
            }
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