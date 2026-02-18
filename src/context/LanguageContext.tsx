"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import enDefaults from "../../public/locales/en.json";

type Lang = "en" | "zh";
type Translations = Record<string, string>;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => (enDefaults as Translations)[key] || key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [translations, setTranslations] = useState<Translations>(enDefaults as Translations);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("ionicx-lang", l);
  };

  useEffect(() => {
    const saved = localStorage.getItem("ionicx-lang") as Lang | null;
    if (saved === "en" || saved === "zh") setLangState(saved);
  }, []);

  useEffect(() => {
    if (lang === "en") {
      setTranslations(enDefaults as Translations);
      return;
    }
    fetch(`/locales/${lang}.json`)
      .then((r) => r.json())
      .then(setTranslations)
      .catch(() => setTranslations(enDefaults as Translations));
  }, [lang]);

  const t = (key: string) => translations[key] || (enDefaults as Translations)[key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
