"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Keep in sync with the enhanced-layout media query in story.module.css.
const ENHANCED = "(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)";

// Per stage: camera elevation, turntable angle, horizontal offset (%), scale.
const poses = [
  { tilt: -14, turn: -22, x: 0, scale: 1 },
  { tilt: -20, turn: 20, x: 2, scale: .94 },
  { tilt: -12, turn: -16, x: -2, scale: .97 },
  { tilt: -8, turn: 12, x: 0, scale: 1.02 },
  { tilt: -10, turn: -10, x: 2, scale: 1.02 },
  { tilt: -16, turn: 16, x: -2, scale: .98 },
  { tilt: -6, turn: 0, x: 0, scale: 1.06 },
];

/**
 * Scrubs one deterministic timeline with native scroll: no wheel capture, no
 * auto-advance, fully reversible. Stage k is fully composed at timeline time k.
 */
export function StoryMotion({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add(ENHANCED, () => {
      const one = (selector: string) => root.querySelector<HTMLElement>(selector);
      const all = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));
      const intro = one("[data-story-intro]");
      const reveal = all("[data-story-reveal]");
      const camera = one("[data-device-camera]");
      const rig = one("[data-device-rig]");
      const parallax = one("[data-device-parallax]");
      const steps = all("[data-story-step]");
      const screens = all("[data-screen-state]");
      const rail = all("[data-story-goto]");
      if (!intro || !camera || !rig || !parallax || steps.length !== 6 || screens.length !== 7) return;

      gsap.set(camera, { rotationX: poses[0].tilt });
      gsap.set(rig, { rotationY: poses[0].turn, xPercent: poses[0].x, scale: poses[0].scale });
      gsap.set(screens, { autoAlpha: index => (index === 0 ? 1 : 0) });

      let active = -1;
      const markActive = (stage: number) => {
        if (stage === active) return;
        active = stage;
        rail.forEach((button, index) => {
          if (index === stage) button.setAttribute("aria-current", "step");
          else button.removeAttribute("aria-current");
          button.toggleAttribute("data-done", index < stage);
        });
      };

      const timeline = gsap.timeline({
        defaults: { duration: .3, ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: .5,
          snap: { snapTo: "labels", duration: { min: .2, max: .6 }, delay: .12, ease: "power1.inOut" },
          onUpdate: self => markActive(Math.min(6, Math.round(self.progress * (self.animation?.duration() ?? 0)))),
        },
      });

      timeline.addLabel("s0", 0);
      for (let stage = 1; stage <= 6; stage++) {
        const start = stage - .6;
        const pose = poses[stage];
        if (stage === 1) {
          timeline.to(intro, { autoAlpha: 0, y: -32 }, start);
          timeline.fromTo(reveal, { opacity: 0 }, { opacity: 1 }, start + .3);
        } else {
          timeline.to(steps[stage - 2], { opacity: 0, y: -24 }, start);
        }
        timeline.fromTo(steps[stage - 1], { opacity: 0, y: 24 }, { opacity: 1, y: 0 }, start + .3);
        timeline.to(screens[stage - 1], { autoAlpha: 0, duration: .25 }, start + .1);
        timeline.fromTo(screens[stage], { autoAlpha: 0, yPercent: 3 }, { autoAlpha: 1, yPercent: 0 }, start + .25);
        timeline.to(camera, { rotationX: pose.tilt, duration: .6 }, start);
        timeline.to(rig, { rotationY: pose.turn, xPercent: pose.x, scale: pose.scale, duration: .6 }, start);
        timeline.addLabel(`s${stage}`, stage);
      }
      // Hold the finished product before the page scrolls on to the work grid.
      timeline.to({}, { duration: .4 }, 6);
      markActive(0);

      const goTo = (event: MouseEvent) => {
        const button = (event.target as Element).closest<HTMLElement>("[data-story-goto]");
        const trigger = timeline.scrollTrigger;
        if (!button || !trigger) return;
        const time = timeline.labels[`s${button.dataset.storyGoto}`];
        const top = trigger.start + (trigger.end - trigger.start) * (time / timeline.duration());
        window.scrollTo({ top, behavior: "smooth" });
      };

      // A small pointer tilt on fine pointers only; it never affects layout.
      const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
      const tiltX = gsap.quickTo(parallax, "rotationX", { duration: .9, ease: "power3.out" });
      const tiltY = gsap.quickTo(parallax, "rotationY", { duration: .9, ease: "power3.out" });
      const tilt = (event: PointerEvent) => {
        tiltY((event.clientX / innerWidth - .5) * 6);
        tiltX((event.clientY / innerHeight - .5) * -4);
      };

      root.addEventListener("click", goTo);
      if (fine) root.addEventListener("pointermove", tilt, { passive: true });
      return () => {
        root.removeEventListener("click", goTo);
        root.removeEventListener("pointermove", tilt);
        rail.forEach(button => { button.removeAttribute("aria-current"); button.removeAttribute("data-done"); });
      };
    });

    // Web fonts change text metrics; recompute trigger positions once loaded.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => media.revert();
  }, []);

  return (
    <section ref={ref} id="story" className={className} aria-labelledby="intro-title">
      {children}
    </section>
  );
}
