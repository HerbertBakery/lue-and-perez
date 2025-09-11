import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");
  if (!session_id) return NextResponse.json({ ok: false, error: "Missing session_id" }, { status: 400 });

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ["payment_intent"] });
    return NextResponse.json({
      ok: true,
      payment_status: session.payment_status,    // "paid" when successful
      amount_total: session.amount_total,        // cents
      currency: session.currency,                // e.g., "usd"
      customer_email: session.customer_details?.email ?? null,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}
