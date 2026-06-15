// Tests for the location-style renderer used by generated location_page /
// neighborhood_page payloads. The renderer now mirrors the foundation
// LocationPage structure EXACTLY, driven by SERVICE_CATEGORIES (not by parsing
// the AI's freeform card blocks): every service section is the foundation
// chip grid of real /{category}/{service} routes, so there are never blank or
// unlinked service cards. The AI body supplies only the localized prose.

import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GeneratedLocationLayout, {
  groupSections,
  matchCategorySections,
  collectFaqs,
} from "@/components/generated/GeneratedLocationLayout";
import { SERVICE_CATEGORIES } from "@/data/business";
import type { ContentBlock, GeneratedPage } from "@/lib/generatedContent";

// A Paradise-like payload: an intro before the first H2, AI H2 sections that
// match the foundation categories (plus invented sections to ignore), a
// near-by cross-link section, and FAQ pairs.
const sampleBlocks: ContentBlock[] = [
  { type: "paragraph", text: "When a pipe bursts on a 110°F afternoon, **Right On** is already nearby." },
  { type: "paragraph", text: "From mid-century homes to high-rise condos, we serve every Paradise property." },

  { type: "heading", level: 2, text: "Drainage Service in Paradise" },
  { type: "paragraph", text: "Paradise's hard water and aging sewer infrastructure cause frequent clogs." },

  { type: "heading", level: 2, text: "Plumbing Services in Paradise" },
  { type: "paragraph", text: "Our Paradise plumbers handle water heaters, repiping, and leak detection." },

  { type: "heading", level: 2, text: "Air Conditioning Installation in Paradise" },
  { type: "paragraph", text: "We install central AC and ductless systems sized for the Paradise heat." },

  { type: "heading", level: 2, text: "Air Conditioning Repair in Paradise" },
  { type: "paragraph", text: "When your AC is not cooling, our techs fix refrigerant and compressor faults fast." },

  { type: "heading", level: 2, text: "HVAC Contractor Services in Paradise" },
  { type: "paragraph", text: "HVAC tune-ups, thermostats, and indoor air quality for Paradise homes." },

  // Invented sections the renderer must IGNORE (no foundation category).
  { type: "heading", level: 2, text: "Septic System Service in Paradise" },
  { type: "paragraph", text: "Septic pumping and inspection — not a foundation service." },
  { type: "heading", level: 2, text: "Furnace Repair in Paradise" },
  { type: "paragraph", text: "Furnace component repairs — not a foundation service." },

  { type: "heading", level: 2, text: "Plumbing, Heating & Air Near Paradise" },
  { type: "paragraph", text: "From our Paradise base we also serve neighboring communities." },
  { type: "link", text: "Las Vegas", intent: "location:las-vegas" },
  { type: "link", text: "Enterprise", intent: "location:enterprise" },
];

const samplePage: GeneratedPage = {
  page_title: "Plumbing in Paradise, NV | Right On Plumbing",
  h1_heading: "Plumbing in Paradise",
  content_type: "location_page",
  town_name: "Paradise",
  state: "NV",
  body_content: sampleBlocks,
  faq_pairs: [
    { question: "Do you offer emergency plumbing service in Paradise?", answer: "Yes, 24/7." },
    { question: "How fast can you arrive?", answer: "Usually within the hour." },
  ],
  images: [
    { slot: "hero", url: "https://x.test/hero.png", alt_text: "Hero image" },
    { slot: "image_2", url: "https://x.test/second.png", alt_text: "Second image" },
  ],
};

describe("groupSections", () => {
  it("splits the AI block stream into sections at each H2", () => {
    const sections = groupSections(sampleBlocks);
    expect(sections[0].heading).toBeNull(); // intro before the first H2
    expect(sections[0].blocks).toHaveLength(2); // both intro paragraphs kept
    expect(sections.map((s) => s.heading)).toContain("Drainage Service in Paradise");
    expect(sections.map((s) => s.heading)).toContain("Septic System Service in Paradise");
  });
});

describe("matchCategorySections", () => {
  it("maps each foundation category to its best AI section by keyword", () => {
    const matches = matchCategorySections(groupSections(sampleBlocks));
    expect(matches.get("drainage-service")?.heading).toBe("Drainage Service in Paradise");
    expect(matches.get("plumber")?.heading).toBe("Plumbing Services in Paradise");
    expect(matches.get("air-conditioning-contractor")?.heading).toBe(
      "Air Conditioning Installation in Paradise"
    );
    expect(matches.get("air-conditioning-repair-service")?.heading).toBe(
      "Air Conditioning Repair in Paradise"
    );
    expect(matches.get("hvac-contractor")?.heading).toBe("HVAC Contractor Services in Paradise");
  });

  it("claims each AI section for at most one category", () => {
    const matches = matchCategorySections(groupSections(sampleBlocks));
    const used = [...matches.values()];
    expect(new Set(used).size).toBe(used.length);
  });

  it("leaves a category unmatched when no AI section fits", () => {
    const onlyDrain = groupSections([
      { type: "heading", level: 2, text: "Drainage Service in Town" },
      { type: "paragraph", text: "Drains." },
    ]);
    const matches = matchCategorySections(onlyDrain);
    expect(matches.has("drainage-service")).toBe(true);
    expect(matches.has("hvac-contractor")).toBe(false);
  });
});

describe("collectFaqs", () => {
  it("prefers the faq_pairs field", () => {
    expect(collectFaqs(samplePage, sampleBlocks)).toHaveLength(2);
  });

  it("falls back to body faq blocks when faq_pairs is empty", () => {
    const page: GeneratedPage = {
      ...samplePage,
      faq_pairs: [],
      body_content: [
        ...sampleBlocks,
        { type: "faq", question: "Body Q?", answer: "Body A." },
      ],
    };
    const faqs = collectFaqs(page, page.body_content as ContentBlock[]);
    expect(faqs).toEqual([{ question: "Body Q?", answer: "Body A." }]);
  });
});

describe("GeneratedLocationLayout rendering", () => {
  const renderLayout = (page: GeneratedPage = samplePage) =>
    render(
      <MemoryRouter>
        <GeneratedLocationLayout page={page} />
      </MemoryRouter>
    );

  // Display labels match the foundation LocationPage headings EXACTLY — some
  // are shortened from the raw cat.name (keyed by slug). H2 = "{h2} in {city}",
  // H3 = "Other {h3} Services We Offer in {city}".
  const CATEGORY_DISPLAY: Record<string, { h2: string; h3: string }> = {
    "drainage-service": { h2: "Drainage Service", h3: "Drainage" },
    plumber: { h2: "Plumber", h3: "Plumbing" },
    "air-conditioning-contractor": { h2: "Air Conditioning Contractor", h3: "AC Contractor" },
    "air-conditioning-repair-service": { h2: "Air Conditioning Repair", h3: "AC Repair" },
    "hvac-contractor": { h2: "HVAC Contractor", h3: "HVAC" },
  };

  it("renders all 5 foundation category H2 sections with the foundation display labels", () => {
    renderLayout();
    for (const cat of SERVICE_CATEGORIES) {
      const { h2 } = CATEGORY_DISPLAY[cat.slug];
      expect(screen.getByText(`${h2} in Paradise, NV`)).toBeInTheDocument();
    }
  });

  it("renders the shortened H3 'Other … Services We Offer' display labels", () => {
    renderLayout();
    for (const cat of SERVICE_CATEGORIES) {
      const { h3 } = CATEGORY_DISPLAY[cat.slug];
      expect(
        screen.getByText(`Other ${h3} Services We Offer in Paradise`)
      ).toBeInTheDocument();
    }
  });

  it("renders every service chip as a real /{category}/{service} foundation link — no blank or unlinked cards", () => {
    const { container } = renderLayout();
    for (const cat of SERVICE_CATEGORIES) {
      for (const svc of cat.services) {
        const link = screen.getByRole("link", { name: new RegExp(`^\\s*→?\\s*${svc.name}\\s*$`) });
        expect(link).toHaveAttribute("href", `/${cat.slug}/${svc.slug}`);
      }
    }
    // No chip-styled <span> stand-ins (every service is a real link, never a
    // dead/blank card). The only chip styling on the page is the service links.
    const chipSpans = container.querySelectorAll("span.bg-muted");
    expect(chipSpans).toHaveLength(0);
  });

  it("does NOT render the AI's invented (non-foundation) service sections", () => {
    renderLayout();
    expect(screen.queryByText(/Septic System Service in Paradise/)).toBeNull();
    expect(screen.queryByText(/Furnace Repair in Paradise/)).toBeNull();
  });

  it("wraps each category name in its inline category link", () => {
    renderLayout();
    // The inline category link uses the lower-cased category noun.
    const drainLink = screen.getByRole("link", { name: "drainage service" });
    expect(drainLink).toHaveAttribute("href", "/drainage-service");
    const hvacLink = screen.getByRole("link", { name: "hvac contractor" });
    expect(hvacLink).toHaveAttribute("href", "/hvac-contractor");
  });

  it("renders FAQ rows from faq_pairs and the sticky sidebar", () => {
    renderLayout();
    expect(screen.getByText("Frequently Asked Questions — Paradise")).toBeInTheDocument();
    expect(screen.getByText("Do you offer emergency plumbing service in Paradise?")).toBeInTheDocument();
    expect(screen.getByText("Serving Paradise, NV")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Request a Free Estimate in Paradise/ })).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("excludes the hero-slot image (PageHero background) and uses the next image as the lead", () => {
    renderLayout();
    expect(screen.queryByAltText("Hero image")).toBeNull();
    expect(screen.getByAltText("Second image")).toBeInTheDocument();
  });

  it("renders gracefully with a minimal payload (no images, no matching AI sections, no FAQs)", () => {
    const minimal: GeneratedPage = {
      content_type: "location_page",
      slug: "spring-valley",
      state: "NV",
      body_content: [],
    };
    expect(() => renderLayout(minimal)).not.toThrow();
    // Locale derived from the slug; all 5 categories still render with templated intros.
    for (const cat of SERVICE_CATEGORIES) {
      const { h2 } = CATEGORY_DISPLAY[cat.slug];
      expect(screen.getByText(`${h2} in Spring Valley, NV`)).toBeInTheDocument();
    }
    // No FAQ heading when the payload provides none.
    expect(screen.queryByText(/Frequently Asked Questions/)).toBeNull();
    // Service chips still resolve to real foundation routes.
    const firstSvc = SERVICE_CATEGORIES[0].services[0];
    const link = screen.getByRole("link", { name: new RegExp(`${firstSvc.name}`) });
    expect(link).toHaveAttribute("href", `/${SERVICE_CATEGORIES[0].slug}/${firstSvc.slug}`);
  });

  it("uses the neighborhood name as the locale for neighborhood pages", () => {
    const hood: GeneratedPage = {
      content_type: "neighborhood_page",
      slug: "wyeth-ranch",
      neighborhood_name: "Wyeth Ranch",
      town_name: "Las Vegas",
      parent_location_slug: "las-vegas",
      state: "NV",
      body_content: [],
    };
    renderLayout(hood);
    expect(screen.getByText("Drainage Service in Wyeth Ranch, NV")).toBeInTheDocument();
    expect(screen.getByText("Serving Wyeth Ranch, NV")).toBeInTheDocument();
    // The parent foundation city is excluded from the "other locations" list
    // but cross-linked as the home base.
    const aside = screen.getByText("Serving Wyeth Ranch, NV");
    expect(aside).toBeInTheDocument();
  });

  it("derives the neighborhood locale from the slug tail (not town_name) when neighborhood_name is null", () => {
    // Mirrors the real committed payload src/content/pages/las-vegas/wyeth-ranch.json:
    // neighborhood_name is null and town_name is the PARENT city "Las Vegas".
    // The locale must be the neighborhood ("Wyeth Ranch" from the slug), never
    // the parent town.
    const hood: GeneratedPage = {
      content_type: "neighborhood_page",
      slug: "las-vegas/wyeth-ranch",
      neighborhood_name: null,
      town_name: "Las Vegas",
      state: "NV",
      body_content: [],
    };
    renderLayout(hood);
    expect(screen.getByText("Drainage Service in Wyeth Ranch, NV")).toBeInTheDocument();
    expect(screen.getByText("Serving Wyeth Ranch, NV")).toBeInTheDocument();
    // town_name (parent city) must NOT leak into the locale headings.
    expect(screen.queryByText("Drainage Service in Las Vegas, NV")).toBeNull();
    expect(screen.queryByText("Serving Las Vegas, NV")).toBeNull();
  });
});
