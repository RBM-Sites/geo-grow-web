// Location-style renderer for generated location_page / neighborhood_page
// payloads. Mirrors the foundation LocationPage (src/pages/LocationPage.tsx)
// visual design exactly:
//   - two-column main grid (content + sticky call-now sidebar)
//   - body blocks grouped into sections at each H2 heading
//   - link-dense sections (the publisher's H3 + paragraph + link service hub
//     triplets) rendered as the foundation's service card grid; sections of
//     bare links (no snippets) use LocationPage's chip-link grid instead
//   - FAQ blocks rendered as the same bordered Q/A rows LocationPage uses
//   - everything else falls through to BlockRenderer so no block is dropped
// The hero-slot image is consumed upstream by GeneratedPage as the PageHero
// background (like the foundation hero), so it is excluded from inline images.

import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { BUSINESS } from "@/data/business";
import BlockRenderer, { collectFaqPairs, InlineText, SmartLink } from "./BlockRenderer";
import {
  asText,
  extractBlocks,
  normalizeFaqPairs,
  normalizeImages,
  pickHeroImage,
  resolveIntent,
  type ContentBlock,
  type GeneratedPage,
} from "@/lib/generatedContent";

// ---------------------------------------------------------------------------
// Block-stream → section grouping (exported for unit tests)
// ---------------------------------------------------------------------------

export interface LocationSection {
  /** H2 text that opened the section; null for the intro before the first H2. */
  heading: string | null;
  blocks: ContentBlock[];
}

const blockType = (block: ContentBlock) => asText(block.type).toLowerCase();

const headingLevel = (block: ContentBlock): number => {
  const raw = typeof block.level === "number" ? block.level : parseInt(asText(block.level), 10);
  return Number.isFinite(raw) ? raw : 2;
};

const headingText = (block: ContentBlock) => asText(block.text) || asText(block.heading);

/** Split the body block stream into sections at each H2 heading. */
export function groupSections(blocks: ContentBlock[]): LocationSection[] {
  const sections: LocationSection[] = [];
  let current: LocationSection = { heading: null, blocks: [] };
  for (const block of blocks) {
    if (blockType(block) === "heading" && headingLevel(block) <= 2) {
      if (current.heading !== null || current.blocks.length > 0) sections.push(current);
      current = { heading: headingText(block) || null, blocks: [] };
    } else {
      current.blocks.push(block);
    }
  }
  if (current.heading !== null || current.blocks.length > 0) sections.push(current);
  return sections;
}

/** A section with 2+ link blocks is a service hub → rendered as a card grid. */
export function isServiceHub(section: LocationSection): boolean {
  return section.blocks.filter((b) => blockType(b) === "link").length >= 2;
}

export interface ServiceCard {
  title: string;
  snippet: string;
  href: string | null;
}

export interface ParsedServiceHub {
  /** Blocks before the first H3/link — the section's intro copy. */
  intro: ContentBlock[];
  cards: ServiceCard[];
  /** Blocks that aren't part of a card pattern (cta/faq/list/blockquote…). */
  rest: ContentBlock[];
}

/**
 * Parse a link-dense section into service cards. Recognizes the publisher's
 * H3 + paragraph(s) + link triplets, plus bare link blocks (card title from
 * the link text, snippet from its context field). Cards whose link intent
 * doesn't resolve render unlinked — never a dead anchor.
 */
export function parseServiceHub(blocks: ContentBlock[]): ParsedServiceHub {
  const intro: ContentBlock[] = [];
  const rest: ContentBlock[] = [];
  const cards: ServiceCard[] = [];
  let pending: { title: string; snippets: string[] } | null = null;
  let seenCardStart = false;

  const flushPending = () => {
    if (!pending) return;
    // H3 + paragraph(s) without a closing link — still a card, just unlinked.
    if (pending.title) cards.push({ title: pending.title, snippet: pending.snippets.join(" "), href: null });
    pending = null;
  };

  for (const block of blocks) {
    const type = blockType(block);
    if (type === "heading" && headingLevel(block) >= 3) {
      flushPending();
      pending = { title: headingText(block), snippets: [] };
      seenCardStart = true;
    } else if (type === "paragraph") {
      const text = asText(block.text);
      if (pending) {
        if (text) pending.snippets.push(text);
      } else if (!seenCardStart) {
        intro.push(block);
      } else {
        rest.push(block);
      }
    } else if (type === "link") {
      const anchor = asText(block.text) || asText(block.anchor_text) || asText(block.label);
      const href =
        asText(block.url) || asText(block.href) || resolveIntent(block.intent) || null;
      const title = pending?.title || anchor;
      const snippet = pending?.snippets.join(" ") || asText(block.context);
      if (title) cards.push({ title, snippet, href });
      pending = null;
      seenCardStart = true;
    } else {
      flushPending();
      rest.push(block);
    }
  }
  flushPending();
  return { intro, cards, rest };
}

// ---------------------------------------------------------------------------
// Visual pieces (styling lifted verbatim from LocationPage / ServicePage)
// ---------------------------------------------------------------------------

/**
 * Card grid in the foundation's service-card style. When no card carries a
 * snippet (bare cross-link sections), fall back to LocationPage's compact
 * chip-link grid instead of empty-looking cards.
 */
const ServiceCardGrid = ({ cards }: { cards: ServiceCard[] }) => {
  if (cards.length === 0) return null;
  const hasSnippets = cards.some((c) => c.snippet);

  if (!hasSnippets) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
        {cards.map((card, i) =>
          card.href ? (
            <SmartLink
              key={i}
              href={card.href}
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-accent transition-colors text-sm font-medium"
            >
              <span className="text-secondary">→</span> {card.title}
            </SmartLink>
          ) : (
            <span key={i} className="bg-muted px-3 py-2 rounded-md text-sm font-medium">
              {card.title}
            </span>
          )
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {cards.map((card, i) =>
        card.href ? (
          <SmartLink
            key={i}
            href={card.href}
            className="block bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-border group"
          >
            <h3 className="text-lg font-bold mb-2 group-hover:text-secondary transition-colors">{card.title}</h3>
            {card.snippet && (
              <p className="text-sm text-muted-foreground mb-3">
                <InlineText text={card.snippet} />
              </p>
            )}
            <span className="text-secondary text-sm font-semibold">Learn About {card.title} →</span>
          </SmartLink>
        ) : (
          <div key={i} className="bg-card rounded-lg p-6 shadow-md border border-border">
            <h3 className="text-lg font-bold mb-2">{card.title}</h3>
            {card.snippet && (
              <p className="text-sm text-muted-foreground">
                <InlineText text={card.snippet} />
              </p>
            )}
          </div>
        )
      )}
    </div>
  );
};

/** Bordered Q/A rows — the exact FAQ styling on the foundation LocationPage. */
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

const SectionRenderer = ({ section }: { section: LocationSection }) => {
  const faqPairs = collectFaqPairs(section.blocks);
  if (faqPairs.length > 0) {
    const nonFaq = section.blocks.filter((b) => blockType(b) !== "faq");
    return (
      <section>
        <h2 className="text-2xl font-bold mb-4">{section.heading || "Frequently Asked Questions"}</h2>
        <FaqRows pairs={faqPairs} />
        {nonFaq.length > 0 && (
          <div className="mt-6">
            <BlockRenderer blocks={nonFaq} />
          </div>
        )}
      </section>
    );
  }

  if (isServiceHub(section)) {
    const { intro, cards, rest } = parseServiceHub(section.blocks);
    return (
      <section>
        {section.heading && <h2 className="text-2xl font-bold mb-3">{section.heading}</h2>}
        {intro.length > 0 && <BlockRenderer blocks={intro} />}
        <ServiceCardGrid cards={cards} />
        {rest.length > 0 && <BlockRenderer blocks={rest} />}
      </section>
    );
  }

  return (
    <section>
      {section.heading && <h2 className="text-2xl font-bold mb-3">{section.heading}</h2>}
      <BlockRenderer blocks={section.blocks} />
    </section>
  );
};

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

const GeneratedLocationLayout = ({ page }: { page: GeneratedPage }) => {
  const blocks = extractBlocks(page.body_content) ?? [];
  const sections = groupSections(blocks);

  const images = normalizeImages(page.images);
  // The hero-slot image is the PageHero background (rendered by GeneratedPage).
  const heroImage = pickHeroImage(images);
  const inlineImages = images.filter((img) => img !== heroImage);
  const leadImage = inlineImages[0] ?? null;
  const galleryImages = inlineImages.slice(1);

  // The publisher emits FAQs both as body faq blocks AND as a faq_pairs field.
  // Only render the standalone section when the body has none.
  const bodyHasFaq = collectFaqPairs(blocks).length > 0;
  const standaloneFaqPairs = bodyHasFaq ? [] : normalizeFaqPairs(page.faq_pairs);

  const town = asText(page.town_name);
  const townLine = [town, asText(page.state)].filter(Boolean).join(", ");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        {leadImage && (
          <img
            src={leadImage.url}
            alt={leadImage.alt}
            className="rounded-lg w-full h-64 object-cover mb-6"
            loading="eager"
            width="800"
            height="400"
          />
        )}

        <div className="space-y-10">
          {sections.map((section, i) => (
            <SectionRenderer key={i} section={section} />
          ))}

          {standaloneFaqPairs.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">
                Frequently Asked Questions{town ? ` — ${town}` : ""}
              </h2>
              <FaqRows pairs={standaloneFaqPairs} />
            </section>
          )}
        </div>

        {galleryImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
            {galleryImages.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={img.alt}
                className="rounded-lg w-full h-48 object-cover"
                loading="lazy"
                width="400"
                height="192"
              />
            ))}
          </div>
        )}
      </div>

      <aside>
        <div className="bg-brand-navy text-primary-foreground rounded-lg p-6 sticky top-24">
          <h3 className="text-xl font-bold mb-3">
            {townLine ? `Serving ${townLine}` : "Serving the Las Vegas Valley"}
          </h3>
          <p className="text-sm opacity-80 mb-4">
            Call {BUSINESS.phoneFormatted} for {BUSINESS.industry} services
            {townLine ? ` in ${townLine}` : ""}.
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
            Request a Free Estimate{town ? ` in ${town}` : ""}
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default GeneratedLocationLayout;
