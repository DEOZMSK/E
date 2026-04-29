import { ImageResponse } from "next/og";

export const size = {
  width: 128,
  height: 128
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 30% 20%, #261635 0%, #120b1b 55%, #09060f 100%)",
          color: "#ff8a3d",
          fontSize: 52,
          fontFamily: "'Segoe UI', 'Arial', sans-serif",
          fontWeight: 800,
          letterSpacing: 2,
          border: "4px solid #ff4d9d",
          borderRadius: 24
        }}
      >
        EF/E
      </div>
    ),
    {
      ...size
    }
  );
}
