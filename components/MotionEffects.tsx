"use client";

import { useEffect } from "react";

/** Progressive enhancement: content stays visible if JavaScript is unavailable. */
export function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    targets.forEach((target) => {
      target.classList.add("motion-ready");
      observer.observe(target);
    });

    let frame = 0;
    const progress = document.querySelector<HTMLElement>(".reading-progress");
    const updateProgress = () => {
      frame = 0;
      const total = root.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };
    const resizeObserver = new ResizeObserver(onScroll);
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();

    const cards = document.querySelectorAll<HTMLElement>("[data-spotlight]");
    const move = (event: PointerEvent) => {
      if (!fine.matches || reduced.matches || root.dataset.motion === "paused") return;
      const card = event.currentTarget as HTMLElement;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
      card.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
    };
    cards.forEach((card) => card.addEventListener("pointermove", move, { passive: true }));
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      cards.forEach((card) => card.removeEventListener("pointermove", move));
      targets.forEach((target) => target.classList.remove("motion-ready", "in-view"));
    };
  }, []);

  return <div className="reading-progress" aria-hidden="true" />;
}
