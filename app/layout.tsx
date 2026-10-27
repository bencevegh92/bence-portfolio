import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono, Sora } from "next/font/google";
import { profile } from "@/content/profile";
import { siteUrl } from "@/content/site";
import { SmoothAnchors } from "@/components/layout/smooth-anchors";
import { Assistant } from "@/components/assistant/assistant";
import "@/styles/globals.css";

// Display face: geometric, round forms that echo the bv monogram.
const sora = Sora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sora",
});
const instrument = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-instrument",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

// Phrased the way recruiters search: role plus core stack in the title.
const title = `${profile.name} — ${profile.role} (Angular, React, TypeScript)`;
const description =
  "Frontend engineer with 6+ years of building large-scale web applications in Angular, React and TypeScript. Design systems, maintainable architecture and accessible products. Open to remote roles.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: profile.name, url: siteUrl }],
  alternates: { canonical: "/" },
  openGraph: { title, description, type: "profile", locale: "en_GB", siteName: profile.name, url: "/" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#f3f4f7" };

// Marks JS support before first paint so the scroll-driven layout is chosen in
// CSS without a layout jump at hydration. Without JS the static story renders.
const jsFlag = "document.documentElement.dataset.js='true'";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${instrument.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        {children}
        <SmoothAnchors />
        <Assistant />
      </body>
    </html>
  );
}
