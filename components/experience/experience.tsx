import { experience, learning } from "@/content/profile";
import { Section } from "@/components/layout/section";
import styles from "./experience.module.css";

export function Experience() {
  return (
    <Section
      id="experience"
      title="Six years of shipping production frontends."
      intro="From a global travel site to media portals, healthcare and an AI-powered education platform, always at the point where design meets working code."
    >
      <ol className={styles.timeline}>
        {experience.map(role => (
          <li key={`${role.company}-${role.period}`} className={styles.role}>
            <div className={styles.when}>
              <span className={styles.period}>{role.period}</span>
              <span>{role.workMode}</span>
            </div>
            <div className={styles.what}>
              <h3>{role.title}, {role.company}</h3>
              <p className={styles.context}>{role.context}</p>
              <ul className={styles.highlights}>
                {role.highlights.map(item => <li key={item}>{item}</li>)}
              </ul>
              <ul className={styles.stack} aria-label="Technologies">
                {role.stack.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <div className={styles.learning}>
        <h3>Training and education</h3>
        <ul>{learning.map(item => <li key={item}>{item}</li>)}</ul>
      </div>
    </Section>
  );
}
