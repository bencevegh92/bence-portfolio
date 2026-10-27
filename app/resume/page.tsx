import type { Metadata } from "next";
import { Footer, Header } from "@/components/layout/header";
import { availability, contact, experience, languages, learning, profile, skillGroups } from "@/content/profile";
import styles from "@/components/resume/resume.module.css";

export const metadata: Metadata = {
  title: `Résumé — ${profile.name}, ${profile.role}`,
  description: `Plain-text résumé of ${profile.name}: frontend engineer with 6+ years in Angular, React and TypeScript.`,
  alternates: { canonical: "/resume" },
};

// A deliberately plain, text-first page: easy to skim, print, and parse by
// search engines and AI assistants. Same facts as the home page.
export default function Resume() {
  return (
    <>
      <Header />
      <main id="main" className={`page ${styles.page}`}>
        <header className={styles.head}>
          <h1>{profile.name}</h1>
          <p className={styles.role}>{profile.role} — Angular, React, TypeScript</p>
          <p>{profile.location}.</p>
          <ul className={styles.contact}>
            <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li><a href={contact.linkedin} rel="me noopener">LinkedIn</a></li>
            <li><a href={contact.cv}>Download PDF</a></li>
          </ul>
        </header>

        <section aria-labelledby="summary">
          <h2 id="summary">Summary</h2>
          <p>{profile.summary}</p>
        </section>

        <section aria-labelledby="looking-for">
          <h2 id="looking-for">What I’m looking for</h2>
          <dl className={styles.skills}>
            {availability.items.map(item => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="experience">
          <h2 id="experience">Experience</h2>
          {experience.map(role => (
            <article key={`${role.company}-${role.period}`} className={styles.job}>
              <h3>{role.title}, {role.company}</h3>
              <p className={styles.meta}>{role.period}, {role.workMode.toLowerCase()}. {role.context}.</p>
              <ul>{role.highlights.map(item => <li key={item}>{item}</li>)}</ul>
              <p className={styles.meta}>Technologies: {role.stack.join(", ")}</p>
            </article>
          ))}
        </section>

        <section aria-labelledby="skills">
          <h2 id="skills">Skills</h2>
          <dl className={styles.skills}>
            {skillGroups.map(group => (
              <div key={group.name}>
                <dt>{group.name}</dt>
                <dd>{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="education">
          <h2 id="education">Training and education</h2>
          <ul>{learning.map(item => <li key={item}>{item}</li>)}</ul>
        </section>

        <section aria-labelledby="languages">
          <h2 id="languages">Languages</h2>
          <p>{languages.join(", ")}</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
