import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { projects } from "@/data/portfolio";
import { ProjectsFilter } from "@/components/projects-filter";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: project.title, description: project.statement } : {};
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return (
    <main className="case-page">
      <header className="case-nav shell"><Link href="/#work"><ArrowLeft size={17} /> Back to selected work</Link><span>Nejood A. Bin Eshaq</span></header>
      <section className="case-hero shell"><div><p className="eyebrow">{project.number} / {project.category}</p><h1>{project.title}</h1><p>{project.statement}</p></div><ProjectVisual type={project.visual} /></section>
      <section className="case-body shell">
        <aside><span>Case study framework</span><p>Detailed screenshots, role notes, and links can be added when source material is available.</p></aside>
        <div className="case-sections">
          <article><span>01</span><h2>Problem</h2><p>{project.problem}</p></article>
          <article><span>02</span><h2>Approach</h2><p>{project.approach}</p></article>
          <article><span>03</span><h2>Value</h2><p>{project.value}</p></article>
          <article><span>04</span><h2>Technology</h2><div className="tag-row">{project.tools.map((tool) => <span className="tag" key={tool}>{tool}</span>)}</div></article>
          <article className="missing-assets"><span>05</span><h2>Project assets</h2><p>[Project screenshots needed]</p><p>[Repository or live demo URL needed]</p><p>[Detailed role and lessons learned needed]</p></article>
        </div>
      </section>
      <footer className="case-footer shell"><Link href="/#work">Explore all work <ArrowUpRight size={16} /></Link></footer>
    </main>
  );
}
