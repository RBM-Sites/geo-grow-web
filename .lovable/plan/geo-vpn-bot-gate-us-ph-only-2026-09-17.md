# Geo + VPN + Bot Gate (US & PH only)

Screen every visitor once per browser session and block traffic from outside the US and the Philippines, plus VPN/proxy/Tor/datacenter IPs and automated browsers. If the lookup services fail, visitors are allowed through (fail open).

## One important warning before we build this

This site is built for search rankings. A blanket gate will also block Google, Bing, and AI crawlers, because they crawl from datacenter IPs and headless browsers. If they get the "Access restricted" screen instead of your pages, your pages can drop out of search results.

So the plan includes a crawler allowlist: known search-engine and social-preview crawlers skip the gate entirely and see the full site. Everything else is screened as you described.

Also worth knowing: this runs in the visitor's browser, so it is a strong spam filter, not an absolute block. A determined attacker can bypass it. Real enforcement would need a server/firewall layer later.

## What gets built

1. `src/utils/geoGate.ts` — the screening logic, exactly as specified:
   - `GateVerdict` type, `ALLOWED_COUNTRIES = new Set(["US","PH"])`, `sessionStorage` cache under `rl_geo_gate_v1`, 3.5s fetch timeout helper.
   - Primary lookup: `https://proxycheck.io/v2/?vpn=3&asn=1`, with `VITE_PROXYCHECK_KEY` appended when present.
   - Fallback: `https://ipwho.is/?fields=country_code,success` (country only).
   - Apple iCloud Private Relay and business-type connections from an allowed country stay allowed.
   - `detectAutomation()` checks `navigator.webdriver` and a `HeadlessChrome` user-agent match.
   - `checkVisitor()` order: bot check, cache, proxycheck, country fallback, else allow with reason `unknown`.
   - Added to the spec: a crawler check that returns allowed before any network call, matching googlebot, bingbot, duckduckbot, yandex, baiduspider, applebot, slurp, facebookexternalhit, twitterbot, linkedinbot, gptbot, oai-searchbot, chatgpt-user, perplexitybot, claudebot, and google-inspectiontool.

2. `src/components/GeoGate.tsx` — wrapper component.
   - While checking: a minimal neutral loading screen (no layout shift, no flash of content).
   - Blocked: a full-screen panel using the site's existing navy/orange tokens with the three messages from the spec (VPN, bot, country).
   - Allowed: renders children untouched.

3. `src/App.tsx` — wrap `BrowserRouter` (and its routes) in `<GeoGate>`, leaving providers, toasters, and Helmet as they are. No other component or page is touched.

4. Environment: reads optional `VITE_PROXYCHECK_KEY` via `import.meta.env`. No key is hardcoded. Works without the key at ProxyCheck's free anonymous rate.

## Technical notes

- The block screen is rendered instead of the router, so no route, form, or embedded widget mounts for blocked traffic.
- The session cache means one IP lookup per browser session, not per page view.
- Third-party booking/CRM embeds are unchanged; the gate only protects access through this site, not the widget's own URL.
- Verification: run the build, fix any TypeScript errors, then drive the local preview with a headless browser to confirm the bot path blocks, and simulate lookup failure to confirm the fail-open path renders the site normally.

## Open question

If you would rather have no crawler exemption at all, say so and I will drop it — but expect search visibility to fall.
