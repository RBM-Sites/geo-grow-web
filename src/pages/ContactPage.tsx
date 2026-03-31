import { Link } from "react-router-dom";
import { Header, Footer, Breadcrumbs, JsonLd, localBusinessSchema, PageHero, GoogleMapEmbed } from "@/components/Layout";
import SEO from "@/components/SEO";
import { BUSINESS, SERVICE_CATEGORIES, LOCATIONS } from "@/data/business";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
  return (
    <>
      <SEO
        title={`Contact ${BUSINESS.name} | ${BUSINESS.industry} in Las Vegas, NV`}
        description={`Contact ${BUSINESS.name} for plumbing and HVAC services in Las Vegas, NV. Free estimates, fast response. Call ${BUSINESS.phoneFormatted} or request service online.`}
        canonical="/contact"
      />
      <Header />
      <PageHero title={`Contact ${BUSINESS.name}`} subtitle="Ready to schedule service or have a question? Reach out — we offer free estimates and fast response times." bgImage="/media/hero-contact-plumbing-las-vegas.jpg" />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <main className="container-custom section-padding">

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
                          <span>{h.open === "Closed" ? "Closed" : `${h.open} – ${h.close}`}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Map — links to business listing */}
            <div className="rounded-lg overflow-hidden border border-border">
              <iframe
                title={`${BUSINESS.name} location on Google Maps`}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d543395.2790567018!2d-115.15446405!3d36.14924595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8eba5a2c1f23d%3A0x16d9b7a75a36309a!2sRight%20On%20Plumbing%20LLC!5e1!3m2!1sen!2sus!4v1774979859726!5m2!1sen!2sus"
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
                  {BUSINESS.industry} in {loc.city}, {loc.state}
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
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/iL4p3848WjTeVv8Ft1y4"
                style={{ width: "100%", height: "686px", border: "none", borderRadius: "4px" }}
                id="inline-iL4p3848WjTeVv8Ft1y4"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Website Contact Form"
                data-height="686"
                data-layout-iframe-id="inline-iL4p3848WjTeVv8Ft1y4"
                data-form-id="iL4p3848WjTeVv8Ft1y4"
                title="Website Contact Form"
                loading="lazy"
              />
              
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
      <GoogleMapEmbed />
      <JsonLd data={localBusinessSchema} />
      <Footer />
    </>
  );
};

export default ContactPage;
