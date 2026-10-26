import { profile } from "@/content/profile";
import { opening, stages } from "@/content/story";
import { Laptop } from "./laptop";
import { Screen } from "./screens";
import { StoryMotion } from "./story-motion";
import styles from "./story.module.css";

// Server-rendered hero + seven-stage story. Without JS, on small screens or with
// reduced motion it is an ordinary readable page; StoryMotion adds the sticky,
// scroll-scrubbed presentation on capable desktops.
export function Story() {
  return (
    <StoryMotion className={styles.story}>
      <div className={styles.frame}>
        <div className={`page ${styles.grid}`}>
          <div className={styles.copy}>
            <div className={styles.intro} data-story-intro>
              <p className={styles.identity}>
                <strong>{profile.name}</strong>
                <span>{profile.role}</span>
              </p>
              <h1 id="intro-title" className={styles.headline}>{opening}</h1>
              <p className={styles.summary}>{profile.summary}</p>
              <ul className={styles.proof}>
                {profile.proof.map(item => <li key={item}>{item}</li>)}
              </ul>
              <div className={styles.actions}>
                <a className="button" href="#experience">See my experience</a>
                <a className="button buttonQuiet" href="#work">Selected work</a>
              </div>
              <p className={styles.location}>{profile.location}</p>
            </div>

            <div className={styles.steps}>
              <h2 className={styles.stepsTitle} data-story-reveal>How I work</h2>
              <ol>
                {stages.map((stage, index) => (
                  <li key={stage.title} className={styles.step} data-story-step>
                    <div className={styles.stepText}>
                      <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{stage.title}</h3>
                      <p>{stage.body}</p>
                      <ul className={styles.tags} aria-label="Focus">
                        {stage.tags.map(tag => <li key={tag}>{tag}</li>)}
                      </ul>
                    </div>
                    <div className={styles.stepScreen}><Screen stage={index + 1} /></div>
                  </li>
                ))}
              </ol>
              <p className={styles.disclosure} data-story-reveal>A general process, illustrated with Tandem, a fictional app.</p>
            </div>

            <nav className={styles.rail} aria-label="Story progress">
              <ol>
                {["Intro", ...stages.map(stage => stage.title)].map((label, index) => (
                  <li key={label}>
                    <button type="button" data-story-goto={index} aria-label={index ? `Stage ${index}: ${label}` : "Back to intro"}>
                      <span aria-hidden="true">{index ? String(index).padStart(2, "0") : "Intro"}</span>
                    </button>
                  </li>
                ))}
              </ol>
              <a href="#work">Skip to selected work</a>
            </nav>
          </div>

          <div className={styles.visual}><Laptop /></div>
        </div>
      </div>
    </StoryMotion>
  );
}
