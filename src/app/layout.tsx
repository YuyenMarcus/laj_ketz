import type { Metadata } from "next";
import { ReactNode } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Laj Ketz — Wake Up for the Jungle | News, Analysis & Action on Guatemala's Selva Maya",
  description:
    "Laj Ketz reports on the Selva Maya and Guatemala's wild places. Youth-friendly news, weekly analysis, and practical ways to help protect forests and wildlife.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title:
      "Laj Ketz — Wake Up for the Jungle | News, Analysis & Action on Guatemala's Selva Maya",
    description:
      "Laj Ketz reports on the Selva Maya and Guatemala's wild places. Youth-friendly news, weekly analysis, and practical ways to help protect forests and wildlife.",
    url: "https://example.com",
    siteName: "Laj Ketz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Laj Ketz — Wake Up for the Jungle | News, Analysis & Action on Guatemala's Selva Maya",
    description:
      "Laj Ketz reports on the Selva Maya and Guatemala's wild places. Youth-friendly news, weekly analysis, and practical ways to help protect forests and wildlife.",
  },
};

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} bg-laj-light text-laj-ink`}
    >
      <body className="min-h-screen bg-laj-light font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

