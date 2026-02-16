"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import ChatWidget from "@/components/ChatWidget";

/* ─── helpers ─── */
const fmt = (n: number) =>
  "S$" + n.toLocaleString("en-SG", { minimumFractionDigits: 0 });

function Section({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`relative px-6 md:px-12 lg:px-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* ─── Language Toggle ─── */
function LangToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <button
      onClick={() => setLang(lang === "en" ? "zh" : "en")}
      className="px-3 py-1.5 rounded-full glass text-xs font-semibold tracking-wide transition-colors hover:border-[#00d4ff]/50"
      aria-label="Toggle language"
    >
      <span className={lang === "en" ? "text-[#00d4ff]" : "text-[var(--text-dim)]"}>EN</span>
      <span className="text-[var(--text-dim)] mx-1">|</span>
      <span className={lang === "zh" ? "text-[#00d4ff]" : "text-[var(--text-dim)]"}>中文</span>
    </button>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const links = [
    [t("nav.solutions"), "#solutions"],
    [t("nav.pricing"), "#pricing"],
    [t("nav.about"), "#about"],
    [t("nav.contact"), "#contact"],
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--card-border)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="text-2xl font-bold font-[family-name:'Space_Grotesk']">
          IonicX<span className="text-[#00d4ff]"> AI</span>
        </a>
        <div className="hidden md:flex gap-8 items-center">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-[var(--text-dim)] hover:text-[#00d4ff] transition-colors"
            >
              {label}
            </a>
          ))}
          <LangToggle />
          <a
            href="#contact"
            className="px-5 py-2 rounded-full bg-[#00ff88] text-[#0a0a1a] font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-shadow"
          >
            {t("nav.getStarted")}
          </a>
        </div>
        <div className="flex md:hidden items-center gap-3">
          <LangToggle />
          <button className="text-[#00d4ff]" onClick={() => setOpen(!open)}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden glass border-t border-[var(--card-border)] px-6 pb-4">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-3 text-[var(--text-dim)] hover:text-[#00d4ff]"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  const { t } = useLanguage();
  return (
    <Section className="min-h-screen flex items-center justify-center pt-20 grid-bg">
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00d4ff] opacity-[0.04] blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-[#6366F1] opacity-[0.06] blur-[120px]" />

      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-6 px-4 py-2 rounded-full glass text-sm text-[#00d4ff]"
        >
          {t("hero.badge")}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          {t("hero.titlePrefix")}{" "}
          <span className="text-[#00d4ff] text-glow-cyan">{t("hero.titleHighlight")}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-[var(--text-dim)] max-w-2xl mx-auto mb-10"
        >
          {t("hero.desc")}{" "}
          <span className="text-[#00ff88] font-semibold">{t("hero.eisHighlight")}</span>
          {t("hero.eisSuffix")}
        </motion.p>
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="inline-block px-8 py-4 rounded-full bg-[#00ff88] text-[#0a0a1a] font-bold text-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all hover:scale-105"
        >
          {t("hero.cta")}
        </motion.a>
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
        <p className="text-center text-[var(--text-dim)] mb-12">
          {t("calc.desc")}
        </p>
        <div className="glass rounded-2xl p-8 md:p-12 glow-cyan">
          <label className="block text-sm text-[var(--text-dim)] mb-2">
            {t("calc.label")}
          </label>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[#00d4ff] text-2xl font-bold">S$</span>
            <input
              type="number"
              min={1000}
              max={50000}
              step={100}
              value={investment}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v >= 0 && v <= 50000) setInvestment(v);
              }}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-3xl font-bold text-[#00d4ff] w-full outline-none focus:border-[#00d4ff] transition-colors"
            />
          </div>
          <input
            type="range"
            min={1000}
            max={50000}
            step={100}
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="w-full mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              [t("calc.deduction"), fmt(deduction), "#00d4ff"],
              [t("calc.taxSavings"), fmt(savings), "#00ff88"],
              [t("calc.effectiveCost"), fmt(effective), "#00ff88"],
            ].map(([label, value, color]) => (
              <div key={label} className="glass rounded-xl p-6 text-center">
                <div className="text-sm text-[var(--text-dim)] mb-2">{label}</div>
                <div className="text-2xl font-bold" style={{ color: color as string }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Solutions ─── */
const solutionIcons = ["🧠", "🌐", "🤖", "📊", "⚡"];
const solutionFeatured = [true, false, false, false, false];

function Solutions() {
  const { t } = useLanguage();
  return (
    <Section id="solutions" className="py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {t("solutions.title")} <span className="text-[#00d4ff]">{t("solutions.titleHighlight")}</span>
        </h2>
        <p className="text-center text-[var(--text-dim)] mb-12 max-w-xl mx-auto">
          {t("solutions.desc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutionIcons.map((icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-2xl p-8 hover:border-[#00d4ff]/30 transition-colors group ${solutionFeatured[i] ? "md:col-span-2 border-[#00d4ff]/40 glow-cyan" : ""}`}
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-[#00d4ff] transition-colors">
                {t(`solutions.${i}.title`)}
              </h3>
              <p className="text-[var(--text-dim)]">{t(`solutions.${i}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Pricing ─── */
const plans = [
  {
    price: 2888,
    maintenance: 888,
    features: ["AI-Powered Website", "AI Chatbot Integration", "Mobile Responsive", "Hosting & SSL", "SEO Optimisation", "Email Support"],
    popular: false,
  },
  {
    price: 5888,
    maintenance: 1288,
    features: ["Everything in Starter", "CRM Integration", "AI Analytics Dashboard", "AI-Powered Features", "Priority Support", "Priority Delivery"],
    popular: true,
  },
  {
    price: 12888,
    suffix: "+",
    maintenance: 1888,
    features: ["Everything in Growth", "Full AI Suite", "Custom Integrations", "API Integrations", "Dedicated Support", "Dedicated Account Manager"],
    popular: false,
  },
];

function Pricing() {
  const { t } = useLanguage();
  return (
    <Section id="pricing" className="py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {t("pricing.title")} <span className="text-[#00d4ff]">{t("pricing.titleHighlight")}</span>
        </h2>
        <div className="text-center mb-4">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-[#00ff88]">
            {t("pricing.eisBadge")}
          </span>
        </div>
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-[#00d4ff]">
            {t("pricing.aiBadge")}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, i) => {
            const savings = Math.round(p.price * 4 * 0.17);
            const effective = p.price - savings;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass rounded-2xl p-8 relative ${
                  p.popular ? "border-[#00d4ff]/40 glow-cyan" : ""
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00d4ff] text-[#0a0a1a] text-xs font-bold">
                    {t("pricing.popular")}
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{t(`pricing.plan.${i}.name`)}</h3>
                <div className="text-3xl font-bold text-[#00d4ff] mb-1">
                  {fmt(p.price)}
                  {p.suffix || ""}
                </div>
                <div className="text-sm text-[var(--text-dim)] mb-1">
                  + {fmt(p.maintenance)}{t("pricing.maintenance")}
                </div>
                <div className="text-xs text-[var(--text-dim)] mb-1 opacity-70">
                  {t("pricing.includes")}
                </div>
                <div className="text-sm text-[#00ff88] mb-6">
                  {t("pricing.afterEIS").replace("{amount}", fmt(effective))}
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-dim)]">
                      <span className="text-[#00ff88] mt-0.5">✓</span>
                      {t(`pricing.features.${f}`)}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`block text-center py-3 rounded-full font-semibold text-sm transition-all ${
                    p.popular
                      ? "bg-[#00ff88] text-[#0a0a1a] hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]"
                      : "glass border border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10"
                  }`}
                >
                  {t("pricing.cta")}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ─── How It Works ─── */
const stepNums = ["01", "02", "03", "04"];

function HowItWorks() {
  const { t } = useLanguage();
  return (
    <Section className="py-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t("steps.title")} <span className="text-[#00d4ff]">{t("steps.titleHighlight")}</span>
        </h2>
        <div className="space-y-0">
          {stepNums.map((num, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex gap-6 items-start relative"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/40 flex items-center justify-center text-[#00d4ff] font-bold text-sm glow-cyan">
                  {num}
                </div>
                {i < stepNums.length - 1 && (
                  <div className="w-px h-16 bg-gradient-to-b from-[#00d4ff]/30 to-transparent" />
                )}
              </div>
              <div className="pb-12">
                <h3 className="text-lg font-bold mb-1">{t(`steps.${i}.title`)}</h3>
                <p className="text-[var(--text-dim)] text-sm">{t(`steps.${i}.desc`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── About ─── */
const aboutIcons = ["🏢", "🇸🇬", "🤖"];

function About() {
  const { t } = useLanguage();
  return (
    <Section id="about" className="py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {t("about.title")} <span className="text-[#00d4ff]">{t("about.titleHighlight")}</span>
        </h2>
        <p className="text-[var(--text-dim)] text-lg mb-8 leading-relaxed">
          {t("about.desc")}
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {aboutIcons.map((icon, i) => (
            <div key={i} className="glass rounded-xl px-6 py-4 flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <span className="text-sm font-medium">{t(`about.badge.${i}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Contact ─── */
function Contact() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const fields = [
    [t("contact.label.name"), "name", "text", t("contact.placeholder.name")],
    [t("contact.label.email"), "email", "email", t("contact.placeholder.email")],
    [t("contact.label.phone"), "phone", "tel", t("contact.placeholder.phone")],
    [t("contact.label.business"), "business", "text", t("contact.placeholder.business")],
  ];
  return (
    <Section id="contact" className="py-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {t("contact.title")}{" "}
          <span className="text-[#00ff88] text-glow-green">{t("contact.titleHighlight")}</span>
        </h2>
        <p className="text-center text-[var(--text-dim)] mb-12">
          {t("contact.desc")}
        </p>
        {submitted ? (
          <div className="glass rounded-2xl p-12 text-center glow-green">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-2">{t("contact.thankYou")}</h3>
            <p className="text-[var(--text-dim)]">
              {t("contact.thankYouDesc")}
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="glass rounded-2xl p-8 md:p-12 glow-cyan space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map(([label, name, type, placeholder]) => (
                <div key={name}>
                  <label className="block text-sm text-[var(--text-dim)] mb-2">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    required={name === "name" || name === "email"}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#00d4ff]/50 focus:outline-none transition-colors"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm text-[var(--text-dim)] mb-2">{t("contact.label.message")}</label>
              <textarea
                name="message"
                rows={4}
                placeholder={t("contact.placeholder.message")}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#00d4ff]/50 focus:outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#00ff88] text-[#0a0a1a] font-bold text-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all hover:scale-[1.02]"
            >
              {t("contact.submit")}
            </button>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--text-dim)]">
              <a
                href="https://wa.me/6580268821"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00ff88] transition-colors"
              >
                {t("contact.whatsapp")}
              </a>
              <span>{t("contact.email")}</span>
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}

/* ─── Footer ─── */
function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-[var(--card-border)] px-6 py-12 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xl font-bold font-[family-name:'Space_Grotesk']">
          IonicX<span className="text-[#00d4ff]"> AI</span>
        </div>
        <div className="flex gap-6 text-sm text-[var(--text-dim)]">
          <a href="#solutions" className="hover:text-[#00d4ff] transition-colors">{t("footer.solutions")}</a>
          <a href="#pricing" className="hover:text-[#00d4ff] transition-colors">{t("footer.pricing")}</a>
          <a href="#about" className="hover:text-[#00d4ff] transition-colors">{t("footer.about")}</a>
          <a href="#contact" className="hover:text-[#00d4ff] transition-colors">{t("footer.contact")}</a>
        </div>
        <div className="text-sm text-[var(--text-dim)]">
          {t("footer.copyright")}
        </div>
      </div>
      <div className="max-w-6xl mx-auto flex justify-center gap-6 mt-6 text-xs text-[var(--text-dim)]">
        <a href="/privacy" className="hover:text-[#00d4ff] transition-colors">Privacy Policy</a>
        <span>•</span>
        <a href="/terms" className="hover:text-[#00d4ff] transition-colors">Terms of Service</a>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <LanguageProvider>
      <main className="overflow-hidden">
        <Navbar />
        <Hero />
        <Calculator />
        <Solutions />
        <Pricing />
        <HowItWorks />
        <About />
        <Contact />
        <Footer />
        <ChatWidget />
      </main>
    </LanguageProvider>
  );
}
