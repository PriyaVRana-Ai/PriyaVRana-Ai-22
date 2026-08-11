"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import ChatInput from "@/components/ChatInput";
import FeatureButtons from "@/components/FeatureButtons";

type Message = {
  role: "user" | "assistant";
  content: string;
  image?: string; // nayi line: image ke liye
};

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  async function sendMessage(customText?: string) {
    const text = (customText ?? input).trim();

    if ((!text && !selectedImage) || loading) return;

    const userMessage: Message = {
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      let data: any;

      // AGAR PHOTO UPLOAD HAI TO IMAGE API CALL KARO
      if (selectedImage) {
        const formData = new FormData();
        formData.append("prompt", text || "enhance this image");
        formData.append("image", selectedImage);

        const response = await fetch("/api/image", {
          method: "POST",
          body: formData, // JSON nahi, FormData
        });
        data = await response.json();

        // AI ka reply me image bhi add kar do
        setMessages((previous) => [
          ...previous,
          {
            role: "assistant",
            content: "Ye rahi aapki edit ki hui image 👇",
            image: data.image, // base64 image
          },
        ]);
        
        setSelectedImage(null); // upload clear kar do
      } 
      // NAHI TO NORMAL CHAT
      else {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: updatedMessages,
          }),
        });

        data = await response.json();

        setMessages((previous) => [
          ...previous,
          {
            role: "assistant",
            content:
              data.reply || "🙏 Radhe Radhe 🙏\nMujhe response nahi mila.",
          },
        ]);
      }
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: "🙏 Radhe Radhe 🙏\nServer se response nahi aa raha.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function newChat() {
    setMessages([]);
    setInput("");
    setSelectedImage(null);
  }

  return (
    <main className="flex min-h-screen bg-[#06142f] text-white">
      {sidebarOpen && (
        <Sidebar onNewChat={newChat} onClose={() => setSidebarOpen(false)} />
      )}

      <section className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-16 items-center border-b border-blue-900/50 bg-[#081b3d]/90 px-4 backdrop-blur">
          {!sidebarOpen && (
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="mr-3 rounded-lg p-2 transition hover:bg-blue-900/50"
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

              <h1 className="text-3xl font-bold">Radhe Radhe 🙏</h1>

              <p className="mt-2 max-w-md text-blue-200">
                PriyaVRana-Ai mein aapka swagat hai.
              </p>

              <p className="mb-6 mt-1 text-sm text-blue-300/70">
                Aap mujhse kuch bhi pooch sakte hain.
              </p>

              <FeatureButtons
                onSelect={(prompt) => {
                  setInput(prompt);
                }}
              />
            </div>
          ) : (
            <ChatArea messages={messages} loading={loading} />
          )}

                    <ChatInput
            value={input}
            loading={loading}
            onChange={setInput}
            onSend={() => sendMessage()}
            onImageSelect={(file) => setSelectedImage(file)}
            onImageRemove={() => setSelectedImage(null)}
          />
        </div>
      </section>
    </main>
  );
}