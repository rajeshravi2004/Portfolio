import "server-only";
import { NextResponse } from "next/server";

export class ChatError extends Error {
  constructor(message: string, public status = 503) { super(message); }
}

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: {
    "Cache-Control": "private, no-store, max-age=0",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
  } });
}

export function failure(error: unknown) {
  // Never return/log upstream responses: they may contain file URLs or credentials.
  return json({ error: error instanceof ChatError ? error.message : "This service is temporarily unavailable. Please try again." }, error instanceof ChatError ? error.status : 503);
}

export function requireSameOrigin(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    throw new ChatError("Request not allowed.", 403);
  }
}

export async function readLimitedText(response: Response | Request, limit: number) {
  if (Number(response.headers.get("content-length")) > limit) throw new ChatError("Content is too large.", 413);
  const reader = response.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        throw new ChatError("Content is too large.", 413);
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return new TextDecoder("utf-8", { fatal: true }).decode(Buffer.concat(chunks));
}

export async function readJson(request: Request, limit = 16_000): Promise<Record<string, unknown>> {
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new ChatError("Expected JSON.", 415);
  try {
    const value = JSON.parse(await readLimitedText(request, limit));
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error();
    return value;
  } catch (error) {
    if (error instanceof ChatError) throw error;
    throw new ChatError("Invalid request.", 400);
  }
}

// A bounded, per-process backstop. Configure Vercel Firewall rate limits for
// distributed enforcement across serverless instances (see README).
const attempts = new Map<string, { count: number; expires: number }>();
export function rateLimit(request: Request, scope: string, limit: number, windowMs: number) {
  const ip = process.env.VERCEL === "1"
    ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    : "local";
  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.expires <= now) attempts.delete(key);
  const key = `${scope}:${ip}`;
  let entry = attempts.get(key);
  if (!entry) {
    if (attempts.size >= 10_000) throw new ChatError("Too many requests. Please try again later.", 429);
    entry = { count: 0, expires: now + windowMs };
    attempts.set(key, entry);
  }
  if (++entry.count > limit) throw new ChatError("Too many requests. Please try again later.", 429);
}
