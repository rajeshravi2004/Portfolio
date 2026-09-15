import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/chat/auth";
import { MAX_SOURCE_BYTES, readKnowledge, saveKnowledge } from "@/lib/chat/drive";
import { ChatError, failure, json, rateLimit, readJson, requireSameOrigin } from "@/lib/chat/http";
import { getKnowledgeIndex, indexStats } from "@/lib/chat/rag";
import { validateSource } from "@/lib/chat/drive";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function GET(request: NextRequest) {
  try {
    requireAdmin(request);
    rateLimit(request, "admin-read", 30, 60_000);
    return json(await readKnowledge());
  } catch (error) { return failure(error); }
}

export async function PUT(request: NextRequest) {
  try {
    requireSameOrigin(request); requireAdmin(request);
    rateLimit(request, "admin-save", 10, 60_000);
    const body = await readJson(request, MAX_SOURCE_BYTES * 6 + 1024);
    if (typeof body.text !== "string" || typeof body.version !== "string" || !/^[a-f0-9]{64}$/.test(body.version)) throw new ChatError("Invalid content. Reload the file and try again.", 400);
    // Prepare vectors first. An embedding failure leaves the live document intact.
    validateSource(body.text);
    const index = await getKnowledgeIndex(body.text);
    const saved = await saveKnowledge(body.text, body.version);
    return json({ ...saved, rag: indexStats(index) });
  } catch (error) { return failure(error); }
}
