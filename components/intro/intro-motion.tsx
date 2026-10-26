"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import styles from "./intro.module.css";

export function IntroMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      // CSS and server HTML stay visible; only enhancement applies these starts.
      const text = element.querySelectorAll("[data-intro-reveal]");
      if (!text.length) return;
      gsap.from(text, {
        y: 18, opacity: 0.55, duration: 0.85, stagger: 0.1,
        ease: "power3.out", clearProps: "transform,opacity",
      });
    }, element);

    return () => media.revert();
  }, []);

  return <section ref={root} className={styles.hero} aria-labelledby="intro-title">{children}</section>;
}
