"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function WhatsAppButton() {
  const { t } = useLanguage();
  const msg = encodeURIComponent(t("whatsapp.prefill"));
  return (
    <a
      href={`https://wa.me/6580268821?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-[9998] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white text-2xl shadow-lg hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      💬
    </a>
  );
}
