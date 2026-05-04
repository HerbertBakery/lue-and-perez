import { NextResponse } from 'next/server';

import {
  computeSpamScore,
  countUrls,
  getClientIp,
  isFreeEmail,
  isValidEmail,
  normalizeText,
  rateLimit,
  validateSubmissionAge,
} from '@/lib/intake';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const required = ['company','name','email','country','products'];
    for (const k of required) {
      if (!normalizeText(body[k])) {
        return NextResponse.json({ error: `Missing field: ${k}` }, { status: 400 });
      }
    }

    const company = normalizeText(body.company);
    const name = normalizeText(body.name);
    const email = normalizeText(body.email);
    const phone = normalizeText(body.phone);
    const country = normalizeText(body.country);
    const buyerType = normalizeText(body.buyerType);
    const estimatedVolume = normalizeText(body.estimatedVolume);
    const launchTimeline = normalizeText(body.launchTimeline);
    const privateLabelNeed = normalizeText(body.privateLabelNeed);
    const companyWebsite = normalizeText(body.companyWebsite);
    const products = normalizeText(body.products);
    const notes = normalizeText(body.notes);
    const website = normalizeText(body.website);
    const b2b = normalizeText(body.b2b);
    const startedAt = normalizeText(body.startedAt);

    if (website) return NextResponse.json({ ok: true });
    if (!validateSubmissionAge(startedAt).ok) {
      return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
    }
    if (b2b !== 'yes') {
      return NextResponse.json({ error: 'Please confirm this is a business request.' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid work email.' }, { status: 400 });
    }
    if (products.length < 25) {
      return NextResponse.json({ error: 'Please include more product and volume detail.' }, { status: 400 });
    }

    const combinedText = `${company} ${name} ${email} ${country} ${buyerType} ${estimatedVolume} ${launchTimeline} ${privateLabelNeed} ${companyWebsite} ${products} ${notes}`;
    if (countUrls(products) > 1 || countUrls(notes) > 1 || computeSpamScore(combinedText) >= 4) {
      return NextResponse.json({ error: 'We could not accept that quote request.' }, { status: 400 });
    }
    if (isFreeEmail(email) && !companyWebsite) {
      return NextResponse.json(
        { error: 'Please use a business email or include your company website.' },
        { status: 400 }
      );
    }

    const ip = getClientIp(req);
    const limiter = rateLimit(`quote:${ip}`, 4, 1000 * 60 * 60);
    if (!limiter.ok) {
      return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
    }

    const payload = {
      company,
      name,
      email,
      phone,
      country,
      buyerType,
      estimatedVolume,
      launchTimeline,
      privateLabelNeed,
      companyWebsite,
      products,
      notes,
      at: new Date().toISOString(),
      ip,
    };

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.QUOTE_FROM || 'onboarding@resend.dev',
        to: (process.env.QUOTE_NOTIFY_TO || 'you@example.com').split(','),
        subject: `[Quote] ${payload.company} (${payload.country})`,
        text:
`Company: ${payload.company}
Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone}
Country: ${payload.country}
Buyer Type: ${payload.buyerType}
Estimated Volume: ${payload.estimatedVolume}
Launch Timeline: ${payload.launchTimeline}
Private Label / Co-Packing: ${payload.privateLabelNeed}
Website: ${payload.companyWebsite}

Products:
${payload.products}

Notes:
${payload.notes}

IP: ${payload.ip}
Time: ${payload.at}`
      });
    } else {
      console.log('QUOTE REQUEST', payload);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
