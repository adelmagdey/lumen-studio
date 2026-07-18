import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Lumen — Build the impossible",
    template: "%s · Lumen",
  },
  description:
    "A next-gen digital studio shipping 3D, motion, and AI-powered products for ambitious brands.",
  applicationName: "Lumen",
  authors: [{ name: "Lumen Studio" }],
  creator: "Lumen Studio",
  publisher: "Lumen Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Lumen",
    title: "Lumen — Build the impossible",
    description:
      "A next-gen digital studio shipping 3D, motion, and AI-powered products.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lumen Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumen — Build the impossible",
    description:
      "A next-gen digital studio shipping 3D, motion, and AI-powered products.",
    images: ["/og-image.png"],
    creator: "@lumenstudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/icon-192x192.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
