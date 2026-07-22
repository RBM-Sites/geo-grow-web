import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BUSINESS } from "@/data/business";
import { Phone, Mail, MapPin, Clock, Facebook, Menu, X } from "lucide-react";

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="w-full">
        {/* Top utility strip — desktop only */}
        <div className="hidden lg:block bg-brand-dark text-primary-foreground">
          <div className="container-custom flex flex-wrap items-center justify-between py-2 text-sm gap-2">
            <div className="flex items-center gap-4 flex-wrap">
              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-1 hover:text-secondary transition-colors">
                <Mail className="h-3 w-3" /> <span>{BUSINESS.email}</span>
              </a>
              <span className="hidden md:flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {BUSINESS.fullAddress}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href={BUSINESS.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-4 w-4 hover:text-secondary transition-colors" />
              </a>
              <a href={`tel:${BUSINESS.phone}`} className="flex items-center gap-1 font-semibold hover:text-secondary transition-colors">
                <Phone className="h-3 w-3" /> {BUSINESS.phoneFormatted}
              </a>
            </div>
          </div>
        </div>
        <nav
          className={`fixed top-0 left-0 right-0 z-[80] overflow-visible transition-all duration-300 will-change-transform [transform:translateZ(0)] ${scrolled ? "bg-background/75 border-b border-border/60 shadow-sm" : "bg-card shadow-md"}`}
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <div className="container-custom flex items-center justify-between min-h-[4.5rem] py-0 lg:min-h-[4.25rem] lg:py-1">
            <Link to="/" className="flex-shrink-0 relative z-10">
              <img src={BUSINESS.logo} alt={BUSINESS.logoAlt} className={`w-auto max-w-none drop-shadow-md transition-all duration-300 ${scrolled ? "h-[4.75rem] -mb-[0.75rem]" : "h-[10rem] md:h-[12rem] -mb-[4.5rem]"}`} width="220" height="192" />
            </Link>
            {/* Desktop nav */}
            <div className={`hidden lg:flex items-center gap-6 text-sm font-semibold font-heading transition-colors duration-300 ${scrolled ? "text-foreground" : ""}`}>
              <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
              <div className="relative group">
                <span className="cursor-pointer hover:text-secondary transition-colors">Services ▾</span>
                <div className="absolute left-0 top-full hidden group-hover:block bg-card shadow-lg rounded-md py-2 min-w-[220px] z-50 text-foreground">
                  <Link to="/drainage-service" className="block px-4 py-2 hover:bg-muted text-sm">Drainage Service</Link>
                  <Link to="/plumber" className="block px-4 py-2 hover:bg-muted text-sm">Plumber</Link>
                  <Link to="/air-conditioning-contractor" className="block px-4 py-2 hover:bg-muted text-sm">AC Contractor</Link>
                  <Link to="/air-conditioning-repair-service" className="block px-4 py-2 hover:bg-muted text-sm">AC Repair Service</Link>
                  <Link to="/hvac-contractor" className="block px-4 py-2 hover:bg-muted text-sm">HVAC Contractor</Link>
                </div>
              </div>
              <div className="relative group">
                <span className="cursor-pointer hover:text-secondary transition-colors">Service Areas ▾</span>
                <div className="absolute left-0 top-full hidden group-hover:block bg-card shadow-lg rounded-md py-2 min-w-[200px] z-50 text-foreground">
                  <Link to="/las-vegas" className="block px-4 py-2 hover:bg-muted text-sm">Las Vegas</Link>
                  <Link to="/north-las-vegas" className="block px-4 py-2 hover:bg-muted text-sm">North Las Vegas</Link>
                  <Link to="/henderson" className="block px-4 py-2 hover:bg-muted text-sm">Henderson</Link>
                  <Link to="/boulder-city" className="block px-4 py-2 hover:bg-muted text-sm">Boulder City</Link>
                </div>
              </div>
              <Link to="/about" className="hover:text-secondary transition-colors">About</Link>
              <Link to="/gallery" className="hover:text-secondary transition-colors">Gallery</Link>
              <Link to="/reviews" className="hover:text-secondary transition-colors">Reviews</Link>
              <Link to="/faq" className="hover:text-secondary transition-colors">FAQ</Link>
              <Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-3">
              <a href={`tel:${BUSINESS.phone}`} className={`cta-gradient text-secondary-foreground px-5 py-2.5 rounded-md font-bold text-sm hover:opacity-90 transition-opacity hidden sm:flex items-center gap-2 ${scrolled ? "hidden sm:hidden" : ""}`}>
                <Phone className="h-4 w-4" /> Call Now
              </a>
              {/* Mobile hamburger — dark pill backing for visibility on scroll */}
              <button onClick={() => setMobileOpen(!mobileOpen)} className={`lg:hidden p-2 rounded-full transition-all ${scrolled ? "text-primary-foreground bg-brand-navy shadow-md ring-1 ring-primary-foreground/25" : "text-foreground bg-background/90 shadow-sm"}`} aria-label="Toggle navigation menu">
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {/* Mobile menu */}
          {mobileOpen && (
            <div className="lg:hidden bg-card border-t border-border px-4 pb-4 shadow-lg">
              <div className="flex flex-col text-sm font-semibold font-heading">
                <Link to="/" onClick={() => setMobileOpen(false)} className="py-3 border-b border-border hover:text-secondary">Home</Link>
                <span className="py-3 border-b border-border text-muted-foreground text-xs uppercase tracking-wider">Services</span>
                <Link to="/drainage-service" onClick={() => setMobileOpen(false)} className="py-2 pl-4 hover:text-secondary">Drainage Service</Link>
                <Link to="/plumber" onClick={() => setMobileOpen(false)} className="py-2 pl-4 hover:text-secondary">Plumber</Link>
                <Link to="/air-conditioning-contractor" onClick={() => setMobileOpen(false)} className="py-2 pl-4 hover:text-secondary">AC Contractor</Link>
                <Link to="/air-conditioning-repair-service" onClick={() => setMobileOpen(false)} className="py-2 pl-4 hover:text-secondary">AC Repair Service</Link>
                <Link to="/hvac-contractor" onClick={() => setMobileOpen(false)} className="py-2 pl-4 border-b border-border hover:text-secondary">HVAC Contractor</Link>
                <span className="py-3 border-b border-border text-muted-foreground text-xs uppercase tracking-wider">Service Areas</span>
                <Link to="/las-vegas" onClick={() => setMobileOpen(false)} className="py-2 pl-4 hover:text-secondary">Las Vegas</Link>
                <Link to="/north-las-vegas" onClick={() => setMobileOpen(false)} className="py-2 pl-4 hover:text-secondary">North Las Vegas</Link>
                <Link to="/henderson" onClick={() => setMobileOpen(false)} className="py-2 pl-4 hover:text-secondary">Henderson</Link>
                <Link to="/boulder-city" onClick={() => setMobileOpen(false)} className="py-2 pl-4 border-b border-border hover:text-secondary">Boulder City</Link>
                <Link to="/about" onClick={() => setMobileOpen(false)} className="py-3 border-b border-border hover:text-secondary">About</Link>
                <Link to="/gallery" onClick={() => setMobileOpen(false)} className="py-3 border-b border-border hover:text-secondary">Gallery</Link>
                <Link to="/reviews" onClick={() => setMobileOpen(false)} className="py-3 border-b border-border hover:text-secondary">Reviews</Link>
                <Link to="/faq" onClick={() => setMobileOpen(false)} className="py-3 border-b border-border hover:text-secondary">FAQ</Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="py-3 border-b border-border hover:text-secondary">Contact</Link>
                <a href={`tel:${BUSINESS.phone}`} className="cta-gradient text-secondary-foreground mt-4 py-3 rounded-md font-bold text-center flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" /> Call {BUSINESS.phoneFormatted}
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Sticky bottom click-to-call button — appears on scroll, mobile only */}
      <div className={`fixed bottom-4 left-4 right-4 z-[60] lg:hidden transition-all duration-300 ${scrolled ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
        <a
          href={`tel:${BUSINESS.phone}`}
          className="cta-gradient flex items-center justify-center gap-2 py-3.5 rounded-xl text-secondary-foreground font-bold text-lg shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
        >
          <Phone className="h-5 w-5" /> Call Now — {BUSINESS.phoneFormatted}
        </a>
      </div>
    </>
  );
};

/** Reusable inner-page hero banner */
export const PageHero = ({ title, subtitle, bgImage }: { title: string; subtitle?: string; bgImage: string }) => (
  <section className="relative min-h-[35vh] flex items-center pt-24 md:pt-28" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
    <div className="hero-overlay absolute inset-0" />
    <div className="container-custom relative z-10 py-16">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-foreground max-w-3xl leading-tight">{title}</h1>
      {subtitle && <p className="text-lg text-primary-foreground/90 max-w-xl mt-4">{subtitle}</p>}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <a href={`tel:${BUSINESS.phone}`} className="cta-gradient text-secondary-foreground px-6 py-3 rounded-md font-bold text-base hover:opacity-90 transition-opacity inline-flex items-center gap-2">
          <Phone className="h-5 w-5" /> Call {BUSINESS.phoneFormatted}
        </a>
        <Link to="/contact" className="border-2 border-primary-foreground text-primary-foreground px-6 py-3 rounded-md font-bold text-base hover:bg-primary-foreground/10 transition-colors inline-flex items-center justify-center">
          Get a Free Estimate
        </Link>
      </div>
    </div>
  </section>
);

export const Footer = () => {
  return (
    <footer className="section-dark text-primary-foreground">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src={BUSINESS.logo} alt={BUSINESS.logoAlt} className="h-16 w-auto mb-4 rounded" width="140" height="64" />
            <p className="text-sm opacity-80 mb-4">{BUSINESS.name} provides expert {BUSINESS.industry} services in Las Vegas, NV and surrounding areas. Licensed & insured, locally owned & operated.</p>
            <div className="flex gap-3">
              <a href={BUSINESS.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-secondary transition-colors"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/drainage-service" className="hover:text-secondary transition-colors">Drainage Service</Link></li>
              <li><Link to="/plumber" className="hover:text-secondary transition-colors">Plumber</Link></li>
              <li><Link to="/air-conditioning-contractor" className="hover:text-secondary transition-colors">AC Contractor</Link></li>
              <li><Link to="/air-conditioning-repair-service" className="hover:text-secondary transition-colors">AC Repair</Link></li>
              <li><Link to="/hvac-contractor" className="hover:text-secondary transition-colors">HVAC Contractor</Link></li>
              <li><Link to="/faq" className="hover:text-secondary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Service Areas</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/las-vegas" className="hover:text-secondary transition-colors">Las Vegas, NV</Link></li>
              <li><Link to="/north-las-vegas" className="hover:text-secondary transition-colors">North Las Vegas, NV</Link></li>
              <li><Link to="/henderson" className="hover:text-secondary transition-colors">Henderson, NV</Link></li>
              <li><Link to="/boulder-city" className="hover:text-secondary transition-colors">Boulder City, NV</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" /> {BUSINESS.fullAddress}</li>
              <li><a href={`tel:${BUSINESS.phone}`} className="flex items-center gap-2 hover:text-secondary transition-colors"><Phone className="h-4 w-4" /> {BUSINESS.phoneFormatted}</a></li>
              <li><a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 hover:text-secondary transition-colors"><Mail className="h-4 w-4" /> {BUSINESS.email}</a></li>
              <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 flex-shrink-0" /> Mon–Sat: 7:30 AM – 5:30 PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-10 pt-6 text-center text-sm opacity-60">
          <p>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export const Breadcrumbs = ({ items }: { items: { label: string; href?: string }[] }) => (
  <nav aria-label="Breadcrumb" className="container-custom py-3 text-sm">
    <ol className="flex flex-wrap items-center gap-1 text-muted-foreground" itemScope itemType="https://schema.org/BreadcrumbList">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-1" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          {item.href ? (
            <Link to={item.href} itemProp="item" className="hover:text-secondary transition-colors"><span itemProp="name">{item.label}</span></Link>
          ) : (
            <span itemProp="name" className="text-foreground font-medium">{item.label}</span>
          )}
          <meta itemProp="position" content={String(i + 1)} />
          {i < items.length - 1 && <span className="mx-1">›</span>}
        </li>
      ))}
    </ol>
  </nav>
);

export const CTABanner = () => (
  <section className="cta-gradient section-padding text-secondary-foreground text-center">
    <div className="container-custom">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">Contact Right On Plumbing, Heating and Air for a free estimate on any plumbing or HVAC service in Las Vegas, NV.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href={`tel:${BUSINESS.phone}`} className="bg-brand-dark text-primary-foreground px-8 py-3 rounded-md font-bold hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2">
          <Phone className="h-5 w-5" /> {BUSINESS.phoneFormatted}
        </a>
        <Link to="/contact" className="bg-primary-foreground text-brand-dark px-8 py-3 rounded-md font-bold hover:opacity-90 transition-opacity">
          Contact Us Online
        </Link>
      </div>
    </div>
  </section>
);

export const GoogleMapEmbed = () => (
  <section className="container-custom py-12">
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Our Service Area</h2>
    <div className="rounded-xl overflow-hidden shadow-lg border border-border">
      <iframe
        title={`${BUSINESS.name} location on Google Maps`}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d543395.2790567018!2d-115.15446405!3d36.14924595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8eba5a2c1f23d%3A0x16d9b7a75a36309a!2sRight%20On%20Plumbing%20LLC!5e1!3m2!1sen!2sus!4v1774979859726!5m2!1sen!2sus"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full"
      />
    </div>
  </section>
);

export const JsonLd = ({ data }: { data: object }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Plumber", "HVACBusiness"],
  name: BUSINESS.name,
  description: `${BUSINESS.industry} services in Las Vegas, NV. Licensed & insured, locally owned & operated. Free estimates.`,
  url: "https://rightonplumbingandair.com",
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.state,
    postalCode: BUSINESS.address.zip,
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
  openingHoursSpecification: BUSINESS.hours.filter(h => h.open !== "Closed").map(h => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.day,
    opens: h.open,
    closes: h.close,
  })),
  areaServed: ["Las Vegas", "North Las Vegas", "Henderson", "Boulder City"].map(c => ({ "@type": "City", name: c })),
  image: "https://rightonplumbingandair.com/media/right-on-plumbing-heating-and-air-logo.jpeg",
  logo: "https://rightonplumbingandair.com/media/right-on-plumbing-heating-and-air-logo.jpeg",
  sameAs: [BUSINESS.social.facebook, BUSINESS.social.google],
  priceRange: "$$",
};