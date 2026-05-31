import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Magic Line — Architecture & Design",
  description: "We craft spaces that inspire, endure, and belong.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
