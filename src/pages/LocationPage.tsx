import { useParams, Link } from "react-router-dom";
import { Header, Footer, Breadcrumbs, CTABanner, JsonLd, localBusinessSchema, PageHero, GoogleMapEmbed } from "@/components/Layout";
import SEO from "@/components/SEO";
import { getLocationBySlug, BUSINESS, SERVICE_CATEGORIES, LOCATIONS } from "@/data/business";
import { Phone } from "lucide-react";

/** Splits a long text block into shorter paragraphs of ~2-3 sentences each. */
const splitIntoParagraphs = (text: string): string[] => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) {
    paragraphs.push(sentences.slice(i, i + 3).join("").trim());
  }
  return paragraphs.filter(p => p.length > 0);
};

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
        description={location.metaDescription}
        canonical={`/${slug}`}
      />
      <Header />
      <PageHero title={`${BUSINESS.industry} in ${location.city}, ${location.state}`} subtitle={`Trusted plumbing and HVAC services for ${location.city} homeowners.`} bgImage={`/media/hero-location-${location.slug}-nv.jpg`} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: `${location.city}, ${location.state}` }]} />
      <main className="container-custom section-padding">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img src={`/media/right-on-plumbing-heating-and-air-project-0${location.slug === "las-vegas" ? "1" : location.slug === "henderson" ? "3" : location.slug === "north-las-vegas" ? "2" : "5"}-las-vegas-nv.jpg`} alt={`${BUSINESS.name} technician providing ${BUSINESS.industry.toLowerCase()} service in ${location.city}, ${location.state}`} className="rounded-lg w-full h-64 object-cover mb-6" loading="eager" width="800" height="400" />
            
            {/* Split long location content into shorter paragraphs */}
            {splitIntoParagraphs(location.content).map((para, i) => (
              <p key={i} className="text-muted-foreground mb-4 leading-relaxed">{para}</p>
            ))}

            {/* === Drainage Service === */}
            <h2 className="text-2xl font-bold mb-3">Drainage Service in {location.city}, {location.state}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Las Vegas's hard water and aging infrastructure make <Link to="/drainage-service" className="text-secondary font-semibold hover:underline">professional drainage service</Link> one of the most requested calls we get from {location.city} homeowners. Whether it's a slow kitchen sink or a mainline backup near {location.landmarks[0]}, our licensed technicians respond quickly with the right equipment to restore flow and prevent water damage to your property.
            </p>
            <h3 className="text-lg font-semibold mb-2">Other Drainage Services We Offer in {location.city}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {SERVICE_CATEGORIES.find(c => c.slug === "drainage-service")?.services.map(s => (
                <Link key={s.slug} to={`/drainage-service/${s.slug}`} className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-accent transition-colors text-sm font-medium">
                  <span className="text-secondary">→</span> {s.name}
                </Link>
              ))}
            </div>

            {/* === Plumber === */}
            <h2 className="text-2xl font-bold mb-3">Plumber in {location.city}, {location.state}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              From leaking faucets to complete water heater swaps, our <Link to="/plumber" className="text-secondary font-semibold hover:underline">licensed plumbers</Link> handle every residential plumbing need in {location.city}. We see a high volume of water heater failures in Southern Nevada — the combination of mineral-heavy water and constant demand means most tanks only last 8–10 years. Our team sizes, installs, and services both tank and tankless systems to keep your hot water reliable year-round.
            </p>
            <h3 className="text-lg font-semibold mb-2">Other Plumbing Services We Offer in {location.city}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {SERVICE_CATEGORIES.find(c => c.slug === "plumber")?.services.map(s => (
                <Link key={s.slug} to={`/plumber/${s.slug}`} className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-accent transition-colors text-sm font-medium">
                  <span className="text-secondary">→</span> {s.name}
                </Link>
              ))}
            </div>

            {/* === Air Conditioning Contractor === */}
            <h2 className="text-2xl font-bold mb-3">Air Conditioning Contractor in {location.city}, {location.state}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              With summer temperatures regularly exceeding 110°F, {location.city} residents depend on a reliable <Link to="/air-conditioning-contractor" className="text-secondary font-semibold hover:underline">air conditioning contractor</Link> to keep their homes comfortable and safe. We install, maintain, and upgrade AC systems from all major manufacturers — and we help homeowners choose energy-efficient units that lower utility bills without sacrificing cooling power.
            </p>
            <h3 className="text-lg font-semibold mb-2">Other AC Contractor Services We Offer in {location.city}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {SERVICE_CATEGORIES.find(c => c.slug === "air-conditioning-contractor")?.services.map(s => (
                <Link key={s.slug} to={`/air-conditioning-contractor/${s.slug}`} className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-accent transition-colors text-sm font-medium">
                  <span className="text-secondary">→</span> {s.name}
                </Link>
              ))}
            </div>

            {/* === Air Conditioning Repair Service === */}
            <h2 className="text-2xl font-bold mb-3">Air Conditioning Repair in {location.city}, {location.state}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              When your AC goes out in the middle of a {location.city} summer, you need fast, expert <Link to="/air-conditioning-repair-service" className="text-secondary font-semibold hover:underline">air conditioning repair</Link>. Our technicians diagnose and fix all makes and models — from refrigerant leaks and compressor failures to thermostat issues and frozen evaporator coils. We stock common parts on our trucks so most repairs are completed in a single visit.
            </p>
            <h3 className="text-lg font-semibold mb-2">Other AC Repair Services We Offer in {location.city}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {SERVICE_CATEGORIES.find(c => c.slug === "air-conditioning-repair-service")?.services.map(s => (
                <Link key={s.slug} to={`/air-conditioning-repair-service/${s.slug}`} className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-accent transition-colors text-sm font-medium">
                  <span className="text-secondary">→</span> {s.name}
                </Link>
              ))}
            </div>

            {/* === HVAC Contractor === */}
            <h2 className="text-2xl font-bold mb-3">HVAC Contractor in {location.city}, {location.state}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Right On Plumbing, Heating and Air is a trusted <Link to="/hvac-contractor" className="text-secondary font-semibold hover:underline">HVAC contractor</Link> serving {location.city} and the entire Las Vegas Valley. We handle complete HVAC system design, installation, and maintenance — from ductwork modifications and zoning upgrades to full system replacements. Keeping your HVAC running efficiently is critical when energy bills spike during {location.city}'s extreme summers and winters.
            </p>
            <h3 className="text-lg font-semibold mb-2">Other HVAC Services We Offer in {location.city}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {SERVICE_CATEGORIES.find(c => c.slug === "hvac-contractor")?.services.map(s => (
                <Link key={s.slug} to={`/hvac-contractor/${s.slug}`} className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-accent transition-colors text-sm font-medium">
                  <span className="text-secondary">→</span> {s.name}
                </Link>
              ))}
            </div>

            {/* Cross-linking to other locations */}
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
              {location.slug === "las-vegas" && ["Summerlin", "Spring Valley", "Downtown Las Vegas", "Enterprise", "Whitney", "Sunrise Manor", "Paradise", "Southwest Las Vegas"].map(n => (
                <span key={n} className="bg-muted px-3 py-2 rounded-md text-sm font-medium">{n}</span>
              ))}
              {location.slug === "north-las-vegas" && ["Aliante", "Eldorado", "Centennial Hills Border", "Sunrise Manor Border", "Nellis AFB Area", "Craig Ranch", "Tule Springs", "Valley Vista", "Park Highlands"].map(n => (
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
      <GoogleMapEmbed />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: location.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <Footer />
    </>
  );
};

export default LocationPage;
