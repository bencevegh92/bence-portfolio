// An original nine-note melody (C major, 4/4) and the nine pieces of code it
// "becomes". Note i reveals code token i, so the two lists must stay in step.

export const BEAT = .55; // seconds per beat

// step: staff position, 0 = top line (F5) … 8 = bottom line (E4).
export const melody = [
  { pitch: "E4", freq: 329.63, step: 8, beats: 1 },
  { pitch: "G4", freq: 392.0, step: 6, beats: 1 },
  { pitch: "C5", freq: 523.25, step: 3, beats: .5 },
  { pitch: "B4", freq: 493.88, step: 4, beats: .5 },
  { pitch: "A4", freq: 440.0, step: 5, beats: 1 },
  { pitch: "C5", freq: 523.25, step: 3, beats: 1 },
  { pitch: "E5", freq: 659.25, step: 1, beats: .5 },
  { pitch: "D5", freq: 587.33, step: 2, beats: .5 },
  { pitch: "C5", freq: 523.25, step: 3, beats: 2 },
].map((note, index, all) => ({
  ...note,
  start: all.slice(0, index).reduce((sum, previous) => sum + previous.beats, 0),
}));

export const TOTAL_BEATS = melody.reduce((sum, note) => sum + note.beats, 0);

export type TokenKind = "kw" | "name" | "op" | "fn" | "comment";
type Segment = string | { text: string; kind: TokenKind };

// Each object is one token, revealed by the note with the same order.
export const code: Segment[][] = [
  [{ text: "export", kind: "kw" }, " ", { text: "const", kind: "kw" }, " ", { text: "melody", kind: "name" }, " ", { text: "=", kind: "op" }, " ", { text: "notes", kind: "name" }],
  ["  ", { text: ".map(practice)", kind: "fn" }],
  ["  ", { text: ".filter(inTune)", kind: "fn" }],
  ["  ", { text: ".reduce(perform);", kind: "fn" }],
  [{ text: "// trumpet + piano → TypeScript", kind: "comment" }],
];
