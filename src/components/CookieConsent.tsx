"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (!localStorage.getItem("ionicx-cookies")) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9997] glass border-t border-[var(--card-border)] px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--text-dim)]">{t("cookies.message")}</p>
        <button
          onClick={() => { localStorage.setItem("ionicx-cookies", "accepted"); setShow(false); }}
          className="px-6 py-2 rounded-full bg-[#00d4ff] text-[#0a0a1a] font-semibold text-sm whitespace-nowrap"
        >
          {t("cookies.accept")}
        </button>
      </div>
    </div>
  );
}
