'use server';

import { Resend } from 'resend';
import { redirect } from 'next/navigation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRfp(formData: FormData) {
  const name = (formData.get('name') as string || '').trim();
  const email = (formData.get('email') as string || '').trim();
  const message = (formData.get('message') as string || '').trim();
  const b2b = formData.get('b2b') ? 'Yes' : 'No';

  if (!name || !email || !message) {
    redirect('/contact?sent=0&error=Missing required fields');
  }

  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM || 'Lue & Perez <onboarding@resend.dev>';
  if (!to) {
    redirect('/contact?sent=0&error=CONTACT_TO env not set');
  }

  const subject = `New contact: ${name}`;
  const html = `
    <h2>New Inquiry (Contact page)</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>B2B Confirmed:</strong> ${b2b}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g,'<br/>')}</p>
    <hr/><small>Source: ${process.env.VERCEL_URL || 'local dev'}</small>
  `;

  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    // Resend expects snake_case here:
    reply_to: email || undefined,
  });

  if (error) {
    const msg = (error as any)?.message || 'Send failed';
    redirect('/contact?sent=0&error=' + encodeURIComponent(msg));
  }

  redirect('/contact?sent=1');
}
