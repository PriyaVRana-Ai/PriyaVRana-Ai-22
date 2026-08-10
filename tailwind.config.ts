import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        royalBlue: "#0B5CFF",
        deepBlue: "#06142F",
        royalGold: "#FFD700",
        sidebarWhite: "#F8FAFC"
      },
      boxShadow: {
        blueGlow: "0 0 25px rgba(11, 92, 255, 0.45)",
        goldGlow: "0 0 20px rgba(255, 215, 0, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;