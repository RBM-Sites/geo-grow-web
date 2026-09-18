// Build-time prerender entry (see scripts/prerender.mjs). Renders one route to
// static HTML with its <head> tags, so every page ships real content, title,
// description, canonical and JSON-LD in the raw response instead of an empty
// SPA shell. The client hydrates over it (src/main.tsx).
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders, AppRoutes } from "./App";

type HelmetPart = { toString(): string };
type HelmetContext = {
  helmet?: { title?: HelmetPart; meta?: HelmetPart; link?: HelmetPart; script?: HelmetPart; style?: HelmetPart };
};

export function render(url: string): { html: string; head: string } {
  const helmetContext: HelmetContext = {};
  const html = renderToString(
    <AppProviders helmetContext={helmetContext}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );
  const h = helmetContext.helmet;
  const head = h
    ? [h.title, h.meta, h.link, h.script, h.style]
        .map((part) => part?.toString() ?? "")
        .filter(Boolean)
        .join("\n")
    : "";
  return { html, head };
}
