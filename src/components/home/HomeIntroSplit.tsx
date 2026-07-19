import { Link } from "react-router-dom";
import Container from "../ui/Container";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Truck,
  Layers,
  Recycle,
  Globe,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import vehicle2 from "../../assets/vehicle2.jpeg";
import vehicle3 from "../../assets/vehicle30.jpeg";
import vehicle4 from "../../assets/vehicle40.jpeg";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const DARK = "#0B3D2E";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const steps = [
  { label: "Collect", icon: Truck },
  { label: "Sort", icon: Layers },
  { label: "Recover", icon: Recycle },
  { label: "Export", icon: Globe },
];

/** Faint hex/grid texture, same motif family as the hero and specialty band, toned down for a white section */
function IntroBackdrop() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="introGrid" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(11,61,46,0.035)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1440" height="700" fill="url(#introGrid)" />

      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "1300px 620px" }}
      >
        <polygon
          points="1300,570 1348,597 1348,650 1300,677 1252,650 1252,597"
          fill="none"
          stroke="rgba(249,168,38,0.18)"
          strokeWidth="2"
        />
      </motion.g>
    </svg>
  );
}

export default function HomeIntroSplit() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  const [aboutHover, setAboutHover] = useState(false);

  const slides = useMemo(
    () => [
      { src: vehicle2, alt: "Waste collection in progress" },
      { src: vehicle3, alt: "Materials recovery operations" },
      { src: vehicle4, alt: "Collection fleet" },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);

  const SLIDE_MS = 3200;

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const t = setInterval(() => {
      setDir(1);
      setActive((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearInterval(t);
  }, [slides.length, paused]);

  const prev = () => {
    if (slides.length <= 1) return;
    setDir(-1);
    setActive((i) => (i - 1 + slides.length) % slides.length);
  };

  const next = () => {
    if (slides.length <= 1) return;
    setDir(1);
    setActive((i) => (i + 1) % slides.length);
  };

  const containerV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };

  const itemV: Variants = {
    hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: EASE_OUT },
    },
  };

  const cardV: Variants = {
    hidden: { opacity: 0, y: 18, scale: 0.98, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.65, ease: EASE_OUT },
    },
  };

  const slideVariants: Variants = {
    enter: (d: 1 | -1) => ({ x: d === 1 ? 22 : -22, opacity: 0, filter: "blur(10px)" }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: EASE_OUT },
    },
    exit: (d: 1 | -1) => ({
      x: d === 1 ? -22 : 22,
      opacity: 0,
      filter: "blur(10px)",
      transition: { duration: 0.35, ease: EASE_OUT },
    }),
  };

  return (
    <section ref={sectionRef} className="relative bg-white overflow-hidden">
      <IntroBackdrop />

      <Container className="relative py-12 md:py-16 lg:py-20">
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          className="grid gap-14 lg:grid-cols-2 lg:gap-16 items-center"
        >
          {/* LEFT: collage visual */}
          <motion.div variants={cardV} className="relative min-w-0">
            {/* Offset accent panel behind the image, gives the collage depth */}
            <div
              className="absolute -inset-3 md:-inset-5 rounded-2xl -rotate-2"
              style={{ backgroundColor: "rgba(27,107,27,0.08)" }}
            />

            <div
              className="relative rounded-2xl overflow-hidden bg-slate-200 shadow-[0_30px_70px_rgba(0,0,0,0.16)]"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent z-10" />

              <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[400px] overflow-hidden">
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                  <motion.img
                    key={active}
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    src={slides[active]?.src}
                    alt={slides[active]?.alt ?? "Recovery operations"}
                    loading="lazy"
                    style={{ y: imgY }}
                    className="absolute inset-0 w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7, ease: EASE_OUT }}
                  />
                </AnimatePresence>
              </div>

              {slides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20
                               h-10 w-10 rounded-full bg-white/80 backdrop-blur
                               shadow-sm border border-white/60
                               grid place-items-center hover:bg-white transition"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20
                               h-10 w-10 rounded-full bg-white/80 backdrop-blur
                               shadow-sm border border-white/60
                               grid place-items-center hover:bg-white transition"
                  >
                    <ChevronRight size={18} />
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Go to image ${i + 1}`}
                        onClick={() => {
                          setDir(i > active ? 1 : -1);
                          setActive(i);
                        }}
                        className="h-2.5 w-2.5 rounded-full transition"
                        style={{
                          backgroundColor:
                            i === active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Floating process card, replaces the old italic caption box */}
            <motion.div
              variants={itemV}
              className="absolute -bottom-8 -right-3 sm:-right-6 z-20 bg-white rounded-xl shadow-[0_18px_45px_rgba(0,0,0,0.18)] px-5 py-4 max-w-[240px]"
            >
              <div className="text-[11px] font-bold" style={{ color: DARK }}>
                Full-Cycle Recovery
              </div>
              <div className="mt-1 text-[11px] text-slate-500 leading-relaxed">
                Not just disposal, materials go back to work.
              </div>
            </motion.div>

            <div className="h-10" />
          </motion.div>

          {/* RIGHT */}
          <motion.div variants={containerV} className="min-w-0">
            <motion.div
              variants={itemV}
              className="text-[11px] md:text-xs font-semibold tracking-wide text-slate-500"
            >
              Reliable And Effective Waste Recovery Solutions
            </motion.div>

            <motion.h2
              variants={itemV}
              className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-tight"
              style={{ color: DARK }}
            >
              We Recover What Others Throw Away
            </motion.h2>

            <motion.p
              variants={itemV}
              className="mt-5 text-sm leading-relaxed font-semibold"
              style={{ color: ORANGE }}
            >
              Wise Waste Services runs an end-to-end recovery operation, collection, sorting,
              e-waste, plastic and metal recycling, green energy generation, and green manure,
              all under one roof. Recovered industrial materials and precious minerals are then
              traded and exported.
            </motion.p>

            <motion.p variants={itemV} className="mt-5 text-sm leading-relaxed text-slate-600">
              Every stream we handle is assessed for what can be recovered before anything is
              written off as waste, keeping resources in circulation and out of landfill.
            </motion.p>

            {/* CTA row */}
            <motion.div variants={itemV} className="mt-7 flex items-center gap-4">
              <Link
                to="/about"
                onMouseEnter={() => setAboutHover(true)}
                onMouseLeave={() => setAboutHover(false)}
                className="
                  inline-flex items-center justify-center gap-2
                  px-6 py-3 font-bold text-white shadow-soft
                  transition-all duration-200
                  hover:-translate-y-[1px]
                "
                style={{ backgroundColor: GREEN }}
              >
                More About Us{" "}
                <span className="inline-flex items-center">
                  {!aboutHover ? <ArrowUpRight size={18} /> : <ArrowRight size={18} />}
                </span>
              </Link>
            </motion.div>

            {/* Process chain, replaces the old vertical checklist */}
            <motion.div variants={itemV} className="mt-10">
              <div className="flex items-center flex-wrap gap-y-4">
                {steps.map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex items-center">
                      <div className="flex flex-col items-center gap-2 w-20">
                        <div
                          className="h-11 w-11 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "rgba(27,107,27,0.1)" }}
                        >
                          <Icon size={18} style={{ color: GREEN }} />
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{s.label}</span>
                      </div>

                      {idx !== steps.length - 1 && (
                        <div
                          className="h-px w-8 sm:w-12 mx-1"
                          style={{ backgroundColor: "rgba(27,107,27,0.25)" }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
