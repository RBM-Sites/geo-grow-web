// Build-time sitemap generator.
//
// Enumerates:
//   1. Static foundation routes (/, /about, /contact, /reviews, /gallery —
//      /thank-you is intentionally excluded: it is a noindex page)
//   2. Foundation routes parsed from src/data/business.ts (categories,
//      services, locations)
//   3. Generated-content routes from src/content/_index.json (the manifest
//      committed by the publish-to-github edge function), with lastmod taken
//      from each entry's published_at. Manifest entries whose payload JSON is
//      missing render a 404, so they are kept out of the sitemap.
//
// Writes public/sitemap.xml. Wired into `npm run build` ahead of `vite build`
// so the file is always fresh in dist/.
//
// Site origin: VITE_SITE_URL env var when set; otherwise the canonical domain
// already used across the repo (src/components/SEO.tsx, public/robots.txt,
// index.html og tags).

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const SITE_URL = (process.env.VITE_SITE_URL || "https://rightonplumbingandair.com").replace(/\/+$/, "");

// ---------------------------------------------------------------------------
// Foundation routes — parsed from src/data/business.ts. The file is TypeScript
// so we extract slugs with targeted regexes keyed to its stable object shapes:
//   services:   { ..., slug: "x", parentSlug: "y", ... }   → /y/x
//   categories: { ..., slug: "x", description: ... }       → /x
//   locations:  { ..., slug: "x", state: ... }             → /x
// ---------------------------------------------------------------------------

const businessSrc = readFileSync(path.join(ROOT, "src", "data", "business.ts"), "utf8");

const servicePaths = [...businessSrc.matchAll(/slug:\s*"([^"]+)",\s*parentSlug:\s*"([^"]+)"/g)].map(
  (m) => `/${m[2]}/${m[1]}`
);
const categoryPaths = [...businessSrc.matchAll(/slug:\s*"([^"]+)",\s*description:/g)].map((m) => `/${m[1]}`);
const locationPaths = [...businessSrc.matchAll(/slug:\s*"([^"]+)",\s*state:/g)].map((m) => `/${m[1]}`);

const staticPaths = ["/", "/about", "/contact", "/reviews", "/gallery", "/faq", "/pricing", "/why-right-on-plumbing-heating-and-air-is-the-best-hvac-company"];

// ---------------------------------------------------------------------------
// Generated-content routes from the publisher manifest
// ---------------------------------------------------------------------------

function loadManifest() {
  const manifestPath = path.join(ROOT, "src", "content", "_index.json");
  try {
    const parsed = JSON.parse(readFileSync(manifestPath, "utf8"));
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (m) => m && typeof m === "object" && typeof m.slug === "string" && m.slug.replace(/\//g, "").length > 0
    );
  } catch {
    return [];
  }
}

const bareBlogSlug = (slug) => slug.replace(/^\/+/, "").replace(/^blog\//, "");

function isoDate(value) {
  if (typeof value !== "string" || !value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

const generatedEntries = [];
for (const entry of loadManifest()) {
  const isBlog = entry.content_type === "blog_post";
  const fileSlug = isBlog ? bareBlogSlug(entry.slug) : entry.slug.replace(/^\/+/, "");
  if (!fileSlug || fileSlug.split("/").some((seg) => seg === "" || seg === "." || seg === "..")) continue;
  const urlPath = isBlog ? `/blog/${fileSlug}` : `/${fileSlug}`;
  // The SPA router only matches up to 2 path segments (/:category/:service,
  // /blog/:slug) — deeper generated slugs have no route and would 404.
  if (urlPath.split("/").filter(Boolean).length > 2) {
    console.warn(`sitemap: skipping ${urlPath} — more than 2 path segments, no matching route`);
    continue;
  }
  const payloadPath = path.join(ROOT, "src", "content", isBlog ? "blog" : "pages", `${fileSlug}.json`);
  if (!existsSync(payloadPath)) continue; // no payload → page 404s → keep out of sitemap
  let payload = null;
  try {
    payload = JSON.parse(readFileSync(payloadPath, "utf8"));
  } catch {
    continue;
  }
  generatedEntries.push({
    path: urlPath,
    lastmod: isoDate(entry.published_at) || isoDate(payload?.published_at),
  });
}

// ---------------------------------------------------------------------------
// Assemble + write
// ---------------------------------------------------------------------------

const blogIndex = generatedEntries.some((e) => e.path.startsWith("/blog/")) ? ["/blog"] : [];

// path → lastmod | null; first writer wins (foundation > generated).
// Foundation routes carry NO lastmod — stamping them with the build date on
// every build would falsely signal constant changes to crawlers. Generated
// entries keep lastmod only when derived from a real published_at.
const urls = new Map();
for (const p of [...staticPaths, ...blogIndex, ...categoryPaths, ...locationPaths, ...servicePaths]) {
  if (!urls.has(p)) urls.set(p, null);
}
for (const entry of generatedEntries) {
  if (!urls.has(entry.path)) urls.set(entry.path, entry.lastmod || null);
}

const escapeXml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...[...urls.entries()].map(([p, lastmod]) =>
    [
      "  <url>",
      `    <loc>${escapeXml(SITE_URL + (p === "/" ? "/" : p))}</loc>`,
      ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
      "  </url>",
    ].join("\n")
  ),
  "</urlset>",
  "",
].join("\n");

writeFileSync(path.join(ROOT, "public", "sitemap.xml"), xml);
console.log(
  `sitemap: wrote ${urls.size} urls to public/sitemap.xml (${generatedEntries.length} generated, base ${SITE_URL})`
);
