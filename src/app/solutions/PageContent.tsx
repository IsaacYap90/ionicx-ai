"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import Link from "next/link";

const solutions = [
  { icon: "🧠", features: 5 },
  { icon: "🌐", features: 5 },
  { icon: "🤖", features: 5 },
  { icon: "📊", features: 5 },
  { icon: "⚡", features: 5 },
];

export default function SolutionsPage() {
  const { t } = useLanguage();
  return (
    <>
      <Breadcrumbs />
      <Section className="py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            {t("solutions.page.title")} <span className="text-[#00d4ff]">{t("solutions.page.titleHighlight")}</span>
          </h1>
          <p className="text-center text-[var(--text-dim)] mb-16 max-w-2xl mx-auto text-lg">{t("solutions.page.desc")}</p>

          <div className="space-y-12">
            {solutions.map((sol, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="glass rounded-2xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="text-6xl">{sol.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3 text-[#00d4ff]">{t(`solutions.${i}.title`)}</h2>
                    <p className="text-[var(--text-dim)] mb-6 text-lg">{t(`solutions.detail.${i}.desc`)}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Array.from({ length: sol.features }).map((_, fi) => (
                        <div key={fi} className="flex items-start gap-2 text-sm">
                          <span className="text-[#00ff88] mt-0.5">✓</span>
                          <span className="text-[var(--text-dim)]">{t(`solutions.detail.${i}.feature.${fi}`)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/contact" className="inline-block px-8 py-4 rounded-full bg-[#00ff88] text-[#0a0a1a] font-bold text-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all hover:scale-105">
              {t("solutions.cta")}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
