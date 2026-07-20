import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import Container from "../components/ui/Container";
import { services } from "../data/services";
import { Link } from "react-router-dom";
import ServicesHero from "../components/services/ServicesHero";
import MapSection from "../components/services/MapSection";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Layers,
  Package,
  Droplet,
  Wind,
  FlaskConical,
  Leaf,
  Recycle,
  AlertTriangle,
  Globe2,
  Home,
  Factory,
  Stethoscope,
  HardHat,
  Wheat,
  Cpu,
  Radiation,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const GOLD = "#B38C00";
const DARK = "#0B3D2E";
const DARK_2 = "#0F4A38";

const EASE_OUT = [0.16, 1, 0.3, 1] as unknown as any;

const pageIn = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.45, ease: EASE_OUT } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_OUT, delay: i * 0.12 },
  }),
};

const gridStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

/** Faint hex lattice for white-background sections, same motif used sitewide */
function LightLattice() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="servicesLattice" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(11,61,46,0.045)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#servicesLattice)" />
    </svg>
  );
}

/** Dark backdrop for the detail panel */
function ShowcaseBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 600 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="showcaseBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={DARK} />
          <stop offset="100%" stopColor={DARK_2} />
        </linearGradient>
        <pattern id="showcaseGrid" width="46" height="46" patternUnits="userSpaceOnUse">
          <path d="M 46 0 L 0 0 0 46" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="600" height="600" fill="url(#showcaseBg)" />
      <rect width="600" height="600" fill="url(#showcaseGrid)" />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "470px 130px" }}
      >
        <polygon
          points="470,80 510,102 510,146 470,168 430,146 430,102"
          fill="none"
          stroke={GOLD}
          strokeOpacity="0.28"
          strokeWidth="2"
        />
      </motion.g>
    </svg>
  );
}

/** One title in the wheel — position, size, and opacity all driven by distance from the active index */
function WheelItem({
  index,
  rawIndex,
  title,
  icon: Icon,
}: {
  index: number;
  rawIndex: MotionValue<number>;
  title: string;
  icon: any;
}) {
  const y = useTransform(rawIndex, (v) => (index - v) * 92);
  const opacity = useTransform(rawIndex, (v) => Math.max(0, 1 - Math.abs(index - v) * 0.7));
  const scale = useTransform(rawIndex, (v) => Math.max(0.85, 1 - Math.abs(index - v) * 0.12));

  return (
    <motion.div
      className="absolute left-0 right-0 flex items-center gap-3"
      style={{ top: "50%", marginTop: -22, y, opacity, scale }}
    >
      <span
        className="h-9 w-9 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: "rgba(27,107,27,0.08)" }}
      >
        {Icon ? <Icon size={18} style={{ color: GREEN }} /> : null}
      </span>
      <span className="text-xl sm:text-2xl font-extrabold truncate" style={{ color: DARK }}>
        {title}
      </span>
    </motion.div>
  );
}

/** The detail panel content, shared shape for whichever service is active */
function DetailPanel({ current }: { current: any }) {
  const CurrentIcon = current?.cardIcon;
  if (!current) return null;

  return (
    <div className="relative rounded-lg overflow-hidden min-h-[440px] h-full">
      <ShowcaseBackdrop />

      {CurrentIcon && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
          <CurrentIcon size={220} className="text-white" />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={current.slug}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="relative z-10 p-8 lg:p-10 flex flex-col h-full"
        >
          <div className="text-[10px] font-semibold px-3 py-1 rounded-sm bg-white/10 text-white/80 self-start">
            {current.categoryBadges?.join(", ")}
          </div>

          <h3 className="mt-6 text-2xl lg:text-3xl font-extrabold text-white leading-tight">
            {current.title}
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-white/80 max-w-md">{current.excerpt}</p>

          <div className="mt-6 space-y-3">
            {current.bullets?.map((b: string) => (
              <div key={b} className="flex items-start gap-2 text-sm text-white/85">
                <span className="mt-[3px] h-4 w-4 rounded-full flex items-center justify-center bg-white/15 shrink-0">
                  <span className="block h-2 w-2 rounded-full bg-white" />
                </span>
                <span>{b}</span>
              </div>
            ))}
          </div>

          <Link
            to={`/services/${current.slug}`}
            className="mt-auto pt-8 inline-flex items-center gap-2 text-sm font-semibold text-white group w-fit"
          >
            <span>Explore More</span>
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: ORANGE }}
            />
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Desktop: pinned section, wheel list on the left, detail panel on the right.
 *  The section is held on screen for items.length screen-heights of scroll;
 *  nothing physically scrolls past the panel, titles fade in/out in place instead. */
function DesktopShowcase({ items }: { items: typeof services }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, Math.max(items.length - 1, 0)]);

  useMotionValueEvent(rawIndex, "change", (v) => {
    const idx = Math.round(v);
    if (idx !== active && idx >= 0 && idx < items.length) setActive(idx);
  });

  if (!items.length) return null;

  return (
    <div
      ref={wrapRef}
      className="hidden lg:block relative"
      style={{ height: `${items.length * 85}vh` }}
    >
      {/* top: 0 so this pins to the viewport itself, not to any padded ancestor */}
      <div className="sticky top-0 h-screen flex items-center">
        <Container className="w-full">
          <div className="grid grid-cols-[1fr_1.15fr] gap-16 items-center">
            <div className="relative h-[440px]">
              {items.map((s, i) => (
                <WheelItem
                  key={(s as any).slug}
                  index={i}
                  rawIndex={rawIndex}
                  title={(s as any).title}
                  icon={(s as any).cardIcon}
                />
              ))}
            </div>

            <DetailPanel current={items[active] as any} />
          </div>
        </Container>
      </div>
    </div>
  );
}

/** Mobile: simple stacked list, each title expands inline when centered in view */
function MobileShowcase({ items }: { items: typeof services }) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [items.length]);

  return (
    <div className="lg:hidden">
      {items.map((s, i) => {
        const item = s as any;
        const isActive = i === active;
        const Icon = item.cardIcon;

        return (
          <div
            key={item.slug}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            data-index={i}
            className="min-h-[56vh] flex flex-col justify-center border-b border-slate-100 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300"
                style={{ backgroundColor: isActive ? GREEN : "rgba(27,107,27,0.08)" }}
              >
                {Icon ? <Icon size={18} style={{ color: isActive ? "#fff" : GREEN }} /> : null}
              </span>
              <span
                className="text-xs font-semibold tracking-wide transition-colors duration-300"
                style={{ color: isActive ? GREEN : "#94a3b8" }}
              >
                0{i + 1}
              </span>
            </div>

            <h3
              className="mt-3 text-xl sm:text-2xl font-extrabold transition-colors duration-300"
              style={{ color: isActive ? DARK : "#cbd5e1" }}
            >
              {item.title}
            </h3>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-sm">{item.excerpt}</p>
                  <div className="mt-3 space-y-2">
                    {item.bullets?.slice(0, 3).map((b: string) => (
                      <div key={b} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: GREEN }} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to={`/services/${item.slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: ORANGE }}
                  >
                    Explore More <ArrowUpRight size={16} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/** Waste classification — expandable category cards instead of paragraphs */
const wasteCategories = [
  {
    title: "By Physical Form",
    icon: Layers,
    items: [
      { label: "Solid Waste", icon: Package, desc: "Household garbage, packaging, plastics, glass, paper, metals, textiles." },
      { label: "Liquid Waste", icon: Droplet, desc: "Wastewater, industrial oils, wash water, sludge, waste detergents." },
      { label: "Gaseous Waste", icon: Wind, desc: "Emissions from industrial processes, vehicles, and fossil fuel combustion." },
    ],
  },
  {
    title: "By Composition",
    icon: FlaskConical,
    items: [
      { label: "Organic Waste", icon: Leaf, desc: "Biodegradable material: food scraps, fruit peels, yard trimmings, manure." },
      { label: "Recyclable Waste", icon: Recycle, desc: "Paper, cardboard, glass, metals, rigid plastics processed into new products." },
      { label: "Hazardous Waste", icon: AlertTriangle, desc: "Toxic, flammable, corrosive, or reactive material requiring specialized handling." },
    ],
  },
  {
    title: "By Origin & Source",
    icon: Globe2,
    items: [
      { label: "Domestic Waste", icon: Home, desc: "Daily household trash: food waste, packaging, non-recyclable items." },
      { label: "Industrial & Commercial", icon: Factory, desc: "Manufacturing and office byproducts, from packaging to chemical residues." },
      { label: "Medical & Bio-Medical", icon: Stethoscope, desc: "Sharps, discarded devices, expired drugs, infectious material." },
      { label: "Construction & Demolition", icon: HardHat, desc: "Concrete, rubble, bricks, drywall, scrap wood from building projects." },
      { label: "Agricultural & Livestock", icon: Wheat, desc: "Crop residues, spoiled feed, animal waste, agricultural plastics." },
      { label: "E-Waste", icon: Cpu, desc: "Discarded electronics: computers, TVs, appliances, batteries." },
      { label: "Radioactive Waste", icon: Radiation, desc: "Byproducts of nuclear power or medical processes needing regulated storage." },
    ],
  },
];

function CategoryCard({ category }: { category: (typeof wasteCategories)[number] }) {
  const [open, setOpen] = useState(false);
  const Icon = category.icon;

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-5"
      >
        <div className="flex items-center gap-3">
          <span
            className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: "rgba(27,107,27,0.08)" }}
          >
            <Icon size={19} style={{ color: GREEN }} />
          </span>
          <span className="text-sm sm:text-base font-extrabold text-left" style={{ color: DARK }}>
            {category.title}
          </span>
        </div>

        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease: EASE_OUT }}>
          <ChevronDown size={18} className="text-slate-400" />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 space-y-4 border-t border-slate-100 pt-4">
          {category.items.map((it) => {
            const ItemIcon = it.icon;
            return (
              <div key={it.label} className="flex items-start gap-3">
                <span
                  className="mt-0.5 h-7 w-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(249,168,38,0.12)" }}
                >
                  <ItemIcon size={14} style={{ color: GOLD }} />
                </span>
                <div>
                  <div className="text-sm font-bold text-slate-800">{it.label}</div>
                  <p className="mt-0.5 text-xs sm:text-[13px] leading-relaxed text-slate-500">{it.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  return (
    <motion.div variants={pageIn} initial="hidden" animate="show" exit="exit">
      {/* Hero — unchanged */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        <ServicesHero />
      </motion.div>

      {/* Scroll-linked showcase, replaces the card grid.
          No overflow-hidden on this section — it breaks position: sticky in the
          pinned showcase below by giving the sticky child the wrong containing block. */}
      <section className="relative bg-white">
        <LightLattice />

        <Container className="relative pt-12 md:pt-16">
          <motion.div
            className="max-w-2xl"
            variants={gridStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.div
              className="text-xs font-semibold tracking-wide"
              style={{ color: GREEN }}
              variants={fadeUp}
              custom={0}
            >
              Our Specialty Areas
            </motion.div>

            <motion.h2
              className="mt-3 text-2xl md:text-3xl font-extrabold"
              style={{ color: DARK }}
              variants={fadeUp}
              custom={1}
            >
              A Wide Range Of Recovery Services For Your Home And Business
            </motion.h2>
          </motion.div>
        </Container>

        {/* Desktop pinned showcase — a direct child of the section, no Container
            or other wrapper between it and the section, to keep the sticky
            child's containing block unambiguous. */}
        <DesktopShowcase items={services} />

        <Container className="relative mt-6 lg:hidden">
          <MobileShowcase items={services} />
        </Container>
      </section>

      {/* Waste classification */}
      <motion.section
        className="relative bg-slate-50 border-t border-slate-200 overflow-hidden"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <LightLattice />

        <Container className="relative py-14 md:py-20">
          <motion.div className="max-w-2xl" variants={gridStagger}>
            <motion.div
              className="text-xs font-semibold tracking-wide"
              style={{ color: GREEN }}
              variants={fadeUp}
              custom={0}
            >
              Know What You're Recovering
            </motion.div>

            <motion.h2
              className="mt-3 text-2xl md:text-3xl font-extrabold"
              style={{ color: DARK }}
              variants={fadeUp}
              custom={1}
            >
              How Waste Is Classified
            </motion.h2>

            <motion.p className="mt-3 text-sm text-slate-600 leading-relaxed" variants={fadeUp} custom={2}>
              Proper classification is what makes safe handling, recovery, and
              recycling possible in the first place. Here's how we group it.
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-8 grid gap-4 lg:grid-cols-3"
            variants={gridStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {wasteCategories.map((cat) => (
              <motion.div key={cat.title} variants={fadeUp}>
                <CategoryCard category={cat} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </motion.section>

      {/* Bottom CTA */}
      <motion.section
        className="border-t border-slate-200 bg-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <Container className="py-10">
          <motion.div
            className="mx-auto max-w-3xl text-sm text-slate-700 leading-relaxed text-center"
            variants={fadeUp}
            custom={0}
          >
            We manage a full recovery chain for residential, commercial, and
            industrial clients, matched to whatever material stream you're
            generating.{" "}
            <motion.span className="inline-block">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 font-semibold"
                style={{ color: GREEN }}
              >
                <span className="transition-opacity duration-200 group-hover:opacity-90">
                  Request A Quote
                </span>

                <span className="relative inline-flex w-[18px] h-[18px]">
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0"
                    initial={false}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    <ArrowUpRight size={18} color={GREEN} />
                  </motion.span>

                  <motion.span
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                    initial={false}
                    animate={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    <ArrowRight size={18} color={ORANGE} />
                  </motion.span>
                </span>
              </Link>
            </motion.span>
          </motion.div>
        </Container>
      </motion.section>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        <MapSection />
      </motion.div>
    </motion.div>
  );
}
