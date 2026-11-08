import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Shield.js - Zero-Dependency Client-Side Content Protection Engine",
    template: "%s | Shield.js"
  },
  description: "A zero-dependency, ultra-lightweight client-side JavaScript library designed to provide maximum friction against content theft, automated scraping, and asset leakage.",
  keywords: [
    "anti-scraping",
    "content-protection",
    "dom-poisoning",
    "javascript-security",
    "bot-defense",
    "web-security",
    "asset-protection",
    "shield-js"
  ],
  authors: [
    {
      name: "Abhay Bhise",
      url: "https://github.com/AbhayBhise"
    }
  ],
  creator: "Abhay Bhise",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shieldjs.dev",
    siteName: "Shield.js",
    title: "Shield.js - Your Content, Unscrapable",
    description: "The zero-dependency, ultra-lightweight client-side JavaScript security engine against bots, scrapers, and bad actors."
  },
  twitter: {
    card: "summary_large_image",
    title: "Shield.js - Your Content, Unscrapable",
    description: "The zero-dependency, ultra-lightweight client-side JavaScript security engine against bots, scrapers, and bad actors.",
    creator: "@AbhayBhise"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background antialiased flex flex-col cursor-none selection:bg-cyan-500 selection:text-black`}>
        <div className="noise-bg"></div>
        <CustomCursor />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
