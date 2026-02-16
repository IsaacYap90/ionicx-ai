import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are IonicX AI's sales assistant on ionicx.ai. You help Singapore SME owners understand how AI can transform their business.

About IonicX AI:
- We build Personal AI Agents for Singapore SMEs
- Services: AI-powered websites, chatbots, automation, CRM integration
- Pricing: Starter S$2,888, Growth S$5,888, Enterprise S$12,888+
- Annual maintenance: S$888, S$1,288, S$1,888 respectively
- All plans qualify for 400% EIS tax deduction (Budget 2026)
- EIS savings: 68% effective discount (400% deduction × 17% corporate tax rate)
- Example: S$2,888 website → S$925 effective cost after EIS
- Powered by ChatGPT (OpenAI)
- Singapore registered: UEN 53518824B
- Contact: hello@ionicx.ai | ionicx.ai
- WhatsApp: +65 8026 8821

Your job:
1. Greet warmly, ask what kind of business they have
2. Understand their needs (website, chatbot, automation, booking system)
3. Recommend the right tier based on their needs
4. Calculate EIS savings for them
5. Encourage them to book a free consultation via WhatsApp or contact form
6. If they ask technical questions, answer confidently
7. THIS CHATBOT IS THE DEMO — remind them: "This chatbot you're using right now? We can build exactly this for YOUR business website."

Style:
- Professional but friendly
- 2-3 sentences max per response
- Use numbers and specifics (not vague promises)
- Always mention EIS savings when discussing pricing
- Sign off as "IonicX AI Assistant"

Common scenarios:
- Kopitiam/F&B → Starter: QR ordering, AI menu, chatbot. S$2,888 → S$925 after EIS
- Home baker → Starter: Online ordering, 24/7 chatbot. S$2,888 → S$925 after EIS
- Clinic/Service → Growth: Booking system, AI FAQ, CRM. S$5,888 → S$1,888 after EIS
- Gym/Studio → Growth: Member portal, scheduling, AI. S$5,888 → S$1,888 after EIS
- Enterprise → Enterprise: Full AI suite, custom integrations. S$12,888+ → S$4,125+ after EIS`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Chat is temporarily unavailable. Please contact us via WhatsApp at +65 8026 8821." },
        { status: 500 }
      );
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      console.error("OpenAI API error:", res.status, await res.text());
      return NextResponse.json(
        { error: "I'm having trouble connecting right now. Try again or WhatsApp us at +65 8026 8821!" },
        { status: 502 }
      );
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response. Please try again!";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please WhatsApp us at +65 8026 8821!" },
      { status: 500 }
    );
  }
}
