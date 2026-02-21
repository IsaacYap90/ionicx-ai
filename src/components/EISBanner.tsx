"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function EISBanner() {
  const { t } = useLanguage();
  return (
    <div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 border-b border-[#00d4ff]/20">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-sm">
        <span className="text-[#00ff88] font-semibold">💰</span>
        <span className="text-white/90">
          {t("banner.eis")}
        </span>
        <Link href="/pricing#eis-calculator" className="text-[#00d4ff] font-semibold hover:underline ml-1">
          {t("banner.eisCta")} →
        </Link>
      </div>
    </div>
  );
}
