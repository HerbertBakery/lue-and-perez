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
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    if (!name || !email || !message) {
      setStatus("error");
      setError("Please fill in name, email, and message.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
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
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
      <div className="grid md:grid-cols-2 gap-4">
        <input name="name" placeholder="Your name *" required
          className="w-full rounded-xl border px-3 py-2" />
        <input name="email" type="email" placeholder="Email *" required
          className="w-full rounded-xl border px-3 py-2" />
      </div>
      <input name="phone" placeholder="Phone"
        className="w-full rounded-xl border px-3 py-2" />
      <textarea name="message" placeholder="What can we help with? *" rows={5} required
        className="w-full rounded-xl border px-3 py-2" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center rounded-xl bg-teal-700 px-4 py-2 text-white font-semibold shadow-sm hover:bg-teal-800 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request a Quote"}
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
