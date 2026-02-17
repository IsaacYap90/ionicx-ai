import type { Metadata } from "next";
import WebinarPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Free AI Webinar for SMEs | 400% EIS Tax Deduction | IonicX AI",
  description: "Join our free live webinar and discover how Singapore SMEs save up to 68% on AI websites with the EIS 400% tax deduction. Limited to 50 seats.",
  keywords: ["AI webinar Singapore", "EIS tax deduction AI Singapore", "AI website Singapore", "AI solutions for SME Singapore", "free AI webinar"],
  alternates: { canonical: "https://ionicx.ai/webinar" },
  openGraph: {
    title: "Free AI Webinar for SMEs | 400% EIS Tax Deduction | IonicX AI",
    description: "Join our free live webinar and discover how Singapore SMEs save up to 68% on AI websites with the EIS 400% tax deduction.",
    url: "https://ionicx.ai/webinar",
    siteName: "IonicX AI",
    type: "website",
    locale: "en_SG",
  },
};

export default function WebinarPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "How SG Small Businesses Save Up to 68% on AI Solutions",
    description: "Free live webinar — discover how Budget 2026's 400% EIS deduction lets you get a professional AI-powered website at a fraction of the cost.",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: {
      "@type": "Organization",
      name: "IonicX AI",
      url: "https://ionicx.ai",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "SGD",
      availability: "https://schema.org/LimitedAvailability",
      url: "https://ionicx.ai/webinar",
    },
    location: {
      "@type": "VirtualLocation",
      url: "https://ionicx.ai/webinar",
    },
    isAccessibleForFree: true,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WebinarPageContent />
    </>
  );
}
