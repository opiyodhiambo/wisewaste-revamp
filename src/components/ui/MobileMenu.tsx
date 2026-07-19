import { Link, useLocation } from "react-router-dom";
import { X, ChevronDown, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Button from "./Button";
import { site } from "../../data/site";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const DARK_GREEN = "#0B2E22";

type MenuItem = {
  label: string;
  slug: string;
};

const DEFAULT_RECYCLING: MenuItem[] = [
  { label: "Plastic Recycling", slug: "plastic-recycling" },
  { label: "Metal Recycling", slug: "metal-recycling" },
  { label: "E-Waste Recycling", slug: "ewaste-recycling" },
  { label: "Compost Manure", slug: "compost-manure" },
];

export default function MobileMenu({
  open,
  onClose,
  services,
  recycling = [],
}: {
  open: boolean;
  onClose: () => void;
  services: MenuItem[];
  recycling?: MenuItem[];
}) {
  const location = useLocation();

  const [servicesOpen, setServicesOpen] = useState(false);
  const [recyclingOpen, setRecyclingOpen] = useState(false);

  const recyclingItems = useMemo(() => {
    return recycling.length > 0 ? recycling : DEFAULT_RECYCLING;
  }, [recycling]);

  const cleanServices = useMemo(() => {
    return services.filter((item) => {
      const label = item.label?.toLowerCase?.() ?? "";
      const slug = item.slug?.toLowerCase?.() ?? "";
      return label !== "recycling" && slug !== "recycling";
    });
  }, [services]);

  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (open) {
      setServicesOpen(false);
      setRecyclingOpen(false);
    }
  }, [open]);

  const getServicePath = (slug: string) => {
    if (slug.startsWith("/")) return slug;
    if (slug.startsWith("services/")) return `/${slug}`;
    return `/services/${slug}`;
  };

  const getRecyclingPath = (slug: string) => {
    if (slug.startsWith("/")) return slug;
    if (slug.startsWith("services/")) return `/${slug}`;
    if (slug.startsWith("recycling/")) return `/services/${slug}`;
    return `/services/recycling/${slug}`;
  };

  const toggleServices = () => {
    setServicesOpen((current) => !current);
    setRecyclingOpen(false);
  };

  const toggleRecycling = () => {
    setRecyclingOpen((current) => !current);
    setServicesOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed right-0 top-0 bottom-0 z-50 w-[88%] max-w-sm bg-white border-l border-slate-100 overflow-y-auto"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            <div className="px-4 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="leading-tight">
                <div className="font-semibold" style={{ color: GREEN }}>
                  Menu
                </div>
                <div className="text-xs text-slate-500">
                  Wise Waste Navigation
                </div>
              </div>

              <button
                onClick={onClose}
                className="h-10 w-10 inline-flex items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:text-[#F9A826] hover:border-[#F9A826] transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${site.phoneDigits}`}
                  className="rounded-xl border border-slate-100 bg-white shadow-soft px-3 py-3 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:border-[#F9A826] hover:text-[#F9A826]"
                  style={{ color: GREEN }}
                >
                  <span
                    className="h-9 w-9 rounded-full text-white flex items-center justify-center"
                    style={{ backgroundColor: GREEN }}
                  >
                    <Phone size={16} />
                  </span>
                  Call
                </a>

                <a
                  href={`mailto:${site.email}`}
                  className="rounded-xl border border-slate-100 bg-white shadow-soft px-3 py-3 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:border-[#F9A826] hover:text-[#F9A826]"
                  style={{ color: GREEN }}
                >
                  <span
                    className="h-9 w-9 rounded-full text-white flex items-center justify-center"
                    style={{ backgroundColor: GREEN }}
                  >
                    <Mail size={16} />
                  </span>
                  Email
                </a>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white shadow-soft overflow-hidden">
                <Link
                  to="/"
                  onClick={onClose}
                  className="block px-4 py-3 text-sm font-semibold transition-colors hover:bg-slate-50 hover:text-[#F9A826]"
                  style={{ color: GREEN }}
                >
                  Home
                </Link>

                <div className="border-t border-slate-100" />

                <Link
                  to="/about"
                  onClick={onClose}
                  className="block px-4 py-3 text-sm font-semibold transition-colors hover:bg-slate-50 hover:text-[#F9A826]"
                  style={{ color: GREEN }}
                >
                  About Us
                </Link>

                <div className="border-t border-slate-100" />

                {/* Services */}
                <button
                  type="button"
                  className="w-full px-4 py-3 text-sm font-semibold flex items-center justify-between transition-colors hover:bg-slate-50 hover:text-[#F9A826]"
                  style={{ color: GREEN }}
                  onClick={toggleServices}
                  aria-expanded={servicesOpen}
                >
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: ORANGE }}
                    />
                    Services
                  </span>

                  <ChevronDown
                    size={18}
                    className={[
                      "transition-transform duration-200",
                      servicesOpen ? "rotate-180" : "rotate-0",
                    ].join(" ")}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {servicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div style={{ backgroundColor: DARK_GREEN }}>
                        {cleanServices.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-white/60">
                            No services found.
                          </div>
                        ) : (
                          cleanServices.map((service, index) => (
                            <div key={service.slug}>
                              <Link
                                to={getServicePath(service.slug)}
                                onClick={onClose}
                                className="block px-4 py-3 text-sm text-white/90 transition-colors hover:bg-white/5 hover:text-[#F9A826]"
                              >
                                {service.label}
                              </Link>

                              {index !== cleanServices.length - 1 && (
                                <div className="mx-4 border-t border-white/15" />
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="border-t border-slate-100" />

                {/* Recycling */}
                <button
                  type="button"
                  className="w-full px-4 py-3 text-sm font-semibold flex items-center justify-between transition-colors hover:bg-slate-50 hover:text-[#F9A826]"
                  style={{ color: GREEN }}
                  onClick={toggleRecycling}
                  aria-expanded={recyclingOpen}
                >
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: ORANGE }}
                    />
                    Recycling
                  </span>

                  <ChevronDown
                    size={18}
                    className={[
                      "transition-transform duration-200",
                      recyclingOpen ? "rotate-180" : "rotate-0",
                    ].join(" ")}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {recyclingOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div style={{ backgroundColor: DARK_GREEN }}>
                        {recyclingItems.map((item, index) => (
                          <div key={item.slug}>
                            <Link
                              to={getRecyclingPath(item.slug)}
                              onClick={onClose}
                              className="block px-4 py-3 text-sm text-white/90 transition-colors hover:bg-white/5 hover:text-[#F9A826]"
                            >
                              {item.label}
                            </Link>

                            {index !== recyclingItems.length - 1 && (
                              <div className="mx-4 border-t border-white/15" />
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="border-t border-slate-100" />

                <Link
                  to="/contact"
                  onClick={onClose}
                  className="block px-4 py-3 text-sm font-semibold transition-colors hover:bg-slate-50 hover:text-[#F9A826]"
                  style={{ color: GREEN }}
                >
                  Contact Us
                </Link>
              </div>

              <Link to="/request-pickup" onClick={onClose}>
                <Button
                  className="w-full rounded-xl border font-semibold"
                  style={{
                    borderColor: GREEN,
                    color: GREEN,
                    backgroundColor: "white",
                  }}
                >
                  Request Pickup
                </Button>
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}