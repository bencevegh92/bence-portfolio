"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { stages } from "@/content/portfolio";
import { createStoryState } from "./story-state";
import { createWheelGesture } from "./wheel-gesture";
import { StageIllustration } from "./stage-illustration";
import styles from "./story.module.css";

const StoryContext = createContext<ReturnType<typeof createStoryState> | undefined>(undefined);
export const useStory = () => useContext(StoryContext);

export function DevelopmentStory({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [story] = useState(createStoryState);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = gsap.matchMedia();
    story.setDisable(() => media.revert());
    media.add("(min-width: 1024px) and (min-height: 760px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      element.dataset.enhanced = "true";
      story.setActive(true);
      const cursor = { progress: 0 };
      story.setStage(0);
      let timeline: gsap.core.Timeline | undefined;
      let busy = false;
      let released = false;
      const gesture = createWheelGesture();
      const items = element.querySelectorAll<HTMLElement>("[data-story-stage]");
      const bar = element.querySelector<HTMLElement>("[data-story-progress]");
      const opening = element.querySelector<HTMLElement>("[data-story-opening]");
      const cards = element.querySelectorAll<HTMLElement>("[data-stage-card]");
      const panel = element.querySelector<HTMLElement>("[data-stage-panel]");
      const render = () => {
        story.setProgress(cursor.progress);
        const intro = 1 - gsap.utils.clamp(0, 1, (story.progress - .2) / .25);
        if (opening) { opening.style.opacity = `${intro}`; opening.style.transform = `translateY(${-24 * (1 - intro)}px)`; }
        if (panel) panel.style.opacity = `${gsap.utils.clamp(0, 1, (story.progress - .55) / .25)}`;
        items.forEach((item, index) => {
          const distance = Math.abs(index - story.progress);
          item.style.opacity = index === 0 ? "0" : `${1 - gsap.utils.clamp(0, 1, (distance - .2) / .3)}`;
          item.style.transform = `translateY(${gsap.utils.clamp(-22, 22, (index - story.progress) * 22)}px)`;
        });
        cards.forEach((card, index) => {
          const focus = 1 - gsap.utils.clamp(0, 1, Math.abs(index + 1 - story.progress));
          const phase = story.progress - index - 1;
          card.style.opacity = `${.18 + focus * .82}`;
          card.style.transform = `translate(${Math.sin(phase * .8) * 16}px, ${(1 - focus) * (index < 3 ? -18 : 18)}px) rotate(${phase * 3}deg) scale(${.72 + focus * .34})`;
          card.style.zIndex = `${Math.round(focus * 10) + 2}`;
          card.style.setProperty("--focus", `${focus}`);
        });
        if (bar) bar.style.transform = `scaleX(${story.progress / 6})`;
        story.notify();
      };
      const buttons = element.querySelectorAll<HTMLButtonElement>("[data-stage-step]");
      const status = element.querySelector<HTMLElement>("[data-stage-status]");
      const controls = () => {
        buttons.forEach(button => { const next = story.activeStage + Number(button.dataset.stageStep); button.disabled = next < 0 || next > 6; });
      };
      const transition = (direction: number) => {
        // Queue at most three stages ahead of the visible pose. Fresh input can
        // replace the target during animation; momentum from one gesture cannot.
        const next = gsap.utils.clamp(0, 6, gsap.utils.clamp(Math.round(cursor.progress) - 3, Math.round(cursor.progress) + 3, story.activeStage + direction));
        if (next === story.activeStage) return;
        story.setStage(next);
        busy = true; controls();
        timeline?.kill();
        timeline = gsap.timeline({ onUpdate: render, onComplete: () => {
          cursor.progress = story.activeStage; render(); busy = false; controls();
          if (status) status.textContent = `Stage ${next + 1} of 7: ${stages[next]}`;
        }}).to(cursor, {
          progress: next,
          duration: gsap.utils.clamp(.5, 1.25, .6 + Math.abs(next - cursor.progress) * .18),
          ease: "power2.out",
        });
      };
      const wheel = (event: WheelEvent) => {
        if (released || event.ctrlKey || event.metaKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY) || !event.deltaY) return;
        if ((event.target as Element).closest("input, textarea, select, [contenteditable=true]")) return;
        const rect = element.getBoundingClientRect();
        // Only intercept while the story is substantially in view, never on entry
        // from a distant anchor or while the page is scrolling past the section.
        if (rect.top > 120 || rect.top < -80 || rect.bottom < innerHeight - 100) return;
        const direction = Math.sign(event.deltaY);
        if (!busy && story.activeStage === 0 && direction < 0) return;
        if (!busy && story.activeStage === 6 && direction > 0) return;
        if (!event.cancelable) return;
        event.preventDefault();
        const pixels = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
        const intent = gesture.consume(pixels, event.timeStamp);
        if (intent) transition(intent);
      };
      const key = (event: KeyboardEvent) => {
        if (event.key === "Escape") { released = true; return; }
        if (event.ctrlKey || event.metaKey || event.altKey) return;
        if ((event.target as Element).closest("input, textarea, select, [contenteditable=true]")) return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault(); transition(event.key === "ArrowRight" ? 1 : -1);
        }
      };
      const click = (event: MouseEvent) => {
        const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
        if (link?.getAttribute("href") === "#work") {
          released = true;
          timeline?.progress(1);
          return; // Native anchor exits immediately; never wait on a timeline.
        }
        const button = (event.target as Element).closest<HTMLButtonElement>("[data-stage-step]");
        if (button && element.contains(button)) transition(Number(button.dataset.stageStep));
      };
      // Leaving by touch, anchors or native scroll completes the in-flight target.
      const visibility = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) {
          timeline?.progress(1); released = false;
        }
      });
      visibility.observe(element);
      element.addEventListener("wheel", wheel, { passive: false });
      element.addEventListener("keydown", key);
      element.addEventListener("click", click);
      controls();
      render();
      return () => {
        timeline?.kill();
        visibility.disconnect();
        element.removeEventListener("wheel", wheel);
        element.removeEventListener("keydown", key);
        element.removeEventListener("click", click);
        delete element.dataset.enhanced;
        items.forEach(item => { item.style.removeProperty("opacity"); item.style.removeProperty("transform"); });
        bar?.style.removeProperty("transform");
        [opening, panel, ...cards].forEach(item => { item?.style.removeProperty("opacity"); item?.style.removeProperty("transform"); item?.style.removeProperty("--focus"); item?.style.removeProperty("z-index"); });
        story.setActive(false); story.setStage(0); story.setProgress(0); story.notify();
      };
    }, element);
    return () => { media.revert(); story.setDisable(); };
  }, [story]);
  return <StoryContext.Provider value={story}><div ref={root} className={styles.story} id="story" tabIndex={0} role="region" aria-label="Seven-stage development story"><div className={styles.sticky}>{children}<div className={styles.controls}>
    <p>Scroll or use the arrow keys. Repeat to move ahead faster. Escape restores normal scrolling.</p>
    <div><button type="button" data-stage-step="-1" disabled>Previous stage</button><button type="button" data-stage-step="1">Next stage</button><a className={styles.skipStory} href="#work">Skip story / View work ↗</a></div>
    <span className={styles.srOnly} data-stage-status role="status" aria-live="polite" aria-atomic="true" />
  </div></div></div></StoryContext.Provider>;
}

const descriptions = [
  "One idea. A thoughtful path to a working product.",
  "Clarify the requirement, the people and the constraints.",
  "Map the structure, components and delivery approach.",
  "Shape the same workspace from wireframe to polished interface.",
  "Connect components, states and meaningful interactions.",
  "Check behavior, accessibility and performance.",
  "Bring the fictional workspace into its release-ready form.",
];

export function StoryStages() {
  return <section className={styles.stages} data-stage-panel aria-labelledby="process-title">
    <h2 id="process-title" className={styles.label}>From requirement to release</h2>
    <div className={styles.track} aria-hidden="true"><span data-story-progress /></div>
    <ol>{stages.map((stage, index) => <li key={stage} data-story-stage><span className={styles.number}>0{index} / 06</span><h3>{stage}</h3><p>{descriptions[index]}</p></li>)}</ol>
    <p className={styles.disclosure}>A general process, illustrated with one fictional application.</p>
  </section>;
}

const visuals = ["Discovery", "Planning", "Design", "Development", "Testing", "Launch"] as const;

export function StageCards() {
  return <div className={styles.visuals} data-stage-illustrations aria-hidden="true">{visuals.map((title, index) =>
    <div className={`${styles.visual} ${styles[`visual${index}`]}`} key={title} data-stage-card>
      <div className={styles.illustration}>
        <StageIllustration stage={index} />
      </div><span className={styles.visualLabel}>{title}</span>
    </div>
  )}</div>;
}
