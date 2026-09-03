import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "./project-visual";
import type { Project } from "@/data/portfolio";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`project-card ${featured ? "featured" : ""}`}>
      <ProjectVisual type={project.visual} />
      <div className="project-copy">
        <div className="project-meta"><span>{project.number}</span><span>{project.category}</span></div>
        <h3>{project.title}</h3>
        <p>{project.statement}</p>
        <div className="tag-row">{project.tools.slice(0, 4).map((tool) => <span className="tag" key={tool}>{tool}</span>)}</div>
        <Link className="text-link" href={`/projects/${project.slug}`}>View case study <ArrowUpRight size={16} /></Link>
      </div>
    </article>
  );
}
