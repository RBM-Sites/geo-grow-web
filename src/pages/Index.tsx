import { Link } from "react-router-dom";
import { Header, Footer, CTABanner, JsonLd, localBusinessSchema } from "@/components/Layout";
import SEO from "@/components/SEO";
import { BUSINESS, SERVICE_CATEGORIES, LOCATIONS } from "@/data/business";
import { Phone, Shield, Award, Star, MapPin, Wrench, Thermometer, Droplets } from "lucide-react";

const projectAltTexts = [
  "Residential water heater installation completed by Right On Plumbing in Las Vegas, NV",
  "Emergency drain cleaning service at a Las Vegas home",
  "New AC unit installed for a Henderson, NV homeowner",
  "Whole-home HVAC system replacement in the Las Vegas Valley",
  "Sewer camera inspection revealing root intrusion in a Las Vegas property",
  "Tankless water heater upgrade for a Boulder City, NV residence",
];

const HomePage = () => {
  return (
    <>
      <SEO
        title="Plumbing, HVAC & Electrical in Las Vegas, NV | Right On Plumbing, Heating and Air"
        description="Right On Plumbing, Heating and Air provides expert plumbing, HVAC, and electrical services in Las Vegas, NV. Licensed & insured, locally owned. Call (503) 932-8244 for a free estimate."
        canonical="/"
      />
      <Header />
      <JsonLd data={localBusinessSchema} />
      <main>
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center" style={{ backgroundImage: "url(/media/right-on-plumbing-heating-and-air-project-01-las-vegas-nv.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="hero-overlay absolute inset-0" />
          <div className="container-custom relative z-10 py-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground max-w-3xl leading-tight mb-6">
              Expert Plumbing, HVAC & Electrical in Las Vegas, NV
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-xl mb-8">Locally owned & operated for over {BUSINESS.yearsInBusiness} years. Licensed, insured, and committed to getting the job done right — the first time.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${BUSINESS.phone}`} className="cta-gradient text-secondary-foreground px-8 py-4 rounded-md font-bold text-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                <Phone className="h-5 w-5" /> Get a Free Estimate
              </a>
              <Link to="/contact" className="border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-md font-bold text-lg hover:bg-primary-foreground/10 transition-colors">
                Schedule Service Online
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="bg-brand-navy text-primary-foreground py-4">
          <div className="container-custom flex flex-wrap justify-center gap-8 text-sm font-semibold">
            <span className="flex items-center gap-2"><Shield className="h-5 w-5 text-secondary" /> Licensed & Insured</span>
            <span className="flex items-center gap-2"><Award className="h-5 w-5 text-secondary" /> {BUSINESS.yearsInBusiness}+ Years Experience</span>
            <span className="flex items-center gap-2"><Star className="h-5 w-5 text-secondary" /> {BUSINESS.reviews.average}★ Rating ({BUSINESS.reviews.count} Reviews)</span>
            <span className="flex items-center gap-2"><Wrench className="h-5 w-5 text-secondary" /> Free Estimates</span>
          </div>
        </section>

        {/* Intro with contextual links */}
        <section className="section-padding bg-background">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Trusted Home Service Team in Las Vegas</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {BUSINESS.name} is the locally owned company <Link to="/las-vegas" className="text-secondary font-semibold hover:underline">Las Vegas</Link> homeowners call for everything from a leaking faucet to a complete HVAC overhaul. Our licensed technicians handle <Link to="/drainage-service" className="text-secondary font-semibold hover:underline">drainage service</Link> — including <Link to="/drainage-service/drain-cleaning" className="text-secondary font-semibold hover:underline">drain cleaning</Link> and <Link to="/drainage-service/sewer-camera-inspection" className="text-secondary font-semibold hover:underline">sewer camera inspections</Link> — alongside full-service <Link to="/plumber" className="text-secondary font-semibold hover:underline">plumbing</Link>, <Link to="/hvac-contractor" className="text-secondary font-semibold hover:underline">HVAC contracting</Link>, and electrical work.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              When summer temperatures push past 115°, a working air conditioner isn't optional — it's survival. That's why our <Link to="/air-conditioning-repair-service" className="text-secondary font-semibold hover:underline">AC repair service</Link> offers same-day response across the valley. And when winter nights dip below freezing, our <Link to="/furnace-repair-service" className="text-secondary font-semibold hover:underline">furnace repair</Link> team keeps your family warm without the runaround.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We proudly serve homeowners in <Link to="/henderson" className="text-secondary font-semibold hover:underline">Henderson</Link> and <Link to="/boulder-city" className="text-secondary font-semibold hover:underline">Boulder City</Link> with the same dedication. Whether you need a <Link to="/plumber/tankless-water-heater-installation" className="text-secondary font-semibold hover:underline">tankless water heater installation</Link> or <Link to="/air-duct-cleaning-service" className="text-secondary font-semibold hover:underline">air duct cleaning</Link>, <Link to="/contact" className="text-secondary font-semibold hover:underline">contact us for a free estimate</Link> and see why our neighbors trust us with their homes.
            </p>
          </div>
        </section>

        {/* Services Overview */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Professional Services</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">From emergency plumbing repairs to complete HVAC system installations, Right On Plumbing, Heating and Air handles every job with expertise and care.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICE_CATEGORIES.map(cat => {
                const icons: Record<string, React.ReactNode> = {
                  "drainage-service": <Droplets className="h-8 w-8" />,
                  "plumber": <Wrench className="h-8 w-8" />,
                  "air-conditioning-contractor": <Thermometer className="h-8 w-8" />,
                  "air-conditioning-repair-service": <Thermometer className="h-8 w-8" />,
                  "air-duct-cleaning-service": <Wrench className="h-8 w-8" />,
                  "furnace-repair-service": <Thermometer className="h-8 w-8" />,
                  "heating-contractor": <Thermometer className="h-8 w-8" />,
                  "hvac-contractor": <Thermometer className="h-8 w-8" />,
                  "mechanical-contractor": <Wrench className="h-8 w-8" />,
                };
                return (
                  <Link to={`/${cat.slug}`} key={cat.slug} className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-border group">
                    <div className="text-secondary mb-4">{icons[cat.slug]}</div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{cat.description.slice(0, 120)}...</p>
                    <span className="text-secondary font-semibold text-sm">Explore {cat.name} Services →</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Las Vegas Homeowners Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BUSINESS.usps.map((usp, i) => (
                <div key={i} className="text-center">
                  <div className="bg-secondary text-secondary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {i === 0 ? <Shield className="h-8 w-8" /> : i === 1 ? <MapPin className="h-8 w-8" /> : <Star className="h-8 w-8" />}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{usp}</h3>
                  <p className="text-muted-foreground text-sm">Trust our experienced team to deliver quality workmanship on every project in the Las Vegas area.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Work */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Recent Projects in Las Vegas</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {projectAltTexts.map((alt, i) => (
                <img key={i} src={`/media/right-on-plumbing-heating-and-air-project-0${i + 1}-las-vegas-nv.jpg`} alt={alt} className="rounded-lg w-full h-48 md:h-64 object-cover" loading="lazy" width="400" height="300" />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/gallery" className="cta-gradient text-secondary-foreground px-6 py-3 rounded-md font-bold hover:opacity-90 transition-opacity">Browse Our Full Project Gallery</Link>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Areas We Serve</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LOCATIONS.map(loc => (
                <Link to={`/${loc.slug}`} key={loc.slug} className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-border text-center">
                  <MapPin className="h-8 w-8 text-secondary mx-auto mb-3" />
                  <h3 className="text-xl font-bold mb-1">{loc.city}, {loc.state}</h3>
                  <p className="text-sm text-muted-foreground">{BUSINESS.industry} Services</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="section-padding bg-muted">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { text: "Right On Plumbing fixed our AC the same day we called. Professional, courteous, and fair pricing. Highly recommend!", name: "Sarah M.", city: "Las Vegas" },
                { text: "Had a plumbing emergency on a Saturday and they were at our door within an hour. Outstanding service from start to finish.", name: "Mike T.", city: "Henderson" },
                { text: "Installed our new water heater and did an amazing job. Clean work, explained everything, and priced fairly.", name: "Jennifer L.", city: "Las Vegas" },
              ].map((review, i) => (
                <div key={i} className="bg-card rounded-lg p-6 shadow-md border border-border">
                  <div className="flex gap-1 text-secondary mb-3">{[...Array(5)].map((_, j) => <Star key={j} className="h-5 w-5 fill-current" />)}</div>
                  <p className="text-sm text-muted-foreground mb-4">"{review.text}"</p>
                  <p className="font-bold text-sm">— {review.name}, {review.city}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/reviews" className="text-secondary font-bold hover:underline">Read All Customer Reviews →</Link>
            </div>
          </div>
        </section>

        <CTABanner />

        {/* FAQ */}
        <section className="section-padding bg-background">
          <div className="container-custom max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            {[
              { q: "What services does Right On Plumbing, Heating and Air provide?", a: "We provide comprehensive plumbing, HVAC, and electrical services including drain cleaning, water heater installation, AC repair and installation, furnace repair, and much more for residential and commercial properties in Las Vegas, NV." },
              { q: "Do you offer free estimates?", a: "Yes, we provide free estimates and free inspections for all our services. Call (503) 932-8244 to schedule yours." },
              { q: "Are you licensed and insured?", a: "Yes, Right On Plumbing, Heating and Air is fully licensed and insured to perform plumbing, HVAC, and electrical work in Las Vegas, NV and surrounding areas." },
              { q: "What areas do you serve?", a: "We serve Las Vegas, Henderson, Boulder City, and surrounding communities in the Las Vegas Valley." },
            ].map((faq, i) => (
              <div key={i} className="border-b border-border py-4">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "What services does Right On Plumbing, Heating and Air provide?", acceptedAnswer: { "@type": "Answer", text: "We provide comprehensive plumbing, HVAC, and electrical services including drain cleaning, water heater installation, AC repair and installation, furnace repair, and much more for residential and commercial properties in Las Vegas, NV." }},
            { "@type": "Question", name: "Do you offer free estimates?", acceptedAnswer: { "@type": "Answer", text: "Yes, we provide free estimates and free inspections for all our services. Call (503) 932-8244 to schedule yours." }},
            { "@type": "Question", name: "Are you licensed and insured?", acceptedAnswer: { "@type": "Answer", text: "Yes, Right On Plumbing, Heating and Air is fully licensed and insured to perform plumbing, HVAC, and electrical work in Las Vegas, NV and surrounding areas." }},
            { "@type": "Question", name: "What areas do you serve?", acceptedAnswer: { "@type": "Answer", text: "We serve Las Vegas, Henderson, Boulder City, and surrounding communities in the Las Vegas Valley." }},
          ]
        }} />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
