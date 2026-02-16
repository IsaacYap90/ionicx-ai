"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

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

/* ─── Navbar ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Solutions", "#solutions"],
    ["Pricing", "#pricing"],
    ["About", "#about"],
    ["Contact", "#contact"],
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
          <a
            href="#contact"
            className="px-5 py-2 rounded-full bg-[#00ff88] text-[#0a0a1a] font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,255,136,0.4)] transition-shadow"
          >
            Get Started
          </a>
        </div>
        <button className="md:hidden text-[#00d4ff]" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
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
  return (
    <Section className="min-h-screen flex items-center justify-center pt-20 grid-bg">
      {/* gradient orbs */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00d4ff] opacity-[0.04] blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-[#6366F1] opacity-[0.06] blur-[120px]" />

      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-6 px-4 py-2 rounded-full glass text-sm text-[#00d4ff]"
        >
          🏛️ Qualifies for SG Budget 2026 EIS
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Your AI{" "}
          <span className="text-[#00d4ff] text-glow-cyan">Operations Manager</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-[var(--text-dim)] max-w-2xl mx-auto mb-10"
        >
          One AI agent that runs your scheduling, clients, and ops — all from WhatsApp.{" "}
          <span className="text-[#00ff88] font-semibold">400% EIS tax deduction</span> eligible.
        </motion.p>
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="inline-block px-8 py-4 rounded-full bg-[#00ff88] text-[#0a0a1a] font-bold text-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all hover:scale-105"
        >
          Get Your Free AI Consultation →
        </motion.a>
      </div>
    </Section>
  );
}

/* ─── EIS Calculator ─── */
function Calculator() {
  const [investment, setInvestment] = useState(2888);
  const deduction = investment * 4;
  const savings = Math.round(deduction * 0.17);
  const effective = investment - savings;

  return (
    <Section id="calculator" className="py-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          EIS Tax <span className="text-[#00d4ff]">Calculator</span>
        </h2>
        <p className="text-center text-[var(--text-dim)] mb-12">
          See how much you save with the 400% Enterprise Innovation Scheme
        </p>
        <div className="glass rounded-2xl p-8 md:p-12 glow-cyan">
          <label className="block text-sm text-[var(--text-dim)] mb-2">
            Your AI Investment
          </label>
          <div className="text-4xl font-bold text-[#00d4ff] text-glow-cyan mb-6">
            {fmt(investment)}
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
              ["400% Deduction", fmt(deduction), "#00d4ff"],
              ["Tax Savings (17%)", fmt(savings), "#00ff88"],
              ["Effective Cost", fmt(effective), "#00ff88"],
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
const solutions = [
  {
    icon: "🧠",
    title: "AI Personal Operations Manager",
    desc: "Your own AI agent on WhatsApp/Telegram. Manage scheduling, clients, and daily ops with natural language — powered by a real-time database. The brain of your business.",
    featured: true,
  },
  {
    icon: "🌐",
    title: "AI-Powered Websites",
    desc: "Smart ordering, booking, e-commerce with built-in AI chatbot that converts visitors to customers.",
  },
  {
    icon: "🤖",
    title: "AI Chatbots",
    desc: "24/7 customer service, booking automation, FAQ handling — in English, Mandarin, Malay & more.",
  },
  {
    icon: "📊",
    title: "AI Analytics",
    desc: "Real-time business intelligence dashboards that turn your data into actionable insights.",
  },
  {
    icon: "⚡",
    title: "AI Automation",
    desc: "Workflow automation, content generation, multilingual translation — save hours every week.",
  },
];

function Solutions() {
  return (
    <Section id="solutions" className="py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Our <span className="text-[#00d4ff]">Solutions</span>
        </h2>
        <p className="text-center text-[var(--text-dim)] mb-12 max-w-xl mx-auto">
          End-to-end AI solutions built for Singapore SMEs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-2xl p-8 hover:border-[#00d4ff]/30 transition-colors group ${(s as any).featured ? "md:col-span-2 border-[#00d4ff]/40 glow-cyan" : ""}`}
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-[#00d4ff] transition-colors">
                {s.title}
              </h3>
              <p className="text-[var(--text-dim)]">{s.desc}</p>
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
    name: "Starter",
    price: 1888,
    features: ["AI-Powered Website", "AI Chatbot Integration", "Mobile Responsive", "3 Months Support"],
    popular: false,
  },
  {
    name: "Growth",
    price: 3888,
    features: ["Everything in Starter", "CRM Integration", "AI Analytics Dashboard", "6 Months Support", "Priority Delivery"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 8888,
    suffix: "+",
    features: ["Everything in Growth", "Custom AI Solutions", "API Integrations", "12 Months Support", "Dedicated Account Manager"],
    popular: false,
  },
];

function Pricing() {
  return (
    <Section id="pricing" className="py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Simple <span className="text-[#00d4ff]">Pricing</span>
        </h2>
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-[#00ff88]">
            ✅ All plans qualify for 400% EIS tax deduction
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, i) => {
            const savings = Math.round(p.price * 4 * 0.17);
            const effective = p.price - savings;
            return (
              <motion.div
                key={p.name}
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
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                <div className="text-3xl font-bold text-[#00d4ff] mb-1">
                  {fmt(p.price)}
                  {p.suffix || ""}
                </div>
                <div className="text-sm text-[#00ff88] mb-6">
                  After EIS: ~{fmt(effective)} effective cost
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-dim)]">
                      <span className="text-[#00ff88] mt-0.5">✓</span>
                      {f}
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
                  Get Started
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
const steps = [
  { num: "01", title: "Free Consultation", desc: "Tell us about your business and goals" },
  { num: "02", title: "AI Solution Design", desc: "We craft a tailored AI strategy for you" },
  { num: "03", title: "Build & Deploy", desc: "We build, test, and launch your AI solution" },
  { num: "04", title: "Claim EIS Deduction", desc: "We help you claim your 400% tax deduction" },
];

function HowItWorks() {
  return (
    <Section className="py-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It <span className="text-[#00d4ff]">Works</span>
        </h2>
        <div className="space-y-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex gap-6 items-start relative"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/40 flex items-center justify-center text-[#00d4ff] font-bold text-sm glow-cyan">
                  {s.num}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px h-16 bg-gradient-to-b from-[#00d4ff]/30 to-transparent" />
                )}
              </div>
              <div className="pb-12">
                <h3 className="text-lg font-bold mb-1">{s.title}</h3>
                <p className="text-[var(--text-dim)] text-sm">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── About ─── */
function About() {
  return (
    <Section id="about" className="py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          About <span className="text-[#00d4ff]">IonicX AI</span>
        </h2>
        <p className="text-[var(--text-dim)] text-lg mb-8 leading-relaxed">
          We&apos;re a Singapore-based AI solutions company on a mission to make AI accessible
          and affordable for every SME. Powered by cutting-edge AI agents and backed by
          Singapore&apos;s national AI mission, we help businesses automate, grow, and save.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            ["🏢", "ACRA Registered"],
            ["🇸🇬", "SG Budget 2026 Aligned"],
            ["🤖", "AI-Native Company"],
          ].map(([icon, label]) => (
            <div key={label} className="glass rounded-xl px-6 py-4 flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Contact ─── */
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <Section id="contact" className="py-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Book Your Free{" "}
          <span className="text-[#00ff88] text-glow-green">AI Consultation</span>
        </h2>
        <p className="text-center text-[var(--text-dim)] mb-12">
          Tell us about your business — we&apos;ll show you what AI can do for you.
        </p>
        {submitted ? (
          <div className="glass rounded-2xl p-12 text-center glow-green">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-[var(--text-dim)]">
              We&apos;ll get back to you within 24 hours.
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
              {[
                ["Name", "name", "text", "Your name"],
                ["Email", "email", "email", "you@company.com"],
                ["Phone", "phone", "tel", "+65 XXXX XXXX"],
                ["Business Type", "business", "text", "e.g. F&B, Retail, Services"],
              ].map(([label, name, type, placeholder]) => (
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
              <label className="block text-sm text-[var(--text-dim)] mb-2">Message</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your business and what you'd like to automate..."
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:border-[#00d4ff]/50 focus:outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#00ff88] text-[#0a0a1a] font-bold text-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all hover:scale-[1.02]"
            >
              Get Your Free AI Consultation →
            </button>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--text-dim)]">
              <a
                href="https://wa.me/6581234567"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00ff88] transition-colors"
              >
                💬 WhatsApp Us
              </a>
              <span>📧 hello@ionicx.ai</span>
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-[var(--card-border)] px-6 py-12 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xl font-bold font-[family-name:'Space_Grotesk']">
          IonicX<span className="text-[#00d4ff]"> AI</span>
        </div>
        <div className="flex gap-6 text-sm text-[var(--text-dim)]">
          <a href="#solutions" className="hover:text-[#00d4ff] transition-colors">Solutions</a>
          <a href="#pricing" className="hover:text-[#00d4ff] transition-colors">Pricing</a>
          <a href="#about" className="hover:text-[#00d4ff] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#00d4ff] transition-colors">Contact</a>
        </div>
        <div className="text-sm text-[var(--text-dim)]">
          © 2026 IonicX AI | UEN: 53518824B
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
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
    </main>
  );
}
