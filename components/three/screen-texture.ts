import { CanvasTexture, SRGBColorSpace } from "three";

export function applicationTexture(stage: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 768; canvas.height = 480;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Screen canvas unavailable");
  const box = (x: number, y: number, w: number, h: number, color: string) => { ctx.fillStyle = color; ctx.fillRect(x, y, w, h); };
  const text = (value: string, x: number, y: number, size = 28, color = "#30425e") => { ctx.fillStyle = color; ctx.font = `500 ${size}px Arial`; ctx.fillText(value, x, y); };
  const titles = ["An idea takes shape.", "Start with the people.", "Give the idea structure.", "Make the complex clear.", "Bring it to life.", "Confidence in every detail.", "Ready for what’s next."];
  box(0, 0, 768, 480, "#f2f5fb");
  box(0, 0, 768, 48, "#e1e8f3");
  text("WORKSPACE / CONCEPT", 32, 31, 18, "#60738f");
  text(`0${stage}`, 688, 31, 18);
  text(titles[stage], 34, 111, 38);
  if (stage === 0) {
    box(34, 154, 700, 284, "#e3eaf6");
    text("A shared place", 72, 246, 46); text("for thoughtful work.", 72, 301, 46);
    text("One requirement. Many possibilities.", 72, 389, 26, "#647893");
  } else if (stage === 1) {
    ["Who? A team working together", "Need? A clear view of tasks", "Principle? Simple and accessible"].forEach((line, i) => {
      box(34, 154 + i * 96, 700, 78, "#ffffff"); text(line, 58, 202 + i * 96, 30);
    });
  } else if (stage === 2) {
    ["Workspace", "Task list", "Task detail"].forEach((line, i) => {
      box(80 + i * 80, 150 + i * 100, 430, 70, "#dce5f4"); text(line, 110 + i * 80, 194 + i * 100, 32);
      if (i < 2) box(288 + i * 80, 220 + i * 100, 3, 30, "#9eb2d0");
    });
  } else if (stage === 3) {
    ctx.strokeStyle = "#a6b5cd"; ctx.lineWidth = 3;
    ctx.strokeRect(34, 154, 230, 280);
    ctx.strokeRect(294, 154, 440, 126);
    ctx.strokeRect(294, 310, 440, 124);
    text("Aa", 67, 242, 58);
    ["#adc3e8", "#d1c8e5", "#b9d8cf"].forEach((color, i) => box(67 + i * 56, 290, 40, 40, color));
    text("Task overview", 320, 206, 30); text("Task details", 320, 360, 30);
    box(320, 232, 330, 12, "#ccd8eb"); box(320, 387, 240, 12, "#dcd5eb");
  } else if (stage === 4) {
    box(34, 154, 700, 280, "#ffffff");
    text("Create a task", 62, 206, 32); box(62, 234, 644, 64, "#edf2fa"); text("Design the workspace", 82, 275, 30);
    box(62, 330, 245, 65, "#496da9"); text("+ Add task", 87, 372, 30, "#ffffff");
    text("Saved to workspace", 345, 372, 26, "#527969");
  } else if (stage === 5) {
    ["Keyboard & accessibility", "Responsive behavior", "Performance & resilience"].forEach((line, i) => {
      box(34, 154 + i * 96, 700, 78, "#ffffff"); box(54, 176 + i * 96, 36, 36, "#c5ded4"); text("✓", 59, 203 + i * 96, 28, "#456e5d"); text(line, 112, 203 + i * 96, 30);
    });
  } else {
    text("Your workspace", 34, 160, 28);
    ["To do", "In progress", "Done"].forEach((line, i) => {
      const x = 34 + i * 240;
      box(x, 188, 220, 250, ["#e4eaf5", "#e9e3f3", "#e0ede7"][i]); text(line, x + 16, 225, 26);
      ["Design review", "Workspace UI", "Release notes"].slice(0, i === 2 ? 2 : 1).forEach((task, j) => {
        box(x + 14, 247 + j * 78, 192, 62, "#ffffff"); text(task, x + 24, 285 + j * 78, 23);
      });
    });
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}
