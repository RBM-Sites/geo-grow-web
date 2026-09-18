// Build-time prerender. Runs after `vite build` (client, → dist/) and
// `vite build --ssr` (→ dist-ssr/). For every URL in the sitemap it renders the
// route to HTML and writes dist/<route>/index.html, so the raw response for
// each page carries its content, title, description, canonical and JSON-LD.
//
// The untouched SPA shell is kept at dist/__spa.html for routes that are not
// prerendered (unknown URLs → the client-side 404).

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DIST = path.join(ROOT, "dist");
const SSR_ENTRY = path.join(ROOT, "dist-ssr", "entry-server.js");

if (!existsSync(SSR_ENTRY)) {
  console.error(`prerender: missing ${SSR_ENTRY} — run \`vite build --ssr src/entry-server.tsx --outDir dist-ssr\` first`);
  process.exit(1);
}

const template = readFileSync(path.join(DIST, "index.html"), "utf8");
writeFileSync(path.join(DIST, "__spa.html"), template);

// Helmet supplies these per page; drop the template's site-wide defaults so
// prerendered pages don't carry two <title>s / two descriptions.
const HEAD_DEFAULTS = [
  /\s*<title>[\s\S]*?<\/title>/i,
  /\s*<meta\s+name="description"[^>]*>/gi,
  /\s*<meta\s+property="og:[^"]*"[^>]*>/gi,
  /\s*<meta\s+name="twitter:[^"]*"[^>]*>/gi,
];
const strippedTemplate = HEAD_DEFAULTS.reduce((html, re) => html.replace(re, ""), template);

const sitemap = readFileSync(path.join(DIST, "sitemap.xml"), "utf8");
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname.replace(/\/+$/, "") || "/")
  .filter((p, i, arr) => arr.indexOf(p) === i);

const { render } = await import(pathToFileURL(SSR_ENTRY).href);

let written = 0;
const failed = [];
for (const route of routes) {
  try {
    const { html, head } = render(route);
    const page = strippedTemplate
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      .replace("</head>", `${head}\n</head>`);
    const outDir = route === "/" ? DIST : path.join(DIST, route);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(path.join(outDir, "index.html"), page);
    written++;
  } catch (err) {
    failed.push([route, err instanceof Error ? err.message : String(err)]);
  }
}

console.log(`prerender: ${written}/${routes.length} routes written to dist/`);
for (const [route, msg] of failed) console.error(`prerender: FAILED ${route}: ${msg}`);
if (failed.length) process.exit(1);
