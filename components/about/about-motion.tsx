"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One orchestrated entrance, played once (never scrubbed, never reversed):
 * the photo opens and the story follows. The music/code performance below
 * runs itself (see performance.tsx). Without JS or with reduced motion
 * everything is simply visible.
 */
export function AboutMotion({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const all = (selector: string) => Array.from(root.querySelectorAll<SVGElement | HTMLElement>(selector));
      const photo = root.querySelector("[data-about-photo]");
      if (!photo) return;

      const clip = (top: number) => `inset(${top}% 0% 0% 0% round 1.75rem)`;
      gsap.timeline({ scrollTrigger: { trigger: photo, start: "top 80%", once: true } })
        .fromTo(photo, { clipPath: clip(100) }, { clipPath: clip(0), duration: 1.1, ease: "power3.inOut", clearProps: "clipPath" })
        .from(photo.querySelector("img"), { scale: 1.12, duration: 1.4, ease: "power3.out" }, 0)
        .from(all("[data-about-badge]"), { y: 18, opacity: 0, duration: .6, ease: "power3.out", stagger: .15 }, "-=.45")
        .from(all("[data-about-reveal]"), { y: 20, opacity: 0, duration: .6, ease: "power3.out", stagger: .08 }, .2)
        .from(all("[data-about-line]"), { scaleY: 0, transformOrigin: "50% 0%", duration: .9, ease: "power2.inOut" }, .5)
        .from(all("[data-about-chip]"), { y: 10, opacity: 0, scale: .94, duration: .45, ease: "back.out(1.6)", stagger: .06 }, "-=.3");
    });

    return () => media.revert();
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
