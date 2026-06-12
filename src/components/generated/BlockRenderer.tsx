// Renders the publisher's structured body_content blocks using the site's
// existing visual language (Tailwind classes shared with ServicePage /
// LocationPage). Supported block types (exactly the publisher's list):
//   heading | paragraph | list | faq | cta | blockquote | link
// Unknown block types and missing fields are skipped or degraded silently —
// a malformed block must never break the page or the build.

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { BUSINESS } from "@/data/business";
import {
  asText,
  normalizeFaqPairs,
  resolveIntent,
  splitTextWithLinkTokens,
  type ContentBlock,
} from "@/lib/generatedContent";

/** Internal hrefs use the SPA router; absolute URLs get a real anchor. */
const SmartLink = ({ href, className, children }: { href: string; className?: string; children: ReactNode }) =>
  /^https?:\/\//i.test(href) ? (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link to={href} className={className}>
      {children}
    </Link>
  );

/**
 * Render minimal markdown emphasis (**bold** / *italic*) that content prompts
 * instruct the model to use, so literal asterisks never reach the page.
 */
const renderEmphasis = (text: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) nodes.push(<strong key={`em${key++}`}>{m[1]}</strong>);
    else nodes.push(<em key={`em${key++}`}>{m[2]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
};

/** Render text that may contain inline link tokens as React nodes. */
const InlineText = ({ text }: { text: unknown }) => {
  const segments = splitTextWithLinkTokens(asText(text));
  if (segments.length === 0) return null;
  return (
    <>
      {segments.map((seg, i) =>
        seg.kind === "link" ? (
          seg.href ? (
            <SmartLink key={i} href={seg.href} className="text-secondary font-semibold hover:underline">
              {seg.text}
            </SmartLink>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        ) : (
          <span key={i}>{renderEmphasis(seg.text)}</span>
        )
      )}
    </>
  );
};

const HeadingBlock = ({ block }: { block: ContentBlock }) => {
  const text = asText(block.text) || asText(block.heading);
  if (!text) return null;
  const rawLevel = typeof block.level === "number" ? block.level : parseInt(asText(block.level), 10);
  const level = Math.min(6, Math.max(2, Number.isFinite(rawLevel) ? rawLevel : 2));
  if (level === 2) return <h2 className="text-2xl font-bold mt-8 mb-4">{text}</h2>;
  if (level === 3) return <h3 className="text-lg font-semibold mt-6 mb-2">{text}</h3>;
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className="text-base font-semibold mt-4 mb-2">{text}</Tag>;
};

const ParagraphBlock = ({ block }: { block: ContentBlock }) => {
  const text = asText(block.text);
  if (!text) return null;
  return (
    <p className="text-muted-foreground mb-4 leading-relaxed">
      <InlineText text={text} />
    </p>
  );
};

const ListBlock = ({ block }: { block: ContentBlock }) => {
  const rawItems = Array.isArray(block.items) ? block.items : [];
  const items = rawItems
    .map((item) =>
      typeof item === "string"
        ? item
        : item && typeof item === "object"
          ? asText((item as ContentBlock).text)
          : asText(item)
    )
    .filter(Boolean);
  if (items.length === 0) return null;
  const style = asText(block.style).toLowerCase();
  const ordered = block.ordered === true || style === "numbered" || style === "ordered";
  const ListTag = ordered ? "ol" : "ul";
  return (
    <ListTag className={`${ordered ? "list-decimal" : "list-disc"} pl-6 mb-6 space-y-2 text-muted-foreground leading-relaxed`}>
      {items.map((item, i) => (
        <li key={i}>
          <InlineText text={item} />
        </li>
      ))}
    </ListTag>
  );
};

/** Extract normalized Q&A pairs from a single faq block, whatever its shape. */
const faqPairsFromBlock = (block: ContentBlock) => {
  // Accept { question, answer } (the publisher's shape — one block per
  // question) plus { pairs: [...] } / { items: [...] } / { faqs: [...] }.
  const source = Array.isArray(block.pairs)
    ? block.pairs
    : Array.isArray(block.items)
      ? block.items
      : Array.isArray(block.faqs)
        ? block.faqs
        : block.question || block.answer
          ? [{ question: block.question, answer: block.answer }]
          : [];
  return normalizeFaqPairs(source);
};

/**
 * All FAQ pairs across the body blocks. The publisher emits FAQs as one block
 * PER question — they must be grouped under a single heading, and the page
 * renderers use this to suppress the duplicate standalone faq_pairs section.
 */
export const collectFaqPairs = (blocks: ContentBlock[]) =>
  blocks.filter((b) => asText(b.type).toLowerCase() === "faq").flatMap(faqPairsFromBlock);

/** Q/A list styled like the FAQ sections on the foundation service pages. */
export const FaqSection = ({ pairs }: { pairs: Array<{ question: string; answer: string }> }) => {
  if (pairs.length === 0) return null;
  return (
    <section className="mt-10 mb-8">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      {pairs.map((faq, i) => (
        <div key={i} className="border-b border-border py-4">
          {faq.question && <h3 className="font-bold mb-1 text-sm">{faq.question}</h3>}
          {faq.answer && <p className="text-muted-foreground text-sm">{renderEmphasis(faq.answer)}</p>}
        </div>
      ))}
    </section>
  );
};

const CtaBlock = ({ block }: { block: ContentBlock }) => {
  const text = asText(block.text) || asText(block.heading);
  const label = asText(block.button_text) || asText(block.label) || "Get a Free Estimate";
  const href =
    asText(block.button_url) ||
    asText(block.url) ||
    asText(block.href) ||
    resolveIntent(block.intent) ||
    "/contact";
  return (
    <div className="bg-brand-navy text-primary-foreground rounded-lg p-6 my-8">
      {text && <p className="mb-4 leading-relaxed font-medium">{text}</p>}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`tel:${BUSINESS.phone}`}
          className="cta-gradient text-secondary-foreground px-6 py-3 rounded-md font-bold hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
        >
          <Phone className="h-5 w-5" /> Call {BUSINESS.phoneFormatted}
        </a>
        <SmartLink
          href={href}
          className="border-2 border-primary-foreground text-primary-foreground px-6 py-3 rounded-md font-bold hover:bg-primary-foreground/10 transition-colors inline-flex items-center justify-center"
        >
          {label}
        </SmartLink>
      </div>
    </div>
  );
};

const BlockquoteBlock = ({ block }: { block: ContentBlock }) => {
  const text = asText(block.text);
  if (!text) return null;
  const cite = asText(block.attribution) || asText(block.cite);
  return (
    <blockquote className="border-l-4 border-secondary pl-5 py-2 my-6 italic text-muted-foreground">
      <p className="leading-relaxed">{renderEmphasis(text)}</p>
      {cite && <cite className="block mt-2 not-italic text-sm font-semibold text-foreground">— {cite}</cite>}
    </blockquote>
  );
};

const LinkBlock = ({ block }: { block: ContentBlock }) => {
  const anchor = asText(block.text) || asText(block.anchor_text) || asText(block.label);
  if (!anchor) return null;
  const href = asText(block.url) || asText(block.href) || resolveIntent(block.intent);
  // Never render a dead, href-less anchor — fall back to plain text.
  if (!href) return <p className="text-muted-foreground mb-4 leading-relaxed">{anchor}</p>;
  return (
    <p className="mb-4 leading-relaxed">
      <SmartLink href={href} className="text-secondary font-semibold hover:underline">
        {anchor}
      </SmartLink>
    </p>
  );
};

const BlockRenderer = ({ blocks }: { blocks: ContentBlock[] }) => {
  // The publisher emits one faq block per question; group every FAQ pair in
  // the body under a single "Frequently Asked Questions" section rendered
  // where the first faq block appears.
  const allFaqPairs = collectFaqPairs(blocks);
  const firstFaqIndex = blocks.findIndex((b) => asText(b.type).toLowerCase() === "faq");

  return (
    <>
      {blocks.map((block, i) => {
        switch (asText(block.type).toLowerCase()) {
          case "heading":
            return <HeadingBlock key={i} block={block} />;
          case "paragraph":
            return <ParagraphBlock key={i} block={block} />;
          case "list":
            return <ListBlock key={i} block={block} />;
          case "faq":
            return i === firstFaqIndex ? <FaqSection key={i} pairs={allFaqPairs} /> : null;
          case "cta":
            return <CtaBlock key={i} block={block} />;
          case "blockquote":
            return <BlockquoteBlock key={i} block={block} />;
          case "link":
            return <LinkBlock key={i} block={block} />;
          default: {
            // Unknown block type — render its text as a paragraph (parity with
            // the publisher's blocksToHtml fallback) rather than dropping it.
            const fallback = asText(block.text);
            return fallback ? (
              <p key={i} className="text-muted-foreground mb-4 leading-relaxed">
                <InlineText text={fallback} />
              </p>
            ) : null;
          }
        }
      })}
    </>
  );
};

export default BlockRenderer;
