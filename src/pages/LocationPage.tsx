import { useParams, Link } from "react-router-dom";
import { Header, Footer, Breadcrumbs, CTABanner, JsonLd, localBusinessSchema } from "@/components/Layout";
import SEO from "@/components/SEO";
import { getLocationBySlug, BUSINESS, SERVICE_CATEGORIES, LOCATIONS } from "@/data/business";
import { Phone } from "lucide-react";

const LocationPage = () => {
  const { citySlug, categorySlug } = useParams();
  const slug = citySlug || categorySlug;
  const location = slug ? getLocationBySlug(slug) : undefined;
  if (!location) return null;

  // Other locations for cross-linking
  const otherLocations = LOCATIONS.filter(l => l.slug !== slug);

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

            {/* Contextual internal links woven into natural prose — NOT a list */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {location.city} homeowners most frequently call us for <Link to="/drainage-service/drain-cleaning" className="text-secondary font-semibold hover:underline">professional drain cleaning</Link> and <Link to="/air-conditioning-repair-service" className="text-secondary font-semibold hover:underline">AC repair</Link> — two services that are essential given Southern Nevada's hard water and extreme summer heat. When an aging water heater starts leaking, our <Link to="/plumber/water-heater-replacement" className="text-secondary font-semibold hover:underline">water heater replacement</Link> team can typically complete the swap in under a day.
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              For homes with recurring sewer issues near {location.landmarks[0]}, we recommend starting with a <Link to="/drainage-service/sewer-camera-inspection" className="text-secondary font-semibold hover:underline">sewer camera inspection</Link> to pinpoint the problem before committing to repairs. If the issue turns out to be severe, our <Link to="/drainage-service/trenchless-sewer-repair" className="text-secondary font-semibold hover:underline">trenchless sewer repair</Link> minimizes disruption to your yard and landscaping.
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Keeping your <Link to="/hvac-contractor" className="text-secondary font-semibold hover:underline">HVAC system</Link> running efficiently is critical in {location.city}. We install and service all major brands, and our <Link to="/air-duct-cleaning-service" className="text-secondary font-semibold hover:underline">air duct cleaning service</Link> helps improve indoor air quality throughout your home. Whether you need a quick <Link to="/plumber/faucet-repair" className="text-secondary font-semibold hover:underline">faucet repair</Link> or a full <Link to="/heating-contractor" className="text-secondary font-semibold hover:underline">heating system installation</Link>, our licensed technicians arrive prepared to get the job done right.
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              We also proudly serve nearby communities — if you have family or neighbors in{" "}
              {otherLocations.map((loc, i) => (
                <span key={loc.slug}>
                  {i > 0 && (i === otherLocations.length - 1 ? " and " : ", ")}
                  <Link to={`/${loc.slug}`} className="text-secondary font-semibold hover:underline">{loc.city}</Link>
                </span>
              ))}
              , we offer the same reliable service throughout the Las Vegas Valley.{" "}
              <Link to="/contact" className="text-secondary font-semibold hover:underline">Contact us to schedule a free estimate</Link> or call <a href={`tel:${BUSINESS.phone}`} className="text-secondary font-semibold hover:underline">{BUSINESS.phoneFormatted}</a> today.
            </p>

            {/* Full service directory by category — every service linked for location+service ranking */}
            <h2 className="text-2xl font-bold mb-6">{BUSINESS.industry} Services in {location.city}, {location.state}</h2>
            {SERVICE_CATEGORIES.map(category => (
              <div key={category.slug} className="mb-8">
                <h3 className="text-xl font-bold mb-3">
                  <Link to={`/${category.slug}`} className="text-secondary hover:underline">{category.name}</Link> in {location.city}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                  {category.services.map(service => (
                    <Link
                      key={service.slug}
                      to={`/${category.slug}/${service.slug}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-accent transition-colors text-sm font-medium"
                    >
                      <span className="text-secondary">→</span> {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

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

            {/* Neighborhoods directory — appropriate structured list for location parent pages */}
            <h2 className="text-2xl font-bold mt-10 mb-4">Neighborhoods We Serve in {location.city}</h2>
            <p className="text-muted-foreground mb-4">
              Our technicians know {location.city} inside and out. Here are some of the neighborhoods and communities where we regularly provide {BUSINESS.industry.toLowerCase()} services:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
              {location.slug === "las-vegas" && ["Summerlin", "Spring Valley", "Downtown Las Vegas", "North Las Vegas", "Enterprise", "Whitney", "Sunrise Manor", "Paradise", "Southwest Las Vegas"].map(n => (
                <span key={n} className="bg-muted px-3 py-2 rounded-md text-sm font-medium">{n}</span>
              ))}
              {location.slug === "henderson" && ["Green Valley", "MacDonald Ranch", "Anthem", "Seven Hills", "Cadence", "Lake Las Vegas", "Inspirada", "The District", "Pittman"].map(n => (
                <span key={n} className="bg-muted px-3 py-2 rounded-md text-sm font-medium">{n}</span>
              ))}
              {location.slug === "boulder-city" && ["Historic District", "Boulder City Golf Course", "Bootleg Canyon", "Lake Mead Area", "Veterans Memorial Drive"].map(n => (
                <span key={n} className="bg-muted px-3 py-2 rounded-md text-sm font-medium">{n}</span>
              ))}
            </div>
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
