import "server-only";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { ChatError } from "./http";

export const SESSION_COOKIE = "rajesh-chat-admin";
export const SESSION_SECONDS = 8 * 60 * 60;
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/api/chat-admin",
};

function password() {
  const value = process.env.CHAT_ADMIN_PASSWORD;
  if (!value || value.length < 16) throw new ChatError("Admin access is not configured. Set a password of at least 16 characters on the server.");
  return value;
}

function digest(value: string) { return createHash("sha256").update(value).digest(); }
function sign(value: string) { return createHmac("sha256", password()).update(`portfolio-chat-session:${value}`).digest("base64url"); }

export function validPassword(input: string) { return timingSafeEqual(digest(input), digest(password())); }

export function createSession(now = Date.now()) {
  const payload = `${Math.floor(now / 1000) + SESSION_SECONDS}.${randomBytes(24).toString("base64url")}`;
  return `${payload}.${sign(payload)}`;
}

export function validSession(token: string | undefined, now = Date.now()) {
  if (!token || token.length > 200) return false;
  const parts = token.split(".");
  if (parts.length !== 3 || !/^\d+$/.test(parts[0]) || !/^[\w-]{32}$/.test(parts[1])) return false;
  const expiry = Number(parts[0]);
  const current = Math.floor(now / 1000);
  if (expiry <= current || expiry > current + SESSION_SECONDS) return false;
  try { return timingSafeEqual(digest(parts[2]), digest(sign(`${parts[0]}.${parts[1]}`))); }
  catch { return false; }
}

export function requireAdmin(request: NextRequest) {
  if (!validSession(request.cookies.get(SESSION_COOKIE)?.value)) throw new ChatError("Please sign in to continue.", 401);
}
