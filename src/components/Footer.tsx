"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t("nav.solutions"), href: "/solutions" },
    { label: t("nav.pricing"), href: "/pricing" },
    { label: t("nav.caseStudies"), href: "/case-studies" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.contact"), href: "/contact" },
    { label: t("nav.privacy"), href: "/privacy" },
    { label: t("nav.terms"), href: "/terms" },
  ];

  return (
    <footer className="border-t border-[var(--card-border)] px-6 py-16 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="text-xl font-bold font-[family-name:'Space_Grotesk'] mb-4">
            IonicX<span className="text-[#00d4ff]"> AI</span>
          </div>
          <p className="text-sm text-[var(--text-dim)] leading-relaxed mb-4">
            {t("footer.tagline")}
          </p>
          <div className="flex gap-3">
            <a href="https://wa.me/6580268821" target="_blank" rel="noopener noreferrer" className="glass rounded-full w-10 h-10 flex items-center justify-center text-lg hover:border-[#00ff88]/50 transition-colors">💬</a>
            <a href="mailto:hello@ionicx.ai" className="glass rounded-full w-10 h-10 flex items-center justify-center text-lg hover:border-[#00d4ff]/50 transition-colors">📧</a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-[#00d4ff]">{t("footer.siteMap")}</h4>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block text-sm text-[var(--text-dim)] hover:text-[#00d4ff] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-[#00d4ff]">{t("footer.contactInfo")}</h4>
          <div className="space-y-2 text-sm text-[var(--text-dim)]">
            <p>📧 hello@ionicx.ai</p>
            <p>💬 <a href="https://wa.me/6580268821" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">+65 8026 8821</a></p>
            <p>🇸🇬 Singapore</p>
            <p>UEN: 53518824B</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-[var(--card-border)] mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-[var(--text-dim)]">
          {t("footer.copyright")}
        </div>
        <div className="flex gap-6 text-xs text-[var(--text-dim)]">
          <Link href="/privacy" className="hover:text-[#00d4ff] transition-colors">{t("nav.privacy")}</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-[#00d4ff] transition-colors">{t("nav.terms")}</Link>
        </div>
      </div>
    </footer>
  );
}
