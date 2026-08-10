"use client";

import {
  Sparkles,
  Music2,
  BookOpen,
  Laugh,
  Image as ImageIcon,
} from "lucide-react";

type FeatureButtonsProps = {
  onSelect: (feature: string) => void;
};

const features = [
  {
    name: "Shayari AI",
    icon: Sparkles,
    prompt: "Mere liye ek beautiful Hindi shayari likho.",
  },
  {
    name: "Song AI",
    icon: Music2,
    prompt: "Mere liye ek original Hindi song ka idea banao.",
  },
  {
    name: "Study AI",
    icon: BookOpen,
    prompt: "Mujhe kisi topic ko simple Hindi mein samjhao.",
  },
  {
    name: "Comedy AI",
    icon: Laugh,
    prompt: "Mujhe ek clean funny joke sunao.",
  },
  {
    name: "Image AI",
    icon: ImageIcon,
    prompt: "Ek beautiful cinematic image ke liye prompt banao.",
  },
];

export default function FeatureButtons({
  onSelect,
}: FeatureButtonsProps) {
  return (
    <div className="grid w-full max-w-2xl grid-cols-2 gap-3 md:grid-cols-5">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <button
            key={feature.name}
            type="button"
            onClick={() => onSelect(feature.prompt)}
            className="flex flex-col items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-900/30 px-3 py-4 text-sm text-blue-100 transition hover:border-blue-400 hover:bg-blue-800/50"
          >
            <Icon size={20} />
            <span>{feature.name}</span>
          </button>
        );
      })}
    </div>
  );
}