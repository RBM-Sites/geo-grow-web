// Static server for the prerendered build. No dependencies.
//
//   /                              → dist/__home.html   (prerendered homepage)
//   exact file under dist/         → serve it (hashed /assets get long cache)
//   dist/<route>/index.html exists → the prerendered page
//   otherwise                      → dist/index.html, the plain SPA shell, with a
//                                    404 status; the client router renders its
//                                    404 page. Every real route is prerendered
//                                    (scripts/prerender.mjs), so anything else
//                                    genuinely doesn't exist.
//
// Why not `serve -s dist`: SPA-fallback servers rewrite every extensionless
// URL to index.html before looking for <route>/index.html, so the prerendered
// pages are never served. `serve -s` also 301s /paradise → /paradise/, which
// contradicts every canonical tag.

import http from "node:http";
import { createReadStream, statSync } from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");
const PORT = Number(process.env.PORT) || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
};

function isFile(p) {
  try {
    return statSync(p).isFile();
  } catch {
    return false;
  }
}

function send(res, file, status = 200) {
  const ext = path.extname(file).toLowerCase();
  const immutable = file.includes(`${path.sep}assets${path.sep}`);
  res.writeHead(status, {
    "Content-Type": MIME[ext] || "application/octet-stream",
    "Cache-Control": immutable ? "public, max-age=31536000, immutable" : "no-cache",
  });
  createReadStream(file).pipe(res);
}

const SHELL = path.join(DIST, "index.html");
const HOME = path.join(DIST, "__home.html");

http
  .createServer((req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    } catch {
      res.writeHead(400).end();
      return;
    }
    const safe = path.normalize(pathname).replace(/^(\.\.[/\\])+/, "");
    const target = path.join(DIST, safe);
    if (!target.startsWith(DIST)) {
      res.writeHead(403).end();
      return;
    }

    if (safe === "/" || safe === path.sep) return send(res, isFile(HOME) ? HOME : SHELL);
    if (isFile(target)) return send(res, target);
    const prerendered = path.join(target, "index.html");
    if (isFile(prerendered)) return send(res, prerendered);
    return send(res, SHELL, 404);
  })
  .listen(PORT, "0.0.0.0", () => console.log(`serving dist/ on :${PORT}`));
