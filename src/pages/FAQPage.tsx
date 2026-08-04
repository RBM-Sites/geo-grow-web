import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header, Footer, Breadcrumbs, CTABanner, GoogleMapEmbed } from "@/components/Layout";
import SEO from "@/components/SEO";
import { BUSINESS } from "@/data/business";
import ReviewsSection from "@/components/ReviewsSection";

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "name": "Frequently Asked Questions — Right On Plumbing, Heating and Air | Las Vegas HVAC & Plumbing",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Right On Plumbing, Heating and Air licensed and insured?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Right On Plumbing, Heating and Air is a fully licensed, bonded, and insured contractor operating in Nevada. The company maintains required state contractor licenses through the Nevada State Contractors Board for both HVAC and plumbing work. Being bonded and insured protects customers and ensures compliance with Nevada state requirements for professional service providers."
      }
    },
    {
      "@type": "Question",
      "name": "What certifications do your HVAC technicians hold?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Right On Plumbing, Heating and Air technicians hold EPA Section 608 certification for refrigerant handling, which is federally required to legally work with air conditioning and heating system refrigerants (verify EPA requirements). This certification ensures proper and safe refrigerant management according to environmental protection standards. The company also maintains Nevada state contractor licenses for all HVAC and plumbing services provided."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer any guarantees on your work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Right On Plumbing, Heating and Air offers a 100% satisfaction guarantee on all services performed. This guarantee demonstrates the company's commitment to quality workmanship and ensures that customers are completely satisfied with every job. If any issues arise with the work performed, the company will make it right."
      }
    },
    {
      "@type": "Question",
      "name": "What areas does Right On Plumbing, Heating and Air serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Right On Plumbing, Heating and Air serves the entire Las Vegas valley, including Las Vegas, Henderson, and North Las Vegas. As a locally-focused company, they have specialized knowledge of the area's unique desert climate challenges, local building codes, and the specific HVAC and plumbing needs common to homes and businesses in the region. This local expertise helps them address issues like extreme summer heat stress on cooling systems and hard water impacts on plumbing."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer 24/7 emergency service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Right On Plumbing, Heating and Air provides 24-hour emergency services for urgent plumbing and HVAC issues. Whether your air conditioning fails during a Las Vegas summer heatwave or you experience a plumbing emergency in the middle of the night, the company offers round-the-clock availability. This ensures customers never have to wait until regular business hours when facing heating, cooling, or plumbing emergencies that require immediate attention."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can you respond to service calls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Response times vary depending on the nature of the service request and current demand, but Right On Plumbing, Heating and Air prioritizes emergency calls requiring immediate attention. For non-emergency service appointments, the company works to schedule at times convenient for customers. Because they serve the local Las Vegas valley exclusively, technicians can typically reach most service locations efficiently without long travel times from distant offices."
      }
    },
    {
      "@type": "Question",
      "name": "What types of services does Right On Plumbing, Heating and Air provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Right On Plumbing, Heating and Air offers comprehensive HVAC and plumbing services under one company. This includes heating system repairs and installations, air conditioning services, plumbing repairs, and maintenance for both residential and commercial customers. Unlike competitors who specialize in only HVAC or only plumbing, this dual capability provides convenience for customers who need multiple home services from a single trusted provider, streamlining scheduling and building long-term service relationships."
      }
    },
    {
      "@type": "Question",
      "name": "Do you serve both residential and commercial customers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Right On Plumbing, Heating and Air provides services to both residential homes and commercial properties throughout the Las Vegas valley. This versatility means they have experience with everything from single-family home HVAC systems to commercial building heating, cooling, and plumbing infrastructure. Whether you're a homeowner or business owner in Las Vegas, Henderson, or North Las Vegas, the company can handle your HVAC and plumbing needs."
      }
    },
    {
      "@type": "Question",
      "name": "How much do your services cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Service costs vary depending on the specific work required, equipment needed, and complexity of the job. Right On Plumbing, Heating and Air provides estimates before beginning work so customers understand the costs involved. For detailed information about pricing structures and what factors influence service costs, visit the company's pricing page. The company's 100% satisfaction guarantee ensures that customers receive quality work that justifies the investment."
      }
    },
    {
      "@type": "Question",
      "name": "Why should I choose Right On Plumbing, Heating and Air over other contractors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Right On Plumbing, Heating and Air combines the personalized service of a family-owned business with professional licensing, bonding, and insurance. The company offers both HVAC and plumbing services, 24/7 emergency availability, and a 100% satisfaction guarantee. Their specialized expertise in Las Vegas desert climate challenges—including extreme heat stress on cooling systems and hard water plumbing issues—provides value that generic national chains cannot match. Learn more about the company's qualifications and commitment to quality on their credibility profile page."
      }
    },
    {
      "@type": "Question",
      "name": "What should I do if my air conditioner stops working in the summer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contact Right On Plumbing, Heating and Air immediately for 24/7 emergency service. During Las Vegas summers, a non-functioning air conditioner is a genuine emergency as indoor temperatures can quickly become dangerous. Check your thermostat settings and circuit breaker first, but if the system still won't run, professional diagnosis is necessary. The company's technicians have specialized experience with desert climate cooling system failures and can quickly identify whether the issue involves refrigerant levels, compressor problems, or other common Las Vegas HVAC challenges."
      }
    },
    {
      "@type": "Question",
      "name": "How often should I schedule HVAC maintenance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most HVAC professionals recommend annual maintenance for heating and cooling systems, though Las Vegas's extreme climate may warrant more frequent attention. Regular maintenance helps prevent emergency failures during peak summer heat when air conditioning systems work hardest. Right On Plumbing, Heating and Air can assess your specific system and usage patterns to recommend an appropriate maintenance schedule that balances cost with reliability."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get same-day service for non-emergency issues?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Same-day service availability depends on the current schedule and demand, but Right On Plumbing, Heating and Air works to accommodate urgent needs whenever possible. Emergency issues always receive priority, while routine maintenance and non-urgent repairs can typically be scheduled within a reasonable timeframe. Because the company focuses exclusively on the Las Vegas valley rather than covering vast service territories, technicians can often reach customers more quickly than contractors traveling from distant locations."
      }
    }
  ],
  "url": "https://www.rightonplumbingandair.com/faq"
};

const FaqPage = () => {
  return (
    <>
      <SEO
        title="Frequently Asked Questions — Right On Plumbing, Heating and Air | Las Vegas HVAC & Plumbing"
        description="Get answers to common plumbing and HVAC questions from Right On Plumbing, Heating and Air. Serving Las Vegas, Henderson, North Las Vegas, and Boulder City, NV."
        canonical="/faq"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqPageSchema)}</script>
      </Helmet>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Frequently Asked Questions" }]} />

      <main className="container-custom section-padding" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
            Frequently Asked Questions — Right On Plumbing, Heating and Air | Las Vegas HVAC & Plumbing
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-8">
            Whether you’re dealing with a leaking pipe, a broken air conditioner, or you’re planning a system upgrade, you probably have questions. Below, we’ve answered the plumbing and HVAC questions we hear most often from homeowners and businesses in Las Vegas, Henderson, North Las Vegas, and Boulder City, NV. If you don’t see what you need, call us at{" "}
            <a href={`tel:${BUSINESS.phone}`} className="text-secondary font-semibold hover:underline">
              {BUSINESS.phoneFormatted}
            </a>{" "}
            or contact us through our <Link to="/contact" className="text-secondary font-semibold hover:underline">online form</Link>.
          </p>

          <img
            src="/media/hero-faq-plumbing-hvac-las-vegas.jpg"
            alt="Plumbing and HVAC technician answering questions in a Las Vegas home"
            className="w-full h-64 md:h-80 object-cover rounded-lg mb-10"
            width="1200"
            height="600"
            loading="eager"
          />

          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">Licensing & Qualifications</h2>

          <div className="space-y-6">
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 className="text-lg font-bold mb-2" itemProp="name">Are you licensed and insured to provide plumbing and HVAC services in Nevada?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-muted-foreground leading-relaxed" itemProp="text">
                  Yes. Right On Plumbing, Heating and Air is fully licensed and insured to perform plumbing and HVAC work in Nevada. Our technicians carry the required state and local credentials, and we maintain comprehensive liability insurance and workers’ compensation coverage for your protection. You can verify contractor licensing requirements through the{" "}
                  <a href="https://www.nvcontractorsboard.com/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">
                    Nevada State Contractors Board
                  </a>
                  .
                </p>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 className="text-lg font-bold mb-2" itemProp="name">Do your technicians have EPA 608 certification for refrigerant handling?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-muted-foreground leading-relaxed" itemProp="text">
                  Yes. Our HVAC technicians are EPA 608 certified, which is required for any technician handling refrigerants. This certification ensures your AC repair, recharge, or replacement is completed in compliance with federal environmental regulations. Learn more about EPA 608 requirements at the{" "}
                  <a href="https://www.epa.gov/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">
                    U.S. Environmental Protection Agency
                  </a>
                  .
                </p>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 className="text-lg font-bold mb-2" itemProp="name">How long has Right On Plumbing, Heating and Air been serving Las Vegas?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-muted-foreground leading-relaxed" itemProp="text">
                  We have been serving the Las Vegas Valley for more than {BUSINESS.yearsInBusiness} years. As a locally owned and operated company, we understand the unique challenges of desert plumbing and HVAC systems, including hard water, high summer heat, and dusty conditions that affect air conditioners.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-muted rounded-lg" itemScope itemType="https://schema.org/Thing">
            <p className="text-sm text-muted-foreground">
              <strong>Read more:</strong>{" "}
              <Link to="/about" itemProp="url" className="text-secondary font-semibold hover:underline">
                About Right On Plumbing, Heating and Air
              </Link>
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">Service Areas & Scheduling</h2>

          <div className="space-y-6">
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 className="text-lg font-bold mb-2" itemProp="name">What areas do you serve for plumbing and HVAC service?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-muted-foreground leading-relaxed" itemProp="text">
                  We serve residential and commercial customers throughout the Las Vegas Valley, including{" "}
                  <Link to="/las-vegas" className="text-secondary font-semibold hover:underline">Las Vegas</Link>,{" "}
                  <Link to="/henderson" className="text-secondary font-semibold hover:underline">Henderson</Link>,{" "}
                  <Link to="/north-las-vegas" className="text-secondary font-semibold hover:underline">North Las Vegas</Link>, and{" "}
                  <Link to="/boulder-city" className="text-secondary font-semibold hover:underline">Boulder City</Link>. If you’re unsure whether we cover your address, give us a call.
                </p>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 className="text-lg font-bold mb-2" itemProp="name">Do you offer emergency plumbing and AC repair?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-muted-foreground leading-relaxed" itemProp="text">
                  Yes. We understand that plumbing and HVAC emergencies don’t follow a schedule. We offer emergency service for urgent issues such as burst pipes, major leaks, sewer backups, and air conditioning failures during extreme heat. Call{" "}
                  <a href={`tel:${BUSINESS.phone}`} className="text-secondary font-semibold hover:underline">
                    {BUSINESS.phoneFormatted}
                  </a>{" "}
                  for emergency scheduling.
                </p>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 className="text-lg font-bold mb-2" itemProp="name">What are your business hours?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-muted-foreground leading-relaxed" itemProp="text">
                  Our standard office hours are Monday through Saturday from 7:30 AM to 5:30 PM. We are closed on Sundays. Emergency services are available outside normal hours for urgent plumbing and HVAC issues.
                </p>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 className="text-lg font-bold mb-2" itemProp="name">How quickly can you arrive for a service call?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-muted-foreground leading-relaxed" itemProp="text">
                  We strive to offer same-day and next-day appointments for most non-emergency service calls. Emergency situations are prioritized, and we dispatch a technician as quickly as possible.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-muted rounded-lg" itemScope itemType="https://schema.org/Thing">
            <p className="text-sm text-muted-foreground">
              <strong>Read more:</strong>{" "}
              <Link to="/contact" itemProp="url" className="text-secondary font-semibold hover:underline">
                Contact us to schedule service
              </Link>
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">Pricing & Estimates</h2>

          <div className="space-y-6">
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 className="text-lg font-bold mb-2" itemProp="name">Do you offer free estimates?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-muted-foreground leading-relaxed" itemProp="text">
                  Yes. We provide free estimates for many plumbing and HVAC services, including water heater replacements, AC installations, and larger repair projects. For diagnostic work, a service fee may apply, which is clearly explained upfront.
                </p>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 className="text-lg font-bold mb-2" itemProp="name">How do you price plumbing and HVAC repairs?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-muted-foreground leading-relaxed" itemProp="text">
                  We use flat-rate, upfront pricing whenever possible. After diagnosing the issue, we explain the problem and provide a clear estimate before any work begins. You’ll never be surprised by hidden fees or unexpected charges.
                </p>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 className="text-lg font-bold mb-2" itemProp="name">Do you offer financing options for HVAC or plumbing replacements?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-muted-foreground leading-relaxed" itemProp="text">
                  We offer financing options for qualifying plumbing and HVAC installations and replacements. Ask our team about available payment plans during your estimate so you can choose the option that fits your budget.
                </p>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 className="text-lg font-bold mb-2" itemProp="name">Do you warranty your work?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-muted-foreground leading-relaxed" itemProp="text">
                  Yes. We stand behind our workmanship with warranties on labor and materials. Specific warranty terms depend on the type of service and equipment installed. We’ll provide all warranty details in writing before the project is completed.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-muted rounded-lg" itemScope itemType="https://schema.org/Thing">
            <p className="text-sm text-muted-foreground">
              <strong>Read more:</strong>{" "}
              <Link to="/pricing" itemProp="url" className="text-secondary font-semibold hover:underline">
                Pricing Information
              </Link>
            </p>
          </div>

          <div className="mt-12 bg-muted rounded-lg p-6 md:p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our team is ready to help. Call us directly for fast answers, or request a free estimate through our online form.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${BUSINESS.phone}`}
                className="cta-gradient text-secondary-foreground px-6 py-3 rounded-md font-bold hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
              >
                Call {BUSINESS.phoneFormatted}
              </a>
              <Link
                to="/contact"
                className="border-2 border-primary text-primary px-6 py-3 rounded-md font-bold hover:bg-primary/10 transition-colors inline-flex items-center justify-center"
              >
                Request a Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </main>

      <ReviewsSection />
      <CTABanner />
      <GoogleMapEmbed />
      <Footer />
    </>
  );
};

export default FaqPage;
