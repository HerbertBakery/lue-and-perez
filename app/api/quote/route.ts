import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const required = ['company','name','email','country','products'];
    for (const k of required) {
      if (!body[k] || String(body[k]).trim() === '') {
        return NextResponse.json({ error: `Missing field: ${k}` }, { status: 400 });
      }
    }
    // honeypot
    if (body.website) return NextResponse.json({ ok: true });

    const payload = {
      company: String(body.company),
      name: String(body.name),
      email: String(body.email),
      phone: String(body.phone || ''),
      country: String(body.country),
      products: String(body.products),
      notes: String(body.notes || ''),
      at: new Date().toISOString(),
      ip: (req.headers.get('x-forwarded-for') || '').split(',')[0] || ''
    };

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.QUOTE_FROM || 'onboarding@resend.dev',
        to: (process.env.QUOTE_NOTIFY_TO || 'you@example.com').split(','),
        subject: `New Quote — ${payload.company} (${payload.country})`,
        text:
`Company: ${payload.company}
Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone}
Country: ${payload.country}

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
