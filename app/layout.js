import localFont from "next/font/local";
import { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  metadataBase: new URL("https://lumineers-web.vercel.app"),
  title: {
    default: "Lumineers | Travel Stories and Journals",
    template: "%s | Lumineers",
  },
  description:
    "Lumineers is a travel storytelling platform where explorers publish immersive journeys, destination notes, and visual travel journals.",
  applicationName: "Lumineers",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  keywords: [
    "travel blog",
    "travel stories",
    "travel journal",
    "adventure blog",
    "destination guides",
    "travel photography",
    "Lumineers",
  ],
  alternates: {
    canonical: "/",
  },
  category: "travel",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Lumineers | Travel Stories and Journals",
    description:
      "Publish travel stories and explore editorial-quality journals from explorers around the world.",
    url: "https://lumineers-web.vercel.app",
    siteName: "Lumineers",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Lumineers travel storytelling platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumineers | Travel Stories and Journals",
    description:
      "Publish travel stories and explore editorial-quality journals from explorers around the world.",
    images: ["/image.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1020",
};

export default function RootLayout({ children }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Lumineers",
    url: "https://lumineers-web.vercel.app",
    logo: "https://lumineers-web.vercel.app/favicon.svg",
    sameAs: ["https://lumineers-web.vercel.app"],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Lumineers",
    url: "https://lumineers-web.vercel.app",
    description:
      "Lumineers is a travel storytelling platform where explorers publish immersive journeys and destination journals.",
    inLanguage: "en",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="page-shell flex min-h-screen items-center justify-center">
                <div className="surface rounded-2xl px-6 py-4 text-sm text-gray-100">
                  Loading experience...
                </div>
              </div>
            }
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}

