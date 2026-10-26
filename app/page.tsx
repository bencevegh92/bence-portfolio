import { Footer, Header } from "@/components/layout/header";
import { Story } from "@/components/story/story";
import { WorkSection } from "@/components/work/work-section";
import { Experience } from "@/components/experience/experience";
import { Expertise } from "@/components/expertise/expertise";
import { Contact } from "@/components/contact/contact";

export default function Home() {
  return (
    <>
      <a className="skipLink" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Story />
        <WorkSection />
        <Experience />
        <Expertise />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
