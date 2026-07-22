import { Link } from "react-router-dom";
import { Header, Footer, Breadcrumbs, CTABanner, GoogleMapEmbed } from "@/components/Layout";
import SEO from "@/components/SEO";
import { BUSINESS } from "@/data/business";

const PricingPage = () => {
  return (
    <>
      <SEO
        title="HVAC & Plumbing Pricing Guide — Right On Plumbing, Heating and Air | Las Vegas, NV"
        description="Transparent HVAC and plumbing pricing in Las Vegas, Henderson, and North Las Vegas. Free estimates, upfront costs, and 24/7 emergency service from Right On Plumbing, Heating and Air."
        canonical="/pricing"
      />
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Pricing & Cost Guide" }]} />

      <main className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
            HVAC & Plumbing Pricing Guide — Right On Plumbing, Heating and Air | Las Vegas, NV
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-8">
            Right On Plumbing, Heating and Air provides transparent pricing for HVAC and plumbing services across Las Vegas, Henderson, and North Las Vegas, with costs determined by service complexity, equipment specifications, and the unique demands of desert climate systems. As a licensed, bonded, and insured family-owned business, the company offers upfront estimates backed by a 100% satisfaction guarantee on all work performed.
          </p>

          <img
            src="/media/hero-pricing-hvac-plumbing-las-vegas.jpg"
            alt="HVAC technician reviewing a written estimate with a homeowner in Las Vegas, NV"
            className="w-full h-64 md:h-80 object-cover rounded-lg mb-10"
            width="1200"
            height="600"
            loading="eager"
          />

          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">Key Factors That Determine Your Service Cost</h2>

          <ul className="list-disc pl-6 space-y-3 text-muted-foreground leading-relaxed mb-10">
            <li><strong>Service type complexity:</strong> Emergency repairs, system replacements, and commercial work involve different pricing structures than routine maintenance or residential repairs</li>
            <li><strong>Desert climate considerations:</strong> Las Vegas HVAC systems face extreme heat stress and hard water impacts that often require specialized parts and extended labor compared to moderate climates</li>
            <li><strong>Time of service:</strong> 24/7 emergency availability means after-hours, weekend, and holiday service calls carry premium pricing to ensure technician availability when systems fail</li>
            <li><strong>Equipment specifications:</strong> Brand selection, SEER ratings for air conditioners, furnace efficiency levels, and equipment size directly affect material costs and installation complexity</li>
            <li><strong>Property type:</strong> Commercial properties typically involve larger systems, more complex installations, and specialized licensing requirements compared to residential service</li>
            <li><strong>Warranty coverage:</strong> All services include the company's 100% satisfaction guarantee, with equipment warranties varying by manufacturer and installation scope</li>
            <li><strong>Licensing and insurance protection:</strong> Pricing reflects Nevada state contractor licensing requirements and full bonding and insurance coverage that protects customers during all service work (<a href="https://www.nscb.nv.gov/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify Nevada contractor requirements</a>)</li>
            <li><strong>Dual-service capability:</strong> The company's comprehensive HVAC and plumbing expertise under one contractor can reduce costs when projects involve both systems</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">How Right On Plumbing, Heating and Air Structures Service Estimates</h2>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Right On Plumbing, Heating and Air provides detailed written estimates before beginning any non-emergency work. The estimate process begins with a thorough on-site assessment where licensed technicians evaluate the specific system, identify underlying issues, and explain all options available to the customer. For routine service calls, technicians diagnose the problem and provide pricing before proceeding with repairs. Emergency services follow a similar diagnostic approach, though customers facing system failures in extreme Las Vegas heat often prioritize immediate restoration over extended estimate discussions. The company's transparent pricing model means customers understand exactly what work will be performed, what parts will be used, and what labor is involved before any charges apply. This approach reflects the family-owned business model of building long-term customer relationships rather than maximizing individual transaction revenue.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-10">
            Estimates account for Las Vegas-specific factors that affect both labor and material costs. The desert climate places extraordinary demands on HVAC systems, with air conditioners running extensively during 110°F+ summer days and hard water affecting plumbing component longevity. These conditions mean systems often require more frequent service, specialized parts designed for high-temperature operation, and additional labor to address weather-related wear. Commercial estimates involve additional complexity due to larger equipment, stricter code requirements, and the need to minimize business operation disruptions. Right On Plumbing, Heating and Air maintains both HVAC and plumbing contractor licenses through the Nevada State Contractors Board, ensuring all estimates reflect code-compliant installation and repair approaches (<a href="https://www.nscb.nv.gov/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify Nevada licensing requirements</a>).
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">What's Included in Standard Service Pricing</h2>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Standard residential HVAC service calls include comprehensive system diagnostics, identification of all issues affecting performance, explanation of repair options with associated costs, and completion of approved repairs using quality replacement parts. Technicians arrive in fully-stocked service vehicles equipped to handle most common repairs on the first visit, reducing the need for return trips and additional service charges. All work includes proper cleanup, system testing to verify performance restoration, and customer education about preventive maintenance steps. The company's 100% satisfaction guarantee covers all service work, meaning if customers aren't completely satisfied with the results, Right On Plumbing, Heating and Air will make it right at no additional cost (<a href="https://www.rightonplumbingandair.com/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify satisfaction guarantee</a>).
          </p>

          <p className="text-muted-foreground leading-relaxed mb-10">
            Plumbing service calls follow similar comprehensive standards, with licensed plumbers diagnosing issues, explaining all viable solutions, and performing approved repairs using appropriate materials for Las Vegas water conditions. Because Right On Plumbing, Heating and Air handles both HVAC and plumbing work, customers benefit from coordinated service when issues overlap—such as water heater replacements that require both plumbing and gas line work, or AC condensate drain problems that affect both systems. This dual-capability eliminates the coordination hassle and potential finger-pointing between separate contractors that customers often experience when hiring specialized-only companies. All technicians maintain required EPA Section 608 certification for refrigerant handling, ensuring legal compliance and proper environmental management during any work involving air conditioning refrigerants (<a href="https://www.epa.gov/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify EPA refrigerant requirements</a>).
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">Emergency Service Pricing Structure</h2>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Right On Plumbing, Heating and Air offers 24/7 emergency service throughout Las Vegas, Henderson, and North Las Vegas for urgent HVAC and plumbing failures (<a href="https://www.rightonplumbingandair.com/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify emergency availability</a>). Emergency pricing reflects the premium cost of maintaining round-the-clock technician availability, including after-hours wages, holiday premiums, and the operational expense of immediate response capability. In the Las Vegas climate, emergency HVAC service becomes critical during summer months when indoor temperatures can reach dangerous levels within hours of air conditioning failure. Emergency calls receive priority scheduling with technicians typically responding within hours rather than the next-day scheduling common for routine maintenance.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-10">
            Emergency service pricing includes the same diagnostic thoroughness and repair quality as standard appointments, with the additional cost covering immediate availability rather than different work standards. Customers facing true emergencies—such as complete AC failure during extreme heat, frozen pipes, or water heater leaks causing property damage—find that emergency pricing provides value through immediate problem resolution and prevention of secondary damage. The family-owned business approach means Right On Plumbing, Heating and Air prioritizes genuine emergency response for customers in crisis rather than encouraging unnecessary emergency calls for routine issues that can wait until standard business hours.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">Understanding HVAC System Replacement Investment</h2>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Complete HVAC system replacement represents a significant investment that varies based on equipment selection, home size, installation complexity, and efficiency ratings. Las Vegas homeowners typically choose higher-SEER air conditioning systems due to the extreme cooling demands and electricity costs associated with desert climate operation. A higher-efficiency system costs more upfront but delivers substantial operational savings over the system's 15-20 year lifespan through reduced electricity consumption. Right On Plumbing, Heating and Air helps customers evaluate the cost-versus-savings equation based on their specific usage patterns, home characteristics, and budget constraints.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-10">
            System replacement pricing includes equipment costs, labor for complete installation, removal and disposal of old equipment, any necessary upgrades to bring installations to current code requirements, startup and testing, and manufacturer warranty registration. The company's Nevada contractor licensing ensures all installations meet state and local building codes, while their bonding and insurance protect customers against installation defects or property damage. Customers choosing system replacement receive detailed equipment options with clear explanations of efficiency differences, warranty coverage variations, and expected performance in Las Vegas conditions. The goal is informed decision-making rather than pushing customers toward the highest-priced option regardless of actual need.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">Maintenance Agreement Value and Pricing Logic</h2>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Preventive maintenance agreements provide scheduled service at reduced per-visit costs compared to individual service calls, while extending equipment life and maintaining peak efficiency. In the Las Vegas valley's harsh climate, regular maintenance becomes especially valuable because systems work harder and accumulate wear faster than in moderate climates. Maintenance visits typically include filter replacement, refrigerant level checks, electrical connection inspection, condensate drain cleaning, and comprehensive performance testing. These routine services prevent small issues from escalating into expensive emergency repairs and keep systems running efficiently when customers need them most.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-10">
            Maintenance agreement pricing reflects the reduced administrative cost of scheduled service versus emergency dispatch, allowing Right On Plumbing, Heating and Air to pass savings to customers who commit to regular service. Agreement holders also receive priority scheduling benefits and sometimes preferential pricing on repairs discovered during maintenance visits. For customers with both HVAC and plumbing needs, the company's comprehensive service capability means a single maintenance agreement can cover both system types, simplifying household service management and often providing better overall value than separate agreements with different contractors.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">Frequently Asked Questions About HVAC and Plumbing Pricing</h2>

          <div className="space-y-6 mb-10">
            <div>
              <h3 className="text-lg font-bold mb-2">Why does Las Vegas HVAC service cost more than other cities?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Las Vegas HVAC systems operate under extreme conditions with air conditioners running extensively during 110°F+ summer temperatures, causing accelerated wear and requiring specialized high-temperature components. The desert climate also creates hard water conditions that affect both plumbing and HVAC components, often requiring more frequent service and specialized parts compared to moderate climate regions. These factors increase both material and labor costs compared to areas with less demanding operating conditions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">What's included in Right On Plumbing, Heating and Air's 100% satisfaction guarantee?</h3>
              <p className="text-muted-foreground leading-relaxed">
                The satisfaction guarantee means if customers aren't completely satisfied with service work, Right On Plumbing, Heating and Air will address concerns and make it right at no additional cost. This guarantee reflects the company's family-owned commitment to long-term customer relationships and quality workmanship. It covers all services from routine repairs to complete system installations across both HVAC and plumbing work.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">How do emergency service rates differ from regular appointment pricing?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Emergency service rates include premium charges to maintain 24/7 technician availability, covering after-hours wages, holiday premiums, and immediate response capability. While the actual diagnostic and repair work meets the same quality standards as scheduled appointments, emergency pricing reflects the operational cost of round-the-clock service availability. Right On Plumbing, Heating and Air prioritizes genuine emergencies—such as AC failure during extreme heat or plumbing leaks causing property damage—where immediate service provides real value through crisis resolution.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Does it cost less to use one company for both HVAC and plumbing needs?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Using Right On Plumbing, Heating and Air for both HVAC and plumbing services can reduce overall costs by eliminating coordination between separate contractors, reducing duplicate service call charges, and allowing comprehensive problem-solving when issues involve both systems. The company's dual licensing means a single technician can often address related issues during one visit—such as water heater problems involving both plumbing connections and gas line work—rather than requiring multiple specialists at separate service call rates.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">What factors affect HVAC system replacement cost in Las Vegas homes?</h3>
              <p className="text-muted-foreground leading-relaxed">
                System replacement costs vary based on equipment efficiency ratings (higher SEER units cost more but save on electricity), home size and layout, installation complexity, necessary ductwork modifications, and whether upgrades are needed to meet current building codes. Las Vegas customers often benefit from higher-efficiency systems due to extreme cooling demands and high electricity costs during summer months, making the upfront investment worthwhile through operational savings over the system's 15-20 year lifespan.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Are written estimates provided before work begins?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Right On Plumbing, Heating and Air provides detailed written estimates for all non-emergency work before beginning service. Technicians perform thorough diagnostics, explain all options available, and provide clear pricing for recommended repairs or replacements. For emergency calls where immediate service is critical, technicians still explain the situation and obtain customer approval before proceeding with repairs. This transparent approach reflects the company's commitment to informed customer decision-making rather than surprise billing.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">How does Nevada contractor licensing affect pricing?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Nevada state contractor licensing requirements ensure that Right On Plumbing, Heating and Air maintains proper bonding, insurance, and technical qualifications to perform HVAC and plumbing work legally and safely. These protections benefit customers through liability coverage, quality assurance, and recourse through the Nevada State Contractors Board if disputes arise. While licensing involves operational costs that factor into pricing, it provides essential customer protections that unlicensed or improperly licensed contractors cannot offer.
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-10">
            For detailed answers to additional service questions, visit our <Link to="/faq" className="text-secondary font-semibold hover:underline">frequently asked questions page</Link>. To learn more about Right On Plumbing, Heating and Air's credentials, experience, and commitment to Las Vegas valley customers, see our <Link to="/credibility_profile" className="text-secondary font-semibold hover:underline">company profile</Link>.
          </p>

          <div className="bg-muted rounded-lg p-6 md:p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Get Your Free Estimate Today</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact Right On Plumbing, Heating and Air for upfront pricing on plumbing and HVAC services in Las Vegas, Henderson, and North Las Vegas.
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

      <CTABanner />
      <GoogleMapEmbed />
      <Footer />
    </>
  );
};

export default PricingPage;
