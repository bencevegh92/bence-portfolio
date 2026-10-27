"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { BEAT, code, melody, TOTAL_BEATS } from "./melody";
import styles from "./performance.module.css";

// ---- Staff geometry (SVG user units; the viewBox crops to the drawn area) ----
const LINES = [60, 80, 100, 120, 140];
const stepY = (step: number) => 60 + step * 10;
const PX_PER_BEAT = 70;
const FIRST_X = 130;
const noteX = (start: number) => FIRST_X + start * PX_PER_BEAT;
const stemUp = (step: number) => step > 4; // below the middle line
const stemX = (x: number, up: boolean) => x + (up ? 8.6 : -8.6);
const stemEnd = (step: number) => stepY(step) + (stemUp(step) ? -34 : 34);
const beams: [number, number][] = [[2, 3], [6, 7]];
const PLAYHEAD_TRAVEL = noteX(melody[melody.length - 1].start) - FIRST_X;

const INK = "#12151b";
const ACCENT = "#3152dc";

type Instrument = "trumpet" | "piano";

// ---- A tiny Web Audio synth: no samples, no dependencies ----
function createSynth() {
  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = .2;
  master.connect(context.destination);
  let voices: AudioScheduledSourceNode[] = [];

  const play = (freq: number, at: number, length: number, instrument: Instrument) => {
    const gain = context.createGain();
    gain.connect(master);
    if (instrument === "trumpet") {
      // Bright sawtooth through an opening low-pass filter, with a late vibrato.
      const osc = context.createOscillator();
      const filter = context.createBiquadFilter();
      const vibrato = context.createOscillator();
      const depth = context.createGain();
      osc.type = "sawtooth";
      osc.frequency.value = freq;
      filter.type = "lowpass";
      filter.Q.value = 1.4;
      filter.frequency.setValueAtTime(700, at);
      filter.frequency.linearRampToValueAtTime(2800, at + .06);
      filter.frequency.linearRampToValueAtTime(1900, at + .25);
      vibrato.frequency.value = 5.6;
      depth.gain.setValueAtTime(0, at);
      depth.gain.linearRampToValueAtTime(freq * .006, at + Math.min(.35, length));
      vibrato.connect(depth).connect(osc.frequency);
      gain.gain.setValueAtTime(0, at);
      gain.gain.linearRampToValueAtTime(1, at + .035);
      gain.gain.linearRampToValueAtTime(.72, at + .16);
      gain.gain.setValueAtTime(.72, at + Math.max(.17, length - .06));
      gain.gain.linearRampToValueAtTime(0, at + length + .1);
      osc.connect(filter).connect(gain);
      [osc, vibrato].forEach(node => { node.start(at); node.stop(at + length + .15); });
      voices.push(osc, vibrato);
    } else {
      // Struck and decaying: a soft triangle with a quiet octave on top.
      const tones = [{ type: "triangle" as const, ratio: 1, level: 1 }, { type: "sine" as const, ratio: 2, level: .25 }];
      gain.gain.setValueAtTime(0, at);
      gain.gain.linearRampToValueAtTime(1, at + .006);
      gain.gain.exponentialRampToValueAtTime(.001, at + length + .9);
      tones.forEach(tone => {
        const osc = context.createOscillator();
        const level = context.createGain();
        osc.type = tone.type;
        osc.frequency.value = freq * tone.ratio;
        level.gain.value = tone.level;
        osc.connect(level).connect(gain);
        osc.start(at);
        osc.stop(at + length + 1);
        voices.push(osc);
      });
    }
  };

  const stop = () => {
    voices.forEach(voice => { try { voice.stop(); } catch { /* already stopped */ } });
    voices = [];
  };

  return { context, play, stop };
}

/**
 * "From score to source": a playhead performs the melody; every note flashes,
 * sends a spark into the editor and types one piece of code. Plays once,
 * silently, when it comes into view. Sound only on an explicit button press.
 */
export function Performance() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const q = <T extends Element>(selector: string) => Array.from(root.querySelectorAll<T>(selector));
    const notes = q<SVGGElement>("[data-note]");
    const ripples = q<SVGCircleElement>("[data-ripple]");
    const tokens = q<HTMLElement>("[data-token]");
    const playhead = root.querySelector<SVGGElement>("[data-playhead]");
    const overlay = root.querySelector<SVGSVGElement>("[data-overlay]");
    const buttons = q<HTMLButtonElement>("[data-instrument]");
    if (!playhead || !overlay || notes.length !== tokens.length) return;

    const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timeline: gsap.core.Timeline | undefined;
    let synth: ReturnType<typeof createSynth> | undefined;
    const sparks = new Set<gsap.core.Tween>();

    const setCaret = (index: number) => tokens.forEach((token, i) => token.toggleAttribute("data-caret", i === index));
    const setPlaying = (instrument?: Instrument) => {
      root.toggleAttribute("data-playing", !!instrument);
      buttons.forEach(button => button.toggleAttribute("data-active", button.dataset.instrument === instrument));
    };

    // A spark flies on an arc from the note head to the token it types.
    const spark = (index: number) => {
      const box = overlay.getBoundingClientRect();
      const head = notes[index].querySelector("ellipse")!.getBoundingClientRect();
      const token = tokens[index].getBoundingClientRect();
      const from = { x: head.left + head.width / 2 - box.left, y: head.top + head.height / 2 - box.top };
      const to = { x: token.left - box.left + 4, y: token.top + token.height / 2 - box.top };
      const control = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 70 };
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("r", "4.5");
      dot.setAttribute("class", styles.spark);
      overlay.appendChild(dot);
      const path = { t: 0 };
      const tween = gsap.to(path, {
        t: 1, duration: .5, ease: "power1.inOut",
        onUpdate: () => {
          const t = path.t, u = 1 - t;
          dot.setAttribute("cx", String(u * u * from.x + 2 * u * t * control.x + t * t * to.x));
          dot.setAttribute("cy", String(u * u * from.y + 2 * u * t * control.y + t * t * to.y));
          dot.style.opacity = String(t < .85 ? 1 : (1 - t) / .15);
        },
        onComplete: () => { dot.remove(); sparks.delete(tween); },
      });
      sparks.add(tween);
    };

    const perform = (instrument?: Instrument) => {
      timeline?.kill();
      sparks.forEach(tween => tween.progress(1));
      synth?.stop();

      if (instrument) {
        synth ??= createSynth();
        void synth.context.resume();
        const start = synth.context.currentTime + .08;
        melody.forEach(note => synth!.play(note.freq, start + note.start * BEAT, note.beats * BEAT * .92, instrument));
      }
      setPlaying(instrument);

      // Reduced motion: sound only; the score and code stay as they are.
      if (reduce()) {
        if (instrument) gsap.delayedCall(TOTAL_BEATS * BEAT + .6, () => setPlaying());
        return;
      }

      gsap.set(tokens, { opacity: 0, y: 6 });
      setCaret(-1);
      timeline = gsap.timeline({ delay: instrument ? .08 : 0, onComplete: () => setPlaying() })
        .set(playhead, { opacity: 1, x: 0 })
        .to(playhead, { x: PLAYHEAD_TRAVEL, duration: melody[melody.length - 1].start * BEAT, ease: "none" }, 0)
        .to(playhead, { opacity: 0, duration: .5 }, melody[melody.length - 1].start * BEAT + .3);

      melody.forEach((note, index) => {
        const at = note.start * BEAT;
        timeline!
          .to(notes[index], { color: ACCENT, scale: 1.28, transformOrigin: "50% 50%", duration: .12, ease: "power2.out" }, at)
          .to(notes[index], { color: INK, scale: 1, duration: .55, ease: "power2.inOut" }, at + .14)
          .fromTo(ripples[index], { attr: { r: 9 }, opacity: .55 }, { attr: { r: 28 }, opacity: 0, duration: .75, ease: "power2.out", immediateRender: false }, at)
          .call(() => spark(index), [], at)
          .to(tokens[index], { opacity: 1, y: 0, duration: .3, ease: "power2.out" }, at + .48)
          .call(() => setCaret(index), [], at + .48);
      });
    };

    const onClick = (event: MouseEvent) => {
      const button = (event.target as Element).closest<HTMLButtonElement>("[data-instrument]");
      if (button) perform(button.dataset.instrument as Instrument);
    };
    root.addEventListener("click", onClick);

    // The silent first performance, once, when the card is well in view.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (!reduce() && !root.hasAttribute("data-playing")) perform();
    }, { threshold: .55 });
    if (!reduce()) gsap.set(tokens, { opacity: 0, y: 6 });
    observer.observe(root);

    return () => {
      observer.disconnect();
      root.removeEventListener("click", onClick);
      timeline?.kill();
      sparks.forEach(tween => tween.kill());
      overlay.replaceChildren();
      synth?.stop();
      void synth?.context.close();
      gsap.set([...tokens, ...notes], { clearProps: "all" });
    };
  }, []);

  let tokenIndex = 0;
  return (
    <div ref={ref} className={styles.card}>
      <div className={styles.head}>
        <div>
          <h3>From score to source</h3>
          <p>Nine notes, nine pieces of code. Press play to hear it; sound only plays when you ask.</p>
        </div>
        <div className={styles.buttons}>
          {(["trumpet", "piano"] as const).map(instrument => (
            <button key={instrument} type="button" className={styles.play} data-instrument={instrument}>
              <span className={styles.icon} aria-hidden="true">
                <svg viewBox="0 0 20 20" className={styles.playIcon}><path d="M6 4.5v11l9-5.5z" /></svg>
                <span className={styles.eq}><i /><i /><i /></span>
              </span>
              Play on {instrument}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        <svg className={styles.staff} viewBox="0 34 640 132" aria-hidden="true" focusable="false">
          {LINES.map(y => <path key={y} d={`M24 ${y}H632`} className={styles.line} />)}
          <text x="70" y="95" className={styles.time}>4</text>
          <text x="70" y="135" className={styles.time}>4</text>

          <g data-playhead opacity="0">
            <rect x={FIRST_X - 5} y="44" width="10" height="112" rx="5" className={styles.glow} />
            <path d={`M${FIRST_X} 44V156`} className={styles.playhead} />
          </g>

          {melody.map((note, index) => {
            const x = noteX(note.start);
            const y = stepY(note.step);
            const up = stemUp(note.step);
            const half = note.beats >= 2;
            return (
              <g key={index}>
                <circle data-ripple cx={x} cy={y} r="9" className={styles.ripple} opacity="0" />
                <g data-note className={styles.note}>
                  <ellipse cx={x} cy={y} rx="9.5" ry="6.8" transform={`rotate(-22 ${x} ${y})`} className={half ? styles.hollow : styles.head} />
                  <path d={`M${stemX(x, up)} ${y}V${stemEnd(note.step)}`} className={styles.stem} />
                </g>
              </g>
            );
          })}
          {beams.map(([a, b]) => {
            const [first, second] = [melody[a], melody[b]];
            return (
              <path
                key={a}
                d={`M${stemX(noteX(first.start), stemUp(first.step)) - 1} ${stemEnd(first.step)}L${stemX(noteX(second.start), stemUp(second.step)) + 1} ${stemEnd(second.step)}`}
                className={styles.beam}
              />
            );
          })}
          <path d="M606 60V140" className={styles.bar} />
          <rect x="612" y="60" width="6" height="80" className={styles.barThick} />
        </svg>

        <div className={styles.editor} aria-hidden="true">
          <div className={styles.editorBar}><i /><i /><i /><span>melody.ts</span></div>
          <pre><code>
            {code.map((line, lineIndex) => (
              <span key={lineIndex} className={styles.codeLine}>
                {line.map((segment, segmentIndex) => typeof segment === "string"
                  ? segment
                  : <span key={segmentIndex} className={styles[segment.kind]} data-token data-index={tokenIndex++}>{segment.text}</span>)}
              </span>
            ))}
          </code></pre>
        </div>

        <svg className={styles.overlay} data-overlay aria-hidden="true" focusable="false" />
      </div>
    </div>
  );
}
