"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`relative px-6 md:px-12 lg:px-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="text-2xl font-bold font-[family-name:'Space_Grotesk']">
            IonicX<span className="text-[#00d4ff]"> AI</span>
          </a>
          <a
            href="/"
            className="text-sm text-[var(--text-dim)] hover:text-[#00d4ff] transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto pt-32 pb-20">
        <Section>
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:'Space_Grotesk'] mb-4">
            Privacy <span className="text-[#00d4ff]">Policy</span>
          </h1>
          <p className="text-[var(--text-dim)] mb-12">Last updated: February 2026</p>
        </Section>

        <div className="space-y-12 text-[var(--text-dim)] leading-relaxed">
          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">1. Introduction</h2>
            <p>
              IonicX AI (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal data when you visit our website or use our services. By using our services, you agree to the practices described in this policy.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">2. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-[var(--text)]">Personal Information:</strong> Name, email address, and phone number submitted via contact forms.</li>
              <li><strong className="text-[var(--text)]">Usage Data:</strong> Website analytics data, including pages visited, time spent, and browser information.</li>
              <li><strong className="text-[var(--text)]">AI Chatbot Data:</strong> Conversation data from our AI chatbot, powered by OpenAI (ChatGPT).</li>
              <li><strong className="text-[var(--text)]">Payment Information:</strong> Payment details processed securely by third-party payment providers. We do not store your full payment information on our servers.</li>
              <li><strong className="text-[var(--text)]">Cookies:</strong> Data collected through essential and analytics cookies.</li>
            </ul>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>To provide, maintain, and improve our services.</li>
              <li>To respond to your inquiries and support requests.</li>
              <li>To send project updates, invoices, and relevant communications.</li>
              <li>To process AI chatbot interactions via OpenAI, subject to <a href="https://openai.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#00d4ff] hover:underline">OpenAI&apos;s Privacy Policy</a>.</li>
              <li>To analyse website usage and improve user experience.</li>
            </ul>
            <p className="mt-4 font-semibold text-[var(--text)]">
              We do NOT sell your personal data to third parties.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">4. Data Storage &amp; Security</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Your data is stored on secure servers provided by <strong className="text-[var(--text)]">Vercel</strong> and <strong className="text-[var(--text)]">Supabase</strong>.</li>
              <li>We use industry-standard encryption (SSL/TLS) to protect data in transit.</li>
              <li>Access to personal data is restricted to authorised personnel only.</li>
              <li>While we take all reasonable steps to protect your data, no method of transmission or storage is 100% secure.</li>
            </ul>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">5. Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services that may collect or process your data:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-[var(--text)]">OpenAI (ChatGPT)</strong> — Powers our AI chatbot and AI features.</li>
              <li><strong className="text-[var(--text)]">Vercel</strong> — Website hosting and deployment.</li>
              <li><strong className="text-[var(--text)]">Google Analytics</strong> — Website traffic and usage analytics.</li>
              <li><strong className="text-[var(--text)]">Payment Processors</strong> — Secure handling of payment transactions.</li>
            </ul>
            <p className="mt-3">Each third-party service operates under its own privacy policy.</p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">6. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-[var(--text)]">Access</strong> — Request a copy of the personal data we hold about you.</li>
              <li><strong className="text-[var(--text)]">Deletion</strong> — Request that we delete your personal data.</li>
              <li><strong className="text-[var(--text)]">Correction</strong> — Request correction of any inaccurate data.</li>
              <li><strong className="text-[var(--text)]">Opt Out</strong> — Unsubscribe from marketing communications at any time.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:hello@ionicx.ai" className="text-[#00d4ff] hover:underline">hello@ionicx.ai</a>.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">7. Cookies</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-[var(--text)]">Essential Cookies:</strong> Required for core website functionality. These cannot be disabled.</li>
              <li><strong className="text-[var(--text)]">Analytics Cookies:</strong> Used to understand how visitors interact with our website. You can disable these in your browser settings.</li>
            </ul>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. We encourage you to review this policy periodically.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">9. Contact Us</h2>
            <div className="space-y-2">
              <p><strong className="text-[var(--text)]">IonicX AI</strong></p>
              <p>UEN: 53518824B</p>
              <p>
                Email:{" "}
                <a href="mailto:hello@ionicx.ai" className="text-[#00d4ff] hover:underline">hello@ionicx.ai</a>
              </p>
              <p>
                Website:{" "}
                <a href="https://ionicx.ai" className="text-[#00d4ff] hover:underline">ionicx.ai</a>
              </p>
            </div>
          </Section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--card-border)] py-8 px-6 text-center text-sm text-[var(--text-dim)]">
        <p>© {new Date().getFullYear()} IonicX AI. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="/privacy" className="text-[#00d4ff] hover:underline">Privacy Policy</a>
          <a href="/terms" className="text-[#00d4ff] hover:underline">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
