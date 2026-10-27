// The <bv> code monogram: four round-capped strokes. The viewBox is cropped to
// the drawn mark, stroke width and round caps included.
export const LOGO_VIEWBOX = "2 5 96 51";
export const LOGO_STROKE = 7.5;
export const LOGO_PATHS = [
  "M18 19 6 32l12 13", // <
  "m82 19 12 13-12 13", // >
  "M31 9v30a13 13 0 1 0 13-13c-6.5 0-13 5.8-13 13", // b
  "m53 27 13 19 13-19", // v
];

/** The strokes as SVG children, for any renderer (DOM, OG image, icons). */
export function logoStrokes(color: string) {
  return (
    <g fill="none" stroke={color} strokeWidth={LOGO_STROKE} strokeLinecap="round" strokeLinejoin="round">
      {LOGO_PATHS.map(d => <path key={d} d={d} />)}
    </g>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox={LOGO_VIEWBOX} aria-hidden="true" focusable="false">
      {logoStrokes("currentColor")}
    </svg>
  );
}
