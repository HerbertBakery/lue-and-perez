import { headers } from "next/headers";
import Stripe from "stripe";

export const runtime = "nodejs";          // ✅ must be Node (not edge)
export const dynamic = "force-dynamic";   // ✅ avoid caching for webhooks

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  const sig = headers().get("stripe-signature") || "";
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return new Response("Missing STRIPE_WEBHOOK_SECRET", { status: 500 });
  }

  // Read raw body for signature verification
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the events you subscribed to
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("✅ Checkout completed:", session.id);
      break;
    }
    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.log("✅ PaymentIntent succeeded:", pi.id);
      break;
    }
    case "invoice.paid": {
      const inv = event.data.object as Stripe.Invoice;
      console.log("✅ Invoice paid:", inv.id);
      break;
    }
    default:
      console.log("ℹ️ Unhandled event:", event.type);
  }

  return new Response("ok");
}
