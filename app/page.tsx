"use client";

import { useState } from "react";
import {
  Menu,
  Plus,
  MessageSquare,
  Image as ImageIcon,
  Sparkles,
  Settings,
  Send,
  Mic,
  X,
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const menuItems = [
  { name: "New Chat", icon: Plus },
  { name: "AI Chat", icon: MessageSquare },
  { name: "Shayari AI", icon: Sparkles },
  { name: "Image AI", icon: ImageIcon },
  { name: "Settings", icon: Settings },
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const text = input.trim();

    if (!text || loading) return;

    const userMessage: Message = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply || "🙏 Radhe Radhe 🙏\nKuchh galat ho gaya, dobara try karo.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "🙏 Radhe Radhe 🙏\nServer se response nahi aa raha. Thodi der baad try karo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <main className="flex min-h-screen bg-[#06142f] text-white">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-blue-100 bg-white text-slate-900 shadow-2xl md:relative">
          <div className="flex items-center justify-between border-b border-slate-200 p-5">
            <div>
              <h1 className="text-xl font-bold text-blue-700">
                PriyaVRana-Ai
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                🙏 Radhe Radhe, Swagat Hai
              </p>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 hover:bg-slate-100"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  className="mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-blue-50 hover:text-blue-700"
                  onClick={() => {
                    if (item.name === "New Chat") {
                      setMessages([]);
                    }
                  }}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-auto border-t border-slate-200 p-4">
            <p className="text-center text-xs text-slate-400">
              PriyaVRana-Ai
            </p>
          </div>
        </aside>
      )}

      {/* Main */}
      <section className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center border-b border-blue-900/50 bg-[#081b3d]/90 px-4 backdrop-blur">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="mr-3 rounded-lg p-2 hover:bg-blue-900/50"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
          )}

          <div>
            <h2 className="font-semibold">PriyaVRana-Ai</h2>
            <p className="text-xs text-blue-300">Online • AI Assistant</p>
          </div>
        </header>

        <div className="flex flex-1 flex-col overflow-hidden">
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600/20 text-4xl shadow-[0_0_35px_rgba(37,99,235,0.35)]">
                🙏
              </div>

              <h2 className="text-3xl font-bold">
                Radhe Radhe 🙏
              </h2>

              <p className="mt-2 max-w-md text-blue-200">
                PriyaVRana-Ai mein aapka swagat hai.
              </p>

              <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4">
                {["Shayari", "Song", "Study", "Image"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setInput(`${item} AI mein meri madad karo`)}
                    className="rounded-xl border border-blue-500/30 bg-blue-900/30 px-5 py-3 text-sm transition hover:border-blue-400 hover:bg-blue-800/50"
                  >
                    ✨ {item} AI
                  </button>
                ))}
              </div>
            </div>
          ) : (
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
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="rounded-2xl border border-blue-500/30 bg-[#0b234d] px-4 py-3 text-blue-200">
                    🙏 Radhe Radhe… soch raha hoon...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-blue-900/50 p-4">
            <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-blue-500/40 bg-[#0b234d] p-2 shadow-[0_0_25px_rgba(37,99,235,0.15)]">
              <button
                className="rounded-xl p-3 text-blue-300 hover:bg-blue-900/60"
                aria-label="Voice input"
              >
                <Mic size={20} />
              </button>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Mujhse kuch bhi poochhein..."
                className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-3 text-white outline-none placeholder:text-blue-300"
              />

              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
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
      </section>
    </main>
  );
}