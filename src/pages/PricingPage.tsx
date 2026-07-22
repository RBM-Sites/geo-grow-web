import { Header, Footer, Breadcrumbs, CTABanner, JsonLd, localBusinessSchema, PageHero, GoogleMapEmbed } from "@/components/Layout";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Right On Plumbing, Heating and Air Pricing Guide — Las Vegas Valley HVAC and Plumbing Costs Explained",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "Key Factors That Affect HVAC and Plumbing Costs",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Right On Plumbing, Heating and Air",
          "url": "https://www.rightonplumbingandair.com/"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "name": "Understanding HVAC Repair and Installation Cost Factors",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Right On Plumbing, Heating and Air",
          "url": "https://www.rightonplumbingandair.com/"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "name": "How Plumbing Service Pricing Works",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Right On Plumbing, Heating and Air",
          "url": "https://www.rightonplumbingandair.com/"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Service",
        "name": "What's Included in Service Call Pricing",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Right On Plumbing, Heating and Air",
          "url": "https://www.rightonplumbingandair.com/"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "Service",
        "name": "Emergency Service vs. Scheduled Maintenance Pricing",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Right On Plumbing, Heating and Air",
          "url": "https://www.rightonplumbingandair.com/"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "Service",
        "name": "Why Local Family-Owned Pricing Differs from National Chains",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Right On Plumbing, Heating and Air",
          "url": "https://www.rightonplumbingandair.com/"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 7,
      "item": {
        "@type": "Service",
        "name": "Frequently Asked Questions About HVAC and Plumbing Pricing",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Right On Plumbing, Heating and Air",
          "url": "https://www.rightonplumbingandair.com/"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 8,
      "item": {
        "@type": "Service",
        "name": "Do you provide free estimates for HVAC and plumbing work?",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Right On Plumbing, Heating and Air",
          "url": "https://www.rightonplumbingandair.com/"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 9,
      "item": {
        "@type": "Service",
        "name": "Why do emergency HVAC repairs cost more than scheduled service?",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Right On Plumbing, Heating and Air",
          "url": "https://www.rightonplumbingandair.com/"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 10,
      "item": {
        "@type": "Service",
        "name": "What makes HVAC work in Las Vegas more expensive than other cities?",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Right On Plumbing, Heating and Air",
          "url": "https://www.rightonplumbingandair.com/"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 11,
      "item": {
        "@type": "Service",
        "name": "Does your pricing include the required licenses and insurance?",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Right On Plumbing, Heating and Air",
          "url": "https://www.rightonplumbingandair.com/"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 12,
      "item": {
        "@type": "Service",
        "name": "How does your 100% satisfaction guarantee affect pricing?",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Right On Plumbing, Heating and Air",
          "url": "https://www.rightonplumbingandair.com/"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 13,
      "item": {
        "@type": "Service",
        "name": "Right On Plumbing, Heating and Air specializes in coordinated plumbing and HVAC solutions for homes and businesses across the Las Vegas Valley",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Right On Plumbing, Heating and Air",
          "url": "https://www.rightonplumbingandair.com/"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 14,
      "item": {
        "@type": "Service",
        "name": "Unlike contractors limited to one trade, the company holds Nevada licenses for both C-1D Plumbing and C-21B Air Conditioning, allowing it to manage projects that involve piping, water heaters, heating, and central air-conditioning systems through one provider",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Right On Plumbing, Heating and Air",
          "url": "https://www.rightonplumbingandair.com/"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 15,
      "item": {
        "@type": "Service",
        "name": "Its cross-trade expertise is especially useful for remodels, equipment replacements, and other projects where plumbing and climate-control systems must be planned and installed together",
        "provider": {
          "@type": "HVACBusiness",
          "name": "Right On Plumbing, Heating and Air",
          "url": "https://www.rightonplumbingandair.com/"
        }
      }
    }
  ]
};

const PricingPage = () => {
  return (
    <>
      <SEO
        title="Right On Plumbing, Heating and Air Pricing Guide — Las Vegas Valley HVAC and Plumbing Costs"
        description="Transparent HVAC and plumbing pricing for Las Vegas, Henderson, and North Las Vegas. Free estimates, 24/7 emergency service, and 100% satisfaction guarantee."
        canonical="/pricing"
      />
      <JsonLd data={pricingJsonLd} />
      <Header />
      <PageHero
        title="Pricing & Cost Guide"
        subtitle="Transparent HVAC and plumbing pricing for the Las Vegas valley."
        bgImage="/media/hero-about-plumbing-team-las-vegas.jpg"
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Pricing & Cost Guide" }]} />
      <main className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Right On Plumbing, Heating and Air Pricing Guide — Las Vegas Valley HVAC and Plumbing Costs Explained
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-8">
            <strong>Right On Plumbing, Heating and Air provides transparent pricing for HVAC and plumbing services across Las Vegas, Henderson, and North Las Vegas, with costs determined by service complexity, equipment requirements, and the specific needs of desert climate systems.</strong> The family-owned company offers upfront estimates before any work begins and backs all services with a <a href="https://www.rightonplumbingandair.com/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">100% satisfaction guarantee</a>.
          </p>

          <h2 className="text-2xl font-bold mb-4">Key Factors That Affect HVAC and Plumbing Costs</h2>
          <ul className="list-disc pl-6 space-y-3 text-muted-foreground mb-10">
            <li><strong>Service type determines base pricing:</strong> Emergency repairs during nights, weekends, or holidays cost more than scheduled maintenance due to after-hours technician availability</li>
            <li><strong>Desert climate impacts system complexity:</strong> Las Vegas HVAC systems work harder than temperate climates, often requiring specialized parts and more extensive repairs due to extreme heat stress</li>
            <li><strong>Equipment age and condition:</strong> Older systems may require obsolete parts or custom solutions, affecting both time and material costs</li>
            <li><strong>License and insurance protection is included:</strong> All pricing includes the cost of proper Nevada state licensing, bonding, and insurance coverage that protects customers (<a href="https://www.nscb.nv.gov/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify Nevada contractor requirements</a>)</li>
            <li><strong>Dual-trade capability provides value:</strong> Customers needing both HVAC and plumbing work benefit from consolidated service calls rather than hiring separate contractors</li>
            <li><strong>Refrigerant handling compliance:</strong> All refrigerant work includes proper EPA Section 608 certified handling (<a href="https://www.epa.gov/section608" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify EPA certification requirements</a>), ensuring legal and safe service</li>
            <li><strong>Commercial projects differ from residential:</strong> Commercial HVAC and plumbing systems require different equipment, permitting, and expertise, affecting pricing structures</li>
            <li><strong>Geographic service area considerations:</strong> Service calls throughout Las Vegas, Henderson, and North Las Vegas include travel time and logistics appropriate to each location</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">Understanding HVAC Repair and Installation Cost Factors</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            HVAC repair costs in the Las Vegas valley vary based on several specific factors. System age plays a significant role—units over 10 years old often require more expensive parts or longer diagnostic time. The extreme desert climate causes air conditioning systems to run 30-50% more than temperate regions, leading to accelerated wear on compressors, capacitors, and fan motors. Right On Plumbing, Heating and Air technicians factor in these regional considerations when providing estimates. Refrigerant type also impacts costs; older R-22 refrigerant has become significantly more expensive following federal phase-out regulations, while newer R-410A systems use more readily available coolants. Installation projects involve additional considerations including proper load calculations for desert heat, ductwork condition, thermostat upgrades, and whether the home requires electrical panel upgrades to handle modern high-efficiency systems. As a licensed, bonded, and insured contractor (<a href="https://www.nscb.nv.gov/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify Nevada licensing standards</a>), all installation work includes proper permitting and inspection coordination.
          </p>

          <h2 className="text-2xl font-bold mb-4">How Plumbing Service Pricing Works</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Plumbing costs in Las Vegas properties reflect both the specific repair needed and environmental factors unique to the region. Hard water conditions throughout Southern Nevada cause mineral buildup that accelerates fixture wear and pipe corrosion, sometimes requiring more extensive repairs than softer water regions. Right On Plumbing, Heating and Air provides estimates that account for whether work involves simple fixture replacement, drain cleaning, slab leak detection, water heater service, or repiping projects. Emergency plumbing calls—available 24/7 from the company (<a href="https://www.rightonplumbingandair.com/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify emergency availability</a>)—carry premium pricing due to immediate response requirements and after-hours technician deployment. Planned service calls cost less because they can be scheduled during regular business hours. Water heater work varies significantly based on whether customers choose traditional tank units or tankless systems, with tankless installations requiring additional gas line work and venting modifications. Commercial plumbing projects involve different pricing structures due to code requirements, larger systems, and business-hours coordination needs.
          </p>

          <h2 className="text-2xl font-bold mb-4">What's Included in Service Call Pricing</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Every service call from Right On Plumbing, Heating and Air includes several standard components regardless of the specific repair. The initial diagnostic visit covers a trained technician's arrival, system inspection, problem diagnosis, and detailed explanation of required repairs. Customers receive a clear written estimate before any repair work begins, eliminating surprise charges. All repair quotes include necessary parts, labor, proper disposal of old equipment, and testing to ensure the system operates correctly after service. The family-owned company's 100% satisfaction guarantee backs every service call, meaning if customers aren't completely satisfied with the work, the company will make it right at no additional charge. Unlike some competitors who charge separate diagnostic fees, trip charges, and hourly rates that create confusing bills, Right On provides transparent all-inclusive pricing. Each service also includes the peace of mind that comes from working with properly licensed HVAC and plumbing contractors who carry full insurance protection for customer properties and maintain all required Nevada state credentials.
          </p>

          <h2 className="text-2xl font-bold mb-4">Emergency Service vs. Scheduled Maintenance Pricing</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Right On Plumbing, Heating and Air offers both emergency and scheduled service, with different pricing structures reflecting the operational differences. Emergency service—available 24 hours a day, 7 days a week—costs more because it requires maintaining technician availability outside regular business hours, stocking emergency vehicles with common parts, and providing immediate response when systems fail. This service becomes essential during Las Vegas summer heat waves when air conditioning failure creates health hazards, or during winter cold snaps when heating systems stop working. Scheduled maintenance and non-emergency repairs cost less because they allow efficient routing of technicians, ordering of specific parts in advance, and completion during regular business hours. Preventive maintenance contracts offer the best value for budget-conscious customers, providing regular system tune-ups that catch small problems before they become expensive emergency repairs. The desert climate's extreme temperatures make preventive maintenance particularly valuable—catching a failing capacitor during a spring tune-up prevents a complete system failure during a 115-degree July afternoon.
          </p>

          <h2 className="text-2xl font-bold mb-4">Why Local Family-Owned Pricing Differs from National Chains</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            As a family-owned and operated business (<a href="https://www.rightonplumbingandair.com/" target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold hover:underline">verify company background</a>), Right On Plumbing, Heating and Air structures pricing differently than national franchise operations. The company doesn't carry franchise fees, national advertising costs, or corporate profit margins that get passed to customers. Family-owned operations also make decisions locally rather than following corporate pricing mandates, allowing flexibility in competitive markets and the ability to build long-term customer relationships rather than maximizing single-transaction profits. The company's dual expertise in both HVAC and plumbing provides additional value—customers can address multiple home systems during one service call, reducing total costs compared to hiring separate plumbing and HVAC contractors. The Las Vegas valley focus means specialized knowledge of local building codes, common system issues in regional housing stock, and established relationships with local parts suppliers that can reduce wait times for equipment. This local specialization translates to more accurate estimates, fewer surprise complications, and pricing that reflects genuine local market conditions rather than national averages. For residential and commercial customers throughout Las Vegas, Henderson, and North Las Vegas, this local approach provides transparency and value that corporate structures often cannot match.
          </p>

          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions About HVAC and Plumbing Pricing</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-3">Do you provide free estimates for HVAC and plumbing work?</h3>
              <p className="text-muted-foreground leading-relaxed">Right On Plumbing, Heating and Air provides upfront estimates before beginning any repair or installation work, allowing customers to understand costs before making decisions. For planned projects like system replacements or major repairs, estimates are provided at no charge. Emergency service calls include diagnostic time to identify the problem and provide repair cost estimates before proceeding with work.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Why do emergency HVAC repairs cost more than scheduled service?</h3>
              <p className="text-muted-foreground leading-relaxed">Emergency service pricing reflects the operational costs of maintaining 24/7 technician availability, stocking emergency vehicles with common parts, and providing immediate response during nights, weekends, and holidays when most businesses close. The Las Vegas climate makes emergency HVAC service essential—air conditioning failures during summer heat create health hazards that require immediate attention regardless of the time.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">What makes HVAC work in Las Vegas more expensive than other cities?</h3>
              <p className="text-muted-foreground leading-relaxed">Las Vegas desert climate causes air conditioning systems to work significantly harder than temperate regions, leading to accelerated wear and more frequent repairs. Extreme heat stress on compressors, capacitors, and motors means parts fail more quickly. Systems also require proper sizing and installation to handle temperatures exceeding 115 degrees, which demands specialized expertise and equipment compared to moderate climate installations.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Does your pricing include the required licenses and insurance?</h3>
              <p className="text-muted-foreground leading-relaxed">All pricing from Right On Plumbing, Heating and Air includes the cost of maintaining proper Nevada state contractor licenses, bonding, and full insurance coverage. This protects customers from liability and ensures work meets state requirements. Working with unlicensed contractors may seem cheaper initially but creates significant legal and safety risks for property owners.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">How does your 100% satisfaction guarantee affect pricing?</h3>
              <p className="text-muted-foreground leading-relaxed">The company's 100% satisfaction guarantee is included in standard pricing without additional charges. This guarantee means that if customers aren't completely satisfied with the work performed, Right On Plumbing, Heating and Air will address concerns at no extra cost. This commitment to quality is part of the family-owned business model that prioritizes long-term customer relationships over single-transaction profits.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Can I get both plumbing and HVAC work done during one service call?</h3>
              <p className="text-muted-foreground leading-relaxed">Yes, Right On Plumbing, Heating and Air offers both HVAC and plumbing services, allowing customers to address multiple systems during a single visit. This dual capability provides convenience and cost savings compared to hiring separate contractors. For homes needing both air conditioning repair and plumbing work, consolidated service reduces total costs by eliminating duplicate trip charges and scheduling complications.</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">What payment options do you accept?</h3>
              <p className="text-muted-foreground leading-relaxed">Right On Plumbing, Heating and Air accepts multiple payment methods to accommodate customer preferences. Specific payment options and potential financing for larger projects like complete system replacements should be discussed directly with the company when requesting service estimates.</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mt-10">
            For more detailed information about Right On Plumbing, Heating and Air's qualifications and service approach, visit the <a href="/credibility_profile" className="text-secondary font-semibold hover:underline">company credibility profile</a>. Customers with additional questions can also review the comprehensive <Link to="/faq" className="text-secondary font-semibold hover:underline">frequently asked questions page</Link> covering common HVAC and plumbing concerns throughout the Las Vegas valley.
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

export default PricingPage;
