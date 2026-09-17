export type GateVerdict = {
  allowed: boolean;
  reason: "ok" | "country" | "vpn" | "bot" | "unknown";
  country?: string;
};

const CACHE_KEY = "rl_geo_gate_v1";

const ALLOWED_COUNTRIES = new Set(["US", "PH"]);

const PROXYCHECK_KEY = import.meta.env.VITE_PROXYCHECK_KEY as string | undefined;

// Search engine / social / AI crawlers must never be gated — blocking them
// would remove the site from search results.
const CRAWLER_RE =
  /(googlebot|google-inspectiontool|storebot-google|google-extended|bingbot|adidxbot|duckduckbot|yandex(bot)?|baiduspider|applebot|slurp|sogou|exabot|facebookexternalhit|facebot|twitterbot|linkedinbot|pinterestbot|whatsapp|telegrambot|discordbot|gptbot|oai-searchbot|chatgpt-user|perplexitybot|claudebot|anthropic-ai|ccbot|bytespider|ahrefsbot|semrushbot)/i;

function isCrawler(): boolean {
  try {
    return CRAWLER_RE.test(navigator.userAgent || "");
  } catch {
    return false;
  }
}

function readCache(): GateVerdict | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as GateVerdict) : null;
  } catch {
    return null;
  }
}

function writeCache(v: GateVerdict) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(v));
  } catch {
    // Ignore storage errors
  }
}

async function withTimeout(url: string, ms = 3500): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function proxycheck(): Promise<GateVerdict | null> {
  try {
    const key = PROXYCHECK_KEY ? `&key=${PROXYCHECK_KEY}` : "";
    const res = await withTimeout(`https://proxycheck.io/v2/?vpn=3&asn=1${key}`);
    if (!res.ok) return null;

    const data = await res.json();
    if (data?.status !== "ok") return null;

    const ip = Object.keys(data).find((k) => k !== "status");
    if (!ip) return null;

    const rec = data[ip] ?? {};
    const country = String(rec.isocode || "").toUpperCase();
    const flagged = String(rec.proxy).toLowerCase() === "yes";
    const type = String(rec.type || "").toLowerCase();
    const isPrivateRelay = /apple|icloud|private relay/i.test(
      `${rec.provider || ""} ${rec.organisation || ""}`,
    );

    if (country && !ALLOWED_COUNTRIES.has(country)) {
      return { allowed: false, reason: "country", country };
    }

    if (flagged && !isPrivateRelay && type !== "business") {
      return { allowed: false, reason: "vpn", country };
    }

    if (country) {
      return { allowed: true, reason: "ok", country };
    }

    return null;
  } catch {
    return null;
  }
}

async function countryOnly(): Promise<GateVerdict | null> {
  try {
    const res = await withTimeout("https://ipwho.is/?fields=country_code,success");
    if (!res.ok) return null;

    const data = await res.json();
    const country = String(data?.country_code || "").toUpperCase();
    if (!country) return null;

    return ALLOWED_COUNTRIES.has(country)
      ? { allowed: true, reason: "ok", country }
      : { allowed: false, reason: "country", country };
  } catch {
    return null;
  }
}

function detectAutomation(): boolean {
  try {
    if (navigator.webdriver === true) return true;
    if (/HeadlessChrome/i.test(navigator.userAgent)) return true;
    return false;
  } catch {
    return false;
  }
}

export async function checkVisitor(): Promise<GateVerdict> {
  if (isCrawler()) {
    return { allowed: true, reason: "ok" };
  }

  if (detectAutomation()) {
    return { allowed: false, reason: "bot" };
  }

  const cached = readCache();
  if (cached) return cached;

  const verdict =
    (await proxycheck()) ??
    (await countryOnly()) ?? { allowed: true, reason: "unknown" as const };

  writeCache(verdict);

  return verdict;
}
