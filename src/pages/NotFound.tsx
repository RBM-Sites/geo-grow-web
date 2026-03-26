import { Link } from "react-router-dom";
import { Header, Footer } from "@/components/Layout";
import SEO from "@/components/SEO";
import { BUSINESS } from "@/data/business";
import { Phone, Home, Wrench, Mail } from "lucide-react";

const NotFoundPage = () => {
  return (
    <>
      <SEO
        title={`Page Not Found | ${BUSINESS.name}`}
        description={`The page you're looking for doesn't exist. Visit ${BUSINESS.name} for plumbing, HVAC, and electrical services in Las Vegas, NV.`}
        canonical="/404"
        noindex
      />
      <Header />
      <main className="container-custom section-padding text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-6xl md:text-8xl font-black text-secondary mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved. Let us help you find what you need.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Link to="/" className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-bold hover:opacity-90 transition-opacity inline-flex items-center gap-2">
            <Home className="h-4 w-4" /> Return to Homepage
          </Link>
          <Link to="/plumber" className="cta-gradient text-secondary-foreground px-6 py-3 rounded-md font-bold hover:opacity-90 transition-opacity inline-flex items-center gap-2">
            <Wrench className="h-4 w-4" /> Explore Our Services
          </Link>
          <Link to="/contact" className="border-2 border-primary text-primary px-6 py-3 rounded-md font-bold hover:bg-primary hover:text-primary-foreground transition-colors inline-flex items-center gap-2">
            <Mail className="h-4 w-4" /> Contact Our Team
          </Link>
        </div>
        <p className="text-muted-foreground text-sm">
          Or call us directly at{" "}
          <a href={`tel:${BUSINESS.phone}`} className="text-secondary font-bold hover:underline">{BUSINESS.phoneFormatted}</a>
        </p>
      </main>
      <Footer />
    </>
  );
};

export default NotFoundPage;
