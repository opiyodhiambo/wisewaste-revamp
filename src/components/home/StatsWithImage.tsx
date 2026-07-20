import { useEffect, useRef, useState, useMemo } from "react";
import Container from "../ui/Container";
import { Link } from "react-router-dom";
import { Gem, Cpu, BadgeCheck, Globe2, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";

import vehicle10 from "../../assets/vehicle10.jpeg";
import vehicle6 from "../../assets/vehicle6.jpeg";
import vehicle4 from "../../assets/vehicle33.jpeg";

const GREEN = "#1B6B1B";
const GOLD = "#B38C00";
const DARK = "#0B3D2E";

const SLIDE_MS = 3200;
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Placeholder figures — swap for real numbers before shipping.
const stats = [
  {
    icon: Gem,
    value: 48200,
    suffix: "",
    label: "Tonnes Of Material Recovered",
  },
  {
    icon: Cpu,
    value: 3600,
    suffix: "",
    label: "E-Waste Units Processed",
  },
  {
    icon: BadgeCheck,
    value: 250,
    suffix: "",
    label: "Certified Recovery Experts",
  },
  {
    icon: Globe2,
    value: 40,
    suffix: "+",
    label: "Export Partners Across Regions",
  },
];

function useCountUp(target: number, startCounting: boolean, durationMs = 1400) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!startCounting) return;

    const start = performance.now();
    const from = 0;
    const to = target;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(from + (to - from) * eased);

      setValue(next);

      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [target, startCounting, durationMs]);

  return value;
}

/** Hexagonal icon badge — echoes the mineral motif used elsewhere on the site */
function HexBadge({ Icon }: { Icon: React.ElementType }) {
  return (
    <div
      className="relative h-14 w-14 shrink-0 flex items-center justify-center"
      style={{
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        backgroundColor: "rgba(27,107,27,0.08)",
      }}
    >
      <Icon size={24} strokeWidth={1.8} style={{ color: GREEN }} />
    </div>
  );
}

function StatCard({
  icon,
  value,
  suffix,
  label,
  inView,
  index,
}: {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
  index: number;
}) {
  const counted = useCountUp(value, inView, 1300 + index * 120);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative bg-white border border-slate-200 rounded-lg p-5 sm:p-6 transition-colors duration-300 hover:border-transparent"
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
    >
      {/* gold underline that draws in on hover */}
      <span
        className="absolute left-0 bottom-0 h-[3px] w-full origin-left scale-x-0 opacity-0 transition duration-300 group-hover:scale-x-100 group-hover:opacity-100 rounded-b-lg"
        style={{ backgroundColor: GOLD }}
      />

      <motion.div
        whileHover={{ rotate: [0, -6, 6, 0], transition: { duration: 0.5, ease: "easeInOut" } }}
      >
        <HexBadge Icon={icon} />
      </motion.div>

      <div
        className="mt-4 text-[30px] sm:text-[34px] leading-none font-extrabold tabular-nums"
        style={{ color: DARK }}
      >
        {counted.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-sm font-semibold text-slate-600 leading-snug">{label}</div>
    </motion.div>
  );
}

/** Image slider: autoplay + swipe on mobile + arrows on desktop */
function ImageSlider({
  images,
  alt,
  className = "",
}: {
  images: string[];
  alt: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);

  const startX = useRef<number | null>(null);
  const startT = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    if (images.length <= 1) return;

    const t = setInterval(() => {
      setDir(1);
      setActive((i) => (i + 1) % images.length);
    }, SLIDE_MS);

    return () => clearInterval(t);
  }, [paused, images.length]);

  const prev = () => {
    if (images.length <= 1) return;
    setDir(-1);
    setActive((i) => (i - 1 + images.length) % images.length);
  };

  const next = () => {
    if (images.length <= 1) return;
    setDir(1);
    setActive((i) => (i + 1) % images.length);
  };

  const slideV: Variants = {
    enter: (d: 1 | -1) => ({ x: d === 1 ? 26 : -26, opacity: 0, filter: "blur(10px)" }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: EASE_OUT },
    },
    exit: (d: 1 | -1) => ({
      x: d === 1 ? -26 : 26,
      opacity: 0,
      filter: "blur(10px)",
      transition: { duration: 0.35, ease: EASE_OUT },
    }),
  };

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0]?.clientX ?? null;
    startT.current = Date.now();
    setPaused(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0]?.clientX ?? null;
    const sx = startX.current;
    const dt = startT.current ? Date.now() - startT.current : 9999;

    startX.current = null;
    startT.current = null;

    if (sx != null && endX != null) {
      const dx = endX - sx;
      const abs = Math.abs(dx);
      if (abs >= 45 && dt < 900) {
        if (dx > 0) prev();
        else next();
      }
    }

    setPaused(false);
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.img
          key={active}
          custom={dir}
          variants={slideV}
          initial="enter"
          animate="center"
          exit="exit"
          src={images[active]}
          alt={alt}
          className={className}
          loading="lazy"
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prev();
            }}
            className="hidden lg:grid absolute left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/80 backdrop-blur shadow-sm border border-white/60 place-items-center hover:bg-white transition"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              next();
            }}
            className="hidden lg:grid absolute right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/80 backdrop-blur shadow-sm border border-white/60 place-items-center hover:bg-white transition"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDir(idx > active ? 1 : -1);
                  setActive(idx);
                }}
                className="h-2.5 w-2.5 rounded-full transition"
                style={{
                  backgroundColor: idx === active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function StatsWithImage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });

  const slides = useMemo(() => [vehicle10, vehicle6, vehicle4], []);

  return (
    <section className="bg-white" ref={sectionRef as any}>
      <Container className="py-14 md:py-20">
        {/* intro */}
        <div className="max-w-2xl">
          <div className="text-xs font-semibold tracking-wide uppercase" style={{ color: GREEN }}>
            Recovery At Scale
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: DARK }}>
            The Numbers Behind What We Recover
          </h2>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px] items-start">
          {/* STAT CARD GRID */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {stats.map((s, i) => (
              <StatCard
                key={s.label}
                icon={s.icon}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                inView={inView}
                index={i}
              />
            ))}
          </div>

          {/* IMAGE SLIDER */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-full"
          >
            <ImageSlider
              images={slides}
              alt="Material recovery in progress"
              className="w-full h-[260px] sm:h-[320px] lg:h-full lg:min-h-[380px] object-cover"
            />
          </motion.div>
        </div>
                {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mt-16 md:mt-20"
        >
          <div
            className="relative overflow-hidden rounded-2xl px-8 py-10 md:px-14 md:py-14 text-center"
            style={{ backgroundColor: DARK }}
          >
            {/* Decorative background */}
            <div
              className="absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-10"
              style={{ backgroundColor: GOLD }}
            />
            <div
              className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full opacity-10"
              style={{ backgroundColor: GREEN }}
            />

            <div className="relative max-w-3xl mx-auto">
              <div
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: GOLD }}
              >
                Let's Work Together
              </div>

              <h3 className="mt-4 text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Ready to work with Kenya's trusted waste management professionals?
              </h3>

              <p className="mt-5 text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Contact Wisewaste today for a customized waste collection,
                recycling, or environmental management solution tailored to
                your home, business, institution, or industrial operation.
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 mt-8 rounded-full px-8 py-4 font-bold text-lg transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: GOLD,
                  color: DARK,
                }}
              >
                Contact Us Today
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
