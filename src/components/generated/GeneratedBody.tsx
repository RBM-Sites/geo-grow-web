// Shared article body for AI-generated pages and blog posts. Wrapped by
// src/pages/GeneratedPage.tsx and src/pages/BlogPage.tsx, which provide the
// site chrome (Header/PageHero/Breadcrumbs/Footer) and <head> metadata.
//
// Body content priority:
//   1. body_content structured blocks (heading/paragraph/list/faq/cta/blockquote/link)
//   2. body_content_html (legacy fallback), with inline link tokens substituted
//   3. "No content available."
// Every field access is defensive — missing/extra fields must never crash.

import BlockRenderer, { collectFaqPairs, FaqSection } from "./BlockRenderer";
import { Link } from "react-router-dom";
import {
  asText,
  demoteH1Headings,
  extractBlocks,
  formatDisplayDate,
  normalizeFaqPairs,
  normalizeImages,
  resolveInternalLinkUrl,
  substituteLinkTokensHtml,
  type GeneratedPage,
  type InternalLink,
} from "@/lib/generatedContent";

const GeneratedBody = ({ page }: { page: GeneratedPage }) => {
  const blocks = extractBlocks(page.body_content);
  // demoteH1Headings: PageHero already renders the page H1 — embedded <h1> in
  // legacy publisher HTML becomes <h2> so the document never has two H1s.
  const bodyHtml =
    !blocks && typeof page.body_content_html === "string" && page.body_content_html
      ? demoteH1Headings(substituteLinkTokensHtml(page.body_content_html))
      : !blocks && typeof page.body_content === "string" && page.body_content
        ? demoteH1Headings(substituteLinkTokensHtml(page.body_content))
        : "";

  const images = normalizeImages(page.images);
  const heroImage = images.find((img) => img.slot === "hero") ?? images[0] ?? null;
  const inlineImages = images.filter((img) => img !== heroImage);

  // The publisher emits FAQs both as body faq blocks AND as a faq_pairs field.
  // When the body already renders them, skip the standalone section entirely.
  const bodyHasFaq = !!blocks && collectFaqPairs(blocks).length > 0;
  const faqPairs = bodyHasFaq ? [] : normalizeFaqPairs(page.faq_pairs);

  // Only keep internal links that resolve to a real URL — never dead anchors.
  const relatedLinks = (Array.isArray(page.internal_links) ? page.internal_links : [])
    .filter((link): link is InternalLink => !!link && typeof link === "object")
    .map((link) => ({
      href: resolveInternalLinkUrl(link),
      anchor: asText(link.anchor_text),
    }))
    .filter((link): link is { href: string; anchor: string } => !!link.href && !!link.anchor);

  const publishedAt = asText(page.published_at);
  const publishedLabel = formatDisplayDate(publishedAt);

  return (
    <article className="max-w-3xl">
      {/* Hero-slot image sits directly under the page H1 (rendered by PageHero) */}
      {heroImage && (
        <img
          src={heroImage.url}
          alt={heroImage.alt}
          className="rounded-lg w-full h-64 object-cover mb-6"
          loading="eager"
          width="800"
          height="400"
        />
      )}

      {publishedLabel && (
        <p className="text-sm text-muted-foreground mb-6">
          Published <time dateTime={publishedAt}>{publishedLabel}</time>
        </p>
      )}

      {blocks ? (
        <BlockRenderer blocks={blocks} />
      ) : bodyHtml ? (
        <div
          className="text-muted-foreground leading-relaxed space-y-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-secondary [&_a]:font-semibold hover:[&_a]:underline"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      ) : (
        <p className="text-muted-foreground">No content available.</p>
      )}

      {inlineImages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
          {inlineImages.map((img, i) => (
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

      {faqPairs.length > 0 && <FaqSection pairs={faqPairs} />}

      {relatedLinks.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Related</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {relatedLinks.map((link, i) =>
              /^https?:\/\//i.test(link.href) ? (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-accent transition-colors text-sm font-medium"
                >
                  <span className="text-secondary">→</span> {link.anchor}
                </a>
              ) : (
                <Link
                  key={i}
                  to={link.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-accent transition-colors text-sm font-medium"
                >
                  <span className="text-secondary">→</span> {link.anchor}
                </Link>
              )
            )}
          </div>
        </section>
      )}
    </article>
  );
};

export default GeneratedBody;
