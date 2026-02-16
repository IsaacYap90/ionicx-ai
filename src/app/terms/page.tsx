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

export default function TermsOfService() {
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
            Terms of <span className="text-[#00d4ff]">Service</span>
          </h1>
          <p className="text-[var(--text-dim)] mb-12">Last updated: February 2026</p>
        </Section>

        <div className="space-y-12 text-[var(--text-dim)] leading-relaxed">
          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">1. Introduction</h2>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the services provided by IonicX AI (UEN 53518824B), a Singapore-registered company (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). By engaging our services, you agree to be bound by these Terms.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">2. Services</h2>
            <p className="mb-3">IonicX AI provides the following services:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>AI-powered website design and development</li>
              <li>AI chatbot development and integration (powered by OpenAI/ChatGPT)</li>
              <li>Business process automation and AI solutions</li>
              <li>Website maintenance and support</li>
              <li>Custom AI integrations for SMEs</li>
            </ul>
            <p className="mt-3">The specific scope of work will be defined in a project proposal or agreement provided before commencement.</p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">3. Pricing &amp; Payment</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>All pricing is quoted in Singapore Dollars (SGD) unless otherwise stated.</li>
              <li>A <strong className="text-[var(--text)]">50% deposit</strong> is required before work commences.</li>
              <li>The <strong className="text-[var(--text)]">remaining balance</strong> is due upon project completion and before final delivery/deployment.</li>
              <li>Payment is to be made via bank transfer or other agreed methods within 14 days of invoice.</li>
              <li>Late payments may incur additional charges or suspension of services.</li>
            </ul>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">4. Maintenance Agreements</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Website maintenance plans are billed annually.</li>
              <li>Maintenance agreements <strong className="text-[var(--text)]">auto-renew</strong> at the end of each term unless cancelled with 30 days&apos; written notice.</li>
              <li>Maintenance includes hosting, security updates, minor content edits, and technical support as specified in the plan.</li>
              <li>Major redesigns or new feature development are not included in standard maintenance and will be quoted separately.</li>
            </ul>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">5. Intellectual Property</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-[var(--text)]">Client Content:</strong> You retain full ownership of all content you provide (text, images, logos, branding).</li>
              <li><strong className="text-[var(--text)]">Code &amp; Framework:</strong> IonicX AI retains ownership of proprietary code frameworks, templates, and development tools used in building your project.</li>
              <li><strong className="text-[var(--text)]">Custom Code:</strong> Custom code written specifically for your project is licensed to you for use on the delivered project.</li>
              <li><strong className="text-[var(--text)]">Third-Party Assets:</strong> Any third-party software, libraries, or assets used are subject to their respective licences.</li>
            </ul>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">6. Client Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Provide all required content, assets, and feedback in a timely manner.</li>
              <li>Review and approve deliverables within the agreed timeframe.</li>
              <li>Ensure that all content provided does not infringe on any third-party rights.</li>
              <li>Delays caused by late content or feedback may affect project timelines.</li>
            </ul>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">7. Limitation of Liability</h2>
            <p className="mb-3">To the maximum extent permitted by law:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>IonicX AI shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.</li>
              <li>Our total liability shall not exceed the total amount paid by you for the specific service in question.</li>
              <li>We do not guarantee uninterrupted or error-free service, as services depend on third-party providers (Vercel, OpenAI, etc.).</li>
              <li>We are not responsible for any loss of data, revenue, or business opportunities arising from the use of our services.</li>
            </ul>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">8. Termination</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Either party may terminate the agreement with 30 days&apos; written notice.</li>
              <li>In the event of termination, the client is responsible for payment of all work completed to date.</li>
              <li>Deposits are non-refundable once work has commenced.</li>
              <li>Upon termination, we will provide all client-owned content and assets.</li>
            </ul>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">9. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the <strong className="text-[var(--text)]">Republic of Singapore</strong>. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Singapore.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">10. Changes to These Terms</h2>
            <p>
              We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated date. Continued use of our services after changes constitutes acceptance of the revised Terms.
            </p>
          </Section>

          <Section>
            <h2 className="text-2xl font-semibold text-[var(--text)] mb-4">11. Contact Us</h2>
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
