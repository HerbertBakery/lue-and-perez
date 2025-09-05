// app/api/stripe/invoices/create-send/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

type Item = { description: string; amountCents: number; quantity?: number };
type Body = {
  email: string;
  daysUntilDue?: number; // default 7
  items: Item[];
  memo?: string;
};

export async function POST(req: Request) {
  let invoiceId: string | undefined;

  try {
    const body = (await req.json()) as Body;

    if (!body?.email) return NextResponse.json({ error: "Missing: email" }, { status: 400 });
    if (!Array.isArray(body?.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Missing: items[]" }, { status: 400 });
    }

    const daysUntilDue = Number.isFinite(body.daysUntilDue)
      ? Math.max(1, Math.trunc(body.daysUntilDue!))
      : 7;

    // 1) Find/create customer
    const existing = await stripe.customers.list({ email: body.email, limit: 1 });
    const customer =
      existing.data[0] ??
      (await stripe.customers.create({
        email: body.email,
      }));

    // 2) Create an invoice FIRST (so we can attach line items to it directly)
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: "send_invoice",
      days_until_due: daysUntilDue,
      description: body.memo || undefined,
      // Keep currency consistent at the line level; invoice currency derives from first item
      // No need for pending_invoice_items_behavior when attaching directly.
    });
    invoiceId = invoice.id;

    // 3) Attach each item directly to THIS invoice
    for (const it of body.items) {
      if (!it || !(it.amountCents > 0)) {
        return NextResponse.json(
          { error: "Each item must include a positive amountCents (in cents)." },
          { status: 400 }
        );
      }
      await stripe.invoiceItems.create({
        customer: customer.id,
        invoice: invoice.id,                 // <-- attach to invoice
        currency: "usd",                     // simplified to USD
        unit_amount: Math.trunc(it.amountCents),
        quantity: Math.trunc(it.quantity ?? 1) || 1,
        description: it.description || undefined,
      });
    }

    // 4) Finalize (now there ARE line items, total won’t be zero)
    const finalized = await stripe.invoices.finalizeInvoice(invoice.id);

    // Re-fetch for hosted URL + totals
    const ready = await stripe.invoices.retrieve(finalized.id);

    // Guard against zero-amount edge case
    if ((ready.total ?? 0) <= 0) {
      return NextResponse.json(
        {
          ok: false,
          reason: "zero_total",
          message: "Invoice total is 0 after attaching items.",
          invoiceId: ready.id,
          status: ready.status,
          hostedInvoiceUrl: ready.hosted_invoice_url,
          total: ready.total,
          currency: ready.currency,
        },
        { status: 400 }
      );
    }

    // 5) Try to email; if Stripe refuses, still return hosted link
    try {
      const sent = await stripe.invoices.sendInvoice(ready.id);
      return NextResponse.json({
        ok: true,
        sent: true,
        invoiceId: sent.id,
        status: sent.status,
        hostedInvoiceUrl: sent.hosted_invoice_url,
        total: sent.total,
        currency: sent.currency,
      });
    } catch (e: any) {
      console.error("[create-send] sendInvoice refused:", {
        type: e?.type,
        code: e?.code,
        message: e?.message || e?.raw?.message,
      });
      return NextResponse.json(
        {
          ok: true,
          sent: false,
          message:
            "Invoice finalized; Stripe refused to send email. Use the hosted link or Dashboard → Resend.",
          invoiceId: ready.id,
          status: ready.status,
          hostedInvoiceUrl: ready.hosted_invoice_url,
          total: ready.total,
          currency: ready.currency,
        },
        { status: 200 }
      );
    }
  } catch (err: any) {
    console.error("[create-send] error:", {
      type: err?.type || err?.name,
      code: err?.code,
      message: err?.message || err?.raw?.message,
    });
    return NextResponse.json(
      { error: err?.raw?.message || err?.message || "Unknown error", invoiceId },
      { status: 500 }
    );
  }
}
