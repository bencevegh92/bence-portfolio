import { profile } from "@/content/portfolio";

export function Header() {
  return <header className="header">
    <a className="identity" href="#top">{profile.name}<span>Frontend Engineer</span></a>
    <nav aria-label="Main navigation">
      <a href="#work">Work</a><a href="#expertise">Expertise</a><a href="#assistant">AI Demo</a><a href="#contact">Contact</a>
    </nav>
  </header>;
}
