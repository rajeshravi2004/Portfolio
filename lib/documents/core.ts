import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { ChatError } from "../chat/http";
import { redactSourceLocation } from "../chat/drive";
import type { CareerDocument, DocumentAttachment } from "./types";

export const MAX_DOCUMENT_CHARS = 24_000;
const LIFETIME = 24 * 60 * 60 * 1000;

export function validateDocument(value: unknown): CareerDocument {
  const invalid = () => { throw new ChatError("The document could not be prepared. Please try a shorter request.", 422); };
  if (!value || typeof value !== "object") return invalid();
  const doc = value as CareerDocument;
  if (!["resume", "cover-letter"].includes(doc.kind) || !["modern", "minimal", "classic", "elegant"].includes(doc.style) || !/^#[0-9a-f]{6}$/i.test(doc.accent)) return invalid();
  let size = 0;
  const text = (s: unknown, limit: number) => {
    if (typeof s !== "string" || s.length > limit || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(s)) return invalid();
    size += s.length;
    if (size > MAX_DOCUMENT_CHARS) return invalid();
    return redactSourceLocation(s).trim();
  };
  const texts = (arr: unknown, max: number) => {
    if (!Array.isArray(arr) || arr.length > max) return invalid();
    return arr.map((s) => text(s, 1600));
  };
  const title = text(doc.title, 160);
  if (!title || !Array.isArray(doc.pages) || doc.pages.length < 1 || doc.pages.length > 5) return invalid();
  return {
    kind: doc.kind, style: doc.style, accent: doc.accent, title,
    subtitle: text(doc.subtitle, 240), contact: texts(doc.contact, 8),
    pages: doc.pages.map((page) => {
      if (!page || !Array.isArray(page.sections) || !page.sections.length || page.sections.length > 12) return invalid();
      return { sections: page.sections.map((section) => {
        if (!section || !Array.isArray(section.entries) || !section.entries.length || section.entries.length > 15) return invalid();
        return { heading: text(section.heading, 100), entries: section.entries.map((entry) => {
          if (!entry) return invalid();
          const result = { title: text(entry.title, 220), detail: text(entry.detail, 300), paragraphs: texts(entry.paragraphs, 8), bullets: texts(entry.bullets, 12) };
          if (!result.title && !result.detail && !result.paragraphs.some(Boolean) && !result.bullets.some(Boolean)) return invalid();
          return result;
        }) };
      }) };
    }),
  };
}

function signingKey() {
  const key = process.env.CHAT_ADMIN_PASSWORD || process.env.GEMINI_API_KEY;
  if (!key) throw new ChatError("Document downloads are being set up. Please try again later.");
  return key;
}
function signature(payload: string) { return createHmac("sha256", signingKey()).update(`career-document-v1:${payload}`).digest("base64url"); }

export function attachDocument(document: CareerDocument, now = Date.now()): DocumentAttachment {
  const doc = validateDocument(document);
  const expires = now + LIFETIME;
  const payload = Buffer.from(JSON.stringify({ document: doc, expires })).toString("base64url");
  return { title: doc.title, kind: doc.kind, style: doc.style, pageCount: doc.pages.length, token: `${payload}.${signature(payload)}`, expiresAt: new Date(expires).toISOString() };
}

export function openDocument(token: unknown, now = Date.now()): CareerDocument {
  if (typeof token !== "string" || token.length > 140_000 || !/^[\w-]+\.[\w-]+$/.test(token)) throw new ChatError("Invalid document download.", 400);
  const [payload, mac] = token.split(".");
  const expected = Buffer.from(signature(payload));
  const actual = Buffer.from(mac);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) throw new ChatError("Invalid document download.", 400);
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof data.expires !== "number" || data.expires <= now || data.expires > now + LIFETIME) throw new ChatError("This download has expired. Ask the assistant to create it again.", 410);
    return validateDocument(data.document);
  } catch (error) {
    if (error instanceof ChatError) throw error;
    throw new ChatError("Invalid document download.", 400);
  }
}

export function documentMarkdown(doc: CareerDocument) {
  return [`### ${doc.title}`, doc.subtitle, doc.contact.join(" · "), ...doc.pages.flatMap((page, index) => [
    ...(doc.pages.length > 1 ? [`### Page ${index + 1}`] : []),
    ...page.sections.flatMap((section) => [section.heading ? `### ${section.heading}` : "", ...section.entries.flatMap((entry) => [entry.title ? `**${entry.title}**` : "", entry.detail, ...entry.paragraphs, entry.bullets.map((bullet) => `- ${bullet}`).join("\n")])]),
  ])].filter(Boolean).join("\n\n");
}
