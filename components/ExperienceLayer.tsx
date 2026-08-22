"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const techniqueNames = ["Domain expansion", "Conqueror's Haki", "Cross strike"] as const;

export function ImpactFrameSystem() {
  const [beat, setBeat] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const soundOnRef = useRef(false);
  const audioRef = useRef<AudioContext | null>(null);

  const playSound = useCallback((technique: number) => {
    const AudioContextClass = window.AudioContext;
    const context = audioRef.current ?? new AudioContextClass();
    audioRef.current = context;
    void context.resume();

    const now = context.currentTime;
    const master = context.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(technique === 0 ? 0.13 : 0.2, now + 0.025);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);
    master.connect(context.destination);

    const impact = context.createOscillator();
    const impactGain = context.createGain();
    impact.type = technique === 1 ? "sawtooth" : "sine";
    impact.frequency.setValueAtTime(technique === 0 ? 86 : 155, now);
    impact.frequency.exponentialRampToValueAtTime(32, now + 0.55);
    impactGain.gain.setValueAtTime(0.7, now);
    impactGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.62);
    impact.connect(impactGain).connect(master);
    impact.start(now);
    impact.stop(now + 0.65);

    const buffer = context.createBuffer(1, Math.floor(context.sampleRate * 0.42), context.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let index = 0; index < channel.length; index += 1) channel[index] = Math.random() * 2 - 1;
    const noise = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const noiseGain = context.createGain();
    noise.buffer = buffer;
    filter.type = technique === 0 ? "bandpass" : "lowpass";
    filter.frequency.setValueAtTime(technique === 0 ? 900 : 480, now);
    filter.frequency.exponentialRampToValueAtTime(90, now + 0.42);
    noiseGain.gain.setValueAtTime(technique === 0 ? 0.24 : 0.52, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
    noise.connect(filter).connect(noiseGain).connect(master);
    noise.start(now);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>(".page-section"));
    const seen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      const entry = entries.find((item) => item.isIntersecting && !seen.has(item.target));
      if (!entry) return;
      seen.add(entry.target);
      setBeat((current) => {
        const next = current + 1;
        if (soundOnRef.current) playSound(next % 3);
        return next;
      });
      observer.unobserve(entry.target);
    }, { rootMargin: "-12% 0px -52%", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [playSound]);

  const technique = beat % 3;

  return (
    <>
      <div className="fight-background" aria-hidden="true">
        <div className="ambient-speed-lines"><i /><i /><i /><i /><i /><i /></div>
        <div className="background-energy"><i /><i /><i /></div>

        <div key={beat} className={`technique-event technique-${technique}`}>
          <div className="technique-title">
            <span>BACKGROUND TECHNIQUE</span>
            <strong>{techniqueNames[technique]}</strong>
          </div>

          <div className="domain-field">
            <i className="domain-orb" /><i className="domain-ring ring-one" /><i className="domain-ring ring-two" /><i className="domain-ring ring-three" />
            <span className="domain-symbols">無&nbsp;&nbsp;限&nbsp;&nbsp;界</span>
          </div>

          <svg className="haki-field" viewBox="0 0 1000 650" preserveAspectRatio="xMidYMid slice" focusable="false">
            <g className="haki-lightning">
              <path d="M40 180 L210 240 L155 315 L395 300 L330 415 L505 325" />
              <path d="M960 145 L805 235 L858 300 L620 288 L685 410 L505 325" />
              <path d="M115 555 L255 445 L345 475 L505 325" />
              <path d="M900 545 L760 440 L670 470 L505 325" />
            </g>
            <circle className="haki-wave haki-wave-one" cx="505" cy="325" r="42" />
            <circle className="haki-wave haki-wave-two" cx="505" cy="325" r="42" />
            <circle className="haki-wave haki-wave-three" cx="505" cy="325" r="42" />
          </svg>

          <svg className="fight-beat" viewBox="0 0 1000 650" preserveAspectRatio="xMidYMid slice" focusable="false">
            <defs>
              <radialGradient id={`impact-core-${beat}`} cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#f5f3ed" />
                <stop offset=".18" stopColor="#e8402c" />
                <stop offset="1" stopColor="#e8402c" stopOpacity="0" />
              </radialGradient>
            </defs>
            <g className="fighter fighter-left">
              <circle cx="258" cy="270" r="23" />
              <path d="M257 294 L237 370 L282 420 M240 348 L183 392 M246 338 L316 315 M237 370 L197 450" />
              <path className="fighter-scarf" d="M239 302 Q190 280 146 302" />
            </g>
            <g className="fighter fighter-right">
              <circle cx="748" cy="265" r="23" />
              <path d="M746 289 L770 366 L725 420 M765 340 L823 390 M758 330 L685 309 M770 366 L812 450" />
              <path className="fighter-scarf" d="M763 300 Q815 276 858 305" />
            </g>
            <g className="clash-slashes">
              <path d="M210 510 L790 130" /><path d="M270 560 L735 85" /><path d="M145 430 L850 220" />
            </g>
            <g className="impact-rays">
              {Array.from({ length: 18 }, (_, index) => <line key={index} x1="500" y1="325" x2="500" y2={index % 2 ? "82" : "160"} transform={`rotate(${index * 20} 500 325)`} />)}
            </g>
            <circle className="impact-core" cx="500" cy="325" r="105" fill={`url(#impact-core-${beat})`} />
            <circle className="shockwave shockwave-one" cx="500" cy="325" r="42" />
            <circle className="shockwave shockwave-two" cx="500" cy="325" r="42" />
            <g className="impact-debris"><path d="M476 294 l-34 -51 l45 25z" /><path d="M532 304 l49 -38 l-23 56z" /><path d="M468 353 l-51 29 l37 -2z" /><path d="M538 355 l43 47 l-55 -21z" /></g>
          </svg>
        </div>
      </div>

      <button
        className={`sound-toggle${soundOn ? " sound-on" : ""}`}
        type="button"
        aria-pressed={soundOn}
        onClick={() => {
          const next = !soundOn;
          setSoundOn(next);
          soundOnRef.current = next;
          if (next) playSound(technique);
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" /><path className="sound-wave" d="M16 9c1.4 1.6 1.4 4.4 0 6M19 6c3.6 3.4 3.6 8.6 0 12" /></svg>
        <span>Impact sound {soundOn ? "on" : "off"}</span>
      </button>
    </>
  );
}
