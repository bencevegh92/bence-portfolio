import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { LOGO_VIEWBOX, logoStrokes } from "@/components/ui/logo";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview for LinkedIn, Slack and messaging apps.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#f3f4f7", color: "#12151b", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="90" height="48" viewBox={LOGO_VIEWBOX}>{logoStrokes("#12151b")}</svg>
          <div style={{ fontSize: 32, fontWeight: 600 }}>{profile.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>I turn ideas into real products.</div>
          <div style={{ display: "flex", fontSize: 34, color: "#565d6a" }}>{`${profile.role} with 6+ years in Angular, React and TypeScript`}</div>
        </div>
        <div style={{ display: "flex", height: 8, width: 240, borderRadius: 8, background: "linear-gradient(90deg, #3152dc, #7c72dc)" }} />
      </div>
    ),
    size,
  );
}
