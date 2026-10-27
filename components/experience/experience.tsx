import type { CSSProperties } from "react";
import { experience, learning, type Role } from "@/content/profile";
import { Section } from "@/components/layout/section";
import { DomainIcon } from "@/components/ui/domain-icon";
import { ExperienceMotion } from "./experience-motion";
import styles from "./experience.module.css";

// Told as a journey: oldest first, ending in an open "what's next".
const journey = [...experience].sort((a, b) => a.start - b.start || a.end - b.end);

// ---- Career time scale (years only; the CV has no months) ----
// A role "2021 – 2025" covers the years 2021 through 2025, i.e. [2021, 2026).
const first = Math.min(...experience.map(role => role.start));
const last = Math.max(...experience.map(role => role.end)) + 1; // exclusive end of the scale
const years = Array.from({ length: last - first }, (_, index) => first + index);
const at = (year: number) => `${((year - first) / (last - first)) * 100}%`;
const span = (from: number, to: number) => ({ "--from": at(from), "--to": at(to) }) as CSSProperties;

// Main lane: one continuous line of roles. A role that only shares its boundary
// year with the previous one meets it at mid-year instead of overlapping; a role
// that overlaps for longer is mirrored on a second lane below the axis.
function layoutLanes() {
  const main: { role: Role; from: number; to: number }[] = [];
  const side: typeof main = [];
  const byStart = [...experience].sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
  for (const role of byStart) {
    const item = { role, from: role.start, to: role.end + 1 };
    const previous = main.at(-1);
    if (!previous || previous.to <= item.from) main.push(item);
    else if (previous.to - item.from <= 1 && item.to > previous.to) {
      previous.to = item.from = item.from + .5;
      main.push(item);
    } else side.push(item);
  }
  return { main, side };
}
const lanes = layoutLanes();

function RoleBar({ role, from, to }: { role: Role; from: number; to: number }) {
  return (
    <li className={styles.bar} data-accent={role.accent} data-segment style={span(from, to)}>
      <a href={`#role-${role.id}`}>
        <span className={styles.barName}><i aria-hidden="true" /><span>{role.short}</span></span>
        <span className={styles.barMeta}>{role.period}<span className="srOnly">, {role.domain}</span></span>
      </a>
    </li>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      title="Six years of shipping production frontends."
      intro="From a global travel site to media portals, healthcare and an AI-powered education platform, always at the point where design meets working code."
    >
      <ExperienceMotion>
        <div className={styles.overview}>
          <p className={styles.overviewTitle}>Career at a glance</p>
          <div className={styles.chart} style={{ "--years": years.length } as CSSProperties}>
            <div className={styles.years} aria-hidden="true">
              {years.map(year => (
                <span key={year} className={styles.year} style={{ left: at(year + .5) }}>
                  <span className={styles.yearFull}>{year}</span>
                  <span className={styles.yearShort}>’{String(year).slice(2)}</span>
                </span>
              ))}
            </div>
            <ol className={styles.lane} aria-label="Roles over time">
              {lanes.main.map(item => <RoleBar key={item.role.id} {...item} />)}
            </ol>
            <span className={styles.axis} aria-hidden="true" data-axis />
            {lanes.side.length > 0 && (
              <ol className={`${styles.lane} ${styles.below}`} aria-label="Overlapping roles">
                {lanes.side.map(item => <RoleBar key={item.role.id} {...item} />)}
              </ol>
            )}
          </div>
        </div>

        <div className={styles.timelineWrap}>
          <span className={styles.rail} aria-hidden="true"><span className={styles.railFill} data-rail-fill /></span>
          <ol className={styles.timeline} data-timeline>
            {journey.map(role => (
              <li key={role.id} id={`role-${role.id}`} tabIndex={-1} className={styles.role} data-accent={role.accent} data-role>
                <span className={styles.dot} aria-hidden="true" />
                <article className={styles.card} data-card>
                  <header className={styles.cardHead}>
                    <span className={styles.badge} aria-hidden="true"><DomainIcon icon={role.icon} /></span>
                    <div>
                      <h3>{role.title}</h3>
                      <p className={styles.company}>{role.company}</p>
                    </div>
                    <p className={styles.period}>{role.period}<span>{role.workMode}</span></p>
                  </header>
                  <p className={styles.context}>
                    <span className={styles.domain}>{role.domain}</span>
                    {role.context}
                  </p>
                  <ul className={styles.highlights}>
                    {role.highlights.map(item => <li key={item}>{item}</li>)}
                  </ul>
                  <ul className={styles.stack} aria-label="Technologies">
                    {role.stack.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.next}>
          <span className={styles.nextDot} aria-hidden="true" />
          <p><strong>What’s next?</strong> The next chapter could be with your team. <a href="#contact">Let’s talk</a></p>
        </div>

        <div className={styles.learning}>
          <h3>Training and education</h3>
          <ul>{learning.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </ExperienceMotion>
    </Section>
  );
}
