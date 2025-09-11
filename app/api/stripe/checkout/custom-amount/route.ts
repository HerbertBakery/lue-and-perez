import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" as any });

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

    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
      success_url: `${base}/payments/usd?status=success&session_id={CHECKOUT_SESSION_ID}&amount=${amountCents}`,
      cancel_url:  `${base}/payments/usd?status=cancel`,
    });

    return NextResponse.json({ ok: true, id: session.id, url: session.url });
  } catch (err: any) {
    console.error("[checkout/custom-amount] error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "Stripe error" }, { status: 500 });
  }
}
