import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

function getBaseUrl() {
  const h = headers();
  const proto = h.get("x-forwarded-proto") || "https";
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  // Use http for localhost
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  return `${isLocal ? "http" : proto}://${host}`;
}

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json(
      { ok: false, error: "Missing STRIPE_SECRET_KEY server env" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(key); // rely on account API version

  try {
    const body = await req.json();
    const raw = Number(body?.amountCents);
    const amountCents = Math.floor(raw);

    if (!Number.isFinite(amountCents) || amountCents < 50) {
      return NextResponse.json(
        { ok: false, error: "Invalid amount. Minimum is 50 cents." },
        { status: 400 }
      );
    }

    const base = getBaseUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Custom USD payment" },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${base}/payments/usd?status=success&amount=${amountCents}`,
      cancel_url: `${base}/payments/usd?status=cancelled`,
      // You can enable these if you want:
      // billing_address_collection: "auto",
      // allow_promotion_codes: true,
    });

    return NextResponse.json({ ok: true, id: session.id, url: session.url });
  } catch (err: any) {
    console.error("[checkout/custom-amount] error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Stripe error" },
      { status: 500 }
    );
    }
}
