import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "../_lib/rateLimit";

const TG_TOKEN = process.env.TELEGRAM_IONICX_LEADS_BOT_TOKEN;
const TG_CHAT_ID = process.env.TELEGRAM_ISAAC_CHAT_ID || "1729085064";

export async function POST(req: NextRequest) {
  const rl = rateLimit(getClientIp(req));
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } });
  }
  try {
    const body = await req.json();
    const { name, email, phone, business, businessType, message, revenue, websiteStatus, timeline, budget, leadScore, source, recommendation, features } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    const scoreEmoji = leadScore === "hot" ? "🔥 HOT" : leadScore === "warm" ? "⭐ WARM" : leadScore === "cold" ? "❄️ COLD" : "📋";

    if (TG_TOKEN) {
      const lines = [
        `🔔 <b>NEW LEAD — IonicX AI</b> ${scoreEmoji}`,
        source === "quiz" ? "📝 <i>Via AI Needs Assessment Quiz</i>" : null,
        "",
        `👤 <b>Name:</b> ${esc(name)}`,
        `📧 <b>Email:</b> ${esc(email)}`,
        phone ? `📞 <b>Phone:</b> ${esc(phone)}` : null,
        business ? `🏢 <b>Business:</b> ${esc(business)}` : null,
        businessType ? `🏢 <b>Type:</b> ${esc(businessType)}` : null,
        revenue ? `💰 <b>Revenue:</b> ${esc(revenue)}` : null,
        websiteStatus ? `🌐 <b>Website:</b> ${esc(websiteStatus)}` : null,
        timeline ? `⏰ <b>Timeline:</b> ${esc(timeline)}` : null,
        budget ? `💵 <b>Budget:</b> ${esc(budget)}` : null,
        features ? `🔧 <b>Features:</b> ${esc(features)}` : null,
        recommendation ? `🤖 <b>AI Recommendation:</b> ${esc(recommendation)}` : null,
        message ? `💬 <b>Message:</b> ${esc(message)}` : null,
        "",
        `🕐 ${new Date().toLocaleString("en-SG", { timeZone: "Asia/Singapore" })}`,
        "",
        leadScore === "hot" ? "⚡ <b>HIGH PRIORITY — Follow up within 2 hours!</b>" : "📞 Follow up within 24hrs",
      ].filter(Boolean).join("\n");

      await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TG_CHAT_ID, text: lines, parse_mode: "HTML" }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
