import { skillGroups, strengths } from "@/content/profile";
import { Section } from "@/components/layout/section";
import styles from "./expertise.module.css";

export function Expertise() {
  return (
    <Section
      id="expertise"
      title="What I bring to a team."
      intro="Angular is home, React is a second language, and TypeScript runs through both. The strengths below are where I’ve done my best work."
    >
      <ul className={styles.strengths}>
        {strengths.map(strength => (
          <li key={strength.title}>
            <h3>{strength.title}</h3>
            <p>{strength.body}</p>
            <p className={styles.evidence}>{strength.evidence}</p>
          </li>
        ))}
      </ul>
      <dl className={styles.skills}>
        {skillGroups.map(group => (
          <div key={group.name} className={styles.group}>
            <dt>{group.name}</dt>
            <dd>
              <ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
