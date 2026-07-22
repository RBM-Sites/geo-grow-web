import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServicePage from "./pages/ServicePage";
import LocationPage from "./pages/LocationPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ReviewsPage from "./pages/ReviewsPage";
import GalleryPage from "./pages/GalleryPage";
import ThankYouPage from "./pages/ThankYouPage";
import FAQPage from "./pages/FAQPage";
import GeneratedPage from "./pages/GeneratedPage";
import BlogPage from "./pages/BlogPage";
import BlogIndexPage from "./pages/BlogIndexPage";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/faq" element={<FAQPage />} />

          {/* Generated blog content (publisher-committed JSON) */}
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />

          {/* Service category and detail pages */}
          <Route path="/:categorySlug" element={<ServiceOrLocationRouter />} />
          <Route path="/:categorySlug/:serviceSlug" element={<ServiceOrGeneratedRouter />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

// Router component that determines if a slug is a service category or location
import { useParams } from "react-router-dom";
import { getCategoryBySlug, getLocationBySlug, getServiceBySlug } from "./data/business";
import { getPageBySlug } from "./lib/generatedContent";

const ServiceOrLocationRouter = () => {
  const { categorySlug } = useParams();
  if (!categorySlug) return <NotFound />;

  // Check if it's a location page
  const location = getLocationBySlug(categorySlug);
  if (location) return <LocationPage />;

  // Check if it's a service category
  const category = getCategoryBySlug(categorySlug);
  if (category) return <ServicePage />;

  // Check the generated-content manifest (publisher-committed JSON pages)
  if (getPageBySlug(categorySlug)) return <GeneratedPage slug={categorySlug} />;

  // Nothing matched — show 404
  return <NotFound />;
};

// Two-segment routes: known category/service pairs render the foundation
// ServicePage exactly as before; otherwise fall back to generated content,
// then 404.
const ServiceOrGeneratedRouter = () => {
  const { categorySlug, serviceSlug } = useParams();
  if (!categorySlug || !serviceSlug) return <NotFound />;

  // Known foundation service detail page
  if (getCategoryBySlug(categorySlug) && getServiceBySlug(categorySlug, serviceSlug)) {
    return <ServicePage />;
  }

  // Check the generated-content manifest for the two-segment slug
  const joined = `${categorySlug}/${serviceSlug}`;
  if (getPageBySlug(joined)) return <GeneratedPage slug={joined} />;

  return <NotFound />;
};

export default App;