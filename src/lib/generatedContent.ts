// Loader for AI-generated content committed into the repo by the external
// publisher (Supabase edge function `publish-to-github`).
//
// File layout written by the publisher:
//   src/content/_index.json          — manifest: array of {slug, content_type, title, published_at, ...}
//   src/content/pages/<slug>.json    — location/neighborhood/service page payloads (slug may contain "/")
//   src/content/blog/<slug>.json     — blog post payloads
//
// All JSON is bundled at build time via Vite glob imports — there is no
// runtime fetch. Every accessor here is defensive: the publisher's payload
// shape drifts (missing fields, nulls, extra fields) and a publish must NEVER
// break the build or crash a page. Treat all parsed JSON as untrusted.

import {
  getCategoryBySlug,
  getLocationBySlug,
  SERVICE_CATEGORIES,
} from "@/data/business";

export type ContentType =
  | "location_page"
  | "neighborhood_page"
  | "service_page"
  | "blog_post";

export interface ManifestEntry {
  slug: string;
  content_type?: ContentType | string;
  title?: string | null;
  page_title?: string | null;
  meta_description?: string | null;
  published_at?: string | null;
  town_name?: string | null;
  state?: string | null;
  [key: string]: unknown;
}

export interface FaqPair {
  question?: unknown;
  answer?: unknown;
}

// Publisher emits { intent, context, anchor_text } today; older payloads may
// carry a resolved { url, anchor_text }. Support both.
export interface InternalLink {
  url?: string | null;
  anchor_text?: string | null;
  intent?: string | null;
  context?: string | null;
}

// Structured body_content block. The publisher's block list is exactly:
// heading | paragraph | list | faq | cta | blockquote | link
// Every field is optional — render defensively, skip unknown types.
export interface ContentBlock {
  type?: string;
  text?: unknown;
  level?: unknown;
  items?: unknown;
  style?: unknown;
  ordered?: unknown;
  pairs?: unknown;
  faqs?: unknown;
  question?: unknown;
  answer?: unknown;
  heading?: unknown;
  label?: unknown;
  button_text?: unknown;
  button_url?: unknown;
  url?: unknown;
  href?: unknown;
  intent?: unknown;
  anchor_text?: unknown;
  context?: unknown;
  phone?: unknown;
  cite?: unknown;
  attribution?: unknown;
  [key: string]: unknown;
}

export interface GeneratedPage {
  page_title?: string;
  h1_heading?: string;
  meta_title?: string;
  meta_description?: string | null;
  content_type?: ContentType | string;
  slug?: string;
  town_name?: string | null;
  state?: string | null;
  body_content?: unknown;
  body_content_html?: string | null;
  schema_json?: unknown;
  faq_pairs?: unknown;
  images?: unknown;
  internal_links?: unknown;
  published_at?: string | null;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Module loading (Vite glob imports, bundled at build time)
// ---------------------------------------------------------------------------

// The manifest is loaded via glob (not a static import) so a missing or
// malformed _index.json degrades to an empty manifest instead of failing the
// build.
//
// All three globs import as RAW STRINGS (`?raw`) and are parsed here inside
// try/catch. With plain eager JSON imports Rollup parses every file at build
// time, so a single syntactically invalid JSON committed by the publisher
// would abort `vite build` (and the deploy). `?raw` never parses — a broken
// file just becomes a string we skip with a warning.
const manifestModules = import.meta.glob("../content/_index.json", {
  eager: true,
  query: "?raw",
  import: "default",
});
// `**` (not `*`): page slugs mirror url paths and may contain "/" (e.g.
// "drainage-service/some-generated-page" → content/pages/drainage-service/some-generated-page.json).
const pageModules = import.meta.glob("../content/pages/**/*.json", {
  eager: true,
  query: "?raw",
  import: "default",
});
const blogModules = import.meta.glob("../content/blog/**/*.json", {
  eager: true,
  query: "?raw",
  import: "default",
});

/**
 * Parse a glob-imported content module to JSON data, or null when malformed.
 * Accepts a raw string (`?raw` import), a module namespace wrapping one
 * (`{ default: string }`), or an already-parsed value (defensive). Malformed
 * JSON is skipped with a console.warn — it must never throw at module load,
 * which would take down every page in the bundle.
 */
export function parseContentModule(value: unknown, filePath: string): unknown {
  const raw =
    value && typeof value === "object" && "default" in (value as Record<string, unknown>)
      ? (value as { default: unknown }).default
      : value;
  if (typeof raw !== "string") return raw ?? null;
  try {
    return JSON.parse(raw);
  } catch {
    console.warn(`[generatedContent] Skipping malformed JSON: ${filePath}`);
    return null;
  }
}

/** Build slug → payload map from raw glob modules. Exported for unit tests. */
export function buildPageMap(modules: Record<string, unknown>, folder: string): Map<string, GeneratedPage> {
  const map = new Map<string, GeneratedPage>();
  const re = new RegExp(`/content/${folder}/(.+)\\.json$`);
  for (const [filePath, mod] of Object.entries(modules)) {
    const match = filePath.match(re);
    if (!match) continue;
    const data = parseContentModule(mod, filePath);
    // A payload must be a plain object — skip arrays/strings/nulls silently.
    if (!data || typeof data !== "object" || Array.isArray(data)) continue;
    map.set(match[1], data as GeneratedPage);
  }
  return map;
}

const PAGES = buildPageMap(pageModules, "pages");
const BLOGS = buildPageMap(blogModules, "blog");

function loadManifest(): ManifestEntry[] {
  const mod = Object.values(manifestModules)[0];
  const parsed = parseContentModule(mod, "../content/_index.json");
  if (!Array.isArray(parsed)) return [];
  // Drop malformed entries (non-objects, missing/empty slug).
  return parsed.filter(
    (m): m is ManifestEntry =>
      !!m &&
      typeof m === "object" &&
      typeof (m as ManifestEntry).slug === "string" &&
      (m as ManifestEntry).slug.split("/").filter(Boolean).length > 0
  );
}

const MANIFEST: ManifestEntry[] = loadManifest();

// ---------------------------------------------------------------------------
// Public accessors
// ---------------------------------------------------------------------------

/** Strip leading slashes and any legacy "blog/" prefix from a blog slug. */
export function bareBlogSlug(slug: string): string {
  return asText(slug).replace(/^\/+/, "").replace(/^blog\//, "");
}

/** Clean a page slug: strip leading slashes, refuse traversal-ish segments. */
function cleanSlug(slug: unknown): string | null {
  if (typeof slug !== "string") return null;
  const cleaned = slug.replace(/^\/+/, "").replace(/\/+$/, "");
  if (!cleaned) return null;
  if (cleaned.split("/").some((seg) => seg === "" || seg === "." || seg === "..")) return null;
  return cleaned;
}

/** Manifest entries, optionally filtered by content_type. */
export function listEntries(type?: ContentType): ManifestEntry[] {
  if (!type) return MANIFEST.slice();
  return MANIFEST.filter((m) => m.content_type === type);
}

/** Public URL for a manifest entry. Blog posts live under /blog/<slug>. */
export function manifestEntryUrl(entry: ManifestEntry): string {
  const slug = asText(entry.slug).replace(/^\/+/, "");
  if (entry.content_type === "blog_post") return `/blog/${bareBlogSlug(slug)}`;
  return `/${slug}`;
}

/** Display title for a manifest entry, with slug-derived fallback. */
export function entryTitle(entry: ManifestEntry): string {
  const title = asText(entry.title) || asText(entry.page_title);
  if (title) return title;
  const last = asText(entry.slug).split("/").filter(Boolean).pop() || "";
  return last.replace(/-/g, " ");
}

/** Page payload for a non-blog generated page (slug may contain "/"). */
export function getPageBySlug(slug: string): GeneratedPage | null {
  const cleaned = cleanSlug(slug);
  if (!cleaned) return null;
  return PAGES.get(cleaned) ?? null;
}

/** Page payload for a blog post (accepts bare or "blog/"-prefixed slugs). */
export function getBlogBySlug(slug: string): GeneratedPage | null {
  const cleaned = cleanSlug(bareBlogSlug(asText(slug)));
  if (!cleaned) return null;
  return BLOGS.get(cleaned) ?? null;
}

// ---------------------------------------------------------------------------
// Internal-link intent resolution
// ---------------------------------------------------------------------------
// The publisher emits internal links as { intent, context } with no url.
// Intents look like "service:drain-cleaning" or "location:henderson-nv".
// Resolution order (first hit wins, never return a URL that won't render):
//   1. Generated manifest — exact slug match
//   2. Foundation routes from src/data/business.ts — services are
//      foundation-built on this site, so "service:*" intents resolve to the
//      hand-built /<category>/<service> pages; locations resolve to /<city>
//      (with a trailing 2-letter state suffix like "-nv" stripped if needed).
//      Foundation comes BEFORE fuzzy manifest matching so e.g.
//      "location:henderson" hits the foundation /henderson page instead of a
//      fuzzy manifest hit like /henderson-plumbing-tips.
//   3. Generated manifest — slug tail match ("…/<target>")
//   4. Generated manifest — slug substring match
// Manifest matches (exact/tail/substring) only count when the entry's payload
// JSON actually exists — a manifest ghost must never produce a link to a 404.
// Anything unresolved returns null and MUST be rendered as plain text.

function resolveFoundationUrl(target: string): string | null {
  // Direct category or location page: /<slug>
  if (getCategoryBySlug(target) || getLocationBySlug(target)) return `/${target}`;
  // Service page: /<parent>/<service>
  for (const category of SERVICE_CATEGORIES) {
    const service = category.services.find((s) => s.slug === target);
    if (service) return `/${category.slug}/${service.slug}`;
  }
  // Location slug with a trailing state code, e.g. "henderson-nv" → "henderson".
  const stripped = target.replace(/-[a-z]{2}$/i, "");
  if (stripped !== target && getLocationBySlug(stripped)) return `/${stripped}`;
  return null;
}

/** True when a manifest entry's payload JSON was actually committed. */
function entryHasPayload(entry: ManifestEntry): boolean {
  const slug = asText(entry.slug);
  if (entry.content_type === "blog_post") {
    const cleaned = cleanSlug(bareBlogSlug(slug));
    return !!cleaned && BLOGS.has(cleaned);
  }
  const cleaned = cleanSlug(slug);
  return !!cleaned && PAGES.has(cleaned);
}

/**
 * Core intent resolution with injectable manifest + payload check (exported
 * for unit tests; production code calls resolveIntent below).
 */
export function resolveIntentWith(
  intent: unknown,
  manifest: ManifestEntry[],
  hasPayload: (entry: ManifestEntry) => boolean
): string | null {
  if (typeof intent !== "string" || !intent.trim()) return null;
  const target = intent.split(":").pop()?.trim().replace(/^\/+/, "").replace(/\/+$/, "");
  if (!target) return null;

  // Manifest entries are only linkable when their payload file exists — a
  // manifest ghost would render a 404.
  const linkable = manifest.filter(hasPayload);

  // 1. Exact manifest slug match
  const exact = linkable.find((m) => m.slug === target || bareBlogSlug(m.slug) === target);
  if (exact) return manifestEntryUrl(exact);

  // 2. Exact foundation route match
  const foundation = resolveFoundationUrl(target);
  if (foundation) return foundation;

  // 3. Manifest slug tail match
  const suffix = linkable.find((m) => m.slug.endsWith(`/${target}`));
  if (suffix) return manifestEntryUrl(suffix);

  // 4. Manifest slug substring match
  const partial = linkable.find((m) => m.slug.includes(target));
  if (partial) return manifestEntryUrl(partial);

  return null;
}

export function resolveIntent(intent: unknown): string | null {
  return resolveIntentWith(intent, MANIFEST, entryHasPayload);
}

/** Resolve an internal link to an href: explicit url wins, then intent lookup. */
export function resolveInternalLinkUrl(link: InternalLink): string | null {
  if (!link || typeof link !== "object") return null;
  if (typeof link.url === "string" && link.url.trim()) return link.url;
  return resolveIntent(link.intent);
}

// ---------------------------------------------------------------------------
// Inline link-token substitution
// ---------------------------------------------------------------------------
// body_content_html (and structured paragraph text) can contain literal,
// un-substituted link tokens emitted by the content generator, e.g.:
//   { "anchor_text": "Drain cleaning", "intent": "service:drain-cleaning", "context": "..." }
// Replace each token with a real link when the intent resolves, or with the
// plain anchor text otherwise — never raw JSON, never a dead <a>.

const LINK_TOKEN_RE = /\{[^{}]*?"anchor_text"[^{}]*?\}/g;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseLinkToken(token: string): { anchor_text?: string; intent?: string; url?: string } | null {
  try {
    const parsed = JSON.parse(token);
    if (parsed && typeof parsed === "object") return parsed;
  } catch {
    // Loose regex pull so a slightly malformed token still renders its anchor
    // text instead of raw JSON.
    const anchor = token.match(/"anchor_text"\s*:\s*"([^"]*)"/)?.[1];
    const intent = token.match(/"intent"\s*:\s*"([^"]*)"/)?.[1];
    if (anchor) return { anchor_text: anchor, intent };
  }
  return null;
}

/** Replace inline link tokens inside an HTML string with anchors / plain text. */
export function substituteLinkTokensHtml(html: string): string {
  if (typeof html !== "string" || !html) return "";
  return html.replace(LINK_TOKEN_RE, (token) => {
    const parsed = parseLinkToken(token);
    if (!parsed) return "";
    const anchor = typeof parsed.anchor_text === "string" ? parsed.anchor_text : "";
    const href =
      (typeof parsed.url === "string" && parsed.url.trim() && parsed.url) ||
      resolveIntent(parsed.intent);
    if (!anchor) return "";
    if (!href) return escapeHtml(anchor);
    return `<a href="${escapeHtml(href)}" class="text-secondary font-semibold hover:underline">${escapeHtml(anchor)}</a>`;
  });
}

/**
 * Demote any embedded <h1> in legacy publisher HTML to <h2>. The page chrome
 * (PageHero) already renders the document's single H1, so legacy
 * body_content_html must never introduce a duplicate.
 */
export function demoteH1Headings(html: string): string {
  if (typeof html !== "string" || !html) return "";
  return html.replace(/<h1(?=[\s/>])/gi, "<h2").replace(/<\/h1\s*>/gi, "</h2>");
}

export type TextSegment =
  | { kind: "text"; text: string }
  | { kind: "link"; text: string; href: string | null };

/** Split plain text containing link tokens into renderable segments. */
export function splitTextWithLinkTokens(text: unknown): TextSegment[] {
  if (typeof text !== "string" || !text) return [];
  const segments: TextSegment[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(LINK_TOKEN_RE)) {
    const idx = match.index ?? 0;
    if (idx > lastIndex) segments.push({ kind: "text", text: text.slice(lastIndex, idx) });
    const parsed = parseLinkToken(match[0]);
    if (parsed?.anchor_text) {
      const href =
        (typeof parsed.url === "string" && parsed.url.trim() && parsed.url) ||
        resolveIntent(parsed.intent);
      segments.push({ kind: "link", text: parsed.anchor_text, href: href || null });
    }
    lastIndex = idx + match[0].length;
  }
  if (lastIndex < text.length) segments.push({ kind: "text", text: text.slice(lastIndex) });
  return segments;
}

// ---------------------------------------------------------------------------
// Defensive helpers used by the renderers
// ---------------------------------------------------------------------------

/** Coerce any unknown value to a display string ("" when not representable). */
export function asText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
}

/** Extract a structured-block array from body_content, or null when absent. */
export function extractBlocks(bodyContent: unknown): ContentBlock[] | null {
  const candidate = Array.isArray(bodyContent)
    ? bodyContent
    : bodyContent && typeof bodyContent === "object" && Array.isArray((bodyContent as { blocks?: unknown }).blocks)
      ? (bodyContent as { blocks: unknown[] }).blocks
      : null;
  if (!candidate) return null;
  const blocks = candidate.filter((b): b is ContentBlock => !!b && typeof b === "object");
  return blocks.length > 0 ? blocks : null;
}

/**
 * Normalize schema_json (JSON-LD string or object) to a safe string for a
 * <script type="application/ld+json"> tag, or null when invalid. The value is
 * re-serialized and "<" is escaped so payload content can never break out of
 * the script element.
 */
export function normalizeSchemaJson(value: unknown): string | null {
  try {
    let parsed: unknown = null;
    if (typeof value === "string" && value.trim()) parsed = JSON.parse(value);
    else if (value && typeof value === "object") parsed = value;
    if (!parsed || typeof parsed !== "object") return null;
    return JSON.stringify(parsed).replace(/</g, "\\u003c");
  } catch {
    return null;
  }
}

export interface NormalizedImage {
  url: string;
  alt: string;
  slot: string;
}

/** Normalize the images array: keep entries with a usable url, map alt_text → alt. */
export function normalizeImages(images: unknown): NormalizedImage[] {
  if (!Array.isArray(images)) return [];
  return images
    .filter(
      (img): img is { url: string; alt?: unknown; alt_text?: unknown; slot?: unknown } =>
        !!img && typeof img === "object" && typeof (img as { url?: unknown }).url === "string" && !!(img as { url?: string }).url
    )
    .map((img) => ({
      url: img.url,
      alt: asText(img.alt) || asText(img.alt_text),
      slot: asText(img.slot).toLowerCase(),
    }));
}

/** Normalize faq_pairs: keep entries with at least a question or an answer. */
export function normalizeFaqPairs(pairs: unknown): Array<{ question: string; answer: string }> {
  if (!Array.isArray(pairs)) return [];
  return pairs
    .filter((p): p is FaqPair => !!p && typeof p === "object")
    .map((p) => ({ question: asText(p.question), answer: asText(p.answer) }))
    .filter((p) => p.question || p.answer);
}

/** "June 13, 2026"-style label for an ISO date string, or "" when invalid. */
export function formatDisplayDate(value: unknown): string {
  const raw = asText(value);
  if (!raw) return "";
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
