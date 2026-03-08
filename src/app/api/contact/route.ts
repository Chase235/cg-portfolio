import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { replyTo, message } = await req.json();

    if (!replyTo || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      // Graceful fallback when Resend isn't configured yet
      console.log("[contact-form]", { replyTo, message });
      return NextResponse.json({ ok: true });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "chase@clerestory.group",
        subject: `Portfolio Contact: ${replyTo}`,
        text: `From: ${replyTo}\n\n${message}`,
      }),
    });

    if (!res.ok) {
      console.error("[contact-form] Resend error:", await res.text());
      return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact-form]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
