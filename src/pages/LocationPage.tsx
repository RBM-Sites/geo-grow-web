import { useParams, Link } from "react-router-dom";
import { Header, Footer, Breadcrumbs, CTABanner, JsonLd, localBusinessSchema } from "@/components/Layout";
import SEO from "@/components/SEO";
import { getLocationBySlug, BUSINESS, SERVICE_CATEGORIES } from "@/data/business";
import { Phone, MapPin } from "lucide-react";

const LocationPage = () => {
  const { citySlug, categorySlug } = useParams();
  const slug = citySlug || categorySlug;
  const location = slug ? getLocationBySlug(slug) : undefined;
  if (!location) return null;

  return (
    <>
      <SEO
        title={location.metaTitle}
        description={`${BUSINESS.name} serves ${location.city}, ${location.state} with expert ${BUSINESS.industry.toLowerCase()} services. Licensed & insured, free estimates. Call ${BUSINESS.phoneFormatted}.`}
        canonical={`/${slug}`}
      />
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: `${location.city}, ${location.state}` }]} />
      <main className="container-custom section-padding">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{BUSINESS.industry} in {location.city}, {location.state}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img src="/media/right-on-plumbing-heating-and-air-project-03-las-vegas-nv.jpg" alt={`${BUSINESS.name} technician providing ${BUSINESS.industry.toLowerCase()} service in ${location.city}, ${location.state}`} className="rounded-lg w-full h-64 object-cover mb-6" loading="eager" width="800" height="400" />
            
            <p className="text-muted-foreground mb-6 leading-relaxed">{location.content}</p>

            <h2 className="text-2xl font-bold mb-4">Services We Offer in {location.city}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {SERVICE_CATEGORIES.map(cat => (
                <Link key={cat.slug} to={`/${cat.slug}`} className="flex items-center gap-2 text-sm hover:text-secondary transition-colors font-medium">
                  <span className="text-secondary">✓</span> {cat.name} in {location.city}
                </Link>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4">Local Landmarks Near Our Service Area</h2>
            <p className="text-muted-foreground mb-6">
              {location.landmarks.map((l, i) => (
                <span key={i}>{i > 0 ? ", " : ""}{l}</span>
              ))} — these are just a few of the well-known landmarks in {location.city} where our customers live and work.
            </p>

            <p className="mb-6">
              <a href={location.externalLink.url} target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">{location.externalLink.text}</a>
            </p>

            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions — {location.city}</h2>
            {location.faqs.map((faq, i) => (
              <div key={i} className="border-b border-border py-4">
                <h3 className="font-bold mb-1 text-sm">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>

          <aside>
            <div className="bg-brand-navy text-primary-foreground rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-3">Serving {location.city}, {location.state}</h3>
              <p className="text-sm opacity-80 mb-4">Call {BUSINESS.phoneFormatted} for {BUSINESS.industry} services in {location.city}, {location.state}.</p>
              <a href={`tel:${BUSINESS.phone}`} className="cta-gradient text-secondary-foreground w-full py-3 rounded-md font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Phone className="h-5 w-5" /> {BUSINESS.phoneFormatted}
              </a>
              <Link to="/contact" className="block text-center mt-3 text-sm underline opacity-80 hover:opacity-100">Request a Free Estimate in {location.city}</Link>
            </div>
          </aside>
        </div>
      </main>
      <CTABanner />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: location.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <Footer />
    </>
  );
};

export default LocationPage;
