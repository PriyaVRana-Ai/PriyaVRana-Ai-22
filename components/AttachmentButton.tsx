"use client";

import { useRef } from "react";
import { Plus, Image as ImageIcon, FileText } from "lucide-react";

type AttachmentButtonProps = {
  onImageSelect?: (file: File) => void;
};

export default function AttachmentButton({
  onImageSelect,
}: AttachmentButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type.startsWith("image/")) {
      onImageSelect?.(file);
    }

    event.target.value = "";
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf,.txt,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={openFilePicker}
        className="flex h-11 w-11 items-center justify-center rounded-xl text-blue-300 transition hover:bg-blue-900/60 hover:text-white"
        aria-label="Attach file"
        title="Attach file"
      >
        <Plus size={22} />
      </button>

      <div className="pointer-events-none absolute left-0 top-12 hidden w-44 rounded-xl border border-blue-500/30 bg-[#0b234d] p-2 shadow-xl group-focus-within:block">
        <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white">
          <ImageIcon size={16} />
          Upload Image
        </div>

        <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white">
          <FileText size={16} />
          Upload File
        </div>
      </div>
    </div>
  );
}