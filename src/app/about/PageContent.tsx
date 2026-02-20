"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";
import Image from "next/image";
import Link from "next/link";

const values = [
  { icon: "🎯", key: "mission" },
  { icon: "🚀", key: "innovation" },
  { icon: "🤝", key: "accessibility" },
  { icon: "🇸🇬", key: "local" },
];

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <>
      <Breadcrumbs />
      <Section className="py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            {t("about.page.title")} <span className="text-[#00d4ff]">{t("about.page.titleHighlight")}</span>
          </h1>
          <p className="text-center text-[var(--text-dim)] mb-16 text-lg max-w-2xl mx-auto">{t("about.page.desc")}</p>

          {/* Company Story */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-[#00d4ff]">{t("about.story.title")}</h2>
            <p className="text-[var(--text-dim)] leading-relaxed mb-4">{t("about.story.p1")}</p>
            <p className="text-[var(--text-dim)] leading-relaxed">{t("about.story.p2")}</p>
          </div>

          {/* Founder Story */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-12 glow-cyan">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#00d4ff]/30">
                <Image src="/images/isaac-host.webp" alt="Isaac Yap - Founder & CEO, IonicX AI" width={96} height={96} className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">{t("about.founder.name")}</h2>
                <p className="text-[#00d4ff] text-sm mb-4">{t("about.founder.role")}</p>
                <p className="text-[var(--text-dim)] leading-relaxed">{t("about.founder.story")}</p>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-12 glow-green">
            <h2 className="text-2xl font-bold mb-4 text-center">{t("about.mission.title")}</h2>
            <p className="text-center text-lg text-[var(--text-dim)] leading-relaxed max-w-2xl mx-auto">{t("about.mission.statement")}</p>
          </div>

          {/* Mission & Values */}
          <h2 className="text-2xl font-bold text-center mb-8">{t("about.values.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {values.map((v, i) => (
              <motion.div key={v.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold mb-2 text-[#00d4ff]">{t(`about.values.${v.key}.title`)}</h3>
                <p className="text-sm text-[var(--text-dim)]">{t(`about.values.${v.key}.desc`)}</p>
              </motion.div>
            ))}
          </div>

          {/* Registration Details */}
          <div className="glass rounded-2xl p-8 mb-12">
            <h3 className="text-lg font-bold mb-4 text-center text-[#00d4ff]">{t("about.registration.title")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-[var(--text-dim)]">{t("about.registration.uen")}</div>
                <div className="font-semibold">53518824B</div>
              </div>
              <div>
                <div className="text-sm text-[var(--text-dim)]">{t("about.registration.location")}</div>
                <div className="font-semibold">Singapore</div>
              </div>
              <div>
                <div className="text-sm text-[var(--text-dim)]">{t("about.registration.status")}</div>
                <div className="font-semibold">{t("about.registration.acra")}</div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["🏢 ACRA Registered", "🇸🇬 SG Budget 2026 Aligned", "🤖 AI-Native Company"].map((badge) => (
              <div key={badge} className="glass rounded-xl px-6 py-3 text-sm font-medium">{badge}</div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/contact" className="inline-block px-8 py-4 rounded-full bg-[#00ff88] text-[#0a0a1a] font-bold text-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-all hover:scale-105">
              {t("about.cta")}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
