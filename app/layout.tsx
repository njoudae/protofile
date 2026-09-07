import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

const arabicMedium = localFont({
  src: "./fonts/Elgharib-Tajarib-Taweel-Medium.otf",
  variable: "--font-arabic-medium",
  weight: "500",
  display: "swap",
});

const arabicBold = localFont({
  src: "./fonts/Elgharib-Tajarib-Taweel-Bold.otf",
  variable: "--font-arabic-bold",
  weight: "700",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Nejood A. Bin Eshaq | AI Engineer & Researcher", template: "%s | Nejood A. Bin Eshaq" },
  description: "AI engineering, research, automation, and analytics portfolio of Nejood A. Bin Eshaq.",
};

export const viewport: Viewport = { themeColor: "#0B1930", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${arabicMedium.variable} ${arabicBold.variable}`}>
      <body><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
