"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Career bar segments grow in once; the timeline rail is drawn with scroll and
 * the role crossing the reading line is highlighted. Everything is fully
 * visible without JS or with reduced motion.
 */
export function ExperienceMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const segments = Array.from(root.querySelectorAll<HTMLElement>("[data-segment]"));
      const fill = root.querySelector<HTMLElement>("[data-rail-fill]");
      const timeline = root.querySelector<HTMLElement>("[data-timeline]");
      const roles = Array.from(root.querySelectorAll<HTMLElement>("[data-role]"));
      root.dataset.motion = "true";

      // Time scale: the axis draws first, then each role grows from its start.
      const axis = root.querySelector<HTMLElement>("[data-axis]");
      if (axis && segments.length) {
        gsap.timeline({ scrollTrigger: { trigger: axis, start: "top 85%", once: true } })
          .from(axis, { scaleX: 0, duration: .8, ease: "power2.inOut" })
          .from(segments, { scaleX: 0, transformOrigin: "left center", duration: .8, ease: "power3.out", stagger: .14 }, "-=.35");
      }
      if (fill && timeline) {
        gsap.fromTo(fill, { scaleY: 0 }, {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: timeline, start: "top 65%", end: "bottom 65%", scrub: .4 },
        });
      }
      roles.forEach(role => {
        const reached = (on: boolean) => role.toggleAttribute("data-reached", on);
        ScrollTrigger.create({
          trigger: role, start: "top 65%", end: "bottom 65%",
          onToggle: self => role.toggleAttribute("data-active", self.isActive),
          onEnter: () => reached(true),
          onLeaveBack: () => reached(false),
          onRefresh: self => reached(self.progress > 0),
        });
        gsap.from(role.querySelector("[data-card]"), {
          y: 28, opacity: 0, duration: .7, ease: "power3.out",
          scrollTrigger: { trigger: role, start: "top 88%", once: true },
        });
      });

      return () => {
        delete root.dataset.motion;
        roles.forEach(role => { role.removeAttribute("data-active"); role.removeAttribute("data-reached"); });
      };
    });
    return () => media.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
