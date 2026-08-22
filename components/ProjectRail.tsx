"use client";

import { useRef } from "react";
import { ArrowUpRight, Chevron, GithubIcon } from "@/components/Icons";
import { projects } from "@/lib/content";
import { TechIcon } from "@/components/TechIcons";

function ProjectVisual({ kind }: { kind: string }) {
  if (kind === "assistant") return <div className="project-visual assistant-visual"><span className="visual-label">Semantic document search</span><div className="chat-line short" /><div className="chat-line" /><div className="chat-response"><i /><i /><i /></div><div className="document-stack"><b><TechIcon name="FAISS" />FAISS</b><b><TechIcon name="React" />React</b><b><TechIcon name="FastAPI" />FastAPI</b></div></div>;
  if (kind === "resume") return <div className="project-visual resume-visual"><span className="visual-label">Live template preview</span><div className="resume-sheet"><i /><b /><i /><i /><b /><i /></div><div className="resume-tools"><b><TechIcon name="JSON" />JSON</b><b><TechIcon name="PDF" />PDF</b><b><TechIcon name="DOCX" />DOCX</b></div></div>;
  if (kind === "music") return <div className="project-visual music-visual"><div className="album-art"><i>R</i></div><div><small>Midnight drive</small><strong>Rajify mix</strong><span className="waveform"><i /><i /><i /><i /><i /><i /></span></div></div>;
  return <div className="project-visual commerce-visual"><span className="visual-label">Vector product search</span><div className="product-orb">Z</div><div className="ask-ai"><TechIcon name="Gemini AI" />Ask AI</div><div className="checkout-line"><span><TechIcon name="Gemini AI" />Gemini AI</span><b><TechIcon name="Stripe" />Secure Stripe checkout</b></div></div>;
}

export function ProjectRail() {
  const rail = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  const move = (direction: number) => {
    rail.current?.scrollBy({ left: direction * Math.min(740, window.innerWidth * 0.78), behavior: "smooth" });
  };

  return (
    <div className="project-rail-wrap">
      <div className="project-rail-controls">
        <span>Drag or scroll</span>
        <div>
          <button type="button" onClick={() => move(-1)} aria-label="Previous project"><Chevron /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next project"><Chevron /></button>
        </div>
      </div>
      <div
        className="project-rail"
        ref={rail}
        onPointerDown={(event) => {
          if (event.pointerType === "touch" || !rail.current) return;
          dragging.current = true;
          startX.current = event.clientX;
          startScroll.current = rail.current.scrollLeft;
          rail.current.setPointerCapture(event.pointerId);
          rail.current.classList.add("dragging");
        }}
        onPointerMove={(event) => {
          if (!dragging.current || !rail.current) return;
          rail.current.scrollLeft = startScroll.current - (event.clientX - startX.current);
        }}
        onPointerUp={(event) => {
          dragging.current = false;
          rail.current?.releasePointerCapture(event.pointerId);
          rail.current?.classList.remove("dragging");
        }}
        onPointerCancel={() => {
          dragging.current = false;
          rail.current?.classList.remove("dragging");
        }}
      >
        {projects.map((project) => (
          <article className="project-card" key={project.number}>
            <div className="project-card-top"><span>{project.number}</span><p>{project.type}</p></div>
            <ProjectVisual kind={project.visual} />
            <div className="project-copy">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <div className="tag-row project-tech-row">{project.stack.map((item) => <span key={item}><TechIcon name={item} />{item}</span>)}</div>
            </div>
            <a className="project-link" href={project.github} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}>
              <GithubIcon /><span>GitHub</span><ArrowUpRight />
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
