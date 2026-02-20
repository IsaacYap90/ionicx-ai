"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 grid-bg">
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00d4ff] opacity-[0.04] blur-[120px]" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto text-center z-10">
        <div className="text-8xl font-bold text-[#00d4ff] text-glow-cyan mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-[var(--text-dim)] mb-8">The page you are looking for does not exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="px-8 py-3 rounded-full bg-[#00d4ff] text-[#0a0a1a] font-bold hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all">
            Back to Home
          </Link>
          <a href="https://wa.me/6580268821" target="_blank" rel="noopener noreferrer"
            className="px-8 py-3 rounded-full glass border border-[#25D366]/30 text-[#25D366] font-bold hover:bg-[#25D366]/10 transition-all">
            WhatsApp Us
          </a>
        </div>
      </motion.div>
    </div>
  );
}
