"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ChatMarkdown } from "./ChatMarkdown";
import { createPortal } from "react-dom";
import { ChatIcon, CloseIcon } from "./Icons";

type Message = { role: "user" | "assistant"; content: string };
const suggestions = ["What does Rajesh build?", "Tell me about his experience", "How can I contact him?"];

export function PortfolioChat({ onOpen }: { onOpen?: () => void }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const list = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const sending = useRef(false);

  useEffect(() => { if (open) field.current?.focus(); }, [open]);
  useEffect(() => { if (list.current) list.current.scrollTop = list.current.scrollHeight; }, [messages, busy, open]);

  function close() { setOpen(false); launcher.current?.focus(); }

  async function send(question: string) {
    const content = question.trim();
    if (!content || sending.current) return;
    sending.current = true; setBusy(true); setError(""); setInput("");
    const previous = messages;
    const next: Message[] = [...previous, { role: "user", content }];
    setMessages(next);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next.slice(-11).map(({ role, content }) => ({ role, content })) }), signal: AbortSignal.timeout(115_000) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not send your question.");
      setMessages([...next, { role: "assistant", content: data.answer }]);
    } catch (err) {
      setMessages(previous); setInput(content);
      setError(err instanceof Error && err.name !== "TimeoutError" ? err.message : "The reply took too long. Please try again.");
    } finally { sending.current = false; setBusy(false); field.current?.focus(); }
  }

  function submit(event: FormEvent) { event.preventDefault(); void send(input); }

  return <>
    {open && createPortal(<div className="portfolio-chat"><section id="portfolio-chat-panel" className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title" onKeyDown={(event) => { if (event.key === "Escape") close(); }}>
      <header className="chat-panel-heading"><div className="chat-avatar" aria-hidden="true"><ChatIcon /></div><div><h2 id="chat-title">Ask about Rajesh</h2><p>Experience, projects &amp; a little curiosity.</p></div><button className="chat-close" aria-label="Close chat" onClick={close}><CloseIcon /></button></header>
      <div className="chat-messages" ref={list} role="log" aria-live="polite" aria-relevant="additions" aria-busy={busy}>
        <div className="chat-bubble chat-bubble-assistant"><span>RAJESH’S ASSISTANT</span><p>Hi! What would you like to know about Rajesh and his work?</p></div>
        {!messages.length && <div className="chat-suggestions">{suggestions.map((question) => <button key={question} onClick={() => void send(question)} disabled={busy}>{question}<span aria-hidden="true">↗</span></button>)}</div>}
        {messages.map((message, index) => <div key={index} className={`chat-bubble chat-bubble-${message.role}`}><span>{message.role === "user" ? "YOU" : "ASSISTANT"}</span>{message.role === "assistant" ? <ChatMarkdown>{message.content}</ChatMarkdown> : <p>{message.content}</p>}</div>)}
        {busy && <p className="chat-thinking" role="status">Finding an answer…</p>}
      </div>
      {error && <p className="chat-error" role="alert">{error}</p>}
      <form className="chat-composer" onSubmit={submit}><label className="sr-only" htmlFor="chat-question">Your question about Rajesh</label><input id="chat-question" ref={field} placeholder="Ask me about Rajesh…" value={input} onChange={(event) => setInput(event.target.value)} maxLength={1500} autoComplete="off" /><button type="submit" disabled={busy || !input.trim()} aria-label="Send question">↑</button></form>
      <p className="chat-footnote">AI answers from Rajesh’s profile. Please verify important details.</p>
    </section></div>, document.body)}
    <button ref={launcher} type="button" className="chat-launcher" aria-label="Ask about me" title="Ask about me" aria-expanded={open} aria-controls="portfolio-chat-panel" onClick={() => { if (open) close(); else { onOpen?.(); setOpen(true); } }}><ChatIcon /><span>Ask about me</span></button>
  </>;
}
