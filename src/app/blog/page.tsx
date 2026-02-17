import type { Metadata } from "next";
import BlogPageContent from "./PageContent";

export const metadata: Metadata = {
  title: "Blog | AI & Digital Transformation Insights | IonicX AI",
  description: "Read the latest insights on AI for SMEs, EIS 400% tax deduction, digital transformation and AI-powered website development in Singapore.",
  keywords: ["AI blog Singapore", "AI solutions for SME Singapore", "EIS tax deduction AI Singapore", "AI website Singapore", "digital transformation SME"],
  alternates: { canonical: "https://ionicx.ai/blog" },
  openGraph: {
    title: "Blog | AI & Digital Transformation Insights | IonicX AI",
    description: "Read the latest insights on AI for SMEs, EIS 400% tax deduction, digital transformation and AI-powered website development in Singapore.",
    url: "https://ionicx.ai/blog",
    siteName: "IonicX AI",
    type: "website",
    locale: "en_SG",
  },
};

export default function BlogPage() {
  return <BlogPageContent />;
}
