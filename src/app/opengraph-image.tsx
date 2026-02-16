import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "IonicX AI — Personal AI Agents for SMEs";
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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0e1a 0%, #0d1530 50%, #0a0e1a 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "3px solid #00d4ff",
            borderRadius: "20px",
            padding: "50px 80px",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontSize: 80, fontWeight: 900, color: "#00d4ff" }}>
              IonicX
            </span>
            <span
              style={{
                fontSize: 80,
                fontWeight: 900,
                color: "#00ff88",
                marginLeft: 15,
              }}
            >
              AI
            </span>
          </div>
          <p style={{ fontSize: 32, color: "#e0e0e0", margin: "20px 0 10px 0" }}>
            Personal AI Agents for SMEs
          </p>
          <p style={{ fontSize: 26, color: "#00ff88", margin: "10px 0" }}>
            🤖 Websites • Chatbots • Automation
          </p>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              padding: "12px 30px",
              border: "2px solid #00ff88",
              borderRadius: 30,
            }}
          >
            <span style={{ color: "#00ff88", fontSize: 22, fontWeight: 700 }}>
              ✅ 400% EIS Tax Deduction Eligible
            </span>
          </div>
          <p style={{ color: "#666666", fontSize: 18, marginTop: 25 }}>
            ionicx.ai
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
