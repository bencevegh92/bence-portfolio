import Image from "next/image";
import type { ReactNode } from "react";
import { about } from "@/content/profile";
import { AboutMotion } from "./about-motion";
import { Performance } from "./performance";
import styles from "./about.module.css";

// Simple line icons for the interests; decorative, the label carries meaning.
const hobbyIcons: Record<string, ReactNode> = {
  Football: <><circle cx="12" cy="12" r="8.5" /><path d="M12 8l3.3 2.4-1.3 3.9h-4l-1.3-3.9z M12 3.5V8 M20.2 10.2l-4.9.2 M3.8 10.2l4.9.2 M7.3 19l2.7-4.7 M16.7 19 14 14.3" /></>,
  Cycling: <><circle cx="6" cy="16" r="3.5" /><circle cx="18" cy="16" r="3.5" /><path d="M6 16l4-7h5.5L18 16M10 9l3 7h-2M13.5 6.5h2.5" /></>,
  Fishing: <><path d="M15 3v11.5a4.5 4.5 0 0 1-9 0V12l2.5 2.5" /><circle cx="15" cy="3" r="1" /></>,
  Music: <><path d="M9 18V5.5l10-2.5v13" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="16.5" cy="16" r="2.5" /></>,
  Dogs: <><path d="M12 12.5c-2.6 0-4.5 2.4-4.5 4.4 0 1.5 1.3 2.1 2.6 2.1h3.8c1.3 0 2.6-.6 2.6-2.1 0-2-1.9-4.4-4.5-4.4z" /><circle cx="6" cy="10" r="1.8" /><circle cx="9.7" cy="6.3" r="1.8" /><circle cx="14.3" cy="6.3" r="1.8" /><circle cx="18" cy="10" r="1.8" /></>,
};

export function About() {
  return (
    <section id="about" className={`section ${styles.about}`} aria-labelledby="about-title">
      <AboutMotion className="page">
        <div className={styles.grid}>
          <figure className={styles.portrait}>
            <div className={styles.photo} data-about-photo>
              <Image
                src={about.photo.src}
                alt={about.photo.alt}
                width={about.photo.width}
                height={about.photo.height}
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 22rem, 88vw"
              />
            </div>
            <span className={`${styles.badge} ${styles.badgeMusic}`} data-about-badge>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 18V5.5l10-2.5v13" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="16.5" cy="16" r="2.5" /></svg>
              Trumpet &amp; piano
            </span>
            <span className={`${styles.badge} ${styles.badgeCode}`} data-about-badge>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5" /></svg>
              Frontend since 2019
            </span>
          </figure>

          <div className={styles.text}>
            <h2 id="about-title" data-about-reveal>{about.title}</h2>
            {about.body.map(paragraph => <p key={paragraph} className={styles.body} data-about-reveal>{paragraph}</p>)}

            <ol className={styles.journey} aria-label="Path so far">
              <span className={styles.journeyLine} aria-hidden="true" data-about-line />
              {about.journey.map(step => (
                <li key={step.title} data-about-reveal>
                  <span className={styles.years}>{step.years}</span>
                  <strong>{step.title}</strong>
                  <span className={styles.detail}>{step.detail}</span>
                </li>
              ))}
            </ol>

            <div className={styles.hobbies}>
              <h3 data-about-reveal>Off the keyboard</h3>
              <ul>
                {about.hobbies.map(hobby => (
                  <li key={hobby} data-about-chip>
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{hobbyIcons[hobby]}</svg>
                    {hobby}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Performance />
      </AboutMotion>
    </section>
  );
}
