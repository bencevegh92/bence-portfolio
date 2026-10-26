"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function WorkSection({ children, className }: { children: ReactNode; className: string }) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      // Readable by default, with no pinning or control over native scroll.
      gsap.from(section, { y: 16, opacity: .7, duration: .65, ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 92%", toggleActions: "play none none reverse" },
      });
    }, section);
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const story = document.getElementById("story");
      if (!story) return;
      // Apply only to the outer section, leaving all stage/model transforms intact.
      gsap.to(story, { y: -16, opacity: .65, ease: "none",
        scrollTrigger: { trigger: story, start: "top top", end: "bottom top", scrub: .4 },
      });
    });
    return () => media.revert();
  }, []);
  return <section ref={root} id="work" className={className} aria-labelledby="work-title">{children}</section>;
}
