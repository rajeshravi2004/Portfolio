"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "@/components/Icons";
import { siteConfig } from "@/lib/content";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const subject = String(form.get("subject") ?? "");
    const message = String(form.get("message") ?? "");
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      window.location.href = mailto;
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <label><span>Full Name</span><input name="name" type="text" placeholder="Your name" autoComplete="name" required /></label>
        <label><span>Email Address</span><input name="email" type="email" placeholder="your.email@example.com" autoComplete="email" required /></label>
      </div>
      <label><span>Subject</span><input name="subject" type="text" placeholder="What is this about?" required /></label>
      <label><span>Message</span><textarea name="message" placeholder="Tell me about the project, role, or idea." rows={6} required /></label>
      <button className="button form-submit" type="submit" disabled={status === "loading"}>
        {status === "idle" && "Send message"}
        {status === "loading" && "Sending"}
        {status === "success" && "Message sent"}
        {status === "error" && "Send message"}
        <ArrowUpRight />
      </button>
      <p className={`form-status ${status}`} role="status" aria-live="polite">
        {status === "success" && "Message sent successfully. I will get back to you soon."}
        {status === "error" && "Failed to send message. Please try again or contact directly via email."}
      </p>
    </form>
  );
}
