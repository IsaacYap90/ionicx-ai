"use client";

import { useState, useEffect, useRef, FormEvent, createContext, useContext } from "react";
import { motion, useInView } from "framer-motion";

/* ───────── i18n ───────── */
type Lang = "en" | "zh";
const LangCtx = createContext<{ lang: Lang; t: (key: string) => string }>({ lang: "en", t: (k) => k });

const translations: Record<string, { en: string; zh: string }> = {
  // Hero
  "hero.badge": { en: "⚡ Limited to 50 Seats", zh: "⚡ 限50个名额" },
  "hero.title": { en: "How SG Small Businesses Save Up to 68% on AI Solutions with the New Government Tax Deduction", zh: "新加坡中小企业如何节省高达68%的AI解决方案费用 — 利用全新政府税务扣除优惠" },
  "hero.subtitle": { en: "Free live webinar — discover how Budget 2026's 400% EIS deduction lets you get a professional AI-powered website for your business at a fraction of the cost.", zh: "免费线上研讨会 — 了解2026年预算案的EIS 400%税务扣除如何让您以极低成本获得专业AI网站。" },
  "hero.cta": { en: "Save Your Free Seat 🚀", zh: "立即预留免费席位 🚀" },
  "hero.countdown": { en: "Next session starts in:", zh: "下一场即将开始：" },
  "countdown.days": { en: "Days", zh: "天" },
  "countdown.hours": { en: "Hours", zh: "时" },
  "countdown.min": { en: "Min", zh: "分" },
  "countdown.sec": { en: "Sec", zh: "秒" },

  // 3 Secrets
  "secrets.title": { en: "3 Secrets We'll Reveal", zh: "我们将揭示的3个秘密" },
  "secrets.live": { en: "Live", zh: "直播" },
  "secrets.1.title": { en: "AI Agents Build in Days, Not Months", zh: "AI代理 — 速度快5倍" },
  "secrets.1.desc": { en: "See how AI builds a custom website live — what agencies take 3 months to deliver, we do in 2-3 weeks.", zh: "看看AI如何现场搭建自定义网站 — 代理公司需要3个月的工作，我们只需2-3周。" },
  "secrets.2.title": { en: "The EIS Math That Changes Everything", zh: "68%省钱秘密" },
  "secrets.2.desc": { en: "S$2,888 → 400% deduction → S$924 effective cost. We'll walk you through the exact calculation.", zh: "S$2,888 → 400%扣除 → 实际成本仅S$924。我们将为您详细讲解计算过程。" },
  "secrets.3.title": { en: "Your Website Should Sell For You 24/7", zh: "您的网站应该24/7为您销售" },
  "secrets.3.desc": { en: "AI chatbots, automated lead capture, instant WhatsApp notifications — a salesperson that never sleeps.", zh: "AI聊天机器人、自动获取潜在客户、即时WhatsApp通知 — 一个永不休息的销售员。" },

  // Who Is This For
  "whoisthisfor.title": { en: "Is This For", zh: "这场网络研讨会适合" },
  "whoisthisfor.you": { en: "You?", zh: "您吗？" },
  "whoisthisfor.1": { en: "F&B owners who want online ordering & reservations", zh: "想要更多线上订单的餐饮业主" },
  "whoisthisfor.2": { en: "Home bakers still taking orders via Instagram DMs", zh: "仅依赖Instagram的家庭烘焙师" },
  "whoisthisfor.3": { en: "Fitness studios & gyms that need a booking system", zh: "需要预约系统的健身工作室" },
  "whoisthisfor.4": { en: "Clinics looking for patient appointment automation", zh: "没有线上形象的诊所" },
  "whoisthisfor.5": { en: "Service businesses ready to look professional online", zh: "因竞争对手流失客户的服务企业" },
  "whoisthisfor.6": { en: "Any SG SME owner who wants to save 68% on AI solutions", zh: "觉得现有网站费用过高的企业主" },

  // About Host
  "host.title": { en: "Meet Your Host", zh: "认识您的主讲人" },
  "host.role": { en: "Founder, IonicX AI", zh: "IonicX AI 创办人" },
  "host.bio": { en: "Former MMA fighter turned AI builder. Isaac combines the discipline of combat sports with cutting-edge AI to build solutions for Singapore's small businesses. He's helped F&B owners, home bakers, fitness studios, and clinics go from zero online presence to fully automated AI-powered websites — in weeks, not months.", zh: "前MMA职业裁判，转型为AI开发者。Isaac将格斗运动的纪律与尖端AI技术结合，为新加坡中小企业打造解决方案。他已帮助餐饮业主、家庭烘焙师、健身工作室和诊所，从零线上形象到全自动AI网站 — 只需数周，而非数月。" },

  // Testimonials
  "testimonials.title": { en: "What Our Clients Say", zh: "客户评价" },
  "testimonials.1.quote": { en: "Went from Instagram-only to a professional booking site with AI chatbot, automated lead capture, and WhatsApp notifications — all in 2 weeks. My clients can now book sessions directly and the AI answers their questions 24/7. Isaac delivered exactly what he promised — fast and no fuss.", zh: "从仅有Instagram到拥有专业预约网站，配备AI聊天机器人、自动获客和WhatsApp通知 — 全部只用了2周。我的客户现在可以直接预约，AI全天候回答他们的问题。Isaac完全兑现了他的承诺 — 快速且无忧。" },
  "testimonials.2.quote": { en: "Isaac built my tattoo portfolio site with an AI-powered booking system, client gallery, and an intelligent chatbot that handles enquiries while I'm tattooing. Clean design, fast turnaround, and it looks exactly how I wanted it. The AI features are a game-changer.", zh: "Isaac为我打造了纹身作品集网站，配备AI预约系统、客户画廊和智能聊天机器人，在我纹身时处理咨询。设计简洁、交付快速，完全符合我的要求。AI功能是一个颠覆性的改变。" },

  // EIS Calculator
  "eis.title": { en: "See Your", zh: "计算您的" },
  "eis.titleHighlight": { en: "Savings", zh: "节省" },
  "eis.subtitle": { en: "Enter your estimated project cost to see how much you'd save with the EIS 400% tax deduction.", zh: "输入您的预估项目费用，看看EIS 400%税务扣除能为您节省多少。" },
  "eis.calcTitle": { en: "💰 EIS Savings Calculator", zh: "💰 EIS 节省计算器" },
  "eis.costLabel": { en: "Your Project Cost (S$)", zh: "您的项目费用 (S$)" },
  "eis.deduction": { en: "400% Tax Deduction", zh: "400% 税务扣除" },
  "eis.taxSavings": { en: "Tax Savings (17%)", zh: "税务节省 (17%)" },
  "eis.effectiveCost": { en: "Effective Cost", zh: "实际费用" },
  "eis.off": { en: "OFF", zh: "折扣" },
  "eis.withDeduction": { en: "with the EIS tax deduction", zh: "通过EIS税务扣除" },

  // Registration
  "reg.title1": { en: "Register for the", zh: "免费注册" },
  "reg.title2": { en: "Free Webinar", zh: "网络研讨会" },
  "reg.subtitle": { en: "Discover how to get a professional AI-powered website at up to 68% off. No obligation, no credit card.", zh: "了解如何以高达68%的折扣获得专业AI网站。无需任何义务，无需信用卡。" },
  "reg.name": { en: "Full Name", zh: "姓名" },
  "reg.email": { en: "Email Address", zh: "电邮地址" },
  "reg.phone": { en: "Phone Number", zh: "联系电话" },
  "reg.businessType": { en: "Select Business Type", zh: "选择企业类型" },
  "reg.sessionDate": { en: "Select Session Date", zh: "选择场次日期" },
  "reg.seatsLeft": { en: "seats left", zh: "剩余名额" },
  "reg.almostFull": { en: "Almost full!", zh: "即将满额！" },
  "reg.whatsapp": { en: "Add me to the WhatsApp reminder group 💬", zh: "加入WhatsApp提醒群组 💬" },
  "reg.otherBusiness": { en: "Please specify your business type", zh: "请注明您的企业类型" },
  "reg.loading": { en: "Registering...", zh: "注册中..." },
  "reg.fnb": { en: "F&B / Restaurant", zh: "餐饮" },
  "reg.baker": { en: "Home Baker / Bakery", zh: "家庭烘焙" },
  "reg.fitness": { en: "Fitness / Gym / Studio", zh: "健身" },
  "reg.clinic": { en: "Clinic / Healthcare", zh: "诊所" },
  "reg.beauty": { en: "Beauty / Salon / Spa", zh: "美容" },
  "reg.retail": { en: "Retail / E-commerce", zh: "零售" },
  "reg.services": { en: "Professional Services", zh: "专业服务" },
  "reg.other": { en: "Other", zh: "其他" },

  // Success
  "success.title": { en: "You're In!", zh: "报名成功！" },
  "success.msg": { en: "Check your email for confirmation details. We'll see you at the webinar!", zh: "请查看您的电邮获取确认详情。我们研讨会见！" },
  "success.zoom": { en: "Join via Zoom", zh: "通过Zoom加入" },

  // FAQ
  "faq.title": { en: "Frequently Asked Questions", zh: "常见问题" },
  "faq.1.q": { en: "Is this webinar really free?", zh: "这场研讨会真的免费吗？" },
  "faq.1.a": { en: "Yes, 100% free. No credit card needed. We'll share actionable strategies you can use immediately.", zh: "是的，100%免费。无需信用卡。我们将分享您可以立即使用的实用策略。" },
  "faq.2.q": { en: "What is the EIS 400% tax deduction?", zh: "什么是EIS 400%税务扣除？" },
  "faq.2.a": { en: "Under Budget 2026, the Enterprise Innovation Scheme (EIS) allows businesses to claim a 400% tax deduction on qualifying AI and digital expenditure, up to S$50,000. This means a S$2,888 AI website effectively costs ~S$924 after tax savings.", zh: "根据2026年预算案，企业创新计划（EIS）允许企业对符合条件的AI和数字化支出申请400%税务扣除，最高S$50,000。这意味着S$2,888的AI网站在税务节省后实际成本仅约S$924。" },
  "faq.3.q": { en: "Do I need technical knowledge?", zh: "我需要技术知识吗？" },
  "faq.3.a": { en: "Not at all. Our webinar is designed for business owners, not developers. We'll explain everything in simple terms.", zh: "完全不需要。我们的研讨会专为企业主设计，而非开发者。我们会用简单的语言解释一切。" },
  "faq.4.q": { en: "Will there be a replay?", zh: "会有回放吗？" },
  "faq.4.a": { en: "No. This is a live-only session — there will be no replay link. If you want the insights and the exclusive webinar bonus, you need to show up live. We keep it exclusive so we can give our full attention to everyone in the room.", zh: "没有。这是仅限直播的场次 — 不会有回放链接。如果您想获得洞察和独家研讨会奖励，您需要现场参加。我们保持独家性，以便为每位参与者提供全部关注。" },
  "faq.5.q": { en: "How is IonicX different from web agencies?", zh: "IonicX与网页代理公司有什么不同？" },
  "faq.5.a": { en: "We use AI agents to build faster (2-3 weeks vs 2-3 months), at a fraction of the cost. Every site is custom, not a template. And everything qualifies for the EIS deduction.", zh: "我们使用AI代理更快地构建（2-3周 vs 2-3个月），成本仅为一小部分。每个网站都是定制的，不是模板。而且一切都符合EIS扣除资格。" },

  // Final CTA
  "final.title": { en: "Don't Leave Money on the Table", zh: "别把钱留在桌上" },
  "final.subtitle": { en: "Every week you wait is revenue your competitors are already saving. The EIS 400% deduction window won't last forever — and neither will these seats.", zh: "你每多等一周，竞争对手就多省一周的钱。EIS 400%扣除优惠不会永远持续 — 名额也不会。" },

  // Error
  "error.generic": { en: "Something went wrong. Please try again.", zh: "出现错误，请重试。" },
};

/* ───────── helpers ───────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`px-4 py-16 md:py-24 max-w-5xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  );
}

function CTAButton({ className = "" }: { className?: string }) {
  const { t } = useContext(LangCtx);
  return (
    <a
      href="#register"
      className={`inline-block px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-[#0a0a1a] hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,255,136,0.3)] ${className}`}
    >
      {t("hero.cta")}
    </a>
  );
}

function SeatsBadge() {
  const { t } = useContext(LangCtx);
  return (
    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
      {t("hero.badge")}
    </span>
  );
}

/* ───────── Language Toggle ───────── */
function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <button
      onClick={() => setLang(lang === "en" ? "zh" : "en")}
      className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all shadow-lg"
    >
      {lang === "en" ? "中文" : "EN"}
    </button>
  );
}

/* ───────── get next Fridays ───────── */
function getNextFridays(count: number): Date[] {
  const dates: Date[] = [];
  const now = new Date();
  const d = new Date(now);
  d.setDate(d.getDate() + ((5 - d.getDay() + 7) % 7 || 7));
  d.setHours(21, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    dates.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }
  return dates;
}

function formatFriday(d: Date): string {
  return d.toLocaleDateString("en-SG", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) + " — 9:00 PM SGT";
}

/* ───────── countdown ───────── */
function Countdown() {
  const { t } = useContext(LangCtx);
  const nextFriday = getNextFridays(1)[0];
  const target = nextFriday.getTime();
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const Box = ({ n, label }: { n: number; label: string }) => (
    <div className="flex flex-col items-center">
      <span className="text-3xl md:text-5xl font-bold text-[#00d4ff] font-[Space_Grotesk]">
        {String(n).padStart(2, "0")}
      </span>
      <span className="text-xs text-[#8892b0] uppercase tracking-wider mt-1">{label}</span>
    </div>
  );

  return (
    <div className="my-8">
      <p className="text-center text-[#8892b0] text-sm mb-3">{t("hero.countdown")}</p>
      <div className="flex gap-6 justify-center">
        <Box n={left.d} label={t("countdown.days")} />
        <span className="text-3xl text-[#00d4ff] self-start mt-1">:</span>
        <Box n={left.h} label={t("countdown.hours")} />
        <span className="text-3xl text-[#00d4ff] self-start mt-1">:</span>
        <Box n={left.m} label={t("countdown.min")} />
        <span className="text-3xl text-[#00d4ff] self-start mt-1">:</span>
        <Box n={left.s} label={t("countdown.sec")} />
      </div>
    </div>
  );
}

/* ───────── EIS calculator ───────── */
function EISCalculator() {
  const { t } = useContext(LangCtx);
  const [cost, setCost] = useState(2888);
  const deduction = cost * 4;
  const taxSaved = deduction * 0.17;
  const effective = Math.max(0, cost - taxSaved);
  const pctOff = cost > 0 ? Math.round((taxSaved / cost) * 100) : 0;

  return (
    <div className="glass rounded-2xl p-6 md:p-10 max-w-lg mx-auto">
      <h3 className="text-xl font-bold text-[#00ff88] mb-6 text-center font-[Space_Grotesk]">
        {t("eis.calcTitle")}
      </h3>
      <label className="block text-sm text-[#8892b0] mb-2">{t("eis.costLabel")}</label>
      <input
        type="number"
        value={cost}
        onChange={(e) => setCost(Number(e.target.value))}
        className="w-full bg-white/5 border border-[rgba(0,212,255,0.3)] rounded-lg px-4 py-3 text-white text-lg mb-6 focus:outline-none focus:border-[#00d4ff]"
      />
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-[#8892b0]">{t("eis.deduction")}</span>
          <span className="text-[#00d4ff] font-bold">S${deduction.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#8892b0]">{t("eis.taxSavings")}</span>
          <span className="text-[#00ff88] font-bold">S${Math.round(taxSaved).toLocaleString()}</span>
        </div>
        <hr className="border-white/10" />
        <div className="flex justify-between text-lg">
          <span className="font-bold">{t("eis.effectiveCost")}</span>
          <span className="text-[#00ff88] font-bold">S${Math.round(effective).toLocaleString()}</span>
        </div>
        <div className="text-center mt-4">
          <span className="text-2xl font-bold text-[#00ff88]">{pctOff}% {t("eis.off")}</span>
          <p className="text-xs text-[#8892b0] mt-1">{t("eis.withDeduction")}</p>
        </div>
      </div>
    </div>
  );
}

/* ───────── FAQ ───────── */
function FAQ() {
  const { t } = useContext(LangCtx);
  const faqs = [
    { q: t("faq.1.q"), a: t("faq.1.a") },
    { q: t("faq.2.q"), a: t("faq.2.a") },
    { q: t("faq.3.q"), a: t("faq.3.a") },
    { q: t("faq.4.q"), a: t("faq.4.a") },
    { q: t("faq.5.q"), a: t("faq.5.a") },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      {faqs.map((f, i) => (
        <div key={i} className="glass rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-white hover:text-[#00d4ff] transition-colors"
          >
            {f.q}
            <span className="text-[#00d4ff] ml-4 text-xl">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-5 pb-4 text-[#8892b0] text-sm leading-relaxed">
              {f.a}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ───────── Registration Form ───────── */
function RegistrationForm() {
  const { t } = useContext(LangCtx);
  const fridays = getNextFridays(2);
  const [form, setForm] = useState({ name: "", email: "", phone: "", businessType: "", otherBusiness: "", sessionDate: "", whatsapp: true });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/webinar-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="glass rounded-2xl p-8 text-center max-w-lg mx-auto">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-[#00ff88] mb-2 font-[Space_Grotesk]">{t("success.title")}</h3>
        <p className="text-[#8892b0] mb-4">{t("success.msg")}</p>
        <a href="https://us04web.zoom.us/j/77910233906" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#00d4ff] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00ff88] transition-colors">{t("success.zoom")}</a>
        <p className="text-[#8892b0]/60 text-sm mt-2">Meeting ID: 779 1023 3906</p>
      </div>
    );
  }

  const inputCls = "w-full bg-white/5 border border-[rgba(0,212,255,0.2)] rounded-lg px-4 py-3 text-white placeholder:text-[#8892b0]/50 focus:outline-none focus:border-[#00d4ff] transition-colors";

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-10 max-w-lg mx-auto space-y-4">
      <input required placeholder={t("reg.name")} className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input required type="email" placeholder={t("reg.email")} className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input required placeholder={t("reg.phone")} className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <select required className={inputCls} value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })}>
        <option value="" disabled>{t("reg.businessType")}</option>
        <option value="fnb">{t("reg.fnb")}</option>
        <option value="baker">{t("reg.baker")}</option>
        <option value="fitness">{t("reg.fitness")}</option>
        <option value="clinic">{t("reg.clinic")}</option>
        <option value="beauty">{t("reg.beauty")}</option>
        <option value="retail">{t("reg.retail")}</option>
        <option value="services">{t("reg.services")}</option>
        <option value="other">{t("reg.other")}</option>
      </select>
      {form.businessType === "other" && (
        <input required placeholder={t("reg.otherBusiness")} className={inputCls} value={form.otherBusiness} onChange={(e) => setForm({ ...form, otherBusiness: e.target.value })} />
      )}
      <select required className={inputCls} value={form.sessionDate} onChange={(e) => setForm({ ...form, sessionDate: e.target.value })}>
        <option value="" disabled>{t("reg.sessionDate")}</option>
        {fridays.map((f, i) => {
          const spotsLeft = i === 0 ? 5 : 28;
          const urgency = i === 0 ? "🔥 " : "";
          return <option key={i} value={f.toISOString()}>{formatFriday(f)} — {urgency}{spotsLeft} {t("reg.seatsLeft")}</option>;
        })}
      </select>
      <label className="flex items-center gap-3 text-sm text-[#8892b0] cursor-pointer">
        <input type="checkbox" checked={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.checked })} className="w-4 h-4 accent-[#00ff88]" />
        {t("reg.whatsapp")}
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-[#0a0a1a] hover:scale-[1.02] transition-transform disabled:opacity-50 shadow-[0_0_30px_rgba(0,255,136,0.3)]"
      >
        {status === "loading" ? t("reg.loading") : t("hero.cta")}
      </button>
      {status === "error" && <p className="text-red-400 text-sm text-center">{t("error.generic")}</p>}
    </form>
  );
}

/* ───────── PAGE ───────── */
export default function WebinarPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: string) => translations[key]?.[lang] ?? key;

  return (
    <LangCtx.Provider value={{ lang, t }}>
      <main className="min-h-screen overflow-x-hidden">
        <LangToggle lang={lang} setLang={setLang} />

        {/* ── HERO ── */}
        <section className="relative px-4 pt-20 pb-16 md:pt-32 md:pb-24 text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <SeatsBadge />
            <h1 className="mt-6 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight font-[Space_Grotesk] bg-gradient-to-r from-white via-[#00d4ff] to-[#00ff88] bg-clip-text text-transparent">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[#8892b0] max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <Countdown />
            <CTAButton className="mt-4" />
          </motion.div>
        </section>

        {/* ── WHAT YOU'LL LEARN ── */}
        <Section>
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 font-[Space_Grotesk]">
            {t("secrets.title")} <span className="text-[#00d4ff]">{t("secrets.live")}</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "⚡", title: t("secrets.1.title"), desc: t("secrets.1.desc") },
              { icon: "🧮", title: t("secrets.2.title"), desc: t("secrets.2.desc") },
              { icon: "🤖", title: t("secrets.3.title"), desc: t("secrets.3.desc") },
            ].map((s, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center hover:border-[#00d4ff]/40 transition-colors">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-lg font-bold text-[#00ff88] mb-2 font-[Space_Grotesk]">{s.title}</h3>
                <p className="text-sm text-[#8892b0] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── WHO IS THIS FOR ── */}
        <Section className="text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 font-[Space_Grotesk]">
            {t("whoisthisfor.title")} <span className="text-[#00ff88]">{t("whoisthisfor.you")}</span>
          </h2>
          <div className="max-w-2xl mx-auto text-left space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-start gap-3 text-[#e0e0e0]">
                <span className="text-[#00ff88] mt-0.5">✓</span>
                <span>{t(`whoisthisfor.${i}`)}</span>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <CTAButton />
          </div>
        </Section>

        {/* ── ABOUT THE HOST ── */}
        <Section>
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 font-[Space_Grotesk]">
            {t("host.title")}
          </h2>
          <div className="glass rounded-2xl p-6 md:p-10 max-w-3xl mx-auto md:flex gap-8 items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full flex-shrink-0 mx-auto md:mx-0 mb-6 md:mb-0 overflow-hidden border-2 border-[#00d4ff]">
              <img src="/images/isaac-host.webp" alt="Isaac Yap — Founder, IonicX AI" className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#00d4ff] font-[Space_Grotesk]">Isaac Yap</h3>
              <p className="text-[#00ff88] text-sm mb-3">{t("host.role")}</p>
              <p className="text-[#8892b0] text-sm leading-relaxed">{t("host.bio")}</p>
            </div>
          </div>
        </Section>

        {/* ── SOCIAL PROOF ── */}
        <Section>
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 font-[Space_Grotesk]">
            {t("testimonials.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { quoteKey: "testimonials.1.quote", name: "Fabian", biz: "Registered Massage Therapist — @fab.thestretchlad" },
              { quoteKey: "testimonials.2.quote", name: "Lydia", biz: "Tattoo Artist — @tattbyds" },
            ].map((item, i) => (
              <div key={i} className="glass rounded-2xl p-6">
                <p className="text-[#e0e0e0] text-sm italic leading-relaxed mb-4">&ldquo;{t(item.quoteKey)}&rdquo;</p>
                <div className="text-[#00d4ff] font-bold text-sm">{item.name}</div>
                <div className="text-[#8892b0] text-xs">{item.biz}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── EIS CALCULATOR ── */}
        <Section className="text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 font-[Space_Grotesk]">
            {t("eis.title")} <span className="text-[#00ff88]">{t("eis.titleHighlight")}</span>
          </h2>
          <p className="text-[#8892b0] mb-10 max-w-xl mx-auto">
            {t("eis.subtitle")}
          </p>
          <EISCalculator />
        </Section>

        {/* ── REGISTRATION ── */}
        <div id="register">
        <Section className="text-center">
          <SeatsBadge />
          <h2 className="text-2xl md:text-4xl font-bold mt-6 mb-4 font-[Space_Grotesk]">
            {t("reg.title1")} <span className="text-[#00d4ff]">{t("reg.title2")}</span>
          </h2>
          <p className="text-[#8892b0] mb-10 max-w-xl mx-auto">
            {t("reg.subtitle")}
          </p>
          <RegistrationForm />
        </Section>
        </div>

        {/* ── FAQ ── */}
        <Section>
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 font-[Space_Grotesk]">
            {t("faq.title")}
          </h2>
          <FAQ />
        </Section>

        {/* ── FINAL CTA ── */}
        <Section className="text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 font-[Space_Grotesk]">
            {t("final.title")}
          </h2>
          <p className="text-[#8892b0] mb-8 max-w-lg mx-auto">
            {t("final.subtitle")}
          </p>
          <CTAButton />
        </Section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-white/5 py-10 px-4 text-center">
          <p className="text-[#00d4ff] font-bold text-lg font-[Space_Grotesk]">IonicX AI</p>
          <p className="text-[#8892b0] text-sm mt-1">Personal AI Agents for SMEs</p>
          <p className="text-[#8892b0]/50 text-xs mt-4">UEN: 53518824B &middot; Singapore</p>
        </footer>
      </main>
    </LangCtx.Provider>
  );
}
