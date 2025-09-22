// app/api/stripe/checkout/custom-amount/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" as any });

// Prefer explicit site URL; fall back to Vercel URL; then localhost
function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ ok: false, error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    }

    const body = await req.json();
    const amountCents = Math.floor(Number(body?.amountCents));
    if (!Number.isFinite(amountCents) || amountCents < 50) {
      return NextResponse.json({ ok: false, error: "Invalid amount. Minimum is 50 cents." }, { status: 400 });
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
      // NEW: send users to the dedicated success page
      success_url: `${base}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
      // NEW: cancel flows return to the unified /payments page
      cancel_url:  `${base}/payments?status=cancel`,
    });

    return NextResponse.json({ ok: true, id: session.id, url: session.url });
  } catch (err: any) {
    console.error("[checkout/custom-amount] error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "Stripe error" }, { status: 500 });
  }
}
