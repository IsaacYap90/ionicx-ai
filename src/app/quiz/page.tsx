import type { Metadata } from "next";
import QuizPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "AI Needs Assessment Quiz | Find Your Perfect AI Package | IonicX AI",
  description: "Take our 2-minute AI needs assessment quiz to find the perfect AI website package for your Singapore business. Get a personalised recommendation.",
  keywords: ["AI website Singapore", "AI solutions for SME Singapore", "AI website quiz", "AI package recommendation", "website development Singapore AI"],
  alternates: { canonical: "https://ionicx.ai/quiz" },
  openGraph: {
    title: "AI Needs Assessment Quiz | Find Your Perfect AI Package | IonicX AI",
    description: "Take our 2-minute AI needs assessment quiz to find the perfect AI website package for your Singapore business.",
    url: "https://ionicx.ai/quiz",
    siteName: "IonicX AI",
    type: "website",
    locale: "en_SG",
  },
};

export default function QuizPage() {
  return <QuizPageContent />;
}
