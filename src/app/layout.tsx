import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valora Film — Streaming Sinematik Bebas Iklan",
  description:
    "Aplikasi web streaming film dan serial bebas iklan dengan performa tinggi, multi-provider, dan tautan rilis Android resmi.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased bg-[#0b0c10] text-zinc-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
