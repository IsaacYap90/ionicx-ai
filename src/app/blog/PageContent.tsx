"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import Link from "next/link";

const blogPosts = [
  { slug: "sg-smes-ai-2026", icon: "🚀", date: "2026-02-15", readTime: "5 min" },
  { slug: "eis-400-tax-deduction", icon: "💰", date: "2026-02-10", readTime: "7 min" },
  { slug: "10-industries-case-studies", icon: "🏢", date: "2026-02-05", readTime: "8 min" },
];

export default function BlogPage() {
  const { t } = useLanguage();
  return (
    <>
      <Breadcrumbs />
      <Section className="py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            {t("blog.title")} <span className="text-[#00d4ff]">{t("blog.titleHighlight")}</span>
          </h1>
          <p className="text-center text-[var(--text-dim)] mb-16 max-w-2xl mx-auto text-lg">{t("blog.desc")}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.div key={post.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link href={`/blog/${post.slug}`} className="block glass rounded-2xl p-6 hover:border-[#00d4ff]/30 transition-colors group h-full">
                  <div className="text-5xl mb-4">{post.icon}</div>
                  <div className="flex items-center gap-3 mb-3 text-xs text-[var(--text-dim)]">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime} {t("blog.read")}</span>
                  </div>
                  <h2 className="text-lg font-bold mb-3 group-hover:text-[#00d4ff] transition-colors">{t(`blog.${i}.title`)}</h2>
                  <p className="text-sm text-[var(--text-dim)]">{t(`blog.${i}.excerpt`)}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
