"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Section from "@/components/Section";

/* ─── Hero ─── */
function Hero() {
  const { t } = useLanguage();
  return (
    <Section className="min-h-screen flex items-center justify-center pt-20 grid-bg">
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00d4ff] opacity-[0.04] blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-[#6366F1] opacity-[0.06] blur-[120px]" />
      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          {t("hero.titlePrefix")} <span className="text-[#00d4ff] text-glow-cyan">{t("hero.titleHighlight")}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-[var(--text-dim)] max-w-2xl mx-auto mb-10">
          {t("hero.desc")}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/6580268821" target="_blank" rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-full bg-[#25D366] text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all hover:scale-105">
            {t("nav.whatsapp")}
          </a>
          <Link href="/contact" className="inline-block px-8 py-4 rounded-full glass border border-[#00d4ff]/30 text-[#00d4ff] font-bold text-lg hover:bg-[#00d4ff]/10 transition-all">
            {t("hero.cta")}
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── Social Proof ─── */
function SocialProof() {
  const { t } = useLanguage();
  const stats = [
    { value: "10", label: t("social.projects") },
    { value: "10", label: t("social.industries") },
    { value: "400%", label: t("social.eis"), href: "/pricing#eis" },
    { value: "24/7", label: t("social.support") },
  ];
  return (
    <Section className="py-16">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 text-center">
            {s.href ? (
              <Link href={s.href}>
                <div className="text-3xl font-bold text-[#00d4ff] mb-1">{s.value}</div>
                <div className="text-sm text-[var(--text-dim)] hover:text-[#00d4ff] transition-colors">{s.label}</div>
              </Link>
            ) : (
              <>
                <div className="text-3xl font-bold text-[#00d4ff] mb-1">{s.value}</div>
                <div className="text-sm text-[var(--text-dim)]">{s.label}</div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const { t } = useLanguage();
  const steps = [0, 1, 2];
  return (
    <Section className="py-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {t("howItWorks.title")} <span className="text-[#00d4ff]">{t("howItWorks.titleHighlight")}</span>
        </h2>
        <p className="text-center text-[var(--text-dim)] mb-12">{t("howItWorks.desc")}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="glass rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">{t(`howItWorks.step.${i}.icon`)}</div>
              <div className="text-sm text-[#00d4ff] font-semibold mb-2">Step {i + 1}</div>
              <h3 className="text-xl font-bold mb-3">{t(`howItWorks.step.${i}.title`)}</h3>
              <p className="text-[var(--text-dim)] text-sm">{t(`howItWorks.step.${i}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Case Studies Preview (top 3) ─── */
const previewCases = [
  { icon: "🧘", url: "https://fabthestretchlad.vercel.app", index: 1 },
  { icon: "🎨", url: "https://tattbylyds.vercel.app", index: 2 },
  { icon: "🧁", url: "https://baker-demo.vercel.app", index: 0, isDemo: true },
];

function CaseStudiesPreview() {
  const { t } = useLanguage();
  return (
    <Section className="py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {t("cases.title")} <span className="text-[#00d4ff]">{t("cases.titleHighlight")}</span>
        </h2>
        <p className="text-center text-[var(--text-dim)] mb-12 max-w-xl mx-auto">{t("cases.desc")}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewCases.map((cs) => (
            <motion.div key={cs.index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="glass rounded-2xl p-6 hover:border-[#00d4ff]/30 transition-colors group relative">
              {cs.isDemo && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-bold">
                  {t("cases.demoProject")}
                </span>
              )}
              <span className="text-4xl block mb-4">{cs.icon}</span>
              <h3 className="text-lg font-bold mb-2 group-hover:text-[#00d4ff] transition-colors">{t(`cases.${cs.index}.name`)}</h3>
              <p className="text-sm text-[var(--text-dim)] mb-4">{t(`cases.${cs.index}.desc`)}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[0, 1, 2].map((fi) => (
                  <span key={fi} className="px-2 py-1 rounded-full glass text-xs text-[#00d4ff]">
                    {t(`cases.${cs.index}.feature.${fi}`)}
                  </span>
                ))}
              </div>
              <a href={cs.url} target="_blank" rel="noopener noreferrer"
                className="block text-center py-2 rounded-full glass border border-[#00d4ff]/30 text-[#00d4ff] text-sm font-semibold hover:bg-[#00d4ff]/10 transition-all">
                {t("cases.viewProject")} →
              </a>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/case-studies" className="inline-block px-8 py-3 rounded-full glass border border-[#00d4ff]/30 text-[#00d4ff] font-semibold hover:bg-[#00d4ff]/10 transition-all">
            {t("cta.viewWork")} →
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ─── Results + CTA (replaces fake testimonials) ─── */
function ResultsAndCTA() {
  const { t } = useLanguage();
  const results = [
    { value: "10", label: t("results.delivered"), icon: "🚀" },
    { value: "2-3", label: t("results.buildTime"), icon: "⚡" },
    { value: "100%", label: t("results.satisfaction"), icon: "🎯" },
    { value: "68%", label: t("results.eisSavings"), icon: "💰" },
  ];

  return (
    <Section className="py-24">
      <div className="max-w-6xl mx-auto">
        {/* Results Section */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {t("results.title")} <span className="text-[#00d4ff]">{t("results.titleHighlight")}</span>
        </h2>
        <p className="text-center text-[var(--text-dim)] mb-12 max-w-xl mx-auto">{t("results.desc")}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {results.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2">{r.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-[#00ff88] mb-1">{r.value}</div>
              <div className="text-sm text-[var(--text-dim)]">{r.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Featured Projects Mini-Showcase */}
        <div className="glass rounded-2xl p-8 mb-16">
          <h3 className="text-xl font-bold text-center mb-6">{t("results.featured")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Fab The Stretch Lad", industry: t("results.project.0.industry"), url: "https://fabthestretchlad.vercel.app", features: t("results.project.0.features") },
              { name: "TattByLyds", industry: t("results.project.1.industry"), url: "https://tattbylyds.vercel.app", features: t("results.project.1.features") },
            ].map((project, i) => (
              <motion.a key={i} href={project.url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="glass rounded-xl p-6 hover:border-[#00d4ff]/30 transition-all group block">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#00d4ff]/20 flex items-center justify-center text-[#00d4ff] font-bold text-lg">
                    {project.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold group-hover:text-[#00d4ff] transition-colors">{project.name}</div>
                    <div className="text-xs text-[var(--text-dim)]">{project.industry}</div>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-dim)]">{project.features}</p>
                <div className="text-[#00d4ff] text-sm font-semibold mt-3">{t("cases.viewProject")} →</div>
              </motion.a>
            ))}
          </div>
          <p className="text-center text-xs text-[var(--text-dim)] mt-6 italic">{t("results.testimonialsComing")}</p>
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t("cta.title")} <span className="text-[#00ff88] text-glow-green">{t("cta.titleHighlight")}</span>
          </h2>
          <p className="text-[var(--text-dim)] text-lg mb-10">{t("cta.desc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/6580268821" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-[#25D366] text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all hover:scale-105">
              {t("nav.whatsapp")}
            </a>
            <Link href="/contact" className="px-8 py-4 rounded-full glass border border-[#00d4ff]/30 text-[#00d4ff] font-bold text-lg hover:bg-[#00d4ff]/10 transition-all">
              {t("cta.consultation")}
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <HowItWorks />
      <CaseStudiesPreview />
      <ResultsAndCTA />
    </>
  );
}
