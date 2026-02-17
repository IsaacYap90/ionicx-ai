import type { Metadata } from "next";
import SolutionsPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "AI Solutions for SMEs | Smart Websites, Chatbots & Automation | IonicX AI",
  description: "Discover IonicX AI's full suite of AI solutions for Singapore SMEs — smart websites, AI chatbots, analytics dashboards & business automation.",
  keywords: ["AI solutions for SME Singapore", "AI chatbot Singapore", "AI website Singapore", "AI automation Singapore SME", "AI-powered website builder Singapore"],
  alternates: { canonical: "https://ionicx.ai/solutions" },
  openGraph: {
    title: "AI Solutions for SMEs | Smart Websites, Chatbots & Automation | IonicX AI",
    description: "Discover IonicX AI's full suite of AI solutions for Singapore SMEs — smart websites, AI chatbots, analytics dashboards & business automation.",
    url: "https://ionicx.ai/solutions",
    siteName: "IonicX AI",
    type: "website",
    locale: "en_SG",
  },
};

export default function SolutionsPage() {
  return <SolutionsPageContent />;
}
