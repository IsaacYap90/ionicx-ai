import Link from "next/link";

export const metadata = {
  title: "Mission & Vision | IonicX AI",
  description: "IonicX AI mission and vision statements.",
};

export default function MissionPage() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-black">IonicX AI Mission & Vision</h1>
          <p className="text-[#9fb3d9]">Built for Singapore SMEs. Execution over hype.</p>
        </div>

        <section className="glass rounded-2xl p-6 border border-[var(--card-border)]/60 space-y-3">
          <h2 className="text-2xl font-bold text-[#00d4ff]">Mission</h2>
          <p className="text-lg leading-relaxed">
            IonicX AI helps Singapore SMEs grow faster by deploying practical AI systems that improve
            sales, operations, and customer experience in weeks—not months.
          </p>
        </section>

        <section className="glass rounded-2xl p-6 border border-[var(--card-border)]/60 space-y-3">
          <h2 className="text-2xl font-bold text-[#00ff88]">Vision</h2>
          <p className="text-lg leading-relaxed">
            To become Singapore’s most trusted AI implementation partner for SMEs, building
            agent-ready businesses where humans stay in control and AI handles repetitive work at scale.
          </p>
        </section>

        <section className="glass rounded-2xl p-6 border border-[var(--card-border)]/60 space-y-3">
          <h2 className="text-2xl font-bold">Operating Promise</h2>
          <ul className="list-disc pl-6 space-y-2 text-[#c9d5ee]">
            <li>Human-approved, business-safe AI workflows</li>
            <li>Fast implementation with measurable outcomes</li>
            <li>Local SME context, clear ROI, no fluff</li>
          </ul>
        </section>

        <div>
          <Link href="/" className="text-[#00d4ff] hover:text-[#00ff88] transition-colors">
            ← Back to ionicx.ai
          </Link>
        </div>
      </div>
    </main>
  );
}
