import { ImageResponse } from "next/og";
import { business, photos } from "@/content/site";

export const alt = "Sanaya Events Place — weddings and events venue in Tagaytay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#1a2018" }}>
        <img
          src={photos.heroArch.src.replace("w=1600", "w=1200")}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", inset: 0, objectFit: "cover", opacity: 0.55 }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 72, color: "#f7f3ec", width: "100%" }}>
          <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#d9bf8c" }}>Tagaytay City · Events Place</div>
          <div style={{ fontSize: 76, marginTop: 16, lineHeight: 1.05 }}>{business.name}</div>
          <div style={{ fontSize: 32, marginTop: 18, fontStyle: "italic", color: "#f3d3b8" }}>{business.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
