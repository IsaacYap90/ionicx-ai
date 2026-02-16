import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IonicX AI — AI Solutions That Pay For Themselves",
  description:
    "AI-powered websites, chatbots, and automation for Singapore SMEs. Qualify for 400% EIS tax deduction on AI investments.",
  keywords: ["AI", "Singapore", "SME", "chatbot", "automation", "EIS", "tax deduction"],
  openGraph: {
    title: "IonicX AI — AI Solutions That Pay For Themselves",
    description: "Singapore SMEs get 400% tax deduction on AI investments.",
    url: "https://ionicx.ai",
    siteName: "IonicX AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
