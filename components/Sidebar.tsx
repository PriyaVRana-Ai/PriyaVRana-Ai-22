"use client";

import {
  Plus,
  MessageSquare,
  Sparkles,
  Image as ImageIcon,
  Music2,
  BookOpen,
  Laugh,
  Mic,
  Settings,
  X,
} from "lucide-react";

type SidebarProps = {
  onNewChat: () => void;
  onClose: () => void;
};

const items = [
  { label: "AI Chat", icon: MessageSquare },
  { label: "Shayari AI", icon: Sparkles },
  { label: "Song AI", icon: Music2 },
  { label: "Study AI", icon: BookOpen },
  { label: "Comedy AI", icon: Laugh },
  { label: "Image AI", icon: ImageIcon },
  { label: "Voice AI", icon: Mic },
];

export default function Sidebar({
  onNewChat,
  onClose,
}: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-slate-200 bg-white text-slate-900 shadow-2xl md:relative">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-200 p-5">
        <div>
          <h1 className="text-xl font-bold text-blue-700">
            PriyaVRana-Ai
          </h1>

          <p className="mt-1 text-sm font-medium text-slate-500">
            🙏 Radhe Radhe, Swagat Hai
          </p>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-2 transition hover:bg-slate-100"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.25)] transition hover:bg-blue-500"
        >
          <Plus size={20} />
          New Chat
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4">
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          AI Tools
        </p>

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="my-4 border-t border-slate-200" />

        <button className="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">
          <MessageSquare size={19} />
          <span>Chat History</span>
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">
          <Settings size={19} />
          <span>Settings</span>
        </button>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        <div className="rounded-xl bg-blue-50 p-3">
          <p className="text-center text-xs font-medium text-blue-700">
            PriyaVRana-Ai
          </p>

          <p className="mt-1 text-center text-[11px] text-slate-500">
            🙏 Radhe Radhe
          </p>
        </div>
      </div>
    </aside>
  );
}