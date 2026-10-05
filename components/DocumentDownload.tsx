"use client";

import { useState } from "react";
import type { DocumentAttachment } from "@/lib/documents/types";

async function download(format: "pdf" | "docx", attachment?: DocumentAttachment) {
  const response = await fetch(attachment ? "/api/documents" : `/api/documents?format=${format}`, attachment ? {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: attachment.token, format }), signal: AbortSignal.timeout(115_000),
  } : { signal: AbortSignal.timeout(115_000) });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Could not download this document. Please try again.");
  }
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = response.headers.get("Content-Disposition")?.match(/filename="([^"]+)"/)?.[1] || `Rajesh-R-resume.${format}`;
  document.body.appendChild(anchor); anchor.click(); anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

export function DocumentDownload({ attachment }: { attachment?: DocumentAttachment }) {
  const [busy, setBusy] = useState<"pdf" | "docx" | null>(null);
  const [error, setError] = useState("");
  async function save(format: "pdf" | "docx") {
    if (busy) return;
    setBusy(format); setError("");
    try { await download(format, attachment); }
    catch (err) { setError(err instanceof Error && err.name !== "TimeoutError" ? err.message : "The download took too long. Please try again."); }
    finally { setBusy(null); }
  }
  return <div className={attachment ? "chat-document" : "resume-download"}>
    {attachment && <p className="chat-document-meta">{attachment.kind === "resume" ? "Resume" : "Cover letter"} · {attachment.pageCount} {attachment.pageCount === 1 ? "page" : "pages"} · {attachment.style}</p>}
    <div className="document-download-actions">
      <button type="button" className="chat-secondary" disabled={Boolean(busy)} onClick={() => void save("pdf")}>{busy === "pdf" ? "Preparing PDF…" : attachment ? "↓ Download PDF" : "↓ Download resume"}</button>
      <button type="button" className="chat-secondary" disabled={Boolean(busy)} onClick={() => void save("docx")}>{busy === "docx" ? "Preparing Word…" : "↓ Word (.docx)"}</button>
    </div>
    {busy && <p className="document-status" role="status">{attachment ? "Preparing your file…" : "Preparing your resume…"}</p>}
    {error && <p className="chat-error" role="alert">{error}</p>}
  </div>;
}
