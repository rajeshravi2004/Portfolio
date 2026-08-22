import type { Metadata } from "next";
import { Bebas_Neue, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const themeScript = `
  (function () {
    try {
      var saved = localStorage.getItem("portfolio-theme");
      var theme = saved === "light" || saved === "dark"
        ? saved
        : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      document.documentElement.dataset.theme = theme;
    } catch (_) {
      document.documentElement.dataset.theme = "light";
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
