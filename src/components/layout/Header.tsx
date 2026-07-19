import { Link, NavLink, useLocation } from "react-router-dom";
import { Phone, Menu, Mail } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Container from "../ui/Container";
import { nav, site } from "../../data/site";
import MobileMenu from "../ui/MobileMenu";
import ServicesDropdown from "../ui/ServicesDropdown";
import RecyclingDropdown from "../ui/RecyclingDropdown";
import logo3 from "../../assets/logo3.png";

type MenuItem = {
  label: string;
  slug: string;
};

type NavItem = {
  label: string;
  to?: string;
  slug?: string;
  children?: NavItem[];
};

const GREEN = "#1B6B1B";
const GREEN_DARK = "#165B16";
const ORANGE = "#F9A826";

const hasSlug = (item: NavItem): item is MenuItem => {
  return typeof item.slug === "string" && item.slug.trim().length > 0;
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const typedNav = nav as unknown as NavItem[];

  useEffect(() => setOpen(false), [location.pathname]);

  const servicesNode = useMemo(
    () => typedNav.find((n) => n.label === "Services"),
    [typedNav]
  );

  const services = useMemo<MenuItem[]>(() => {
    const children = servicesNode?.children ?? [];

    return children.filter(hasSlug).filter((item) => {
      const label = item.label.toLowerCase();
      const slug = item.slug.toLowerCase();

      return (
        label !== "recycling" &&
        slug !== "recycling" &&
        !slug.startsWith("recycling/")
      );
    });
  }, [servicesNode]);

  const recycling = useMemo<MenuItem[]>(() => {
    const topLevelRecycling = typedNav.find((n) => n.label === "Recycling");

    if (topLevelRecycling?.children?.length) {
      return topLevelRecycling.children.filter(hasSlug);
    }

    const recyclingInsideServices = servicesNode?.children?.find((item) => {
      const label = item.label?.toLowerCase?.() ?? "";
      const slug = item.slug?.toLowerCase?.() ?? "";

      return (
        label === "recycling" ||
        slug === "recycling" ||
        slug.startsWith("recycling/")
      );
    });

    return (recyclingInsideServices?.children ?? []).filter(hasSlug);
  }, [servicesNode, typedNav]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "relative inline-flex items-center",
      "text-[13px] xl:text-sm font-semibold tracking-tight",
      "text-[#1B6B1B] transition-colors duration-200 hover:text-[#F9A826]",
      "pb-2",
      "nav-underline",
      isActive ? "is-active" : "",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
      <style>{`
        .nav-underline::after{
          content:"";
          position:absolute;
          left:0;
          right:0;
          bottom:0;
          height:2px;
          border-radius:999px;
          transform: translateY(6px) scaleX(0.35);
          transform-origin:left;
          opacity:0;
          transition: transform 220ms ease, opacity 220ms ease, background-color 220ms ease;
          background: transparent;
        }

        .nav-underline:hover::after{
          opacity:1;
          transform: translateY(0px) scaleX(1);
          background: #F9A826;
        }

        .nav-underline.is-active::after{
          opacity:1;
          transform: translateY(0px) scaleX(1);
          background: #1B6B1B;
        }

        @keyframes ringWave {
          0% { transform: scale(1); opacity: .35; }
          60% { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }

        .ring-wave{
          position:absolute;
          inset:-8px;
          border-radius:9999px;
          border: 2px solid rgba(255,255,255,.35);
          animation: ringWave 1.8s ease-out infinite;
        }

        .ring-wave.delay{
          animation-delay: .55s;
          inset:-14px;
          border-color: rgba(255,255,255,.22);
        }
      `}</style>

      {/* Desktop header */}
      <div className="hidden xl:block">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(360px,520px)]">
          <div className="min-w-0">
            <Container className="flex items-center justify-between gap-6 py-4">
              <Link to="/" className="shrink-0">
                <div className="h-14 w-44 2xl:h-16 2xl:w-52 bg-slate-100 rounded-md overflow-hidden flex items-center justify-center">
                  <img
                    src={logo3}
                    alt={site.name}
                    className="h-full w-full object-contain p-0.5"
                  />
                </div>
              </Link>

              <nav className="flex min-w-0 items-center justify-end gap-5 2xl:gap-8">
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>

                <NavLink to="/about" className={navLinkClass}>
                  About Us
                </NavLink>

                <ServicesDropdown items={services} />

                <RecyclingDropdown />

                <NavLink to="/contact" className={navLinkClass}>
                  Contact Us
                </NavLink>
              </nav>
            </Container>
          </div>

          {/* CTA block, now with a quiet lattice texture instead of a flat fill */}
          <div className="relative flex items-center min-w-0 overflow-hidden" style={{ backgroundColor: GREEN }}>
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <pattern id="headerCtaGrid" width="26" height="26" patternUnits="userSpaceOnUse">
                  <path d="M 26 0 L 0 0 0 26" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#headerCtaGrid)" />
            </svg>

            <div className="relative w-full px-5 2xl:px-8 flex items-center justify-between gap-4">
              <Link
                to="/request-pickup"
                className="group inline-flex items-center justify-center gap-3 bg-white text-[#F9A826] font-semibold rounded-md px-4 2xl:px-6 py-3 shadow-sm whitespace-nowrap transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md hover:text-[#165B16]"
              >
                <Mail
                  size={18}
                  className="text-[#F9A826] transition-colors duration-200 group-hover:text-[#165B16]"
                />
                Request Pickup
              </Link>

              <a
                href={`tel:${site.phoneDigits}`}
                className="flex items-center gap-3 text-white font-semibold whitespace-nowrap"
              >
                <span
                  className="relative h-12 w-12 2xl:h-16 2xl:w-16 shrink-0 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#2E8A2E" }}
                >
                  <span className="ring-wave" />
                  <span className="ring-wave delay" />
                  <Phone size={20} className="relative z-10" />
                </span>

                <span className="text-base 2xl:text-lg">{site.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet header */}
      <div className="hidden md:block xl:hidden">
        <Container className="flex items-center justify-between gap-4 py-3">
          <Link to="/" className="shrink-0">
            <div className="h-14 w-40 bg-slate-100 rounded-md overflow-hidden flex items-center justify-center">
              <img
                src={logo3}
                alt={site.name}
                className="h-full w-full object-contain p-0.5"
              />
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/request-pickup"
              className="hidden sm:inline-flex items-center gap-2 text-white font-semibold rounded-md px-4 py-3 text-sm transition-colors"
              style={{ backgroundColor: GREEN }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GREEN_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GREEN)}
            >
              <Mail size={17} />
              Request Pickup
            </Link>

            <a
              href={`tel:${site.phoneDigits}`}
              className="h-12 w-12 rounded-full flex items-center justify-center text-white relative"
              style={{ backgroundColor: "#2E8A2E" }}
              aria-label="Call"
            >
              <span className="ring-wave" />
              <span className="ring-wave delay" />
              <Phone size={18} className="relative z-10" />
            </a>

            <button
              className="h-12 w-12 rounded-md text-white flex items-center justify-center transition-colors"
              style={{ backgroundColor: GREEN }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GREEN_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GREEN)}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between">
          <Container className="py-3">
            <Link to="/" className="inline-flex">
              <div className="h-12 w-36 xs:w-40 bg-slate-100 rounded-md overflow-hidden flex items-center justify-center">
                <img
                  src={logo3}
                  alt={site.name}
                  className="h-full w-full object-contain p-0.5"
                />
              </div>
            </Link>
          </Container>

          <div className="px-3 py-3 flex items-center gap-2 shrink-0" style={{ backgroundColor: GREEN }}>
            <a
              href={`tel:${site.phoneDigits}`}
              className="relative h-11 w-11 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: "#2E8A2E" }}
              aria-label="Call"
            >
              <span className="ring-wave" />
              <span className="ring-wave delay" />
              <Phone size={17} className="relative z-10" />
            </a>

            <button
              className="h-11 w-11 rounded-md border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        services={services}
        recycling={recycling}
      />
    </header>
  );
}
