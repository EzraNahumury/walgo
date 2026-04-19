import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ez Identity",
  description:
    "A living, on-chain personal identity by Ezra Kristanto Nahumury — stored permanently on Walrus.",
  applicationName: "Ez Identity",
  authors: [{ name: "Ezra Kristanto Nahumury" }],
  openGraph: {
    title: "Ez Identity",
    description:
      "A living, on-chain personal identity. Stored permanently on Walrus.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#060608",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
