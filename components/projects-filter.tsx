"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Cloud } from "lucide-react";
import { AnalyticsGallery } from "@/components/analytics-gallery";
import { useLanguage } from "@/components/language-provider";
import { projectUi } from "@/data/i18n";

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
  const { language } = useLanguage();
  const copy = projectUi[language];
  const [activeCategory, setActiveCategory] =
    useState<Category>("AI Engineering");

  return (
    <>
      <div className="project-filter">
        {categories.map((category, index) => (
          <button
            key={category}
            type="button"
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {copy.categories[index]}
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
                  <span>{language === "ar" ? "ذكاء اصطناعي · رؤية حاسوبية" : "AI · Computer Vision"}</span>
                </div>

                <h3>
                  <a
                    className="project-title-link"
                    href="https://musir-asir-apps.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {language === "ar" ? "مسير (MVP)" : "Musir (MVP)"} <ArrowUpRight aria-hidden="true" />
                  </a>
                </h3>

                <p>
                  {copy.musir}
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

                <h3>{language === "ar" ? "يقظة" : "Yaqadah"}</h3>

                <p>
                  {copy.yaqadha}
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

                <h3>{language === "ar" ? "المواقف الذكية" : "Smart Parking"}</h3>

                <p>
                  {copy.smartParking}
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
                <video
                  className="project-demo-video"
                  src="/hr-assistant-demo.mp4"
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="HR Assistant project demonstration"
                />
              </div>

              <div className="project-details">
                <div className="project-kicker">
                  <span>04</span>
                  <span>{language === "ar" ? "نظام RAG · مساعد محادثة" : "RAG System · Chatbot"}</span>
                </div>

                <h3>{language === "ar" ? "مساعد الموارد البشرية" : "HR Assistant"}</h3>

                <p>
                  {copy.hr}
                </p>

                <div className="tag-row">
                  <span className="tag">RAG</span>
                  <span className="tag">Chatbot</span>
                  <span className="tag">Natural Language Processing</span>
                  <span className="tag">OCR</span>
                </div>
              </div>
            </article>

            <article className="project-case portfolio-rag-case">
              <div className="project-media portfolio-rag-media">
                <video
                  className="project-demo-video"
                  src="/portfolio-rag-demo.mp4"
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Bilingual portfolio RAG assistant demonstration"
                />
              </div>

              <div className="project-details">
                <div className="project-kicker">
                  <span>05</span>
                  <span>{language === "ar" ? "RAG · مساعد ملف الأعمال" : "RAG · Portfolio Assistant"}</span>
                </div>

                <h3>{language === "ar" ? "مساعد ملف الأعمال بتقنية RAG" : "Portfolio RAG Assistant"}</h3>

                <p>
                  {copy.portfolio}
                </p>

                <div className="tag-row">
                  <span className="tag">RAG</span>
                  <span className="tag">BGE-M3</span>
                  <span className="tag">Vector Search</span>
                  <span className="tag">LLMs</span>
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
                <span>{language === "ar" ? "بيانات · لوحات معلومات" : "Data · Dashboards"}</span>
              </div>

              <h3>{copy.analyticsTitle}</h3>

              <p>{copy.analytics}</p>

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
          <KitchenProject language={language} />
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
                  <small>{copy.automationSteps[0]}</small>
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
                  <small>{copy.automationSteps[1]}</small>
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
                  <strong>{language === "ar" ? "إنشاء لوحة المعلومات" : "Generate Dashboard"}</strong>
                  <small>{copy.automationSteps[2]}</small>
                </div>

                <div className="automation-step onedrive-step">
                  <span className="step-logo">
                    <Cloud aria-hidden="true" />
                  </span>
                  <strong>OneDrive</strong>
                  <small>{copy.automationSteps[3]}</small>
                </div>
              </div>
            </div>

            <div className="project-details">
              <div className="project-kicker">
                <span>01</span>
                <span>{language === "ar" ? "أتمتة · تقارير" : "Automation · Reporting"}</span>
              </div>

              <h3>{copy.automationTitle}</h3>

              <p>{copy.automation}</p>

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
                    unoptimized
                  />
                </div>
              </div>

              <div className="project-details">
                <div className="project-kicker">
                  <span>01</span>
                  <span>{language === "ar" ? "تطوير · منتج" : "Development · Product"}</span>
                </div>

                <h3>
                  <a
                    className="project-title-link"
                    href="https://project-nqtm4.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {language === "ar" ? "سكنها" : "Sakanha"} <ArrowUpRight aria-hidden="true" />
                  </a>
                </h3>

                <p>{copy.sakanha}</p>

                <div className="tag-row">
                  <span className="tag">Web Platform</span>
                  <span className="tag">Product Design</span>
                  <span className="tag">Real Estate</span>
                </div>
              </div>
            </article>

            <KitchenProject language={language} />
          </>
        )}

      </div>
    </>
  );
}

function KitchenProject({ language }: { language: "en" | "ar" }) {
  const copy = projectUi[language];

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
          <span>{language === "ar" ? "تحليل أعمال · تطبيق جوال" : "Business Analysis · Mobile Application"}</span>
        </div>

        <h3>{copy.kitchenTitle}</h3>

        <p>{copy.kitchen}</p>

        <p className="project-progress">
          <s>{copy.kitchenProgress[0]}</s> → <s>{copy.kitchenProgress[1]}</s> →{" "}
          <s>{copy.kitchenProgress[2]}</s> →{" "}
          <s>{copy.kitchenProgress[3]}</s> → {copy.kitchenProgress[4]}
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
