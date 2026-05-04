"use client";
import React, { useState, FormEvent } from "react";

import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "sending" | "ok" | "error";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  const startedAt = React.useMemo(() => String(Date.now()), []);
  const [trackedStart, setTrackedStart] = useState(false);
  const fieldClassName =
    "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-100";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    const company = (data.get("company") || "").toString().trim();
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const country = (data.get("country") || "").toString().trim();
    const companyWebsite = (data.get("companyWebsite") || "").toString().trim();
    const products = (data.get("products") || "").toString().trim();
    const notes = (data.get("notes") || "").toString().trim();
    const website = (data.get("website") || "").toString().trim();
    const b2b = data.get("b2b") ? "yes" : "";
    const startedAtValue = (data.get("startedAt") || "").toString().trim();

    if (!company || !name || !email || !country || !products) {
      setStatus("error");
      setError("Please fill in company, name, email, country, and products.");
      return;
    }
    if (!b2b) {
      setStatus("error");
      setError("Please confirm this request is for a business.");
      return;
    }

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, name, email, phone, country, companyWebsite, products, notes, website, b2b, startedAt: startedAtValue }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json?.ok) {
        setStatus("error");
        setError(json?.error || "Send failed.");
        return;
      }

      setStatus("ok");
      trackEvent("generate_lead", { form_name: "request_a_quote", page_path: "/request-a-quote" });
      form.reset();
    } catch (err) {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={() => {
        if (!trackedStart) {
          setTrackedStart(true);
          trackEvent("quote_form_start", { page_path: "/request-a-quote" });
        }
      }}
      className="space-y-5"
    >
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
        This form is for qualified B2B sourcing, export, consolidation, and private-label inquiries. The more commercially specific the brief, the more useful the response will be.
      </div>

      <input type="hidden" name="startedAt" value={startedAt} />
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="company">Company</label>
          <input id="company" name="company" placeholder="Your company" required className={fieldClassName} />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="name">Contact Name</label>
          <input id="name" name="name" placeholder="Your name" required className={fieldClassName} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="email">Work Email</label>
          <input id="email" name="email" type="email" placeholder="name@company.com" required className={fieldClassName} />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="phone">Phone</label>
          <input id="phone" name="phone" placeholder="+1 ..." className={fieldClassName} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="country">Destination Country</label>
          <input id="country" name="country" placeholder="United Kingdom" required className={fieldClassName} />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="buyerType">Buyer Type</label>
          <select id="buyerType" name="buyerType" className={fieldClassName}>
            <option value="">Select buyer type</option>
            <option value="distributor">Distributor</option>
            <option value="importer">Importer</option>
            <option value="retailer">Retailer</option>
            <option value="private-label">Private Label Buyer</option>
            <option value="foodservice">Foodservice Operator</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="estimatedVolume">Estimated Volume</label>
          <input id="estimatedVolume" name="estimatedVolume" placeholder="e.g. 1 x 20ft container / month" className={fieldClassName} />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="launchTimeline">Launch Timeline</label>
          <input id="launchTimeline" name="launchTimeline" placeholder="e.g. Q4 2026" className={fieldClassName} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="privateLabelNeed">Private Label / Co-Packing</label>
          <select id="privateLabelNeed" name="privateLabelNeed" className={fieldClassName}>
            <option value="">Select option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="exploring">Exploring options</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="companyWebsite">Website</label>
          <input id="companyWebsite" name="companyWebsite" placeholder="https://yourcompany.com" className={fieldClassName} />
        </div>
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="products">Products and Volumes</label>
        <textarea id="products" name="products" placeholder="Tell us the SKUs, target quantities, and pack sizes." rows={5} required className={fieldClassName} />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="notes">Notes</label>
        <textarea id="notes" name="notes" placeholder="Lead times, certifications, cold chain requirements, destination port, or retailer targets." rows={4} className={fieldClassName} />
      </div>

      <label className="inline-flex items-start gap-2 text-sm leading-6 text-slate-600">
        <input type="checkbox" name="b2b" value="yes" className="rounded border-slate-300" required />
        I confirm this is a legitimate business quote request.
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-teal-800 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit Quote Request"}
      </button>

      <div aria-live="polite" className="text-sm">
        {status === "ok" && (
          <p className="text-green-700 mt-2">Thanks! We’ll get back to you shortly.</p>
        )}
        {status === "error" && (
          <p className="text-red-700 mt-2">{error || "Something went wrong."}</p>
        )}
      </div>
    </form>
  );
}
