import { Header } from "@/components/layout/header";
import { Section } from "@/components/layout/section";
import { Intro } from "@/components/intro/intro";
import { profile } from "@/content/portfolio";
import { ProjectLauncher } from "@/components/work/project-launcher";
import { DevelopmentStory } from "@/components/story/development-story";

export default function Home() {
  return <>
    <a className="skipLink" href="#main">Skip to content</a>
    <Header />
    <main id="main" tabIndex={-1}>
      <div id="top"><DevelopmentStory><Intro /></DevelopmentStory></div>
      <ProjectLauncher />
      <Section id="expertise" label="03 / Expertise" title="Built on strong foundations.">
        <ul className="technologies">{profile.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
        <p className="sectionIntro">Reusable UI components, accessibility and modern frontend practices.</p>
      </Section>
      <Section id="assistant" label="04 / AI Demo" title="A conversation, coming later.">
        <div className="notice"><p>A future portfolio assistant will answer questions using approved public profile facts.</p><span className="status">Not available yet</span></div>
      </Section>
      <Section id="contact" label="05 / Contact" title="Let’s build something thoughtful.">
        <p className="sectionIntro">Email and LinkedIn links will appear here once contact details are provided.</p>
      </Section>
    </main>
    <footer className="footer"><span>{profile.name} · {profile.role}</span><a href="#top">Back to top ↑</a></footer>
  </>;
}
