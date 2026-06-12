// Renders an AI-generated (publisher-committed) page from src/content/pages/.
// Reached via the slug fallback routers in App.tsx — only after the slug has
// failed to match a foundation location/category/service route.

import { Header, Footer, Breadcrumbs, CTABanner, GoogleMapEmbed, PageHero } from "@/components/Layout";
import SEO from "@/components/SEO";
import NotFound from "./NotFound";
import GeneratedBody from "@/components/generated/GeneratedBody";
import { asText, getPageBySlug, normalizeSchemaJson } from "@/lib/generatedContent";

const DEFAULT_HERO_BG = "/media/right-on-plumbing-heating-and-air-project-01-las-vegas-nv.jpg";

const GeneratedPage = ({ slug }: { slug: string }) => {
  const page = getPageBySlug(slug);
  if (!page) return <NotFound />;

  const title = asText(page.page_title) || asText(page.meta_title) || asText(page.h1_heading);
  const h1 = asText(page.h1_heading) || title;
  const description = asText(page.meta_description) || title;
  const canonicalPath = `/${asText(slug).replace(/^\/+/, "")}`;
  const schemaJson = normalizeSchemaJson(page.schema_json);

  const townLine = [asText(page.town_name), asText(page.state)].filter(Boolean).join(", ");

  return (
    <>
      <SEO title={title} description={description} canonical={canonicalPath} />
      <Header />
      <PageHero
        title={h1}
        subtitle={townLine ? `Serving ${townLine} and the greater Las Vegas Valley.` : undefined}
        bgImage={DEFAULT_HERO_BG}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: h1 }]} />
      <main className="container-custom section-padding">
        <GeneratedBody page={page} />
      </main>
      <CTABanner />
      <GoogleMapEmbed />
      <Footer />
      {schemaJson && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />}
    </>
  );
};

export default GeneratedPage;
