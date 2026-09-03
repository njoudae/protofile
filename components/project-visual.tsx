import { ArrowDown, ArrowRight, BarChart3, Check, FileText, Search, Sparkles } from "lucide-react";
import type { Project } from "@/data/portfolio";

export function ProjectVisual({ type, compact = false }: { type: Project["visual"]; compact?: boolean }) {
  return (
    <div className={`project-visual visual-${type} ${compact ? "is-compact" : ""}`} aria-hidden="true">
      {type === "workflow" ? <><div className="flow-node">Request</div><ArrowRight /><div className="flow-node accent">AI extract</div><ArrowRight /><div className="flow-node">Decision</div></> : null}
      {type === "document" ? <><div className="doc-card"><FileText /><span /><span /><span /></div><div className="scan-line" /><div className="verify-badge"><Check /> Verified</div></> : null}
      {type === "chat" ? <><div className="source-stack"><span /><span /><span /></div><Search /><ArrowRight /><div className="chat-bubble"><Sparkles /> Context-aware answer</div></> : null}
      {type === "analytics" ? <><div className="mini-kpi"><small>SENTIMENT</small><b>Signal map</b></div><BarChart3 /><div className="bars"><span /><span /><span /><span /></div></> : null}
      {type === "forecast" ? <><div className="forecast-label">Observed <ArrowDown size={14} /> Forecast</div><svg viewBox="0 0 400 130"><path d="M0 96 C35 82,54 102,91 68 S160 33,191 55 S250 94,284 52 S345 20,400 38"/><path className="dash" d="M0 103 C34 96,65 89,91 75 S158 48,192 59 S250 74,284 58 S344 38,400 43"/></svg></> : null}
    </div>
  );
}
