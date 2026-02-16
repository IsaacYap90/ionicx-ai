"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, useInView } from "framer-motion";

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
  return (
    <a
      href="#register"
      className={`inline-block px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-[#0a0a1a] hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,255,136,0.3)] ${className}`}
    >
      Save Your Free Seat 🚀
    </a>
  );
}

function SeatsBadge() {
  return (
    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
      ⚡ Limited to 50 Seats
    </span>
  );
}

/* ───────── countdown ───────── */
function Countdown() {
  // Placeholder: next webinar date — change this
  const target = new Date("2026-03-15T14:00:00+08:00").getTime();
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
    <div className="flex gap-6 justify-center my-8">
      <Box n={left.d} label="Days" />
      <span className="text-3xl text-[#00d4ff] self-start mt-1">:</span>
      <Box n={left.h} label="Hours" />
      <span className="text-3xl text-[#00d4ff] self-start mt-1">:</span>
      <Box n={left.m} label="Min" />
      <span className="text-3xl text-[#00d4ff] self-start mt-1">:</span>
      <Box n={left.s} label="Sec" />
    </div>
  );
}

/* ───────── EIS calculator ───────── */
function EISCalculator() {
  const [cost, setCost] = useState(2888);
  const deduction = cost * 4;
  const taxSaved = deduction * 0.17;
  const effective = Math.max(0, cost - taxSaved);
  const pctOff = cost > 0 ? Math.round((taxSaved / cost) * 100) : 0;

  return (
    <div className="glass rounded-2xl p-6 md:p-10 max-w-lg mx-auto">
      <h3 className="text-xl font-bold text-[#00ff88] mb-6 text-center font-[Space_Grotesk]">
        💰 EIS Savings Calculator
      </h3>
      <label className="block text-sm text-[#8892b0] mb-2">Your Project Cost (S$)</label>
      <input
        type="number"
        value={cost}
        onChange={(e) => setCost(Number(e.target.value))}
        className="w-full bg-white/5 border border-[rgba(0,212,255,0.3)] rounded-lg px-4 py-3 text-white text-lg mb-6 focus:outline-none focus:border-[#00d4ff]"
      />
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-[#8892b0]">400% Tax Deduction</span>
          <span className="text-[#00d4ff] font-bold">S${deduction.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#8892b0]">Tax Savings (17%)</span>
          <span className="text-[#00ff88] font-bold">S${Math.round(taxSaved).toLocaleString()}</span>
        </div>
        <hr className="border-white/10" />
        <div className="flex justify-between text-lg">
          <span className="font-bold">Effective Cost</span>
          <span className="text-[#00ff88] font-bold">S${Math.round(effective).toLocaleString()}</span>
        </div>
        <div className="text-center mt-4">
          <span className="text-2xl font-bold text-[#00ff88]">{pctOff}% OFF</span>
          <p className="text-xs text-[#8892b0] mt-1">with the EIS tax deduction</p>
        </div>
      </div>
    </div>
  );
}

/* ───────── FAQ ───────── */
const faqs = [
  { q: "Is this webinar really free?", a: "Yes, 100% free. No credit card needed. We'll share actionable strategies you can use immediately." },
  { q: "What is the EIS 400% tax deduction?", a: "Under Budget 2026, the Enterprise Innovation Scheme (EIS) allows businesses to claim a 400% tax deduction on qualifying AI and digital expenditure, up to S$50,000. This means a S$2,888 AI website effectively costs ~S$924 after tax savings." },
  { q: "Do I need technical knowledge?", a: "Not at all. Our webinar is designed for business owners, not developers. We'll explain everything in simple terms." },
  { q: "Will there be a replay?", a: "A 48-hour replay link will be sent to registered attendees. But we highly recommend attending live for Q&A." },
  { q: "How is IonicX different from web agencies?", a: "We use AI agents to build faster (2-3 weeks vs 2-3 months), at a fraction of the cost. Every site is custom, not a template. And everything qualifies for the EIS deduction." },
];

function FAQ() {
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
  const [form, setForm] = useState({ name: "", email: "", phone: "", businessType: "", otherBusiness: "", whatsapp: true });
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
        <h3 className="text-2xl font-bold text-[#00ff88] mb-2 font-[Space_Grotesk]">You&apos;re In!</h3>
        <p className="text-[#8892b0]">Check your email for confirmation details. We&apos;ll see you at the webinar!</p>
      </div>
    );
  }

  const inputCls = "w-full bg-white/5 border border-[rgba(0,212,255,0.2)] rounded-lg px-4 py-3 text-white placeholder:text-[#8892b0]/50 focus:outline-none focus:border-[#00d4ff] transition-colors";

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-10 max-w-lg mx-auto space-y-4">
      <input required placeholder="Full Name" className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input required type="email" placeholder="Email Address" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input required placeholder="Phone Number" className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <select required className={inputCls} value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })}>
        <option value="" disabled>Select Business Type</option>
        <option value="fnb">F&B / Restaurant</option>
        <option value="baker">Home Baker / Bakery</option>
        <option value="fitness">Fitness / Gym / Studio</option>
        <option value="clinic">Clinic / Healthcare</option>
        <option value="beauty">Beauty / Salon / Spa</option>
        <option value="retail">Retail / E-commerce</option>
        <option value="services">Professional Services</option>
        <option value="other">Other</option>
      </select>
      {form.businessType === "other" && (
        <input required placeholder="Please specify your business type" className={inputCls} value={form.otherBusiness} onChange={(e) => setForm({ ...form, otherBusiness: e.target.value })} />
      )}
      <label className="flex items-center gap-3 text-sm text-[#8892b0] cursor-pointer">
        <input type="checkbox" checked={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.checked })} className="w-4 h-4 accent-[#00ff88]" />
        Add me to the WhatsApp reminder group 💬
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-[#0a0a1a] hover:scale-[1.02] transition-transform disabled:opacity-50 shadow-[0_0_30px_rgba(0,255,136,0.3)]"
      >
        {status === "loading" ? "Registering..." : "Save Your Free Seat 🚀"}
      </button>
      {status === "error" && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>}
    </form>
  );
}

/* ───────── PAGE ───────── */
export default function WebinarPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative px-4 pt-20 pb-16 md:pt-32 md:pb-24 text-center max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <SeatsBadge />
          <h1 className="mt-6 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight font-[Space_Grotesk] bg-gradient-to-r from-white via-[#00d4ff] to-[#00ff88] bg-clip-text text-transparent">
            How SG Small Businesses Save Up to 68% on AI Solutions with the New Government Tax Deduction
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#8892b0] max-w-2xl mx-auto">
            Free live webinar — discover how Budget 2026&apos;s 400% EIS deduction lets you get a professional AI-powered website for your business at a fraction of the cost.
          </p>
          <Countdown />
          <CTAButton className="mt-4" />
        </motion.div>
      </section>

      {/* ── WHAT YOU'LL LEARN ── */}
      <Section>
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 font-[Space_Grotesk]">
          3 Secrets We&apos;ll Reveal <span className="text-[#00d4ff]">Live</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "⚡", title: "AI Agents Build in Days, Not Months", desc: "See how AI builds a custom website live — what agencies take 3 months to deliver, we do in 2-3 weeks." },
            { icon: "🧮", title: "The EIS Math That Changes Everything", desc: "S$2,888 → 400% deduction → S$924 effective cost. We'll walk you through the exact calculation." },
            { icon: "🤖", title: "Your Website Should Sell For You 24/7", desc: "AI chatbots, automated lead capture, instant WhatsApp notifications — a salesperson that never sleeps." },
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
          Is This For <span className="text-[#00ff88]">You?</span>
        </h2>
        <div className="max-w-2xl mx-auto text-left space-y-3">
          {[
            "F&B owners who want online ordering & reservations",
            "Home bakers still taking orders via Instagram DMs",
            "Fitness studios & gyms that need a booking system",
            "Clinics looking for patient appointment automation",
            "Service businesses ready to look professional online",
            "Any SG SME owner who wants to save 68% on AI solutions",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-[#e0e0e0]">
              <span className="text-[#00ff88] mt-0.5">✓</span>
              <span>{item}</span>
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
          Meet Your Host
        </h2>
        <div className="glass rounded-2xl p-6 md:p-10 max-w-3xl mx-auto md:flex gap-8 items-center">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full flex-shrink-0 mx-auto md:mx-0 mb-6 md:mb-0 overflow-hidden border-2 border-[#00d4ff]">
            <img src="/images/isaac-host.webp" alt="Isaac Yap — Founder, IonicX AI" className="w-full h-full object-cover object-top" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#00d4ff] font-[Space_Grotesk]">Isaac Yap</h3>
            <p className="text-[#00ff88] text-sm mb-3">Founder, IonicX AI</p>
            <p className="text-[#8892b0] text-sm leading-relaxed">
              Former MMA fighter turned AI builder. Isaac combines the discipline of combat sports with cutting-edge AI to build solutions for Singapore&apos;s small businesses. He&apos;s helped F&B owners, home bakers, fitness studios, and clinics go from zero online presence to fully automated AI-powered websites — in weeks, not months.
            </p>
          </div>
        </div>
      </Section>

      {/* ── SOCIAL PROOF ── */}
      <Section>
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 font-[Space_Grotesk]">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            { quote: "Went from Instagram-only to a professional booking site with AI chatbot in 2 weeks. Isaac delivered exactly what he promised — fast and no fuss.", name: "Fabian", biz: "Registered Massage Therapist" },
          ].map((t, i) => (
            <div key={i} className="glass rounded-2xl p-6">
              <p className="text-[#e0e0e0] text-sm italic leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div className="text-[#00d4ff] font-bold text-sm">{t.name}</div>
              <div className="text-[#8892b0] text-xs">{t.biz}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── EIS CALCULATOR ── */}
      <Section className="text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 font-[Space_Grotesk]">
          See Your <span className="text-[#00ff88]">Savings</span>
        </h2>
        <p className="text-[#8892b0] mb-10 max-w-xl mx-auto">
          Enter your estimated project cost to see how much you&apos;d save with the EIS 400% tax deduction.
        </p>
        <EISCalculator />
      </Section>

      {/* ── REGISTRATION ── */}
      <div id="register">
      <Section className="text-center">
        <SeatsBadge />
        <h2 className="text-2xl md:text-4xl font-bold mt-6 mb-4 font-[Space_Grotesk]">
          Register for the <span className="text-[#00d4ff]">Free Webinar</span>
        </h2>
        <p className="text-[#8892b0] mb-10 max-w-xl mx-auto">
          Discover how to get a professional AI-powered website at up to 68% off. No obligation, no credit card.
        </p>
        <RegistrationForm />
      </Section>

      </div>

      {/* ── FAQ ── */}
      <Section>
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 font-[Space_Grotesk]">
          Frequently Asked Questions
        </h2>
        <FAQ />
      </Section>

      {/* ── FINAL CTA ── */}
      <Section className="text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 font-[Space_Grotesk]">
          Don&apos;t Miss Out
        </h2>
        <p className="text-[#8892b0] mb-8 max-w-lg mx-auto">
          50 seats. One webinar. The EIS deduction window won&apos;t last forever.
        </p>
        <CTAButton />
      </Section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-10 px-4 text-center">
        <p className="text-[#00d4ff] font-bold text-lg font-[Space_Grotesk]">IonicX AI</p>
        <p className="text-[#8892b0] text-sm mt-1">Personal AI Agents for SMEs</p>
        <p className="text-[#8892b0]/50 text-xs mt-4">UEN: 54578367L &middot; Singapore</p>
      </footer>
    </main>
  );
}
