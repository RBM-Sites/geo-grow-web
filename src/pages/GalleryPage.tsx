import { useState } from "react";
import { Header, Footer, Breadcrumbs, CTABanner, JsonLd, localBusinessSchema, PageHero, GoogleMapEmbed } from "@/components/Layout";
import SEO from "@/components/SEO";
import { BUSINESS } from "@/data/business";
import { X } from "lucide-react";

const images = [
  { src: "/media/right-on-plumbing-heating-and-air-project-01-las-vegas-nv.jpg", alt: "Thermogun used to find water" },
  { src: "/media/right-on-plumbing-heating-and-air-project-02-las-vegas-nv.jpg", alt: "Free standing tub installation" },
  { src: "/media/right-on-plumbing-heating-and-air-project-03-las-vegas-nv.jpg", alt: "Sewer Repair" },
  { src: "/media/right-on-plumbing-heating-and-air-project-04-las-vegas-nv.jpg", alt: "Shower Valve, Shower head and Rain Head Installation" },
  { src: "/media/right-on-plumbing-heating-and-air-project-05-las-vegas-nv.jpg", alt: "2 tankless water heater installation" },
  { src: "/media/right-on-plumbing-heating-and-air-project-06-las-vegas-nv.jpg", alt: "Rooftop packaged unit installation" },
  { src: "/media/right-on-plumbing-heating-and-air-project-07-las-vegas-nv.jpg", alt: "Single tankless water heater installation" },
  { src: "/media/right-on-plumbing-heating-and-air-project-08-las-vegas-nv.jpg", alt: "Whole House Water Filtration System Install" },
  { src: "/media/right-on-plumbing-heating-and-air-project-09-las-vegas-nv.jpg", alt: "Tankless Water Heater" },
  { src: "/media/right-on-plumbing-heating-and-air-project-10-las-vegas-nv.jpg", alt: "Traditional Water Heater and Whole Home Filtration" },
  { src: "/media/right-on-plumbing-heating-and-air-project-11-las-vegas-nv.jpg", alt: "New shower valves installation" },
  { src: "/media/right-on-plumbing-heating-and-air-project-12-las-vegas-nv.jpg", alt: "Rooftop Packaged Unit installation" },
];

const GalleryPage = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <SEO
        title={`Project Gallery | ${BUSINESS.name} | ${BUSINESS.industry} Las Vegas, NV`}
        description={`Browse recent plumbing and HVAC projects completed by ${BUSINESS.name} across Las Vegas, Henderson, and Boulder City, NV.`}
        canonical="/gallery"
      />
      <Header />
      <PageHero title="Our Work — Recent Projects in Las Vegas" subtitle="Browse recent plumbing and HVAC projects across Las Vegas, Henderson, and Boulder City." bgImage="/media/hero-gallery-projects-las-vegas.jpg" />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Project Gallery" }]} />
      <main className="container-custom section-padding">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="relative overflow-hidden rounded-lg group focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                width="400"
                height="300"
              />
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/30 transition-colors flex items-center justify-center">
                <span className="text-primary-foreground font-bold opacity-0 group-hover:opacity-100 transition-opacity">View</span>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-brand-dark/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-primary-foreground hover:text-secondary transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); setLightbox(prev => (prev! > 0 ? prev! - 1 : images.length - 1)); }}
            className="absolute left-4 text-primary-foreground hover:text-secondary text-4xl font-bold"
            aria-label="Previous image"
          >
            ‹
          </button>
          <img
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={e => { e.stopPropagation(); setLightbox(prev => (prev! < images.length - 1 ? prev! + 1 : 0)); }}
            className="absolute right-4 text-primary-foreground hover:text-secondary text-4xl font-bold"
            aria-label="Next image"
          >
            ›
          </button>
          <p className="absolute bottom-4 text-primary-foreground/70 text-sm">{lightbox + 1} / {images.length} — {images[lightbox].alt}</p>
        </div>
      )}

      <CTABanner />
      <GoogleMapEmbed />
      <JsonLd data={localBusinessSchema} />
      <Footer />
    </>
  );
};

export default GalleryPage;
