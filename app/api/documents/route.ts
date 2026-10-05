import { openDocument } from "@/lib/documents/core";
import { standardResume } from "@/lib/documents/generate";
import { fileResponse, renderDocument } from "@/lib/documents/render";
import { ChatError, failure, rateLimit, readJson, requireSameOrigin } from "@/lib/chat/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

function format(value: unknown) {
  if (value !== "pdf" && value !== "docx") throw new ChatError("Choose PDF or Word (.docx) for your download.", 400);
  return value;
}

export async function GET(request: Request) {
  try {
    rateLimit(request, "standard-resume", 8, 60_000);
    const extension = format(new URL(request.url).searchParams.get("format") || "pdf");
    const doc = await standardResume();
    return fileResponse(await renderDocument(doc, extension), doc, extension);
  } catch (error) { return failure(error); }
}

export async function POST(request: Request) {
  try {
    requireSameOrigin(request);
    rateLimit(request, "document-download", 20, 60_000);
    const body = await readJson(request, 150_000);
    const extension = format(body.format);
    const doc = openDocument(body.token);
    return fileResponse(await renderDocument(doc, extension), doc, extension);
  } catch (error) { return failure(error); }
}
