import type { Metadata } from "next";
import Link from "next/link";
import { ChatAdmin } from "@/components/ChatAdmin";

export const metadata: Metadata = {
  title: "Chat workspace | Rajesh R",
  robots: { index: false, follow: false, nocache: true },
};

export default function ChatUpdatePage() {
  return <main className="chat-admin-page"><Link className="text-link" href="/">← Back to portfolio</Link><ChatAdmin /></main>;
}
