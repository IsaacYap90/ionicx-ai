import type { Metadata } from "next";
import PricingPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Pricing | AI Website Packages from S$2,888 | IonicX AI Singapore",
  description: "AI website packages starting from S$2,888. Starter, Growth & Enterprise tiers with EIS 400% tax deduction — effective cost from S$924.",
  keywords: ["AI website Singapore", "AI website pricing Singapore", "EIS tax deduction AI Singapore", "website development Singapore AI", "AI-powered website builder Singapore"],
  alternates: { canonical: "https://ionicx.ai/pricing" },
  openGraph: {
    title: "Pricing | AI Website Packages from S$2,888 | IonicX AI Singapore",
    description: "AI website packages starting from S$2,888. Starter, Growth & Enterprise tiers with EIS 400% tax deduction.",
    url: "https://ionicx.ai/pricing",
    siteName: "IonicX AI",
    type: "website",
    locale: "en_SG",
  },
};

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "IonicX AI Website Packages",
    description: "AI-powered website development packages for Singapore SMEs",
    brand: { "@type": "Brand", name: "IonicX AI" },
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        price: "2888",
        priceCurrency: "SGD",
        description: "AI-Powered Website with AI Chatbot, Mobile Responsive, Hosting & SSL, SEO Optimisation",
        url: "https://ionicx.ai/pricing",
      },
      {
        "@type": "Offer",
        name: "Growth",
        price: "5888",
        priceCurrency: "SGD",
        description: "Everything in Starter plus CRM Integration, AI Analytics Dashboard, AI-Powered Features, Priority Support",
        url: "https://ionicx.ai/pricing",
      },
      {
        "@type": "Offer",
        name: "Enterprise",
        price: "12888",
        priceCurrency: "SGD",
        description: "Everything in Growth plus Full AI Suite, Custom Integrations, API Integrations, Dedicated Account Manager",
        url: "https://ionicx.ai/pricing",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PricingPageContent />
    </>
  );
}
