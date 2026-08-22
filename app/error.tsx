"use client";

export default function GlobalError() {
  return (
    <main className="error-page">
      <h1>Something went wrong</h1>
      <p>Please refresh the page to try again</p>
      <button className="button" type="button" onClick={() => window.location.reload()}>Refresh Page</button>
    </main>
  );
}
