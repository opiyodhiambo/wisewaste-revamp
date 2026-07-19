import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Container from "../ui/Container";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Home,
  Layers,
  Cpu,
  Recycle,
  Factory,
  Zap,
  Leaf,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

const BG = "#0B2E22";
const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Card = {
  tag: string;
  title: string;
  desc: string;
  bullets: string[];
  href: string;
  Icon: any;
};

const cards: Card[] = [
  {
    tag: "For Home, For Business",
    title: "Garbage Collection",
    desc: "Scheduled, reliable pickup for homes and businesses, the first link in the recovery chain.",
    bullets: ["Scheduled pickups", "Bulk waste handling", "Reliable coverage"],
    href: "/services",
    Icon: Home,
  },
  {
    tag: "For Home, For Organizations, For Business",
    title: "Garbage Sorting & Segregation",
    desc: "Separating waste at source so recoverable material stays clean and usable downstream.",
    bullets: ["Source separation", "On-site sorting support", "Cleaner recyclable streams"],
    href: "/services",
    Icon: Layers,
  },
  {
    tag: "For Business, For Organizations",
    title: "E-waste Recycling",
    desc: "Safe dismantling of electronics to recover materials and components, hazardous parts handled to standard.",
    bullets: ["Safe dismantling", "Component & metal recovery", "Compliant disposal"],
    href: "/services",
    Icon: Cpu,
  },
  {
    tag: "For Home, For Organizations, For Business",
    title: "Plastic Recycling",
    desc: "Recovered plastic, sorted and reprocessed into raw material for re-entry into manufacturing.",
    bullets: ["Plastic waste recovery", "Sorted by polymer type", "Reduced landfill footprint"],
    href: "/services",
    Icon: Recycle,
  },
  {
    tag: "For Business, For Organizations",
    title: "Metal Recycling",
    desc: "Ferrous and non-ferrous metal recovery, graded and prepared for industrial reuse.",
    bullets: ["Scrap metal recovery", "Ferrous & non-ferrous sorting", "Supply to industrial buyers"],
    href: "/services",
    Icon: Factory,
  },
  {
    tag: "For Organizations, For Business",
    title: "Green Energy Generation",
    desc: "Appropriate waste streams converted into usable, renewable energy output.",
    bullets: ["Waste-to-energy processing", "Renewable output", "Reduced fossil fuel reliance"],
    href: "/services",
    Icon: Zap,
  },
  {
    tag: "For Home, For Organizations, For Business",
    title: "Green Manure",
    desc: "Organic waste processed into nutrient-rich manure instead of generating landfill methane.",
    bullets: ["Organic waste separation", "Composting into manure", "Reduced methane emissions"],
    href: "/services",
    Icon: Leaf,
  },
  {
    tag: "For Business, For Organizations",
    title: "Trading & Exporting",
    desc: "Recovered industrial materials and precious minerals, traded and exported to real market demand.",
    bullets: ["Industrial materials", "Precious minerals", "Export-ready logistics"],
    href: "/services",
    Icon: Globe,
  },
];

/** Faint hex/grid texture, same motif family used across the rest of the site */
function ShowcaseBackdrop() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="showcaseGrid" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1440" height="800" fill="url(#showcaseGrid)" />

      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "120px 120px" }}
      >
        <polygon
          points="120,70 168,97 168,150 120,177 72,150 72,97"
          fill="none"
          stroke="rgba(249,168,38,0.15)"
          strokeWidth="2"
        />
      </motion.g>

      <motion.circle
        cx="1300"
        cy="700"
        r="160"
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="1"
        animate={{ r: [160, 175, 160] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function ServicesShowcaseSlider() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const total = cards.length;

  const goTo = (idx: number) => {
    setDir(idx > i ? 1 : -1);
    setI(((idx % total) + total) % total);
  };

  const next = () => goTo(i + 1);
  const prev = () => goTo(i - 1);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setDir(1);
      setI((v) => (v + 1) % total);
    }, 6500);
    return () => clearInterval(t);
  }, [paused, total]);

  const active = cards[i];
  const ActiveIcon = active.Icon;

  const cardVariants: Variants = {
    enter: (d: 1 | -1) => ({ x: d === 1 ? 40 : -40, opacity: 0, rotate: d === 1 ? 3 : -3, scale: 0.97 }),
    center: {
      x: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.45, ease: EASE_OUT },
    },
    exit: (d: 1 | -1) => ({
      x: d === 1 ? -40 : 40,
      opacity: 0,
      rotate: d === 1 ? -3 : 3,
      scale: 0.97,
      transition: { duration: 0.3, ease: EASE_OUT },
    }),
  };

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: BG }}>
      <ShowcaseBackdrop />

      <Container className="relative py-12 md:py-16">
        {/* Header row */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          <div>
            <div className="text-[11px] font-bold" style={{ color: ORANGE }}>
              Full-Cycle Waste Recovery
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Eight Ways We Turn Waste <br className="hidden sm:block" />
              Into Recovered Value
            </h2>
          </div>

          <div className="text-white/85 text-sm leading-relaxed">
            <p>
              From the first pickup to the final export, our operations cover collection, sorting,
              e-waste, plastic and metal recycling, green energy generation, green manure, and the
              trading of recovered materials. Each service feeds the next, one connected recovery
              chain rather than isolated jobs.
            </p>
            <p className="mt-4 text-white/75">
              Flip through the services below, or jump straight to the one you need.
            </p>
          </div>
        </div>

        {/* Stack + index */}
        <div
          className="mt-10 grid lg:grid-cols-[1fr_260px] gap-8 items-start"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* CARD STACK */}
          <div className="relative h-[420px] sm:h-[400px]">
            {/* Ghost cards behind, purely decorative depth */}
            <div
              className="absolute inset-0 rounded-2xl border border-white/10"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                transform: "translateY(18px) scale(0.95) rotate(-2deg)",
                zIndex: 1,
              }}
            />
            <div
              className="absolute inset-0 rounded-2xl border border-white/10"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                transform: "translateY(9px) scale(0.975) rotate(1.5deg)",
                zIndex: 2,
              }}
            />

            {/* Front, interactive card */}
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={i}
                custom={dir}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 z-10 rounded-2xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.4)] border border-black/5 p-7 sm:p-9 flex flex-col"
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(27,107,27,0.12)" }}
                  >
                    <ActiveIcon size={24} style={{ color: GREEN }} />
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-semibold px-3 py-1 rounded-sm bg-slate-100 text-slate-500">
                      {active.tag}
                    </div>
                    <div className="mt-2 text-[11px] font-bold text-slate-400 tabular-nums">
                      {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </div>
                  </div>
                </div>

                <h3 className="mt-5 text-xl sm:text-2xl font-extrabold text-[#0B3D2E]">
                  {active.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{active.desc}</p>

                <ul className="mt-4 space-y-2">
                  {active.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                      <span
                        className="mt-[2px] h-4 w-4 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "rgba(27,107,27,0.15)" }}
                      >
                        <Check size={12} style={{ color: GREEN }} strokeWidth={3} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5 flex items-center justify-between">
                  <Link
                    to={active.href}
                    className="inline-flex items-center gap-2 text-sm font-bold transition-colors"
                    style={{ color: ORANGE }}
                  >
                    Explore More <ArrowUpRight size={18} />
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="Previous service"
                      className="h-9 w-9 rounded-full border border-slate-200 grid place-items-center hover:bg-slate-50 transition"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next service"
                      className="h-9 w-9 rounded-full border border-slate-200 grid place-items-center hover:bg-slate-50 transition"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* INDEX / TAB LIST */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-2">
            {cards.map((c, idx) => {
              const isActive = idx === i;
              return (
                <button
                  key={c.title}
                  onClick={() => goTo(idx)}
                  className="group flex items-start gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors min-w-0"
                  style={{
                    backgroundColor: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                  }}
                >
                  <span
                    className="text-[11px] font-bold tabular-nums w-6 flex-shrink-0 pt-[1px]"
                    style={{ color: isActive ? ORANGE : "rgba(255,255,255,0.4)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-xs font-semibold leading-snug min-w-0 break-words"
                    style={{ color: isActive ? "white" : "rgba(255,255,255,0.6)" }}
                  >
                    {c.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-8 text-xs text-white/70">
          Not sure which service fits your waste stream? Our team can help you scope it out.{" "}
          <Link to="/request-pickup" className="underline underline-offset-4" style={{ color: ORANGE }}>
            Request A Quote
          </Link>
        </div>
      </Container>
    </section>
  );
}
