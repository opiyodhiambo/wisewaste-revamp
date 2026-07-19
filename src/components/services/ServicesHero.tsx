import { Link } from "react-router-dom";
import Container from "../ui/Container";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import vehicle10 from "../../assets/vehicle10.jpeg";
import vehicle6 from "../../assets/vehicle28.jpeg";
import vehicle4 from "../../assets/vehicle40.jpeg";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ✅ not too slow
const HERO_SLIDE_MS = 3200;

export default function ServicesHero() {
  const containerV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const itemV: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: EASE_OUT },
    },
  };

  // ✅ background images list
  const heroImages = useMemo(() => [vehicle10, vehicle6, vehicle4], []);

  // slider state
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);

  // swipe support
  const startX = useRef<number | null>(null);
  const startT = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    if (heroImages.length <= 1) return;

    const t = setInterval(() => {
      setDir(1);
      setActive((v) => (v + 1) % heroImages.length);
    }, HERO_SLIDE_MS);

    return () => clearInterval(t);
  }, [paused, heroImages.length]);

  const prev = () => {
    if (heroImages.length <= 1) return;
    setDir(-1);
    setActive((v) => (v - 1 + heroImages.length) % heroImages.length);
  };

  const next = () => {
    if (heroImages.length <= 1) return;
    setDir(1);
    setActive((v) => (v + 1) % heroImages.length);
  };

  // ✅ FIX: use direction param so TS doesn't complain + nicer motion
  const bgV: Variants = {
    enter: (d: 1 | -1) => ({
      opacity: 0,
      x: d === 1 ? 26 : -26, // slide in from direction
      scale: 1.02,
      filter: "blur(10px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: EASE_OUT },
    },
    exit: (d: 1 | -1) => ({
      opacity: 0,
      x: d === 1 ? -26 : 26, // slide out opposite direction
      scale: 1.02,
      filter: "blur(10px)",
      transition: { duration: 0.45, ease: EASE_OUT },
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
    <section
      className="relative min-h-[340px] sm:min-h-[420px] lg:min-h-[520px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ✅ Background slider */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={active}
            custom={dir}
            variants={bgV}
            initial="enter"
            animate="center"
            exit="exit"
            src={heroImages[active]}
            alt="Services hero"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </AnimatePresence>
      </div>

      {/* overlay (keep/remove as you wish) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* ✅ Desktop arrows */}
      {heroImages.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous background"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prev();
            }}
            className="hidden lg:grid absolute left-6 top-1/2 -translate-y-1/2 z-20
                       h-11 w-11 rounded-full bg-white/15 border border-white/15 text-white
                       backdrop-blur grid place-items-center hover:bg-white/20 transition"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            aria-label="Next background"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              next();
            }}
            className="hidden lg:grid absolute right-6 top-1/2 -translate-y-1/2 z-20
                       h-11 w-11 rounded-full bg-white/15 border border-white/15 text-white
                       backdrop-blur grid place-items-center hover:bg-white/20 transition"
          >
            <ChevronRight size={18} />
          </button>

          {/* ✅ Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroImages.map((_, idx) => (
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
                  backgroundColor:
                    idx === active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </div>
        </>
      )}

      <Container className="relative h-full py-12 sm:py-16 lg:py-20 flex flex-col justify-center">
      <motion.div
        variants={containerV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-3xl mx-auto flex flex-col items-center gap-5"
      >
        <motion.div
          variants={itemV}
          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold tracking-wide text-white"
        >
          Urban Mining & Resource Recovery
        </motion.div>

        <motion.h1
          variants={itemV}
          className="text-white font-extrabold leading-[1.05] text-3xl sm:text-5xl lg:text-6xl text-center"
        >
          From Collection To Export, <br />
          Full-Cycle Waste Recovery
        </motion.h1>

        <motion.div
          variants={itemV}
          className="text-white/90 text-xs font-semibold tracking-wide text-center"
        >
          Collection, sorting, recycling, and export, handled by professionals
        </motion.div>

        <motion.div variants={itemV} className="flex flex-wrap justify-center gap-2">
          {[
            "Garbage Collection",
            "Sorting & Segregation",
            "E-waste Recycling",
            "Plastic Recycling",
            "Metal Recycling",
            "Green Energy Generation",
            "Green Manure",
            "Trading & Export",
          ].map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/25 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/90"
            >
              {c}
            </span>
          ))}
        </motion.div>

        <motion.div variants={itemV} className="mt-6 flex flex-wrap justify-center gap-4">
          <motion.div
            whileHover={{ backgroundColor: GREEN }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border border-white shadow-sm cursor-pointer"
          >
            <Link to="/request-pickup" className="flex text-white items-center gap-2">
              Request Pickup
              <motion.span
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center"
              >
                <ArrowUpRight size={16} />
              </motion.span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ backgroundColor: ORANGE }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold border border-white/70 backdrop-blur-[1px] cursor-pointer"
          >
            <Link to="/about" className="w-full text-white text-center">
              More About Us
            </Link>
          </motion.div>
        </motion.div>

        <motion.div variants={itemV} className="mt-10 text-xs text-white/90 flex justify-start">
          <Link to="/" className="hover:underline">
            Home
          </Link>{" "}
          <span className="mx-1">›</span> <span className="opacity-95">Services</span>
        </motion.div>
      </motion.div>
    </Container>

      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ backgroundColor: GREEN, opacity: 0.5 }}
      />
    </section>
  );
}
