"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";

type LeadScore = "hot" | "warm" | "cold" | null;

function scoreLeadFn(data: Record<string, string>): { score: LeadScore; points: number } {
  let points = 0;
  // Revenue
  if (data.revenue === "50k+") points += 30;
  else if (data.revenue === "20k-50k") points += 20;
  else if (data.revenue === "10k-20k") points += 15;
  else points += 5;
  // Website status
  if (data.websiteStatus === "none") points += 25;
  else if (data.websiteStatus === "basic") points += 15;
  else points += 10;
  // Timeline
  if (data.timeline === "asap") points += 30;
  else if (data.timeline === "1-3months") points += 20;
  else if (data.timeline === "3-6months") points += 10;
  else points += 5;
  // Budget
  if (data.budget === "10k+") points += 25;
  else if (data.budget === "5k-10k") points += 20;
  else if (data.budget === "2k-5k") points += 15;
  else points += 5;

  const score: LeadScore = points >= 70 ? "hot" : points >= 45 ? "warm" : "cold";
  return { score, points };
}

const businessTypes = [
  "fnb", "retail", "beauty", "fitness", "wellness", "realestate",
  "wedding", "interior", "education", "services", "other"
];

export default function ContactPage() {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [leadScore, setLeadScore] = useState<LeadScore>(null);
  const [instantConsultation, setInstantConsultation] = useState<string>("");
  const [isGeneratingConsultation, setIsGeneratingConsultation] = useState(false);

  return (
    <>
      <Breadcrumbs />
      <Section className="py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            {t("contact.page.title")} <span className="text-[#00ff88] text-glow-green">{t("contact.page.titleHighlight")}</span>
          </h1>
          <p className="text-center text-[var(--text-dim)] mb-16 text-lg">{t("contact.page.desc")}</p>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-8 md:p-10 glow-green space-y-5">
              <div className="text-center">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold mb-2">{t("contact.thankYou")}</h2>
                <p className="text-[var(--text-dim)] mb-4">
                  {lang === "zh" ? "这是您的即时 AI 咨询结果：" : "Here’s your instant AI consultation result:"}
                </p>
                {leadScore && (
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                    leadScore === "hot" ? "bg-red-500/20 text-red-400" :
                    leadScore === "warm" ? "bg-orange-500/20 text-orange-400" :
                    "bg-blue-500/20 text-blue-400"
                  }`}>
                    {t(`contact.score.${leadScore}`)}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-[#00d4ff]/30 bg-[#00d4ff]/5 p-5 whitespace-pre-wrap text-sm leading-6">
                {isGeneratingConsultation
                  ? (lang === "zh" ? "🤖 正在生成您的 AI 咨询建议..." : "🤖 Generating your AI consultation...")
                  : instantConsultation}
              </div>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-[var(--text-dim)]">
                <a href="https://wa.me/6580268821" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ff88] transition-colors">
                  {lang === "zh" ? "💬 立刻 WhatsApp 继续" : "💬 Continue on WhatsApp now"}
                </a>
                <a href="/pricing" className="hover:text-[#00d4ff] transition-colors">
                  {lang === "zh" ? "💰 查看价格" : "💰 View Pricing"}
                </a>
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const data = Object.fromEntries(fd.entries()) as Record<string, string>;
                const { score } = scoreLeadFn(data);
                setLeadScore(score);
                setSubmitted(true);
                setIsGeneratingConsultation(true);

                const businessLabel = data.businessType ? t(`contact.bizType.${data.businessType}`) : "SME";
                const userPrompt = lang === "zh"
                  ? `请基于以下潜在客户信息，生成一份“即时 AI 咨询建议”。\n\n客户资料：\n- 行业：${businessLabel}\n- 月营收：${data.revenue || "未提供"}\n- 网站状态：${data.websiteStatus || "未提供"}\n- 时间线：${data.timeline || "未提供"}\n- 预算：${data.budget || "未提供"}\n- 备注：${data.message || "无"}\n\n请输出：\n1) 推荐套餐（Starter/Growth/Enterprise）+ 原因\n2) 预计 EIS 后有效成本\n3) 2-3 个马上可落地的自动化/AI 功能\n4) 预计上线时间\n5) 下一步行动（非常简短）\n\n语气专业、简洁、可执行。`
                  : `Based on this lead profile, generate an "instant AI consultation".\n\nLead profile:\n- Industry: ${businessLabel}\n- Monthly revenue: ${data.revenue || "not provided"}\n- Website status: ${data.websiteStatus || "not provided"}\n- Timeline: ${data.timeline || "not provided"}\n- Budget: ${data.budget || "not provided"}\n- Notes: ${data.message || "none"}\n\nOutput exactly:\n1) Recommended package (Starter/Growth/Enterprise) + reason\n2) Estimated effective cost after EIS\n3) 2-3 immediate AI/automation features to implement\n4) Estimated go-live timeline\n5) Next best action (very short)\n\nTone: concise, practical, business-focused.`;

                let aiReply = lang === "zh"
                  ? "感谢提交。我们建议先做 15 分钟诊断通话，我会按您的预算和时间线给出可执行上线方案。"
                  : "Thanks for submitting. We recommend a 15-minute diagnostic call next so we can lock your package, timeline, and launch plan.";

                try {
                  const chatRes = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      lang,
                      messages: [{ role: "user", content: userPrompt }],
                    }),
                  });

                  if (chatRes.ok) {
                    const payload = await chatRes.json();
                    if (payload?.reply) aiReply = payload.reply;
                  }
                } catch {}

                setInstantConsultation(aiReply);
                setIsGeneratingConsultation(false);

                try {
                  await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...data, leadScore: score, recommendation: aiReply, source: "contact" }),
                  });
                } catch {}
              }}
              className="glass rounded-2xl p-8 md:p-12 glow-cyan space-y-6"
            >
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-[var(--text-dim)] mb-2">{t("contact.label.name")} *</label>
                  <input type="text" name="name" required placeholder={t("contact.placeholder.name")}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#00d4ff]/50 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-dim)] mb-2">{t("contact.label.email")} *</label>
                  <input type="email" name="email" required placeholder={t("contact.placeholder.email")}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#00d4ff]/50 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-dim)] mb-2">{t("contact.label.phone")}</label>
                  <input type="tel" name="phone" placeholder={t("contact.placeholder.phone")}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#00d4ff]/50 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-dim)] mb-2">{t("contact.label.business")} *</label>
                  <select name="businessType" required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#00d4ff]/50 focus:outline-none transition-colors">
                    <option value="" className="bg-[#0a0a1a]">{t("contact.select")}</option>
                    {businessTypes.map((bt) => (
                      <option key={bt} value={bt} className="bg-[#0a0a1a]">{t(`contact.bizType.${bt}`)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* AI Lead Scoring Fields */}
              <div className="border-t border-[var(--card-border)] pt-6">
                <h3 className="text-sm font-semibold text-[#00d4ff] mb-4">🤖 {t("contact.aiSection")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-[var(--text-dim)] mb-2">{t("contact.label.revenue")}</label>
                    <select name="revenue" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#00d4ff]/50 focus:outline-none transition-colors">
                      <option value="under10k" className="bg-[#0a0a1a]">{t("contact.rev.under10k")}</option>
                      <option value="10k-20k" className="bg-[#0a0a1a]">{t("contact.rev.10k-20k")}</option>
                      <option value="20k-50k" className="bg-[#0a0a1a]">{t("contact.rev.20k-50k")}</option>
                      <option value="50k+" className="bg-[#0a0a1a]">{t("contact.rev.50k+")}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-dim)] mb-2">{t("contact.label.websiteStatus")}</label>
                    <select name="websiteStatus" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#00d4ff]/50 focus:outline-none transition-colors">
                      <option value="none" className="bg-[#0a0a1a]">{t("contact.ws.none")}</option>
                      <option value="basic" className="bg-[#0a0a1a]">{t("contact.ws.basic")}</option>
                      <option value="upgrade" className="bg-[#0a0a1a]">{t("contact.ws.upgrade")}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-dim)] mb-2">{t("contact.label.timeline")}</label>
                    <select name="timeline" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#00d4ff]/50 focus:outline-none transition-colors">
                      <option value="asap" className="bg-[#0a0a1a]">{t("contact.tl.asap")}</option>
                      <option value="1-3months" className="bg-[#0a0a1a]">{t("contact.tl.1-3months")}</option>
                      <option value="3-6months" className="bg-[#0a0a1a]">{t("contact.tl.3-6months")}</option>
                      <option value="exploring" className="bg-[#0a0a1a]">{t("contact.tl.exploring")}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-dim)] mb-2">{t("contact.label.budget")}</label>
                    <select name="budget" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#00d4ff]/50 focus:outline-none transition-colors">
                      <option value="under2k" className="bg-[#0a0a1a]">{t("contact.bgt.under2k")}</option>
                      <option value="2k-5k" className="bg-[#0a0a1a]">{t("contact.bgt.2k-5k")}</option>
                      <option value="5k-10k" className="bg-[#0a0a1a]">{t("contact.bgt.5k-10k")}</option>
                      <option value="10k+" className="bg-[#0a0a1a]">{t("contact.bgt.10k+")}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-[var(--text-dim)] mb-2">{t("contact.label.message")}</label>
                <textarea name="message" rows={4} placeholder={t("contact.placeholder.message")}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#00d4ff]/50 focus:outline-none transition-colors resize-none" />
              </div>

              <button type="submit"
                className="w-full py-4 rounded-full bg-[#00ff88] text-[#0a0a1a] font-bold text-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all hover:scale-[1.02]">
                {t("contact.submit")}
              </button>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--text-dim)]">
                <a href="https://wa.me/6580268821" target="_blank" rel="noopener noreferrer" className="hover:text-[#00ff88] transition-colors">{t("contact.whatsapp")}</a>
                <span>{t("contact.email")}</span>
              </div>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}
