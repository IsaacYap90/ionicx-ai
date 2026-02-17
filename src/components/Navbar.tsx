"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

function LangToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <button
      onClick={() => setLang(lang === "en" ? "zh" : "en")}
      className="px-3 py-1.5 rounded-full glass text-xs font-semibold tracking-wide transition-colors hover:border-[#00d4ff]/50"
      aria-label="Toggle language"
    >
      <span className={lang === "en" ? "text-[#00d4ff]" : "text-[var(--text-dim)]"}>EN</span>
      <span className="text-[var(--text-dim)] mx-1">|</span>
      <span className={lang === "zh" ? "text-[#00d4ff]" : "text-[var(--text-dim)]"}>中文</span>
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();

  const links = [
    { label: t("nav.solutions"), href: "/solutions" },
    { label: t("nav.pricing"), href: "/pricing" },
    { label: t("nav.caseStudies"), href: "/case-studies" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--card-border)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold font-[family-name:'Space_Grotesk'] relative z-10 cursor-pointer py-2 pr-4" onClick={() => setOpen(false)}>
          IonicX<span className="text-[#00d4ff]"> AI</span>
        </Link>
        <div className="hidden lg:flex gap-6 items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "text-[#00d4ff]"
                  : "text-[var(--text-dim)] hover:text-[#00d4ff]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LangToggle />
          <Link
            href="/contact"
            className="px-5 py-2 rounded-full bg-[#00ff88] text-[#0a0a1a] font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-shadow"
          >
            {t("nav.getStarted")}
          </Link>
        </div>
        <div className="flex lg:hidden items-center gap-3">
          <LangToggle />
          <button className="text-[#00d4ff] text-2xl" onClick={() => setOpen(!open)}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden glass border-t border-[var(--card-border)] px-6 pb-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block py-3 transition-colors ${
                pathname === link.href ? "text-[#00d4ff]" : "text-[var(--text-dim)] hover:text-[#00d4ff]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/quiz"
            onClick={() => setOpen(false)}
            className="block py-3 text-[#00ff88] font-semibold"
          >
            {t("nav.freeQuiz")}
          </Link>
        </div>
      )}
    </nav>
  );
}
