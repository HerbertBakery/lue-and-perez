import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  computeSpamScore,
  countUrls,
  formatMultilineHtml,
  getClientIp,
  isValidEmail,
  normalizeText,
  rateLimit,
  validateSubmissionAge,
} from "@/lib/intake";

type Body = {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  website?: string | null;
  startedAt?: string | null;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Body>;
    const name = normalizeText(body.name);
    const email = normalizeText(body.email);
    const phone = normalizeText(body.phone);
    const message = normalizeText(body.message);
    const website = normalizeText(body.website);
    const startedAt = normalizeText(body.startedAt);

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }
    if (website) {
      return NextResponse.json({ ok: true });
    }
    if (!validateSubmissionAge(startedAt).ok) {
      return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }
    if (message.length < 20) {
      return NextResponse.json({ ok: false, error: "Please include a bit more detail." }, { status: 400 });
    }
    if (countUrls(message) > 1 || computeSpamScore(`${name} ${email} ${message}`) >= 4) {
      return NextResponse.json({ ok: false, error: "We could not accept that submission." }, { status: 400 });
    }

    const ip = getClientIp(req);
    const limiter = rateLimit(`contact-api:${ip}`, 5, 1000 * 60 * 30);
    if (!limiter.ok) {
      return NextResponse.json({ ok: false, error: "Too many attempts. Please try again later." }, { status: 429 });
    }

    const to = process.env.CONTACT_TO;
    const from = process.env.CONTACT_FROM || "Lue & Perez <onboarding@resend.dev>";
    const apiKey = process.env.RESEND_API_KEY;
    if (!to) {
      return NextResponse.json({ ok: false, error: "CONTACT_TO env not set." }, { status: 500 });
    }
    if (!apiKey) {
      return NextResponse.json({ ok: false, error: "RESEND_API_KEY env not set." }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const subject = `New contact: ${name}`;
    const html = `
      <h2>New Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "—"}</p>
      <p><strong>Message:</strong></p>
      <p>${formatMultilineHtml(message)}</p>
      <hr/><small>Source: ${process.env.VERCEL_URL || "local dev"}</small>
    `;

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      // Resend supports snake_case
      reply_to: email || undefined,
    });

    if (error) {
      console.error("Resend error:", error);
      const msg = (error as any)?.message || JSON.stringify(error);
      return NextResponse.json({ ok: false, error: msg }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: (data as any)?.id || null });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }
}
