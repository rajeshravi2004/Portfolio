import "server-only";
import { createHash } from "node:crypto";
import { GoogleAuth } from "google-auth-library";
import { ChatError, readLimitedText } from "./http";

export const MAX_SOURCE_BYTES = 80_000;
const DRIVE_API = "https://www.googleapis.com/drive/v3/files/";

export function driveFile() {
  const raw = process.env.CHAT_DRIVE_FILE_URL;
  if (!raw) throw new ChatError("Chat knowledge is not configured yet.");
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" || !["drive.google.com", "docs.google.com"].includes(url.hostname) || url.username || url.password || url.port) throw new Error();
    const kind = url.hostname === "docs.google.com" ? "document" : "text";
    const id = kind === "document" ? url.pathname.match(/^\/document\/d\/([\w-]+)(?:\/|$)/)?.[1] : url.pathname.match(/^\/file\/d\/([\w-]+)(?:\/|$)/)?.[1] || ((url.pathname === "/open" || url.pathname === "/uc") ? url.searchParams.get("id") : null);
    if (!id || !/^[\w-]{10,200}$/.test(id)) throw new Error();
    const resourceKey = url.searchParams.get("resourcekey");
    if (resourceKey && !/^[\w-]{1,200}$/.test(resourceKey)) throw new Error();
    return { id, resourceKey, kind };
  } catch { throw new ChatError("The server needs a valid Google Doc or Drive text-file URL."); }
}

export function canEditDrive() { return Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY); }

let googleAuth: GoogleAuth | undefined;
async function driveHeaders() {
  if (!canEditDrive()) throw new ChatError("Saving requires Google credentials with edit access to the source file.");
  googleAuth ??= new GoogleAuth({
    credentials: { client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n") },
    scopes: ["https://www.googleapis.com/auth/drive"],
    clientOptions: { transporterOptions: { timeout: 15_000, retry: false } },
  });
  const token = await googleAuth.getAccessToken();
  if (!token) throw new ChatError("Could not connect to the knowledge source.");
  const { id, resourceKey } = driveFile();
  const headers: Record<string, string> = { Authorization: `Bearer ${token}` };
  if (resourceKey) headers["X-Goog-Drive-Resource-Keys"] = `${id}/${resourceKey}`;
  return headers;
}

export function validateSource(text: string, allowEmpty = false) {
  if (!allowEmpty && !text.trim()) throw new ChatError("The knowledge file must contain some text.", 400);
  if (Buffer.byteLength(text, "utf8") > MAX_SOURCE_BYTES) throw new ChatError("Keep the knowledge file under 80 KB.", 413);
  if (text.includes("\u0000") || /^\s*(?:<!doctype\s+html|<html\b)/i.test(text)) throw new ChatError("The knowledge source must be a UTF-8 plain text file.", 400);
  return text;
}

export function sourceVersion(text: string) { return createHash("sha256").update(text).digest("hex"); }

async function publicDownload() {
  const { id, resourceKey, kind } = driveFile();
  const url = new URL(kind === "document" ? `https://docs.google.com/document/d/${id}/export?format=txt` : "https://drive.google.com/uc");
  if (kind === "text") { url.searchParams.set("export", "download"); url.searchParams.set("id", id); }
  if (resourceKey) url.searchParams.set("resourcekey", resourceKey);
  // Follow only Google's download hosts. Never fetch an arbitrary URL supplied
  // by a visitor, and never forward credentials to public download redirects.
  let next = url;
  const signal = AbortSignal.timeout(15_000);
  for (let redirects = 0; redirects < 5; redirects++) {
    const response = await fetch(next, { cache: "no-store", redirect: "manual", signal });
    if (![301, 302, 303, 307, 308].includes(response.status)) return response;
    await response.body?.cancel();
    const location = response.headers.get("location");
    if (!location) break;
    next = new URL(location, next);
    if (next.protocol !== "https:" || next.username || next.password || next.port || !(["drive.google.com", "docs.google.com", "drive.usercontent.google.com"].includes(next.hostname) || /^[a-z0-9-]+\.googleusercontent\.com$/.test(next.hostname))) break;
  }
  throw new ChatError("Could not read the public text file. Check its sharing settings on the server.");
}

export async function readKnowledge() {
  const { id, kind } = driveFile();
  const editable = canEditDrive();
  let response: Response;
  if (editable) {
    const headers = await driveHeaders();
    if (kind === "document") {
      const document = await readGoogleDocument(headers);
      const text = validateSource(document.text, true);
      return { text, version: sourceVersion(text), editable, loadedAt: new Date().toISOString() };
    }
    const metadata = await fetch(`${DRIVE_API}${id}?fields=mimeType&supportsAllDrives=true`, { headers, cache: "no-store", signal: AbortSignal.timeout(15_000) });
    if (!metadata.ok || (await metadata.json()).mimeType !== "text/plain") throw new ChatError("Check that the source is a .txt file shared with the server account.");
    response = await fetch(`${DRIVE_API}${id}?alt=media&supportsAllDrives=true`, { headers, cache: "no-store", signal: AbortSignal.timeout(15_000) });
  } else { response = await publicDownload(); }
  if (!response.ok || /text\/html/i.test(response.headers.get("content-type") || "")) throw new ChatError("Could not read the text file. Check its access and sharing settings.");
  const text = validateSource(await readLimitedText(response, MAX_SOURCE_BYTES), true);
  return { text, version: sourceVersion(text), editable, loadedAt: new Date().toISOString() };
}

export async function saveKnowledge(text: string, expectedVersion: string) {
  validateSource(text);
  const headers = await driveHeaders();
  if (driveFile().kind === "document") return saveGoogleDocument(text, expectedVersion, headers);
  const current = await readKnowledge();
  if (current.version !== expectedVersion) throw new ChatError("The file changed since you loaded it. Copy your edits, reload, then merge and save.", 409);
  const { id } = driveFile();
  const response = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${id}?uploadType=media&supportsAllDrives=true`, {
    method: "PATCH", headers: { ...headers, "Content-Type": "text/plain; charset=utf-8" }, body: text, cache: "no-store", signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new ChatError("Could not save the file. Check the server account's edit permission and try again.");
  return { text, version: sourceVersion(text), editable: true, loadedAt: new Date().toISOString() };
}

type DocElement = { endIndex?: number; sectionBreak?: unknown; paragraph?: { elements?: { textRun?: { content?: string } }[] } };
type DocTab = { tabProperties?: { tabId?: string }; childTabs?: DocTab[]; documentTab?: { body?: { content?: DocElement[] } } };

async function readGoogleDocument(headers: Record<string, string>) {
  const { id } = driveFile();
  const response = await fetch(`https://docs.googleapis.com/v1/documents/${id}?includeTabsContent=true`, { headers, cache: "no-store", signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new ChatError("Could not read the document. Enable Google Docs API and share the document with the server account.");
  const document: { revisionId?: string; tabs?: DocTab[] } = JSON.parse(await readLimitedText(response, 2_000_000));
  const tabs = document.tabs;
  if (!tabs || tabs.length !== 1 || tabs[0].childTabs?.length) throw new ChatError("Use a single document tab for chatbot knowledge.", 400);
  const tab = tabs[0];
  const content = tab.documentTab?.body?.content;
  if (!content || !tab.tabProperties?.tabId || !document.revisionId) throw new ChatError("Could not read the document content.");
  let text = "";
  for (const element of content) {
    if (element.sectionBreak) continue;
    if (!element.paragraph || element.paragraph.elements?.some((part) => !part.textRun)) throw new ChatError("Use text paragraphs only in the knowledge document; tables and embedded objects cannot be edited here.", 400);
    for (const part of element.paragraph.elements || []) text += part.textRun?.content || "";
  }
  // Google Docs always has a final newline that cannot be deleted.
  if (text.endsWith("\n")) text = text.slice(0, -1);
  return { text, revisionId: document.revisionId, tabId: tab.tabProperties.tabId, endIndex: content[content.length - 1]?.endIndex || 2 };
}

async function saveGoogleDocument(text: string, expectedVersion: string, headers: Record<string, string>) {
  const current = await readGoogleDocument(headers);
  if (sourceVersion(current.text) !== expectedVersion) throw new ChatError("The document changed since you loaded it. Copy your edits, reload, then merge and save.", 409);
  const { id } = driveFile();
  const requests: unknown[] = [];
  if (current.endIndex > 2) requests.push({ deleteContentRange: { range: { startIndex: 1, endIndex: current.endIndex - 1, tabId: current.tabId } } });
  requests.push({ insertText: { location: { index: 1, tabId: current.tabId }, text } });
  const response = await fetch(`https://docs.googleapis.com/v1/documents/${id}:batchUpdate`, {
    method: "POST", headers: { ...headers, "Content-Type": "application/json" }, cache: "no-store", signal: AbortSignal.timeout(15_000),
    body: JSON.stringify({ writeControl: { requiredRevisionId: current.revisionId }, requests }),
  });
  if (response.status === 400 || response.status === 409) throw new ChatError("The document could not be updated. Copy your edits, reload, then try again.", 409);
  if (!response.ok) throw new ChatError("Could not save the document. Check the server account's edit permission.");
  return { text, version: sourceVersion(text), editable: true, loadedAt: new Date().toISOString() };
}

// The source URL is never part of the model request, page props, or API output.
// Redact it if it was accidentally pasted into the knowledge file or model reply.
export function redactSourceLocation(text: string) {
  const { id, resourceKey } = driveFile();
  let output = text;
  for (const secret of [process.env.CHAT_DRIVE_FILE_URL, id, resourceKey]) {
    if (secret) output = output.split(secret).join("[source hidden]");
  }
  return output.replace(/https?:\/\/(?:drive\.google\.com|drive\.usercontent\.google\.com|docs\.google\.com)\/[^\s<>"']*/gi, "[source hidden]");
}
