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
  title: "Lumineers",
  description:
    "A modern travel storytelling platform to publish immersive journeys and discover curated experiences.",
  icons: {
    icon: "/favicon.svg",
  },
  applicationName: "Lumineers",
  openGraph: {
    title: "Lumineers",
    description:
      "Publish your travel stories and explore editorial-quality journals from explorers around the world.",
    type: "website",
    images: ["/favicon.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumineers",
    description:
      "Publish your travel stories and explore editorial-quality journals from explorers around the world.",
    images: ["/favicon.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="A modern travel storytelling platform where explorers publish immersive journals and discover authentic journeys."
        />
        <meta
          name="keywords"
          content="travel blog, stories, explorer, journeys, travel photography, lume, lumineers"
        />
        <meta name="author" content="Lumineers" />
        <meta name="robots" content="index,follow" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#060a13" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="page-shell flex min-h-screen items-center justify-center">
                <div className="surface rounded-2xl px-6 py-4 text-sm text-slate-200">
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
