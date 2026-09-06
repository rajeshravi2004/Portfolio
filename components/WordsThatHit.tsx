"use client";

import Image from "next/image";
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { Chevron } from "@/components/Icons";
import { quotes } from "@/lib/quotes";

export function WordsThatHit() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [motionOff, setMotionOff] = useState(false);
  const root = useRef<HTMLElement>(null);
  const touchStart = useRef(0);
  const quote = quotes[index];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOff(reduced.matches || document.documentElement.dataset.motion === "paused" || document.hidden);
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { observer.disconnect(); reduced.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, []);

  const go = useCallback((direction: number) => {
    setIndex((current) => (current + direction + quotes.length) % quotes.length);
  }, []);

  useEffect(() => {
    if (paused || autoplayPaused || motionOff) return;
    const timer = window.setTimeout(() => go(1), 18000);
    return () => window.clearTimeout(timer);
  }, [index, paused, autoplayPaused, motionOff, go]);

  return (
    <section
      id="words"
      ref={root}
      className="page-section quote-section"
      tabIndex={0}
      aria-label="Words that hit dialogue gallery"
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
        <div className="quote-heading" data-reveal="heading">
          <div className="section-kicker"><i />06 / Beyond the code</div>
          <h2>Words that hit.</h2>
          <p>Thirty-four characters, defining lines, and the full dialogues behind them.</p>
        </div>

        <div className="quote-panel" data-reveal="focus" style={{ "--quote-accent": quote.accentColor } as CSSProperties}>
          <div key={quote.id} className="quote-slide">
            <div className="quote-character">
              <Image
                src={quote.imageUrl}
                alt={`${quote.characterName} from ${quote.seriesName}`}
                fill
                sizes="(max-width: 720px) 100vw, 38vw"
                className="quote-character-image"
              />
              <span className="quote-character-emblem" aria-hidden="true">{quote.emblem}</span>
              <a className="quote-image-source" href={quote.sourceUrl} target="_blank" rel="noreferrer">
                Image source · AniList
              </a>
            </div>

            <div className="quote-copy">
              <span className="quote-mark" aria-hidden="true">“</span>
              <blockquote>{quote.shortQuote}</blockquote>
              <div className="quote-credit"><strong>{quote.characterName}</strong><span>{quote.seriesName}</span></div>
              <p className="quote-dialogue">{quote.line}</p>
            </div>
          </div>

          <div className="quote-controls">
            <span className="quote-count">{String(index + 1).padStart(3, "0")} / {quotes.length}</span>
            <div className="quote-progress" aria-hidden="true"><i style={{ transform: `scaleX(${(index + 1) / quotes.length})` }} /></div>
            <div className="quote-buttons">
              <button className="quote-autoplay" type="button" onClick={() => setAutoplayPaused(!autoplayPaused)} aria-label={autoplayPaused ? "Resume gallery autoplay" : "Pause gallery autoplay"} aria-pressed={autoplayPaused}>{autoplayPaused ? "▷" : "Ⅱ"}</button>
              <button type="button" onClick={() => go(-1)} aria-label="Previous dialogue"><Chevron /></button>
              <button type="button" onClick={() => go(1)} aria-label="Next dialogue"><Chevron /></button>
            </div>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">{quote.characterName} from {quote.seriesName}</p>
      </div>
    </section>
  );
}
