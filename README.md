# IMPACT FRAME — Rajesh R Portfolio

A cinematic portfolio for Rajesh R with mint glow, interactive canvas particles, orbiting technology icons, and different animations for About, Experience, Projects, Stack, Education, Quotes, and Contact. It includes dark/light themes, reduced-motion support, and a persistent animation pause control.

The site also includes a keyboard- and swipe-accessible “Words that hit” gallery, a nine-category technology explorer, and locally served technology and company logos. See [design notes](./DESIGN_NOTES.md) for reference analysis and motion details, and [asset sources](./public/ASSET_SOURCES.md) for logo attribution.

## Stack

- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS 4 with custom design tokens
- CSS animations and native browser APIs only
- `next/font` for Sora, JetBrains Mono, and Manrope

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev    # development server
npm run lint   # ESLint
npm run build  # optimized production build
npm run start  # run the production build
```

## Content updates

The featured projects appear in this order: Resume Studio, Rajify, Rajesh OS, Job Apply Pilot, StockScope, Browser Lab, and ZoroShop. The hero project count follows this list automatically. Project entries support optional live demos and source links.

Most structured portfolio content lives in [`lib/content.ts`](./lib/content.ts), and gallery content lives in [`lib/quotes.ts`](./lib/quotes.ts). The availability and experience strings are centralized in `siteConfig` so they can be updated without searching through components. The complete content inventory remains in [`PORTFOLIO_CONTENT.md`](./PORTFOLIO_CONTENT.md).

The contact form uses a prefilled `mailto:` link. The portfolio assistant and knowledge editor use Next.js server routes. Vercel deployment is configured in [`vercel.json`](./vercel.json).

## Portfolio chatbot and private editor

Visitors can open **Ask about me** to ask questions based on the latest profile in a Google Doc or Drive text file. The unlisted `/rajesh-chat-update` page provides password login, content preview, copying, editing, and saving. It is excluded from indexing and is not linked from the public navigation. The route name is not an access control: every content API request checks the signed admin session.

### Server settings

Copy `.env.example` to `.env.local` and set these variables locally and in your hosting project's environment settings. Do not prefix any of them with `NEXT_PUBLIC_`.

| Variable | Purpose |
| --- | --- |
| `CHAT_ADMIN_PASSWORD` | Unique password of at least 16 characters. Changing it invalidates all existing sessions. |
| `CHAT_DRIVE_FILE_URL` | Google Doc `/document/d/.../edit` or Drive `.txt` `/file/d/.../view` URL. |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Server account with Editor access to the source. Required for saving. |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Its private key; escaped `\n` newlines are supported. Required for saving. |
| `GEMINI_API_KEY` | Gemini API key, used only on the server. |
| `GEMINI_CHAT_MODEL` | Text-generation model enabled for your account, such as `gemini-3.6-flash`. |
| `GEMINI_EMBEDDING_MODEL` | `gemini-embedding-001`, using 768-dimensional normalized retrieval vectors. |

Enable **Google Drive API** and **Google Docs API** in the Google Cloud project used by the service account. Share only the knowledge document with that account as **Editor**. For public reading, use **Anyone with the link → Viewer**; the service account retains its separate Editor role. Anyone with the link should not need Editor access. A private document also works once the service account has access. The app does not use a connected desktop Google Drive plugin as its runtime credentials.

A public document can be previewed without Google credentials. Saving requires credentials even if the document happens to allow anonymous editing. Use a dedicated, single-tab Google Doc containing only text paragraphs. The editor replaces its body as plain text; it is not a rich-text document editor. Tables, embedded objects, and multiple tabs are rejected for authenticated editing.

### Updating knowledge

1. Visit `/rajesh-chat-update` directly and enter `CHAT_ADMIN_PASSWORD`.
2. Select **Load from Drive**, edit the profile, and choose **Save to Drive**.
3. Each changed save validates the source, splits it into overlapping chunks, and generates vectors before publishing the document change. If indexing fails, the source stays unchanged. No redeployment is required. Existing replies stay as they were.

### Resume and cover-letter downloads

The homepage provides **Download resume** (PDF) and **Word (.docx)**. With the chat source and Gemini configured, this uses the latest saved profile to prepare a standard two-page resume. Generation is cached by the complete redacted source text and model settings for an hour; every download first reads the source, so changed memories select a new document immediately. Without source/model configuration, the download uses structured portfolio content from `lib/content.ts`. A failed live source read or generation returns an error rather than silently substituting stale facts.

Chat can generate tailored resumes and cover letters from the complete current profile, rather than the four excerpts used for ordinary questions. For example: “Create a three-page resume for a full-stack role, modern navy style, as PDF” or “Write a one-page cover letter in Word.” Follow-ups such as “make it elegant in purple” revise the signed previous draft using current facts. Job descriptions and company names guide targeting but are not evidence of qualifications.

Each response includes a text preview and downloads for both genuine PDF and editable DOCX. Supported styles are modern, minimal, classic and elegant, with requested accent colors and one to five A4 pages. PDF page counts are exact. Uneven page assignments are redistributed by moving whole entries in their original order, preserving every name, date and paragraph. Layouts shrink only to 9pt and reject remaining overflow instead of clipping content or silently adding pages. Word uses the same wrapped text and explicit page breaks, though pagination can vary between Word processors. The bundled export fonts support Latin text; unsupported characters produce a visible error. No browser print dialog is required.

Document downloads use a server-signed payload valid for 24 hours. The signature is scoped separately from admin cookies and uses the existing server admin password (or Gemini key when no admin password is configured). These tokens contain only the generated public document, never the source profile or credentials. Exports require a matching Origin, validated format and payload, bounded body sizes and rate limits. Documents are not written back to the knowledge source or stored in a public directory.

Generation retries once for temporary provider failures within a 90-second overall generation budget. On a 503 demand spike, it uses `GEMINI_DOCUMENT_FALLBACK_MODEL` (default `gemini-3.1-flash-lite`); set `none` to retry only the configured chat model. Authentication errors and incomplete or malformed output are not retried or published. Standard-resume caching includes these model settings and only stores documents that pass layout checks.

### RAG and ingestion

The assistant now uses retrieval-augmented generation (RAG). It splits text into chunks of at most 1,400 characters with roughly 180 characters of overlap. Gemini produces a 768-dimensional vector per chunk using the `RETRIEVAL_DOCUMENT` task. Each question uses `RETRIEVAL_QUERY`; normalized cosine similarity selects the four closest chunks, and only these excerpts are provided as facts to the answer model. Public answers use natural text without source labels or citation markers; retrieved excerpts and chunk IDs are visible only in the protected admin demonstration. Relevance scores are not confidence or factual-accuracy scores.

The protected editor includes an ingestion status panel, chunk/vector count, dimensions, indexing time, and a semantic-search demonstration showing actual vector samples and the retrieved excerpts. Save or reload edits before testing, so the demonstration refers to the saved version.

Indexes are stored server-side using [Next.js Data Cache](https://nextjs.org/docs/app/api-reference/functions/unstable_cache), keyed by normalized source content, embedding model, and the ingestion implementation version. This uses persistent cache storage on Vercel, not a separate vector database. Unchanged versions reuse their vectors; a changed version gets its own complete index. Cache entries may be evicted; the next access safely reconstructs the index from the current source. The source URL and credentials are excluded from index data. Indexes from old revisions are never selected for different source content.

Updates made through this editor prepare vectors before saving with the document revision precondition. Direct edits in Google Docs are detected and ingested on the next chat question or admin index/search request; there is no Google Drive webhook or background watcher. Long histories, unsupported source content, embedding errors, and stale save attempts fail explicitly. A source-save failure after indexing can leave an unused cached index but cannot make that draft the chatbot's live source.

Google Docs saves use a required revision ID so an intervening edit cannot be silently overwritten. Text-file saves check a content hash immediately before writing, but do not provide an atomic lock against simultaneous external edits. Keep Google Drive version history available for recovery. Copy unsaved edits before reloading after a conflict.

The initial content is in [`docs/rajesh-chat-knowledge.txt`](./docs/rajesh-chat-knowledge.txt). `npm run chat:prepare` regenerates this **local** draft from portfolio content and curated GitHub-profile facts; it never changes the live source. Provenance and verification limits are documented in [`docs/chat-content-sources.md`](./docs/chat-content-sources.md).

### Privacy and deployment

The URL, Google credentials, password, and Gemini key remain in server-only modules and environment variables. They are not page props or browser configuration. Public chat responses contain only the answer; the complete source is available through the authenticated admin endpoint. The model receives retrieved facts and recent questions, not the Drive URL or credentials. Source locations are redacted from model input and answers. Put only information suitable for public chatbot answers in the document.

Admin sessions use signed, expiring HttpOnly/SameSite cookies (Secure in production). JSON mutation endpoints require a matching Origin. Authentication attempts, content requests, and chat requests have bounded per-process rate limits, body limits, and upstream timeouts. On Vercel, add Firewall rate-limit rules for `/api/chat` and `/api/chat-admin/session` to enforce limits across instances; the in-memory backstop resets on cold starts and is not a distributed quota. Keep a provider spending limit on the Gemini key. On other hosts, the built-in limit is shared by all visitors unless you implement a trusted proxy IP strategy.

Configure the environment variables before deployment. `.env.local` is ignored by Git and is not automatically deployed to Vercel. There is no committed fallback password or API key. Missing configuration produces a clear unavailable state. The prompt instructs the AI to use only supplied facts and admit missing information; model answers can still be inaccurate.

API implementation references: [Google Docs batch updates](https://developers.google.com/workspace/docs/api/reference/rest/v1/documents/batchUpdate), [Google Drive uploads](https://developers.google.com/workspace/drive/api/guides/manage-uploads), and [Gemini content generation](https://ai.google.dev/api/generate-content).

### Verification

```bash
npm test          # auth, origin checks, source limits, safe URLs, revision saves, grounded requests
npm run test:ui   # editor and chat browser flows with local API fixtures
npm run lint
npm run build
```

Automated Google/Gemini tests use fixtures and make no paid model calls or live document writes. Live saving and AI replies require the configured credentials.
