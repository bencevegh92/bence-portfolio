import { profile } from "@/content/portfolio";
import styles from "./intro.module.css";
import { IntroMotion } from "./intro-motion";
import { LaptopVisual } from "./laptop-visual";
import { StoryStages, StageCards } from "@/components/story/development-story";

export function Intro() {
  return <IntroMotion>
    <div className={styles.copy}>
      <div className={styles.identity} data-intro-reveal>
        <p className={styles.name}>{profile.name} <span>— {profile.role}</span></p>
        <p className={styles.experience}>Around six years in frontend, primarily Angular.<br />React and TypeScript expertise.</p>
      </div>
      <div className={styles.narrative}><div data-story-opening>
      <h1 id="intro-title"><span className={styles.headlineLine} data-intro-reveal>I turn ideas</span>{" "}<span className={styles.headlineLine} data-intro-reveal>into real products<span className={styles.period}>.</span></span></h1>
      <p className={styles.summary} data-intro-reveal>I build maintainable, accessible interfaces and reusable components, turning requirements into working products.</p>
      </div><StoryStages /></div>
      <div className={styles.actions}><a className="button" href="#work">View selected work <span aria-hidden="true">↗</span></a><a className="textLink" href="#contact">Contact</a></div>
    </div>
    <div className={styles.scene}>
      <div className={styles.composition} data-laptop-composition data-scene-state="loading" aria-hidden="true">
      <StageCards />
      <div className={styles.laptopPosition}>
      <LaptopVisual>
      <div className={styles.laptop}>
        <div className={styles.screen}><div className={styles.bar}><i /><i /><i /></div><div className={styles.screenContent}><span>WORKSPACE / CONCEPT</span><strong>An idea<br />takes shape.</strong><div className={styles.line} /><div className={styles.shortLine} /></div></div>
        <div className={styles.keyboardDeck}><div className={styles.keys}>{Array.from({ length: 65 }, (_, index) => <i key={index} />)}</div><div className={styles.trackpad} /></div>
      </div>
      </LaptopVisual>
      </div>
      </div>
      <p className={styles.caption}>Fictional workspace · From requirement to release</p>
    </div>
  </IntroMotion>;
}
