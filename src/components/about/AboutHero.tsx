import { useEffect, useMemo, useRef, useState } from "react";
import Container from "../ui/Container";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight as PageArrow, Recycle, Globe2, Gem } from "lucide-react";
import { motion } from "framer-motion";

import vehicle8 from "../../assets/vehicle29.jpeg";
import vehicle17 from "../../assets/vehicle25.jpeg";
import vehicle12 from "../../assets/vehicle33.jpeg";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const GOLD = "#B38C00";
const DARK = "#0B3D2E";
const DARK_2 = "#0F4A38";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const galleryImages = [vehicle8, vehicle17, vehicle12];

const factChips = [
  { icon: Recycle, label: "15+ Years Recovering Material" },
  { icon: Gem, label: "4 Material Streams" },
  { icon: Globe2, label: "40+ Export Partners" },
];

/** Full-bleed animated backdrop, replaces the photo slider */
function AboutBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="aboutBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={DARK} />
          <stop offset="100%" stopColor={DARK_2} />
        </linearGradient>
        <pattern id="aboutGrid" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="1440" height="900" fill="url(#aboutBg)" />
      <rect width="1440" height="900" fill="url(#aboutGrid)" />

      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "1180px 200px" }}
      >
        <polygon
          points="1180,130 1240,164 1240,232 1180,266 1120,232 1120,164"
          fill="none"
          stroke={ORANGE}
          strokeOpacity="0.22"
          strokeWidth="2"
        />
        <polygon
          points="1180,150 1220,172 1220,224 1180,246 1140,224 1140,172"
          fill="none"
          stroke={ORANGE}
          strokeOpacity="0.14"
          strokeWidth="1.5"
        />
      </motion.g>

      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 130, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "190px 700px" }}
      >
        <polygon
          points="190,630 246,660 246,722 190,752 134,722 134,660"
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="2"
        />
      </motion.g>

      <motion.circle
        cx="720"
        cy="150"
        r="150"
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="1"
        animate={{ r: [150, 164, 150] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

/** Page-flip gallery: each photo turns like a book page to reveal the next */
function PageFlipGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [paused, setPaused] = useState(false);
  const total = images.length;
  const nextIndex = useMemo(() => (index + 1) % total, [index, total]);
  const timerRef = useRef<number | null>(null);

  const triggerFlip = () => {
    if (flipping) return;
    setFlipping(true);
  };

  useEffect(() => {
    if (paused) return;

    timerRef.current = window.setTimeout(() => {
      triggerFlip();
    }, 3800);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, flipping]);

  const handleFlipComplete = () => {
    if (!flipping) return;
    setIndex(nextIndex);
    setFlipping(false);
  };

  const jumpTo = (i: number) => {
    if (i === index || flipping) return;
    setIndex(i);
  };

  return (
    <div
      className="relative aspect-[4/3] sm:aspect-[5/4] w-full rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.35)] border border-white/10"
      style={{ perspective: 1600 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* base layer: the page underneath, already showing what's coming next */}
      <img
        src={images[nextIndex]}
        alt="Recovery operations"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* top layer: the current page, flips away on its left edge */}
      <motion.div
        className="absolute inset-0"
        style={{
          transformOrigin: "left center",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
        animate={flipping ? { rotateY: -150, opacity: 0.15 } : { rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        onAnimationComplete={handleFlipComplete}
      >
        <img
          src={images[index]}
          alt="Recovery operations"
          className="h-full w-full object-cover"
        />
        {/* page-edge shading for a bit of physicality */}
        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/25 to-transparent" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

      {/* manual next-page control */}
      <button
        type="button"
        onClick={triggerFlip}
        aria-label="Turn page"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/15 border border-white/25 text-white backdrop-blur flex items-center justify-center hover:bg-white/25 transition"
      >
        <PageArrow size={18} />
      </button>

      {/* page dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => jumpTo(i)}
            aria-label={`Go to page ${i + 1}`}
            className="h-2 w-2 rounded-full transition"
            style={{ backgroundColor: i === index ? "#fff" : "rgba(255,255,255,0.4)" }}
          />
        ))}
      </div>
    </div>
  );
}

export default function AboutHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <AboutBackdrop />

      <Container className="relative min-h-screen py-16 sm:py-20 lg:py-24 flex items-center">
        <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT: copy */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
            }}
            className="flex flex-col gap-5 text-center lg:text-left"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
              }}
              className="text-white/90 text-xs font-semibold tracking-wide"
            >
              Work With Recovery Professionals
            </motion.div>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
              }}
              className="text-white font-extrabold leading-[1.05] text-4xl sm:text-5xl lg:text-6xl"
            >
              About Us
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
              }}
              className="text-white/90 text-sm sm:text-base leading-relaxed font-semibold max-w-xl mx-auto lg:mx-0"
            >
              With over 15 years of experience across residential, commercial, and
              industrial clients, we sort, recover, and reprocess material streams,
              e-waste, plastics, metals, and minerals, turning what looks like
              waste into resources worth mining twice.
            </motion.p>

            {/* fact chips — the added content */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
              }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mt-2"
            >
              {factChips.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs sm:text-sm font-semibold text-white/90"
                >
                  <Icon size={15} style={{ color: GOLD }} />
                  {label}
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
              }}
              className="mt-6 flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <motion.div
                whileHover={{ backgroundColor: GREEN }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border border-white shadow-sm cursor-pointer"
              >
                <Link to="/contact" className="flex text-white items-center gap-2">
                  Inquiry
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
                <Link to="/request-pickup" className="w-full text-white text-center">
                  Request a Quote
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
              }}
              className="mt-8 text-xs text-white/90 flex justify-center lg:justify-start"
            >
              <Link to="/" className="hover:underline">
                Home
              </Link>{" "}
              <span className="mx-1">›</span>{" "}
              <span className="opacity-95">About Us</span>
            </motion.div>
          </motion.div>

          {/* RIGHT: page-flip gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
          >
            <PageFlipGallery images={galleryImages} />
          </motion.div>
        </div>
      </Container>

      {/* bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ backgroundColor: GREEN, opacity: 0.5 }}
      />
    </section>
  );
}
