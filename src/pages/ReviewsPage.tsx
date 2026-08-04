import { Header, Footer, Breadcrumbs, CTABanner, JsonLd, localBusinessSchema, PageHero, GoogleMapEmbed } from "@/components/Layout";
import SEO from "@/components/SEO";
import GoogleReviews from "@/components/GoogleReviews";
import { BUSINESS } from "@/data/business";
import { ExternalLink, Star } from "lucide-react";

const ReviewsPage = () => {
  return (
    <>
      <SEO
        title={`Customer Reviews | ${BUSINESS.name} | ${BUSINESS.industry} Las Vegas, NV`}
        description={`Read verified Google reviews of ${BUSINESS.name} for plumbing and HVAC services in Las Vegas, Henderson, and Boulder City, NV.`}
        canonical="/reviews"
      />
      <Header />
      <PageHero
        title={`${BUSINESS.name} Customer Reviews`}
        subtitle="Verified Google reviews from homeowners across Las Vegas, Henderson, and Boulder City."
        bgImage="/media/hero-reviews-plumbing-hvac-las-vegas.jpg"
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reviews" }]} />
      <main className="container-custom section-padding">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">What Our Customers Say</h2>

        <GoogleReviews
          placeId="ChIJPfLBoqXryIARmjA2Wqe32RY"
          apiBase="https://pgnqlvedsdgabcnkjqym.supabase.co/functions/v1/reviews-proxy"
          layout="carousel"
          theme="light"
          accent="#02365A"
          minRating={4}
          maxReviews={5}
        />

        <div className="text-center mt-8">
          <a
            href="https://maps.google.com/?cid=1646549068181549210"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-gradient text-secondary-foreground px-8 py-4 rounded-md font-bold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            <Star className="h-5 w-5" /> See all 19 reviews on Google
          </a>
        </div>

        <div className="bg-brand-navy text-primary-foreground rounded-lg p-8 mt-12 text-center">
          <p className="text-lg mb-4">
            Our customers across Las Vegas, Henderson, and Boulder City trust us for reliable, expert {BUSINESS.industry.toLowerCase()} services.
          </p>
          <a
            href={BUSINESS.social.google}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-gradient text-secondary-foreground px-6 py-3 rounded-md font-bold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" /> Leave Us a Review on Google
          </a>
        </div>
      </main>
      <CTABanner />
      <GoogleMapEmbed />
      <JsonLd data={localBusinessSchema} />
      <Footer />
    </>
  );
};

export default ReviewsPage;
