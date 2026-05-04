"use client";

import { useMemo, useState } from "react";

type LineItem = { description: string; unit: string; price: string; qty: string };

export default function AdminInvoicesPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [days, setDays] = useState("7");
  const [notes, setNotes] = useState("Thanks for your business!");
  const [items, setItems] = useState<LineItem[]>([
    { description: "Custom order", unit: "USD", price: "550.00", qty: "1" },
  ]);
  const [sending, setSending] = useState(false);
  const [hostedUrl, setHostedUrl] = useState<string | null>(null);
  const clampDue = (d: number) => Math.min(Math.max(d, 1), 60);

  const totalCents = useMemo(() => {
    return items.reduce((sum, it) => {
      const price = Math.round(Number(it.price || "0") * 100);
      const qty = Math.max(1, Math.floor(Number(it.qty || "1")));
      return sum + price * qty;
    }, 0);
  }, [items]);

  const addItem = () => setItems((cur) => [...cur, { description: "", unit: "USD", price: "", qty: "1" }]);
  const removeItem = (idx: number) => setItems((cur) => cur.filter((_, i) => i !== idx));

  async function handleSend() {
    setSending(true);
    setHostedUrl(null);
    try {
      const payload = {
        email: email.trim(),
        name: name.trim() || undefined,
        daysUntilDue: clampDue(Number(days || 7)),
        notes: notes.trim() || undefined,
        items: items.map((it) => ({
          description: it.description || "Item",
          amountCents: Math.round(Number(it.price || "0") * 100), // unit price in cents
          quantity: Math.max(1, Math.floor(Number(it.qty || "1"))),
        })),
      };

      const res = await fetch("/api/paypal/invoices/create-send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Invoice error");

      setHostedUrl(data.hostedInvoiceUrl || null);
      alert("Invoice sent through PayPal.");
    } catch (e: any) {
      alert(e?.message || "Failed to create/send invoice");
    } finally {
      setSending(false);
    }
  }

  const totalDisplay = (totalCents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <main className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-semibold">PayPal Invoice Builder — USD only</h1>
      <p className="text-sm text-gray-600">
        Hosted invoices use the configured Lue &amp; Perez PayPal branding profile, logo, and optional PayPal invoice template.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Customer Email</label>
          <input className="border p-2 rounded w-full" placeholder="client@email.com"
                 value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Customer Name</label>
          <input className="border p-2 rounded w-full" placeholder="Contact name"
                 value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Days until due (Net terms)</label>
          <input className="border p-2 rounded w-full" type="number" min={1} max={60} placeholder="e.g., 7"
                 value={days} onChange={(e) => setDays(e.target.value)} />
          <p className="text-xs text-gray-500">
            The invoice will be due {clampDue(Number(days || 7))} day(s) after sending. (1–60)
          </p>
        </div>
      </div>

      {/* Line items */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Line Items</h2>
          <button type="button" className="px-3 py-1 rounded bg-black text-white" onClick={addItem}>
            + Add Item
          </button>
        </div>

        {items.map((it, idx) => {
          const price = Number(it.price || "0");
          const qty = Math.max(1, Math.floor(Number(it.qty || "1")));
          const lineTotal = (Math.round(price * 100) * qty) / 100;

          return (
            <div key={idx} className="space-y-1 border p-3 rounded">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                <input className="border p-2 rounded" placeholder="Description"
                       value={it.description} onChange={(e) => {
                         const v = e.target.value; setItems((cur) => cur.map((c, i) => i === idx ? { ...c, description: v } : c));
                       }} />
                <input className="border p-2 rounded" type="number" step="0.01" inputMode="decimal"
                       placeholder="Unit price (USD)" value={it.price}
                       onChange={(e) => {
                         const v = e.target.value; setItems((cur) => cur.map((c, i) => i === idx ? { ...c, price: v } : c));
                       }} />
                <input className="border p-2 rounded" type="number" placeholder="Qty" value={it.qty}
                       onChange={(e) => {
                         const v = e.target.value; setItems((cur) => cur.map((c, i) => i === idx ? { ...c, qty: v } : c));
                       }} />
                <input className="border p-2 rounded bg-gray-50 text-gray-600" value="USD" readOnly />
                <button type="button" className="border rounded px-2" title="Remove item" onClick={() => removeItem(idx)}>✕</button>
              </div>
              <p className="text-xs text-gray-500">
                ${price.toFixed(2)} × {qty} = <span className="font-medium">${lineTotal.toFixed(2)}</span>
                <span className="opacity-70"> (billed as {(Math.round(price * 100)).toLocaleString()} cents each)</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* total */}
      <div className="border rounded p-3 bg-white">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Invoice total</span>
          <span className="font-semibold">{totalDisplay}</span>
        </div>
      </div>

      <textarea className="border p-2 rounded w-full" rows={3}
                placeholder="Invoice footer/notes"
                value={notes} onChange={(e) => setNotes(e.target.value)} />

      <button type="button" onClick={handleSend}
              disabled={sending || !email || totalCents <= 0}
              className="px-4 py-2 rounded-2xl shadow bg-black text-white disabled:opacity-50">
        {sending ? "Sending…" : `Create & Send PayPal Invoice for ${totalDisplay}`}
      </button>

      {hostedUrl && (
        <p className="text-sm">
          Hosted invoice:{" "}
          <a className="underline" href={hostedUrl} target="_blank" rel="noreferrer">{hostedUrl}</a>
        </p>
      )}
    </main>
  );
}
