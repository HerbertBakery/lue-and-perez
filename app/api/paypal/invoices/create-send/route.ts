import { NextResponse } from "next/server";

import {
  computeDueDate,
  getPayPalInvoicerInfo,
  getPayPalInvoiceTemplateId,
  paypalFetch,
} from "@/lib/paypal";

type Item = { description: string; amountCents: number; quantity?: number };
type Body = {
  email: string;
  name?: string;
  daysUntilDue?: number;
  items: Item[];
  notes?: string;
  memo?: string;
};

type PayPalInvoice = {
  id: string;
  status: string;
  detail?: {
    currency_code?: string;
    metadata?: {
      recipient_view_url?: string;
      invoicer_view_url?: string;
    };
  };
  amount?: {
    value?: string;
    currency_code?: string;
  };
};

function sanitizeDays(days: number) {
  if (!Number.isFinite(days)) return 7;
  return Math.min(Math.max(Math.trunc(days), 1), 60);
}

function splitName(name?: string) {
  const trimmed = name?.trim();
  if (!trimmed) return undefined;

  const [first, ...rest] = trimmed.split(/\s+/);
  return {
    given_name: first,
    ...(rest.length ? { surname: rest.join(" ") } : {}),
  };
}

function invoiceDateToday() {
  return new Date().toISOString().slice(0, 10);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    if (!body?.email) {
      return NextResponse.json({ error: "Missing: email" }, { status: 400 });
    }
    if (!Array.isArray(body?.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Missing: items[]" }, { status: 400 });
    }

    const daysUntilDue = sanitizeDays(Number(body.daysUntilDue));
    const dueDate = computeDueDate(daysUntilDue);
    const note = body.notes?.trim() || body.memo?.trim() || "Thanks for your business!";
    const recipientName = splitName(body.name);
    const invoiceTemplateId = getPayPalInvoiceTemplateId();
    const invoicer = getPayPalInvoicerInfo();

    const items = body.items.map((item, index) => {
      const amountCents = Math.trunc(Number(item.amountCents));
      const quantity = Math.max(1, Math.trunc(item.quantity ?? 1));

      if (!(amountCents > 0)) {
        throw new Error(`Item ${index + 1} must include a positive amountCents value.`);
      }

      return {
        name: item.description || `Item ${index + 1}`,
        description: item.description || undefined,
        quantity: String(quantity),
        unit_amount: {
          currency_code: "USD",
          value: (amountCents / 100).toFixed(2),
        },
        unit_of_measure: "QUANTITY",
      };
    });

    const invoice = await paypalFetch<PayPalInvoice>("/v2/invoicing/invoices", {
      method: "POST",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        detail: {
          invoice_date: invoiceDateToday(),
          currency_code: "USD",
          note,
          memo: note,
          payment_terms:
            process.env.PAYPAL_INVOICE_PAYMENT_TERMS?.trim() ||
            `Payment due by ${dueDate}.`,
          term:
            process.env.PAYPAL_INVOICE_TERM?.trim() ||
            "This invoice is issued in USD through PayPal.",
          payment_term: {
            term_type: "DUE_ON_DATE_SPECIFIED",
            due_date: dueDate,
          },
        },
        invoicer,
        primary_recipients: [
          {
            billing_info: {
              email_address: body.email.trim(),
              ...(recipientName ? { name: recipientName } : {}),
            },
          },
        ],
        items,
        ...(invoiceTemplateId
          ? {
              configuration: {
                template_id: invoiceTemplateId,
              },
            }
          : {}),
      }),
    });

    await paypalFetch(`/v2/invoicing/invoices/${invoice.id}/send`, {
      method: "POST",
      body: JSON.stringify({}),
    });

    const sentInvoice = await paypalFetch<PayPalInvoice>(`/v2/invoicing/invoices/${invoice.id}`, {
      method: "GET",
    });

    return NextResponse.json({
      ok: true,
      sent: true,
      invoiceId: sentInvoice.id,
      status: sentInvoice.status,
      hostedInvoiceUrl: sentInvoice.detail?.metadata?.recipient_view_url || null,
      total: sentInvoice.amount?.value || null,
      currency: sentInvoice.detail?.currency_code || sentInvoice.amount?.currency_code || "USD",
      invoicerViewUrl: sentInvoice.detail?.metadata?.invoicer_view_url || null,
    });
  } catch (err: any) {
    console.error("[paypal/invoices/create-send] error:", err);
    return NextResponse.json(
      { error: err?.message || "Unknown PayPal invoice error" },
      { status: 500 }
    );
  }
}
