"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sets `data-inview` on its element while it is on screen, so CSS can start
 * (and pause) decorative loops only when they can be seen. Without JS the
 * attribute is never set and the static frame of each illustration shows.
 */
export function InView({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => element.toggleAttribute("data-inview", entry.isIntersecting),
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
