# Portfolio RAG release

Released 16 September 2026.

## Latest update: Markdown replies and animated header button

Chat opens from the header's “Ask about me” button with a matching speech-bubble icon. A repeating pulse and gentle icon bounce invite visitors to open it; opening chat, pausing animations, or enabling reduced motion stops the animation. Small screens use the icon with an accessible label.

Answers render Markdown headings, accent-colored bold text, lists, links, quotes, code, and scrollable tables. The assistant is prompted to format replies for the narrow chat panel. Raw HTML and remote images are excluded, and unsafe link protocols are filtered by the Markdown renderer. Source IDs remain hidden. The panel has explicit theme colors for readable light and dark replies.

Verification: production build, 14 server tests, and 6 browser tests passed, including Markdown rendering, unsafe content, header placement, motion preferences, and 320px/390px/1280px layouts in both themes.

## Previous update: clean public answers

Deployment `dpl_3puDaef4AcKwEEpmzMxP82D3o9DE` removes chunk citations and supporting-excerpt panels from public chat. The protected RAG demonstration retains chunk IDs. Production verification returned a plain-text answer without markers even when the supplied conversation history contained an older `[S4]` reference. Fourteen server tests and the production build passed. Storage still uses Next.js Data Cache; no Supabase migration was performed.

## Initial RAG release

- Production: https://rajeshportfolio-olive.vercel.app
- Protected editor: `/rajesh-chat-update`
- Deployment: `dpl_4P1NoVQvSc9gFA37aXU3s4pJo1Ez`
- Release snapshot: `D:/rajeshravi2004/_local_copies/portfolio-rag-release-20260916`
- Chat model: `gemini-3.6-flash`
- Embedding model: `gemini-embedding-001`
- Initial index: 12 overlapping text chunks, each with 768 normalized vector dimensions.

All seven chatbot environment variables are configured as sensitive production values in Vercel. `.env.local` contains the local credentials and admin password and remains ignored by Git. The Google service account belongs to the same personal Google Cloud project as the supplied AI Studio key (`gen-lang-client-0540795540`) and has no Google Cloud project IAM roles. It has explicit Editor access to the knowledge document; public access was reduced to Viewer.

The initial repository deployment was blocked by Vercel's Git author association check. The release was published through an authenticated owner CLI deployment of a source-only snapshot, without changing Git identity or repository configuration. Future Git-triggered deployments may require linking the `rajeshravi2004` GitHub identity in Vercel Account Settings → Login Connections. The source snapshot excludes credentials and build artifacts; production settings supply all runtime secrets.

## Verification

- 14 server tests: sessions, access controls, origin checks, input limits, source handling, conditional saves, chunking, embeddings, ranking, and ingestion failure preserving the existing document.
- 3 browser tests: real authentication endpoints, edit/save/retrieval flow, and mobile chat/error recovery.
- Production build and type/lint checks passed. Browser static assets were scanned for the configured secrets with no matches.
- Live production checks passed for homepage, password login, unauthenticated rejection, authenticated Google Doc reading, vector retrieval, and an answer citing the education excerpt.
- A formatting-only live update produced a new index and retrieval used that exact version. Restoring the original content selected its original index. The final document content was verified unchanged.
- Repeated retrieval reused the cached index. The protected demo displays real query/document vector samples and cosine similarity scores.

Saving through the editor prepares the vector index before committing the Google Doc update. Direct Google Doc edits are ingested on the next source-dependent request, not by a background webhook. Indexes use Next.js Data Cache; an evicted index is rebuilt safely from the current source. See the README for the full ingestion flow and production rate-limit considerations.
