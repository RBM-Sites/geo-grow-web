// Static server for the prerendered build. No dependencies.
//
//   1. exact file under dist/            → serve it (hashed /assets get long cache)
//   2. dist/<route>/index.html exists    → the prerendered page
//   3. otherwise                         → dist/__spa.html, the plain SPA shell,
//                                          so the client router shows its 404
//
// Step 2 is why this exists instead of `serve -s`: it must serve the
// prerendered page for `/paradise` without redirecting to `/paradise/`
// (a 301 there would contradict every canonical tag).

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

    if (isFile(target)) return send(res, target);
    const prerendered = path.join(target, "index.html");
    if (isFile(prerendered)) return send(res, prerendered);
    return send(res, path.join(DIST, "__spa.html"));
  })
  .listen(PORT, "0.0.0.0", () => console.log(`serving dist/ on :${PORT}`));
