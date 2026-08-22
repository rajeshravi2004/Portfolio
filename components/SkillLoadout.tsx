"use client";

import { useEffect, useRef, useState } from "react";
import { skills } from "@/lib/content";
import { TechIcon } from "@/components/TechIcons";

export function SkillLoadout() {
  const root = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoaded(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} className={`skill-grid ${loaded ? "loaded" : ""}`}>
      {skills.map((group, groupIndex) => (
        <section className="skill-group" key={group.name}>
          <div className="skill-group-title"><span>0{groupIndex + 1}</span><h3>{group.name}</h3></div>
          <div className="skill-list">
            {group.items.map(([name, value]) => (
              <div className="skill" key={name}>
                <div className="skill-label"><span><TechIcon name={name} />{name}</span><b>{value}%</b></div>
                <div className="xp-track" role="meter" aria-label={`${name} proficiency`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
                  <i style={{ "--xp": `${value}%` } as React.CSSProperties} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
