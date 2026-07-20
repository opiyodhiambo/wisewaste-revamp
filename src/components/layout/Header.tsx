import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Container from "../ui/Container";
import { nav, site } from "../../data/site";
import MobileMenu from "../ui/MobileMenu";
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
const GOLD = "#B38C00";
const ORANGE = "#F9A826";

const SLOGAN = "Swift. Clean. Green.";

const hasSlug = (item: NavItem): item is MenuItem => {
  return typeof item.slug === "string" && item.slug.trim().length > 0;
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const typedNav = nav as unknown as NavItem[];

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    ["nav-underline text-[13px] xl:text-sm", isActive ? "is-active" : ""].join(" ");

  return (
    <header
      className={[
        "sticky top-0 z-50 bg-white transition-shadow duration-300",
        scrolled ? "shadow-[0_4px_20px_rgba(11,61,46,0.08)]" : "",
      ].join(" ")}
    >
      <style>{`
        .nav-underline{
          position: relative;
          display: inline-flex;
          align-items: center;
          color: #1B6B1B;
          font-weight: 600;
          padding: 0.5rem 0.35rem;
          transition: color .2s ease;
        }
        .nav-underline::after{
          content: '';
          position: absolute;
          left: 0.35rem;
          right: 0.35rem;
          bottom: 2px;
          height: 2px;
          background: #F9A826;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .2s ease;
        }
        .nav-underline:hover{ color: #1B6B1B; }
        .nav-underline:hover::after{ transform: scaleX(1); }
        .nav-underline.is-active{ color: #0B3D2E; }
        .nav-underline.is-active::after{ transform: scaleX(1); background: #1B6B1B; }

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
        <Container className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 py-4">
          <Link to="/" className="shrink-0 flex flex-col gap-1.5 justify-self-start">
            <div
              className={[
                "bg-slate-100 rounded-md overflow-hidden flex items-center justify-center transition-all duration-300",
                scrolled ? "h-12 w-40 2xl:h-14 2xl:w-48" : "h-14 w-44 2xl:h-16 2xl:w-52",
              ].join(" ")}
            >
              <img
                src={logo3}
                alt={site.name}
                className="h-full w-full object-contain p-0.5"
              />
            </div>

            <span
              className="text-[10px] 2xl:text-[11px] font-bold tracking-[0.16em] uppercase pl-0.5"
              style={{ color: GOLD }}
            >
              {SLOGAN}
            </span>
          </Link>

          <nav className="flex items-center gap-1 2xl:gap-2 justify-self-center">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>
            <NavLink to="/our-team" className={navLinkClass}>
              Our Team
            </NavLink>

            <NavLink to="/services/garbage-collection" className={navLinkClass}>
              Services
            </NavLink>

            <RecyclingDropdown />

            <NavLink to="/community-engagement" className={navLinkClass}>
              Community Engagement
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
            </NavLink>
          </nav>

          {/* empty spacer, keeps the nav visually centered regardless of logo width */}
          <div aria-hidden="true" />
        </Container>
      </div>

      {/* Tablet header */}
      <div className="hidden md:block xl:hidden">
        <Container className="flex items-center justify-between gap-4 py-3">
          <Link to="/" className="shrink-0 flex flex-col gap-1">
            <div className="h-14 w-40 bg-slate-100 rounded-md overflow-hidden flex items-center justify-center">
              <img
                src={logo3}
                alt={site.name}
                className="h-full w-full object-contain p-0.5"
              />
            </div>
            <span
              className="text-[9px] font-bold tracking-[0.14em] uppercase pl-0.5"
              style={{ color: GOLD }}
            >
              {SLOGAN}
            </span>
          </Link>

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
        </Container>
      </div>

      {/* Mobile header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between">
          <Container className="py-3">
            <Link to="/" className="inline-flex flex-col gap-1">
              <div className="h-12 w-36 xs:w-40 bg-slate-100 rounded-md overflow-hidden flex items-center justify-center">
                <img
                  src={logo3}
                  alt={site.name}
                  className="h-full w-full object-contain p-0.5"
                />
              </div>
              <span
                className="text-[8.5px] font-bold tracking-[0.12em] uppercase pl-0.5"
                style={{ color: GOLD }}
              >
                {SLOGAN}
              </span>
            </Link>
          </Container>

          <div className="px-3 py-3 flex items-center shrink-0">
            <button
              className="h-11 w-11 rounded-md flex items-center justify-center transition-colors"
              style={{ backgroundColor: GREEN, color: "white" }}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* gradient edge instead of a flat gray border */}
      <div
        className="h-[2px] w-full"
        style={{ background: `linear-gradient(90deg, ${GOLD}, ${ORANGE}, ${GREEN})` }}
      />

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        services={services}
        recycling={recycling}
      />
    </header>
  );
}
