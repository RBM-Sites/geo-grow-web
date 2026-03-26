import { useState } from "react";
import { Header, Footer, Breadcrumbs, CTABanner, JsonLd, localBusinessSchema, PageHero } from "@/components/Layout";
import SEO from "@/components/SEO";
import { BUSINESS } from "@/data/business";
import { X } from "lucide-react";

const images = [
  { src: "/media/right-on-plumbing-heating-and-air-project-01-las-vegas-nv.jpg", alt: "Residential water heater installation by Right On Plumbing in Las Vegas, NV" },
  { src: "/media/right-on-plumbing-heating-and-air-project-02-las-vegas-nv.jpg", alt: "Emergency drain cleaning service at a Las Vegas home" },
  { src: "/media/right-on-plumbing-heating-and-air-project-03-las-vegas-nv.jpg", alt: "New AC unit installed for a Henderson, NV homeowner" },
  { src: "/media/right-on-plumbing-heating-and-air-project-04-las-vegas-nv.jpg", alt: "Whole-home HVAC system replacement in the Las Vegas Valley" },
  { src: "/media/right-on-plumbing-heating-and-air-project-05-las-vegas-nv.jpg", alt: "Sewer camera inspection revealing root intrusion in Las Vegas" },
  { src: "/media/right-on-plumbing-heating-and-air-project-06-las-vegas-nv.jpg", alt: "Tankless water heater upgrade for a Boulder City, NV residence" },
  { src: "/media/right-on-plumbing-heating-and-air-project-07-las-vegas-nv.jpg", alt: "Furnace repair completed during winter in Las Vegas, NV" },
  { src: "/media/right-on-plumbing-heating-and-air-project-08-las-vegas-nv.jpg", alt: "Air duct cleaning improving indoor air quality in a Las Vegas home" },
  { src: "/media/right-on-plumbing-heating-and-air-project-09-las-vegas-nv.jpg", alt: "Trenchless sewer line repair minimizing yard disruption in Henderson" },
  { src: "/media/right-on-plumbing-heating-and-air-project-10-las-vegas-nv.jpg", alt: "Commercial plumbing installation for a Las Vegas business" },
  { src: "/media/right-on-plumbing-heating-and-air-project-11-las-vegas-nv.jpg", alt: "Bathroom plumbing remodel including new fixtures in Las Vegas" },
  { src: "/media/right-on-plumbing-heating-and-air-project-12-las-vegas-nv.jpg", alt: "Completed HVAC maintenance by the Right On Plumbing team in Las Vegas" },
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
      <JsonLd data={localBusinessSchema} />
      <Footer />
    </>
  );
};

export default GalleryPage;
