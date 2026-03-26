import { useParams, Link } from "react-router-dom";
import { Header, Footer, Breadcrumbs, CTABanner, JsonLd, localBusinessSchema } from "@/components/Layout";
import SEO from "@/components/SEO";
import { getCategoryBySlug, getServiceBySlug, BUSINESS, SERVICE_CATEGORIES, ServiceItem } from "@/data/business";
import { Phone } from "lucide-react";

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
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.name }]} />
      <main className="container-custom section-padding">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{category.name} in Las Vegas, NV</h1>
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
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: parentName, href: `/${service.parentSlug}` }, { label: service.name }]} />
      <main className="container-custom section-padding">
        <article>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{service.name} in Las Vegas, NV</h1>
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
