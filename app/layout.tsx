import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import "@/styles/globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth", "opsz"],
  variable: "--font-bricolage",
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

const title = `${profile.name} — ${profile.role}`;
const description =
  "Frontend engineer with 6+ years of building large-scale web applications in Angular, React and TypeScript. Design systems, maintainable architecture and accessible products.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", locale: "en_GB" },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = { themeColor: "#f3f4f7" };

// Marks JS support before first paint so the scroll-driven layout is chosen in
// CSS without a layout jump at hydration. Without JS the static story renders.
const jsFlag = "document.documentElement.dataset.js='true'";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
