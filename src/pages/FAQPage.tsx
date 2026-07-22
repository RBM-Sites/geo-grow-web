import { Header, Footer, Breadcrumbs, CTABanner, JsonLd, localBusinessSchema, PageHero, GoogleMapEmbed } from "@/components/Layout";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "name": "FAQ: Right On Plumbing, Heating and Air — Las Vegas HVAC & Plumbing Questions Answered",
  "mainEntity": []
};

const FAQPage = () => {
  return (
    <>
      <SEO
        title="FAQ: Right On Plumbing, Heating and Air — Las Vegas HVAC & Plumbing Questions Answered"
        description="Get answers to common HVAC and plumbing questions from Right On Plumbing, Heating and Air. Serving Las Vegas, Henderson, and North Las Vegas with 24/7 emergency service."
        canonical="/faq"
      />
      <JsonLd data={faqJsonLd} />
      <Header />
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Answers to common HVAC and plumbing questions from Right On Plumbing, Heating and Air."
        bgImage="/media/hero-about-plumbing-team-las-vegas.jpg"
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <main className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            FAQ: Right On Plumbing, Heating and Air — Las Vegas HVAC & Plumbing Questions Answered
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Right On Plumbing, Heating and Air, a family-owned business serving Las Vegas, Henderson, and North Las Vegas, provides licensed, bonded, and insured HVAC and plumbing services with 24/7 emergency availability and a 100% satisfaction guarantee.
          </p>

          <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-10">
            <li>Right On Plumbing, Heating and Air is a <strong>licensed, bonded, and insured contractor</strong> through the Nevada State Contractors Board, meeting all state requirements for both HVAC and plumbing work (<a href="https://www.nscb.nv.gov/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify Nevada licensing requirements</a>)</li>
            <li><strong>24/7 emergency service</strong> available for urgent heating, cooling, and plumbing issues throughout the Las Vegas valley (<a href="https://www.rightonplumbingandair.com/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify emergency services</a>)</li>
            <li><strong>100% satisfaction guarantee</strong> on all services performed, demonstrating commitment to quality workmanship (<a href="https://www.rightonplumbingandair.com/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify guarantee</a>)</li>
            <li><strong>Comprehensive HVAC and plumbing services</strong> under one company, eliminating the need for multiple contractors</li>
            <li><strong>Technicians hold EPA Section 608 certification</strong> for legal and safe refrigerant handling in all air conditioning systems (<a href="https://www.epa.gov/section608" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify EPA certification requirements</a>)</li>
            <li><strong>Specialized expertise in desert climate HVAC</strong> challenges, including extreme heat management and hard water impacts on systems</li>
            <li><strong>Family-owned business model</strong> emphasizing personal service and long-term customer relationships rather than corporate franchise approach</li>
            <li>Serves both <strong>residential and commercial customers</strong> throughout Las Vegas, Henderson, and North Las Vegas areas</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">General Service Questions</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Right On Plumbing, Heating and Air operates as a family-owned business throughout the Las Vegas valley, specializing in both HVAC and plumbing services for residential and commercial customers. The company maintains active licensing through the Nevada State Contractors Board (<a href="https://www.nscb.nv.gov/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify licensing requirements</a>), ensuring compliance with all state regulations for both trades. Unlike many competitors who focus on a single specialty, Right On Plumbing, Heating and Air provides comprehensive home services under one roof, allowing customers to develop a relationship with a single trusted provider for multiple needs.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-10">
            The business serves the greater Las Vegas area, including <Link to="/las-vegas" className="text-secondary font-semibold hover:underline">Las Vegas</Link>, <Link to="/henderson" className="text-secondary font-semibold hover:underline">Henderson</Link>, and <Link to="/north-las-vegas" className="text-secondary font-semibold hover:underline">North Las Vegas</Link> communities. This local focus means technicians understand the unique challenges of desert climate HVAC systems, which operate under extreme temperature stress during summer months and face hard water issues common to the region. The company maintains an active Google Business Profile (<a href="https://www.google.com/maps/search/Right+On+Plumbing,+Heating+and+Air+Las+Vegas" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">view business profile</a>) for customer reviews and local service visibility.
          </p>

          <h2 className="text-2xl font-bold mb-4">Licensing, Insurance, and Qualifications</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Right On Plumbing, Heating and Air operates as a fully licensed, bonded, and insured contractor in Nevada, meeting all state requirements for HVAC and plumbing work. Nevada law requires contractors to maintain licenses through the Nevada State Contractors Board, and the company complies with these regulations to protect customers and ensure professional service standards. Bonding provides financial protection for customers, while comprehensive insurance coverage protects both the property owner and technicians during service work.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-10">
            All HVAC technicians working with refrigerant systems hold EPA Section 608 certification (<a href="https://www.epa.gov/section608" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify EPA requirements</a>), a federal requirement for anyone handling refrigerants in air conditioning and heating systems. This certification ensures technicians understand proper refrigerant management, environmental safety protocols, and legal handling procedures. The family-owned business model emphasizes ongoing training and accountability, with technicians specializing in the specific challenges of Las Vegas's desert climate conditions.
          </p>

          <h2 className="text-2xl font-bold mb-4">Service Availability and Emergency Response</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Right On Plumbing, Heating and Air provides 24/7 emergency service availability (<a href="https://www.rightonplumbingandair.com/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify emergency services</a>) for urgent HVAC and plumbing issues throughout the Las Vegas valley. Emergency services are particularly critical in Las Vegas, where air conditioning failures during summer months can create dangerous indoor temperatures within hours. The company responds to emergency calls around the clock, including weekends and holidays, ensuring customers never face extended periods without essential heating, cooling, or plumbing services.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Emergency service calls cover a range of urgent situations, including complete air conditioning failures, heating system breakdowns during winter cold snaps, major water leaks, sewer backups, and gas line concerns. The 24-hour availability means customers can reach a live representative any time of day or night, rather than leaving voicemail messages or waiting until business hours. This immediate response capability distinguishes Right On Plumbing, Heating and Air from competitors with limited after-hours availability.
          </p>

          <h2 className="text-2xl font-bold mb-4">Quality Guarantees and Customer Satisfaction</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Right On Plumbing, Heating and Air backs all services with a 100% satisfaction guarantee (<a href="https://www.rightonplumbingandair.com/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify guarantee</a>), demonstrating confidence in workmanship quality and customer service standards. This guarantee ensures customers feel protected when investing in HVAC repairs, system replacements, or plumbing services. If customers are not completely satisfied with the work performed, the company commits to making it right, reflecting the accountability model typical of family-owned businesses.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-10">
            The satisfaction guarantee covers both the technical quality of repairs and installations as well as the overall service experience. This commitment to customer satisfaction aligns with the company's approach of building long-term relationships with Las Vegas valley residents and businesses rather than focusing on one-time transactions. The family-owned structure creates direct accountability, with owners personally invested in maintaining the company's reputation within the local community.
          </p>

          <h2 className="text-2xl font-bold mb-4">Residential and Commercial Service Capabilities</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Right On Plumbing, Heating and Air serves both residential homes and commercial properties throughout Las Vegas, Henderson, and North Las Vegas. Residential services include everything from routine HVAC maintenance and plumbing repairs to complete system replacements and emergency service calls. Commercial capabilities extend to office buildings, retail locations, restaurants, and other business properties requiring professional HVAC and plumbing expertise.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-10">
            The dual capability in HVAC and plumbing services provides particular value for property managers and business owners who prefer working with a single contractor for multiple building systems. Commercial HVAC systems often require specialized knowledge of larger-capacity equipment, zone control systems, and business-hours scheduling considerations. The company's experience with Las Vegas's desert climate translates to both residential and commercial applications, understanding how extreme temperatures and hard water conditions impact various property types.
          </p>

          <div itemScope itemType="https://schema.org/FAQPage" className="space-y-8">
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name" className="text-xl font-bold mb-3">Is Right On Plumbing, Heating and Air licensed and insured?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text" className="text-muted-foreground leading-relaxed">
                  <p>Yes, Right On Plumbing, Heating and Air is a fully licensed, bonded, and insured contractor in Nevada, meeting all state requirements through the Nevada State Contractors Board. The company maintains licenses for both HVAC and plumbing work, ensuring compliance with Nevada regulations. All technicians handling refrigerant systems also hold EPA Section 608 certification, which is federally required for air conditioning work.</p>
                </div>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name" className="text-xl font-bold mb-3">Do you offer 24/7 emergency HVAC and plumbing service in Las Vegas?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text" className="text-muted-foreground leading-relaxed">
                  <p>Yes, Right On Plumbing, Heating and Air provides 24/7 emergency service throughout Las Vegas, Henderson, and North Las Vegas. Emergency technicians respond to urgent situations including air conditioning failures, heating breakdowns, major water leaks, and sewer backups at any time of day or night, including weekends and holidays. This round-the-clock availability is particularly important in Las Vegas where AC failures during extreme summer heat can become dangerous quickly.</p>
                </div>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name" className="text-xl font-bold mb-3">What areas do you serve in the Las Vegas valley?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text" className="text-muted-foreground leading-relaxed">
                  <p>Right On Plumbing, Heating and Air serves Las Vegas, Henderson, and North Las Vegas throughout the greater Las Vegas valley. As a locally-focused company, the business specializes in desert climate HVAC challenges specific to the region, including extreme summer temperatures and hard water impacts on plumbing systems. This geographic focus allows technicians to develop expertise in the unique needs of homes and businesses in the area.</p>
                </div>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name" className="text-xl font-bold mb-3">Do you provide both HVAC and plumbing services?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text" className="text-muted-foreground leading-relaxed">
                  <p>Yes, Right On Plumbing, Heating and Air offers comprehensive HVAC and plumbing services under one company. This includes heating and air conditioning installation, repair, and maintenance, as well as complete plumbing services for both residential and commercial customers. Having both capabilities means customers can work with a single trusted provider for multiple home service needs rather than coordinating with separate contractors.</p>
                </div>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name" className="text-xl font-bold mb-3">What guarantee do you offer on your work?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text" className="text-muted-foreground leading-relaxed">
                  <p>Right On Plumbing, Heating and Air provides a 100% satisfaction guarantee on all services performed. This guarantee ensures customers are completely satisfied with both the quality of work and the service experience. If any concerns arise, the company commits to making it right, reflecting the accountability typical of family-owned businesses invested in long-term customer relationships and local reputation.</p>
                </div>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name" className="text-xl font-bold mb-3">Do you work on commercial properties or just residential?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text" className="text-muted-foreground leading-relaxed">
                  <p>Right On Plumbing, Heating and Air serves both residential homes and commercial properties throughout the Las Vegas valley. Commercial services include HVAC and plumbing work for office buildings, retail locations, restaurants, and other business properties. The company's dual licensing and experience with both property types provides versatility for property managers and business owners needing professional HVAC and plumbing expertise.</p>
                </div>
              </div>
            </div>

            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name" className="text-xl font-bold mb-3">How do I know what a repair or installation will cost?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text" className="text-muted-foreground leading-relaxed">
                  <p>Right On Plumbing, Heating and Air provides detailed estimates before performing work, allowing customers to understand costs upfront. As a family-owned business emphasizing transparency, the company explains what work is needed and why, helping customers make informed decisions about repairs versus replacements. For specific pricing information on common services, customers can visit the <a href="/pricing">pricing page</a> or contact the office directly for customized estimates based on their specific situation.</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mt-10">
            For more information about Right On Plumbing, Heating and Air's credentials, licensing, and service approach, visit the <a href="/credibility_profile">company profile page</a>. To understand typical costs for HVAC and plumbing services in the Las Vegas area, review the <a href="/pricing">pricing information page</a>.
          </p>
        </div>
      </main>
      <CTABanner />
      <GoogleMapEmbed />
      <JsonLd data={localBusinessSchema} />
      <Footer />
    </>
  );
};

export default FAQPage;
