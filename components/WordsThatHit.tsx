"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { Chevron } from "@/components/Icons";
import { quotes } from "@/lib/quotes";

export function WordsThatHit() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLElement>(null);
  const touchStart = useRef(0);
  const quote = quotes[index];

  const go = (direction: number) => {
    setIndex((current) => (current + direction + quotes.length) % quotes.length);
  };

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => go(1), 5000);
    return () => window.clearTimeout(timer);
  }, [index, paused]);

  return (
    <section
      id="words"
      ref={root}
      className="page-section quote-section"
      tabIndex={0}
      aria-label="Words that hit quote gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={(event) => {
        const distance = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(distance) > 45) go(distance < 0 ? 1 : -1);
        setPaused(false);
      }}
    >
      <div className="site-width">
        <div className="quote-heading">
          <div className="section-kicker"><i />Closing gallery</div>
          <h2>Words that hit.</h2>
          <p>Ideas about resolve, craft, and becoming better—rewritten in my own voice.</p>
        </div>

        <div className="quote-panel" style={{ "--quote-accent": quote.accentColor } as CSSProperties}>
          <div key={quote.id} className="quote-slide">
            <div className="quote-emblem" aria-hidden="true"><span>{quote.emblem}</span></div>
            <div className="quote-copy">
              <span className="quote-mark" aria-hidden="true">“</span>
              <blockquote>{quote.line}</blockquote>
              <div><strong>{quote.characterName}</strong><span>{quote.seriesName}</span></div>
            </div>
          </div>

          <div className="quote-controls">
            <span className="quote-count">{String(index + 1).padStart(3, "0")} / {quotes.length}</span>
            <div className="quote-progress" aria-hidden="true"><i style={{ transform: `scaleX(${(index + 1) / quotes.length})` }} /></div>
            <div className="quote-buttons">
              <button type="button" onClick={() => go(-1)} aria-label="Previous quote"><Chevron /></button>
              <button type="button" onClick={() => go(1)} aria-label="Next quote"><Chevron /></button>
            </div>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">{quote.characterName} from {quote.seriesName}</p>
      </div>
    </section>
  );
}
