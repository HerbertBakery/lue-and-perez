import { NextResponse } from "next/server";

import { amountFromCents, getBaseUrl, paypalFetch } from "@/lib/paypal";

type CreateOrderResponse = {
  id: string;
  links?: Array<{ href: string; rel: string; method?: string }>;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amountCents = Math.floor(Number(body?.amountCents));

    if (!Number.isFinite(amountCents) || amountCents <= 0) {
      return NextResponse.json({ ok: false, error: "Invalid amount." }, { status: 400 });
    }

    const base = getBaseUrl();
    const amount = amountFromCents(amountCents);

    const order = await paypalFetch<CreateOrderResponse>("/v2/checkout/orders", {
      method: "POST",
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            description: "Custom USD payment",
            amount: {
              currency_code: "USD",
              value: amount,
            },
          },
        ],
        application_context: {
          brand_name: "Lue & Perez",
          landing_page: "LOGIN",
          user_action: "PAY_NOW",
          return_url: `${base}/payments/success`,
          cancel_url: `${base}/payments?status=cancel`,
        },
      }),
    });

    const approveUrl = order.links?.find((link) => link.rel === "approve")?.href;
    if (!approveUrl) {
      throw new Error("PayPal did not return an approval link.");
    }

    return NextResponse.json({ ok: true, id: order.id, url: approveUrl });
  } catch (err: any) {
    console.error("[paypal/checkout] error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "PayPal checkout error" },
      { status: 500 }
    );
  }
}
