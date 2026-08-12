'use client';
import { useState } from 'react';
import { MessageCircle, Feather, Music, BookOpen, Smile, Mic, Home, Settings, LogIn, Crown, Image as ImageIcon, Send, Paperclip } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('AI Chat');
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([{role: 'ai', text: 'Radhe Radhe 🙏 PriyaVRana-Ai me aapka swagat hai ❤️'}]);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { name: 'AI Chat', icon: <MessageCircle size={18} /> },
    { name: 'Shayari AI', icon: <Feather size={18} /> },
    { name: 'Song AI', icon: <Music size={18} /> },
    { name: 'Study AI', icon: <BookOpen size={18} /> },
    { name: 'Comedy AI', icon: <Smile size={18} /> },
    { name: 'Voice AI', icon: <Mic size={18} /> },
  ];

  const handleSend = async () => {
    if(!prompt) return;
    const userMsg = {role: 'user', text: prompt};
    setMessages([...messages, userMsg]);
    setPrompt('');
    setLoading(true);

    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({prompt, tab: activeTab})
    });
    const data = await res.json();
    setMessages(prev => [...prev, {role: 'ai', text: data.reply}]);
    setLoading(false);
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[#0a0a1a] text-gray-900 dark:text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 p-4 flex flex-col">
        <div className="text-center mb-6">
          <img src="https://i.imgur.com/8KmCSTT.png" className="w-20 h-20 rounded-full mx-auto border-4 border-yellow-400"/>
          <p className="mt-2 font-bold">🙏 Radhe Radhe 🙏</p>
          <h2 className="text-xl font-bold">PriyaVRana-Ai</h2>
          <p>मैं आपका स्वागत है ❤️</p>
        </div>
        <nav className="flex flex-col gap-2">
          <button className="flex items-center gap-3 p-2 bg-blue-600 rounded-lg"><Home size={18}/> Home</button>
          {tabs.map(tab => (
            <button key={tab.name} onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-3 p-2 rounded-lg ${activeTab===tab.name? 'bg-blue-600' : 'hover:bg-blue-800'}`}>
              {tab.icon} {tab.name}
            </button>
          ))}
          <button className="flex items-center gap-3 p-2 hover:bg-blue-800 rounded-lg"><LogIn size={18}/> Login</button>
          <button className="flex items-center gap-3 p-2 hover:bg-blue-800 rounded-lg"><Settings size={18}/> Settings</button>
          <button className="flex items-center gap-3 p-2 hover:bg-blue-800 rounded-lg"><Crown size={18}/> Admin Panel</button>
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 flex-col p-4">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">👑 PriyaVRana-Ai <span className="text-sm font-normal">All in One AI Assistant</span></h1>
        </header>

        <div className="flex-1 overflow-y-auto bg-white dark:bg-[#111122] rounded-xl p-4 mb-4">
          {messages.map((m,i) => (
            <div key={i} className={`p-3 my-2 rounded-lg ${m.role==='ai'? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-200 dark:bg-gray-800 text-right'}`}>
              {m.text}
            </div>
          ))}
          {loading && <p>Socha raha hu...</p>}
        </div>

        <div className="flex gap-2">
          <input value={prompt} onChange={e=>setPrompt(e.target.value)}
            placeholder="अपना prompt यहाँ लिखें..."
            className="flex-1 p-3 rounded-lg bg-gray-200 dark:bg-gray-800 outline-none"/>
          <button onClick={handleSend} className="p-3 bg-blue-600 rounded-lg"><Send/></button>
        </div>

        <div className="flex gap-2 mt-3 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.name} onClick={() => setActiveTab(tab.name)}
              className={`flex flex-col items-center p-2 rounded-lg min-w-[80px] ${activeTab===tab.name? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-800'}`}>
              {tab.icon} <span className="text-xs mt-1">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}