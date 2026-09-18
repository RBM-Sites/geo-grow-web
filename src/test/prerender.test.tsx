// @vitest-environment node
import { describe, expect, it } from "vitest";
import { render } from "@/entry-server";

// Guards the build-time prerender: every page must ship its content and SEO
// tags in raw HTML. If a component starts touching window/document during
// render, these fail before a deploy does.
describe("build-time prerender", () => {
  it("renders a foundation location page with h1, title and canonical", () => {
    const { html, head } = render("/las-vegas");
    expect(html).toMatch(/<h1[\s>]/);
    expect(head).toMatch(/<title[^>]*>[^<]+<\/title>/);
    expect(head).toContain('rel="canonical"');
    expect(head).toContain('name="description"');
  });

  it("renders a publisher-committed page from the manifest with its JSON-LD", () => {
    const { html, head } = render("/paradise");
    expect(html).toMatch(/<h1[\s>]/);
    expect(head).toContain('rel="canonical"');
    expect(head).toContain("application/ld+json");
  });

  it("renders the 404 page for an unknown route", () => {
    const { html } = render("/definitely-not-a-page");
    expect(html).toMatch(/404|not found/i);
  });
});
