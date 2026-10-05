import { answerQuestion, validateMessages } from "@/lib/chat/answer";
import { failure, json, rateLimit, readJson, requireSameOrigin } from "@/lib/chat/http";
import { attachDocument, documentMarkdown, openDocument } from "@/lib/documents/core";
import { generateDocument, isDocumentRequest } from "@/lib/documents/generate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    rateLimit(request, "chat", 12, 60_000);
    const body = await readJson(request, 200_000);
    const messages = validateMessages(body.messages);
    const previous = body.previousDocument ? openDocument(body.previousDocument) : undefined;
    if (isDocumentRequest(messages.at(-1)!.content, previous)) {
      const doc = await generateDocument(messages, previous);
      return json({ answer: documentMarkdown(doc), document: attachDocument(doc) });
    }
    return json(await answerQuestion(messages));
  } catch (error) { return failure(error); }
}
