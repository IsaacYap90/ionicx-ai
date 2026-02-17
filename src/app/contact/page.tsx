import type { Metadata } from "next";
import ContactPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Contact IonicX AI | Get Your AI Website Quote | Singapore",
  description: "Get a free quote for your AI-powered website. Contact IonicX AI via form, WhatsApp or email. AI lead scoring for faster response times.",
  keywords: ["contact IonicX AI", "AI website quote Singapore", "AI website Singapore", "website development Singapore AI", "AI chatbot Singapore"],
  alternates: { canonical: "https://ionicx.ai/contact" },
  openGraph: {
    title: "Contact IonicX AI | Get Your AI Website Quote | Singapore",
    description: "Get a free quote for your AI-powered website. Contact IonicX AI via form, WhatsApp or email.",
    url: "https://ionicx.ai/contact",
    siteName: "IonicX AI",
    type: "website",
    locale: "en_SG",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "IonicX AI",
    url: "https://ionicx.ai",
    email: "hello@ionicx.ai",
    telephone: "+6580268821",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Singapore",
      addressCountry: "SG",
    },
    areaServed: { "@type": "Country", name: "Singapore" },
    priceRange: "S$2,888 - S$12,888+",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPageContent />
    </>
  );
}
