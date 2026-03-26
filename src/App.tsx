import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App = () => (
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
          
          {/* Service category and detail pages */}
          <Route path="/:categorySlug" element={<ServiceOrLocationRouter />} />
          <Route path="/:categorySlug/:serviceSlug" element={<ServicePage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Router component that determines if a slug is a service category or location
import { useParams } from "react-router-dom";
import { getCategoryBySlug, getLocationBySlug } from "./data/business";

const ServiceOrLocationRouter = () => {
  const { categorySlug } = useParams();
  if (!categorySlug) return <NotFound />;
  
  // Check if it's a location page
  const location = getLocationBySlug(categorySlug);
  if (location) return <LocationPage />;
  
  // Check if it's a service category
  const category = getCategoryBySlug(categorySlug);
  if (category) return <ServicePage />;
  
  // Neither — show 404
  return <NotFound />;
};

export default App;