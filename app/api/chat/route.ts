import { answerQuestion, validateMessages } from "@/lib/chat/answer";
import { failure, json, rateLimit, readJson, requireSameOrigin } from "@/lib/chat/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    rateLimit(request, "chat", 12, 60_000);
    const body = await readJson(request, 100_000);
    const messages = validateMessages(body.messages);
    return json(await answerQuestion(messages));
  } catch (error) { return failure(error); }
}
