import type { Metadata } from "next";
import PrivacyPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Privacy Policy | IonicX AI",
  description: "IonicX AI's privacy policy — how we collect, use and protect your personal data. PDPA compliant. Last updated February 2026.",
  keywords: ["IonicX AI privacy policy", "data protection Singapore", "PDPA"],
  alternates: { canonical: "https://ionicx.ai/privacy" },
  openGraph: {
    title: "Privacy Policy | IonicX AI",
    description: "IonicX AI's privacy policy — how we collect, use and protect your personal data.",
    url: "https://ionicx.ai/privacy",
    siteName: "IonicX AI",
    type: "website",
    locale: "en_SG",
  },
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
