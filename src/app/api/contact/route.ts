import { NextRequest, NextResponse } from "next/server";

const TG_TOKEN = process.env.TELEGRAM_IONICX_LEADS_BOT_TOKEN;
const TG_CHAT_ID = process.env.TELEGRAM_ISAAC_CHAT_ID || "1729085064";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, business, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    // Send Telegram notification
    if (TG_TOKEN) {
      const text = [
        "🔔 <b>NEW LEAD — IonicX AI</b>",
        "",
        `👤 <b>Name:</b> ${esc(name)}`,
        `📧 <b>Email:</b> ${esc(email)}`,
        phone ? `📞 <b>Phone:</b> ${esc(phone)}` : null,
        business ? `🏢 <b>Business:</b> ${esc(business)}` : null,
        message ? `💬 <b>Message:</b> ${esc(message)}` : null,
        "",
        `🕐 ${new Date().toLocaleString("en-SG", { timeZone: "Asia/Singapore" })}`,
        "",
        "📞 Follow up within 24hrs",
      ]
        .filter(Boolean)
        .join("\n");

      await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TG_CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
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
