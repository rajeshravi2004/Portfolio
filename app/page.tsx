import Image from "next/image";
import { AmbientBackground } from "@/components/AmbientBackground";
import { ContactForm } from "@/components/ContactForm";
import { Header } from "@/components/Header";
import { ArrowUpRight, GithubIcon, LinkedinIcon, MailIcon } from "@/components/Icons";
import { ProjectRail } from "@/components/ProjectRail";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillLoadout } from "@/components/SkillLoadout";
import { TechGroupIcon, TechIcon } from "@/components/TechIcons";
import { WordsThatHit } from "@/components/WordsThatHit";
import { certifications, education, roles, siteConfig, techGroups } from "@/lib/content";
import animatedPortrait from "@/src/assets/animatedrajesh.png";

const stats = [
  ["8.73", "OGPA", "BE Information Technology"],
  ["4+", "Languages", "Programming foundations"],
  ["5+", "Frameworks", "Frontend and backend"],
  ["2+", "Internships", "Industry experience"],
] as const;

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <Header />
      <main>
        <section id="home" className="hero page-section">
          <div className="hero-grid site-width">
            <div className="hero-content">
              <div className="availability"><i />{siteConfig.availability}</div>
              <p className="hero-eyebrow">Full-stack developer · AI product builder</p>
              <h1>I build digital products that feel <em>clear, fast &amp; human.</em></h1>
              <p className="hero-intro">I&apos;m Rajesh, a full-stack developer shaping healthcare and AI products—from thoughtful interfaces to dependable APIs and cloud systems.</p>
              <div className="hero-actions">
                <a className="button" href="#work">Explore my work <ArrowUpRight /></a>
                <a className="text-link" href="#contact">Start a conversation <ArrowUpRight /></a>
              </div>
            </div>
            <div className="hero-portrait">
              <div className="portrait-frame">
                <Image src={animatedPortrait} alt="Illustrated portrait of Rajesh R" fill priority sizes="(max-width: 760px) 72vw, 300px" />
              </div>
              <span>RAJESH R / FULL-STACK DEVELOPER</span>
            </div>
          </div>
          <div className="hero-meta site-width">
            <div><span>Location</span><strong>Tamil Nadu, India</strong></div>
            <div><span>Currently building</span><a href={siteConfig.carescribe} target="_blank" rel="noreferrer">CareScribe <ArrowUpRight /></a></div>
            <div><span>Experience</span><strong>{siteConfig.experience}</strong></div>
            <div><span>Stack</span><strong className="tech-mini-list"><i><TechIcon name="React" />React</i><i><TechIcon name="Node.js" />Node</i><i><TechIcon name="Python" />Python</i></strong></div>
          </div>
          <a className="scroll-cue" href="#about"><span>Scroll to discover</span><i /></a>
        </section>

        <section id="about" className="page-section about-section">
          <div className="site-width">
            <SectionHeading label="About" title="A full-stack developer with product-minded habits." intro="I focus on building clear, maintainable applications that connect interface work with dependable backend systems, especially for healthcare and AI-assisted workflows." />
            <div className="about-content">
              <div className="bio-copy">
                <p>I am a recent BE Information Technology graduate from Annamalai University with an OGPA of 8.73. My work spans frontend development, backend APIs, automation testing, cloud services, and AI/ML tooling.</p>
                <p>I enjoy turning messy requirements into structured workflows: React interfaces, Node.js and Python services, databases, documentation, and integrations that feel straightforward to use.</p>
              </div>
              <div className="stat-grid">
                {stats.map(([value, label, description]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span><p>{description}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="page-section education-section">
          <div className="site-width">
            <SectionHeading label="Education" title="Academic path" />
            <div className="timeline">
              {education.map((item, index) => <article key={item.title}><div className="timeline-marker"><span>0{index + 1}</span><i /></div><div><h3>{item.title}</h3><p>{item.institution}</p></div><span>{item.period}</span><strong>{item.score}</strong></article>)}
            </div>
            <div className="certifications">
              {certifications.map((item) => <article key={item.title}><div><span>CERT / {item.year}</span><h3>{item.title}</h3></div><div><p>{item.detail}</p>{item.tools.length > 0 && <div className="cert-tools">{item.tools.map((tool) => <span key={tool}><TechIcon name={tool} />{tool}</span>)}</div>}</div></article>)}
            </div>
          </div>
        </section>

        <section id="experience" className="page-section experience-section">
          <div className="site-width">
            <SectionHeading label="Experience" title="Healthcare products, AI workflows, and full-stack delivery." intro="My recent work has centered on turning clinical conversations into usable software workflows, from interface details to backend services and deployment infrastructure." />
            <div className="role-list">
              {roles.map((role, index) => <article key={`${role.title}-${role.period}`}><div className="role-number">{String(index + 1).padStart(2, "0")}</div><div className="role-main"><div className="role-title"><h3>{role.title}</h3><span>{role.period}</span></div><div className="role-meta"><strong>{role.company}</strong><span>{role.location}</span></div><p>{role.description}</p><div className="role-stack">{role.stack.map((item) => <span key={item}><TechIcon name={item} />{item}</span>)}</div></div></article>)}
            </div>
            <div className="tech-groups">
              {techGroups.map((group, index) => <section className={`tech-group-card tech-group-${index}`} key={group.name}><header><span className="tech-group-icon-wrap"><TechGroupIcon index={index} /></span><div><small>0{index + 1} / CAPABILITY</small><h3>{group.name}</h3></div></header><div className="tag-row tech-tag-row">{group.items.map((item) => <span key={item}><TechIcon name={item} />{item}</span>)}</div></section>)}
            </div>
          </div>
        </section>

        <section id="skills" className="page-section skills-section">
          <div className="site-width">
            <SectionHeading label="Skills" title="Technical range across product layers." intro="A compact view of the tools I use most often for interfaces, APIs, data, automation, and AI-assisted products." />
            <p className="sub-label">Working proficiency and daily-use tools</p>
            <SkillLoadout />
          </div>
        </section>

        <section id="work" className="page-section work-section">
          <div className="site-width work-content">
            <SectionHeading label="Selected work" title="Built to solve. Designed to feel good." />
            <ProjectRail />
          </div>
        </section>

        <WordsThatHit />

        <section id="contact" className="page-section contact-section">
          <div className="site-width">
            <SectionHeading label="Contact" title="Let us talk about the next useful thing to build." intro="I am open to full-stack roles, product engineering work, and projects where clean implementation matters as much as the idea." />
            <div className="contact-cards">
              <a href={siteConfig.phoneHref}><span>Phone</span><strong>{siteConfig.phone}</strong></a>
              <a href={`mailto:${siteConfig.email}`}><span>Email</span><strong>{siteConfig.email}</strong></a>
              <div><span>Location</span><strong>Tamil Nadu, India</strong></div>
            </div>
            <div className="contact-grid">
              <div className="direct-contact">
                <h3>Connect directly</h3>
                <p>Whether you have a role, a build idea, or a technical problem that needs a steady hand, send a message and I will get back to you.</p>
                <div className="socials labeled">
                  <a href={siteConfig.github} target="_blank" rel="noreferrer"><GithubIcon />GitHub</a>
                  <a href={siteConfig.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon />LinkedIn</a>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer site-width">
        <p>Directed &amp; Developed by Rajesh R</p>
        <div className="socials labeled">
          <a href={siteConfig.github} target="_blank" rel="noreferrer"><GithubIcon />GitHub</a>
          <a href={siteConfig.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon />LinkedIn</a>
          <a href={`mailto:${siteConfig.email}`}><MailIcon />Email</a>
        </div>
      </footer>
    </>
  );
}
