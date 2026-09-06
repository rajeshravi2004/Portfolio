import Image from "next/image";
import { AmbientBackground } from "@/components/AmbientBackground";
import { ContactForm } from "@/components/ContactForm";
import { Header } from "@/components/Header";
import { MotionEffects } from "@/components/MotionEffects";
import { StackExplorer } from "@/components/StackExplorer";
import { ArrowUpRight, GithubIcon, LinkedinIcon, MailIcon } from "@/components/Icons";
import { ProjectRail } from "@/components/ProjectRail";
import { SectionHeading } from "@/components/SectionHeading";
import { TechIcon } from "@/components/TechIcons";
import { WordsThatHit } from "@/components/WordsThatHit";
import { education, roles, siteConfig } from "@/lib/content";
import animatedPortrait from "@/src/assets/animatedrajesh.png";

const principles = [
  ["01", "Product clarity", "I turn unclear requirements into focused flows that are easy to understand and maintain."],
  ["02", "Full-stack ownership", "I move comfortably from interface details to APIs, data models, real-time systems, and deployment."],
  ["03", "Useful AI", "I use AI where it improves a real workflow—not as decoration or a feature looking for a problem."],
] as const;

const signatureStack = ["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", "Docker", "Google Cloud Platform"];

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <MotionEffects />
      <Header />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content">
        <section id="home" className="hero page-section">
          <div className="hero-grid site-width">
            <div className="hero-content">
              <div className="availability"><i />{siteConfig.availability}</div>
              <p className="hero-eyebrow"><span>RAJESH R /</span> Developer &amp; AI product builder</p>
              <h1><span>I build things</span><em>that think.</em></h1>
              <p className="hero-intro">Thoughtful interfaces. Intelligent systems. I&apos;m Rajesh, a full-stack developer turning complex ideas into products people can actually use.</p>
              <div className="hero-actions">
                <a className="button" href="#work">Explore my work <ArrowUpRight /></a>
                <a className="text-link" href="#contact">Let&apos;s work together <ArrowUpRight /></a>
              </div>
              <div className="hero-proof" aria-label="Professional highlights">
                <div><strong>1+ year</strong><span>Product experience</span></div>
                <div><strong>3 featured</strong><span>Product builds</span></div>
                <div><strong>8.73</strong><span>Engineering OGPA</span></div>
              </div>
            </div>

            <div className="hero-portrait" data-spotlight>
              <div className="portrait-halo" aria-hidden="true" />
              <div className="portrait-orbit" aria-hidden="true"><i /><i /><i /></div>
              <div className="portrait-orbit orbit-outer" aria-hidden="true" />
              <span className="orbit-tech orbit-react" aria-label="React"><TechIcon name="React" /></span>
              <span className="orbit-tech orbit-python" aria-label="Python"><TechIcon name="Python" /></span>
              <span className="orbit-tech orbit-node" aria-label="Node.js"><TechIcon name="Node.js" /></span>
              <div className="portrait-frame">
                <Image src={animatedPortrait} alt="Illustrated portrait of Rajesh R" fill priority sizes="(max-width: 900px) 86vw, 430px" />
                <div className="portrait-scanline" aria-hidden="true" />
              </div>
              <div className="portrait-note"><span className="note-symbol" aria-hidden="true">✳</span><div><small>Currently building</small><strong>AI that makes work human.</strong></div></div>
              <div className="portrait-caption"><span><i /> Based in Tamil Nadu, India</span><span>Always curious ↗</span></div>
            </div>
          </div>
          <div className="hero-bottom site-width"><a href="#about"><span className="scroll-indicator" aria-hidden="true">↓</span>Scroll to explore</a><span>ENGINEERING × IMAGINATION</span><span>PORTFOLIO / 2026</span></div>
        </section>

        <div className="signature-stack site-width" aria-label="Core technologies"><span className="stack-label">Ideas, powered by</span><div>{signatureStack.map((name) => <span key={name}><TechIcon name={name} /><span>{name === "Google Cloud Platform" ? "Google Cloud" : name}</span></span>)}</div></div>

        <section id="about" className="page-section about-section">
          <div className="site-width">
            <SectionHeading label="01 / Behind the build" title="A curious mind. An engineer’s instinct." intro="I care about the whole experience: what the user sees, how the system behaves, and how confidently the product can be shipped." />
            <div className="principle-grid">
              {principles.map(([number, title, copy]) => (
                <article key={number} data-reveal={number === "02" ? "rise" : "unfold"} data-spotlight>
                  <span>{number} / THE APPROACH</span>
                  <div className={`principle-art principle-art-${number}`} aria-hidden="true">{number === "01" ? <><i /><i /><i /><b>Less friction.<br />More purpose.</b></> : number === "02" ? <><span>UI</span><i /><span>API</span><i /><span>DB</span></> : <><i /><span>✳</span><i /></>}</div>
                  <h3>{title}</h3><p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="page-section experience-section">
          <div className="site-width experience-layout">
            <div className="experience-aside"><SectionHeading label="02 / The journey" title="Real teams. Real products." intro="Building healthcare workflows and AI-assisted experiences, from the first internship to full-stack ownership." /><a className="company-product" href={siteConfig.carescribe} target="_blank" rel="noreferrer"><span>Product I help build</span><Image src="/company-logos/carescribe.png" alt="CareScribe" width={156} height={39} loading="eager" /><ArrowUpRight /></a></div>
            <div className="role-list">
              {roles.map((role, index) => (
                <article key={`${role.title}-${role.period}`} data-reveal="slide" data-spotlight>
                  <div className="role-number"><a href={role.website} target="_blank" rel="noreferrer" aria-label={`${role.company} website`} className="company-logo"><Image src={role.logo} alt={`${role.company} logo`} width={48} height={48} loading="eager" /></a><span>{String(index + 1).padStart(2, "0")}</span></div>
                  <div className="role-main">
                    <div className="role-period"><span>{role.period}</span>{index === 0 && <span className="current-role"><i />Current</span>}</div>
                    <div className="role-title"><h3>{role.title}</h3></div>
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
            <SectionHeading label="03 / Selected work" title="Built with intent. Made to be used." intro="A few things I’ve taken from a question to a working product. Explore the live experiences or look under the hood." />
            <ProjectRail />
          </div>
        </section>

        <section id="skills" className="page-section skills-section">
          <div className="site-width">
            <SectionHeading label="04 / The toolkit" title="The right tools. For the right problem." intro="Explore the technologies behind my interfaces, APIs, AI workflows, and deployments. A little curiosity goes a long way." />
            <StackExplorer />
          </div>
        </section>

        <section id="education" className="page-section education-section">
          <div className="site-width">
            <SectionHeading label="05 / Foundations" title="The learning never stops." />
            <div className="education-list">
              {education.map((item, index) => <article key={item.title} data-reveal="credential" style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}><span className="education-number">0{index + 1}</span><div><span>{item.period}</span><h3>{item.title}</h3><p>{item.institution}</p></div><strong>{item.score}</strong></article>)}
            </div>
          </div>
        </section>

        <WordsThatHit />

        <section id="contact" className="page-section contact-section">
          <div className="contact-orbits" aria-hidden="true"><i /><i /><i /></div>
          <div className="site-width">
            <SectionHeading label="07 / Your next idea" title="Let’s make something matter." intro="A full-stack role, an ambitious product, or an interesting problem. I’d love to hear what you’re thinking." />
            <div className="contact-grid" data-reveal="contact" data-spotlight>
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
