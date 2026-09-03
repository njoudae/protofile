"use client";

import { useState } from "react";
import { expertise } from "@/data/portfolio";

export function ExpertiseTabs() {
  const [active, setActive] = useState(expertise[0].id);
  const selected = expertise.find((item) => item.id === active) ?? expertise[0];
  return (
    <div className="expertise-system">
      <div className="expertise-nav" role="tablist" aria-label="Expertise areas">
        {expertise.map((item) => (
          <button key={item.id} id={`tab-${item.id}`} type="button" role="tab" aria-selected={active === item.id} aria-controls={`panel-${item.id}`} onClick={() => setActive(item.id)}>
            <span>{item.number}</span>{item.title}
          </button>
        ))}
      </div>
      <div className="expertise-panel" role="tabpanel" id={`panel-${selected.id}`} aria-labelledby={`tab-${selected.id}`} key={selected.id}>
        <p className="eyebrow">{selected.number} / {selected.title}</p>
        <h3>{selected.statement}</h3>
        <div className="expertise-columns">
          <div><p className="micro-label">Capability</p>{selected.capabilities.map((item) => <span className="line-item" key={item}>{item}</span>)}</div>
          <div><p className="micro-label">Tools</p><div className="tag-row">{selected.tools.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div>
          <div><p className="micro-label">Evidence</p>{selected.evidence.map((item) => <span className="evidence-item" key={item}>{item}</span>)}</div>
        </div>
      </div>
    </div>
  );
}
