import { Link } from "react-router-dom";
import { Header, Footer, GoogleMapEmbed } from "@/components/Layout";
import SEO from "@/components/SEO";
import { BUSINESS } from "@/data/business";
import { Phone, CheckCircle } from "lucide-react";

const ThankYouPage = () => {
  return (
    <>
      <SEO
        title={`Thank You | ${BUSINESS.name}`}
        description={`Thank you for contacting ${BUSINESS.name}. We'll respond within one business day. For immediate assistance, call ${BUSINESS.phoneFormatted}.`}
        canonical="/thank-you"
        noindex
      />
      <Header />
      <main className="container-custom section-padding text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-secondary text-secondary-foreground w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Thank You for Contacting Us!</h1>
        <p className="text-muted-foreground max-w-lg mx-auto mb-6 leading-relaxed">
          We've received your request and a member of our team will be in touch shortly. We typically respond within one business day.
        </p>
        <p className="text-muted-foreground mb-8">
          Need immediate assistance? Call us directly:
        </p>
        <a href={`tel:${BUSINESS.phone}`} className="cta-gradient text-secondary-foreground px-8 py-4 rounded-md font-bold text-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2 mb-8">
          <Phone className="h-5 w-5" /> {BUSINESS.phoneFormatted}
        </a>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/" className="text-secondary font-semibold hover:underline">← Return to Homepage</Link>
          <Link to="/gallery" className="text-secondary font-semibold hover:underline">Browse Our Project Gallery</Link>
          <Link to="/reviews" className="text-secondary font-semibold hover:underline">Read Customer Reviews</Link>
        </div>
      </main>
      <GoogleMapEmbed />
      <Footer />
    </>
  );
};

export default ThankYouPage;
