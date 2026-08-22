"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CloseIcon, GithubIcon, LinkedinIcon, MailIcon, MenuIcon, MoonIcon, SunIcon } from "@/components/Icons";
import { siteConfig } from "@/lib/content";

const nav = [
  ["About", "about"], ["Experience", "experience"], ["Stack", "skills"], ["Work", "work"], ["Contact", "contact"],
] as const;

type Theme = "light" | "dark";

export function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Rajesh R, home">Rajesh<span>.</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <button
          className="theme-toggle"
          type="button"
          onClick={() => {
            const nextTheme: Theme = theme === "light" ? "dark" : "light";
            document.documentElement.dataset.theme = nextTheme;
            localStorage.setItem("portfolio-theme", nextTheme);
            setTheme(nextTheme);
          }}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>
        <div className="socials compact" aria-label="Social links">
          <a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
          <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
          <a href={`mailto:${siteConfig.email}`} aria-label="Email"><MailIcon /></a>
        </div>
        <a className="button button-small desktop-talk" href="#contact">Let&apos;s talk <ArrowUpRight /></a>
        <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation menu" : "Open navigation menu"}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {nav.map(([label, id], index) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</a>)}
        </nav>
        <a className="button" href="#contact" onClick={() => setOpen(false)}>Let&apos;s work together <ArrowUpRight /></a>
      </div>
    </header>
  );
}
