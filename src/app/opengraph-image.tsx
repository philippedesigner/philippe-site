import { ImageResponse } from "next/og";
import { bio } from "@/content";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#fbfaf8",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: "#f3a038",
            color: "#000000",
            fontWeight: 700,
            fontSize: 34,
            letterSpacing: 1,
            textTransform: "uppercase",
            padding: "10px 18px",
            borderRadius: 8,
            marginBottom: 36,
          }}
        >
          {bio.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 42,
            lineHeight: 1.35,
            color: "#111111",
            maxWidth: 960,
          }}
        >
          {bio.intro}
        </div>
      </div>
    ),
    { ...size }
  );
}
