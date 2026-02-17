import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "IonicX AI — Personal AI Agents for SMEs | Singapore",
  description:
    "IonicX AI — Personal AI Agents for Singapore SMEs. AI-powered websites, chatbots, and automation. Qualify for 400% EIS tax deduction on AI investments.",
  keywords: ["ai solutions singapore", "ai website development singapore", "ionicx ai", "AI chatbot singapore", "AI automation singapore", "SME AI solutions", "EIS tax deduction AI", "website development singapore"],
  metadataBase: new URL("https://ionicx.ai"),
  alternates: { canonical: "https://ionicx.ai" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "IonicX AI — Personal AI Agents for SMEs | AI Website Development",
    description: "Personal AI Agents for Singapore SMEs. AI-powered websites, chatbots, and automation. 400% EIS tax deduction eligible.",
    url: "https://ionicx.ai",
    siteName: "IonicX AI",
    type: "website",
    locale: "en_SG",
  },
  twitter: {
    card: "summary_large_image",
    title: "IonicX AI — Personal AI Agents for SMEs",
    description: "Personal AI Agents for Singapore SMEs. Websites, chatbots, automation. 400% EIS tax deduction eligible.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "IonicX AI",
              "url": "https://ionicx.ai",
              "description": "AI solutions company in Singapore providing AI-powered websites, chatbots, and automation for SMEs.",
              "address": { "@type": "PostalAddress", "addressLocality": "Singapore", "addressCountry": "SG" },
              "areaServed": { "@type": "Country", "name": "Singapore" },
              "knowsAbout": ["Artificial Intelligence", "Web Development", "Chatbots", "Business Automation"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Solutions",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Website Development" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Chatbot Development" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Process Automation" } }
                ]
              }
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
