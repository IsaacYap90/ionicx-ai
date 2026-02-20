"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";

const caseStudies = [
  { icon: "🧘", url: "https://fabthestretchlad.vercel.app", tier: "Starter-Growth", tierColor: "#00d4ff", index: 1, industry: "Remedial Massage" },
  { icon: "🎨", url: "https://tattbylyds.vercel.app", tier: "Starter", tierColor: "#00ff88", index: 2, industry: "Tattoo Artist" },
  { icon: "🧁", url: "https://baker-demo.vercel.app", tier: "Starter", tierColor: "#00ff88", index: 0, industry: "Home Bakery", isDemo: true },
  { icon: "🏠", url: "https://id-demo-two.vercel.app", tier: "Enterprise", tierColor: "#FFD700", index: 3, industry: "Interior Design", isDemo: true },
  { icon: "☕", url: "https://kopitiam-demo.vercel.app", tier: "Growth", tierColor: "#00d4ff", index: 4, industry: "F&B / Cafe", isDemo: true },
  { icon: "🌿", url: "https://wellness-demo-phi.vercel.app", tier: "Enterprise", tierColor: "#FFD700", index: 5, industry: "TCM / Wellness", isDemo: true },
  { icon: "💪", url: "https://gym-demo-beta-sepia.vercel.app", tier: "Growth-Enterprise", tierColor: "#00d4ff", index: 6, industry: "Gym / Fitness", isDemo: true },
  { icon: "💒", url: "https://wedding-demo-theta.vercel.app", tier: "Enterprise", tierColor: "#FFD700", index: 7, industry: "Wedding / Events", isDemo: true },
  { icon: "✨", url: "https://beauty-demo-kappa.vercel.app", tier: "Enterprise", tierColor: "#FFD700", index: 8, industry: "Beauty / Aesthetics", isDemo: true },
  { icon: "🏢", url: "https://realestate-demo-gilt.vercel.app", tier: "Enterprise", tierColor: "#FFD700", index: 9, industry: "Real Estate", isDemo: true },
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
          <p className="text-center text-[var(--text-dim)] mb-4 max-w-2xl mx-auto text-lg">{t("cases.desc")}</p>
          <p className="text-center text-sm text-[var(--text-dim)] mb-16 italic">{t("cases.portfolioNote")}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, arrayIdx) => (
              <motion.div key={cs.index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (arrayIdx % 3) * 0.1 }}
                className="glass rounded-2xl p-6 hover:border-[#00d4ff]/30 transition-colors group relative">
                {cs.isDemo && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-bold">
                    {t("cases.demoProject")}
                  </span>
                )}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{cs.icon}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${cs.tierColor}20`, color: cs.tierColor }}>
                    {cs.tier}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-[#00d4ff] transition-colors">{t(`cases.${cs.index}.name`)}</h3>
                <p className="text-xs text-[var(--text-dim)] mb-3">{cs.industry}</p>
                <p className="text-sm text-[var(--text-dim)] mb-4">{t(`cases.${cs.index}.desc`)}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[0, 1, 2].map((fi) => (
                    <span key={fi} className="px-2 py-1 rounded-full glass text-xs text-[#00d4ff]">
                      {t(`cases.${cs.index}.feature.${fi}`)}
                    </span>
                  ))}
                </div>
                {cs.url ? (
                  <a href={cs.url} target="_blank" rel="noopener noreferrer"
                    className="block text-center py-2 rounded-full glass border border-[#00d4ff]/30 text-[#00d4ff] text-sm font-semibold hover:bg-[#00d4ff]/10 transition-all">
                    {t("cases.viewProject")} →
                  </a>
                ) : (
                  <span className="block text-center py-2 rounded-full glass text-[var(--text-dim)] text-sm">
                    {t("cases.comingSoon")}
                  </span>
                )}
              </motion.div>
            ))}

            {/* Coming Soon Placeholder Cards */}
            {[0, 1].map((i) => (
              <motion.div key={`coming-${i}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="glass rounded-2xl p-6 border-dashed border-[var(--card-border)] flex flex-col items-center justify-center text-center min-h-[280px] opacity-60">
                <div className="text-4xl mb-4">🔜</div>
                <h3 className="text-lg font-bold mb-2 text-[var(--text-dim)]">{t("cases.comingSoon")}</h3>
                <p className="text-sm text-[var(--text-dim)]">{t("cases.comingSoonDesc")}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
