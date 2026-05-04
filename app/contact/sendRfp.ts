'use server';

import { Resend } from 'resend';
import { redirect } from 'next/navigation';

import {
  computeSpamScore,
  countUrls,
  formatMultilineHtml,
  isValidEmail,
  normalizeText,
  rateLimit,
  validateSubmissionAge,
} from '@/lib/intake';

export async function sendRfp(formData: FormData) {
  const name = normalizeText(formData.get('name'));
  const email = normalizeText(formData.get('email'));
  const message = normalizeText(formData.get('message'));
  const website = normalizeText(formData.get('website'));
  const startedAt = normalizeText(formData.get('startedAt'));
  const b2b = formData.get('b2b') ? 'Yes' : 'No';
  const startedValidation = validateSubmissionAge(startedAt);

  if (website) {
    redirect('/contact?sent=1');
  }
  if (!startedValidation.ok) {
    redirect('/contact?sent=0&error=' + encodeURIComponent('Please try again.'));
  }

  if (!name || !email || !message) {
    redirect('/contact?sent=0&error=Missing required fields');
  }
  if (!isValidEmail(email)) {
    redirect('/contact?sent=0&error=' + encodeURIComponent('Please enter a valid email.'));
  }
  if (message.length < 20) {
    redirect('/contact?sent=0&error=' + encodeURIComponent('Please include a bit more detail.'));
  }
  if (countUrls(message) > 1 || computeSpamScore(`${name} ${email} ${message}`) >= 4) {
    redirect('/contact?sent=0&error=' + encodeURIComponent('We could not accept that submission.'));
  }

  const limiter = rateLimit(`contact:${email.toLowerCase()}`, 3, 1000 * 60 * 30);
  if (!limiter.ok) {
    redirect('/contact?sent=0&error=' + encodeURIComponent('Too many attempts. Please try again later.'));
  }

  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM || 'Lue & Perez <onboarding@resend.dev>';
  const apiKey = process.env.RESEND_API_KEY;
  if (!to) {
    redirect('/contact?sent=0&error=CONTACT_TO env not set');
  }
  if (!apiKey) {
    redirect('/contact?sent=0&error=RESEND_API_KEY env not set');
  }

  const resend = new Resend(apiKey);

  const subject = `New contact: ${name}`;
  const html = `
    <h2>New Inquiry (Contact page)</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>B2B Confirmed:</strong> ${b2b}</p>
    <p><strong>Message:</strong></p>
    <p>${formatMultilineHtml(message)}</p>
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
