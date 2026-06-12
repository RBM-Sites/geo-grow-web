// Blog index at /blog — lists published blog posts from the generated-content
// manifest (src/content/_index.json) in the site's card style. Entries whose
// payload JSON is missing are skipped so the index never links to a 404.

import { Link } from "react-router-dom";
import { Header, Footer, Breadcrumbs, CTABanner, PageHero } from "@/components/Layout";
import SEO from "@/components/SEO";
import { BUSINESS } from "@/data/business";
import {
  asText,
  entryTitle,
  formatDisplayDate,
  getBlogBySlug,
  listEntries,
  manifestEntryUrl,
} from "@/lib/generatedContent";

const DEFAULT_HERO_BG = "/media/right-on-plumbing-heating-and-air-project-01-las-vegas-nv.jpg";

const BlogIndexPage = () => {
  const posts = listEntries("blog_post")
    .map((entry) => {
      const page = getBlogBySlug(entry.slug);
      if (!page) return null;
      return {
        url: manifestEntryUrl(entry),
        title: asText(page.page_title) || asText(page.h1_heading) || entryTitle(entry),
        excerpt: asText(page.meta_description) || asText(entry.meta_description),
        publishedAt: asText(page.published_at) || asText(entry.published_at),
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime());

  return (
    <>
      <SEO
        title={`Plumbing & HVAC Blog | ${BUSINESS.name}`}
        description={`Plumbing, heating, and air conditioning tips and guides for Las Vegas homeowners from the ${BUSINESS.name} team.`}
        canonical="/blog"
      />
      <Header />
      <PageHero
        title="Plumbing & HVAC Tips for Las Vegas Homeowners"
        subtitle={`Advice, guides, and updates from the ${BUSINESS.name} team.`}
        bgImage={DEFAULT_HERO_BG}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <main className="container-custom section-padding">
        {posts.length === 0 ? (
          <p className="text-muted-foreground">
            No blog posts have been published yet — check back soon for plumbing and HVAC tips from our team.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
              const dateLabel = formatDisplayDate(post.publishedAt);
              return (
                <Link
                  key={post.url}
                  to={post.url}
                  className="bg-card border border-border rounded-lg p-5 hover:shadow-lg transition-shadow group flex flex-col"
                >
                  {dateLabel && (
                    <time dateTime={post.publishedAt} className="text-xs text-muted-foreground mb-2">
                      {dateLabel}
                    </time>
                  )}
                  <h2 className="text-lg font-bold mb-2 group-hover:text-secondary transition-colors">{post.title}</h2>
                  {post.excerpt && <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{post.excerpt}</p>}
                  <span className="text-secondary text-sm font-semibold mt-auto">Read More →</span>
                </Link>
              );
            })}
          </div>
        )}
      </main>
      <CTABanner />
      <Footer />
    </>
  );
};

export default BlogIndexPage;
