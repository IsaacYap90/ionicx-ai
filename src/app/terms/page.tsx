import type { Metadata } from "next";
import TermsPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Terms of Service | IonicX AI",
  description: "IonicX AI's terms of service — pricing, payment, IP rights, maintenance agreements and liability for AI website development services in Singapore.",
  keywords: ["IonicX AI terms of service", "AI website terms Singapore"],
  alternates: { canonical: "https://ionicx.ai/terms" },
  openGraph: {
    title: "Terms of Service | IonicX AI",
    description: "IonicX AI's terms of service for AI website development services in Singapore.",
    url: "https://ionicx.ai/terms",
    siteName: "IonicX AI",
    type: "website",
    locale: "en_SG",
  },
};

export default function TermsPage() {
  return <TermsPageContent />;
}
