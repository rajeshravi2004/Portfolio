import "server-only";
import { createHash } from "node:crypto";
import { unstable_cache } from "next/cache";
import { redactSourceLocation } from "./drive";
import { ChatError } from "./http";

export const VECTOR_DIMENSIONS = 768;
const CHUNK_SIZE = 1400;
const OVERLAP = 180;
const TOP_K = 4;
export type KnowledgeChunk = { id: string; text: string };
type VectorChunk = KnowledgeChunk & { vector: number[] };
export type KnowledgeIndex = { chunks: VectorChunk[]; model: string; dimensions: number; version: string; indexedAt: string };
export type RagStats = { chunks: number; dimensions: number; model: string; indexedAt: string; version: string };
export type Match = KnowledgeChunk & { score: number };

export function splitKnowledge(source: string): KnowledgeChunk[] {
  const text = source.replace(/\r\n/g, "\n").trim();
  const chunks: KnowledgeChunk[] = [];
  let start = 0;
  while (start < text.length) {
    let end = Math.min(start + CHUNK_SIZE, text.length);
    if (end < text.length) {
      const paragraph = text.lastIndexOf("\n\n", end);
      const sentence = text.lastIndexOf(". ", end);
      const space = text.lastIndexOf(" ", end);
      const boundary = [paragraph, sentence, space].find((position) => position > start + CHUNK_SIZE / 2);
      if (boundary !== undefined) end = boundary + (boundary === paragraph || boundary === sentence ? 2 : 1);
    }
    const content = text.slice(start, end).trim();
    if (content) chunks.push({ id: `S${chunks.length + 1}`, text: content });
    if (end >= text.length) break;
    const overlapStart = Math.max(start + 1, end - OVERLAP);
    const nextSpace = text.indexOf(" ", overlapStart);
    start = nextSpace >= overlapStart && nextSpace < end ? nextSpace + 1 : overlapStart;
  }
  return chunks;
}

function configuration() {
  const key = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_EMBEDDING_MODEL || "gemini-embedding-001";
  if (!key || model !== "gemini-embedding-001") throw new ChatError("Knowledge search is not configured. Use gemini-embedding-001 with a valid Gemini key.");
  return { key, model };
}

function normalize(value: unknown): number[] {
  if (!Array.isArray(value) || value.length !== VECTOR_DIMENSIONS || value.some((item) => typeof item !== "number" || !Number.isFinite(item))) throw new ChatError("The embedding service returned an invalid vector.");
  const length = Math.sqrt(value.reduce((sum, item) => sum + item * item, 0));
  if (!length) throw new ChatError("The embedding service returned an empty vector.");
  return value.map((item) => item / length);
}

async function embed(texts: string[], taskType: "RETRIEVAL_DOCUMENT" | "RETRIEVAL_QUERY", model: string) {
  const { key } = configuration();
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:batchEmbedContents`, {
    method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": key }, cache: "no-store", signal: AbortSignal.timeout(30_000),
    body: JSON.stringify({ requests: texts.map((text) => ({ model: `models/${model}`, content: { parts: [{ text }] }, taskType, outputDimensionality: VECTOR_DIMENSIONS })) }),
  });
  if (!response.ok) throw new ChatError("Knowledge search is temporarily unavailable. Please try again.");
  const result = await response.json();
  if (!Array.isArray(result.embeddings) || result.embeddings.length !== texts.length) throw new ChatError("Knowledge indexing did not finish. Please try again.");
  return result.embeddings.map((entry: { values: unknown }) => normalize(entry.values));
}

export async function buildKnowledgeIndex(text: string, model = configuration().model): Promise<KnowledgeIndex> {
  const chunks = splitKnowledge(text);
  if (!chunks.length) throw new ChatError("Add profile content before indexing it.", 400);
  const vectors = await embed(chunks.map((chunk) => chunk.text), "RETRIEVAL_DOCUMENT", model);
  return { chunks: chunks.map((chunk, index) => ({ ...chunk, vector: vectors[index] })), model, dimensions: VECTOR_DIMENSIONS, version: createHash("sha256").update(text).digest("hex"), indexedAt: new Date().toISOString() };
}

// Next.js Data Cache persists this server-only index across Vercel requests and
// deployments. Arguments include the exact sanitized content and model, so edits
// select a new cache entry and can never reuse vectors for different content.
const cachedIndex = unstable_cache(buildKnowledgeIndex, ["portfolio-rag-index-v1"], { revalidate: false });

export async function getKnowledgeIndex(source: string) {
  const { model } = configuration();
  const text = redactSourceLocation(source).replace(/\r\n/g, "\n").trim();
  // Unit tests run outside Next's incremental-cache runtime.
  return process.env.NODE_ENV === "test" ? buildKnowledgeIndex(text, model) : cachedIndex(text, model);
}

export function indexStats(index: KnowledgeIndex): RagStats {
  return { chunks: index.chunks.length, dimensions: index.dimensions, model: index.model, indexedAt: index.indexedAt, version: index.version };
}

export function rankChunks(index: KnowledgeIndex, query: number[], limit = TOP_K): Match[] {
  if (query.length !== index.dimensions) throw new ChatError("Search vector dimensions do not match.");
  const normalized = normalize(query);
  return index.chunks.map((chunk) => ({ id: chunk.id, text: chunk.text, score: Math.max(-1, Math.min(1, chunk.vector.reduce((sum, item, position) => sum + item * normalized[position], 0))) }))
    .sort((left, right) => right.score - left.score).slice(0, limit);
}

export async function retrieveKnowledge(source: string, question: string) {
  const index = await getKnowledgeIndex(source);
  const [query] = await embed([redactSourceLocation(question)], "RETRIEVAL_QUERY", index.model);
  const matches = rankChunks(index, query);
  return { stats: indexStats(index), matches, queryVector: query.slice(0, 8), matchedVector: index.chunks.find((chunk) => chunk.id === matches[0]?.id)?.vector.slice(0, 8) || [] };
}
