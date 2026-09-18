// Build-time prerender. Runs after `vite build` (client → dist/) and
// `vite build --ssr` (→ dist-ssr/). Renders every real route to static HTML:
//
//   /                 → dist/__home.html
//   /paradise         → dist/paradise/index.html
//   /blog/some-post   → dist/blog/some-post/index.html
//
// dist/index.html is left as the untouched SPA shell on purpose. SPA-fallback
// servers (`serve -s`, `vite preview`) rewrite every extensionless URL to
// index.html BEFORE looking for <route>/index.html, so if the homepage lived
// there, a wrong start command would serve the homepage — and its canonical —
// for every URL on the site. With the shell there, the worst case under a wrong
// start command is the pre-prerender behaviour; the prerendered pages only
// take effect behind server.js (or a static server without SPA fallback).
//
// dist/404.html is the shell too, for static hosts that honour it.

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
writeFileSync(path.join(DIST, "404.html"), template);

// Helmet supplies these per page; drop the template's site-wide defaults so a
// prerendered page doesn't carry two <title>s / two descriptions.
const HEAD_DEFAULTS = [
  /\s*<title>[\s\S]*?<\/title>/i,
  /\s*<meta\s+name="description"[^>]*>/gi,
  /\s*<meta\s+property="og:[^"]*"[^>]*>/gi,
  /\s*<meta\s+name="twitter:[^"]*"[^>]*>/gi,
];
const strippedTemplate = HEAD_DEFAULTS.reduce((html, re) => html.replace(re, ""), template);

// Every URL the site serves: the sitemap (foundation + published content) plus
// the two real routes it deliberately omits — /blog while it has no posts and
// /thank-you (noindex). Prerendering those too means anything else is a
// genuine 404, which server.js can then answer with a real 404 status.
const sitemap = readFileSync(path.join(DIST, "sitemap.xml"), "utf8");
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname.replace(/\/+$/, "") || "/")
  .concat(["/blog", "/thank-you"])
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
    const outFile = route === "/" ? path.join(DIST, "__home.html") : path.join(DIST, route, "index.html");
    mkdirSync(path.dirname(outFile), { recursive: true });
    writeFileSync(outFile, page);
    written++;
  } catch (err) {
    failed.push([route, err instanceof Error ? err.message : String(err)]);
  }
}

console.log(`prerender: ${written}/${routes.length} routes written to dist/`);
for (const [route, msg] of failed) console.error(`prerender: FAILED ${route}: ${msg}`);
if (failed.length) process.exit(1);
