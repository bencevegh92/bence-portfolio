"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import styles from "./intro.module.css";
import { useStory } from "@/components/story/development-story";

const Scene = dynamic(() => import("@/components/three/laptop-scene"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function LaptopVisual({ children }: { children: ReactNode }) {
  const story = useStory();
  const root = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => { setFailed(true); setReady(false); story?.disable?.(); }, [story]);

  // Publish the same readiness used to reveal WebGL before browser paint, without
  // rerendering or changing the stage controller's animation state.
  useLayoutEffect(() => {
    const composition = root.current?.closest<HTMLElement>("[data-laptop-composition]");
    if (!composition) return;
    composition.dataset.sceneState = failed ? "fallback" : ready && enabled ? "ready" : "loading";
    return () => { composition.dataset.sceneState = "loading"; };
  }, [ready, enabled, failed]);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    const desktop = matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    let visible = false;
    const update = () => {
      const nextEnabled = motion.matches && visible && !document.hidden;
      setEnabled(nextEnabled);
      setInteractive(desktop.matches && (!navigator.hardwareConcurrency || navigator.hardwareConcurrency >= 4));
      if (!nextEnabled) setReady(false);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element);
    motion.addEventListener("change", update);
    desktop.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); motion.removeEventListener("change", update); desktop.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, []);

  return <div ref={root} className={styles.laptopVisual}>
    <div className={styles.loadingPlaceholder} style={{ visibility: !ready && !failed ? "visible" : "hidden" }}><span>Fictional workspace</span><span>From idea to interface</span></div>
    <div className={styles.staticLaptop} style={{ visibility: failed ? "visible" : "hidden" }}>{children}</div>
    <noscript><style>{`.${styles.staticLaptop}{visibility:visible!important}.${styles.loadingPlaceholder}{display:none}[data-laptop-composition] [data-stage-illustrations]{visibility:visible}`}</style></noscript>
    {enabled && !failed && <div className={styles.webgl} style={{ visibility: ready ? "visible" : "hidden" }}><SceneBoundary onFailure={onFailure}><Scene story={story} interactive={interactive} onReady={onReady} onFailure={onFailure} /></SceneBoundary></div>}
  </div>;
}
