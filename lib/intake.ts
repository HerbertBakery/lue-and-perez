const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "zoho.com",
]);

const SPAM_TERMS = [
  "seo",
  "backlink",
  "guest post",
  "domain authority",
  "crypto",
  "forex",
  "casino",
  "telegram",
  "whatsapp",
  "viagra",
  "loan",
  "betting",
];

type LimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, LimitEntry>();

export function normalizeText(value: unknown) {
  return String(value || "").trim();
}

export function getClientIp(req: Request) {
  return (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() || "unknown";
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isFreeEmail(email: string) {
  const domain = email.split("@")[1]?.toLowerCase() || "";
  return FREE_EMAIL_DOMAINS.has(domain);
}

export function countUrls(value: string) {
  const matches = value.match(/https?:\/\/|www\./gi);
  return matches ? matches.length : 0;
}

export function computeSpamScore(value: string) {
  const text = value.toLowerCase();
  let score = 0;

  for (const term of SPAM_TERMS) {
    if (text.includes(term)) score += 2;
  }

  if (countUrls(text) > 1) score += 2;
  if (/[A-Z]{8,}/.test(value)) score += 1;
  if (/(.)\1{7,}/.test(value)) score += 1;

  return score;
}

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { ok: false, remaining: 0 };
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return { ok: true, remaining: Math.max(limit - current.count, 0) };
}

export function validateSubmissionAge(startedAt: string) {
  const started = Number(startedAt);
  if (!Number.isFinite(started)) return { ok: false, error: "Submission session missing." };

  const ageMs = Date.now() - started;
  if (ageMs < 2500) {
    return { ok: false, error: "Submission was too fast." };
  }
  if (ageMs > 1000 * 60 * 60 * 12) {
    return { ok: false, error: "Submission expired. Please refresh and try again." };
  }

  return { ok: true };
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function formatMultilineHtml(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br/>");
}
