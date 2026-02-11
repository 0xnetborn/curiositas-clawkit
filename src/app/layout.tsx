import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageWrapper from "./PageWrapper";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeContext";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import ScrollToTop from "@/components/ScrollToTop";
import { AnalyticsProvider } from "@/components/AnalyticsContext";
import { ToastProvider } from "@/components/ui/Toast";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import CookieConsentBanner from "@/components/CookieConsentBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://curiokit.com'),
  title: "CurioKit | AI Orchestration for Founders",
  description: "High-performance AI agent squads for marketing and operations. Deploy instantly.",
  icons: {
    icon: '/logo.webp',
  },
  openGraph: {
    title: "CurioKit | AI Orchestration",
    description: "Deploy your AI squad in seconds. No configuration required.",
    url: 'https://curiokit.com',
    siteName: 'CurioKit',
    images: [
      {
        url: '/og',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    site: "@curiositas",
    title: "CurioKit | AI Orchestration for Founders",
    description: "Deploy your AI squad in seconds. No configuration required.",
    images: ['/og'],
  },
  alternates: {
    canonical: 'https://curiokit.com',
  },
};

// Schema.org Structured Data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Curiositas Studio",
  "url": "https://curiokit.com",
  "logo": "https://curiokit.com/logo.webp",
  "sameAs": [
    "https://twitter.com/curiositas",
    "https://github.com/curiositas",
    "https://discord.gg/curiositas"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "url": "https://curiokit.com"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "CurioKit",
  "url": "https://curiokit.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://curiokit.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "CurioKit | AI Orchestration for Founders",
  "url": "https://curiokit.com",
  "description": "High-performance AI agent squads for marketing and operations. Deploy instantly.",
  "publisher": {
    "@type": "Organization",
    "name": "Curiositas Studio"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip to main content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-500 focus:text-black focus:font-medium focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-black"
        >
          Skip to main content
        </a>
        <AnalyticsProvider>
          <ToastProvider>
            <AnalyticsTracker />
            <ThemeProvider>
            <PageWrapper>
              {children}
              <Footer />
              <KonamiEasterEgg />
              <ScrollToTop />
              <CookieConsentBanner />
            </PageWrapper>
          </ThemeProvider>
          </ToastProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
