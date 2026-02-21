"use client";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatEmbed from "./ChatEmbed";
import CookieConsent from "./CookieConsent";
import EISBanner from "./EISBanner";
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <main className="overflow-hidden min-h-screen flex flex-col">
        <EISBanner />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <ChatEmbed />
        <CookieConsent />
      </main>
    </LanguageProvider>
  );
}
