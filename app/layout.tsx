import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Nejood A. Bin Eshaq | AI Engineer & Researcher", template: "%s | Nejood A. Bin Eshaq" },
  description: "AI engineering, research, automation, and analytics portfolio of Nejood A. Bin Eshaq.",
};

export const viewport: Viewport = { themeColor: "#0B1930", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
