import { headers } from "next/headers";

import { getPayPalWebhookId, paypalFetch } from "@/lib/paypal";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const webhookId = getPayPalWebhookId();
  if (!webhookId) {
    return new Response("Missing PAYPAL_WEBHOOK_ID", { status: 500 });
  }

  const bodyText = await req.text();
  const event = JSON.parse(bodyText);
  const h = headers();

  try {
    const verification = await paypalFetch<{ verification_status?: string }>(
      "/v1/notifications/verify-webhook-signature",
      {
        method: "POST",
        body: JSON.stringify({
          transmission_id: h.get("paypal-transmission-id"),
          transmission_time: h.get("paypal-transmission-time"),
          cert_url: h.get("paypal-cert-url"),
          auth_algo: h.get("paypal-auth-algo"),
          transmission_sig: h.get("paypal-transmission-sig"),
          webhook_id: webhookId,
          webhook_event: event,
        }),
      }
    );

    if (verification.verification_status !== "SUCCESS") {
      return new Response("Invalid PayPal webhook signature", { status: 400 });
    }

    switch (event.event_type) {
      case "PAYMENT.CAPTURE.COMPLETED":
        console.log("PayPal payment captured:", event.resource?.id);
        break;
      case "INVOICING.INVOICE.PAID":
        console.log("PayPal invoice paid:", event.resource?.id);
        break;
      default:
        console.log("Unhandled PayPal event:", event.event_type);
    }

    return new Response("ok");
  } catch (err: any) {
    console.error("[paypal/webhook] error:", err);
    return new Response(err?.message || "Webhook error", { status: 500 });
  }
}
