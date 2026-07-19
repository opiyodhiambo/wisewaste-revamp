import { useEffect, useMemo, useRef, useState } from "react";
import Container from "../ui/Container";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import vehicle8 from "../../assets/vehicle29.jpeg";
import vehicle17 from "../../assets/vehicle25.jpeg";
import vehicle12 from "../../assets/vehicle33.jpeg";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";

const heroSlides = [vehicle8, vehicle17, vehicle12];

// Different slide timings (ms)
const slideTimings = [5000, 4200, 6500];
const DEFAULT_TIMING = 4800;

// Swipe config
const SWIPE_CONFIDENCE = 70;

export default function AboutHero() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);

  const timerRef = useRef<number | null>(null);
  const slideCount = heroSlides.length;

  const currentDelay = useMemo(
    () => slideTimings[index] ?? DEFAULT_TIMING,
    [index]
  );

  const clampIndex = (i: number) => (i + slideCount) % slideCount;

  const goTo = (nextIndex: number, dir: 1 | -1) => {
    setDirection(dir);
    setIndex(clampIndex(nextIndex));
  };

  const next = () => goTo(index + 1, 1);
  const prev = () => goTo(index - 1, -1);

  // Auto-slide with per-slide timing + pause on hover
  useEffect(() => {
    if (paused) return;

    if (timerRef.current) window.clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      next();
    }, currentDelay);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, currentDelay]);

  // ✅ No distortion: keep bg-cover, and "zoom out" with uniform scale (not backgroundSize % %)
  // You can tune these per slide if needed.
  const bgScale = 1; // lower = shows more image (less "zoomed"); keep 0.90–0.98

  // Framer Motion variants (premium entrance)
  const slideVariants = {
    enter: (dir: 1 | -1) => ({
      opacity: 0,
      scale: 1.08,
      x: dir === 1 ? 55 : -55,
      filter: "blur(10px)",
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      filter: "blur(0px)",
    },
    exit: (dir: 1 | -1) => ({
      opacity: 0,
      scale: 1.04,
      x: dir === 1 ? -55 : 55,
      filter: "blur(10px)",
    }),
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Slider background */}
      <div
        className="absolute inset-0 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <AnimatePresence initial={false} custom={direction}>
          {/* This is the interactive/swipe layer */}
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              const swipePower =
                Math.abs(info.offset.x) + Math.abs(info.velocity.x) * 0.2;

              if (info.offset.x < -SWIPE_CONFIDENCE || swipePower > 260) next();
              else if (info.offset.x > SWIPE_CONFIDENCE || swipePower > 260)
                prev();
            }}
          >
            {/* ✅ This inner layer does the background rendering with safe aspect ratio */}
            <motion.div
              className="absolute inset-0 bg-center bg-cover will-change-transform"
              style={{ backgroundImage: `url(${heroSlides[index]})` }}
              animate={{ scale: bgScale }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(11,46,34,0.20)" }}
        />

        {/* Manual arrows */}
        <div className="absolute inset-y-0 left-3 sm:left-6 z-20 flex items-center">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="
              h-11 w-11 sm:h-12 sm:w-12
              rounded-full
              bg-white/10 border border-white/20
              text-white
              flex items-center justify-center
              hover:bg-white/15 transition
              backdrop-blur
            "
          >
            <ChevronLeft size={22} />
          </button>
        </div>

        <div className="absolute inset-y-0 right-3 sm:right-6 z-20 flex items-center">
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="
              h-11 w-11 sm:h-12 sm:w-12
              rounded-full
              bg-white/10 border border-white/20
              text-white
              flex items-center justify-center
              hover:bg-white/15 transition
              backdrop-blur
            "
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 right-6 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i, i > index ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {paused && (
          <div className="absolute bottom-6 left-6 z-20 text-[11px] font-semibold text-white/80">
            Paused
          </div>
        )}
      </div>

      {/* Content sizing (fills viewport too) */}
      <Container className="relative min-h-screen py-12 sm:py-16 lg:py-20 flex flex-col justify-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
          }}
          className="max-w-3xl mx-auto flex flex-col gap-5"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="text-white font-extrabold leading-[1.05] text-3xl sm:text-5xl lg:text-6xl text-center"
          >
            About Us
          </motion.h1>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="text-white/90 text-xs font-semibold tracking-wide text-center"
          >
            Work with professionals
          </motion.div>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="text-white/90 text-sm sm:text-base leading-relaxed font-semibold text-center max-w-2xl mx-auto"
          >
            With over 15 years of experience and hundreds of satisfied customers,
            <br className="hidden sm:block" />
            we know what it takes to make your home, office or business clean and
            also garbage collection.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="mt-6 flex flex-wrap justify-center gap-4"
          >
            <motion.div
              whileHover={{ backgroundColor: GREEN }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold border border-white/70 backdrop-blur-[1px] cursor-pointer"
            >
              <Link to="/request-pickup" className="w-full text-white text-center">
                Request a Quote
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="mt-10 text-xs text-white/90 flex justify-start"
          >
            <Link to="/" className="hover:underline">
              Home
            </Link>{" "}
            <span className="mx-1">›</span>{" "}
            <span className="opacity-95">About Us</span>
          </motion.div>
        </motion.div>
      </Container>

      {/* bottom green bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ backgroundColor: GREEN, opacity: 0.5 }}
      />
    </section>
  );
}
