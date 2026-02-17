"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING_EN = "Hey! 👋 I'm Robin, IonicX AI's agent. I can help you with:\n\n• Pricing info for all tiers\n• Demo links to our 10 portfolio sites\n• EIS tax deduction calculator\n• Finding the right plan for your business\n\nWhat kind of business do you run?";
const GREETING_ZH = "你好！👋 我是 Robin，IonicX AI 的智能助手。我可以帮助您：\n\n• 所有方案的价格信息\n• 10个作品案例的演示链接\n• EIS 税务扣除计算\n• 为您的业务找到合适的方案\n\n您经营什么类型的生意？";

const HISTORY_KEY = "ionicx-chat-history";

function loadHistory(lang: string): Message[] {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [{ role: "assistant", content: lang === "zh" ? GREETING_ZH : GREETING_EN }];
}

export default function ChatWidget() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => loadHistory(lang));
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(messages.slice(-20)));
    }
  }, [messages]);

  const clearHistory = () => {
    const greeting = lang === "zh" ? GREETING_ZH : GREETING_EN;
    setMessages([{ role: "assistant", content: greeting }]);
    localStorage.removeItem(HISTORY_KEY);
  };

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply ?? data.error ?? "Sorry, something went wrong." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: lang === "zh"
          ? "连接错误，请重试或通过 WhatsApp 联系我们：+65 8026 8821"
          : "Connection error. Please try again or WhatsApp us at +65 8026 8821!" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 9999,
            background: "linear-gradient(135deg, #00d4ff, #0090ff)",
            color: "#fff", border: "none", borderRadius: 50,
            padding: "14px 24px", fontSize: 16, fontWeight: 600, cursor: "pointer",
            boxShadow: "0 4px 24px rgba(0,212,255,0.4)",
            display: "flex", alignItems: "center", gap: 8,
          }}
        >
          💬 {lang === "zh" ? "AI 对话" : "Chat with AI"}
        </button>
      )}

      {open && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9999,
          width: 380, maxWidth: "calc(100vw - 16px)",
          height: 520, maxHeight: "calc(100vh - 32px)",
          background: "#0a0e1a", borderRadius: 16,
          display: "flex", flexDirection: "column",
          boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
          border: "1px solid rgba(0,212,255,0.15)",
          animation: "chatSlideUp 0.3s ease-out", overflow: "hidden",
        }}>
          <div style={{
            padding: "14px 16px", background: "#0d1530",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            borderBottom: "1px solid rgba(0,212,255,0.1)",
          }}>
            <span style={{ color: "#00d4ff", fontWeight: 700, fontSize: 15 }}>
              🤖 Robin — AI Agent
            </span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={clearHistory} title="Clear chat"
                style={{ background: "none", border: "none", color: "#555", fontSize: 14, cursor: "pointer" }}>
                🗑️
              </button>
              <button onClick={() => setOpen(false)}
                style={{ background: "none", border: "none", color: "#888", fontSize: 20, cursor: "pointer", padding: "0 4px" }}>
                ✕
              </button>
            </div>
          </div>

          <div style={{
            flex: 1, overflowY: "auto", padding: 12,
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                background: m.role === "user" ? "linear-gradient(135deg, #00d4ff, #0090ff)" : "rgba(13,21,48,0.9)",
                color: "#fff", padding: "10px 14px", borderRadius: 14, maxWidth: "85%",
                fontSize: 14, lineHeight: 1.5,
                border: m.role === "assistant" ? "1px solid rgba(0,212,255,0.1)" : "none",
                whiteSpace: "pre-wrap",
              }}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div style={{
                alignSelf: "flex-start", background: "rgba(13,21,48,0.9)",
                border: "1px solid rgba(0,212,255,0.1)", padding: "10px 18px",
                borderRadius: 14, display: "flex", gap: 5,
              }}>
                {[0, 1, 2].map((d) => (
                  <span key={d} style={{
                    width: 8, height: 8, borderRadius: "50%", background: "#00d4ff",
                    display: "inline-block",
                    animation: `dotPulse 1.2s ease-in-out ${d * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div style={{
            padding: "10px 12px", borderTop: "1px solid rgba(0,212,255,0.1)",
            display: "flex", gap: 8, background: "#0d1530",
          }}>
            <input value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={lang === "zh" ? "输入消息..." : "Type your message..."}
              style={{
                flex: 1, background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(0,212,255,0.15)", borderRadius: 10,
                padding: "10px 14px", color: "#fff", fontSize: 14, outline: "none",
              }}
            />
            <button onClick={send} disabled={loading}
              style={{
                background: "linear-gradient(135deg, #00d4ff, #0090ff)",
                border: "none", borderRadius: 10, padding: "10px 16px",
                color: "#fff", fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1, fontSize: 14,
              }}>
              {lang === "zh" ? "发送" : "Send"}
            </button>
          </div>

          <div style={{ textAlign: "center", padding: "6px 0", fontSize: 11, color: "#555", background: "#0a0e1a" }}>
            🤖 Powered by ChatGPT
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes chatSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dotPulse { 0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1); } }
        @media (max-width: 480px) { div[style*="width: 380px"] { width: 100vw !important; height: 100vh !important; max-width: 100vw !important; max-height: 100vh !important; bottom: 0 !important; right: 0 !important; border-radius: 0 !important; } }
      `}</style>
    </>
  );
}
