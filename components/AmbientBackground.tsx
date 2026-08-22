"use client";

import { useEffect, useRef } from "react";

const TRAIL_POINTS = 5;

export function AmbientBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const motes = Array.from(root.querySelectorAll<HTMLElement>(".ambient-mote"));

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    if (reducedMotion.matches || !finePointer.matches) return;

    let trailIndex = 0;
    let lastTrailAt = 0;
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let ambientTop = root.getBoundingClientRect().top;

    const addTrailPoint = (x: number, y: number) => {
      const point = trailRefs.current[trailIndex];
      trailIndex = (trailIndex + 1) % TRAIL_POINTS;
      if (!point) return;

      point.style.translate = `${x}px ${y}px`;
      point.getAnimations().forEach((animation) => animation.cancel());
      point.animate(
        [
          { opacity: 0.34, transform: "scale(0.8)" },
          { opacity: 0, transform: "scale(0.2)" },
        ],
        { duration: 650, easing: "cubic-bezier(.2,.75,.25,1)", fill: "forwards" },
      );
    };

    const settleMotes = () => {
      motes.forEach((mote) => { mote.style.translate = "0px 0px"; });
    };

    const updateInteraction = () => {
      pointerFrame = 0;
      motes.forEach((mote) => {
        const bounds = mote.getBoundingClientRect();
        const deltaX = bounds.left + bounds.width / 2 - pointerX;
        const deltaY = bounds.top + bounds.height / 2 - pointerY;
        const distance = Math.hypot(deltaX, deltaY);
        const radius = 150;

        if (distance > 0 && distance < radius) {
          const force = (1 - distance / radius) * 14;
          mote.style.translate = `${(deltaX / distance) * force}px ${(deltaY / distance) * force}px`;
        } else {
          mote.style.translate = "0px 0px";
        }
      });

      const shiftX = ((pointerX / window.innerWidth) - 0.5) * 12;
      const shiftY = (((pointerY - ambientTop) / Math.max(root.clientHeight, 1)) - 0.5) * 8;
      root.style.setProperty("--ambient-shift-x", `${shiftX}px`);
      root.style.setProperty("--ambient-shift-y", `${shiftY}px`);

      const now = performance.now();
      if (now - lastTrailAt > 140) {
        addTrailPoint(pointerX, Math.max(0, pointerY - ambientTop));
        lastTrailAt = now;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(updateInteraction);
    };

    const handleResize = () => { ambientTop = root.getBoundingClientRect().top; };

    const hidePointer = () => {
      settleMotes();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("blur", hidePointer);
    document.documentElement.addEventListener("pointerleave", hidePointer);
    return () => {
      window.cancelAnimationFrame(pointerFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("blur", hidePointer);
      document.documentElement.removeEventListener("pointerleave", hidePointer);
    };
  }, []);

  return (
    <div className="ambient-background" aria-hidden="true" ref={rootRef}>
      <span className="ambient-aurora" />
      <span className="ambient-beam" />
      <i className="ambient-orb ambient-orb-one" />
      <i className="ambient-orb ambient-orb-two" />
      <i className="ambient-orb ambient-orb-three" />
      {Array.from({ length: 10 }, (_, index) => <b className="ambient-mote" key={`mote-${index}`} />)}
      {Array.from({ length: TRAIL_POINTS }, (_, index) => (
        <em
          className="ambient-trail-point"
          key={`trail-${index}`}
          ref={(element) => { trailRefs.current[index] = element; }}
        />
      ))}
    </div>
  );
}
