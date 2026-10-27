"use client";

import { useEffect } from "react";

/**
 * One behaviour for every same-page anchor (plain <a href="#…"> and Next <Link
 * href="/#…">): glide to the target, honour reduced motion, and hand focus to
 * it. It also fixes repeat clicks: when the URL already ends in that hash,
 * Next's router treats the link as a no-op and nothing scrolls.
 *
 * Runs in the capture phase on document, before React's delegated handlers,
 * so Next <Link> sees `defaultPrevented` and leaves the click to us.
 */
export function SmoothAnchors() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      // Native pushState is integrated with the Next.js App Router.
      if (location.hash !== url.hash) history.pushState(history.state, "", url.hash);
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
