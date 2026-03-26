import { useParams, Link } from "react-router-dom";
import { Header, Footer, Breadcrumbs, CTABanner, JsonLd, localBusinessSchema } from "@/components/Layout";
import { getCategoryBySlug, getServiceBySlug, BUSINESS, SERVICE_CATEGORIES } from "@/data/business";
import { Phone } from "lucide-react";

const ServiceCategoryPage = ({ category }: { category: ReturnType<typeof getCategoryBySlug> }) => {
  if (!category) return null;
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.name }]} />
      <main className="container-custom section-padding">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{category.name} in Las Vegas, NV</h1>
        <p className="text-muted-foreground mb-8 max-w-3xl">{category.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {category.services.map(s => (
            <Link to={`/${category.slug}/${s.slug}`} key={s.slug} className="bg-card border border-border rounded-lg p-5 hover:shadow-lg transition-shadow group">
              <h2 className="text-lg font-bold mb-2 group-hover:text-secondary transition-colors">{s.name}</h2>
              <p className="text-sm text-muted-foreground mb-3">{s.description.slice(0, 150)}...</p>
              <span className="text-secondary text-sm font-semibold">Learn More →</span>
            </Link>
          ))}
        </div>
        <p className="text-muted-foreground">We proudly serve homeowners and businesses in <Link to="/las-vegas" className="text-secondary font-semibold hover:underline">Las Vegas</Link>, <Link to="/henderson" className="text-secondary font-semibold hover:underline">Henderson</Link>, and <Link to="/boulder-city" className="text-secondary font-semibold hover:underline">Boulder City</Link> with expert {category.name.toLowerCase()} services.</p>
      </main>
      <CTABanner />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: category.name, provider: { "@type": "LocalBusiness", name: BUSINESS.name }, areaServed: ["Las Vegas", "Henderson", "Boulder City"], serviceType: category.name }} />
    </>
  );
};

const ServiceDetailPage = ({ service, parentName }: { service: ReturnType<typeof getServiceBySlug>; parentName: string }) => {
  if (!service) return null;
  const imgIdx = Math.abs(service.slug.charCodeAt(0) % 12) + 1;
  const imgNum = String(imgIdx).padStart(2, "0");
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: parentName, href: `/${service.parentSlug}` }, { label: service.name }]} />
      <main className="container-custom section-padding">
        <article>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{service.name} in Las Vegas, NV</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <img src={`/images/right-on-plumbing-heating-and-air-project-${imgNum}-las-vegas-nv.jpg`} alt={`${service.name} service — Right On Plumbing, Heating and Air Las Vegas, NV`} className="rounded-lg w-full h-64 object-cover mb-6" loading="eager" width="800" height="400" />
              <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
              <h2 className="text-2xl font-bold mb-4">Benefits of {service.name}</h2>
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
                <Link to="/contact" className="block text-center mt-3 text-sm underline opacity-80 hover:opacity-100">Or Contact Us Online</Link>
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
    document.title = `${service.name} in Las Vegas, NV | ${BUSINESS.name}`;
    return <><Header /><ServiceDetailPage service={service} parentName={category.name} /><Footer /></>;
  }

  document.title = `${category.name} in Las Vegas, NV | ${BUSINESS.name}`;
  return <><Header /><ServiceCategoryPage category={category} /><Footer /></>;
};

export default ServicePage;