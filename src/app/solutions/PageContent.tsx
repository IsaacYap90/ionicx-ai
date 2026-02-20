"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import Link from "next/link";

interface SolutionData {
  icon: string;
  features: number;
  gradient: string;
  priceKey: string;
  audienceKey: string;
  useCaseKey: string;
  portfolioLinks?: { name: string; url: string }[];
  comingSoon?: boolean;
}

const solutions: SolutionData[] = [
  {
    icon: "🧠", features: 5, gradient: "from-[#6366F1]/20 to-[#00d4ff]/10",
    priceKey: "solutions.price.0", audienceKey: "solutions.audience.0", useCaseKey: "solutions.useCase.0",
    comingSoon: true,
  },
  {
    icon: "🌐", features: 5, gradient: "from-[#00d4ff]/20 to-[#00ff88]/10",
    priceKey: "solutions.price.1", audienceKey: "solutions.audience.1", useCaseKey: "solutions.useCase.1",
    portfolioLinks: [
      { name: "TattByLyds", url: "https://tattbylyds.vercel.app" },
      { name: "Fab The Stretch Lad", url: "https://fabthestretchlad.vercel.app" },
    ],
  },
  {
    icon: "🤖", features: 5, gradient: "from-[#00ff88]/20 to-[#6366F1]/10",
    priceKey: "solutions.price.2", audienceKey: "solutions.audience.2", useCaseKey: "solutions.useCase.2",
    portfolioLinks: [
      { name: "Sweet Bliss Bakery", url: "https://baker-demo.vercel.app" },
    ],
  },
  {
    icon: "📊", features: 5, gradient: "from-[#FFD700]/20 to-[#00d4ff]/10",
    priceKey: "solutions.price.3", audienceKey: "solutions.audience.3", useCaseKey: "solutions.useCase.3",
    comingSoon: true,
  },
  {
    icon: "⚡", features: 5, gradient: "from-[#00d4ff]/20 to-[#6366F1]/10",
    priceKey: "solutions.price.4", audienceKey: "solutions.audience.4", useCaseKey: "solutions.useCase.4",
    comingSoon: true,
  },
];

const comparisonRows = [
  "aiWebsite",
  "aiChatbot",
  "analytics",
  "automation",
  "crm",
  "dedicatedSupport",
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

          {/* Solutions - Alternating Layout */}
          <div className="space-y-16">
            {solutions.map((sol, i) => {
              const isReversed = i % 2 === 1;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                  className="glass rounded-2xl p-8 md:p-12">
                  <div className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} gap-8`}>
                    {/* Visual / Mockup Area */}
                    <div className="md:w-2/5 flex-shrink-0">
                      <div className={`bg-gradient-to-br ${sol.gradient} rounded-xl p-8 flex items-center justify-center min-h-[240px] relative`}>
                        <div className="text-7xl">{sol.icon}</div>
                        {sol.comingSoon && (
                          <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-bold">
                            {t("solutions.comingSoon")}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-[#00d4ff]">{t(`solutions.${i}.title`)}</h2>
                      </div>

                      {/* Audience Tag */}
                      <p className="text-xs text-[var(--text-dim)] bg-white/5 inline-block px-3 py-1 rounded-full mb-4">
                        {t(sol.audienceKey)}
                      </p>

                      <p className="text-[var(--text-dim)] mb-4">{t(`solutions.detail.${i}.desc`)}</p>

                      {/* Use Case Story */}
                      <div className="glass rounded-lg p-4 mb-4 border-l-2 border-[#00d4ff]">
                        <p className="text-sm text-[var(--text-dim)] italic">{t(sol.useCaseKey)}</p>
                      </div>

                      {/* Features */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                        {Array.from({ length: sol.features }).map((_, fi) => (
                          <div key={fi} className="flex items-start gap-2 text-sm">
                            <span className="text-[#00ff88] mt-0.5">✓</span>
                            <span className="text-[var(--text-dim)]">{t(`solutions.detail.${i}.feature.${fi}`)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Price + CTA Row */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Link href="/pricing" className="text-[#00ff88] font-bold text-lg hover:underline">
                          {t(sol.priceKey)}
                        </Link>
                        {sol.portfolioLinks && sol.portfolioLinks.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {sol.portfolioLinks.map((pl) => (
                              <a key={pl.name} href={pl.url} target="_blank" rel="noopener noreferrer"
                                className="px-4 py-2 rounded-full glass border border-[#00d4ff]/30 text-[#00d4ff] text-sm font-semibold hover:bg-[#00d4ff]/10 transition-all">
                                {t("solutions.seeItLive")} — {pl.name} →
                              </a>
                            ))}
                          </div>
                        ) : sol.comingSoon ? (
                          <a href="https://wa.me/6580268821" target="_blank" rel="noopener noreferrer"
                            className="px-4 py-2 rounded-full glass border border-[#25D366]/30 text-[#25D366] text-sm font-semibold hover:bg-[#25D366]/10 transition-all">
                            {t("solutions.getNotified")}
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* EIS Banner */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass rounded-2xl p-6 my-16 text-center glow-green">
            <p className="text-lg font-semibold">
              {t("solutions.eisBanner")}{" "}
              <Link href="/pricing#eis" className="text-[#00ff88] hover:underline">{t("solutions.eisLearnMore")}</Link>
            </p>
          </motion.div>

          {/* Comparison Table */}
          <div className="glass rounded-2xl p-8 mb-16 overflow-x-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">{t("solutions.compare.title")}</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left py-3 px-4 text-[var(--text-dim)]">{t("solutions.compare.feature")}</th>
                  {solutions.map((_, i) => (
                    <th key={i} className="text-center py-3 px-4 text-[#00d4ff] text-xs">{t(`solutions.${i}.title`)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row} className="border-b border-[var(--card-border)]/50">
                    <td className="py-3 px-4 text-[var(--text-dim)]">{t(`solutions.compare.row.${row}`)}</td>
                    {solutions.map((_, i) => (
                      <td key={i} className="py-3 px-4 text-center">{t(`solutions.compare.${i}.${row}`)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Not Sure CTA */}
          <div className="glass rounded-2xl p-8 md:p-12 text-center glow-cyan">
            <h3 className="text-2xl font-bold mb-4">{t("solutions.notSure.title")}</h3>
            <p className="text-[var(--text-dim)] mb-8 max-w-xl mx-auto">{t("solutions.notSure.desc")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/6580268821" target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-[#25D366] text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all hover:scale-105">
                {t("nav.whatsapp")}
              </a>
              <Link href="/contact" className="px-8 py-4 rounded-full glass border border-[#00d4ff]/30 text-[#00d4ff] font-bold text-lg hover:bg-[#00d4ff]/10 transition-all">
                {t("solutions.cta")}
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
