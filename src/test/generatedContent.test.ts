import { describe, it, expect, vi, afterEach } from "vitest";
import {
  bareBlogSlug,
  buildPageMap,
  demoteH1Headings,
  extractBlocks,
  getBlogBySlug,
  getPageBySlug,
  listEntries,
  normalizeFaqPairs,
  normalizeImages,
  normalizeSchemaJson,
  parseContentModule,
  resolveIntent,
  resolveIntentWith,
  splitTextWithLinkTokens,
  type ManifestEntry,
} from "@/lib/generatedContent";

describe("generatedContent loader", () => {
  // The publisher has committed real content, so the manifest is no longer
  // empty — assert well-formedness instead of a fixed snapshot so future
  // publishes can't break the suite.
  it("loads only well-formed manifest entries", () => {
    for (const entry of listEntries()) {
      expect(typeof entry.slug).toBe("string");
      expect(entry.slug.length).toBeGreaterThan(0);
    }
  });

  it("every committed page is reachable through its manifest entry", () => {
    for (const entry of listEntries()) {
      const payload =
        entry.content_type === "blog_post" ? getBlogBySlug(entry.slug) : getPageBySlug(entry.slug);
      expect(payload, `payload missing for manifest slug "${entry.slug}"`).not.toBeNull();
    }
  });

  it("returns null for unknown or unsafe slugs", () => {
    expect(getPageBySlug("does-not-exist")).toBeNull();
    expect(getBlogBySlug("does-not-exist")).toBeNull();
    expect(getPageBySlug("../secrets")).toBeNull();
    expect(getPageBySlug("")).toBeNull();
  });

  it("strips legacy blog/ prefixes", () => {
    expect(bareBlogSlug("blog/my-post")).toBe("my-post");
    expect(bareBlogSlug("/blog/my-post")).toBe("my-post");
    expect(bareBlogSlug("my-post")).toBe("my-post");
  });
});

describe("resolveIntent", () => {
  it("resolves service intents against foundation service routes", () => {
    expect(resolveIntent("service:drain-cleaning")).toBe("/drainage-service/drain-cleaning");
    expect(resolveIntent("service:ac-repair")).toBe("/air-conditioning-repair-service/ac-repair");
  });

  it("resolves two-segment category/service intents against foundation routes", () => {
    expect(resolveIntent("service:plumber/water-heater-replacement")).toBe(
      "/plumber/water-heater-replacement"
    );
    // Category half doesn't exist on this site → fall back to the bare
    // service slug under its real foundation category.
    expect(resolveIntent("service:furnace-repair-service/heat-pump-repair")).toBe(
      "/hvac-contractor/heat-pump-repair"
    );
    // Neither half exists → null (rendered as plain text, never a 404 link)
    expect(resolveIntent("service:septic-system-service/septic-tank-pumping")).toBeNull();
  });

  it("resolves category and location intents against foundation routes", () => {
    expect(resolveIntent("category:plumber")).toBe("/plumber");
    expect(resolveIntent("location:henderson")).toBe("/henderson");
    // location slug with a trailing state code falls back to the bare city slug
    expect(resolveIntent("location:henderson-nv")).toBe("/henderson");
  });

  it("returns null for unresolvable intents (rendered as plain text)", () => {
    expect(resolveIntent("service:not-a-real-service")).toBeNull();
    expect(resolveIntent("")).toBeNull();
    expect(resolveIntent(undefined)).toBeNull();
    expect(resolveIntent(42)).toBeNull();
  });
});

describe("resolveIntentWith resolution order", () => {
  const hasPayload = () => true;

  it("foundation route beats fuzzy manifest matches (henderson hijack)", () => {
    // A fuzzy (substring) manifest hit like /henderson-plumbing-tips must NOT
    // hijack the foundation /henderson location page.
    const manifest: ManifestEntry[] = [
      { slug: "henderson-plumbing-tips", content_type: "location_page" },
    ];
    expect(resolveIntentWith("location:henderson", manifest, hasPayload)).toBe("/henderson");
  });

  it("exact manifest slug match beats foundation routes", () => {
    const manifest: ManifestEntry[] = [{ slug: "henderson", content_type: "blog_post" }];
    expect(resolveIntentWith("location:henderson", manifest, hasPayload)).toBe("/blog/henderson");
  });

  it("foundation route beats manifest tail match", () => {
    const manifest: ManifestEntry[] = [
      { slug: "guides/henderson", content_type: "location_page" },
    ];
    expect(resolveIntentWith("location:henderson", manifest, hasPayload)).toBe("/henderson");
  });

  it("manifest tail match beats substring match", () => {
    // "drain-tips" has no foundation route, so manifest fuzzy matching applies.
    const manifest: ManifestEntry[] = [
      { slug: "misc/drain-tips-archive", content_type: "location_page" },
      { slug: "guides/drain-tips", content_type: "location_page" },
    ];
    expect(resolveIntentWith("topic:drain-tips", manifest, hasPayload)).toBe("/guides/drain-tips");
  });

  it("falls back to substring match when nothing else hits", () => {
    const manifest: ManifestEntry[] = [
      { slug: "misc/drain-tips-archive", content_type: "location_page" },
    ];
    expect(resolveIntentWith("topic:drain-tips", manifest, hasPayload)).toBe("/misc/drain-tips-archive");
  });

  it("manifest ghosts (entry without payload) never resolve to a link", () => {
    const noPayload = () => false;
    const manifest: ManifestEntry[] = [
      { slug: "plumbing-tips", content_type: "location_page" }, // exact
      { slug: "guides/plumbing-tips", content_type: "location_page" }, // tail
      { slug: "misc/plumbing-tips-archive", content_type: "location_page" }, // substring
    ];
    expect(resolveIntentWith("topic:plumbing-tips", manifest, noPayload)).toBeNull();
    // …but a ghost still falls through to the foundation route when one exists
    const ghostHenderson: ManifestEntry[] = [{ slug: "henderson", content_type: "location_page" }];
    expect(resolveIntentWith("location:henderson", ghostHenderson, noPayload)).toBe("/henderson");
  });
});

describe("defensive normalizers", () => {
  it("normalizeSchemaJson accepts valid strings and objects, rejects junk", () => {
    expect(normalizeSchemaJson('{"@type":"FAQPage"}')).toBe('{"@type":"FAQPage"}');
    expect(normalizeSchemaJson({ "@type": "BlogPosting" })).toBe('{"@type":"BlogPosting"}');
    expect(normalizeSchemaJson("not json {")).toBeNull();
    expect(normalizeSchemaJson("")).toBeNull();
    expect(normalizeSchemaJson(null)).toBeNull();
    // "<" is escaped so payloads can never break out of the script tag
    expect(normalizeSchemaJson('{"x":"</script>"}')).not.toContain("</script>");
  });

  it("extractBlocks handles arrays, {blocks}, and junk", () => {
    expect(extractBlocks([{ type: "paragraph", text: "hi" }])).toHaveLength(1);
    expect(extractBlocks({ blocks: [{ type: "heading" }] })).toHaveLength(1);
    expect(extractBlocks("a string")).toBeNull();
    expect(extractBlocks(null)).toBeNull();
    expect(extractBlocks([])).toBeNull();
  });

  it("normalizeImages keeps only entries with a usable url", () => {
    const images = normalizeImages([
      { slot: "hero", url: "https://x.test/a.jpg", alt_text: "A" },
      { slot: "inline", url: "" },
      null,
      "junk",
    ]);
    expect(images).toEqual([{ url: "https://x.test/a.jpg", alt: "A", slot: "hero" }]);
  });

  it("normalizeFaqPairs drops empty pairs", () => {
    expect(normalizeFaqPairs([{ question: "Q", answer: "A" }, { question: "", answer: "" }, null])).toEqual([
      { question: "Q", answer: "A" },
    ]);
  });

  it("splitTextWithLinkTokens substitutes tokens with anchor text", () => {
    const token = '{"anchor_text":"drain cleaning","intent":"service:drain-cleaning"}';
    const segments = splitTextWithLinkTokens(`Call us for ${token} today.`);
    expect(segments).toEqual([
      { kind: "text", text: "Call us for " },
      { kind: "link", text: "drain cleaning", href: "/drainage-service/drain-cleaning" },
      { kind: "text", text: " today." },
    ]);
  });
});

describe("malformed publisher JSON never breaks the bundle", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("parseContentModule parses valid raw strings and rejects broken ones with a warning", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(parseContentModule('{"page_title":"Good"}', "good.json")).toEqual({ page_title: "Good" });
    expect(warn).not.toHaveBeenCalled();
    expect(parseContentModule('{"page_title": broken', "bad.json")).toBeNull();
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain("bad.json");
  });

  it("parseContentModule unwraps { default } module namespaces", () => {
    expect(parseContentModule({ default: '{"a":1}' }, "x.json")).toEqual({ a: 1 });
  });

  it("buildPageMap skips a broken JSON file but keeps the valid ones", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const modules = {
      "../content/pages/good.json": '{"page_title":"Good"}',
      "../content/pages/broken.json": '{"page_title": "unterminated',
      "../content/pages/drainage-service/nested.json": '{"page_title":"Nested"}',
      "../content/pages/not-an-object.json": '["array payload"]',
    };
    const map = buildPageMap(modules, "pages");
    expect(map.get("good")?.page_title).toBe("Good");
    expect(map.get("drainage-service/nested")?.page_title).toBe("Nested");
    expect(map.has("broken")).toBe(false);
    expect(map.has("not-an-object")).toBe(false);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain("broken.json");
  });
});

describe("demoteH1Headings", () => {
  it("demotes embedded h1 tags (any casing/attributes) to h2", () => {
    expect(demoteH1Headings("<h1>Title</h1><p>x</p>")).toBe("<h2>Title</h2><p>x</p>");
    expect(demoteH1Headings('<H1 class="big">Title</H1>')).toBe('<h2 class="big">Title</h2>');
    expect(demoteH1Headings("<h1\n>multi</h1 >")).toBe("<h2\n>multi</h2>");
  });

  it("leaves other tags untouched", () => {
    expect(demoteH1Headings("<h2>ok</h2><h10>weird</h10>")).toBe("<h2>ok</h2><h10>weird</h10>");
    expect(demoteH1Headings("")).toBe("");
  });
});
