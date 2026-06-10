import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Hanken_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display"
});

const bodyFont = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sa7ebti.local"),
  applicationName: "sa7ebti",
  title: {
    default: "sa7ebti",
    template: "%s | sa7ebti"
  },
  description:
    "Assistant skincare et makeup tunisien pour scanner des produits, lire les ingredients et adapter vos routines au climat local.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "sa7ebti"
  },
  formatDetection: {
    telephone: false
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg"
  },
  other: {
    "mobile-web-app-capable": "yes"
  }
};

export const viewport: Viewport = {
  themeColor: "#faf9f6",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${displayFont.variable} ${bodyFont.variable} font-body text-espresso antialiased`}>
        {children}
      </body>
    </html>
  );
}
