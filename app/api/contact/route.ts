import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type Body = {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
};

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = (await req.json()) as Partial<Body>;

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
    }

    const to = process.env.CONTACT_TO;
    const from = process.env.CONTACT_FROM || "Lue & Perez <onboarding@resend.dev>";
    if (!to) {
      return NextResponse.json({ ok: false, error: "CONTACT_TO env not set." }, { status: 500 });
    }

    const subject = `New contact: ${name}`;
    const html = `
      <h2>New Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "—"}</p>
      <p><strong>Message:</strong></p>
      <p>${(message || "").replace(/\n/g,"<br/>")}</p>
      <hr/><small>Source: ${process.env.VERCEL_URL || "local dev"}</small>
    `;

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      // Resend supports snake_case
      reply_to: email || undefined,
      replyTo: email || undefined,
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
