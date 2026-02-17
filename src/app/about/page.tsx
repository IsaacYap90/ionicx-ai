import type { Metadata } from "next";
import AboutPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "About IonicX AI | AI Solutions Company Singapore",
  description: "Learn about IonicX AI — Singapore's AI-native company building smart websites, chatbots & automation for SMEs. ACRA registered, Budget 2026 aligned.",
  keywords: ["AI solutions Singapore", "AI company Singapore", "IonicX AI about", "AI website development Singapore", "Singapore SME AI"],
  alternates: { canonical: "https://ionicx.ai/about" },
  openGraph: {
    title: "About IonicX AI | AI Solutions Company Singapore",
    description: "Learn about IonicX AI — Singapore's AI-native company building smart websites, chatbots & automation for SMEs.",
    url: "https://ionicx.ai/about",
    siteName: "IonicX AI",
    type: "website",
    locale: "en_SG",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About IonicX AI",
    description: "IonicX AI is a Singapore-registered AI solutions company building smart websites, chatbots and automation for SMEs.",
    url: "https://ionicx.ai/about",
    mainEntity: {
      "@type": "Organization",
      name: "IonicX AI",
      url: "https://ionicx.ai",
      foundingLocation: { "@type": "Place", name: "Singapore" },
      founder: { "@type": "Person", name: "Isaac Yap" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutPageContent />
    </>
  );
}
