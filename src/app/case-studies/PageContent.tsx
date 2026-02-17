"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";

const caseStudies = [
  { icon: "🧁", url: "https://baker-demo.vercel.app", tier: "Starter", tierColor: "#00ff88" },
  { icon: "🧘", url: "https://fabthestretchlad.vercel.app", tier: "Starter-Growth", tierColor: "#00d4ff" },
  { icon: "🎨", url: "https://tattbylyds.vercel.app", tier: "Starter", tierColor: "#00ff88" },
  { icon: "🏠", url: "https://id-demo-two.vercel.app", tier: "Enterprise", tierColor: "#FFD700" },
  { icon: "☕", url: "https://kopitiam-demo.vercel.app", tier: "Growth", tierColor: "#00d4ff" },
  { icon: "🌿", url: "https://wellness-demo-phi.vercel.app", tier: "Enterprise", tierColor: "#FFD700" },
  { icon: "💪", url: "https://gym-demo-beta-sepia.vercel.app", tier: "Growth-Enterprise", tierColor: "#00d4ff" },
  { icon: "💒", url: "https://wedding-demo-theta.vercel.app", tier: "Enterprise", tierColor: "#FFD700" },
  { icon: "✨", url: "https://beauty-demo-kappa.vercel.app", tier: "Enterprise", tierColor: "#FFD700" },
  { icon: "🏢", url: "https://realestate-demo-gilt.vercel.app", tier: "Enterprise", tierColor: "#FFD700" },
];

export default function CaseStudiesPage() {
  const { t } = useLanguage();
  return (
    <>
      <Breadcrumbs />
      <Section className="py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            {t("cases.title")} <span className="text-[#00d4ff]">{t("cases.titleHighlight")}</span>
          </h1>
          <p className="text-center text-[var(--text-dim)] mb-16 max-w-2xl mx-auto text-lg">{t("cases.desc")}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.1 }}
                className="glass rounded-2xl p-6 hover:border-[#00d4ff]/30 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{cs.icon}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${cs.tierColor}20`, color: cs.tierColor }}>
                    {cs.tier}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-[#00d4ff] transition-colors">{t(`cases.${i}.name`)}</h3>
                <p className="text-sm text-[var(--text-dim)] mb-4">{t(`cases.${i}.desc`)}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[0, 1, 2].map((fi) => (
                    <span key={fi} className="px-2 py-1 rounded-full glass text-xs text-[#00d4ff]">
                      {t(`cases.${i}.feature.${fi}`)}
                    </span>
                  ))}
                </div>
                {cs.url ? (
                  <a href={cs.url} target="_blank" rel="noopener noreferrer"
                    className="block text-center py-2 rounded-full glass border border-[#00d4ff]/30 text-[#00d4ff] text-sm font-semibold hover:bg-[#00d4ff]/10 transition-all">
                    {t("cases.viewDemo")} →
                  </a>
                ) : (
                  <span className="block text-center py-2 rounded-full glass text-[var(--text-dim)] text-sm">
                    {t("cases.comingSoon")}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
