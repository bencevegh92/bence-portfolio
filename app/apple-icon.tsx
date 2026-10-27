import { ImageResponse } from "next/og";
import { LOGO_VIEWBOX, logoStrokes } from "@/components/ui/logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon: iOS rounds the corners itself, so the tile is square.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#12151b" }}>
        <svg width="132" height="70" viewBox={LOGO_VIEWBOX}>{logoStrokes("white")}</svg>
      </div>
    ),
    size,
  );
}
