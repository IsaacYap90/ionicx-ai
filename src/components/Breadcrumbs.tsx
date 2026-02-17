"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const pathNames: Record<string, string> = {
  solutions: "nav.solutions",
  pricing: "nav.pricing",
  "case-studies": "nav.caseStudies",
  blog: "nav.blog",
  about: "nav.about",
  contact: "nav.contact",
  quiz: "nav.quiz",
  webinar: "nav.webinar",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const { t } = useLanguage();
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-4">
      <nav className="text-sm text-[var(--text-dim)] flex items-center gap-2">
        <Link href="/" className="hover:text-[#00d4ff] transition-colors">{t("nav.home")}</Link>
        {segments.map((seg, i) => (
          <span key={seg} className="flex items-center gap-2">
            <span className="text-[var(--card-border)]">/</span>
            {i === segments.length - 1 ? (
              <span className="text-[#00d4ff]">{t(pathNames[seg] || seg)}</span>
            ) : (
              <Link href={`/${segments.slice(0, i + 1).join("/")}`} className="hover:text-[#00d4ff] transition-colors">
                {t(pathNames[seg] || seg)}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
