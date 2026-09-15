import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/chat/auth";
import { readKnowledge } from "@/lib/chat/drive";
import { ChatError, failure, json, rateLimit, readJson, requireSameOrigin } from "@/lib/chat/http";
import { getKnowledgeIndex, indexStats, retrieveKnowledge } from "@/lib/chat/rag";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function POST(request: NextRequest) {
  try {
    requireSameOrigin(request); requireAdmin(request);
    rateLimit(request, "admin-retrieval", 15, 60_000);
    const body = await readJson(request, 8000);
    if (body.question !== undefined && (typeof body.question !== "string" || !body.question.trim() || body.question.length > 1500)) throw new ChatError("Enter a question of up to 1,500 characters.", 400);
    const source = await readKnowledge();
    if (body.version !== undefined && body.version !== source.version) throw new ChatError("The document changed. Reload it before testing retrieval.", 409);
    if (typeof body.question === "string") return json(await retrieveKnowledge(source.text, body.question));
    return json({ stats: indexStats(await getKnowledgeIndex(source.text)), matches: [] });
  } catch (error) { return failure(error); }
}
