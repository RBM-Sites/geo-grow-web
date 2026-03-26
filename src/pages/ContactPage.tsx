import { Link } from "react-router-dom";
import { Header, Footer, Breadcrumbs, JsonLd, localBusinessSchema } from "@/components/Layout";
import { BUSINESS, SERVICE_CATEGORIES, LOCATIONS } from "@/data/business";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
  document.title = `Contact ${BUSINESS.name} | ${BUSINESS.industry} Las Vegas, NV`;

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <main className="container-custom section-padding">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact {BUSINESS.name}</h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Ready to schedule service or have a question about your plumbing, HVAC, or electrical needs? Reach out to our Las Vegas team — we offer free estimates and fast response times.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info + Map */}
          <div>
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Phone</p>
                    <a href={`tel:${BUSINESS.phone}`} className="text-secondary hover:underline font-bold">{BUSINESS.phoneFormatted}</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Email</p>
                    <a href={`mailto:${BUSINESS.email}`} className="text-secondary hover:underline">{BUSINESS.email}</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Address</p>
                    <p className="text-muted-foreground">{BUSINESS.fullAddress}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Business Hours</p>
                    <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                      {BUSINESS.hours.map(h => (
                        <li key={h.day} className="flex justify-between gap-4">
                          <span className="font-medium">{h.day}</span>
                          <span>{h.open === "Closed" ? `Closed – ${h.close}` : `${h.open} – ${h.close}`}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-lg overflow-hidden border border-border">
              <iframe
                title={`${BUSINESS.name} location on Google Maps`}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(BUSINESS.fullAddress)}`}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <h2 className="text-xl font-bold mt-8 mb-3">Service Areas</h2>
            <div className="flex flex-wrap gap-3">
              {LOCATIONS.map(loc => (
                <Link key={loc.slug} to={`/${loc.slug}`} className="bg-muted px-4 py-2 rounded-md text-sm font-medium hover:text-secondary transition-colors">
                  {loc.city}, {loc.state}
                </Link>
              ))}
            </div>
          </div>

          {/* Form Placeholder */}
          <div>
            <div className="bg-muted rounded-lg p-8 border border-border">
              <h2 className="text-xl font-bold mb-2">Request a Free Estimate</h2>
              <p className="text-muted-foreground text-sm mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>
              
              {/* PLACEHOLDER: Embed intake form code here */}
              <div className="bg-card border-2 border-dashed border-border rounded-lg p-10 text-center">
                <p className="text-muted-foreground font-medium mb-2">Intake Form Placeholder</p>
                <p className="text-sm text-muted-foreground">Your form embed code will be placed here.</p>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">Or call us directly:</p>
                <a href={`tel:${BUSINESS.phone}`} className="cta-gradient text-secondary-foreground px-6 py-3 rounded-md font-bold hover:opacity-90 transition-opacity inline-flex items-center gap-2 mt-2">
                  <Phone className="h-5 w-5" /> {BUSINESS.phoneFormatted}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <JsonLd data={localBusinessSchema} />
      <Footer />
    </>
  );
};

export default ContactPage;