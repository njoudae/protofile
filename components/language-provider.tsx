"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "ar";

type LanguageContextValue = {
  language: Language;
  isArabic: boolean;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const hasRestoredPreference = useRef(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language");
    if (savedLanguage === "ar" || savedLanguage === "en") {
      const restoreLanguage = window.setTimeout(
        () => {
          hasRestoredPreference.current = true;
          setLanguage(savedLanguage);
        },
        0
      );

      return () => window.clearTimeout(restoreLanguage);
    }

    hasRestoredPreference.current = true;
  }, []);

  useEffect(() => {
    if (!hasRestoredPreference.current) return;

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      isArabic: language === "ar",
      toggleLanguage: () =>
        setLanguage((current) => (current === "en" ? "ar" : "en")),
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider.");
  }

  return context;
}
