// Tests for the location-style renderer used by generated location_page /
// neighborhood_page payloads (mirrors the foundation LocationPage design).

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GeneratedLocationLayout, {
  groupSections,
  isServiceHub,
  parseServiceHub,
} from "@/components/generated/GeneratedLocationLayout";
import type { ContentBlock, GeneratedPage } from "@/lib/generatedContent";

// Realistic neighborhood-page payload shaped like the publisher's output
// (intro paragraph + cta, an H3+paragraph+link service hub under an H2,
// an "About" section, a bare-link cross-link section, FAQs, closing cta).
const sampleBlocks: ContentBlock[] = [
  { type: "paragraph", text: "Right On serves the **Sample Heights** community." },
  { type: "cta", text: "Need a plumber in Sample Heights? Call now." },
  { type: "heading", level: 2, text: "Plumbing Services for Sample Heights Homes" },
  { type: "heading", level: 3, text: "Drain Cleaning" },
  { type: "paragraph", text: "Hard water clogs drains in Sample Heights." },
  { type: "link", text: "Drain cleaning", intent: "service:drain-cleaning" },
  { type: "heading", level: 3, text: "Leak Detection" },
  { type: "paragraph", text: "Slab leaks are common on these lots." },
  { type: "link", text: "Leak detection", intent: "service:leak-detection" },
  { type: "heading", level: 3, text: "Septic Inspection" },
  { type: "paragraph", text: "A service this site does not offer as a page." },
  { type: "link", text: "Septic inspection", intent: "service:septic-inspection" },
  { type: "heading", level: 2, text: "About Sample Heights" },
  { type: "paragraph", text: "A quiet community in the northwest valley." },
  { type: "heading", level: 2, text: "Plumbing Near Sample Heights" },
  { type: "paragraph", text: "We also serve the surrounding area." },
  { type: "link", text: "Las Vegas", intent: "location:las-vegas" },
  { type: "link", text: "Henderson", intent: "location:henderson" },
  { type: "heading", level: 2, text: "Frequently Asked Questions" },
  { type: "faq", question: "Do you serve gated streets?", answer: "Yes, with HOA check-in." },
  { type: "faq", question: "How fast can you arrive?", answer: "Usually within the hour." },
  { type: "cta", text: "Schedule trusted plumbing service in Sample Heights today." },
];

const samplePage: GeneratedPage = {
  page_title: "Plumbing in Sample Heights, Las Vegas NV",
  h1_heading: "Plumbing in Sample Heights",
  content_type: "neighborhood_page",
  town_name: "Las Vegas",
  state: "NV",
  body_content: sampleBlocks,
  faq_pairs: [
    { question: "Do you serve gated streets?", answer: "Yes, with HOA check-in." },
    { question: "How fast can you arrive?", answer: "Usually within the hour." },
  ],
  images: [
    { slot: "hero", url: "https://x.test/hero.png", alt_text: "Hero image" },
    { slot: "image_2", url: "https://x.test/second.png", alt_text: "Second image" },
  ],
};

describe("groupSections", () => {
  it("splits the block stream into sections at each H2", () => {
    const sections = groupSections(sampleBlocks);
    expect(sections.map((s) => s.heading)).toEqual([
      null, // intro before the first H2
      "Plumbing Services for Sample Heights Homes",
      "About Sample Heights",
      "Plumbing Near Sample Heights",
      "Frequently Asked Questions",
    ]);
    // Intro keeps its paragraph + cta; nothing dropped.
    expect(sections[0].blocks).toHaveLength(2);
  });
});

describe("isServiceHub / parseServiceHub", () => {
  it("classifies link-dense sections as service hubs", () => {
    const sections = groupSections(sampleBlocks);
    expect(isServiceHub(sections[1])).toBe(true); // H3+paragraph+link triplets
    expect(isServiceHub(sections[2])).toBe(false); // plain about copy
    expect(isServiceHub(sections[3])).toBe(true); // bare cross-links
  });

  it("parses H3+paragraph+link triplets into linked cards with snippets", () => {
    const hub = parseServiceHub(groupSections(sampleBlocks)[1].blocks);
    expect(hub.cards).toEqual([
      {
        title: "Drain Cleaning",
        snippet: "Hard water clogs drains in Sample Heights.",
        href: "/drainage-service/drain-cleaning",
      },
      {
        title: "Leak Detection",
        snippet: "Slab leaks are common on these lots.",
        href: "/plumber/leak-detection",
      },
      {
        // Unresolvable intent → card stays, just unlinked (never a 404 link)
        title: "Septic Inspection",
        snippet: "A service this site does not offer as a page.",
        href: null,
      },
    ]);
    expect(hub.intro).toHaveLength(0);
    expect(hub.rest).toHaveLength(0);
  });

  it("keeps section intro paragraphs out of the cards", () => {
    const hub = parseServiceHub(groupSections(sampleBlocks)[3].blocks);
    expect(hub.intro).toHaveLength(1);
    expect(hub.cards).toEqual([
      { title: "Las Vegas", snippet: "", href: "/las-vegas" },
      { title: "Henderson", snippet: "", href: "/henderson" },
    ]);
  });
});

describe("GeneratedLocationLayout rendering", () => {
  const renderLayout = (page: GeneratedPage = samplePage) =>
    render(
      <MemoryRouter>
        <GeneratedLocationLayout page={page} />
      </MemoryRouter>
    );

  it("renders section headings, service cards, and the sticky sidebar", () => {
    renderLayout();

    // H2 sections
    expect(screen.getByText("Plumbing Services for Sample Heights Homes")).toBeInTheDocument();
    expect(screen.getByText("About Sample Heights")).toBeInTheDocument();

    // Service card grid: card title links to the resolved foundation route
    const cardLink = screen.getByRole("link", { name: /Drain Cleaning/ });
    expect(cardLink).toHaveAttribute("href", "/drainage-service/drain-cleaning");
    expect(screen.getByText("Hard water clogs drains in Sample Heights.")).toBeInTheDocument();

    // Unresolvable service renders as an unlinked card, never a dead anchor
    expect(screen.queryByRole("link", { name: /Septic Inspection/ })).toBeNull();
    expect(screen.getByText("Septic Inspection")).toBeInTheDocument();

    // Sticky sidebar (LocationPage aside styling) with town/state + phone
    expect(screen.getByText("Serving Las Vegas, NV")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Request a Free Estimate in Las Vegas/ })).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("renders body FAQ blocks once and suppresses duplicate faq_pairs", () => {
    renderLayout();
    expect(screen.getAllByText("Do you serve gated streets?")).toHaveLength(1);
    expect(screen.getAllByText("Frequently Asked Questions")).toHaveLength(1);
  });

  it("excludes the hero-slot image (PageHero background) but keeps the rest inline", () => {
    renderLayout();
    expect(screen.queryByAltText("Hero image")).toBeNull();
    expect(screen.getByAltText("Second image")).toBeInTheDocument();
  });

  it("falls back to the standalone faq_pairs section when the body has no faq blocks", () => {
    const noBodyFaqs: GeneratedPage = {
      ...samplePage,
      body_content: sampleBlocks.filter((b) => b.type !== "faq"),
    };
    renderLayout(noBodyFaqs);
    expect(screen.getByText("Frequently Asked Questions — Las Vegas")).toBeInTheDocument();
    expect(screen.getByText("Do you serve gated streets?")).toBeInTheDocument();
  });
});
