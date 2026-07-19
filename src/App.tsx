import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/ui/ScrollToTop";
import BackToTop from "./components/ui/BackToTop";
import PageShell from "./components/layout/PageShell";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import RequestPickup from "./pages/RequestPickup";
import Pricing from "./pages/Pricing";
import Offers from "./pages/Offers";
import Gallery from "./pages/Gallery";
import CaseStudies from "./pages/CaseStudies";
import Careers from "./pages/Careers";
import Shop from "./pages/Shop";
import BlogDetail from "./pages/BlogDetail";
import WhatsAppFloat from "./components/ui/WhatsAppFloat";
import RecyclingDetail from "./pages/RecyclingDetail";

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <PageShell>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/request-pickup" element={<RequestPickup />} />

            <Route path="/pricing" element={<Pricing />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/services/recycling/:slug" element={<RecyclingDetail />} />
          </Routes>
        </AnimatePresence>
      </PageShell>
      <WhatsAppFloat />

      <BackToTop />
    </>
  );
}