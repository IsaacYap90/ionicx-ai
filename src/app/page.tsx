"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Section from "@/components/Section";

const fmt = (n: number) =>
  "S$" + n.toLocaleString("en-SG", { minimumFractionDigits: 0 });

/* ─── Hero ─── */
function Hero() {
  const { t } = useLanguage();
  return (
    <Section className="min-h-screen flex items-center justify-center pt-20 grid-bg">
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00d4ff] opacity-[0.04] blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-[#6366F1] opacity-[0.06] blur-[120px]" />
      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className="inline-block mb-6 px-4 py-2 rounded-full glass text-sm text-[#00d4ff]">
          {t("hero.badge")}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          {t("hero.titlePrefix")} <span className="text-[#00d4ff] text-glow-cyan">{t("hero.titleHighlight")}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-[var(--text-dim)] max-w-2xl mx-auto mb-10">
          {t("hero.desc")} <span className="text-[#00ff88] font-semibold">{t("hero.eisHighlight")}</span>{t("hero.eisSuffix")}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="inline-block px-8 py-4 rounded-full bg-[#00ff88] text-[#0a0a1a] font-bold text-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all hover:scale-105">
            {t("hero.cta")}
          </Link>
          <Link href="/quiz" className="inline-block px-8 py-4 rounded-full glass border border-[#00d4ff]/30 text-[#00d4ff] font-bold text-lg hover:bg-[#00d4ff]/10 transition-all">
            {t("hero.quizCta")}
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
    { value: "10+", label: t("social.projects") },
    { value: "5", label: t("social.industries") },
    { value: "400%", label: t("social.eis") },
    { value: "24/7", label: t("social.support") },
  ];
  return (
    <Section className="py-16">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-[#00d4ff] mb-1">{s.value}</div>
            <div className="text-sm text-[var(--text-dim)]">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─── EIS Calculator ─── */
function Calculator() {
  const { t } = useLanguage();
  const [investment, setInvestment] = useState(2888);
  const deduction = investment * 4;
  const savings = Math.round(deduction * 0.17);
  const effective = investment - savings;

  return (
    <Section id="calculator" className="py-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {t("calc.title")} <span className="text-[#00d4ff]">{t("calc.titleHighlight")}</span>
        </h2>
        <p className="text-center text-[var(--text-dim)] mb-12">{t("calc.desc")}</p>
        <div className="glass rounded-2xl p-8 md:p-12 glow-cyan">
          <label className="block text-sm text-[var(--text-dim)] mb-2">{t("calc.label")}</label>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[#00d4ff] text-2xl font-bold">S$</span>
            <input type="number" min={1000} max={50000} step={100} value={investment}
              onChange={(e) => { const v = Number(e.target.value); if (v >= 0 && v <= 50000) setInvestment(v); }}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-3xl font-bold text-[#00d4ff] w-full outline-none focus:border-[#00d4ff] transition-colors" />
          </div>
          <input type="range" min={1000} max={50000} step={100} value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))} className="w-full mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              [t("calc.deduction"), fmt(deduction), "#00d4ff"],
              [t("calc.taxSavings"), fmt(savings), "#00ff88"],
              [t("calc.effectiveCost"), fmt(effective), "#00ff88"],
            ].map(([label, value, color]) => (
              <div key={label} className="glass rounded-xl p-6 text-center">
                <div className="text-sm text-[var(--text-dim)] mb-2">{label}</div>
                <div className="text-2xl font-bold" style={{ color: color as string }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Solutions Preview ─── */
const solutionIcons = ["🧠", "🌐", "🤖", "📊", "⚡"];

function SolutionsPreview() {
  const { t } = useLanguage();
  return (
    <Section className="py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {t("solutions.title")} <span className="text-[#00d4ff]">{t("solutions.titleHighlight")}</span>
        </h2>
        <p className="text-center text-[var(--text-dim)] mb-12 max-w-xl mx-auto">{t("solutions.desc")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutionIcons.map((icon, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`glass rounded-2xl p-8 hover:border-[#00d4ff]/30 transition-colors group ${i === 0 ? "md:col-span-2 border-[#00d4ff]/40 glow-cyan" : ""}`}>
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-[#00d4ff] transition-colors">{t(`solutions.${i}.title`)}</h3>
              <p className="text-[var(--text-dim)]">{t(`solutions.${i}.desc`)}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/solutions" className="inline-block px-8 py-3 rounded-full glass border border-[#00d4ff]/30 text-[#00d4ff] font-semibold hover:bg-[#00d4ff]/10 transition-all">
            {t("solutions.viewAll")}
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ─── Pricing Preview ─── */
const plans = [
  { price: 2888, maintenance: 888, features: 6, popular: false },
  { price: 5888, maintenance: 1288, features: 6, popular: true },
  { price: 12888, suffix: "+", maintenance: 1888, features: 6, popular: false },
];

function PricingPreview() {
  const { t } = useLanguage();
  return (
    <Section className="py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {t("pricing.title")} <span className="text-[#00d4ff]">{t("pricing.titleHighlight")}</span>
        </h2>
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-[#00ff88]">{t("pricing.eisBadge")}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, i) => {
            const savings = Math.round(p.price * 4 * 0.17);
            const effective = p.price - savings;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`glass rounded-2xl p-8 relative ${p.popular ? "border-[#00d4ff]/40 glow-cyan" : ""}`}>
                {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00d4ff] text-[#0a0a1a] text-xs font-bold">{t("pricing.popular")}</div>}
                <h3 className="text-xl font-bold mb-2">{t(`pricing.plan.${i}.name`)}</h3>
                <div className="text-3xl font-bold text-[#00d4ff] mb-1">{fmt(p.price)}{p.suffix || ""}</div>
                <div className="text-sm text-[var(--text-dim)] mb-1">+ {fmt(p.maintenance)}{t("pricing.maintenance")}</div>
                <div className="text-sm text-[#00ff88] mb-6">{t("pricing.afterEIS").replace("{amount}", fmt(effective))}</div>
                <Link href="/pricing" className={`block text-center py-3 rounded-full font-semibold text-sm transition-all ${
                  p.popular ? "bg-[#00ff88] text-[#0a0a1a] hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]" : "glass border border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10"
                }`}>
                  {t("pricing.cta")}
                </Link>
              </motion.div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link href="/pricing" className="text-[#00d4ff] text-sm hover:underline">{t("pricing.viewFull")} →</Link>
        </div>
      </div>
    </Section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const { t } = useLanguage();
  const testimonials = [0, 1, 2];
  return (
    <Section className="py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {t("testimonials.title")} <span className="text-[#00d4ff]">{t("testimonials.titleHighlight")}</span>
        </h2>
        <p className="text-center text-[var(--text-dim)] mb-4">{t("testimonials.aiSummary")}</p>
        <div className="glass rounded-xl p-4 text-center text-sm text-[#00ff88] mb-12 max-w-2xl mx-auto">
          🤖 {t("testimonials.summaryText")}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-8">
              <div className="text-[#00d4ff] text-2xl mb-4">★★★★★</div>
              <p className="text-[var(--text-dim)] mb-6 italic">&ldquo;{t(`testimonials.${i}.text`)}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00d4ff]/20 flex items-center justify-center text-[#00d4ff] font-bold">
                  {t(`testimonials.${i}.name`).charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t(`testimonials.${i}.name`)}</div>
                  <div className="text-xs text-[var(--text-dim)]">{t(`testimonials.${i}.role`)}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── CTA ─── */
function CTASection() {
  const { t } = useLanguage();
  return (
    <Section className="py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          {t("cta.title")} <span className="text-[#00ff88] text-glow-green">{t("cta.titleHighlight")}</span>
        </h2>
        <p className="text-[var(--text-dim)] text-lg mb-10">{t("cta.desc")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="px-8 py-4 rounded-full bg-[#00ff88] text-[#0a0a1a] font-bold text-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all hover:scale-105">
            {t("cta.consultation")}
          </Link>
          <Link href="/case-studies" className="px-8 py-4 rounded-full glass border border-[#00d4ff]/30 text-[#00d4ff] font-bold text-lg hover:bg-[#00d4ff]/10 transition-all">
            {t("cta.viewWork")}
          </Link>
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
      <Calculator />
      <SolutionsPreview />
      <PricingPreview />
      <Testimonials />
      <CTASection />
    </>
  );
}
