// Blog post route: /blog/:slug renders src/content/blog/<slug>.json committed
// by the external publisher. Same defensive meta/schema treatment as
// GeneratedPage; falls back to a minimal BlogPosting JSON-LD when the payload
// carries no usable schema_json.

import { useParams } from "react-router-dom";
import { Header, Footer, Breadcrumbs, CTABanner, PageHero } from "@/components/Layout";
import SEO from "@/components/SEO";
import NotFound from "./NotFound";
import GeneratedBody from "@/components/generated/GeneratedBody";
import { BUSINESS } from "@/data/business";
import { asText, bareBlogSlug, getBlogBySlug, normalizeSchemaJson } from "@/lib/generatedContent";

const DEFAULT_HERO_BG = "/media/right-on-plumbing-heating-and-air-project-01-las-vegas-nv.jpg";

const BlogPage = () => {
  const { slug = "" } = useParams();
  const page = slug ? getBlogBySlug(slug) : null;
  if (!page) return <NotFound />;

  const title = asText(page.page_title) || asText(page.meta_title) || asText(page.h1_heading);
  const h1 = asText(page.h1_heading) || title;
  const description = asText(page.meta_description) || title;
  const canonicalPath = `/blog/${bareBlogSlug(slug)}`;

  const fallbackSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: h1,
    ...(asText(page.published_at) ? { datePublished: asText(page.published_at) } : {}),
    author: { "@type": "Organization", name: BUSINESS.name },
    publisher: { "@type": "Organization", name: BUSINESS.name },
  };
  const schemaJson = normalizeSchemaJson(page.schema_json) ?? normalizeSchemaJson(fallbackSchema);

  return (
    <>
      <SEO title={title} description={description} canonical={canonicalPath} ogType="article" />
      <Header />
      <PageHero title={h1} bgImage={DEFAULT_HERO_BG} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: h1 }]} />
      <main className="container-custom section-padding">
        <GeneratedBody page={page} />
      </main>
      <CTABanner />
      <Footer />
      {schemaJson && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />}
    </>
  );
};

export default BlogPage;
