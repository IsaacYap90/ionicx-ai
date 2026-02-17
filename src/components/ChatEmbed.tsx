"use client";

import { useState } from "react";

interface ChatEmbedProps {
  /** URL of the chatbot to embed */
  chatUrl?: string;
  /** Brand color for the bubble */
  brandColor?: string;
}

export default function ChatEmbed({
  chatUrl = "https://ionicx-chatbot.vercel.app",
  brandColor = "#00d4ff",
}: ChatEmbedProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chat Bubble */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9998,
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "none",
          background: `linear-gradient(135deg, ${brandColor}, #0090ff)`,
          color: "#fff",
          fontSize: 28,
          cursor: "pointer",
          boxShadow: `0 4px 24px ${brandColor}66`,
          display: open ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "chatBubblePulse 2s ease-in-out infinite",
          transition: "transform 0.2s",
        }}
      >
        💬
      </button>

      {/* Chat Window */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 400,
          height: 600,
          maxWidth: "calc(100vw - 16px)",
          maxHeight: "calc(100vh - 32px)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
          border: `1px solid ${brandColor}25`,
          display: "flex",
          flexDirection: "column",
          background: "#0a0e1a",
          transform: open ? "scale(1)" : "scale(0)",
          opacity: open ? 1 : 0,
          transformOrigin: "bottom right",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "10px 16px",
            background: "#0d1530",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${brandColor}18`,
            flexShrink: 0,
          }}
        >
          <span style={{ color: brandColor, fontWeight: 700, fontSize: 15 }}>
            🤖 IonicX AI Assistant
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            style={{
              background: "none",
              border: "none",
              color: "#888",
              fontSize: 22,
              cursor: "pointer",
              padding: "0 4px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Iframe */}
        {open && (
          <iframe
            src={chatUrl}
            title="IonicX AI Chatbot"
            style={{
              flex: 1,
              width: "100%",
              border: "none",
              background: "#0a0e1a",
            }}
            allow="clipboard-write"
          />
        )}
      </div>

      <style jsx global>{`
        @keyframes chatBubblePulse {
          0%, 100% { box-shadow: 0 4px 24px ${brandColor}66; }
          50% { box-shadow: 0 4px 36px ${brandColor}99, 0 0 60px ${brandColor}33; }
        }
        @media (max-width: 640px) {
          div[style*="width: 400"] {
            width: 100vw !important;
            height: 100vh !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
            bottom: 0 !important;
            right: 0 !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
