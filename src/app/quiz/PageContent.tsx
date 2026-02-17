"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import Link from "next/link";

type Step = 0 | 1 | 2 | 3 | 4;

const businessOptions = [
  "fnb", "retail", "beauty", "fitness", "wellness", "realestate",
  "wedding", "interior", "education", "services", "other"
];

const featureOptions = [
  "website", "chatbot", "booking", "ecommerce", "crm", "analytics", "automation", "multilingual"
];

const budgetOptions = ["under3k", "3k-6k", "6k-13k", "13k+"];

function recommendTier(features: string[], budget: string): { tier: string; idx: number } {
  const featureCount = features.length;
  const hasPremium = features.some(f => ["crm", "analytics", "automation"].includes(f));

  if (budget === "13k+" || (featureCount >= 5 && hasPremium)) return { tier: "Enterprise", idx: 2 };
  if (budget === "6k-13k" || featureCount >= 3) return { tier: "Growth", idx: 1 };
  return { tier: "Starter", idx: 0 };
}

export default function QuizPage() {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>(0);
  const [business, setBusiness] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const recommendation = recommendTier(features, budget);

  const toggleFeature = (f: string) => {
    setFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  const handleSubmit = async () => {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, business, features: features.join(", "), budget,
          source: "quiz", recommendation: recommendation.tier,
        }),
      });
    } catch {}
    setSubmitted(true);
  };

  return (
    <>
      <Breadcrumbs />
      <Section className="py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            🤖 {t("quiz.title")} <span className="text-[#00d4ff]">{t("quiz.titleHighlight")}</span>
          </h1>
          <p className="text-center text-[var(--text-dim)] mb-12">{t("quiz.desc")}</p>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {[0, 1, 2, 3].map((s) => (
              <div key={s} className={`flex-1 h-2 rounded-full transition-colors ${
                s <= step ? "bg-[#00d4ff]" : "bg-white/10"
              }`} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div key={step} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                {step === 0 && (
                  <div className="glass rounded-2xl p-8">
                    <h2 className="text-xl font-bold mb-6">{t("quiz.step1.title")}</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {businessOptions.map((b) => (
                        <button key={b} onClick={() => { setBusiness(b); setStep(1); }}
                          className={`glass rounded-xl p-4 text-sm text-left hover:border-[#00d4ff]/50 transition-colors ${business === b ? "border-[#00d4ff] text-[#00d4ff]" : ""}`}>
                          {t(`quiz.biz.${b}`)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="glass rounded-2xl p-8">
                    <h2 className="text-xl font-bold mb-6">{t("quiz.step2.title")}</h2>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {featureOptions.map((f) => (
                        <button key={f} onClick={() => toggleFeature(f)}
                          className={`glass rounded-xl p-4 text-sm text-left transition-colors ${features.includes(f) ? "border-[#00ff88] text-[#00ff88]" : "hover:border-[#00d4ff]/50"}`}>
                          {features.includes(f) ? "✓ " : ""}{t(`quiz.feat.${f}`)}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setStep(2)} disabled={features.length === 0}
                      className="w-full py-3 rounded-full bg-[#00d4ff] text-[#0a0a1a] font-bold disabled:opacity-50 transition-opacity">
                      {t("quiz.next")}
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="glass rounded-2xl p-8">
                    <h2 className="text-xl font-bold mb-6">{t("quiz.step3.title")}</h2>
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      {budgetOptions.map((b) => (
                        <button key={b} onClick={() => { setBudget(b); setStep(3); }}
                          className={`glass rounded-xl p-4 text-sm text-left hover:border-[#00d4ff]/50 transition-colors ${budget === b ? "border-[#00d4ff] text-[#00d4ff]" : ""}`}>
                          {t(`quiz.budget.${b}`)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="glass rounded-2xl p-8">
                    <div className="text-center mb-8">
                      <div className="text-5xl mb-4">🎯</div>
                      <h2 className="text-2xl font-bold mb-2">{t("quiz.result.title")}</h2>
                      <div className="text-3xl font-bold text-[#00d4ff] mb-2">{t(`pricing.plan.${recommendation.idx}.name`)}</div>
                      <p className="text-[var(--text-dim)]">{t(`quiz.result.${recommendation.idx}.reason`)}</p>
                    </div>
                    <div className="space-y-4">
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("contact.placeholder.name")}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#00d4ff]/50 focus:outline-none" />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("contact.placeholder.email")}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#00d4ff]/50 focus:outline-none" />
                      <button onClick={handleSubmit} disabled={!name || !email}
                        className="w-full py-4 rounded-full bg-[#00ff88] text-[#0a0a1a] font-bold text-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all disabled:opacity-50">
                        {t("quiz.submit")}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-12 text-center glow-green">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold mb-3">{t("quiz.done.title")}</h2>
                <p className="text-[var(--text-dim)] mb-6">{t("quiz.done.desc")}</p>
                <Link href="/pricing" className="inline-block px-8 py-3 rounded-full glass border border-[#00d4ff]/30 text-[#00d4ff] font-semibold hover:bg-[#00d4ff]/10 transition-all">
                  {t("quiz.done.viewPricing")}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>
    </>
  );
}
