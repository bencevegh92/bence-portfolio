"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

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

type Autoplay = "playing" | "paused" | "done";
const labels: Record<Autoplay, [string, string]> = {
  playing: ["Pause", "Pause the walkthrough"],
  paused: ["Play", "Play the walkthrough"],
  done: ["Replay", "Replay the walkthrough"],
};

/**
 * The "how I work" walkthrough. Native page scrolling never drives it: stages
 * change only through the tabs (click, tap, arrow keys) or a gentle autoplay
 * while the player is on screen. Each change is one short, time-based
 * transition into a stable, fully composed stage.
 *
 * Autoplay timing lives in CSS: the selected tab's progress bar animates for
 * one dwell period and its `animationend` advances the stage. Holding the
 * player (hover, focus, off screen, hidden tab) pauses that animation, so the
 * remaining time is kept without any timers. Reduced motion: no autoplay and
 * instant stage changes.
 */
export function StoryPlayer({ className, lastStage, children }: { className: string; lastStage: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const all = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));
    const tabs = all("[data-stage-tab]");
    const panels = all("[data-stage-panel]");
    const screens = all("[data-screen-state]");
    const camera = root.querySelector<HTMLElement>("[data-device-camera]");
    const rig = root.querySelector<HTMLElement>("[data-device-rig]");
    const parallax = root.querySelector<HTMLElement>("[data-device-parallax]");
    const toggle = root.querySelector<HTMLButtonElement>("[data-story-toggle]");
    const toggleLabel = root.querySelector<HTMLElement>("[data-story-toggle-label]");
    const text = root.querySelector<HTMLElement>("[data-story-text]");
    if (!camera || !rig || !parallax || !toggle || !toggleLabel || !text || screens.length !== lastStage + 1) return;

    const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {}, root);
    let current = 0;
    let transition: gsap.core.Timeline | undefined;

    const setAutoplay = (state: Autoplay) => {
      root.dataset.autoplay = state;
      toggleLabel.textContent = labels[state][0];
      toggle.setAttribute("aria-label", labels[state][1]);
    };

    const showStage = (target: number, instant: boolean) => {
      transition?.kill();
      const pose = poses[target];
      ctx.add(() => {
        if (instant) {
          gsap.set(screens, { autoAlpha: (index: number) => (index === target ? 1 : 0), yPercent: 0 });
          gsap.set(camera, { rotationX: pose.tilt });
          gsap.set(rig, { rotationY: pose.turn, xPercent: pose.x, scale: pose.scale });
          return;
        }
        const next = screens[target];
        if (Number(gsap.getProperty(next, "opacity")) === 0) gsap.set(next, { yPercent: 3 });
        transition = gsap.timeline({ defaults: { ease: "power3.inOut" } })
          .to(screens.filter((_, index) => index !== target), { autoAlpha: 0, duration: .3, ease: "power2.out" }, 0)
          .to(next, { autoAlpha: 1, yPercent: 0, duration: .5, ease: "power2.out" }, .18)
          .to(camera, { rotationX: pose.tilt, duration: .9 }, 0)
          .to(rig, { rotationY: pose.turn, xPercent: pose.x, scale: pose.scale, duration: .9 }, 0);
      });
    };

    const select = (target: number, { fromUser = false } = {}) => {
      if (target === current && !fromUser) return;
      current = target;
      tabs.forEach((tab, index) => {
        const selected = index === target;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((panel, index) => panel.toggleAttribute("data-active", index === target));
      showStage(target, reduce());
      if (fromUser) setAutoplay("paused");
      else if (target === lastStage) setAutoplay("done");
    };

    // Autoplay: advance when the selected tab's progress bar finishes.
    const advance = (event: AnimationEvent) => {
      const bar = event.target as HTMLElement;
      if (root.dataset.autoplay !== "playing" || !bar.matches("[data-progress]")) return;
      if (bar.closest("[data-stage-tab]") !== tabs[current]) return;
      select(Math.min(current + 1, lastStage));
    };

    const onTabClick = (event: MouseEvent) => {
      const tab = (event.target as Element).closest<HTMLElement>("[data-stage-tab]");
      if (tab) select(Number(tab.dataset.stageTab), { fromUser: true });
    };

    // Tabs pattern: arrows / Home / End move focus and select.
    const onKey = (event: KeyboardEvent) => {
      if (!(event.target as Element).closest("[data-stage-tab]")) return;
      const keys: Record<string, number> = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: lastStage };
      if (!(event.key in keys)) return;
      event.preventDefault();
      const target = (keys[event.key] + lastStage + 1) % (lastStage + 1);
      select(target, { fromUser: true });
      tabs[target].focus();
    };

    const onToggle = () => {
      const state = root.dataset.autoplay as Autoplay;
      if (state === "playing") return setAutoplay("paused");
      if (state === "done" || current === lastStage) select(0);
      setAutoplay("playing");
    };

    // Transient holds: never advance while the text is being read (pointer over
    // it), a tab or panel has keyboard focus, or the player is unseen. Focus on
    // the Play/Pause button itself does not hold, or Play could never resume.
    const hold = { hover: false, focus: false, offscreen: false, hidden: false };
    const updateHold = () => root.toggleAttribute("data-hold", Object.values(hold).some(Boolean));
    const onEnter = () => { hold.hover = true; updateHold(); };
    const onLeave = () => { hold.hover = false; updateHold(); };
    const holdsFocus = (node: EventTarget | null) =>
      node instanceof Element && root.contains(node) && !node.closest("[data-story-toggle]");
    const onFocusIn = (event: FocusEvent) => { hold.focus = holdsFocus(event.target); updateHold(); };
    const onFocusOut = (event: FocusEvent) => { hold.focus = holdsFocus(event.relatedTarget); updateHold(); };
    const onVisibility = () => { hold.hidden = document.hidden; updateHold(); };
    const observer = new IntersectionObserver(([entry]) => { hold.offscreen = !entry.isIntersecting; updateHold(); }, { threshold: .4 });

    // A small pointer tilt on fine pointers only; it never affects layout.
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const tiltX = gsap.quickTo(parallax, "rotationX", { duration: .9, ease: "power3.out" });
    const tiltY = gsap.quickTo(parallax, "rotationY", { duration: .9, ease: "power3.out" });
    const tilt = (event: PointerEvent) => {
      if (reduce()) return;
      const box = root.getBoundingClientRect();
      tiltY(((event.clientX - box.left) / box.width - .5) * 6);
      tiltX(((event.clientY - box.top) / box.height - .5) * -4);
    };
    const untilt = () => { tiltX(0); tiltY(0); };

    showStage(0, true);
    setAutoplay(reduce() ? "paused" : "playing");
    root.addEventListener("animationend", advance);
    root.addEventListener("click", onTabClick);
    root.addEventListener("keydown", onKey);
    toggle.addEventListener("click", onToggle);
    text.addEventListener("pointerenter", onEnter);
    text.addEventListener("pointerleave", onLeave);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", onVisibility);
    observer.observe(root);
    if (fine) {
      root.addEventListener("pointermove", tilt, { passive: true });
      root.addEventListener("pointerleave", untilt);
    }

    return () => {
      transition?.kill();
      observer.disconnect();
      root.removeEventListener("animationend", advance);
      root.removeEventListener("click", onTabClick);
      root.removeEventListener("keydown", onKey);
      toggle.removeEventListener("click", onToggle);
      text.removeEventListener("pointerenter", onEnter);
      text.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", onVisibility);
      root.removeEventListener("pointermove", tilt);
      root.removeEventListener("pointerleave", untilt);
      ctx.revert();
      delete root.dataset.autoplay;
      root.removeAttribute("data-hold");
    };
  }, [lastStage]);

  return <div ref={ref} className={className}>{children}</div>;
}
