import { useParams, Link } from "react-router-dom";
import { Header, Footer, Breadcrumbs, CTABanner, JsonLd, localBusinessSchema, PageHero, GoogleMapEmbed } from "@/components/Layout";
import SEO from "@/components/SEO";
import { getCategoryBySlug, getServiceBySlug, BUSINESS, SERVICE_CATEGORIES, ServiceItem } from "@/data/business";
import { Phone } from "lucide-react";

/** Splits a long text block into shorter paragraphs of ~2-3 sentences each. */
const splitIntoParagraphs = (text: string): string[] => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) {
    paragraphs.push(sentences.slice(i, i + 3).join("").trim());
  }
  return paragraphs.filter(p => p.length > 0);
};

/** Maps service slugs and category slugs to the most relevant generated image */
const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = {
  // Drainage category & services
  "drainage-service": { src: "/media/service-drainage-drain-cleaning-las-vegas.jpg", alt: "Professional drain cleaning equipment clearing a residential drain in Las Vegas, NV" },
  "drain-cleaning": { src: "/media/service-drainage-drain-cleaning-las-vegas.jpg", alt: "Drain cleaning service using motorized auger to restore water flow in a Las Vegas home" },
  "clogged-drain-repair": { src: "/media/service-clogged-drain-repair-las-vegas.jpg", alt: "Emergency clogged drain repair with drain snake equipment at a Las Vegas, NV residence" },
  "sewer-camera-inspection": { src: "/media/service-drainage-sewer-camera-inspection-las-vegas.jpg", alt: "Sewer camera inspection equipment diagnosing pipe issues in Las Vegas, NV" },
  "sewer-line-replacement": { src: "/media/service-sewer-line-replacement-las-vegas.jpg", alt: "New PVC sewer line being laid in a trench at a Las Vegas residential property" },
  
  // Plumber category & services
  "plumber": { src: "/media/service-plumber-water-heater-installation-las-vegas.jpg", alt: "Professional plumbing services including water heater installation in Las Vegas, NV" },
  "water-heater-replacement": { src: "/media/service-water-heater-replacement-las-vegas.jpg", alt: "Tank water heater replacement with copper piping in a Las Vegas garage" },
  "water-heater-installation": { src: "/media/service-plumber-water-heater-installation-las-vegas.jpg", alt: "New water heater installation with copper piping in Las Vegas, NV" },
  "tankless-water-heater-installation": { src: "/media/service-tankless-water-heater-installation-las-vegas.jpg", alt: "Tankless water heater mounted on garage wall with copper piping in Las Vegas, NV" },
  "sewer-line-repair": { src: "/media/service-sewer-line-repair-las-vegas.jpg", alt: "Sewer line repair with exposed piping and coupling repair at a Las Vegas home" },
  "toilet-repair": { src: "/media/service-toilet-repair-installation-las-vegas.jpg", alt: "Toilet repair and installation service in Las Vegas, NV" },
  "toilet-installation": { src: "/media/service-toilet-installation-las-vegas.jpg", alt: "New toilet installation with fresh supply line in a Las Vegas bathroom" },
  "faucet-repair": { src: "/media/service-plumber-faucet-repair-las-vegas.jpg", alt: "Faucet repair and cartridge replacement in a Las Vegas kitchen" },
  "faucet-installation": { src: "/media/service-faucet-installation-las-vegas.jpg", alt: "Kitchen faucet installation and repair service in Las Vegas, NV" },
  "leak-detection": { src: "/media/service-leak-detection-las-vegas.jpg", alt: "Electronic leak detection equipment diagnosing residential plumbing in Las Vegas, NV" },
  "backflow-testing": { src: "/media/service-backflow-testing-las-vegas.jpg", alt: "Backflow preventer testing with pressure gauges in Las Vegas, NV" },
  "bathroom-remodeling": { src: "/media/service-bathroom-remodeling-las-vegas.jpg", alt: "Bathroom remodeling plumbing with new vanity and copper supply lines in Las Vegas, NV" },
  "emergency-plumber": { src: "/media/service-emergency-plumber-las-vegas.jpg", alt: "Emergency plumber repairing pipes under a kitchen sink in Las Vegas, NV" },
  "commercial-plumber": { src: "/media/service-commercial-plumber-las-vegas.jpg", alt: "Commercial plumbing rough-in with large diameter pipes in a Las Vegas building" },
  // AC Contractor category & services
  "air-conditioning-contractor": { src: "/media/service-ac-contractor-installation-las-vegas.jpg", alt: "Air conditioning condenser unit installed at a Las Vegas home in the desert heat" },
  "ac-installation": { src: "/media/service-ac-contractor-installation-las-vegas.jpg", alt: "Professional AC installation on a concrete pad at a Las Vegas residence" },
  "air-conditioner-installation": { src: "/media/service-ac-replacement-las-vegas.jpg", alt: "New air conditioner installation at a Las Vegas desert home" },
  "central-air-conditioning-installation": { src: "/media/service-central-ac-installation-las-vegas.jpg", alt: "Central air conditioning indoor air handler with ductwork in Las Vegas, NV" },
  "ac-replacement": { src: "/media/service-ac-replacement-unique-las-vegas.jpg", alt: "AC replacement project with old and new condenser units at a Las Vegas home" },
  "air-conditioner-replacement": { src: "/media/service-air-conditioner-replacement-las-vegas.jpg", alt: "Air conditioner replacement with upgraded outdoor condenser in Las Vegas, NV" },
  "ductless-ac-installation": { src: "/media/service-ductless-mini-split-installation-las-vegas.jpg", alt: "Ductless mini-split AC unit installed in a Las Vegas living room" },
  "central-ac-installation": { src: "/media/service-central-ac-installation-unique-las-vegas.jpg", alt: "Central AC air handler installation for whole-home cooling in Las Vegas, NV" },
  "new-ac-unit-installation": { src: "/media/service-new-ac-unit-installation-las-vegas.jpg", alt: "New AC unit installed on concrete pad at a Las Vegas desert home" },
  "air-conditioning-system-installation": { src: "/media/service-air-conditioning-system-installation-las-vegas.jpg", alt: "Complete split air conditioning system installation in Las Vegas, NV" },
  "window-ac-installation": { src: "/media/service-window-ac-installation-las-vegas.jpg", alt: "Window AC unit being installed in a residential window in Las Vegas, NV" },
  // AC Repair category & services
  "air-conditioning-repair-service": { src: "/media/service-ac-repair-technician-las-vegas.jpg", alt: "AC repair technician diagnosing condenser unit issues in Las Vegas, NV" },
  "ac-repair": { src: "/media/service-ac-repair-technician-las-vegas.jpg", alt: "AC repair service restoring cooling to a Las Vegas home" },
  "air-conditioner-repair": { src: "/media/service-ac-not-cooling-repair-las-vegas.jpg", alt: "Air conditioner repair with manifold gauges in Las Vegas, NV" },
  "air-conditioning-repair": { src: "/media/service-air-conditioning-repair-las-vegas.jpg", alt: "Air conditioning repair with open condenser panel and diagnostics in Las Vegas, NV" },
  "ac-not-cooling-repair": { src: "/media/service-ac-not-cooling-repair-unique-las-vegas.jpg", alt: "Diagnosing an AC not cooling issue with gauges at a Las Vegas residence" },
  "ac-not-turning-on-repair": { src: "/media/service-ac-compressor-repair-las-vegas.jpg", alt: "Troubleshooting an AC unit that won't turn on in Las Vegas, NV" },
  "ac-refrigerant-recharge": { src: "/media/service-ac-refrigerant-recharge-las-vegas.jpg", alt: "AC refrigerant recharge setup with gauges and charging cylinder in Las Vegas, NV" },
  "ac-leak-repair": { src: "/media/service-ac-leak-repair-las-vegas.jpg", alt: "AC leak repair on refrigerant line during Las Vegas condenser service" },
  "ac-compressor-repair": { src: "/media/service-ac-compressor-repair-unique-las-vegas.jpg", alt: "AC compressor repair with electrical diagnostics in Las Vegas, NV" },
  "ac-fan-motor-replacement": { src: "/media/service-ac-fan-motor-replacement-las-vegas.jpg", alt: "AC condenser fan motor being replaced in Las Vegas, NV" },
  "ac-capacitor-replacement": { src: "/media/service-ac-capacitor-replacement-las-vegas.jpg", alt: "AC capacitor replacement inside electrical panel — common Las Vegas repair" },
  // Air Duct Cleaning category & services
  "air-duct-cleaning-service": { src: "/media/service-air-duct-cleaning-las-vegas.jpg", alt: "Professional air duct cleaning equipment connected to a residential vent in Las Vegas, NV" },
  "air-duct-cleaning": { src: "/media/service-air-duct-cleaning-las-vegas.jpg", alt: "Air duct cleaning service removing dust and allergens in a Las Vegas home" },
  "dryer-vent-cleaning": { src: "/media/service-dryer-vent-cleaning-las-vegas.jpg", alt: "Dryer vent cleaning with rotary brush to prevent fire hazards in Las Vegas, NV" },
  "ductwork-installation": { src: "/media/service-ductwork-installation-las-vegas.jpg", alt: "Flexible ductwork installation in a residential attic in Las Vegas, NV" },
  "ductwork-repair": { src: "/media/service-ductwork-repair-las-vegas.jpg", alt: "Ductwork repair in attic with sealed and replaced duct sections in Las Vegas, NV" },
  "duct-sealing": { src: "/media/service-duct-sealing-las-vegas.jpg", alt: "Professional duct sealing with mastic sealant to eliminate air leaks in Las Vegas, NV" },
  // Furnace Repair category & services
  "furnace-repair-service": { src: "/media/service-furnace-repair-las-vegas.jpg", alt: "Gas furnace open for repair showing burners and heat exchanger in Las Vegas, NV" },
  "furnace-repair": { src: "/media/service-furnace-repair-las-vegas.jpg", alt: "Furnace repair service for a Las Vegas home during winter" },
  "furnace-not-heating-repair": { src: "/media/service-furnace-not-heating-repair-las-vegas.jpg", alt: "Furnace not heating repair with open control panel diagnostics in Las Vegas, NV" },
  "furnace-ignitor-replacement": { src: "/media/service-furnace-ignitor-replacement-las-vegas.jpg", alt: "Glowing hot surface ignitor inside a gas furnace burner in Las Vegas, NV" },
  "furnace-blower-motor-replacement": { src: "/media/service-furnace-blower-motor-las-vegas.jpg", alt: "Furnace blower motor and squirrel cage assembly being serviced in Las Vegas, NV" },
  "furnace-flame-sensor-replacement": { src: "/media/service-furnace-flame-sensor-replacement-las-vegas.jpg", alt: "Furnace flame sensor replacement at burner assembly in Las Vegas, NV" },
  "heat-exchanger-replacement": { src: "/media/service-heat-exchanger-replacement-las-vegas.jpg", alt: "Heat exchanger replacement to restore furnace safety in Las Vegas, NV" },
  "boiler-repair": { src: "/media/service-boiler-las-vegas.jpg", alt: "Boiler system repair with copper piping in Las Vegas, NV" },
  "heat-pump-repair": { src: "/media/service-heat-pump-repair-las-vegas.jpg", alt: "Heat pump repair with open service panel and diagnostic tools in Las Vegas, NV" },
  // Heating Contractor category & services
  "heating-contractor": { src: "/media/service-heating-contractor-furnace-installation-las-vegas.jpg", alt: "New furnace installation with ductwork in a Las Vegas garage" },
  "furnace-installation": { src: "/media/service-heating-contractor-furnace-installation-las-vegas.jpg", alt: "Professional furnace installation in a Las Vegas home" },
  "heat-pump-installation": { src: "/media/service-heat-pump-installation-las-vegas.jpg", alt: "Heat pump installation on a desert-climate Las Vegas residence" },
  "boiler-installation": { src: "/media/service-boiler-installation-las-vegas.jpg", alt: "Boiler installation with new copper piping in a Las Vegas mechanical room" },
  "boiler-replacement": { src: "/media/service-boiler-replacement-las-vegas.jpg", alt: "Boiler replacement from older unit to high-efficiency model in Las Vegas, NV" },
  "radiant-floor-heating-installation": { src: "/media/service-radiant-floor-heating-las-vegas.jpg", alt: "Radiant floor heating PEX tubing laid on concrete slab in a Las Vegas home" },
  "baseboard-heater-installation": { src: "/media/service-baseboard-heater-las-vegas.jpg", alt: "Electric baseboard heater installed below a window in Las Vegas, NV" },
  "gas-furnace-installation": { src: "/media/service-gas-furnace-installation-las-vegas.jpg", alt: "Gas furnace installation with venting and gas line connection in Las Vegas, NV" },
  "electric-furnace-installation": { src: "/media/service-electric-furnace-installation-las-vegas.jpg", alt: "Electric furnace installation with dedicated electrical service in Las Vegas, NV" },
  "ductless-mini-split-installation": { src: "/media/service-ductless-mini-split-installation-unique-las-vegas.jpg", alt: "Ductless mini-split indoor unit installation in a Las Vegas home" },
  // HVAC Contractor category & services
  "hvac-contractor": { src: "/media/service-hvac-contractor-thermostat-las-vegas.jpg", alt: "Smart thermostat installation and HVAC service in Las Vegas, NV" },
  "hvac-tune-up": { src: "/media/service-hvac-tune-up-las-vegas.jpg", alt: "HVAC tune-up and electrical inspection at a Las Vegas condenser unit" },
  "hvac-maintenance": { src: "/media/service-hvac-maintenance-las-vegas.jpg", alt: "HVAC maintenance service with filter replacement and system care in Las Vegas, NV" },
  "hvac-inspection": { src: "/media/service-hvac-inspection-las-vegas.jpg", alt: "HVAC inspection with thermal diagnostics and checklist in Las Vegas, NV" },
  "thermostat-installation": { src: "/media/service-hvac-contractor-thermostat-las-vegas.jpg", alt: "Thermostat installation on residential wall in Las Vegas, NV" },
  "smart-thermostat-installation": { src: "/media/service-smart-thermostat-installation-las-vegas.jpg", alt: "Smart thermostat installation for energy savings in a Las Vegas home" },
  "whole-house-humidifier-installation": { src: "/media/service-humidifier-installation-las-vegas.jpg", alt: "Whole house humidifier unit installed on HVAC ductwork in Las Vegas, NV" },
  "whole-house-dehumidifier-installation": { src: "/media/service-whole-house-dehumidifier-installation-las-vegas.jpg", alt: "Whole-house dehumidifier connected to HVAC ductwork in Las Vegas, NV" },
  "uv-air-purifier-installation": { src: "/media/service-uv-air-purifier-las-vegas.jpg", alt: "UV germicidal air purifier glowing inside HVAC ductwork in Las Vegas, NV" },
  "air-scrubber-installation": { src: "/media/service-air-scrubber-installation-las-vegas.jpg", alt: "Air scrubber installation integrated into HVAC ductwork in Las Vegas, NV" },
  // Mechanical Contractor category & services
  "mechanical-contractor": { src: "/media/service-mechanical-contractor-commercial-hvac-las-vegas.jpg", alt: "Commercial rooftop HVAC unit on a Las Vegas building with desert mountains" },
  "commercial-hvac-installation": { src: "/media/service-mechanical-contractor-commercial-hvac-las-vegas.jpg", alt: "Commercial HVAC installation for a Las Vegas business" },
  "commercial-hvac-repair": { src: "/media/service-commercial-hvac-repair-las-vegas.jpg", alt: "Commercial rooftop HVAC unit being repaired with Las Vegas skyline" },
  "rooftop-unit-installation": { src: "/media/service-rooftop-unit-installation-las-vegas.jpg", alt: "Rooftop HVAC unit installation on a commercial building in Las Vegas, NV" },
  "commercial-ventilation-installation": { src: "/media/service-commercial-ventilation-las-vegas.jpg", alt: "Commercial kitchen exhaust ventilation system in Las Vegas, NV" },
  "make-up-air-unit-installation": { src: "/media/service-make-up-air-unit-installation-las-vegas.jpg", alt: "Make-up air unit installation for commercial ventilation in Las Vegas, NV" },
  "exhaust-fan-installation": { src: "/media/service-exhaust-fan-installation-las-vegas.jpg", alt: "Commercial exhaust fan installation for Las Vegas ventilation systems" },
  "commercial-boiler-installation": { src: "/media/service-commercial-boiler-installation-las-vegas.jpg", alt: "Commercial boiler installation in a Las Vegas mechanical room" },
  "chiller-installation": { src: "/media/service-chiller-installation-las-vegas.jpg", alt: "Commercial chiller installation on a Las Vegas rooftop" },
};

/** Get image for a service or category slug, with fallback */
const getServiceImage = (slug: string, parentSlug?: string) => {
  return SERVICE_IMAGES[slug] || SERVICE_IMAGES[parentSlug || ""] || { src: "/media/right-on-plumbing-heating-and-air-project-01-las-vegas-nv.jpg", alt: "Professional plumbing and HVAC service in Las Vegas, NV" };
};

/** Build a contextual paragraph with natural internal links for a service detail page. */
const ContextualLinks = ({ service, siblings }: { service: ServiceItem; siblings: ServiceItem[] }) => {
  const otherServices = siblings.filter(s => s.slug !== service.slug);
  // Pick up to 2 related sibling services to mention
  const related = otherServices.slice(0, 2);
  // Pick a complementary service from a different category
  const otherCategory = SERVICE_CATEGORIES.find(c => c.slug !== service.parentSlug);
  const crossLink = otherCategory?.services[0];

  return (
    <div className="text-muted-foreground mb-8 leading-relaxed space-y-4">
      <p>
        Homeowners in <Link to="/las-vegas" className="text-secondary font-semibold hover:underline">Las Vegas</Link> count on {BUSINESS.name} for dependable {service.name.toLowerCase()} because we combine deep local experience with transparent, upfront pricing. Whether your property is near the Strip, in Summerlin, or in a newer development in the southwest valley, our licensed technicians arrive equipped to handle the job from start to finish.
      </p>
      {related.length > 0 && (
        <p>
          Many customers who need {service.name.toLowerCase()} also benefit from{" "}
          <Link to={`/${service.parentSlug}/${related[0].slug}`} className="text-secondary font-semibold hover:underline">{related[0].name.toLowerCase()}</Link>
          {related[1] && (
            <> and <Link to={`/${service.parentSlug}/${related[1].slug}`} className="text-secondary font-semibold hover:underline">{related[1].name.toLowerCase()}</Link></>
          )}
          {" "}as part of a complete maintenance plan. Addressing multiple issues in a single visit saves time and helps prevent costly callbacks.
        </p>
      )}
      {crossLink && (
        <p>
          Beyond {service.parentSlug === "plumber" ? "plumbing" : service.parentSlug === "drainage-service" ? "drainage" : "this service"}, we also provide expert{" "}
          <Link to={`/${otherCategory!.slug}/${crossLink.slug}`} className="text-secondary font-semibold hover:underline">{crossLink.name.toLowerCase()}</Link>
          {" "}— a service our <Link to="/henderson" className="text-secondary font-semibold hover:underline">Henderson</Link> and <Link to="/boulder-city" className="text-secondary font-semibold hover:underline">Boulder City</Link> customers frequently pair with {service.name.toLowerCase()} to keep their homes comfortable year-round.
        </p>
      )}
      <p>
        Ready to schedule? <Link to="/contact" className="text-secondary font-semibold hover:underline">Request your free {service.name.toLowerCase()} estimate</Link> online or call <a href={`tel:${BUSINESS.phone}`} className="text-secondary font-semibold hover:underline">{BUSINESS.phoneFormatted}</a> for same-day availability.
      </p>
    </div>
  );
};

/** Rich, unique 600-800 word content for each top-level category page. */
const CATEGORY_CONTENT: Record<string, { sections: { heading: string; body: JSX.Element }[] }> = {
  "drainage-service": {
    sections: [
      {
        heading: "Trusted Drain & Sewer Experts Serving Las Vegas Homes",
        body: (
          <>
            <p>Every home in the Las Vegas valley relies on a drainage system that works silently behind the scenes — until it doesn't. When a kitchen sink backs up during dinner, a floor drain overflows in the laundry room, or a foul sewage odor seeps through the bathroom, homeowners need a contractor who can diagnose the root cause and resolve it permanently.</p>
            <p><Link to="/" className="text-secondary font-semibold hover:underline">Right On Plumbing, Heating and Air</Link> has built its reputation on exactly that kind of dependable, no-guesswork drain and sewer service across Las Vegas, Henderson, and Boulder City.</p>
            <p>The Mojave Desert's unique soil composition — primarily caliche and compacted clay — places extraordinary stress on underground sewer lines. Seasonal ground shifting, coupled with the mineral-heavy water sourced from Lake Mead, accelerates pipe corrosion and scale buildup inside residential drain systems.</p>
            <p>These aren't problems you can ignore; left unattended, a slow drain can escalate into a full sewer backup that causes thousands of dollars in water damage and creates serious health hazards.</p>
            <p>Our drainage technicians carry HD sewer cameras, hydro-jetting equipment, and motorized augers on every service call so they can move from diagnosis to resolution in a single visit. Whether you need routine <Link to="/drainage-service/drain-cleaning" className="text-secondary font-semibold hover:underline">drain cleaning</Link> to prevent buildup or an emergency response for a <Link to="/drainage-service/clogged-drain-repair" className="text-secondary font-semibold hover:underline">clogged drain repair</Link>, our team arrives prepared.</p>
            <p>For homeowners dealing with aging cast-iron or Orangeburg sewer lines, we provide complete <Link to="/drainage-service/sewer-line-replacement" className="text-secondary font-semibold hover:underline">sewer line replacement</Link> backed by a thorough <Link to="/drainage-service/sewer-camera-inspection" className="text-secondary font-semibold hover:underline">sewer camera inspection</Link> so you know exactly what's happening underground before any work begins.</p>
          </>
        ),
      },
      {
        heading: "Why Las Vegas Drains Fail — and How We Fix Them",
        body: (
          <>
            <p>Understanding why drains fail in this region is half the battle. Las Vegas tap water registers among the hardest in the nation, with mineral concentrations that leave calcium and magite deposits inside drain lines over time.</p>
            <p>Tree roots — especially from mesquite and other desert-adapted species — aggressively seek moisture and can infiltrate even tiny pipe joints. Add in the high volume of sand and dust that enters homes through everyday foot traffic, and it's no wonder that Las Vegas plumbing systems require more proactive maintenance than those in milder climates.</p>
            <p>We recommend annual <Link to="/drainage-service/sewer-camera-inspection" className="text-secondary font-semibold hover:underline">sewer camera inspections</Link> for Las Vegas homeowners as a preventive measure. A five-minute camera run can reveal hairline cracks, root intrusion, or bellied pipe sections long before they trigger an emergency.</p>
            <p>If our inspection uncovers a section of pipe that's beyond repair, we'll walk you through your options — from spot repairs to full <Link to="/drainage-service/sewer-line-replacement" className="text-secondary font-semibold hover:underline">sewer line replacement</Link> — with transparent pricing and no pressure.</p>
            <p>Drainage problems often overlap with other home systems. A failing sewer line can strain your <Link to="/plumber" className="text-secondary font-semibold hover:underline">plumbing system</Link>, and poor indoor air quality from sewer gas leaks is a concern that connects directly to your <Link to="/hvac-contractor" className="text-secondary font-semibold hover:underline">HVAC and ventilation system</Link>.</p>
            <p>That's why homeowners across <Link to="/las-vegas" className="text-secondary font-semibold hover:underline">Las Vegas</Link>, <Link to="/henderson" className="text-secondary font-semibold hover:underline">Henderson</Link>, and <Link to="/boulder-city" className="text-secondary font-semibold hover:underline">Boulder City</Link> choose a full-service contractor who can address the complete picture. <Link to="/contact" className="text-secondary font-semibold hover:underline">Schedule your free drainage inspection</Link> or call <a href={`tel:${BUSINESS.phone}`} className="text-secondary font-semibold hover:underline">{BUSINESS.phoneFormatted}</a> for same-day service.</p>
          </>
        ),
      },
    ],
  },
  "plumber": {
    sections: [
      {
        heading: "Licensed Plumbing Professionals for Every Las Vegas Home",
        body: (
          <>
            <p>Plumbing is the backbone of residential comfort. From the moment you turn on a faucet in the morning to the last flush at night, your home's plumbing system handles hundreds of gallons of water — and in Las Vegas, it does so under conditions that would challenge any infrastructure.</p>
            <p>The Colorado River water that serves Clark County is notoriously hard, registering over 280 parts per million of dissolved minerals. That mineral load coats the insides of pipes, corrodes water heater anodes, and shortens the lifespan of fixtures and appliances.</p>
            <p><Link to="/" className="text-secondary font-semibold hover:underline">Right On Plumbing, Heating and Air</Link> understands these desert-specific challenges because we live and work here — serving homeowners across Las Vegas, Summerlin, Spring Valley, and the entire valley.</p>
            <p>Our licensed plumbers handle everything from straightforward <Link to="/plumber/faucet-repair" className="text-secondary font-semibold hover:underline">faucet repairs</Link> and <Link to="/plumber/toilet-repair" className="text-secondary font-semibold hover:underline">toilet repairs</Link> to complex whole-home repiping and <Link to="/plumber/water-heater-installation" className="text-secondary font-semibold hover:underline">water heater installations</Link>.</p>
            <p>Every technician on our roster is state-licensed, background-checked, and carries liability insurance — because when someone enters your home, you deserve absolute confidence in their professionalism and skill.</p>
          </>
        ),
      },
      {
        heading: "Water Heaters, Fixtures & Emergency Plumbing Repairs",
        body: (
          <>
            <p>Water heater failure is the single most common plumbing emergency we see in Las Vegas. The combination of hard water and extreme ambient temperatures — attic and garage temperatures can exceed 140°F in summer — pushes tank water heaters past their rated lifespan years ahead of schedule.</p>
            <p>We help homeowners decide between traditional tank and <Link to="/plumber/tankless-water-heater-installation" className="text-secondary font-semibold hover:underline">tankless water heater</Link> options based on household size, hot-water demand, and long-term energy savings. Every installation includes proper permitting through the City of Las Vegas or the relevant jurisdiction, code-compliant connections, and old-unit disposal.</p>
            <p>Beyond water heaters, our plumbing team tackles <Link to="/plumber/leak-detection" className="text-secondary font-semibold hover:underline">leak detection</Link>, <Link to="/plumber/sewer-line-repair" className="text-secondary font-semibold hover:underline">sewer line repair</Link>, <Link to="/plumber/bathroom-remodeling" className="text-secondary font-semibold hover:underline">bathroom remodeling</Link>, and <Link to="/plumber/backflow-testing" className="text-secondary font-semibold hover:underline">backflow testing</Link> — a service required annually for many Las Vegas properties with irrigation systems or fire suppression equipment.</p>
            <p>We also maintain a dedicated <Link to="/plumber/emergency-plumber" className="text-secondary font-semibold hover:underline">emergency plumber</Link> response line for burst pipes, gas leaks, and sewage backups that can't wait until business hours.</p>
            <p>Plumbing and HVAC are more connected than most homeowners realize. A failing water heater shares gas and venting infrastructure with your <Link to="/hvac-contractor" className="text-secondary font-semibold hover:underline">HVAC system</Link>, and drainage issues can signal deeper problems best addressed alongside <Link to="/drainage-service" className="text-secondary font-semibold hover:underline">professional drainage service</Link>.</p>
            <p>Working with a single contractor who covers all of these trades — like Right On Plumbing, Heating and Air — eliminates finger-pointing between vendors and ensures a cohesive solution for your <Link to="/las-vegas" className="text-secondary font-semibold hover:underline">Las Vegas</Link> home. <Link to="/contact" className="text-secondary font-semibold hover:underline">Request your free plumbing estimate today</Link> or call <a href={`tel:${BUSINESS.phone}`} className="text-secondary font-semibold hover:underline">{BUSINESS.phoneFormatted}</a>.</p>
          </>
        ),
      },
    ],
  },
  "air-conditioning-contractor": {
    sections: [
      {
        heading: "Expert AC Installation & Cooling System Contractors in Las Vegas",
        body: (
          <>
            <p>In a city where summer temperatures regularly eclipse 115°F, air conditioning isn't optional — it's survival infrastructure. A properly sized and professionally installed cooling system keeps your family safe during triple-digit heat, protects electronics and furnishings from thermal stress, and prevents the dangerous indoor temperatures that send hundreds of Las Vegas residents to emergency rooms every summer.</p>
            <p><Link to="/" className="text-secondary font-semibold hover:underline">Right On Plumbing, Heating and Air</Link> has installed and replaced air conditioning systems across the Las Vegas valley for over 20 years, earning a reputation for precision engineering and transparent, upfront pricing.</p>
            <p>What separates a quality AC installation from a mediocre one? It starts with a Manual J load calculation — a room-by-room analysis of your home's thermal characteristics including square footage, insulation R-values, window orientation, ceiling height, and duct layout.</p>
            <p>An oversized unit short-cycles, wasting energy and creating humidity problems. An undersized unit runs continuously without ever reaching setpoint. Our technicians perform this calculation on every installation because getting it right means the difference between a system that lasts 15 years and one that fails in seven.</p>
          </>
        ),
      },
      {
        heading: "Central Air, Ductless Mini-Splits & Complete Cooling Solutions",
        body: (
          <>
            <p>We install every type of residential cooling system to match your home's architecture and your family's comfort preferences. <Link to="/air-conditioning-contractor/ac-installation" className="text-secondary font-semibold hover:underline">Central AC installation</Link> remains the gold standard for whole-home cooling in Las Vegas, distributing conditioned air through a sealed duct network to every room.</p>
            <p>For homes without existing ductwork — common in older neighborhoods near downtown or Fremont Street — <Link to="/air-conditioning-contractor/ductless-ac-installation" className="text-secondary font-semibold hover:underline">ductless mini-split installation</Link> provides zone-by-zone temperature control with up to 60% greater efficiency than window units.</p>
            <p>When your existing system reaches end of life, our <Link to="/air-conditioning-contractor/ac-replacement" className="text-secondary font-semibold hover:underline">AC replacement</Link> service handles everything from equipment selection to old-unit disposal and EPA-compliant refrigerant recovery. We work with all major brands — Carrier, Lennox, Trane, Goodman, Rheem — and help you weigh upfront cost against long-term energy savings so you can make a confident investment.</p>
            <p>Air conditioning installation doesn't exist in a vacuum. Your cooling system depends on well-sealed ductwork to deliver conditioned air efficiently, and it shares electrical and thermostat infrastructure managed by your <Link to="/hvac-contractor" className="text-secondary font-semibold hover:underline">HVAC contractor</Link>.</p>
            <p>That's why homeowners across <Link to="/las-vegas" className="text-secondary font-semibold hover:underline">Las Vegas</Link>, <Link to="/henderson" className="text-secondary font-semibold hover:underline">Henderson</Link>, and <Link to="/boulder-city" className="text-secondary font-semibold hover:underline">Boulder City</Link> prefer a full-service HVAC contractor who can evaluate and optimize the entire system. When your system's performance depends on <Link to="/air-conditioning-repair-service" className="text-secondary font-semibold hover:underline">expert AC repair</Link>, we're a single call away. <Link to="/contact" className="text-secondary font-semibold hover:underline">Get your free cooling system estimate</Link> or call <a href={`tel:${BUSINESS.phone}`} className="text-secondary font-semibold hover:underline">{BUSINESS.phoneFormatted}</a>.</p>
          </>
        ),
      },
    ],
  },
  "air-conditioning-repair-service": {
    sections: [
      {
        heading: "Fast, Reliable AC Repair When the Desert Heat Won't Wait",
        body: (
          <>
            <p>When your air conditioner fails in Las Vegas, the clock starts ticking immediately. Indoor temperatures can climb past 100°F within hours, putting children, elderly family members, and pets at serious risk.</p>
            <p><Link to="/" className="text-secondary font-semibold hover:underline">Right On Plumbing, Heating and Air</Link> maintains a fleet of fully stocked service vehicles specifically to minimize response times during the critical summer months. Our NATE-certified technicians carry the most common failure-point parts — capacitors, contactors, fan motors, and refrigerant — so that the majority of repairs are completed in a single visit without a return trip for parts.</p>
            <p>AC systems in the Las Vegas valley endure operating conditions that would be considered extreme anywhere else in the country. Condenser units sit in direct desert sun where ambient temperatures around the coils can reach 130°F or higher.</p>
            <p>Dust storms coat condenser fins with fine particulate, reducing heat transfer. Electrical components degrade faster because thermal cycling is more severe. Understanding these desert-specific failure patterns is what allows our technicians to diagnose problems faster and recommend repairs that actually last.</p>
          </>
        ),
      },
      {
        heading: "Common Air Conditioning Problems & How We Solve Them",
        body: (
          <>
            <p>The most frequent emergency call we receive is for an <Link to="/air-conditioning-repair-service/ac-not-cooling-repair" className="text-secondary font-semibold hover:underline">AC unit that runs but doesn't cool</Link>. In many cases, the culprit is a failed capacitor — a $15 part that takes 20 minutes to replace but can leave your home sweltering if you don't know what to look for.</p>
            <p>Other common issues include <Link to="/air-conditioning-repair-service/ac-refrigerant-recharge" className="text-secondary font-semibold hover:underline">low refrigerant from slow leaks</Link>, frozen evaporator coils caused by restricted airflow, and <Link to="/air-conditioning-repair-service/ac-compressor-repair" className="text-secondary font-semibold hover:underline">compressor failures</Link> triggered by electrical surges during monsoon storms.</p>
            <p>We believe in honest diagnostics. If a $200 repair will give your system three to five more years of reliable service, we'll tell you. If the compressor is failing on a 15-year-old unit with R-22 refrigerant, we'll have a straightforward conversation about whether <Link to="/air-conditioning-contractor" className="text-secondary font-semibold hover:underline">AC replacement</Link> makes more financial sense than pouring money into an obsolete system.</p>
            <p>That transparency is why Las Vegas homeowners trust us with their most critical home comfort equipment.</p>
            <p>Air conditioning repair often reveals related maintenance needs. A refrigerant leak can indicate corrosion in the evaporator coil, which points to poor airflow — a problem that regular <Link to="/hvac-contractor/hvac-tune-up" className="text-secondary font-semibold hover:underline">HVAC tune-ups</Link> can prevent.</p>
            <p>Electrical failures may affect your <Link to="/hvac-contractor" className="text-secondary font-semibold hover:underline">thermostat and HVAC controls</Link>. Our technicians evaluate the whole system, not just the symptom, so homeowners in <Link to="/las-vegas" className="text-secondary font-semibold hover:underline">Las Vegas</Link>, <Link to="/henderson" className="text-secondary font-semibold hover:underline">Henderson</Link>, and <Link to="/boulder-city" className="text-secondary font-semibold hover:underline">Boulder City</Link> get solutions that hold up. <Link to="/contact" className="text-secondary font-semibold hover:underline">Schedule your AC diagnostic</Link> or call <a href={`tel:${BUSINESS.phone}`} className="text-secondary font-semibold hover:underline">{BUSINESS.phoneFormatted}</a> for same-day repair.</p>
          </>
        ),
      },
    ],
  },
};

const ServiceCategoryPage = ({ category }: { category: ReturnType<typeof getCategoryBySlug> }) => {
  if (!category) return null;
  const content = CATEGORY_CONTENT[category.slug];

  return (
    <>
      <SEO
        title={`${category.name} in Las Vegas, NV | ${BUSINESS.name}`}
        description={`Professional ${category.name.toLowerCase()} services in Las Vegas, NV. ${BUSINESS.name} — licensed, insured, free estimates. Call ${BUSINESS.phoneFormatted}.`}
        canonical={`/${category.slug}`}
      />
      <PageHero title={`${category.name} in Las Vegas, NV`} subtitle={`Professional ${category.name.toLowerCase()} services — licensed, insured, free estimates.`} bgImage={getServiceImage(category.slug).src} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.name }]} />
      <main className="container-custom section-padding">
        {/* Rich SEO content with proper H2s and contextual interlinks */}
        {content && (
          <article className="max-w-3xl mb-12">
            {content.sections.map((section, i) => (
              <section key={i} className="mb-8">
                <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  {section.body}
                </div>
              </section>
            ))}
          </article>
        )}

        {/* Service grid — listed below the rich content */}
        <h2 className="text-2xl font-bold mb-6">Our {category.name} Services in Las Vegas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {category.services.map(s => {
            const img = getServiceImage(s.slug, category.slug);
            return (
              <Link to={`/${category.slug}/${s.slug}`} key={s.slug} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
                <img src={img.src} alt={img.alt} className="w-full h-40 object-cover" loading="lazy" width="400" height="160" />
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-secondary transition-colors">{s.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{s.description.slice(0, 150)}...</p>
                  <span className="text-secondary text-sm font-semibold">Learn About {s.name} →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <CTABanner />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: category.name, provider: { "@type": "LocalBusiness", name: BUSINESS.name }, areaServed: ["Las Vegas", "Henderson", "Boulder City"], serviceType: category.name }} />
    </>
  );
};

const ServiceDetailPage = ({ service, parentName, siblings }: { service: ReturnType<typeof getServiceBySlug>; parentName: string; siblings: ServiceItem[] }) => {
  if (!service) return null;
  const img = getServiceImage(service.slug, service.parentSlug);
  return (
    <>
      <SEO
        title={`${service.name} in Las Vegas, NV | ${BUSINESS.name}`}
        description={`Need ${service.name.toLowerCase()} in Las Vegas? ${BUSINESS.name} provides fast, reliable service — licensed & insured. Free estimates. Call ${BUSINESS.phoneFormatted}.`}
        canonical={`/${service.parentSlug}/${service.slug}`}
      />
      <PageHero title={`${service.name} in Las Vegas, NV`} subtitle={`Fast, reliable ${service.name.toLowerCase()} by licensed technicians.`} bgImage={img.src} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: parentName, href: `/${service.parentSlug}` }, { label: service.name }]} />
      <main className="container-custom section-padding">
        <article>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <img src={img.src} alt={img.alt} className="rounded-lg w-full h-64 object-cover mb-6" loading="eager" width="800" height="400" />
              {/* Split long description into shorter paragraphs for readability */}
              {splitIntoParagraphs(service.description).map((para, i) => (
                <p key={i} className="text-muted-foreground mb-4 leading-relaxed">{para}</p>
              ))}

              {/* Contextual internal links — woven naturally into prose */}
              <ContextualLinks service={service} siblings={siblings} />

              <h2 className="text-2xl font-bold mb-4">Benefits of Professional {service.name}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                {service.benefits.map((b, i) => <li key={i} className="flex items-center gap-2 text-sm"><span className="text-secondary font-bold">✓</span> {b}</li>)}
              </ul>
              <h2 className="text-2xl font-bold mb-4">Our {service.name} Process</h2>
              <ol className="space-y-3 mb-8">
                {service.process.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="bg-secondary text-secondary-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                    <span className="text-muted-foreground text-sm">{step}</span>
                  </li>
                ))}
              </ol>
              <h2 className="text-2xl font-bold mb-4">{service.name} FAQs</h2>
              {service.faqs.map((faq, i) => (
                <div key={i} className="border-b border-border py-4">
                  <h3 className="font-bold mb-1 text-sm">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
            <aside className="lg:col-span-1">
              <div className="bg-brand-navy text-primary-foreground rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Need {service.name}?</h3>
                <p className="text-sm opacity-80 mb-4">Call Right On Plumbing, Heating and Air for fast, reliable service in Las Vegas, NV.</p>
                <a href={`tel:${BUSINESS.phone}`} className="cta-gradient text-secondary-foreground w-full py-3 rounded-md font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <Phone className="h-5 w-5" /> {BUSINESS.phoneFormatted}
                </a>
                <Link to="/contact" className="block text-center mt-3 text-sm underline opacity-80 hover:opacity-100">Request a Free {service.name} Estimate</Link>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <CTABanner />
      <JsonLd data={{ ...localBusinessSchema }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: service.name, description: service.description, provider: { "@type": "LocalBusiness", name: BUSINESS.name }, areaServed: ["Las Vegas", "Henderson", "Boulder City"], serviceType: service.name }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: service.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
    </>
  );
};

const ServicePage = () => {
  const { categorySlug, serviceSlug } = useParams();
  if (!categorySlug) return null;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;

  if (serviceSlug) {
    const service = getServiceBySlug(categorySlug, serviceSlug);
    if (!service) return null;
    return <><Header /><ServiceDetailPage service={service} parentName={category.name} siblings={category.services} /><GoogleMapEmbed /><Footer /></>;
  }

  return <><Header /><ServiceCategoryPage category={category} /><GoogleMapEmbed /><Footer /></>;
};

export default ServicePage;
