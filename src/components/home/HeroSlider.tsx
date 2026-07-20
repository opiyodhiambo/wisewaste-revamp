import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Container from "../ui/Container";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Vehicle1 from "../../assets/Vehicle1.jpeg";
import vehicle3 from "../../assets/vehicle29.jpeg";
import vehicle28 from "../../assets/vehicle28.jpeg";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const DARK = "#0B3D2E";
const DARK_2 = "#0F4A38";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const slides = [
  {
    kicker: "Sustainability Meets Reliability",
    title: "From Waste To Worth: Full-Cycle Recovery",
    desc: "We collect, sort, and recover materials at every stage, turning discarded waste into resources instead of landfill.",
    image: Vehicle1,
  },
  {
    kicker: "E-Waste, Plastic & Metal Recovery",
    title: "Turning Discarded Materials Into Usable Resources",
    desc: "From electronics to plastics and scrap metal, we recover and reprocess materials for reuse in industrial supply chains.",
    image: vehicle28,
  },
  {
    kicker: "Sustainable Resource Recovery",
    title: "Recycled Materials Market",
    desc: "Recovered plastics, metals, e-waste, and other recyclable materials are processed to meet market demand, creating a reliable supply of high-quality secondary raw materials for industry.",
    image: vehicle3,
  },
];

/** Decorative, manipulable SVG background: soft hex/mineral motif, slow drift */
function HeroBackdrop() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={DARK} />
          <stop offset="100%" stopColor={DARK_2} />
        </linearGradient>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="1200" height="700" fill="url(#heroBg)" />
      <rect width="1200" height="700" fill="url(#grid)" />

      {/* Hex motif nodding to material/mineral recovery, slow rotation */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "980px 160px" }}
      >
        <polygon
          points="980,90 1040,125 1040,195 980,230 920,195 920,125"
          fill="none"
          stroke={ORANGE}
          strokeOpacity="0.25"
          strokeWidth="2"
        />
        <polygon
          points="980,110 1022,133 1022,180 980,203 938,180 938,133"
          fill="none"
          stroke={ORANGE}
          strokeOpacity="0.15"
          strokeWidth="1.5"
        />
      </motion.g>

      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "160px 560px" }}
      >
        <polygon
          points="160,500 210,528 210,585 160,613 110,585 110,528"
          fill="none"
          stroke={GREEN}
          strokeOpacity="0.35"
          strokeWidth="2"
        />
      </motion.g>

      <motion.circle
        cx="620"
        cy="600"
        r="180"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        animate={{ r: [180, 195, 180] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const s = slides[i];

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);

  const content = useMemo(() => {
    const wrap: Variants = {
      hidden: {},
      show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
    };

    const item: Variants = {
      hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.5, ease: EASE_OUT },
      },
      exit: {
        opacity: 0,
        y: -10,
        filter: "blur(6px)",
        transition: { duration: 0.25, ease: EASE_OUT },
      },
    };

    return { wrap, item };
  }, []);

  return (
    <section className="relative overflow-hidden">
      <HeroBackdrop />

      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center py-14 sm:py-16 md:py-20 lg:py-24">
          {/* LEFT: copy */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${i}`}
              variants={content.wrap}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <motion.div
                variants={content.item}
                className="text-white/90 font-semibold text-xs sm:text-sm md:text-base"
              >
                {s.kicker}
              </motion.div>

              <motion.h1
                variants={content.item}
                className="mt-3 text-white font-extrabold leading-[1.08] tracking-tight
                           text-3xl sm:text-4xl md:text-5xl"
              >
                {s.title}
              </motion.h1>

              <motion.p
                variants={content.item}
                className="mt-4 text-white/85 max-w-lg text-sm sm:text-base font-medium"
              >
                {s.desc}
              </motion.p>

              <motion.div
                variants={content.item}
                className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center"
              >
                <Link to="/services" className="inline-flex">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    className="inline-flex items-center justify-center gap-3
                               px-7 py-3.5 text-sm sm:text-base font-bold
                               text-white shadow-soft transition
                               w-full sm:w-auto"
                    style={{ backgroundColor: GREEN }}
                  >
                    Explore Our Services
                    <ArrowUpRight size={18} className="opacity-95" />
                  </motion.button>
                </Link>

                <Link to="/about" className="inline-flex">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    className="inline-flex items-center justify-center
                               px-7 py-3.5 text-sm sm:text-base font-bold
                               shadow-soft transition
                               w-full sm:w-auto bg-white"
                    style={{ color: ORANGE }}
                  >
                    More About Us
                  </motion.button>
                </Link>
              </motion.div>

              {/* Dots */}
              <motion.div variants={content.item} className="mt-9 flex items-center gap-2">
                {slides.map((_, idx) => {
                  const active = idx === i;
                  return (
                    <button
                      key={`dot-${idx}`}
                      onClick={() => setI(idx)}
                      className="h-2.5 rounded-full transition-all"
                      style={{
                        width: active ? 44 : 10,
                        backgroundColor: active ? GREEN : "rgba(255,255,255,0.35)",
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  );
                })}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT: image card */}
          <div className="relative">
            <div className="relative aspect-[4/3] sm:aspect-[5/4] w-full rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.35)] border border-white/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`img-${i}`}
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.8, ease: EASE_OUT }}
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

            {/* Small accent badge overlapping the card corner */}
            <div
              className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-lg"
              style={{ backgroundColor: GREEN }}
            >
              Urban Mining & Resource Recovery
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
