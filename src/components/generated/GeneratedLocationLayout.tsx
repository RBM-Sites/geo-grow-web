// Inner-grid renderer for generated location_page / neighborhood_page
// payloads. Renders the foundation LocationPage (src/pages/LocationPage.tsx)
// structure EXACTLY — driven by foundation data, NOT by parsing the AI's
// freeform card blocks:
//
//   - lead image + page intro paragraphs (from the AI body, before the first H2)
//   - for EACH of the 5 SERVICE_CATEGORIES, in order:
//       H2 "{cat.name} in {locale}, {state}"
//       a localized intro <p> with an inline <Link> on the category name
//       H3 "Other {cat.name} Services We Offer in {locale}"
//       the foundation chip grid linking every cat.services entry to
//       "/{cat.slug}/{service.slug}"
//   - a cross-link paragraph to the other foundation LOCATIONS
//   - FAQs from the AI payload, as the foundation bordered Q/A rows
//   - the sticky navy call-now sidebar
//
// Because the service sections come from SERVICE_CATEGORIES (never from the AI
// blocks) every chip is a real foundation route — zero blank/unlinked cards,
// exact visual parity with the hand-built location pages. The AI body supplies
// ONLY the localized prose, mapped onto the foundation categories by keyword.
//
// The page chrome (SEO/canonical, Header, PageHero with the hero-slot image,
// Breadcrumbs, CTABanner, GoogleMapEmbed, Footer, schema_json <script>) is
// rendered by the parent GeneratedPage — this component fills the <main> grid.

import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import {
  BUSINESS,
  SERVICE_CATEGORIES,
  LOCATIONS,
  getLocationBySlug,
  type ServiceCategory,
} from "@/data/business";
import { InlineText } from "./BlockRenderer";
import {
  asText,
  extractBlocks,
  normalizeFaqPairs,
  normalizeImages,
  pickHeroImage,
  type ContentBlock,
  type GeneratedPage,
} from "@/lib/generatedContent";

// ---------------------------------------------------------------------------
// Block-stream helpers (exported for unit tests)
// ---------------------------------------------------------------------------

const blockType = (block: ContentBlock) => asText(block.type).toLowerCase();

const headingLevel = (block: ContentBlock): number => {
  const raw = typeof block.level === "number" ? block.level : parseInt(asText(block.level), 10);
  return Number.isFinite(raw) ? raw : 2;
};

const headingText = (block: ContentBlock) => asText(block.text) || asText(block.heading);

const isH2 = (block: ContentBlock) => blockType(block) === "heading" && headingLevel(block) <= 2;

export interface LocationSection {
  /** H2 text that opened the section; null for the intro before the first H2. */
  heading: string | null;
  blocks: ContentBlock[];
}

/** Split the AI body block stream into sections at each H2 heading. */
export function groupSections(blocks: ContentBlock[]): LocationSection[] {
  const sections: LocationSection[] = [];
  let current: LocationSection = { heading: null, blocks: [] };
  for (const block of blocks) {
    if (isH2(block)) {
      if (current.heading !== null || current.blocks.length > 0) sections.push(current);
      current = { heading: headingText(block) || null, blocks: [] };
    } else {
      current.blocks.push(block);
    }
  }
  if (current.heading !== null || current.blocks.length > 0) sections.push(current);
  return sections;
}

/** Paragraph text from a section's blocks (drops empties). */
function sectionParagraphs(section: LocationSection): string[] {
  return section.blocks
    .filter((b) => blockType(b) === "paragraph")
    .map((b) => asText(b.text))
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// Category ⇆ AI-section matching
// ---------------------------------------------------------------------------
// The AI emits its own H2 sections (some matching the foundation categories,
// many invented — Furnace, Air Duct, Septic, Commercial…). We map each
// foundation category to the AI section whose heading best matches a keyword
// list, then borrow that section's localized prose. Matching is scored on the
// AI heading text only (not the body), so an invented section never displaces
// a real category. Whichever AI section scores highest for a category wins;
// each AI section is consumed at most once (best category claims it first).

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "drainage-service": ["drain", "sewer", "clog", "french drain"],
  plumber: [
    "plumb",
    "water heater",
    "faucet",
    "toilet",
    "repipe",
    "repiping",
    "pipe",
    "leak detection",
    "fixture",
    "gas line",
    "backflow",
    "hard water",
  ],
  "air-conditioning-contractor": [
    "ac install",
    "air conditioner install",
    "air conditioning install",
    "ac replace",
    "cooling install",
    "central ac",
    "ductless",
    "new ac",
    "air conditioning contractor",
    "ac contractor",
  ],
  "air-conditioning-repair-service": [
    "ac repair",
    "air conditioner repair",
    "air conditioning repair",
    "not cooling",
    "refrigerant",
    "compressor",
    "cooling performance",
    "component repair",
  ],
  "hvac-contractor": [
    "hvac",
    "heat pump",
    "thermostat",
    "tune up",
    "tune-up",
    "maintenance",
    "inspection",
    "indoor air quality",
    "smart control",
  ],
};

/** Score an AI heading against a category's keyword list (count of hits). */
function scoreHeading(heading: string, keywords: string[]): number {
  const h = heading.toLowerCase();
  let score = 0;
  for (const kw of keywords) if (h.includes(kw)) score += 1;
  return score;
}

/**
 * Map each foundation category slug → the best-matching AI section. Sections
 * are claimed greedily by descending best score so each AI section feeds at
 * most one category and the strongest match wins ties. Returns a Map; a
 * category with no matching section is simply absent (templated fallback used).
 */
export function matchCategorySections(
  sections: LocationSection[]
): Map<string, LocationSection> {
  const headed = sections.filter((s) => s.heading);
  // Build all (category, section, score) candidates with a positive score.
  const candidates: Array<{ cat: string; section: LocationSection; score: number }> = [];
  for (const cat of SERVICE_CATEGORIES) {
    const keywords = CATEGORY_KEYWORDS[cat.slug] ?? [];
    for (const section of headed) {
      const score = scoreHeading(section.heading as string, keywords);
      if (score > 0) candidates.push({ cat: cat.slug, section, score });
    }
  }
  // Greedy: highest score first; a section and a category are each used once.
  candidates.sort((a, b) => b.score - a.score);
  const result = new Map<string, LocationSection>();
  const usedSections = new Set<LocationSection>();
  for (const c of candidates) {
    if (result.has(c.cat) || usedSections.has(c.section)) continue;
    result.set(c.cat, c.section);
    usedSections.add(c.section);
  }
  return result;
}

// ---------------------------------------------------------------------------
// Display labels — match the foundation LocationPage headings EXACTLY
// ---------------------------------------------------------------------------
// The foundation src/pages/LocationPage.tsx uses SHORTENED display headings for
// some categories, not the raw cat.name. The H2 renders "{h2} in {city}, {state}"
// and the H3 renders "Other {h3} Services We Offer in {city}". Keyed by slug:
//   air-conditioning-contractor    → H2 "Air Conditioning Contractor", H3 "AC Contractor"
//   air-conditioning-repair-service→ H2 "Air Conditioning Repair",     H3 "AC Repair"
//   drainage-service               → H2 "Drainage Service",            H3 "Drainage"
//   plumber                        → H2 "Plumber",                     H3 "Plumbing"
//   hvac-contractor                → H2 "HVAC Contractor",             H3 "HVAC"

const CATEGORY_LABELS: Record<string, { h2: string; h3: string }> = {
  "drainage-service": { h2: "Drainage Service", h3: "Drainage" },
  plumber: { h2: "Plumber", h3: "Plumbing" },
  "air-conditioning-contractor": { h2: "Air Conditioning Contractor", h3: "AC Contractor" },
  "air-conditioning-repair-service": { h2: "Air Conditioning Repair", h3: "AC Repair" },
  "hvac-contractor": { h2: "HVAC Contractor", h3: "HVAC" },
};

/** H2 display label for a category (falls back to cat.name). */
const catH2 = (cat: ServiceCategory) => CATEGORY_LABELS[cat.slug]?.h2 ?? cat.name;

/** H3 ("Other … Services We Offer") display label (falls back to cat.name). */
const catH3 = (cat: ServiceCategory) => CATEGORY_LABELS[cat.slug]?.h3 ?? cat.name;

// ---------------------------------------------------------------------------
// Localized prose, with the category name always wrapped in its Link
// ---------------------------------------------------------------------------

/** Lower-cased category name for natural inline prose ("hvac contractor"). */
const catNoun = (cat: ServiceCategory) => cat.name.toLowerCase();

/** Templated fallback intro when no AI section matched a category. */
function fallbackCategoryIntro(cat: ServiceCategory, locale: string, state: string): string {
  const place = locale ? `${locale}, ${state}` : `the ${state} area`;
  return `${BUSINESS.name} provides professional ${catNoun(
    cat
  )} services for homeowners in ${place}. Our licensed technicians handle every job with the care and expertise ${
    locale || "local"
  } residents have trusted for years.`;
}

/**
 * Render a category's intro paragraph. The category name is ALWAYS rendered as
 * an inline <Link to="/{cat.slug}"> (foundation pattern) up front, followed by
 * the AI's localized prose (or a templated fallback). Inline AI link tokens in
 * the prose are handled by InlineText, which drops any link whose target
 * doesn't resolve to a real foundation/manifest route.
 */
const CategoryIntro = ({
  cat,
  locale,
  state,
  section,
}: {
  cat: ServiceCategory;
  locale: string;
  state: string;
  section?: LocationSection;
}) => {
  const aiParas = section ? sectionParagraphs(section).slice(0, 2) : [];
  const prose = aiParas.length > 0 ? aiParas : [fallbackCategoryIntro(cat, locale, state)];
  return (
    <>
      {prose.map((text, i) => (
        <p key={i} className="text-muted-foreground mb-4 leading-relaxed">
          {i === 0 && (
            <>
              In {locale || "the Las Vegas Valley"}, our{" "}
              <Link to={`/${cat.slug}`} className="text-secondary font-semibold hover:underline">
                {catNoun(cat)}
              </Link>{" "}
              team is ready to help.{" "}
            </>
          )}
          <InlineText text={text} />
        </p>
      ))}
    </>
  );
};

// ---------------------------------------------------------------------------
// FAQ rows — the exact bordered Q/A styling on the foundation LocationPage
// ---------------------------------------------------------------------------

const FaqRows = ({ pairs }: { pairs: Array<{ question: string; answer: string }> }) => (
  <>
    {pairs.map((faq, i) => (
      <div key={i} className="border-b border-border py-4">
        {faq.question && <h3 className="font-bold mb-1 text-sm">{faq.question}</h3>}
        {faq.answer && (
          <p className="text-muted-foreground text-sm">
            <InlineText text={faq.answer} />
          </p>
        )}
      </div>
    ))}
  </>
);

// ---------------------------------------------------------------------------
// FAQ extraction (body faq blocks → fallback to faq_pairs field)
// ---------------------------------------------------------------------------

function faqFromBlocks(blocks: ContentBlock[]): Array<{ question: string; answer: string }> {
  const faqBlocks = blocks.filter((b) => blockType(b) === "faq");
  const pairs = faqBlocks.flatMap((b) => {
    if (Array.isArray(b.pairs)) return b.pairs;
    if (Array.isArray(b.items)) return b.items;
    if (Array.isArray(b.faqs)) return b.faqs;
    return b.question || b.answer ? [{ question: b.question, answer: b.answer }] : [];
  });
  return normalizeFaqPairs(pairs);
}

/** All FAQ pairs: prefer faq_pairs field, fall back to body faq blocks. */
export function collectFaqs(page: GeneratedPage, blocks: ContentBlock[]) {
  const fromField = normalizeFaqPairs(page.faq_pairs);
  if (fromField.length > 0) return fromField;
  return faqFromBlocks(blocks);
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

const GeneratedLocationLayout = ({ page }: { page: GeneratedPage }) => {
  const blocks = extractBlocks(page.body_content) ?? [];
  const sections = groupSections(blocks);

  // Locale: neighborhood pages use the NEIGHBORHOOD as the locale (never the
  // parent city) — falling back to the title-cased slug tail, NOT town_name,
  // because town_name is the parent city (used only for breadcrumb/parent
  // context). Location pages use the town name, slug tail as fallback.
  const contentType = asText(page.content_type);
  const slugTail = asText(page.slug).split("/").filter(Boolean).pop() || "";
  const slugLabel = slugTail.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const neighborhood = asText(page.neighborhood_name);
  const town = asText(page.town_name);
  const locale =
    contentType === "neighborhood_page" ? neighborhood || slugLabel : town || slugLabel;
  const state = asText(page.state) || "NV";
  const localeLine = [locale, state].filter(Boolean).join(", ");

  // Page intro = the AI paragraphs before the first H2 (templated fallback).
  const introSection = sections.find((s) => s.heading === null);
  const introParas = introSection ? sectionParagraphs(introSection) : [];

  // Map each foundation category → its best-matching AI section (prose source).
  const categorySections = matchCategorySections(sections);

  // FAQs from the payload (faq_pairs preferred, body faq blocks fallback).
  const faqs = collectFaqs(page, blocks);

  // Lead image: a non-hero payload image (hero is the PageHero background).
  const images = normalizeImages(page.images);
  const heroImage = pickHeroImage(images);
  const leadImage = images.find((img) => img !== heroImage) ?? null;

  // Cross-link to the OTHER foundation locations. For a neighborhood whose
  // parent city is a foundation location, exclude that parent from the list.
  const parentSlug = asText(page.parent_location_slug);
  const parentLocation = parentSlug ? getLocationBySlug(parentSlug) : undefined;
  const otherLocations = LOCATIONS.filter((l) => l.slug !== parentSlug);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        {leadImage && (
          <img
            src={leadImage.url}
            alt={leadImage.alt || `${BUSINESS.name} serving ${locale || "the Las Vegas Valley"}`}
            className="rounded-lg w-full h-64 object-cover mb-6"
            loading="eager"
            width="800"
            height="400"
          />
        )}

        {/* Page intro */}
        {introParas.length > 0 ? (
          introParas.map((text, i) => (
            <p key={i} className="text-muted-foreground mb-4 leading-relaxed">
              <InlineText text={text} />
            </p>
          ))
        ) : (
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {BUSINESS.name} provides trusted {BUSINESS.industry.toLowerCase()} services for{" "}
            {locale || "Las Vegas Valley"} homeowners. From emergency repairs to new installations,
            our licensed technicians keep your home comfortable year-round in {state}'s demanding
            desert climate.
          </p>
        )}

        {/* Foundation service categories — driven by SERVICE_CATEGORIES */}
        {SERVICE_CATEGORIES.map((cat) => (
          <div key={cat.slug}>
            <h2 className="text-2xl font-bold mb-3">
              {catH2(cat)} in {localeLine || "the Las Vegas Valley"}
            </h2>
            <CategoryIntro
              cat={cat}
              locale={locale}
              state={state}
              section={categorySections.get(cat.slug)}
            />
            <h3 className="text-lg font-semibold mb-2">
              Other {catH3(cat)} Services We Offer{locale ? ` in ${locale}` : ""}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {cat.services.map((s) => (
                <Link
                  key={s.slug}
                  to={`/${cat.slug}/${s.slug}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-accent transition-colors text-sm font-medium"
                >
                  <span className="text-secondary">→</span> {s.name}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Cross-linking to the other foundation locations */}
        {otherLocations.length > 0 && (
          <p className="text-muted-foreground mb-6 leading-relaxed">
            We also proudly serve nearby communities — if you have family or neighbors in{" "}
            {otherLocations.map((loc, i) => (
              <span key={loc.slug}>
                {i > 0 && (i === otherLocations.length - 1 ? " and " : ", ")}
                <Link to={`/${loc.slug}`} className="text-secondary font-semibold hover:underline">
                  {loc.city}
                </Link>
              </span>
            ))}
            {parentLocation && (
              <>
                {" "}— and right here in{" "}
                <Link
                  to={`/${parentLocation.slug}`}
                  className="text-secondary font-semibold hover:underline"
                >
                  {parentLocation.city}
                </Link>
              </>
            )}
            , we offer the same reliable service throughout the Las Vegas Valley.{" "}
            <Link to="/contact" className="text-secondary font-semibold hover:underline">
              Contact us to schedule a free estimate
            </Link>{" "}
            or call{" "}
            <a href={`tel:${BUSINESS.phone}`} className="text-secondary font-semibold hover:underline">
              {BUSINESS.phoneFormatted}
            </a>{" "}
            today.
          </p>
        )}

        {/* FAQs (only when the payload actually provides them) */}
        {faqs.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Frequently Asked Questions{locale ? ` — ${locale}` : ""}
            </h2>
            <FaqRows pairs={faqs} />
          </>
        )}
      </div>

      <aside>
        <div className="bg-brand-navy text-primary-foreground rounded-lg p-6 sticky top-24">
          <h3 className="text-xl font-bold mb-3">
            {localeLine ? `Serving ${localeLine}` : "Serving the Las Vegas Valley"}
          </h3>
          <p className="text-sm opacity-80 mb-4">
            Call {BUSINESS.phoneFormatted} for {BUSINESS.industry} services
            {localeLine ? ` in ${localeLine}` : ""}.
          </p>
          <a
            href={`tel:${BUSINESS.phone}`}
            className="cta-gradient text-secondary-foreground w-full py-3 rounded-md font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Phone className="h-5 w-5" /> {BUSINESS.phoneFormatted}
          </a>
          <Link
            to="/contact"
            className="block text-center mt-3 text-sm underline opacity-80 hover:opacity-100"
          >
            Request a Free Estimate{locale ? ` in ${locale}` : ""}
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default GeneratedLocationLayout;
