"use client";

import Image from "next/image";
import { useState } from "react";

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
  const [activeId, setActiveId] = useState<(typeof media)[number]["id"]>("sales");
  const active = media.find((item) => item.id === activeId) ?? media[0];

  return (
    <div className="analytics-gallery">
      <div className="analytics-tabs" role="tablist" aria-label="Analytics portfolio samples">
        {media.map((item) => (
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
            {item.label}
          </button>
        ))}
      </div>
      <div className="analytics-panel" id="analytics-panel" role="tabpanel" aria-labelledby={`analytics-tab-${active.id}`}>
        <div className="analytics-media" key={active.id}>
          {active.type === "image" ? (
            <Image src={active.src} alt={`${active.label} analytics dashboard`} fill sizes="(max-width: 800px) 100vw, 60vw" />
          ) : (
            <video src={active.src} controls muted loop playsInline preload="metadata" aria-label="Employee analytics dashboard video" />
          )}
        </div>
        <div className="analytics-note"><strong>{active.label} Analytics</strong><p>{active.note}</p></div>
      </div>
    </div>
  );
}
