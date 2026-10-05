import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Sora } from "next/font/google";
import "./globals.css";
import "./studio.css";
import "./chat.css";
import "./habits.css";

const display = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const themeScript = `
  (function () {
    try {
      var saved = localStorage.getItem("portfolio-theme");
      document.documentElement.dataset.theme = saved === "light" || saved === "dark" ? saved : "dark";
      document.documentElement.dataset.motion = localStorage.getItem("portfolio-motion") === "paused" ? "paused" : "full";
    } catch (_) {
      document.documentElement.dataset.theme = "dark";
    }
  })();
`;

export const metadata: Metadata = {
  title: "Rajesh R — Full-stack Developer",
  description: "Rajesh R — full-stack developer building healthcare and AI-powered products with React, Node.js, Python, and cloud systems.",
  openGraph: {
    title: "Rajesh R — Full-stack Developer",
    description: "Rajesh R — full-stack developer building healthcare and AI-powered products with React, Node.js, Python, and cloud systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${body.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}
