"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { achievements } from "@/data/portfolio";

export function AchievementsGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selected = selectedIndex === null ? null : achievements[selectedIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedIndex !== null && dialog && !dialog.open) dialog.showModal();
  }, [selectedIndex]);

  function closeViewer() {
    dialogRef.current?.close();
  }

  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closeViewer();
  }

  function closeOnEscape(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeViewer();
    }
  }

  return (
    <>
      <div className="achievements-card">
        {achievements.map((achievement, index) => (
          <article className="achievement-item" key={achievement.title}>
            <button
              className="achievement-trigger"
              type="button"
              aria-haspopup="dialog"
              aria-label={`Open full image for ${achievement.title}`}
              onClick={() => setSelectedIndex(index)}
            >
              <span className="achievement-image">
                <Image
                  src={achievement.image}
                  alt={`${achievement.title} - ${achievement.award} at ${achievement.event}`}
                  fill
                  sizes="(max-width: 800px) 100vw, 33vw"
                  style={{ objectPosition: achievement.imagePosition }}
                />
              </span>
              <span className="image-expand"><Maximize2 size={15} /> View full image</span>
            </button>
            <div className="achievement-copy">
              <div><span>{achievement.award}</span><time>{achievement.year}</time></div>
              <h3>{achievement.title}</h3>
              <strong>{achievement.event}</strong>
              <p>{achievement.description}</p>
            </div>
          </article>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="achievement-dialog"
        aria-label={selected ? `Full image for ${selected.title}` : "Achievement image viewer"}
        onClose={() => setSelectedIndex(null)}
        onClick={closeOnBackdrop}
        onKeyDown={closeOnEscape}
      >
        {selected ? (
          <div className="dialog-panel">
            <button className="dialog-close" type="button" onClick={closeViewer} aria-label="Close full image"><X /></button>
            <div className="dialog-image">
              <Image src={selected.image} alt={`${selected.title} achievement`} fill sizes="95vw" />
            </div>
            <div className="dialog-caption"><strong>{selected.title}</strong><span>{selected.award} · {selected.event} · {selected.year}</span></div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
