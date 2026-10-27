"use client";

import { useEffect, useState } from "react";
import styles from "./contact.module.css";

/** Copies the address and confirms it in place (announced politely). */
export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const timer = setTimeout(() => setState("idle"), 2200);
    return () => clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  return (
    <button type="button" className={styles.copy} onClick={copy} data-state={state}>
      <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        {state === "copied"
          ? <path d="M5 10.5l3.2 3.2L15 6.5" />
          : <><rect x="7" y="7" width="9" height="9" rx="2" /><path d="M13 4.5H6A1.5 1.5 0 0 0 4.5 6v7" /></>}
      </svg>
      <span aria-live="polite">
        {state === "copied" ? "Copied" : state === "failed" ? "Copy failed, select the address" : "Copy address"}
      </span>
    </button>
  );
}

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Budapest", hour: "2-digit", minute: "2-digit", timeZoneName: "short",
});

/** Current time in Hungary, so remote teams can see the overlap at a glance. */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const timer = setInterval(update, 30_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <p className={styles.time}>
      <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="10" cy="10" r="7" /><path d="M10 6.5V10l2.5 1.5" /></svg>
      {time ? <>It’s <time>{time}</time> in Hungary</> : "Hungary, Central European Time"}
    </p>
  );
}
