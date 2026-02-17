"use client";

import { useLanguage } from "@/context/LanguageContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import Link from "next/link";
import { use } from "react";

const postIndex: Record<string, number> = {
  "sg-smes-ai-2026": 0,
  "eis-400-tax-deduction": 1,
  "10-industries-case-studies": 2,
};

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t } = useLanguage();
  const idx = postIndex[slug];

  if (idx === undefined) {
    return (
      <Section className="py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <Link href="/blog" className="text-[#00d4ff] hover:underline">← Back to Blog</Link>
      </Section>
    );
  }

  // Blog content sections (stored as translation keys for bilingual support)
  const sections = 5;

  return (
    <>
      <Breadcrumbs />
      <Section className="py-16">
        <article className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-[#00d4ff] text-sm hover:underline mb-6 block">← {t("blog.backToList")}</Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t(`blog.${idx}.title`)}</h1>
          <div className="flex items-center gap-3 mb-8 text-sm text-[var(--text-dim)]">
            <span>IonicX AI</span>
            <span>•</span>
            <span>February 2026</span>
          </div>
          <div className="prose-dark space-y-6">
            {Array.from({ length: sections }).map((_, si) => (
              <div key={si}>
                {si > 0 && <h2 className="text-xl font-bold text-[#00d4ff] mb-3 mt-8">{t(`blog.${idx}.h.${si}`)}</h2>}
                <p className="text-[var(--text-dim)] leading-relaxed">{t(`blog.${idx}.p.${si}`)}</p>
              </div>
            ))}
          </div>
          <div className="glass rounded-2xl p-8 mt-12 text-center">
            <h3 className="text-xl font-bold mb-3">{t("blog.cta.title")}</h3>
            <p className="text-[var(--text-dim)] mb-6">{t("blog.cta.desc")}</p>
            <Link href="/contact" className="inline-block px-8 py-3 rounded-full bg-[#00ff88] text-[#0a0a1a] font-bold hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all">
              {t("blog.cta.button")}
            </Link>
          </div>
        </article>
      </Section>
    </>
  );
}
