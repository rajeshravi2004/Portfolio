"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; radius: number; alpha: number };

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const pointer = { x: -1000, y: -1000, active: false };
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const palette = () => document.documentElement.dataset.theme === "light"
      ? { dot: "37, 99, 235", line: "37, 99, 235" }
      : { dot: "112, 159, 255", line: "85, 230, 255" };

    const createParticles = () => {
      const amount = Math.min(105, Math.max(42, Math.round((width * height) / 17000)));
      particles = Array.from({ length: amount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.25 + 0.55,
        alpha: Math.random() * 0.42 + 0.2,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createParticles();
    };

    const draw = () => {
      const colors = palette();
      context.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        if (!reducedMotion.matches) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.x < -10) particle.x = width + 10;
          if (particle.x > width + 10) particle.x = -10;
          if (particle.y < -10) particle.y = height + 10;
          if (particle.y > height + 10) particle.y = -10;

          if (pointer.active && !coarsePointer.matches) {
            const dx = particle.x - pointer.x;
            const dy = particle.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance > 0 && distance < 145) {
              const force = (145 - distance) / 145;
              particle.x += (dx / distance) * force * 0.9;
              particle.y += (dy / distance) * force * 0.9;
            }
          }
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${colors.dot}, ${particle.alpha})`;
        context.fill();

        for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
          const next = particles[nextIndex];
          const distance = Math.hypot(particle.x - next.x, particle.y - next.y);
          if (distance < 112) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(next.x, next.y);
            context.strokeStyle = `rgba(${colors.line}, ${(1 - distance / 112) * 0.11})`;
            context.lineWidth = 0.6;
            context.stroke();
          }
        }
      });

      if (!reducedMotion.matches) animationFrame = window.requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const handlePointerLeave = () => { pointer.active = false; };

    resize();
    draw();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div className="ambient-background" aria-hidden="true">
      <canvas ref={canvasRef} />
      <span className="ambient-glow ambient-glow-one" />
      <span className="ambient-glow ambient-glow-two" />
      <span className="ambient-grid" />
    </div>
  );
}
