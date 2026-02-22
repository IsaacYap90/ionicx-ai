"use client";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

const solutions = [
  {
    key: "websites",
    icon: "🌐",
    color: "#00d4ff",
    links: [
      { label: "See it live — TattByLyds", url: "https://tattbylyds.vercel.app" },
      { label: "See it live — Fab The Stretch Lad", url: "https://fabthestretchlad.vercel.app" },
    ],
  },
  {
    key: "whatsapp",
    icon: "💬",
    color: "#25D366",
    links: [],
  },
  {
    key: "booking",
    icon: "📅",
    color: "#FF6B35",
    links: [],
  },
  {
    key: "reviews",
    icon: "⭐",
    color: "#FBBC04",
    links: [],
  },
  {
    key: "content",
    icon: "📱",
    color: "#E4405F",
    links: [],
  },
  {
    key: "analytics",
    icon: "📊",
    color: "#00ff88",
    links: [],
  },
];

const tierMap = [
  { feature: "AI-Powered Website", starter: "✓", growth: "✓", scale: "✓", enterprise: "✓" },
  { feature: "AI Chatbot (Web)", starter: "✓", growth: "✓", scale: "✓", enterprise: "✓" },
  { feature: "WhatsApp AI Assistant", starter: "—", growth: "✓", scale: "✓", enterprise: "✓" },
  { feature: "AI Booking & No-Show System", starter: "—", growth: "✓", scale: "✓", enterprise: "✓" },
  { feature: "Google Review Manager", starter: "—", growth: "✓", scale: "✓", enterprise: "✓" },
  { feature: "Lead Scoring & Routing", starter: "—", growth: "✓", scale: "✓", enterprise: "✓" },
  { feature: "AI Content & Social Media", starter: "—", growth: "—", scale: "✓", enterprise: "✓" },
  { feature: "AI Analytics Dashboard", starter: "—", growth: "—", scale: "✓", enterprise: "✓" },
  { feature: "Custom AI Workflows", starter: "—", growth: "—", scale: "✓", enterprise: "✓" },
  { feature: "AI Invoice & Payment Chaser", starter: "—", growth: "—", scale: "✓", enterprise: "✓" },
  { feature: "AI Copilot (Internal)", starter: "—", growth: "—", scale: "—", enterprise: "✓" },
  { feature: "SOP/Knowledge RAG", starter: "—", growth: "—", scale: "—", enterprise: "✓" },
  { feature: "Custom API Integrations", starter: "—", growth: "—", scale: "—", enterprise: "✓" },
  { feature: "Dedicated Account Manager", starter: "—", growth: "—", scale: "—", enterprise: "✓" },
];

export default function SolutionsContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-28">
      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-24 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-[#00d4ff] font-semibold mb-4">
            <Link href="/">Home</Link> / Solutions
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("solutions.hero.title")}
          </h1>
          <p className="text-[var(--text-dim)] text-lg">
            {t("solutions.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Solutions */}
      <section className="px-6 md:px-12 lg:px-24 py-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {solutions.map((s, i) => (
            <div
              key={s.key}
              className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden"
            >
              {/* Tag */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{s.icon}</span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: `${s.color}20`, color: s.color }}
                >
                  {t(`solutions.${s.key}.tag`)}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left - Info */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {t(`solutions.${s.key}.title`)}
                  </h2>
                  <p className="text-sm text-[#00d4ff] mb-4">
                    {t(`solutions.${s.key}.bestFor`)}
                  </p>
                  <p className="text-[var(--text-dim)] mb-6 leading-relaxed">
                    {t(`solutions.${s.key}.desc`)}
                  </p>

                  {/* Example callout */}
                  <div className="glass rounded-xl p-4 mb-6 border-l-4" style={{ borderColor: s.color }}>
                    <p className="text-sm text-[var(--text-dim)] italic">
                      {t(`solutions.${s.key}.example`)}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/pricing"
                      className="px-6 py-3 rounded-full text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                      style={{ background: s.color }}
                    >
                      {t(`solutions.${s.key}.cta`)}
                    </Link>
                    <span className="text-sm text-[#00ff88] font-semibold">
                      {t(`solutions.${s.key}.ctaAfter`)}
                    </span>
                  </div>

                  {/* Live links */}
                  {s.links.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {s.links.map((link) => (
                        
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#00d4ff] hover:underline"
                        >
                          {link.label} →
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right - Features */}
                <div>
                  <div className="space-y-3">
                    {[0, 1, 2, 3, 4, 5].map((fi) => (
                      <div key={fi} className="flex items-start gap-3">
                        <span className="text-[#00ff88] mt-0.5">✓</span>
                        <span className="text-[var(--text-dim)] text-sm">
                          {t(`solutions.${s.key}.f${fi}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EIS Banner */}
      <section className="px-6 md:px-12 lg:px-24 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-2xl p-6 text-center bg-gradient-to-r from-[#00d4ff]/5 to-[#00ff88]/5">
            <p className="text-[var(--text-dim)]">
              Singapore SMEs: Claim <span className="text-[#00ff88] font-bold">400% tax deduction</span> on AI solutions under the Enterprise Innovation Scheme{" "}
              <Link href="/pricing#eis" className="text-[#00d4ff] font-semibold hover:underline">
                Learn more →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Tier Mapping Table */}
      <section className="px-6 md:px-12 lg:px-24 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t("solutions.tiers.title")}{" "}
            <span className="text-[#00d4ff]">{t("solutions.tiers.titleHighlight")}</span>
          </h2>
          <p className="text-center text-[var(--text-dim)] mb-10">
            {t("solutions.tiers.subtitle")}
          </p>

          <div className="glass rounded-2xl p-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left py-3 px-4 text-[var(--text-dim)]">Solution</th>
                  <th className="text-center py-3 px-4">
                    <div className="text-[#00d4ff] font-bold">Starter</div>
                    <div className="text-xs text-[var(--text-dim)]">S$2,888</div>
                  </th>
                  <th className="text-center py-3 px-4">
                    <div className="text-[#00d4ff] font-bold">Growth</div>
                    <div className="text-xs text-[var(--text-dim)]">S$5,888</div>
                  </th>
                  <th className="text-center py-3 px-4">
                    <div className="text-[#00d4ff] font-bold">Scale</div>
                    <div className="text-xs text-[var(--text-dim)]">S$8,888</div>
                  </th>
                  <th className="text-center py-3 px-4">
                    <div className="text-[#00d4ff] font-bold">Enterprise</div>
                    <div className="text-xs text-[var(--text-dim)]">S$15,888+</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tierMap.map((row, ri) => (
                  <tr key={ri} className="border-b border-[var(--card-border)]/50">
                    <td className="py-3 px-4 text-[var(--text-dim)]">{row.feature}</td>
                    <td className="py-3 px-4 text-center">{row.starter === "✓" ? <span className="text-[#00ff88]">✓</span> : <span className="text-[var(--text-dim)]/50">—</span>}</td>
                    <td className="py-3 px-4 text-center">{row.growth === "✓" ? <span className="text-[#00ff88]">✓</span> : <span className="text-[var(--text-dim)]/50">—</span>}</td>
                    <td className="py-3 px-4 text-center">{row.scale === "✓" ? <span className="text-[#00ff88]">✓</span> : <span className="text-[var(--text-dim)]/50">—</span>}</td>
                    <td className="py-3 px-4 text-center">{row.enterprise === "✓" ? <span className="text-[#00ff88]">✓</span> : <span className="text-[var(--text-dim)]/50">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/pricing"
              className="inline-block px-8 py-3 rounded-full glass border border-[#00d4ff]/30 text-[#00d4ff] font-semibold hover:bg-[#00d4ff]/10 transition-all"
            >
              View Full Pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 lg:px-24 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("solutions.cta.title")}
          </h2>
          <p className="text-[var(--text-dim)] text-lg mb-8">
            {t("solutions.cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
              href="https://wa.me/6580268821"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-[#25D366] text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all hover:scale-105"
            >
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full glass border border-[#00d4ff]/30 text-[#00d4ff] font-bold text-lg hover:bg-[#00d4ff]/10 transition-all"
            >
              Get Your Free AI Consultation →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
