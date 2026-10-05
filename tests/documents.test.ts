import assert from "node:assert/strict";
import { after, beforeEach, test } from "node:test";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { attachDocument, openDocument, validateDocument } from "../lib/documents/core";
import { generateDocument, isDocumentRequest, portfolioResume, requestedPages, standardResume } from "../lib/documents/generate";
import { checkDocumentLayout, fitDocumentPages, renderDocument } from "../lib/documents/render";
import { GET, POST } from "../app/api/documents/route";
import { POST as chat } from "../app/api/chat/route";
import { ChatError } from "../lib/chat/http";

const originalFetch = globalThis.fetch;
const origin = "https://portfolio.example";
beforeEach(() => {
  process.env.CHAT_ADMIN_PASSWORD = "document-test-signing-password";
  process.env.GEMINI_API_KEY = "document-test-key";
  process.env.GEMINI_CHAT_MODEL = "test-model";
  delete process.env.GEMINI_DOCUMENT_FALLBACK_MODEL;
  process.env.CHAT_DRIVE_FILE_URL = "https://docs.google.com/document/d/documentTest01234567890/edit";
  delete process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  delete process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  globalThis.fetch = originalFetch;
});
after(() => { globalThis.fetch = originalFetch; });

function threePages() {
  const doc = portfolioResume();
  doc.pages = Array.from({ length: 3 }, (_, index) => ({ sections: [{ heading: `Verified projects ${index + 1}`, entries: [{ title: "CareScribe", detail: "Full-stack healthcare workflows", paragraphs: ["Rajesh builds healthcare software."], bullets: ["React, Node.js and PostgreSQL."] }] }] }));
  return doc;
}
function mockGeneration(doc = threePages()) {
  globalThis.fetch = async (url) => String(url).includes("generativelanguage")
    ? Response.json({ candidates: [{ finishReason: "STOP", content: { parts: [{ text: JSON.stringify(doc) }] } }] })
    : new Response("Rajesh builds healthcare software.\nUnique fact from the end of the current profile.");
}

test("recognizes document requests and revisions, validates explicit page counts", () => {
  for (const question of ["my resume", "résumé in PDF", "coverletter", "cover-letter in Word", "CV", "word document"]) assert.equal(isDocumentRequest(question), true);
  assert.equal(isDocumentRequest("What does Rajesh build?"), false);
  assert.equal(isDocumentRequest("Tell me about Resume Studio"), false);
  assert.equal(isDocumentRequest("How does his Resume Builder work?"), false);
  assert.equal(isDocumentRequest("make it elegant in purple", threePages()), true);
  assert.equal(isDocumentRequest("What does Rajesh build?", threePages()), false);
  assert.equal(requestedPages("three-page resume"), 3);
  assert.equal(requestedPages("make it 2 pages"), 2);
  assert.throws(() => requestedPages("six pages"), ChatError);
  assert.throws(() => requestedPages("0 pages"), ChatError);
});

test("signed downloads reject tampering, expiry, secret rotation, and unsigned raw documents", () => {
  const now = Date.now();
  const attachment = attachDocument(threePages(), now);
  assert.equal(openDocument(attachment.token, now).pages.length, 3);
  assert.throws(() => openDocument(attachment.token + "x", now), ChatError);
  const [payload, mac] = attachment.token.split(".");
  const changed = JSON.parse(Buffer.from(payload, "base64url").toString());
  changed.document.title = "Someone else";
  assert.throws(() => openDocument(`${Buffer.from(JSON.stringify(changed)).toString("base64url")}.${mac}`, now), ChatError);
  assert.throws(() => openDocument(attachment.token, now + 86_400_000), (error: unknown) => error instanceof ChatError && error.status === 410);
  process.env.CHAT_ADMIN_PASSWORD = "rotated-document-signing-password";
  assert.throws(() => openDocument(attachment.token, now), ChatError);
  assert.throws(() => openDocument(JSON.stringify(threePages()), now), ChatError);
});

test("documents reject invalid styling, empty pages, oversized text and redact source locations", () => {
  const doc = threePages();
  assert.throws(() => validateDocument({ ...doc, accent: "url(evil)" }), ChatError);
  assert.throws(() => validateDocument({ ...doc, pages: [{ sections: [] }] }), ChatError);
  doc.pages[0].sections[0].entries[0].paragraphs = ["x".repeat(1601)];
  assert.throws(() => validateDocument(doc), ChatError);
  doc.pages[0].sections[0].entries[0].paragraphs = [process.env.CHAT_DRIVE_FILE_URL!];
  assert.equal(JSON.stringify(validateDocument(doc)).includes("documentTest01234567890"), false);
});

test("all styles export a valid exact three-page PDF and an editable Word file with page breaks", async () => {
  for (const style of ["modern", "minimal", "classic", "elegant"] as const) {
    const doc = { ...threePages(), style };
    const pdf = await PDFDocument.load(await renderDocument(doc, "pdf"));
    assert.equal(pdf.getPageCount(), 3);
    assert.equal(pdf.getTitle(), "Rajesh R — Resume");
    const zip = await JSZip.loadAsync(await renderDocument(doc, "docx"));
    const xml = await zip.file("word/document.xml")!.async("string");
    assert.match(xml, /CareScribe/);
    assert.equal((xml.match(/<w:pageBreakBefore\s*\/>/g) || []).length, 2);
    assert.ok(zip.file("[Content_Types].xml"));
  }
});

test("standard portfolio resume exports without upstream calls; overflow fails instead of clipping or adding pages", async () => {
  globalThis.fetch = async () => { throw new Error("Normal downloads must not contact a provider"); };
  const standard = await standardResume();
  assert.equal((await PDFDocument.load(await renderDocument(standard, "pdf"))).getPageCount(), 2);
  const overflowing = threePages();
  overflowing.pages[0].sections[0].entries = Array.from({ length: 12 }, () => ({ title: "Long entry", detail: "", paragraphs: ["Verified content ".repeat(95)], bullets: [] }));
  await assert.rejects(() => checkDocumentLayout(overflowing), (error: unknown) => error instanceof ChatError && /too much content/.test(error.message));
});

test("generation uses the whole fresh profile and signed previous draft without embedding calls", async () => {
  let source = "Current role: Developer.\n" + "Profile details. ".repeat(400) + "\nUnique recent project at the end.";
  let generationCalls = 0;
  globalThis.fetch = async (url, init) => {
    if (!String(url).includes("generativelanguage")) return new Response(source);
    assert.ok(!String(url).includes("Embed"));
    const request = JSON.parse(String(init?.body));
    const prompt = request.systemInstruction.parts[0].text;
    assert.ok(prompt.includes(source));
    assert.ok(prompt.includes("PREVIOUS DOCUMENT"));
    assert.equal(prompt.includes(process.env.CHAT_DRIVE_FILE_URL!), false);
    assert.equal(prompt.includes("document-test-key"), false);
    assert.equal(request.generationConfig.responseMimeType, "application/json");
    generationCalls++;
    return Response.json({ candidates: [{ finishReason: "STOP", content: { parts: [{ text: JSON.stringify(threePages()) }] } }] });
  };
  const messages = [{ role: "user" as const, content: "make my resume three pages" }];
  await generateDocument(messages, threePages());
  source = "Updated role and completely new project.";
  await generateDocument(messages, threePages());
  assert.equal(generationCalls, 2);
});

test("uneven page assignments redistribute every entry without changing text or page count", async () => {
  const doc = threePages();
  doc.pages = [{ sections: [{ heading: "Projects", entries: Array.from({ length: 12 }, (_, index) => ({ title: `Unique entry ${index}`, detail: "Verified project", paragraphs: ["Verified project details about healthcare software. ".repeat(5)], bullets: [] })) }] }, ...doc.pages.slice(1)];
  await assert.rejects(() => checkDocumentLayout(doc), ChatError);
  const before = doc.pages.flatMap((page) => page.sections.flatMap((section) => section.entries));
  const fitted = await fitDocumentPages(doc);
  assert.equal(fitted.pages.length, 3);
  assert.deepEqual(fitted.pages.flatMap((page) => page.sections.flatMap((section) => section.entries)), before);
  assert.equal((await PDFDocument.load(await renderDocument(fitted, "pdf"))).getPageCount(), 3);
});

test("generation rejects truncated JSON, wrong page count and malformed output", async () => {
  mockGeneration(portfolioResume());
  await assert.rejects(() => generateDocument([{ role: "user", content: "three-page resume" }]), ChatError);
  for (const candidate of [{ finishReason: "MAX_TOKENS", content: { parts: [{ text: JSON.stringify(threePages()) }] } }, { finishReason: "STOP", content: { parts: [{ text: "broken" }] } }]) {
    globalThis.fetch = async (url) => String(url).includes("generativelanguage") ? Response.json({ candidates: [candidate] }) : new Response("Saved facts");
    await assert.rejects(() => generateDocument([{ role: "user", content: "resume" }]), ChatError);
  }
});

test("temporary model demand triggers one fallback and nontransient failures are never retried", async () => {
  let calls = 0;
  globalThis.fetch = async (url, init) => {
    if (!String(url).includes("generativelanguage")) return new Response("Current saved facts");
    calls++;
    if (calls === 1) return Response.json({ error: { status: "UNAVAILABLE" } }, { status: 503 });
    assert.match(String(url), /gemini-3\.1-flash-lite:generateContent/);
    assert.equal(JSON.parse(String(init?.body)).generationConfig.thinkingConfig, undefined);
    return Response.json({ candidates: [{ finishReason: "STOP", content: { parts: [{ text: JSON.stringify(threePages()) }] } }] });
  };
  assert.equal((await generateDocument([{ role: "user", content: "three page resume" }])).pages.length, 3);
  assert.equal(calls, 2);
  calls = 0;
  globalThis.fetch = async (url) => { if (!String(url).includes("generativelanguage")) return new Response("Saved facts"); calls++; return new Response(null, { status: 403 }); };
  await assert.rejects(() => generateDocument([{ role: "user", content: "resume" }]), ChatError);
  assert.equal(calls, 1);
});

test("chat returns a signed document and download API preserves file bytes, format, and access checks", async () => {
  mockGeneration();
  const request = (body: unknown, requestOrigin = origin) => new Request(`${origin}/api/documents`, { method: "POST", headers: { origin: requestOrigin, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const response = await chat(new Request(`${origin}/api/chat`, { method: "POST", headers: { origin, "Content-Type": "application/json" }, body: JSON.stringify({ messages: [{ role: "user", content: "three page resume" }] }) }));
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.document.pageCount, 3);
  assert.match(data.answer, /Page 3/);
  const pdf = await POST(request({ token: data.document.token, format: "pdf" }));
  assert.equal(pdf.headers.get("Content-Type"), "application/pdf");
  assert.match(pdf.headers.get("Content-Disposition")!, /Rajesh-R-resume.pdf/);
  assert.equal((await PDFDocument.load(await pdf.arrayBuffer())).getPageCount(), 3);
  const word = await POST(request({ token: data.document.token, format: "docx" }));
  assert.match(word.headers.get("Content-Type")!, /wordprocessingml/);
  assert.ok((await JSZip.loadAsync(await word.arrayBuffer())).file("word/document.xml"));
  assert.equal((await POST(request({ token: data.document.token, format: "pdf" }, "https://evil.example"))).status, 403);
  assert.equal((await POST(request({ token: "fake.token", format: "pdf" }))).status, 400);
  assert.equal((await POST(request({ token: data.document.token, format: "html" }))).status, 400);
  assert.equal((await GET(new Request(`${origin}/api/documents?format=exe`))).status, 400);
});
