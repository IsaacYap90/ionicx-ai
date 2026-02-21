"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import Link from "next/link";

const fmt = (n: number) => "S$" + n.toLocaleString("en-SG", { minimumFractionDigits: 0 });

const plans = [
  {
    price: 2888, maintenance: 888,
    features: [
      "AI-Powered Website",
      "AI Chatbot Integration",
      "Mobile Responsive",
      "AI Lead Qualification Script Pack",
      "WhatsApp Quick Replies Setup",
      "Monthly Performance Snapshot",
      "Quarterly Conversion Tune-Up",
    ],
    popular: false,
  },
  {
    price: 5888, maintenance: 1288,
    features: [
      "Everything in Starter",
      "Two-Channel Automation",
      "Lead Scoring & Routing Rules",
      "No-Show Reminder Flow",
      "Quarterly AI Workflow Optimization Call",
      "Priority Support",
    ],
    popular: true,
  },
  {
    price: 8888, maintenance: 1588,
    features: [
      "Everything in Growth",
      "Advanced Analytics Dashboard",
      "Multi-Location Support",
      "Custom AI Workflow Builder",
      "Bi-Weekly Strategy Calls",
      "Priority SLA + Escalation",
    ],
    popular: false,
  },
  {
    price: 15888, suffix: "+", maintenance: 2388,
    features: [
      "Everything in Scale",
      "Internal AI Copilot Pilot",
      "SOP/Knowledge Assistant (RAG-lite)",
      "Monthly Strategy Review",
      "Dedicated Account Manager",
      "Custom API Integrations",
    ],
    popular: false,
  },
];

const addons = [
  { key: "extraPages", price: 500 },
  { key: "ecommerce", price: 1500 },
  { key: "multiLang", price: 800 },
  { key: "analytics", price: 1200 },
  { key: "booking", price: 1000 },
];

const faqs = [
  "timeline",
  "eisHow",
  "maintenance",
  "changes",
  "hosting",
  "refund",
];

export default function PricingPage() {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [investment, setInvestment] = useState(2888);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const deduction = investment * 4;
  const savings = Math.round(deduction * 0.17);
  const effective = investment - savings;

  return (
    <>
      <Breadcrumbs />
      <Section className="py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            {t("pricing.page.title")} <span className="text-[#00d4ff]">{t("pricing.page.titleHighlight")}</span>
          </h1>
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-2 rounded-full glass text-sm text-[#00ff88]">{t("pricing.eisBadge")}</span>
          </div>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full glass text-sm text-[#00d4ff]">{t("pricing.aiBadge")}</span>
          </div>

          {/* Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-16">
            {plans.map((p, i) => {
              const sv = Math.round(p.price * 4 * 0.17);
              const eff = p.price - sv;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedPlan(i)}
                  className={`glass rounded-2xl p-8 relative cursor-pointer transition-all ${
                    p.popular ? "border-[#00d4ff]/40 glow-cyan" : ""
                  } ${selectedPlan === i ? "ring-2 ring-[#00ff88]" : ""}`}>
                  {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00d4ff] text-[#0a0a1a] text-xs font-bold">{t("pricing.popular")}</div>}
                  <h3 className="text-xl font-bold mb-2">{t(`pricing.plan.${i}.name`)}</h3>
                  <div className="text-3xl font-bold text-[#00d4ff] mb-1">{fmt(p.price)}{p.suffix || ""}</div>
                  <div className="text-sm text-[var(--text-dim)] mb-1">+ {fmt(p.maintenance)}{t("pricing.maintenance")}</div>
                  <div className="text-xs text-[var(--text-dim)] mb-1 opacity-70">{t("pricing.includes")}</div>
                  <div className="text-sm text-[#00ff88] mb-1">{t("pricing.afterEIS").replace("{amount}", fmt(eff))}</div>
                  <div className="text-xs text-[#00d4ff] mb-6">{t("pricing.monthly.label")} {fmt(Math.round(eff / 12))}{t("pricing.monthly.suffix")}</div>
                  <ul className="space-y-3 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-dim)]">
                        <span className="text-[#00ff88] mt-0.5">✓</span>
                        {t(`pricing.features.${f}`)}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact"
                    className={`block text-center py-3 rounded-full font-semibold text-sm transition-all ${
                      p.popular ? "bg-[#00ff88] text-[#0a0a1a] hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]" : "glass border border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10"
                    }`}>
                    {t("pricing.cta")}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Smart Bundle Suggestions */}
          {selectedPlan !== null && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8 mb-16 glow-cyan">
              <h3 className="text-xl font-bold mb-4 text-[#00d4ff]">
                {t("pricing.bundle.title").replace("{plan}", t(`pricing.plan.${selectedPlan}.name`))}
              </h3>
              <p className="text-[var(--text-dim)] mb-6">{t("pricing.bundle.desc")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {addons.filter((_, ai) => {
                  if (selectedPlan === 0) return ai < 3;
                  if (selectedPlan === 1) return ai >= 1 && ai <= 4;
                  return ai >= 2;
                }).map((addon) => (
                  <div key={addon.key} className="glass rounded-xl p-4 flex justify-between items-center">
                    <span className="text-sm">{t(`pricing.addon.${addon.key}`)}</span>
                    <span className="text-[#00d4ff] font-semibold text-sm">+{fmt(addon.price)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Comparison Table */}
          <div className="glass rounded-2xl p-8 mb-16 overflow-x-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">{t("pricing.compare.title")}</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left py-3 px-4 text-[var(--text-dim)]">{t("pricing.compare.feature")}</th>
                  <th className="text-center py-3 px-4 text-[#00d4ff]">{t("pricing.plan.0.name")}</th>
                  <th className="text-center py-3 px-4 text-[#00d4ff]">{t("pricing.plan.1.name")}</th>
                  <th className="text-center py-3 px-4 text-[#00d4ff]">{t("pricing.plan.2.name")}</th>
                  <th className="text-center py-3 px-4 text-[#00d4ff]">{t("pricing.plan.3.name")}</th>
                </tr>
              </thead>
              <tbody>
                {[0,1,2,3,4,5,6,7,8].map((ri) => (
                  <tr key={ri} className="border-b border-[var(--card-border)]/50">
                    <td className="py-3 px-4 text-[var(--text-dim)]">{t(`pricing.compare.row.${ri}`)}</td>
                    <td className="py-3 px-4 text-center">{t(`pricing.compare.s.${ri}`)}</td>
                    <td className="py-3 px-4 text-center">{t(`pricing.compare.g.${ri}`)}</td>
                    <td className="py-3 px-4 text-center">{t(`pricing.compare.sc.${ri}`)}</td>
                    <td className="py-3 px-4 text-center">{t(`pricing.compare.e.${ri}`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EIS Explanation Section */}
          <div id="eis" className="glass rounded-2xl p-8 md:p-12 mb-16 glow-green">
            <h3 className="text-2xl font-bold text-center mb-4">
              {t("pricing.eis.title")} <span className="text-[#00ff88]">{t("pricing.eis.titleHighlight")}</span>
            </h3>
            <p className="text-center text-[var(--text-dim)] mb-8 max-w-2xl mx-auto">{t("pricing.eis.desc")}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-[#00d4ff] mb-2">400%</div>
                <div className="text-sm text-[var(--text-dim)]">{t("pricing.eis.deduction")}</div>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-[#00ff88] mb-2">68%</div>
                <div className="text-sm text-[var(--text-dim)]">{t("pricing.eis.discount")}</div>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-[#00d4ff] mb-2">{fmt(5888)}</div>
                <div className="text-sm text-[var(--text-dim)]">{t("pricing.eis.example")}</div>
              </div>
            </div>
            <div className="glass rounded-xl p-6 mb-6">
              <h4 className="font-bold mb-3 text-[#00d4ff]">{t("pricing.eis.howItWorks")}</h4>
              <div className="space-y-2 text-sm text-[var(--text-dim)]">
                <p>{t("pricing.eis.step1")}</p>
                <p>{t("pricing.eis.step2")}</p>
                <p>{t("pricing.eis.step3")}</p>
              </div>
            </div>
            <p className="text-xs text-[var(--text-dim)] text-center italic">{t("pricing.eis.disclaimer")}</p>
          </div>


          {/* Guarantee */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-16 text-center glow-cyan">
            <h3 className="text-2xl font-bold mb-4">
              {t("pricing.guarantee.title")} <span className="text-[#00ff88]">{t("pricing.guarantee.titleHighlight")}</span>
            </h3>
            <p className="text-[var(--text-dim)] mb-6 max-w-2xl mx-auto">{t("pricing.guarantee.desc")}</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              {[0,1,2].map((i) => (
                <span key={i} className="text-sm text-white/80">{t(`pricing.guarantee.points.${i}`)}</span>
              ))}
            </div>
          </div>

          {/* EIS Calculator */}
          <div id="eis-calculator" className="glass rounded-2xl p-8 md:p-12 mb-16 glow-cyan">
            <h3 className="text-2xl font-bold text-center mb-4">
              {t("calc.title")} <span className="text-[#00d4ff]">{t("calc.titleHighlight")}</span>
            </h3>
            <p className="text-center text-[var(--text-dim)] mb-8">{t("calc.desc")}</p>
            <div className="max-w-xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[#00d4ff] text-2xl font-bold">S$</span>
                <input type="number" min={1000} max={50000} step={100} value={investment}
                  onChange={(e) => { const v = Number(e.target.value); if (v >= 0 && v <= 50000) setInvestment(v); }}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-3xl font-bold text-[#00d4ff] w-full outline-none focus:border-[#00d4ff] transition-colors" />
              </div>
              <input type="range" min={1000} max={50000} step={100} value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))} className="w-full mb-8" />
              <div className="grid grid-cols-3 gap-4">
                {[
                  [t("calc.deduction"), fmt(deduction), "#00d4ff"],
                  [t("calc.taxSavings"), fmt(savings), "#00ff88"],
                  [t("calc.effectiveCost"), fmt(effective), "#00ff88"],
                ].map(([label, value, color]) => (
                  <div key={label} className="glass rounded-xl p-4 text-center">
                    <div className="text-xs text-[var(--text-dim)] mb-1">{label}</div>
                    <div className="text-xl font-bold" style={{ color: color as string }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="glass rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-center mb-8">{t("pricing.faq.title")}</h3>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <div key={faq} className="glass rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between font-semibold text-sm hover:text-[#00d4ff] transition-colors"
                  >
                    {t(`pricing.faq.${faq}.q`)}
                    <span className={`text-[#00d4ff] transition-transform ${openFaq === i ? "rotate-180" : ""}`}>▼</span>
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-6 pb-4">
                      <p className="text-sm text-[var(--text-dim)]">{t(`pricing.faq.${faq}.a`)}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
