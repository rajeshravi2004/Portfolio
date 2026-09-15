"use client";

import { FormEvent, useEffect, useState } from "react";

type Source = { text: string; version: string; editable: boolean; loadedAt: string };
type RagStats = { chunks: number; dimensions: number; model: string; indexedAt: string; version: string };
type Retrieval = { stats: RagStats; matches: { id: string; text: string; score: number }[]; queryVector?: number[]; matchedVector?: number[] };

export function ChatAdmin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [source, setSource] = useState<Source | null>(null);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [rag, setRag] = useState<RagStats | null>(null);
  const [question, setQuestion] = useState("What AI and healthcare experience does Rajesh have?");
  const [retrieval, setRetrieval] = useState<Retrieval | null>(null);
  const dirty = source !== null && draft !== source.text;

  useEffect(() => {
    let active = true;
    fetch("/api/chat-admin/session", { cache: "no-store" })
      .then((res) => { if (active) setAuthenticated(res.ok); })
      .catch(() => { if (active) setError("Could not check your session. Please sign in again."); })
      .finally(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!dirty) return;
    function warn(event: BeforeUnloadEvent) { event.preventDefault(); }
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  async function request(path: string, options?: RequestInit) {
    const res = await fetch(`/api/chat-admin/${path}`, { ...options, cache: "no-store" });
    const data = await res.json();
    if (res.status === 401) setAuthenticated(false);
    if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
    return data;
  }

  async function login(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(""); setNotice("");
    try {
      await request("session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      setAuthenticated(true); setPassword("");
    } catch (err) { setError(err instanceof Error ? err.message : "Sign in failed."); }
    finally { setBusy(false); }
  }

  async function load() {
    if (dirty && !window.confirm("Replace your unsaved edits with the latest saved content?")) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const data: Source = await request("content");
      setSource(data); setDraft(data.text); setRag(null); setRetrieval(null); setNotice("Content loaded. Preparing its search index…");
      const indexed: Retrieval = await request("retrieval", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ version: data.version }) });
      setRag(indexed.stats); setNotice("Latest content loaded. Ingestion is ready.");
    } catch (err) { setError(err instanceof Error ? err.message : "Could not load content."); }
    finally { setBusy(false); }
  }

  async function save() {
    if (!source) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const data: Source & { rag: RagStats } = await request("content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: draft, version: source.version }) });
      setSource(data); setDraft(data.text); setRag(data.rag); setRetrieval(null); setNotice("Saved to Drive and ingested. New questions will search this version.");
    } catch (err) { setError(err instanceof Error ? err.message : "Could not save content."); }
    finally { setBusy(false); }
  }

  async function logout() {
    if (dirty && !window.confirm("Sign out and discard your unsaved edits?")) return;
    setBusy(true); setError("");
    try {
      await request("session", { method: "DELETE" });
      setAuthenticated(false); setSource(null); setDraft(""); setNotice(""); setRag(null); setRetrieval(null);
    } catch { setError("Could not sign out. Please try again."); }
    finally { setBusy(false); }
  }

  async function copy() {
    try { await navigator.clipboard.writeText(draft); setNotice("Content copied."); }
    catch { setError("Could not copy. Select the text and copy it manually."); }
  }

  async function testRetrieval(event: FormEvent) {
    event.preventDefault();
    if (!source || dirty) return;
    setBusy(true); setError(""); setRetrieval(null);
    try {
      const data: Retrieval = await request("retrieval", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question, version: source.version }) });
      setRetrieval(data); setRag(data.stats);
    } catch (err) { setError(err instanceof Error ? err.message : "Search could not finish."); }
    finally { setBusy(false); }
  }

  if (checking) return <p role="status">Checking access…</p>;

  return <section className="chat-admin-card" aria-label="Chat knowledge editor">
    <div className="chat-admin-heading"><div><span className="chat-eyebrow">RAJESH / KNOWLEDGE</span><h1>{authenticated ? "Keep the story current." : "Your private workspace."}</h1><p>{authenticated ? "Update the information visitors can ask about." : "Sign in to manage what the portfolio assistant knows."}</p></div>{authenticated && <button className="chat-secondary" onClick={logout} disabled={busy}>Sign out</button>}</div>
    {error && <p className="chat-error" role="alert">{error}</p>}
    {notice && <p className="chat-notice" role="status">{notice}</p>}
    {!authenticated ? <form className="chat-login" onSubmit={login}>
      <label htmlFor="admin-password">Password</label>
      <input id="admin-password" type="password" autoComplete="current-password" required maxLength={1024} value={password} onChange={(event) => setPassword(event.target.value)} />
      <button className="button" disabled={busy}>{busy ? "Signing in…" : "Unlock editor"}</button>
    </form> : <>
      <div className="chat-admin-toolbar"><button className="chat-secondary" onClick={load} disabled={busy}>{busy ? "Working…" : source ? "Reload from Drive" : "Load from Drive"}</button>{source && <span>{dirty ? "Unsaved changes" : "All changes saved"} · {draft.length.toLocaleString()} characters</span>}</div>
      {source ? <>
        <label className="chat-source-label" htmlFor="knowledge-text">About Rajesh</label>
        <p className="chat-admin-hint" id="knowledge-hint">Write clear facts about your experience, skills, projects, and contact details. This information is used in public chatbot answers.</p>
        <textarea id="knowledge-text" aria-describedby="knowledge-hint" className="chat-source" spellCheck value={draft} onChange={(event) => setDraft(event.target.value)} disabled={busy} maxLength={80_000} />
        <div className="chat-admin-toolbar"><button className="button" onClick={save} disabled={busy || !dirty || !draft.trim() || !source.editable}>{busy ? "Working…" : "Save to Drive"}</button><button className="chat-secondary" onClick={copy} disabled={busy}>Copy text</button></div>
        {!source.editable && <p className="chat-admin-hint">Preview is connected. To enable saving, configure Google credentials on the server with edit access to this file.</p>}
        <section className="rag-demo" aria-labelledby="rag-title">
          <span className="chat-eyebrow">SEE HOW ANSWERS ARE FOUND</span>
          <h2 id="rag-title">Knowledge → vectors → relevant facts → answer</h2>
          <p className="chat-admin-hint">Each save creates embeddings: lists of numbers that represent the meaning of your text. A question is embedded too, then compared with your saved chunks. The assistant answers from the closest matches.</p>
          <div className="rag-stats" aria-label="Ingestion status"><div><strong>{dirty ? "Unsaved edits" : rag ? "Ready" : "Not indexed"}</strong><span>Ingestion</span></div><div><strong>{rag?.chunks ?? "—"}</strong><span>Text chunks / vectors</span></div><div><strong>{rag?.dimensions ?? "—"}</strong><span>Numbers per vector</span></div></div>
          {rag && <p className="chat-admin-hint">{rag.model} · Indexed {new Date(rag.indexedAt).toLocaleString()} · Saved in the server data cache</p>}
          <form className="rag-query" onSubmit={testRetrieval}><label htmlFor="retrieval-question">Try a semantic search</label><input id="retrieval-question" value={question} maxLength={1500} onChange={(event) => setQuestion(event.target.value)} required /><button className="button" disabled={busy || dirty || !question.trim()}>{busy ? "Processing…" : "Show retrieved facts"}</button></form>
          {dirty && <p className="chat-admin-hint">Save your edits to ingest them before testing this version.</p>}
          {retrieval && <div className="rag-matches">{retrieval.queryVector && <div className="rag-vectors"><p className="chat-admin-hint">Real vectors, showing the first 8 of 768 numbers:</p><p>Question <code>[{retrieval.queryVector.map((value) => value.toFixed(4)).join(", ")}, …]</code></p><p>Closest chunk <code>[{retrieval.matchedVector?.map((value) => value.toFixed(4)).join(", ")}, …]</code></p></div>}<p className="chat-admin-hint">Top {retrieval.matches.length} matches by cosine similarity. Scores describe relevance, not factual accuracy. These excerpts become the answer&apos;s context.</p>{retrieval.matches.map((match, index) => <details key={match.id} open={index === 0}><summary><span>#{index + 1} · [{match.id}]</span><strong>{match.score.toFixed(3)} similarity</strong></summary><p>{match.text}</p></details>)}</div>}
        </section>
      </> : <div className="chat-admin-empty"><span aria-hidden="true">↗</span><h2>One source. A current story.</h2><p>Load your saved content, make your changes, and save them for the assistant.</p></div>}
    </>}
  </section>;
}
