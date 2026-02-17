import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { rateLimit, getClientIp } from "../_lib/rateLimit";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_CRM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

export async function POST(req: NextRequest) {
  const rl = rateLimit(getClientIp(req));
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } });
  }
  try {
    const body = await req.json();
    const { name, email, phone, businessType, whatsapp } = body;

    if (!name || !email || !phone || !businessType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const entry = {
      name,
      email,
      phone,
      businessType,
      whatsapp: !!whatsapp,
      registeredAt: new Date().toISOString(),
    };

    // Save to JSON file
    const dataDir = path.join(process.cwd(), "data");
    const filePath = path.join(dataDir, "webinar-registrations.json");
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch {}

    let registrations = [];
    try {
      const existing = await fs.readFile(filePath, "utf-8");
      registrations = JSON.parse(existing);
    } catch {}

    registrations.push(entry);
    await fs.writeFile(filePath, JSON.stringify(registrations, null, 2));

    // Send Telegram notification
    const message = `🎯 *New Webinar Registration!*

👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *Phone:* ${phone}
🏢 *Business:* ${businessType}
💬 *WhatsApp:* ${whatsapp ? "Yes" : "No"}
🕐 *Time:* ${entry.registeredAt}

Total registrations: ${registrations.length}/50`;

    try {
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );
    } catch (tgErr) {
      console.error("Telegram notification failed:", tgErr);
    }

    return NextResponse.json({ success: true, message: "Registration successful!" });
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
