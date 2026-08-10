import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PriyaVRana-Ai",
  description: "PriyaVRana-Ai — Radhe Radhe 🙏",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}