import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageWrapper from "./PageWrapper";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PageWrapper>
          {children}
        </PageWrapper>
      </body>
    </html>
  );
}
