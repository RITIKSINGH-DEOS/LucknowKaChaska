import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://food.ritiksingh.in"),
  title: {
    default: "LucknowKaChaska — The Honest Lucknow Food & Street Eat Guide",
    template: "%s | LucknowKaChaska",
  },
  description:
    "Curated food trails, updated 2026 pricing, and honest reviews of Awadhi biryani, hidden kathi rolls, and cafes across Lucknow. Curated by Ritik Singh.",
  keywords: [
    "Lucknow food guide",
    "best roll in gomti nagar",
    "best biryani in chowk",
    "street food lucknow",
    "hazratganj cafes",
    "lucknow kachaska",
    "ritik singh food blog",
  ],
  authors: [{ name: "Ritik Singh", url: "https://ritiksingh.in" }],
  creator: "Ritik Singh",
  publisher: "LucknowKaChaska",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://food.ritiksingh.in",
    siteName: "LucknowKaChaska",
    title: "LucknowKaChaska — The Honest Lucknow Food & Street Eat Guide",
    description:
      "Curated street food trails, updated prices, and authentic Awadhi dining guides across Lucknow.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LucknowKaChaska — Lucknow Food Guide",
    description: "Curated street food trails and authentic Awadhi dining guides.",
    creator: "@ritiksingh",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LucknowKaChaska",
    url: "https://food.ritiksingh.in",
    description: "The Honest Lucknow Food & Street Eat Guide by Ritik Singh",
    author: {
      "@type": "Person",
      name: "Ritik Singh",
      url: "https://ritiksingh.in",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://food.ritiksingh.in/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-neutral-900" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
