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
        description={location.metaDescription}
        canonical={`/${slug}`}
      />
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: `${location.city}, ${location.state}` }]} />
      <main className="container-custom section-padding">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{BUSINESS.industry} in {location.city}, {location.state}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <img src={`/media/right-on-plumbing-heating-and-air-project-0${location.slug === "las-vegas" ? "1" : location.slug === "henderson" ? "3" : "5"}-las-vegas-nv.jpg`} alt={`${BUSINESS.name} technician providing ${BUSINESS.industry.toLowerCase()} service in ${location.city}, ${location.state}`} className="rounded-lg w-full h-64 object-cover mb-6" loading="eager" width="800" height="400" />
            
            <p className="text-muted-foreground mb-6 leading-relaxed">{location.content}</p>

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

            {/* === Air Duct Cleaning Service === */}
            <h2 className="text-2xl font-bold mb-3">Air Duct Cleaning in {location.city}, {location.state}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Desert dust, pet dander, and construction debris accumulate quickly in {location.city} ductwork. Our <Link to="/air-duct-cleaning-service" className="text-secondary font-semibold hover:underline">air duct cleaning service</Link> removes built-up contaminants that reduce airflow and degrade indoor air quality. We use professional HEPA-filtered vacuums and rotary brush systems to clean supply and return ducts, registers, and plenums — leaving your home's air noticeably cleaner.
            </p>
            <h3 className="text-lg font-semibold mb-2">Other Duct Cleaning Services We Offer in {location.city}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {SERVICE_CATEGORIES.find(c => c.slug === "air-duct-cleaning-service")?.services.map(s => (
                <Link key={s.slug} to={`/air-duct-cleaning-service/${s.slug}`} className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-accent transition-colors text-sm font-medium">
                  <span className="text-secondary">→</span> {s.name}
                </Link>
              ))}
            </div>

            {/* === Furnace Repair Service === */}
            <h2 className="text-2xl font-bold mb-3">Furnace Repair in {location.city}, {location.state}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Desert winters bring overnight lows into the 30s, and a broken furnace can leave your {location.city} home uncomfortably cold. Our <Link to="/furnace-repair-service" className="text-secondary font-semibold hover:underline">furnace repair service</Link> covers gas and electric furnaces of all brands — from ignitor and flame sensor replacements to blower motor repairs and heat exchanger inspections. We prioritize safety and efficiency on every call.
            </p>
            <h3 className="text-lg font-semibold mb-2">Other Furnace Services We Offer in {location.city}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {SERVICE_CATEGORIES.find(c => c.slug === "furnace-repair-service")?.services.map(s => (
                <Link key={s.slug} to={`/furnace-repair-service/${s.slug}`} className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-accent transition-colors text-sm font-medium">
                  <span className="text-secondary">→</span> {s.name}
                </Link>
              ))}
            </div>

            {/* === Heating Contractor === */}
            <h2 className="text-2xl font-bold mb-3">Heating Contractor in {location.city}, {location.state}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              As a full-service <Link to="/heating-contractor" className="text-secondary font-semibold hover:underline">heating contractor</Link>, we install and maintain heating systems that keep {location.city} homes warm during the cooler months. Whether you need a new furnace installation, a heat pump upgrade, or routine maintenance to extend the life of your existing system, our licensed technicians deliver reliable results backed by warranty.
            </p>
            <h3 className="text-lg font-semibold mb-2">Other Heating Services We Offer in {location.city}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {SERVICE_CATEGORIES.find(c => c.slug === "heating-contractor")?.services.map(s => (
                <Link key={s.slug} to={`/heating-contractor/${s.slug}`} className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-accent transition-colors text-sm font-medium">
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

            {/* === Mechanical Contractor === */}
            <h2 className="text-2xl font-bold mb-3">Mechanical Contractor in {location.city}, {location.state}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              As a licensed <Link to="/mechanical-contractor" className="text-secondary font-semibold hover:underline">mechanical contractor</Link>, we go beyond standard plumbing and HVAC work to handle complex mechanical systems in {location.city} homes and light commercial properties. From gas line installation and backflow prevention to whole-house repiping, our team brings the expertise and equipment needed for jobs that require a higher level of technical skill and code compliance.
            </p>
            <h3 className="text-lg font-semibold mb-2">Other Mechanical Services We Offer in {location.city}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {SERVICE_CATEGORIES.find(c => c.slug === "mechanical-contractor")?.services.map(s => (
                <Link key={s.slug} to={`/mechanical-contractor/${s.slug}`} className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted hover:bg-accent transition-colors text-sm font-medium">
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
