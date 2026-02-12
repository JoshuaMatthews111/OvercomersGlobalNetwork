import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://overcomersglobalnetwork.com";

export const metadata: Metadata = {
  title: {
    default: "Overcomers Global Network | A Global Discipleship Network",
    template: "%s | Overcomers Global Network",
  },
  description: "A global discipleship network gathering from home to home. Join house churches, start discipleship, watch messages, and connect with believers worldwide.",
  keywords: [
    "discipleship", "house church", "global network", "Christian ministry",
    "Prophet Joshua Matthews", "overcomers", "bible study", "church network",
    "prayer", "worship", "faith", "kingdom of God", "evangelism",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Overcomers Global Network",
    title: "Overcomers Global Network | A Global Discipleship Network",
    description: "A global discipleship network gathering from home to home. Join house churches, start discipleship, watch messages, and connect with believers worldwide.",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Overcomers Global Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Overcomers Global Network | A Global Discipleship Network",
    description: "A global discipleship network gathering from home to home. Join house churches, start discipleship, watch messages, and connect with believers worldwide.",
    images: [`${siteUrl}/images/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Overcomers Global Network",
              url: "https://overcomersglobalnetwork.com",
              logo: "https://overcomersglobalnetwork.com/images/og-image.png",
              description: "A global discipleship network gathering from home to home. Join house churches, start discipleship, watch messages, and connect with believers worldwide.",
              founder: {
                "@type": "Person",
                name: "Prophet Joshua Matthews",
                jobTitle: "Founder & Visionary Leader",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "ognmedia2024@gmail.com",
                contactType: "customer service",
              },
              sameAs: [
                "https://www.facebook.com/overcomersglobalnetwork",
                "https://www.youtube.com/@overcomersglobalnetwork",
              ],
            }),
          }}
        />
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
