import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://magiclineeng.com";
const title = "Magic Line — Architecture & Design";
const description = "We craft spaces that inspire, endure, and belong.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Magic Line Engineering",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/projects/Residential/ADU2/1.png",
        width: 1408,
        height: 768,
        alt: "Magic Line Engineering — architecture, structural and MEP design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/projects/Residential/ADU2/1.png"],
  },
  other: {
    "color-scheme": "light only",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "only light" }}>
      <body>{children}</body>
    </html>
  );
}
