const PAYPAL_ENV = (process.env.PAYPAL_ENV || "live").toLowerCase();

const PAYPAL_API_BASE =
  PAYPAL_ENV === "sandbox" ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com";

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

async function getAccessToken() {
  const clientId = requireEnv("PAYPAL_CLIENT_ID");
  const clientSecret = requireEnv("PAYPAL_CLIENT_SECRET");
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal auth failed: ${text}`);
  }

  const data = await res.json();
  if (!data?.access_token) throw new Error("PayPal auth failed: missing access token");
  return data.access_token as string;
}

export async function paypalFetch<T>(
  path: string,
  init?: RequestInit & { headers?: Record<string, string> }
): Promise<T> {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal API error (${res.status}): ${text}`);
  }

  if (res.status === 204) return null as T;

  const text = await res.text();
  if (!text.trim()) return null as T;
  return JSON.parse(text) as T;
}

export function amountFromCents(cents: number) {
  return (Math.round(cents) / 100).toFixed(2);
}

export function formatAmount(value?: string | null, currency?: string | null) {
  if (!value) return "";
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (currency || "USD").toUpperCase(),
  }).format(amount);
}

export function computeDueDate(daysUntilDue: number) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + daysUntilDue);
  return date.toISOString().slice(0, 10);
}

export function getPayPalWebhookId() {
  return process.env.PAYPAL_WEBHOOK_ID || "";
}
