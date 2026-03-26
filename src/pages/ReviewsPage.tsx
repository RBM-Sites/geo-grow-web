import { Link } from "react-router-dom";
import { Header, Footer, Breadcrumbs, CTABanner, JsonLd, localBusinessSchema } from "@/components/Layout";
import SEO from "@/components/SEO";
import { BUSINESS } from "@/data/business";
import { Star, ExternalLink } from "lucide-react";

const reviews = [
  { text: "Right On Plumbing fixed our AC the same day we called. In 115° heat, that's a lifesaver. Professional, courteous, and fair pricing. Highly recommend to anyone in Las Vegas!", name: "Sarah M.", city: "Las Vegas, NV", rating: 5 },
  { text: "Had a plumbing emergency on a Saturday — burst pipe under the kitchen sink. They were at our door within an hour and had everything fixed before lunch. Outstanding service from start to finish.", name: "Mike T.", city: "Henderson, NV", rating: 5 },
  { text: "Installed our new tankless water heater and did an amazing job. Clean work, explained everything clearly, and priced fairly. We'll be customers for life.", name: "Jennifer L.", city: "Las Vegas, NV", rating: 5 },
  { text: "They replaced our entire HVAC system — furnace and AC. The crew was professional, cleaned up after themselves, and the new system works beautifully. Our energy bill dropped noticeably.", name: "Robert K.", city: "Las Vegas, NV", rating: 5 },
  { text: "Called for a drain cleaning and they also found a small leak we didn't know about. Honest, thorough, and reasonably priced. Great experience.", name: "Angela D.", city: "Henderson, NV", rating: 5 },
  { text: "Needed a new thermostat installed and they walked us through all the smart thermostat options. Quick install and our home is way more comfortable now.", name: "Carlos P.", city: "Boulder City, NV", rating: 5 },
  { text: "Our furnace quit on the coldest night of the year. Right On Plumbing came out promptly and got it running again. Can't thank them enough.", name: "Linda W.", city: "Las Vegas, NV", rating: 5 },
  { text: "Professional and punctual. Had our ducts cleaned and the difference in air quality is amazing. Will definitely use them again for our AC tune-up.", name: "David S.", city: "Las Vegas, NV", rating: 5 },
];

const ReviewsPage = () => {
  return (
    <>
      <SEO
        title={`Customer Reviews | ${BUSINESS.name} | ${BUSINESS.industry} Las Vegas, NV`}
        description={`Read verified customer reviews of ${BUSINESS.name}. Rated ${BUSINESS.reviews.average}/5 stars from ${BUSINESS.reviews.count} reviews for plumbing, HVAC, and electrical services in Las Vegas, NV.`}
        canonical="/reviews"
      />
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reviews" }]} />
      <main className="container-custom section-padding">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{BUSINESS.name} Customer Reviews</h1>

        {/* Rating Summary */}
        <div className="bg-brand-navy text-primary-foreground rounded-lg p-8 mb-10 flex flex-col md:flex-row items-center gap-6">
          <div className="text-center">
            <p className="text-6xl font-black">{BUSINESS.reviews.average}.0</p>
            <div className="flex gap-1 justify-center my-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-6 w-6 fill-current text-secondary" />)}
            </div>
            <p className="text-sm opacity-80">Based on {BUSINESS.reviews.count} reviews</p>
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-lg mb-3">Our customers across Las Vegas, Henderson, and Boulder City trust us for reliable, expert {BUSINESS.industry.toLowerCase()} services.</p>
            <a
              href={BUSINESS.social.google}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-gradient text-secondary-foreground px-6 py-3 rounded-md font-bold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" /> Leave Us a Review on Google
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex gap-1 text-secondary mb-3">
                {[...Array(review.rating)].map((_, j) => <Star key={j} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">"{review.text}"</p>
              <p className="font-bold text-sm">— {review.name}</p>
              <p className="text-xs text-muted-foreground">{review.city}</p>
            </div>
          ))}
        </div>
      </main>
      <CTABanner />
      <JsonLd data={{
        ...localBusinessSchema,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(BUSINESS.reviews.average),
          reviewCount: String(BUSINESS.reviews.count),
        },
      }} />
      <Footer />
    </>
  );
};

export default ReviewsPage;
