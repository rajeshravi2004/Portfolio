"use client";

import { useState } from "react";
import { techGroups } from "@/lib/content";
import { TechGroupIcon, TechIcon } from "@/components/TechIcons";

export function StackExplorer() {
  const [active, setActive] = useState(0);
  const group = techGroups[active];

  return (
    <div className="stack-explorer" data-reveal="stack" data-spotlight>
      <div className="stack-categories" role="group" aria-label="Technology categories">
        {techGroups.map((item, index) => (
          <button key={item.name} type="button" aria-pressed={active === index} aria-controls="stack-panel" onClick={() => setActive(index)}>
            <TechGroupIcon index={index} /><span>{item.name}</span><small>{String(item.items.length).padStart(2, "0")}</small>
          </button>
        ))}
      </div>
      <div className="stack-panel" id="stack-panel" role="region" aria-labelledby="stack-title">
        <div className="stack-panel-heading"><span className="section-kicker">The toolkit / {String(active + 1).padStart(2, "0")}</span><span>{group.items.length} technologies</span></div>
        <h3 id="stack-title">{group.name}</h3>
        <div className="stack-tiles" key={active}>
          {group.items.map((item, index) => (
            <div className="stack-tile" key={item} style={{ animationDelay: `${index * 24}ms` }}><TechIcon name={item} /><span>{item}</span></div>
          ))}
        </div>
        <p className="stack-note"><span aria-hidden="true">↳</span> From the first interface to the infrastructure behind it.</p>
      </div>
      <noscript><style>{".stack-categories,.stack-panel{display:none}"}</style><div className="stack-static">{techGroups.map((item) => <section key={item.name}><h3>{item.name}</h3><div className="capability-list">{item.items.map((name) => <span key={name}><TechIcon name={name} />{name}</span>)}</div></section>)}</div></noscript>
    </div>
  );
}
