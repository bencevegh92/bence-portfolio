import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Bence Végh — Frontend Engineer",
  description: "Frontend engineer working with Angular, React and TypeScript. Explore experience, expertise and a thoughtful approach to building products.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
