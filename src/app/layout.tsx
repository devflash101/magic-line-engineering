import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Magic Line — Architecture & Design",
  description: "We craft spaces that inspire, endure, and belong.",
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
