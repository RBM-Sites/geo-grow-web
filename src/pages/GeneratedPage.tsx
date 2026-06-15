// Renders an AI-generated (publisher-committed) page from src/content/pages/.
// Reached via the slug fallback routers in App.tsx — only after the slug has
// failed to match a foundation location/category/service route.
//
// Layout selection:
//   - content_type "location_page" / "neighborhood_page" → the foundation
//     LocationPage's visual design (GeneratedLocationLayout: hero-image
//     banner, sectioned content, service card grids, sticky call sidebar)
//   - everything else (service_page, unknown) → the generic article layout
//     (GeneratedBody), unchanged.

import { Header, Footer, Breadcrumbs, CTABanner, GoogleMapEmbed, PageHero } from "@/components/Layout";
import SEO from "@/components/SEO";
import NotFound from "./NotFound";
import GeneratedBody from "@/components/generated/GeneratedBody";
import GeneratedLocationLayout from "@/components/generated/GeneratedLocationLayout";
import {
  asText,
  extractBlocks,
  getEntryBySlug,
  getPageBySlug,
  normalizeImages,
  normalizeSchemaJson,
  pickHeroImage,
} from "@/lib/generatedContent";
import { getLocationBySlug } from "@/data/business";

const DEFAULT_HERO_BG = "/media/right-on-plumbing-heating-and-air-project-01-las-vegas-nv.jpg";

const GeneratedPage = ({ slug }: { slug: string }) => {
  const page = getPageBySlug(slug);
  if (!page) return <NotFound />;

  const title = asText(page.page_title) || asText(page.meta_title) || asText(page.h1_heading);
  const h1 = asText(page.h1_heading) || title;
  const description = asText(page.meta_description) || title;
  const canonicalPath = `/${asText(slug).replace(/^\/+/, "")}`;
  const schemaJson = normalizeSchemaJson(page.schema_json);

  const townName = asText(page.town_name);
  const townLine = [townName, asText(page.state)].filter(Boolean).join(", ");

  // Manifest content_type wins; fall back to the payload's own field. The
  // location layout also requires structured blocks — legacy HTML-only
  // payloads keep the article renderer, which knows how to handle them.
  const contentType = asText(getEntryBySlug(slug)?.content_type) || asText(page.content_type);
  const isLocationStyle =
    (contentType === "location_page" || contentType === "neighborhood_page") &&
    !!extractBlocks(page.body_content);

  // Location-style pages put the hero-slot image behind the PageHero banner,
  // exactly like the foundation location pages (article pages keep rendering
  // it inline below the H1 instead).
  const heroImage = isLocationStyle ? pickHeroImage(normalizeImages(page.images)) : null;

  const subtitle =
    isLocationStyle && townName
      ? `Trusted plumbing and HVAC services for ${townName} homeowners.`
      : townLine
        ? `Serving ${townLine} and the greater Las Vegas Valley.`
        : undefined;

  // Neighborhood pages nest under their parent foundation city when known:
  // Home › {parentCity} › {h1}. Otherwise the flat Home › {h1} crumb.
  const parentLocation = isLocationStyle ? getLocationBySlug(asText(page.parent_location_slug)) : undefined;
  const breadcrumbs = parentLocation
    ? [
        { label: "Home", href: "/" },
        { label: parentLocation.city, href: `/${parentLocation.slug}` },
        { label: h1 },
      ]
    : [{ label: "Home", href: "/" }, { label: h1 }];

  return (
    <>
      <SEO title={title} description={description} canonical={canonicalPath} />
      <Header />
      <PageHero title={h1} subtitle={subtitle} bgImage={heroImage?.url || DEFAULT_HERO_BG} />
      <Breadcrumbs items={breadcrumbs} />
      <main className="container-custom section-padding">
        {isLocationStyle ? <GeneratedLocationLayout page={page} /> : <GeneratedBody page={page} />}
      </main>
      <CTABanner />
      <GoogleMapEmbed />
      <Footer />
      {schemaJson && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />}
    </>
  );
};

export default GeneratedPage;
