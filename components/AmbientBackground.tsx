"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; radius: number; phase: number };

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const pointer = { x: -1000, y: -1000, active: false };
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let previous = 0;
    let lastDraw = 0;
    let elapsed = 0;
    const moving = () => !reducedMotion.matches && root.dataset.motion !== "paused" && !document.hidden;

    const draw = (time: number) => {
      const delta = moving() && previous ? Math.min((time - previous) / 16.67, 3) : 0;
      previous = time;
      elapsed += delta;
      const dark = root.dataset.theme !== "light";
      const color = dark ? "160, 240, 201" : "22, 116, 81";
      context.clearRect(0, 0, width, height);

      if (pointer.active && moving() && !coarse.matches) {
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 260);
        glow.addColorStop(0, `rgba(${color}, ${dark ? .085 : .045})`);
        glow.addColorStop(1, `rgba(${color}, 0)`);
        context.fillStyle = glow;
        context.fillRect(0, 0, width, height);
      }
      for (let index = 0; index < particles.length; index++) {
        const particle = particles[index];
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;
        if (pointer.active && delta && !coarse.matches) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < 150) {
            const force = (1 - distance / 150) * delta;
            particle.x += dx / distance * force;
            particle.y += dy / distance * force;
          }
          if (distance < 190) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(pointer.x, pointer.y);
            context.strokeStyle = `rgba(${color}, ${(1 - distance / 190) * .22})`;
            context.lineWidth = .7;
            context.stroke();
          }
        }
        const alpha = .3 + (Math.sin(elapsed * .016 + particle.phase) + 1) * .22;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color}, ${alpha * .08})`;
        context.fill();
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color}, ${alpha})`;
        context.fill();
        // Cap particle count and skip background connections on touch devices.
        if (!coarse.matches) for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex++) {
          const next = particles[nextIndex];
          const dx = particle.x - next.x;
          const dy = particle.y - next.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared < 16000) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(next.x, next.y);
            context.strokeStyle = `rgba(${color}, ${(1 - Math.sqrt(distanceSquared) / 127) * .16})`;
            context.lineWidth = .6;
            context.stroke();
          }
        }
      }
    };
    const tick = (time: number) => {
      if (!moving()) { frame = 0; return; }
      if (time - lastDraw >= 32) { draw(time); lastDraw = time; }
      frame = requestAnimationFrame(tick);
    };
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      lastDraw = 0;
      draw(performance.now());
      if (moving()) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = coarse.matches ? 30 : Math.min(95, Math.max(40, Math.round(width * height / 14000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - .5) * .32, vy: -.12 - Math.random() * .2,
        radius: .65 + Math.random() * 1.3, phase: Math.random() * Math.PI * 2,
      }));
      refresh();
    };
    const move = (event: PointerEvent) => { pointer.x = event.clientX; pointer.y = event.clientY; pointer.active = true; };
    const leave = () => { pointer.active = false; };
    const observer = new MutationObserver(refresh);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme", "data-motion"] });
    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", refresh);
    reducedMotion.addEventListener("change", refresh);
    coarse.addEventListener("change", resize);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", refresh);
      reducedMotion.removeEventListener("change", refresh);
      coarse.removeEventListener("change", resize);
    };
  }, []);

  return <div className="ambient-background" aria-hidden="true"><canvas ref={canvasRef} /><span className="ambient-glow ambient-glow-one" /><span className="ambient-glow ambient-glow-two" /><span className="ambient-grid" /></div>;
}
