import type { CSSProperties, ReactNode } from "react";
import { featuredSkills, skillGroups, strengths } from "@/content/profile";
import { Section } from "@/components/layout/section";
import { InView } from "@/components/ui/in-view";
import { ToolIcon, toolColor } from "./tool-icon";
import styles from "./expertise.module.css";

const featured = new Set<string>(featuredSkills.map(skill => skill.name));

// Decorative, looping illustrations — one per strength. They only animate
// while visible and with motion allowed; the static frame is complete.

function LibraryArt() {
  return (
    <div className={styles.library}>
      <div className={styles.cell}><code>Button</code><span className={styles.libButton}>Save changes</span></div>
      <div className={styles.cell}><code>Toggle</code><span className={styles.libToggle}><i /></span></div>
      <div className={styles.cell}><code>Input</code><span className={styles.libInput}><span>Search tasks</span><i /></span></div>
      <div className={styles.cell}><code>Tabs</code><span className={styles.libTabs}><b>Week</b><b>Month</b><b>Year</b><i /></span></div>
      <div className={styles.cell}>
        <code>Checkbox</code>
        <span className={styles.libCheck}>
          <span><svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" /></svg></span>Done
        </span>
      </div>
      <div className={styles.cell}><code>Badge</code><span className={styles.libBadge}>Inbox<i>3</i></span></div>
    </div>
  );
}

function FocusArt() {
  return (
    <div className={styles.focus}>
      <div className={styles.focusRow}>
        <span>Back</span><span>Save</span><span>Publish</span>
        <i className={styles.ring} />
      </div>
      <div className={styles.focusMeta}>
        <kbd className={styles.key}>Tab</kbd>
        <span className={styles.announce}>
          <span>“Back, button”</span><span>“Save, button”</span><span>“Publish, button”</span>
        </span>
      </div>
    </div>
  );
}

function MigrateArt() {
  return (
    <div className={styles.migrate}>
      <pre className={`${styles.code} ${styles.codeA}`}>
        <span className={styles.file}>roster.component.ts</span>
        <code>
          <b>@Component</b>({"{"}{"\n"}  selector: <s>&quot;app-roster&quot;</s>,{"\n"}{"})"}{"\n"}
          <b>export class</b> RosterComponent {"{"}{"\n"}  students = input&lt;Student[]&gt;();{"\n"}{"}"}
        </code>
      </pre>
      <pre className={`${styles.code} ${styles.codeB}`}>
        <span className={styles.file}>Roster.tsx</span>
        <code>
          <b>export function</b> Roster({"{ students }"}) {"{"}{"\n"}  <b>return</b> &lt;RosterList items={"{students}"} /&gt;;{"\n"}{"}"}
        </code>
      </pre>
    </div>
  );
}

function ReviewArt() {
  return (
    <div className={styles.review}>
      <div className={styles.prHead}>
        <span className={styles.prTitle}>feat: shared date picker</span>
        <span className={styles.approved}>Approved</span>
      </div>
      <div className={`${styles.comment} ${styles.c1}`}><i /><p>Could this reuse the ui-kit popover?</p></div>
      <div className={`${styles.comment} ${styles.c2}`}><i /><p>Good call, refactored. Ready for another look.</p></div>
      <span className={styles.merged}>Merged into main</span>
    </div>
  );
}

const tiles: { index: number; accent: string; art: ReactNode; wide?: boolean }[] = [
  { index: 0, accent: "blue", art: <LibraryArt />, wide: true },
  { index: 2, accent: "mint", art: <FocusArt /> },
  { index: 1, accent: "lilac", art: <MigrateArt /> },
  { index: 3, accent: "sand", art: <ReviewArt />, wide: true },
];

export function Expertise() {
  return (
    <Section
      id="expertise"
      title="What I bring to a team."
      intro="Angular is home, React is a second language, and TypeScript runs through both. The strengths below are where I’ve done my best work."
    >
      <InView className={styles.bento}>
        {tiles.map(tile => {
          const strength = strengths[tile.index];
          return (
            <article key={strength.title} className={`${styles.tile} ${tile.wide ? styles.wide : ""}`} data-accent={tile.accent}>
              <div className={styles.art} aria-hidden="true">{tile.art}</div>
              <div className={styles.text}>
                <h3>{strength.title}</h3>
                <p>{strength.body}</p>
                <p className={styles.evidence}>{strength.evidence}</p>
              </div>
            </article>
          );
        })}
      </InView>

      <InView className={styles.toolkit}>
        <div className={styles.toolkitHead}>
          <h3>Toolkit</h3>
          <p>What I reach for day to day, grouped by what it’s for.</p>
        </div>
        <ul className={styles.featured}>
          {featuredSkills.map((skill, index) => (
            <li key={skill.name} style={{ "--brand": toolColor(skill.name), "--i": index } as CSSProperties}>
              <ToolIcon name={skill.name} className={styles.toolIcon} />
              <strong>{skill.name}</strong>
              <p>{skill.note}</p>
            </li>
          ))}
        </ul>
        <div className={styles.groups}>
          {skillGroups.map((group, groupIndex) => (
            <div key={group.name} className={styles.group}>
              <h4>{group.name}</h4>
              <ul>
                {group.items.filter(item => !featured.has(item)).map((item, index) => (
                  <li key={item} style={{ "--brand": toolColor(item), "--i": 3 + groupIndex * 3 + index } as CSSProperties}>
                    <ToolIcon name={item} className={styles.toolIcon} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </InView>
    </Section>
  );
}
