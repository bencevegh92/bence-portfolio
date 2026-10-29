import { Footer, Header } from "@/components/layout/header";
import { Story } from "@/components/story/story";
import { Experience } from "@/components/experience/experience";
import { Expertise, Toolkit } from "@/components/expertise/expertise";
import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { StructuredData } from "@/components/layout/structured-data";

export default function Home() {
  return (
    <>
      <a className="skipLink" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Story />
        <Toolkit />
        <Experience />
        <Expertise />
        <About />
        <Contact />
      </main>
      <Footer />
      <StructuredData />
    </>
  );
}
