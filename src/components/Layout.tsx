import { Link } from "react-router-dom";
import { BUSINESS } from "@/data/business";
import { Phone, Mail, MapPin, Clock, Facebook } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full">
      <div className="bg-brand-dark text-primary-foreground">
        <div className="container-custom flex flex-wrap items-center justify-between py-2 text-sm gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-1 hover:text-secondary transition-colors">
              <Mail className="h-3 w-3" /> {BUSINESS.email}
            </a>
            <span className="flex items-center gap-1">
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
      <nav className="bg-card shadow-md sticky top-0 z-50">
        <div className="container-custom flex items-center justify-between py-3">
          <Link to="/" className="flex-shrink-0">
            <img src={BUSINESS.logo} alt={BUSINESS.logoAlt} className="h-14 w-auto" width="120" height="56" />
          </Link>
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold font-heading">
            <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
            <div className="relative group">
              <span className="cursor-pointer hover:text-secondary transition-colors">Services ▾</span>
              <div className="absolute left-0 top-full hidden group-hover:block bg-card shadow-lg rounded-md py-2 min-w-[220px] z-50">
                <Link to="/drainage-service" className="block px-4 py-2 hover:bg-muted text-sm">Drainage Service</Link>
                <Link to="/plumber" className="block px-4 py-2 hover:bg-muted text-sm">Plumber</Link>
                <Link to="/air-conditioning-contractor" className="block px-4 py-2 hover:bg-muted text-sm">AC Contractor</Link>
                <Link to="/air-conditioning-repair-service" className="block px-4 py-2 hover:bg-muted text-sm">AC Repair Service</Link>
                <Link to="/air-duct-cleaning-service" className="block px-4 py-2 hover:bg-muted text-sm">Air Duct Cleaning</Link>
                <Link to="/furnace-repair-service" className="block px-4 py-2 hover:bg-muted text-sm">Furnace Repair</Link>
                <Link to="/heating-contractor" className="block px-4 py-2 hover:bg-muted text-sm">Heating Contractor</Link>
                <Link to="/hvac-contractor" className="block px-4 py-2 hover:bg-muted text-sm">HVAC Contractor</Link>
                <Link to="/mechanical-contractor" className="block px-4 py-2 hover:bg-muted text-sm">Mechanical Contractor</Link>
              </div>
            </div>
            <div className="relative group">
              <span className="cursor-pointer hover:text-secondary transition-colors">Service Areas ▾</span>
              <div className="absolute left-0 top-full hidden group-hover:block bg-card shadow-lg rounded-md py-2 min-w-[200px] z-50">
                <Link to="/las-vegas" className="block px-4 py-2 hover:bg-muted text-sm">Las Vegas</Link>
                <Link to="/henderson" className="block px-4 py-2 hover:bg-muted text-sm">Henderson</Link>
                <Link to="/boulder-city" className="block px-4 py-2 hover:bg-muted text-sm">Boulder City</Link>
              </div>
            </div>
            <Link to="/about" className="hover:text-secondary transition-colors">About</Link>
            <Link to="/gallery" className="hover:text-secondary transition-colors">Gallery</Link>
            <Link to="/reviews" className="hover:text-secondary transition-colors">Reviews</Link>
            <Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link>
          </div>
          <a href={`tel:${BUSINESS.phone}`} className="cta-gradient text-secondary-foreground px-5 py-2.5 rounded-md font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
            <Phone className="h-4 w-4" /> Call Now
          </a>
        </div>
      </nav>
    </header>
  );
};

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
              <li><Link to="/air-duct-cleaning-service" className="hover:text-secondary transition-colors">Air Duct Cleaning</Link></li>
              <li><Link to="/furnace-repair-service" className="hover:text-secondary transition-colors">Furnace Repair</Link></li>
              <li><Link to="/heating-contractor" className="hover:text-secondary transition-colors">Heating Contractor</Link></li>
              <li><Link to="/hvac-contractor" className="hover:text-secondary transition-colors">HVAC Contractor</Link></li>
              <li><Link to="/mechanical-contractor" className="hover:text-secondary transition-colors">Mechanical Contractor</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Service Areas</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/las-vegas" className="hover:text-secondary transition-colors">Las Vegas, NV</Link></li>
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
      <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">Contact Right On Plumbing, Heating and Air for a free estimate on any plumbing, HVAC, or electrical service in Las Vegas, NV.</p>
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

export const JsonLd = ({ data }: { data: object }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Plumber", "HVACBusiness"],
  name: BUSINESS.name,
  description: `${BUSINESS.industry} services in Las Vegas, NV. Licensed & insured, locally owned & operated. Free estimates.`,
  url: "https://rightonplumbing.org",
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
  areaServed: ["Las Vegas", "Henderson", "Boulder City"].map(c => ({ "@type": "City", name: c })),
  image: "https://rightonplumbing.org/media/right-on-plumbing-heating-and-air-logo.jpeg",
  logo: "https://rightonplumbing.org/media/right-on-plumbing-heating-and-air-logo.jpeg",
  sameAs: [BUSINESS.social.facebook, BUSINESS.social.google],
  priceRange: "$$",
};