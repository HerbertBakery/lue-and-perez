"use client";
import React, { useState, FormEvent } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

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

    if (!company || !name || !email || !country || !products) {
      setStatus("error");
      setError("Please fill in company, name, email, country, and products.");
      return;
    }

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, name, email, phone, country, companyWebsite, products, notes, website }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json?.ok) {
        setStatus("error");
        setError(json?.error || "Send failed.");
        return;
      }

      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="company">Company</label>
          <input id="company" name="company" placeholder="Your company" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="name">Contact Name</label>
          <input id="name" name="name" placeholder="Your name" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="email">Work Email</label>
          <input id="email" name="email" type="email" placeholder="name@company.com" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="phone">Phone</label>
          <input id="phone" name="phone" placeholder="+1 ..." className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="country">Destination Country</label>
          <input id="country" name="country" placeholder="United Kingdom" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="companyWebsite">Website</label>
          <input id="companyWebsite" name="companyWebsite" placeholder="https://yourcompany.com" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
        </div>
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="products">Products and Volumes</label>
        <textarea id="products" name="products" placeholder="Tell us the SKUs, target quantities, and pack sizes." rows={5} required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700" htmlFor="notes">Notes</label>
        <textarea id="notes" name="notes" placeholder="Lead times, certifications, cold chain requirements, destination port, or retailer targets." rows={4} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center rounded-xl bg-teal-700 px-5 py-3 text-white font-semibold shadow-sm hover:bg-teal-800 disabled:opacity-60"
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
