"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import styles from "./assistant.module.css";

type Message = { role: "user" | "assistant"; content: string; error?: boolean };

const SUGGESTIONS = [
  "What does Bence work with?",
  "What has he built?",
  "Is he available, and in what form?",
  "How can I contact him?",
];
const MAX_CHARS = 600;
const HISTORY = 12;
const OPEN_EVENT = "assistant:open";

/** Lets any part of the page open the assistant (e.g. the contact section). */
export function OpenAssistantButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>{children}</button>;
}

/**
 * "Ask about Bence": a small chat grounded in the public profile. Answers
 * stream from /api/assistant; the API key never reaches the browser.
 */
export function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const controller = useRef<AbortController | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => launcher.current?.focus());
  }, []);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);
  useEffect(() => { if (open) field.current?.focus(); }, [open]);
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight }); }, [messages]);
  useEffect(() => () => controller.current?.abort(), []);

  const send = async (text: string) => {
    const question = text.trim().slice(0, MAX_CHARS);
    if (!question || busy) return;
    const history = [...messages.filter(message => !message.error), { role: "user" as const, content: question }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    controller.current = new AbortController();

    const update = (content: string, error = false) =>
      setMessages(current => [...current.slice(0, -1), { role: "assistant", content, error }]);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-HISTORY).map(({ role, content }) => ({ role, content })) }),
        signal: controller.current.signal,
      });
      if (!response.ok || !response.body) {
        const { error } = await response.json().catch(() => ({ error: "" }));
        update(error || "Something went wrong. Please try again, or email instead.", true);
        return;
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        update(answer);
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") update("The connection dropped. Please try again.", true);
    } finally {
      setBusy(false);
      controller.current = null;
    }
  };

  const onSubmit = (event: FormEvent) => { event.preventDefault(); void send(input); };
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void send(input); }
  };

  return (
    <>
      <button
        ref={launcher}
        type="button"
        className={styles.launcher}
        aria-expanded={open}
        aria-controls="assistant-panel"
        onClick={() => setOpen(true)}
        hidden={open}
      >
        <Sparkle />
        Ask about Bence
      </button>

      <div
        id="assistant-panel"
        role="dialog"
        aria-modal="false"
        aria-labelledby="assistant-title"
        className={styles.panel}
        data-open={open || undefined}
        hidden={!open}
        onKeyDown={event => { if (event.key === "Escape") close(); }}
      >
        <header className={styles.head}>
          <span className={styles.avatar} aria-hidden="true"><Sparkle /></span>
          <div>
            <h2 id="assistant-title">Ask about Bence</h2>
            <p>AI assistant, answering from his public profile</p>
          </div>
          <button type="button" className={styles.close} onClick={close} aria-label="Close the assistant">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" /></svg>
          </button>
        </header>

        <div ref={log} className={styles.log} aria-live="polite" aria-busy={busy}>
          {messages.length === 0 ? (
            <div className={styles.empty}>
              <p>Hi! Ask me about Bence’s experience, skills, way of working or availability. Here are a few ideas:</p>
              <ul>
                {SUGGESTIONS.map(suggestion => (
                  <li key={suggestion}><button type="button" onClick={() => void send(suggestion)}>{suggestion}</button></li>
                ))}
              </ul>
            </div>
          ) : messages.map((message, index) => (
            <p key={index} className={styles.message} data-role={message.role} data-error={message.error || undefined}>
              {message.content || <span className={styles.typing} aria-label="Thinking"><i /><i /><i /></span>}
            </p>
          ))}
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          <label htmlFor="assistant-input" className="srOnly">Your question</label>
          <textarea
            id="assistant-input"
            ref={field}
            rows={1}
            maxLength={MAX_CHARS}
            value={input}
            onChange={event => setInput(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask a question…"
          />
          <button type="submit" className={styles.send} disabled={busy || !input.trim()} aria-label="Send">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10.5 5.5 15 10l-4.5 4.5" /></svg>
          </button>
        </form>
        <p className={styles.note}>
          Answers are AI-generated and can be imperfect. Your messages are sent to Anthropic to generate a reply and are not stored on this site, so please don’t share personal data.
        </p>
      </div>
    </>
  );
}

function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={styles.sparkle}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
      <path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z" />
    </svg>
  );
}
