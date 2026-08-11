"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return alert("Prompt likh bhai");
    setLoading(true);
    setImage("");

    try {
      // Yahi par wo pollinations wala link ban raha hai
      const res = await fetch(`/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const blob = await res.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
      
    } catch (err) {
      alert("Error aa gaya");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-4">
      <h1 className="text-3xl font-bold">PriyaVRana AI Image</h1>
      
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Jaise: a cute cat anime style"
        className="border p-2 w-full max-w-md rounded"
      />
      
      <button 
        onClick={generateImage} 
        disabled={loading}
        className="bg-blue-500 text-white px-6 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? "Bana raha hun..." : "Generate"}
      </button>

      {image && <img src={image} alt="Generated" className="max-w-md rounded-lg shadow-lg" />}
    </div>
  );
}