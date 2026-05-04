import { NextResponse } from "next/server";

import { paypalFetch } from "@/lib/paypal";

type PayPalOrderDetails = {
  id: string;
  status: string;
  intent?: string;
  payer?: {
    email_address?: string;
    name?: { given_name?: string; surname?: string };
  };
  purchase_units?: Array<{
    amount?: { currency_code?: string; value?: string };
    payments?: {
      captures?: Array<{
        id: string;
        status?: string;
        amount?: { currency_code?: string; value?: string };
      }>;
    };
  }>;
};

async function getOrder(orderId: string) {
  return paypalFetch<PayPalOrderDetails>(`/v2/checkout/orders/${orderId}`, {
    method: "GET",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderId = String(body?.orderId || "").trim();

    if (!orderId) {
      return NextResponse.json({ ok: false, error: "Missing orderId" }, { status: 400 });
    }

    let order = await getOrder(orderId);
    if (order.status !== "COMPLETED") {
      order = await paypalFetch<PayPalOrderDetails>(`/v2/checkout/orders/${orderId}/capture`, {
        method: "POST",
        body: JSON.stringify({}),
      });
    }

    const capture = order.purchase_units?.[0]?.payments?.captures?.[0];
    const amount = capture?.amount || order.purchase_units?.[0]?.amount;

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      status: capture?.status || order.status,
      amount: amount?.value || null,
      currency: amount?.currency_code || "USD",
      email: order.payer?.email_address || null,
      captureId: capture?.id || null,
    });
  } catch (err: any) {
    console.error("[paypal/checkout/capture] error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "PayPal capture error" },
      { status: 500 }
    );
  }
}
