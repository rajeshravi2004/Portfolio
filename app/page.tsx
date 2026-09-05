import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { Header } from "@/components/Header";
import { ArrowUpRight, GithubIcon, LinkedinIcon, MailIcon } from "@/components/Icons";
import { ProjectRail } from "@/components/ProjectRail";
import { SectionHeading } from "@/components/SectionHeading";
import { TechIcon } from "@/components/TechIcons";
import { education, roles, siteConfig, techGroups } from "@/lib/content";
import animatedPortrait from "@/src/assets/animatedrajesh.png";

const principles = [
  ["01", "Product clarity", "I turn unclear requirements into focused flows that are easy to understand and maintain."],
  ["02", "Full-stack ownership", "I move comfortably from interface details to APIs, data models, real-time systems, and deployment."],
  ["03", "Useful AI", "I use AI where it improves a real workflow—not as decoration or a feature looking for a problem."],
] as const;

const capabilityGroups = techGroups.slice(0, 6);

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section id="home" className="hero page-section">
          <div className="hero-grid site-width">
            <div className="hero-content">
              <div className="availability"><i />{siteConfig.availability}</div>
              <p className="hero-eyebrow">Full-stack developer / AI product builder</p>
              <h1>Building useful software, <em>from idea to production.</em></h1>
              <p className="hero-intro">I&apos;m Rajesh, a full-stack developer working across polished interfaces, dependable APIs, AI workflows, and cloud infrastructure.</p>
              <div className="hero-actions">
                <a className="button" href="#work">View featured work <ArrowUpRight /></a>
                <a className="text-link" href="#contact">Let&apos;s work together <ArrowUpRight /></a>
              </div>
              <div className="hero-proof" aria-label="Professional highlights">
                <div><strong>1+ year</strong><span>Product experience</span></div>
                <div><strong>3 featured</strong><span>Product builds</span></div>
                <div><strong>8.73</strong><span>Engineering OGPA</span></div>
              </div>
            </div>

            <div className="hero-portrait">
              <div className="portrait-frame">
                <Image src={animatedPortrait} alt="Illustrated portrait of Rajesh R" fill priority sizes="(max-width: 760px) 88vw, 420px" />
              </div>
              <div className="portrait-caption"><span>Rajesh R</span><span>Tamil Nadu, India</span></div>
            </div>
          </div>
        </section>

        <section id="about" className="page-section about-section">
          <div className="site-width">
            <SectionHeading label="About" title="A product-minded engineer who works across the stack." intro="I care about the whole experience: what the user sees, how the system behaves, and how confidently the product can be shipped." />
            <div className="principle-grid">
              {principles.map(([number, title, copy]) => (
                <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="page-section experience-section">
          <div className="site-width">
            <SectionHeading label="Experience" title="Shipping healthcare and AI-assisted products." intro="My recent work has focused on clinical documentation workflows, real-time applications, secure APIs, and cloud-backed delivery." />
            <div className="role-list">
              {roles.map((role, index) => (
                <article key={`${role.title}-${role.period}`}>
                  <div className="role-number">{String(index + 1).padStart(2, "0")}</div>
                  <div className="role-main">
                    <div className="role-title"><h3>{role.title}</h3><span>{role.period}</span></div>
                    <div className="role-meta"><strong>{role.company}</strong><span>{role.location}</span></div>
                    <p>{role.description}</p>
                    <div className="tag-row">{role.stack.map((item) => <span key={item}><TechIcon name={item} />{item}</span>)}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="page-section work-section">
          <div className="site-width">
            <SectionHeading label="Featured work" title="Three products built for real use." intro="A focused selection showing how I approach AI, productivity, and media experiences. Each project includes its source and deployment link." />
            <ProjectRail />
          </div>
        </section>

        <section id="skills" className="page-section skills-section">
          <div className="site-width">
            <SectionHeading label="Capabilities" title="The tools behind the work." intro="A practical stack built around modern product development—not a wall of every technology I have encountered." />
            <div className="capability-grid">
              {capabilityGroups.map((group, index) => (
                <article key={group.name}>
                  <span>0{index + 1}</span>
                  <h3>{group.name}</h3>
                  <div className="capability-list">{group.items.slice(0, 8).map((item) => <span key={item}>{item}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="page-section education-section">
          <div className="site-width">
            <SectionHeading label="Education" title="Strong technical foundations." />
            <div className="education-list">
              {education.map((item) => <article key={item.title}><div><span>{item.period}</span><h3>{item.title}</h3><p>{item.institution}</p></div><strong>{item.score}</strong></article>)}
            </div>
          </div>
        </section>

        <section id="contact" className="page-section contact-section">
          <div className="site-width">
            <SectionHeading label="Contact" title="Have a useful product to build? Let’s talk." intro="I am open to full-stack roles, product engineering work, and thoughtful AI projects." />
            <div className="contact-grid">
              <div className="direct-contact">
                <p>Send the context, problem, or role you have in mind. I&apos;ll get back to you with a clear next step.</p>
                <a className="contact-email" href={`mailto:${siteConfig.email}`}>{siteConfig.email}<ArrowUpRight /></a>
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
        <p>Designed &amp; developed by Rajesh R</p>
        <div className="socials labeled">
          <a href={siteConfig.github} target="_blank" rel="noreferrer"><GithubIcon />GitHub</a>
          <a href={siteConfig.linkedin} target="_blank" rel="noreferrer"><LinkedinIcon />LinkedIn</a>
          <a href={`mailto:${siteConfig.email}`}><MailIcon />Email</a>
        </div>
      </footer>
    </>
  );
}
