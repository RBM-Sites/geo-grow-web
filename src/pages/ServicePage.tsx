import { useParams, Link } from "react-router-dom";
import { Header, Footer, Breadcrumbs, CTABanner, JsonLd, localBusinessSchema, PageHero } from "@/components/Layout";
import SEO from "@/components/SEO";
import { getCategoryBySlug, getServiceBySlug, BUSINESS, SERVICE_CATEGORIES, ServiceItem } from "@/data/business";
import { Phone } from "lucide-react";

/** Maps service slugs and category slugs to the most relevant generated image */
const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = {
  // Drainage category & services
  "drainage-service": { src: "/media/service-drainage-drain-cleaning-las-vegas.jpg", alt: "Professional drain cleaning equipment clearing a residential drain in Las Vegas, NV" },
  "drain-cleaning": { src: "/media/service-drainage-drain-cleaning-las-vegas.jpg", alt: "Drain cleaning service using motorized auger to restore water flow in a Las Vegas home" },
  "clogged-drain-repair": { src: "/media/service-drainage-drain-cleaning-las-vegas.jpg", alt: "Emergency clogged drain repair at a Las Vegas, NV residence" },
  "sewer-camera-inspection": { src: "/media/service-drainage-sewer-camera-inspection-las-vegas.jpg", alt: "Sewer camera inspection equipment diagnosing pipe issues in Las Vegas, NV" },
  "sewer-line-replacement": { src: "/media/service-drainage-sewer-camera-inspection-las-vegas.jpg", alt: "Sewer line assessment and replacement service in Las Vegas, NV" },
  "trenchless-sewer-repair": { src: "/media/service-drainage-sewer-camera-inspection-las-vegas.jpg", alt: "Trenchless sewer repair technology used in a Las Vegas residential property" },
  // Plumber category & services
  "plumber": { src: "/media/service-plumber-water-heater-installation-las-vegas.jpg", alt: "Professional plumbing services including water heater installation in Las Vegas, NV" },
  "water-heater-replacement": { src: "/media/service-plumber-water-heater-installation-las-vegas.jpg", alt: "Water heater replacement with new tank unit in a Las Vegas home" },
  "water-heater-installation": { src: "/media/service-plumber-water-heater-installation-las-vegas.jpg", alt: "New water heater installation with copper piping in Las Vegas, NV" },
  "tankless-water-heater-installation": { src: "/media/service-plumber-water-heater-installation-las-vegas.jpg", alt: "Tankless water heater installation for a Las Vegas, NV homeowner" },
  "sewer-line-repair": { src: "/media/service-drainage-sewer-camera-inspection-las-vegas.jpg", alt: "Sewer line repair and diagnostics for a Las Vegas property" },
  "toilet-repair": { src: "/media/service-plumber-bathroom-remodel-las-vegas.jpg", alt: "Toilet repair and bathroom plumbing service in Las Vegas, NV" },
  "toilet-installation": { src: "/media/service-plumber-bathroom-remodel-las-vegas.jpg", alt: "New toilet installation in a Las Vegas bathroom remodel" },
  "faucet-repair": { src: "/media/service-plumber-faucet-repair-las-vegas.jpg", alt: "Faucet repair and cartridge replacement in a Las Vegas kitchen" },
  "faucet-installation": { src: "/media/service-plumber-faucet-repair-las-vegas.jpg", alt: "New faucet installation for a Las Vegas homeowner" },
  "leak-detection": { src: "/media/service-plumber-faucet-repair-las-vegas.jpg", alt: "Leak detection service for residential plumbing in Las Vegas, NV" },
  "backflow-testing": { src: "/media/service-plumber-water-heater-installation-las-vegas.jpg", alt: "Backflow testing and prevention service in Las Vegas, NV" },
  "bathroom-remodeling": { src: "/media/service-plumber-bathroom-remodel-las-vegas.jpg", alt: "Bathroom remodeling plumbing service showing new fixtures in Las Vegas, NV" },
  "emergency-plumber": { src: "/media/service-plumber-faucet-repair-las-vegas.jpg", alt: "Emergency plumber responding to a residential call in Las Vegas, NV" },
  "commercial-plumber": { src: "/media/service-plumber-water-heater-installation-las-vegas.jpg", alt: "Commercial plumbing service for a Las Vegas business" },
  // AC Contractor category & services
  "air-conditioning-contractor": { src: "/media/service-ac-contractor-installation-las-vegas.jpg", alt: "Air conditioning condenser unit installed at a Las Vegas home in the desert heat" },
  "ac-installation": { src: "/media/service-ac-contractor-installation-las-vegas.jpg", alt: "Professional AC installation on a concrete pad at a Las Vegas residence" },
  "air-conditioner-installation": { src: "/media/service-ac-contractor-installation-las-vegas.jpg", alt: "New air conditioner installation for a Las Vegas, NV homeowner" },
  "central-air-conditioning-installation": { src: "/media/service-ac-contractor-installation-las-vegas.jpg", alt: "Central air conditioning system installation in Las Vegas, NV" },
  "ac-replacement": { src: "/media/service-ac-contractor-installation-las-vegas.jpg", alt: "AC replacement with energy-efficient unit in Las Vegas, NV" },
  "air-conditioner-replacement": { src: "/media/service-ac-contractor-installation-las-vegas.jpg", alt: "Air conditioner replacement service for a Las Vegas home" },
  "ductless-ac-installation": { src: "/media/service-ductless-mini-split-installation-las-vegas.jpg", alt: "Ductless mini-split AC unit installed in a Las Vegas living room" },
  "central-ac-installation": { src: "/media/service-ac-contractor-installation-las-vegas.jpg", alt: "Central AC installation for whole-home cooling in Las Vegas, NV" },
  "new-ac-unit-installation": { src: "/media/service-ac-contractor-installation-las-vegas.jpg", alt: "New AC unit installation for a Las Vegas desert home" },
  "air-conditioning-system-installation": { src: "/media/service-ac-contractor-installation-las-vegas.jpg", alt: "Complete air conditioning system installation in Las Vegas, NV" },
  "window-ac-installation": { src: "/media/service-ac-contractor-installation-las-vegas.jpg", alt: "Window AC unit installation for a Las Vegas room" },
  // AC Repair category & services
  "air-conditioning-repair-service": { src: "/media/service-ac-repair-technician-las-vegas.jpg", alt: "AC repair technician diagnosing condenser unit issues in Las Vegas, NV" },
  "ac-repair": { src: "/media/service-ac-repair-technician-las-vegas.jpg", alt: "AC repair service restoring cooling to a Las Vegas home" },
  "air-conditioner-repair": { src: "/media/service-ac-repair-technician-las-vegas.jpg", alt: "Air conditioner repair by certified technician in Las Vegas, NV" },
  "air-conditioning-repair": { src: "/media/service-ac-repair-technician-las-vegas.jpg", alt: "Air conditioning repair and diagnostics in Las Vegas, NV" },
  "ac-not-cooling-repair": { src: "/media/service-ac-repair-technician-las-vegas.jpg", alt: "Diagnosing an AC not cooling issue at a Las Vegas residence" },
  "ac-not-turning-on-repair": { src: "/media/service-ac-repair-technician-las-vegas.jpg", alt: "Troubleshooting an AC unit that won't turn on in Las Vegas, NV" },
  "ac-refrigerant-recharge": { src: "/media/service-ac-repair-technician-las-vegas.jpg", alt: "AC refrigerant recharge service in Las Vegas, NV" },
  "ac-leak-repair": { src: "/media/service-ac-repair-technician-las-vegas.jpg", alt: "AC leak repair and detection in Las Vegas, NV" },
  "ac-compressor-repair": { src: "/media/service-ac-repair-technician-las-vegas.jpg", alt: "AC compressor repair by licensed technician in Las Vegas, NV" },
  "ac-fan-motor-replacement": { src: "/media/service-ac-repair-technician-las-vegas.jpg", alt: "AC fan motor replacement service in Las Vegas, NV" },
  "ac-capacitor-replacement": { src: "/media/service-ac-repair-technician-las-vegas.jpg", alt: "AC capacitor replacement — common repair in Las Vegas heat" },
  // Air Duct Cleaning category & services
  "air-duct-cleaning-service": { src: "/media/service-air-duct-cleaning-las-vegas.jpg", alt: "Professional air duct cleaning equipment connected to a residential vent in Las Vegas, NV" },
  "air-duct-cleaning": { src: "/media/service-air-duct-cleaning-las-vegas.jpg", alt: "Air duct cleaning service removing dust and allergens in a Las Vegas home" },
  "dryer-vent-cleaning": { src: "/media/service-dryer-vent-cleaning-las-vegas.jpg", alt: "Dryer vent cleaning with rotary brush to prevent fire hazards in Las Vegas, NV" },
  "ductwork-installation": { src: "/media/service-air-duct-cleaning-las-vegas.jpg", alt: "New ductwork installation for efficient HVAC distribution in Las Vegas, NV" },
  "ductwork-repair": { src: "/media/service-air-duct-cleaning-las-vegas.jpg", alt: "Ductwork repair to restore HVAC efficiency in a Las Vegas home" },
  "duct-sealing": { src: "/media/service-air-duct-cleaning-las-vegas.jpg", alt: "Professional duct sealing to eliminate air leaks in Las Vegas, NV" },
  // Furnace Repair category & services
  "furnace-repair-service": { src: "/media/service-furnace-repair-las-vegas.jpg", alt: "Gas furnace open for repair showing burners and heat exchanger in Las Vegas, NV" },
  "furnace-repair": { src: "/media/service-furnace-repair-las-vegas.jpg", alt: "Furnace repair service for a Las Vegas home during winter" },
  "furnace-not-heating-repair": { src: "/media/service-furnace-repair-las-vegas.jpg", alt: "Diagnosing a furnace not heating properly in Las Vegas, NV" },
  "furnace-ignitor-replacement": { src: "/media/service-furnace-repair-las-vegas.jpg", alt: "Furnace ignitor replacement to restore heat in a Las Vegas home" },
  "furnace-blower-motor-replacement": { src: "/media/service-furnace-repair-las-vegas.jpg", alt: "Furnace blower motor replacement for proper airflow in Las Vegas, NV" },
  "furnace-flame-sensor-replacement": { src: "/media/service-furnace-repair-las-vegas.jpg", alt: "Furnace flame sensor replacement to stop short cycling in Las Vegas, NV" },
  "heat-exchanger-replacement": { src: "/media/service-furnace-repair-las-vegas.jpg", alt: "Heat exchanger inspection and replacement for furnace safety in Las Vegas, NV" },
  "boiler-repair": { src: "/media/service-furnace-repair-las-vegas.jpg", alt: "Boiler repair service for Las Vegas residential and commercial properties" },
  "heat-pump-repair": { src: "/media/service-ac-contractor-installation-las-vegas.jpg", alt: "Heat pump repair for year-round comfort in Las Vegas, NV" },
  // Heating Contractor category & services
  "heating-contractor": { src: "/media/service-heating-contractor-furnace-installation-las-vegas.jpg", alt: "New furnace installation with ductwork in a Las Vegas garage" },
  "furnace-installation": { src: "/media/service-heating-contractor-furnace-installation-las-vegas.jpg", alt: "Professional furnace installation in a Las Vegas home" },
  "heat-pump-installation": { src: "/media/service-ac-contractor-installation-las-vegas.jpg", alt: "Heat pump installation for efficient heating and cooling in Las Vegas, NV" },
  "boiler-installation": { src: "/media/service-heating-contractor-furnace-installation-las-vegas.jpg", alt: "Boiler installation for residential heating in Las Vegas, NV" },
  "boiler-replacement": { src: "/media/service-heating-contractor-furnace-installation-las-vegas.jpg", alt: "Boiler replacement upgrade for a Las Vegas property" },
  "radiant-floor-heating-installation": { src: "/media/service-heating-contractor-furnace-installation-las-vegas.jpg", alt: "Radiant floor heating installation for a Las Vegas home" },
  "baseboard-heater-installation": { src: "/media/service-heating-contractor-furnace-installation-las-vegas.jpg", alt: "Baseboard heater installation for supplemental heating in Las Vegas, NV" },
  "gas-furnace-installation": { src: "/media/service-heating-contractor-furnace-installation-las-vegas.jpg", alt: "Gas furnace installation with proper venting in Las Vegas, NV" },
  "electric-furnace-installation": { src: "/media/service-heating-contractor-furnace-installation-las-vegas.jpg", alt: "Electric furnace installation for a Las Vegas residence" },
  "ductless-mini-split-installation": { src: "/media/service-ductless-mini-split-installation-las-vegas.jpg", alt: "Ductless mini-split system installed in a Las Vegas living room" },
  // HVAC Contractor category & services
  "hvac-contractor": { src: "/media/service-hvac-contractor-thermostat-las-vegas.jpg", alt: "Smart thermostat installation and HVAC service in Las Vegas, NV" },
  "hvac-tune-up": { src: "/media/service-ac-repair-technician-las-vegas.jpg", alt: "HVAC tune-up and maintenance service in Las Vegas, NV" },
  "hvac-maintenance": { src: "/media/service-ac-repair-technician-las-vegas.jpg", alt: "Comprehensive HVAC maintenance for Las Vegas homeowners" },
  "hvac-inspection": { src: "/media/service-ac-repair-technician-las-vegas.jpg", alt: "HVAC system inspection and performance evaluation in Las Vegas, NV" },
  "thermostat-installation": { src: "/media/service-hvac-contractor-thermostat-las-vegas.jpg", alt: "Thermostat installation on residential wall in Las Vegas, NV" },
  "smart-thermostat-installation": { src: "/media/service-hvac-contractor-thermostat-las-vegas.jpg", alt: "Smart thermostat installation for energy savings in Las Vegas, NV" },
  "whole-house-humidifier-installation": { src: "/media/service-hvac-contractor-thermostat-las-vegas.jpg", alt: "Whole house humidifier installation for dry Las Vegas air" },
  "whole-house-dehumidifier-installation": { src: "/media/service-hvac-contractor-thermostat-las-vegas.jpg", alt: "Whole house dehumidifier installation in Las Vegas, NV" },
  "uv-air-purifier-installation": { src: "/media/service-air-duct-cleaning-las-vegas.jpg", alt: "UV air purifier installation inside HVAC ductwork in Las Vegas, NV" },
  "air-scrubber-installation": { src: "/media/service-air-duct-cleaning-las-vegas.jpg", alt: "Air scrubber installation for improved indoor air quality in Las Vegas, NV" },
  // Mechanical Contractor category & services
  "mechanical-contractor": { src: "/media/service-mechanical-contractor-commercial-hvac-las-vegas.jpg", alt: "Commercial rooftop HVAC unit on a Las Vegas building with desert mountains" },
  "commercial-hvac-installation": { src: "/media/service-mechanical-contractor-commercial-hvac-las-vegas.jpg", alt: "Commercial HVAC installation for a Las Vegas business" },
  "commercial-hvac-repair": { src: "/media/service-mechanical-contractor-commercial-hvac-las-vegas.jpg", alt: "Commercial HVAC repair service in Las Vegas, NV" },
  "rooftop-unit-installation": { src: "/media/service-mechanical-contractor-commercial-hvac-las-vegas.jpg", alt: "Rooftop HVAC unit installation on a Las Vegas commercial building" },
  "commercial-ventilation-installation": { src: "/media/service-mechanical-contractor-commercial-hvac-las-vegas.jpg", alt: "Commercial ventilation system installation in Las Vegas, NV" },
  "make-up-air-unit-installation": { src: "/media/service-mechanical-contractor-commercial-hvac-las-vegas.jpg", alt: "Make-up air unit installation for a Las Vegas restaurant" },
  "exhaust-fan-installation": { src: "/media/service-mechanical-contractor-commercial-hvac-las-vegas.jpg", alt: "Commercial exhaust fan installation in Las Vegas, NV" },
};

/** Get image for a service or category slug, with fallback */
const getServiceImage = (slug: string, parentSlug?: string) => {
  return SERVICE_IMAGES[slug] || SERVICE_IMAGES[parentSlug || ""] || { src: "/media/right-on-plumbing-heating-and-air-project-01-las-vegas-nv.jpg", alt: "Professional plumbing, HVAC, and electrical service in Las Vegas, NV" };
};

/** Build a contextual paragraph with natural internal links for a service detail page. */
const ContextualLinks = ({ service, siblings }: { service: ServiceItem; siblings: ServiceItem[] }) => {
  const otherServices = siblings.filter(s => s.slug !== service.slug);
  // Pick up to 2 related sibling services to mention
  const related = otherServices.slice(0, 2);
  // Pick a complementary service from a different category
  const otherCategory = SERVICE_CATEGORIES.find(c => c.slug !== service.parentSlug);
  const crossLink = otherCategory?.services[0];

  return (
    <div className="text-muted-foreground mb-8 leading-relaxed space-y-4">
      <p>
        Homeowners in <Link to="/las-vegas" className="text-secondary font-semibold hover:underline">Las Vegas</Link> count on {BUSINESS.name} for dependable {service.name.toLowerCase()} because we combine deep local experience with transparent, upfront pricing. Whether your property is near the Strip, in Summerlin, or in a newer development in the southwest valley, our licensed technicians arrive equipped to handle the job from start to finish.
      </p>
      {related.length > 0 && (
        <p>
          Many customers who need {service.name.toLowerCase()} also benefit from{" "}
          <Link to={`/${service.parentSlug}/${related[0].slug}`} className="text-secondary font-semibold hover:underline">{related[0].name.toLowerCase()}</Link>
          {related[1] && (
            <> and <Link to={`/${service.parentSlug}/${related[1].slug}`} className="text-secondary font-semibold hover:underline">{related[1].name.toLowerCase()}</Link></>
          )}
          {" "}as part of a complete maintenance plan. Addressing multiple issues in a single visit saves time and helps prevent costly callbacks.
        </p>
      )}
      {crossLink && (
        <p>
          Beyond {service.parentSlug === "plumber" ? "plumbing" : service.parentSlug === "drainage-service" ? "drainage" : "this service"}, we also provide expert{" "}
          <Link to={`/${otherCategory!.slug}/${crossLink.slug}`} className="text-secondary font-semibold hover:underline">{crossLink.name.toLowerCase()}</Link>
          {" "}— a service our <Link to="/henderson" className="text-secondary font-semibold hover:underline">Henderson</Link> and <Link to="/boulder-city" className="text-secondary font-semibold hover:underline">Boulder City</Link> customers frequently pair with {service.name.toLowerCase()} to keep their homes comfortable year-round.
        </p>
      )}
      <p>
        Ready to schedule? <Link to="/contact" className="text-secondary font-semibold hover:underline">Request your free {service.name.toLowerCase()} estimate</Link> online or call <a href={`tel:${BUSINESS.phone}`} className="text-secondary font-semibold hover:underline">{BUSINESS.phoneFormatted}</a> for same-day availability.
      </p>
    </div>
  );
};

const ServiceCategoryPage = ({ category }: { category: ReturnType<typeof getCategoryBySlug> }) => {
  if (!category) return null;
  // Pick a complementary category for cross-linking
  const otherCat = SERVICE_CATEGORIES.find(c => c.slug !== category.slug);

  return (
    <>
      <SEO
        title={`${category.name} in Las Vegas, NV | ${BUSINESS.name}`}
        description={`Professional ${category.name.toLowerCase()} services in Las Vegas, NV. ${BUSINESS.name} offers expert solutions — licensed, insured, free estimates. Call ${BUSINESS.phoneFormatted}.`}
        canonical={`/${category.slug}`}
      />
      <PageHero title={`${category.name} in Las Vegas, NV`} subtitle={`Professional ${category.name.toLowerCase()} services — licensed, insured, free estimates.`} bgImage={getServiceImage(category.slug).src} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.name }]} />
      <main className="container-custom section-padding">
        <p className="text-muted-foreground mb-4 max-w-3xl leading-relaxed">{category.description}</p>
        <p className="text-muted-foreground mb-8 max-w-3xl leading-relaxed">
          Our team serves homeowners across <Link to="/las-vegas" className="text-secondary font-semibold hover:underline">Las Vegas</Link>, <Link to="/henderson" className="text-secondary font-semibold hover:underline">Henderson</Link>, and <Link to="/boulder-city" className="text-secondary font-semibold hover:underline">Boulder City</Link> with reliable, same-day {category.name.toLowerCase()} when you need it most.
          {otherCat && (
            <> We also specialize in <Link to={`/${otherCat.slug}`} className="text-secondary font-semibold hover:underline">{otherCat.name.toLowerCase()}</Link>, so you can count on one trusted company for all your home comfort needs.</>
          )}
          {" "}<Link to="/contact" className="text-secondary font-semibold hover:underline">Contact us for a free estimate</Link> — we'll have a licensed technician at your door fast.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {category.services.map(s => (
            <Link to={`/${category.slug}/${s.slug}`} key={s.slug} className="bg-card border border-border rounded-lg p-5 hover:shadow-lg transition-shadow group">
              <h2 className="text-lg font-bold mb-2 group-hover:text-secondary transition-colors">{s.name}</h2>
              <p className="text-sm text-muted-foreground mb-3">{s.description.slice(0, 150)}...</p>
              <span className="text-secondary text-sm font-semibold">Get {s.name} Details →</span>
            </Link>
          ))}
        </div>
      </main>
      <CTABanner />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: category.name, provider: { "@type": "LocalBusiness", name: BUSINESS.name }, areaServed: ["Las Vegas", "Henderson", "Boulder City"], serviceType: category.name }} />
    </>
  );
};

const ServiceDetailPage = ({ service, parentName, siblings }: { service: ReturnType<typeof getServiceBySlug>; parentName: string; siblings: ServiceItem[] }) => {
  if (!service) return null;
  const imgIdx = Math.abs(service.slug.charCodeAt(0) % 12) + 1;
  const imgNum = String(imgIdx).padStart(2, "0");
  return (
    <>
      <SEO
        title={`${service.name} in Las Vegas, NV | ${BUSINESS.name}`}
        description={`Need ${service.name.toLowerCase()} in Las Vegas? ${BUSINESS.name} provides fast, reliable service — licensed & insured. Free estimates. Call ${BUSINESS.phoneFormatted}.`}
        canonical={`/${service.parentSlug}/${service.slug}`}
      />
      <PageHero title={`${service.name} in Las Vegas, NV`} subtitle={`Fast, reliable ${service.name.toLowerCase()} by licensed technicians.`} bgImage={`/media/right-on-plumbing-heating-and-air-project-${imgNum}-las-vegas-nv.jpg`} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: parentName, href: `/${service.parentSlug}` }, { label: service.name }]} />
      <main className="container-custom section-padding">
        <article>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <img src={`/media/right-on-plumbing-heating-and-air-project-${imgNum}-las-vegas-nv.jpg`} alt={`${service.name} completed by ${BUSINESS.name} for a Las Vegas, NV homeowner`} className="rounded-lg w-full h-64 object-cover mb-6" loading="eager" width="800" height="400" />
              <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

              {/* Contextual internal links — woven naturally into prose */}
              <ContextualLinks service={service} siblings={siblings} />

              <h2 className="text-2xl font-bold mb-4">Benefits of Professional {service.name}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                {service.benefits.map((b, i) => <li key={i} className="flex items-center gap-2 text-sm"><span className="text-secondary font-bold">✓</span> {b}</li>)}
              </ul>
              <h2 className="text-2xl font-bold mb-4">Our {service.name} Process</h2>
              <ol className="space-y-3 mb-8">
                {service.process.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="bg-secondary text-secondary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                    <span className="text-muted-foreground text-sm">{step}</span>
                  </li>
                ))}
              </ol>
              <h2 className="text-2xl font-bold mb-4">{service.name} FAQs</h2>
              {service.faqs.map((faq, i) => (
                <div key={i} className="border-b border-border py-4">
                  <h3 className="font-bold mb-1 text-sm">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <aside className="lg:col-span-1">
              <div className="bg-brand-navy text-primary-foreground rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Need {service.name}?</h3>
                <p className="text-sm opacity-80 mb-4">Call Right On Plumbing, Heating and Air for fast, reliable service in Las Vegas, NV.</p>
                <a href={`tel:${BUSINESS.phone}`} className="cta-gradient text-secondary-foreground w-full py-3 rounded-md font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5" /> {BUSINESS.phoneFormatted}
                </a>
                <Link to="/contact" className="block text-center mt-3 text-sm underline opacity-80 hover:opacity-100">Request a Free {service.name} Estimate</Link>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <CTABanner />
      <JsonLd data={{ ...localBusinessSchema }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: service.name, description: service.description, provider: { "@type": "LocalBusiness", name: BUSINESS.name }, areaServed: ["Las Vegas", "Henderson", "Boulder City"], serviceType: service.name }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: service.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
    </>
  );
};

const ServicePage = () => {
  const { categorySlug, serviceSlug } = useParams();
  if (!categorySlug) return null;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;

  if (serviceSlug) {
    const service = getServiceBySlug(categorySlug, serviceSlug);
    if (!service) return null;
    return <><Header /><ServiceDetailPage service={service} parentName={category.name} siblings={category.services} /><Footer /></>;
  }

  return <><Header /><ServiceCategoryPage category={category} /><Footer /></>;
};

export default ServicePage;
