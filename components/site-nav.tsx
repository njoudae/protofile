"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["About", "#about"], ["Expertise", "#expertise"], ["Research", "#research"], ["Projects", "#work"], ["Contact", "#contact"],
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Nejood Bin Eshaq, home">
        <span className="brand-crop"><Image src="/n-monogram.png" alt="" width={800} height={800} priority /></span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <a className="nav-download" href="/Nejood_AI_Engineer.pdf" download>Download CV</a>
      <button className="menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open ? (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="button button-dark" href="/Nejood_AI_Engineer.pdf" download>Download CV</a>
        </nav>
      ) : null}
    </header>
  );
}
