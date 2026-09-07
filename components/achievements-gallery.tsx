"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { useLanguage } from "@/components/language-provider";
import { achievementUi } from "@/data/i18n";
import { achievements } from "@/data/portfolio";

export function AchievementsGallery() {
  const { language } = useLanguage();
  const copy = achievementUi[language];
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
        {achievements.map((achievement, index) => {
          const localized = copy.items[index];

          return (
          <article className="achievement-item" key={achievement.title}>
            <button
              className="achievement-trigger"
              type="button"
              aria-haspopup="dialog"
              aria-label={`${copy.open} ${localized.title}`}
              onClick={() => setSelectedIndex(index)}
            >
              <span className="achievement-image">
                <Image
                  src={achievement.image}
                  alt={`${localized.title} - ${localized.award} - ${localized.event}`}
                  fill
                  sizes="(max-width: 800px) 100vw, 33vw"
                  style={{ objectPosition: achievement.imagePosition }}
                />
              </span>
              <span className="image-expand"><Maximize2 size={15} /> {copy.view}</span>
            </button>
            <div className="achievement-copy">
              <div><span>{localized.award}</span><time>{achievement.year}</time></div>
              <h3>{localized.title}</h3>
              <strong>{localized.event}</strong>
              <p>{localized.description}</p>
            </div>
          </article>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        className="achievement-dialog"
        aria-label={selected ? `${copy.open} ${copy.items[selectedIndex!].title}` : copy.viewer}
        onClose={() => setSelectedIndex(null)}
        onClick={closeOnBackdrop}
        onKeyDown={closeOnEscape}
      >
        {selected ? (
          <div className="dialog-panel">
            <button className="dialog-close" type="button" onClick={closeViewer} aria-label={copy.close}><X /></button>
            <div className="dialog-image">
              <Image src={selected.image} alt={`${copy.items[selectedIndex!].title} achievement`} fill sizes="95vw" />
            </div>
            <div className="dialog-caption"><strong>{copy.items[selectedIndex!].title}</strong><span>{copy.items[selectedIndex!].award} · {copy.items[selectedIndex!].event} · {selected.year}</span></div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
