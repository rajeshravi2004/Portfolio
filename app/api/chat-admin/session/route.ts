import { NextRequest } from "next/server";
import { cookieOptions, createSession, requireAdmin, SESSION_COOKIE, SESSION_SECONDS, validPassword } from "@/lib/chat/auth";
import { ChatError, failure, json, rateLimit, readJson, requireSameOrigin } from "@/lib/chat/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try { requireAdmin(request); return json({ authenticated: true }); }
  catch (error) { return failure(error); }
}

export async function POST(request: NextRequest) {
  try {
    requireSameOrigin(request);
    rateLimit(request, "login", 5, 15 * 60_000);
    const body = await readJson(request, 4096);
    if (typeof body.password !== "string" || !validPassword(body.password)) throw new ChatError("Incorrect password.", 401);
    const response = json({ authenticated: true });
    response.cookies.set(SESSION_COOKIE, createSession(), { ...cookieOptions, maxAge: SESSION_SECONDS });
    return response;
  } catch (error) { return failure(error); }
}

export async function DELETE(request: NextRequest) {
  try {
    requireSameOrigin(request);
    const response = json({ authenticated: false });
    response.cookies.set(SESSION_COOKIE, "", { ...cookieOptions, maxAge: 0 });
    return response;
  } catch (error) { return failure(error); }
}
