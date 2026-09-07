"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";

const media = [
  { id: "Movie", label: "Movie", type: "image", src: "/movie-im.jpg", note: "Movie dataset analysis, including genre, rating, and revenue insights." },
  { id: "sales", label: "Sales", type: "image", src: "/data-sales.jpg", note: "Sales performance, order volume, categories, status, and territory analysis." },
  { id: "purchasing", label: "Purchasing", type: "image", src: "/data-purchasing.png", note: "Procurement requests, vendor activity, amount, and processing-time analysis." },
  { id: "University", label: "University", type: "image", src: "/data-students.jpg", note: "Student distribution, academic results, gender, university, and region analysis." },
  { id: "employees", label: "Employees", type: "image", src: "/emloyee-im.jpg", note: "An interactive employee analytics dashboard shown image." },
  { id: "Student", label: "Students", type: "image", src: "/student-im.jpg", note: "An interactive student analytics dashboard shown image." },
  { id: "Stack", label: "Stack", type: "image", src: "/stack-im.jpg", note: "An interactive stack analytics dashboard shown image." },
] as const;

export function AnalyticsGallery() {
  const { isArabic } = useLanguage();
  const arabicMedia = [
    { label: "الأفلام", note: "تحليل بيانات الأفلام، بما يشمل التصنيف والتقييم والإيرادات." },
    { label: "المبيعات", note: "تحليل أداء المبيعات وحجم الطلبات والفئات والحالات والمناطق." },
    { label: "المشتريات", note: "تحليل طلبات الشراء ونشاط الموردين والمبالغ ومدة المعالجة." },
    { label: "الجامعة", note: "تحليل توزيع الطلاب والنتائج الأكاديمية والجنس والجامعة والمنطقة." },
    { label: "الموظفون", note: "لوحة معلومات تفاعلية لتحليل بيانات الموظفين." },
    { label: "الطلاب", note: "لوحة معلومات تفاعلية لتحليل بيانات الطلاب." },
    { label: "Stack", note: "لوحة معلومات تفاعلية لتحليل بيانات Stack." },
  ];
  const [activeId, setActiveId] = useState<(typeof media)[number]["id"]>("sales");
  const active = media.find((item) => item.id === activeId) ?? media[0];
  const activeIndex = media.findIndex((item) => item.id === active.id);
  const localized = isArabic ? arabicMedia[activeIndex] : active;

  return (
    <div className="analytics-gallery">
      <div className="analytics-tabs" role="tablist" aria-label={isArabic ? "نماذج من مشاريع تحليل البيانات" : "Analytics portfolio samples"}>
        {media.map((item, index) => (
          <button
            key={item.id}
            id={`analytics-tab-${item.id}`}
            type="button"
            role="tab"
            data-kind={item.id}
            aria-selected={active.id === item.id}
            aria-controls="analytics-panel"
            onClick={() => setActiveId(item.id)}
          >
            {isArabic ? arabicMedia[index].label : item.label}
          </button>
        ))}
      </div>
      <div className="analytics-panel" id="analytics-panel" role="tabpanel" aria-labelledby={`analytics-tab-${active.id}`}>
        <div className="analytics-media" key={active.id}>
          {active.type === "image" ? (
            <Image src={active.src} alt={`${localized.label} analytics dashboard`} fill sizes="(max-width: 800px) 100vw, 60vw" />
          ) : (
            <video src={active.src} controls muted loop playsInline preload="metadata" aria-label="Employee analytics dashboard video" />
          )}
        </div>
        <div className="analytics-note"><strong>{isArabic ? `تحليل ${localized.label}` : `${localized.label} Analytics`}</strong><p>{localized.note}</p></div>
      </div>
    </div>
  );
}
