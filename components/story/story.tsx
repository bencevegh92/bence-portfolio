import { availability, contact, profile } from "@/content/profile";
import { opening, stages } from "@/content/story";
import { Laptop } from "./laptop";
import { StoryPlayer } from "./story-player";
import styles from "./story.module.css";

// Hero + "how I work" walkthrough in one ordinary, non-pinned section:
// the introduction beside the laptop, then a full-width strip that names the
// current stage and holds its tabs. Its columns line up with the hero's, so
// both rows read as one composition. Page scrolling never drives the story.
export function Story() {
  return (
    <section id="story" className={styles.story} aria-labelledby="intro-title">
      <StoryPlayer className={`page ${styles.player}`} lastStage={stages.length - 1}>
        <div className={styles.hero}>
          <div className={styles.intro}>
            <p className={styles.identity}>
              <strong>{profile.name}</strong>
              <span>{profile.role}</span>
              <a className={styles.available} href="#contact">{availability.status}</a>
            </p>
            <h1 id="intro-title" className={styles.headline}>{opening}</h1>
            <p className={styles.summary}>{profile.summary}</p>
            <ul className={styles.proof}>
              {profile.proof.map(item => <li key={item}>{item}</li>)}
            </ul>
            <div className={styles.actions}>
              <a className="button" href="#experience">See my experience</a>
              <a className="button buttonQuiet" href="#contact">Get in touch</a>
              <a className={styles.cvLink} href={contact.cv} download="Bence-Vegh-CV.pdf">Download CV</a>
            </div>
            <p className={styles.location}>{profile.location}</p>
          </div>
          <div className={styles.visual}><Laptop /></div>
        </div>

        <div className={styles.strip} data-story-text>
          <div className={styles.stripText}>
            <h2 id="process-title" className={styles.panelTitle}>How I work</h2>
            {stages.map((stage, index) => (
              <div
                key={stage.short}
                role="tabpanel"
                id={`stage-panel-${index}`}
                aria-labelledby={`stage-tab-${index}`}
                className={styles.detail}
                data-stage-panel
                data-active={index === 0 || undefined}
              >
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
              </div>
            ))}
          </div>

          <div className={styles.stripControls}>
            <div className={styles.controlsRow}>
              <div role="tablist" aria-labelledby="process-title" className={styles.tabs}>
                {stages.map((stage, index) => (
                  <button
                    key={stage.short}
                    type="button"
                    role="tab"
                    id={`stage-tab-${index}`}
                    aria-controls={`stage-panel-${index}`}
                    aria-selected={index === 0}
                    tabIndex={index === 0 ? 0 : -1}
                    className={styles.tab}
                    data-stage-tab={index}
                  >
                    {stage.short}
                    <span className={styles.progress} data-progress aria-hidden="true" />
                  </button>
                ))}
              </div>
              <button type="button" className={styles.toggle} data-story-toggle aria-label="Pause the walkthrough">
                <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                  <path data-icon="pause" d="M7 5v10M13 5v10" />
                  <path data-icon="play" d="M7 4.5v11l9-5.5z" />
                  <path data-icon="replay" d="M4.5 10a5.5 5.5 0 1 0 1.8-4.1M4.5 4v3.5H8" />
                </svg>
                <span className="srOnly" data-story-toggle-label>Pause</span>
              </button>
            </div>
            <p className={styles.disclosure}>A general process, illustrated with Tandem, a fictional app.</p>
          </div>
        </div>
      </StoryPlayer>
    </section>
  );
}
