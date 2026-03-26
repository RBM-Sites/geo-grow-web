import { useState } from "react";
import { Header, Footer, Breadcrumbs, CTABanner, JsonLd, localBusinessSchema } from "@/components/Layout";
import { BUSINESS } from "@/data/business";
import { X } from "lucide-react";

const images = Array.from({ length: 12 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    src: `/media/right-on-plumbing-heating-and-air-project-${num}-las-vegas-nv.jpg`,
    alt: `Right On Plumbing, Heating and Air project Las Vegas, NV`,
  };
});

const GalleryPage = () => {
  document.title = `Our Work | ${BUSINESS.name} | ${BUSINESS.industry} Las Vegas, NV`;
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Gallery" }]} />
      <main className="container-custom section-padding">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Work</h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Browse recent plumbing, HVAC, and electrical projects completed by {BUSINESS.name} across Las Vegas, Henderson, and Boulder City.
        </p>

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