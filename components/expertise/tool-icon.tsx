import type { CSSProperties, ReactNode } from "react";
import {
  siAngular, siAntdesign, siClaude, siCursor, siDocker, siFigma, siGit, siHtml5, siJavascript, siJest, siMaterialdesign,
  siNodedotjs, siNx, siOpenai, siReact, siReactivex, siSass, siStorybook, siTailwindcss, siTypescript,
} from "simple-icons";

// Brand marks from Simple Icons (CC0), used only to label the tools by name.
const brands: Record<string, { path: string; hex: string }> = {
  "Angular": { ...siAngular, hex: "DD0031" }, // classic red reads better than the new black mark
  "Angular Signals": { ...siAngular, hex: "DD0031" },
  "React": { ...siReact, hex: "149ECA" },
  "TypeScript": siTypescript,
  "JavaScript (ES6+)": { ...siJavascript, hex: "D4B400" },
  "RxJS": siReactivex,
  "HTML": siHtml5,
  "CSS / SCSS": siSass,
  "Storybook": siStorybook,
  "Nx monorepos": siNx,
  "Angular Material": siMaterialdesign,
  "NG-ZORRO": siAntdesign,
  "Tailwind CSS": siTailwindcss,
  "Jest": siJest,
  "Git": siGit,
  "Docker": siDocker,
  "Figma": siFigma,
  "Now learning Node.js": siNodedotjs,
  "Claude Code": siClaude,
  "Cursor": { ...siCursor, hex: "12151B" },
  "Codex": { ...siOpenai, hex: "12151B" },
};

// Line glyphs for practices that have no logo.
const glyphs: Record<string, { hex: string; draw: ReactNode }> = {
  "Design systems": { hex: "3152DC", draw: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></> },
  "Component libraries": { hex: "7C72DC", draw: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="3.5" /></> },
  "Responsive design": { hex: "3F8A6F", draw: <><rect x="2.5" y="4" width="14" height="10" rx="1.5" /><path d="M6 18h6" /><rect x="17.5" y="8" width="4.5" height="11" rx="1.2" /></> },
  "Accessibility (WCAG 2.1 AA)": { hex: "3152DC", draw: <><circle cx="12" cy="4.5" r="1.8" /><path d="M5 8.5l7 1.5 7-1.5M12 10v4.5M12 14.5l-3.5 6M12 14.5l3.5 6" /></> },
  "REST APIs": { hex: "A5794F", draw: <><path d="M8 4c-2.5 0-2.5 1.5-2.5 3.5S5 11 3 12c2 1 2.5 2.5 2.5 4.5S5.5 20 8 20" /><path d="M16 4c2.5 0 2.5 1.5 2.5 3.5S19 11 21 12c-2 1-2.5 2.5-2.5 4.5S18.5 20 16 20" /></> },
  "Agentic workflows": { hex: "7C72DC", draw: <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z" /></> },
  "Code review": { hex: "3F8A6F", draw: <><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="12" r="2" /><path d="M6 7v10M8 5h4a4 4 0 0 1 4 4v1" /></> },
  "Mentoring": { hex: "A5794F", draw: <><circle cx="8" cy="7" r="3" /><circle cx="17" cy="9" r="2.3" /><path d="M2.5 20c0-3.5 2.5-6 5.5-6s5.5 2.5 5.5 6M14 20c0-2.5 1.3-4.5 3-4.5s3.5 2 3.5 4.5" /></> },
};

/** The tool's colour, for tinting the chip or card that holds the icon. */
export const toolColor = (name: string) => `#${brands[name]?.hex ?? glyphs[name]?.hex ?? "565D6A"}`;

export function ToolIcon({ name, className }: { name: string; className?: string }) {
  const brand = brands[name];
  const glyph = glyphs[name];
  if (!brand && !glyph) return null;
  return (
    <span className={className} data-kind={brand ? "brand" : "glyph"} style={{ "--brand": toolColor(name) } as CSSProperties} aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">{brand ? <path d={brand.path} /> : glyph.draw}</svg>
    </span>
  );
}
