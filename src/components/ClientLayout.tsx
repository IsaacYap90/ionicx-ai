"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";
import WhatsAppButton from "./WhatsAppButton";
import CookieConsent from "./CookieConsent";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <main className="overflow-hidden min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <WhatsAppButton />
        <ChatWidget />
        <CookieConsent />
      </main>
    </LanguageProvider>
  );
}
