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
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <nav className="fixed top-[36px] left-0 right-0 z-50 border-b border-[var(--card-border)] bg-[#0b1020]/95 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
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
          <a
            href="https://wa.me/6580268821"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-shadow"
          >
            {t("nav.whatsapp")}
          </a>
        </div>
        <div className="flex lg:hidden items-center gap-3">
          <LangToggle />
          <button className="text-[#00d4ff] text-2xl" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-[var(--card-border)] bg-[#0b1020]/98 backdrop-blur-xl px-6 pb-4">
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
          <a
            href="https://wa.me/6580268821"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block py-3 text-[#25D366] font-semibold"
          >
            {t("nav.whatsapp")}
          </a>
        </div>
      )}
    </nav>
  );
}
