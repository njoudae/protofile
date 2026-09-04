"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Cloud } from "lucide-react";
import { AnalyticsGallery } from "@/components/analytics-gallery";

type Category =
  | "AI Engineering"
  | "Data Analysis"
  | "Business Analysis"
  | "Automation"
  | "Development";

const categories: Category[] = [
  "AI Engineering",
  "Data Analysis",
  "Business Analysis",
  "Automation",
  "Development",
];

export function ProjectsFilter() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("AI Engineering");

  return (
    <>
      <div className="project-filter">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="projects-showcase">

        {activeCategory === "AI Engineering" && (
          <>
            <article className="project-case musir-case">
              <div className="project-media musir-workflow-media">
                <Image
                  src="/musir-workflow.jpg"
                  alt="Musir smart truck transit management workflow"
                  width={1672}
                  height={939}
                  sizes="(max-width: 800px) 100vw, 58vw"
                />
              </div>

              <div className="project-details">
                <div className="project-kicker">
                  <span>01</span>
                  <span>AI · Computer Vision</span>
                </div>

                <h3>
                  <a
                    className="project-title-link"
                    href="https://musir-asir-apps.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Musir (MVP) <ArrowUpRight aria-hidden="true" />
                  </a>
                </h3>

                <p>
                  A mobile document-verification system for truck drivers.
                  Musir uses computer vision and OCR to extract document
                  information, support identity validation, and reduce manual
                  verification steps.
                </p>

                <div className="tag-row">
                  <span className="tag">Computer Vision</span>
                  <span className="tag">OCR</span>
                  <span className="tag">Mobile Application</span>
                  <span className="tag">1st Place</span>
                </div>
              </div>
            </article>

            <article className="project-case project-reverse yaqadha-case">
              <div className="project-media yaqadah-media">
                <div className="yaqadah">
                  <Image
                    src="/yaq1.jpg"
                    alt="Yaqadah project"
                    fill
                    sizes="(max-width: 800px) 100vw, 58vw"
                    unoptimized
                  />
                </div>
              </div>

              <div className="project-details">
                <div className="project-kicker">
                  <span>02</span>
                  <span>YOLO · CV</span>
                </div>

                <h3>Yaqadah</h3>

                <p>
                  Computer vision system for analyzing children's drawings and detecting emotions such as happiness, sadness, and anger using YOLO.
                </p>

                <div className="tag-row">
                  <span className="tag">Computer Vision</span>
                  <span className="tag">Image Analysis</span>
                  <span className="tag">2nd Place</span>
                </div>
              </div>
            </article>

            <article className="project-case smartparking-case">
              <div className="project-media smartparking-media">
                <div className="smartparking">
                  <Image
                    src="/smart.gif"
                    alt="Smart Parking project"
                    fill
                    sizes="(max-width: 800px) 100vw, 58vw"
                    unoptimized
                  />
                </div>
              </div>

              <div className="project-details">
                <div className="project-kicker">
                  <span>03</span>
                  <span>Deep Learning · CNN</span>
                </div>

                <h3>Smart Parking</h3>

                <p>
                  Deep Learning system for analyzing parking space availability and optimizing parking lot utilization using CNN.
                </p>

                <div className="tag-row">
                  <span className="tag">Computer Vision</span>
                  <span className="tag">Image Processing</span>
                  <span className="tag">Graduate Project</span>
                </div>
              </div>
            </article>

            <article className="project-case project-reverse hr-case">
              <div className="project-media hr-media">
                <div className="hr-rag">
                  <Image
                    src="/hr-page.png"
                    alt="HR Assistant"
                    fill
                    sizes="(max-width: 800px) 100vw, 58vw"
                    unoptimized
                  />
                </div>
              </div>

              <div className="project-details">
                <div className="project-kicker">
                  <span>04</span>
                  <span>RAG System · Chatbot</span>
                </div>

                <h3>HR Assistant</h3>

                <p>
                  A RAG-based HR assistant designed to retrieve relevant
                  information and provide context-grounded responses through a
                  conversational interface.
                </p>

                <div className="tag-row">
                  <span className="tag">RAG</span>
                  <span className="tag">Chatbot</span>
                  <span className="tag">Natural Language Processing</span>
                  <span className="tag">OCR</span>
                </div>
              </div>
            </article>
          </>
        )}

        {activeCategory === "Data Analysis" && (
          <article className="project-case analytics-project">
            <AnalyticsGallery />

            <div className="project-details">
              <div className="project-kicker">
                <span>01</span>
                <span>Data · Dashboards</span>
              </div>

              <h3>Analytics Portfolio</h3>

              <p>
                A data analytics portfolio covering data collection, cleaning,
                transformation, analysis, KPI definition, dashboard development,
                and decision-ready reporting.
              </p>

              <div className="tag-row">
                <span className="tag">Data Analysis</span>
                <span className="tag">Dashboard</span>
                <span className="tag">Power BI</span>
                <span className="tag">Excel</span>
                <span className="tag">KPI</span>
              </div>
            </div>
          </article>
        )}

        {activeCategory === "Business Analysis" && (
          <KitchenProject />
        )}

        {activeCategory === "Automation" && (
          <article className="project-case project-reverse automation-case">
            <div
              className="project-media automation-media"
              role="img"
              aria-label="Excel automation workflow"
            >
              <div className="automation-flow">
                <div className="automation-step automate-step">
                  <span className="step-logo">
                    <Image
                      src="/workflow-logos/power-automate.svg"
                      alt="Power Automate"
                      width={96}
                      height={96}
                    />
                  </span>
                  <strong>Power Automate</strong>
                  <small>Runs the automated workflow on schedule.</small>
                </div>

                <div className="automation-step excel-step">
                  <span className="step-logo">
                    <Image
                      src="/workflow-logos/excel.svg"
                      alt="Excel"
                      width={96}
                      height={96}
                    />
                  </span>
                  <strong>Excel Sheets</strong>
                  <small>Extracts and processes data from multiple files.</small>
                </div>

                <div className="automation-step dashboard-step">
                  <span className="step-logo">
                    <Image
                      src="/workflow-logos/power-bi.svg"
                      alt="Power BI"
                      width={96}
                      height={96}
                    />
                  </span>
                  <strong>Generate Dashboard</strong>
                  <small>Creates the dashboard and structured report.</small>
                </div>

                <div className="automation-step onedrive-step">
                  <span className="step-logo">
                    <Cloud aria-hidden="true" />
                  </span>
                  <strong>OneDrive</strong>
                  <small>Saves the generated reports automatically.</small>
                </div>
              </div>
            </div>

            <div className="project-details">
              <div className="project-kicker">
                <span>01</span>
                <span>Automation · Reporting</span>
              </div>

              <h3>Excel to Dashboard Automation</h3>

              <p>
                An end-to-end reporting workflow that consolidates Excel data,
                generates dashboards, and automatically distributes reports.
              </p>

              <div className="tag-row">
                <span className="tag">Excel</span>
                <span className="tag">Power BI</span>
                <span className="tag">Power Automation</span>
              </div>
            </div>
          </article>
        )}

        {activeCategory === "Development" && (
          <>
            <article className="project-case sakanha-case">
              <div className="project-media sakanha-media">
                <div className="sakanha-gif-frame">
                  <Image
                    src="/sakanha-home-scroll.gif"
                    alt="Sakanha homepage"
                    fill
                    sizes="(max-width: 800px) 100vw, 58vw"
                  />
                </div>
              </div>

              <div className="project-details">
                <div className="project-kicker">
                  <span>01</span>
                  <span>Development · Product</span>
                </div>

                <h3>
                  <a
                    className="project-title-link"
                    href="https://project-nqtm4.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Sakanha <ArrowUpRight aria-hidden="true" />
                  </a>
                </h3>

                <p>
                  A real-estate web platform developed through an AI-assisted
                  workflow, translating a product concept into a working digital
                  experience.
                </p>

                <div className="tag-row">
                  <span className="tag">Web Platform</span>
                  <span className="tag">Product Design</span>
                  <span className="tag">Real Estate</span>
                </div>
              </div>
            </article>

            <KitchenProject />
          </>
        )}

      </div>
    </>
  );
}

function KitchenProject() {
  return (
    <article className="project-case project-reverse kitchen-case">
      <div className="project-media kitchen-media">
        <div className="kitchen-preview">
          <Image
            src="/kitchen.png"
            alt="Kitchen Production Management"
            fill
            sizes="(max-width: 800px) 100vw, 58vw"
            unoptimized
          />
        </div>
      </div>

      <div className="project-details">
        <div className="project-kicker">
          <span>01</span>
          <span>Business Analysis · Mobile Application</span>
        </div>

        <h3>Kitchen Production Management</h3>

        <p>
          A production management system designed to digitize kitchen
          operations, streamline order and production workflows, and coordinate
          activities across production managers, drivers, supervisors, and
          administrators.
        </p>

        <p className="project-progress">
          <s>Business Analysis</s> → <s>Requirements Analysis</s> →{" "}
          <s>Use Cases & Workflow Design</s> →{" "}
          <s>UI/UX Design (Figma)</s> → Development
        </p>

        <div className="tag-row">
          <span className="tag">Business Analysis</span>
          <span className="tag">Figma</span>
          <span className="tag">Requirements Analysis</span>
          <span className="tag">Full Stack Development</span>
        </div>
      </div>
    </article>
  );
}