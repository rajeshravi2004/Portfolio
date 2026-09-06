import { ArrowUpRight, GithubIcon } from "@/components/Icons";
import { TechIcon } from "@/components/TechIcons";
import { projects } from "@/lib/content";

function ProjectVisual({ kind }: { kind: string }) {
  if (kind === "assistant") {
    return (
      <div className="product-preview assistant-preview" aria-hidden="true">
        <div className="preview-bar"><i /><i /><i /><span>RajeshOS / Workspace</span></div>
        <div className="assistant-shell">
          <aside><strong>R/OS</strong><span>New chat</span><span>Documents</span><span>History</span></aside>
          <div className="assistant-chat">
            <div className="preview-status"><i />3 documents indexed</div>
            <h4>Ask your knowledge base</h4>
            <div className="prompt-line">Summarise the uploaded report</div>
            <div className="answer-lines"><i /><i /><i /><i /></div>
            <div className="source-row"><span>PDF · Source 01</span><span>DOCX · Source 02</span></div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "resume") {
    return (
      <div className="product-preview resume-preview" aria-hidden="true">
        <div className="preview-bar"><i /><i /><i /><span>Resume Studio / Editor</span></div>
        <div className="resume-shell">
          <aside><strong>Content</strong><span>Profile</span><span>Experience</span><span>Projects</span><span>Skills</span></aside>
          <div className="resume-paper"><h4>Rajesh R</h4><small>Full-stack developer</small><i /><b /><i /><i /><b /><i /><i /></div>
          <div className="resume-action">Export PDF</div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-preview music-preview" aria-hidden="true">
      <div className="preview-bar"><i /><i /><i /><span>Rajify / For you</span></div>
      <div className="music-shell">
        <aside><strong>RAJIFY</strong><span>Discover</span><span>Your library</span><span>Playlists</span></aside>
        <div className="music-content"><small>Made for you</small><h4>Keep the day moving.</h4><div className="album-row"><i>R</i><i>01</i><i>02</i></div></div>
        <div className="player-bar"><span>Rajify mix</span><div><i /><b /><i /></div><small>02:18 / 03:42</small></div>
      </div>
    </div>
  );
}

export function ProjectRail() {
  return (
    <div className="featured-projects">
      {projects.map((project) => (
        <article className={`project-card project-${project.visual}`} key={project.number} data-reveal="project" data-spotlight>
          <div className="project-visual-wrap"><span className="project-visual-label">{project.type}<span>/{project.number}</span></span><div className="project-aura" aria-hidden="true" /><ProjectVisual kind={project.visual} /><div className={`preview-motion preview-motion-${project.visual}`} aria-hidden="true">{project.visual === "assistant" ? <><i /><span>Thinking, grounded in your documents</span></> : project.visual === "resume" ? <><span>Draft</span><i /><span>Preview</span><i /><span>Export ↗</span></> : <>{Array.from({ length: 20 }, (_, index) => <i key={index} style={{ animationDelay: `${index * -0.17}s` }} />)}</>}</div></div>
          <div className="project-copy">
            <div className="project-overline"><span>{project.number}</span><p>{project.type}</p></div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <div className="tag-row">{project.stack.map((item) => <span key={item}><TechIcon name={item} />{item}</span>)}</div>
            <div className="project-actions">
              <a className="button" href={project.demo} target="_blank" rel="noreferrer">Open live demo <ArrowUpRight /></a>
              <a className="project-github" href={project.github} target="_blank" rel="noreferrer"><GithubIcon />View source</a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
