import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" as any });

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });
    }

    const unit_amount = Math.round((Number(amount) || 0) * 100);
    if (!Number.isFinite(unit_amount) || unit_amount < 50) {
      return NextResponse.json({ error: "Minimum is 50 cents" }, { status: 400 });
    }

    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: { currency: "usd", product_data: { name: "Invoice Payment" }, unit_amount },
          quantity: 1,
        },
      ],
      success_url: `${base}/payments/usd?status=success&session_id={CHECKOUT_SESSION_ID}&amount=${unit_amount}`,
      cancel_url:  `${base}/payments/usd?status=cancel`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Stripe error" }, { status: 500 });
  }
}
