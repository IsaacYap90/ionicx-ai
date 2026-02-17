import type { Metadata } from "next";
import CaseStudiesPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Case Studies | 10 AI-Powered Demo Sites | IonicX AI",
  description: "Explore 10 AI-powered demo websites across F&B, wellness, fitness, real estate, beauty & more. See what IonicX AI builds for Singapore SMEs.",
  keywords: ["AI website Singapore", "AI website examples", "AI chatbot Singapore", "website development Singapore AI", "AI solutions for SME Singapore"],
  alternates: { canonical: "https://ionicx.ai/case-studies" },
  openGraph: {
    title: "Case Studies | 10 AI-Powered Demo Sites | IonicX AI",
    description: "Explore 10 AI-powered demo websites across F&B, wellness, fitness, real estate, beauty & more.",
    url: "https://ionicx.ai/case-studies",
    siteName: "IonicX AI",
    type: "website",
    locale: "en_SG",
  },
};

export default function CaseStudiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "IonicX AI Case Studies",
    description: "10 AI-powered demo websites built by IonicX AI for various industries",
    numberOfItems: 10,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Artisan Bakery", url: "https://baker-demo.vercel.app" },
      { "@type": "ListItem", position: 2, name: "Fab The Stretch Lad", url: "https://fabthestretchlad.vercel.app" },
      { "@type": "ListItem", position: 3, name: "TattByLyds", url: "https://tattbylyds.vercel.app" },
      { "@type": "ListItem", position: 4, name: "Interior Design", url: "https://id-demo-two.vercel.app" },
      { "@type": "ListItem", position: 5, name: "Kopitiam Demo", url: "https://kopitiam-demo.vercel.app" },
      { "@type": "ListItem", position: 6, name: "Wellness Center", url: "https://wellness-demo-phi.vercel.app" },
      { "@type": "ListItem", position: 7, name: "Fitness Studio", url: "https://gym-demo-beta-sepia.vercel.app" },
      { "@type": "ListItem", position: 8, name: "Wedding Planner", url: "https://wedding-demo-theta.vercel.app" },
      { "@type": "ListItem", position: 9, name: "Beauty Salon", url: "https://beauty-demo-kappa.vercel.app" },
      { "@type": "ListItem", position: 10, name: "Real Estate", url: "https://realestate-demo-gilt.vercel.app" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudiesPageContent />
    </>
  );
}
