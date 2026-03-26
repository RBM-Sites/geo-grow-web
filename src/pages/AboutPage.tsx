import { Link } from "react-router-dom";
import { Header, Footer, Breadcrumbs, CTABanner, JsonLd, localBusinessSchema } from "@/components/Layout";
import { BUSINESS, SERVICE_CATEGORIES, LOCATIONS } from "@/data/business";
import { Shield, Award, MapPin, Users } from "lucide-react";

const AboutPage = () => {
  document.title = `About ${BUSINESS.name} | ${BUSINESS.industry} in Las Vegas, NV`;
  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <main className="container-custom section-padding">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About {BUSINESS.name}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <div>
            <p className="text-muted-foreground mb-4 leading-relaxed">With over {BUSINESS.yearsInBusiness} years of experience serving the Las Vegas Valley, {BUSINESS.name} has built a reputation for honest, reliable, and expert {BUSINESS.industry.toLowerCase()} services. We started as a small, locally owned operation with a simple mission: treat every customer's home like our own.</p>
            <p className="text-muted-foreground mb-4 leading-relaxed">Today, we're proud to serve homeowners and businesses across <Link to="/las-vegas" className="text-secondary font-semibold hover:underline">Las Vegas</Link>, <Link to="/henderson" className="text-secondary font-semibold hover:underline">Henderson</Link>, and <Link to="/boulder-city" className="text-secondary font-semibold hover:underline">Boulder City</Link> with a full range of plumbing, HVAC, and electrical services.</p>
            <p className="text-muted-foreground leading-relaxed">Every technician on our team is licensed, insured, and committed to providing the highest quality workmanship. We believe in transparent pricing, clear communication, and standing behind every job we complete.</p>
          </div>
          <img src="/media/right-on-plumbing-heating-and-air-project-06-las-vegas-nv.jpg" alt="Right On Plumbing, Heating and Air team at work in Las Vegas, NV" className="rounded-lg w-full h-80 object-cover" loading="lazy" width="600" height="400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: <Shield className="h-8 w-8" />, title: "Licensed & Insured", desc: "Fully licensed for plumbing, HVAC, and electrical work" },
            { icon: <MapPin className="h-8 w-8" />, title: "Locally Owned", desc: "Proudly serving the Las Vegas Valley community" },
            { icon: <Award className="h-8 w-8" />, title: `${BUSINESS.yearsInBusiness}+ Years`, desc: "Of trusted service and expert workmanship" },
            { icon: <Users className="h-8 w-8" />, title: "Customer First", desc: "Free estimates and transparent pricing always" },
          ].map((item, i) => (
            <div key={i} className="text-center bg-muted rounded-lg p-6">
              <div className="text-secondary mx-auto mb-3 flex justify-center">{item.icon}</div>
              <h3 className="font-bold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">Our Services</h2>
        <p className="text-muted-foreground mb-4">We offer a comprehensive range of services including <Link to="/plumber" className="text-secondary font-semibold hover:underline">plumbing</Link>, <Link to="/air-conditioning-contractor" className="text-secondary font-semibold hover:underline">air conditioning installation</Link>, <Link to="/furnace-repair-service" className="text-secondary font-semibold hover:underline">furnace repair</Link>, <Link to="/air-duct-cleaning-service" className="text-secondary font-semibold hover:underline">air duct cleaning</Link>, and <Link to="/mechanical-contractor" className="text-secondary font-semibold hover:underline">commercial mechanical contracting</Link>.</p>
      </main>
      <CTABanner />
      <JsonLd data={localBusinessSchema} />
      <Footer />
    </>
  );
};

export default AboutPage;