import Container from "../ui/Container";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

// ✅ Add as many images as you want here (import your other assets)
import vehicle6 from "../../assets/vehicle6.jpeg";
import vehicle3 from "../../assets/vehicle36.jpeg";
import vehicle4 from "../../assets/vehicle28.jpeg";
import vehicle5 from "../../assets/vehicle25.jpeg";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const DARK = "#0B3D2E";
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AboutOverview() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax like HomeIntroSplit
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // ✅ Slider images (same assets, just relabelled to match the new positioning)
  const slides = useMemo(
    () => [
      { src: vehicle6, alt: "Waste collection in operation" },
      { src: vehicle3, alt: "Materials recovery facility" },
      { src: vehicle4, alt: "Collection fleet on route" },
      { src: vehicle5, alt: "Sorted materials ready for recovery" },
    ],
    []
  );

  // ✅ Slider state
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
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
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
    enter: (d: 1 | -1) => ({
      x: d === 1 ? 22 : -22,
      opacity: 0,
      filter: "blur(10px)",
    }),
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
    <section ref={sectionRef} className="bg-white overflow-hidden">
      <Container className="py-12 md:py-16">
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] items-start"
        >
          {/* LEFT SIDE — copy leads now instead of the slider */}
          <motion.div variants={containerV} className="lg:pt-2 lg:order-1">
            <motion.span
              variants={itemV}
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
              style={{ backgroundColor: "rgba(27,107,27,0.1)", color: GREEN }}
            >
              Urban Mining & Resource Recovery
            </motion.span>

            <motion.h2
              variants={itemV}
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
              style={{ color: DARK }}
            >
              Recovering Value From Waste <br className="hidden sm:block" />
              For Over{" "}
              <motion.span
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="font-extrabold"
              >
                1M plus
              </motion.span>{" "}
              Households
            </motion.h2>

            <motion.p
              variants={itemV}
              className="mt-6 text-sm leading-relaxed font-semibold"
              style={{ color: ORANGE }}
            >
              We are a leading urban mining company in Nairobi, recovering materials from waste rather than
              simply disposing of it. Our operations turn discarded resources back into usable, tradeable
              material, keeping them in circulation instead of in landfills.
            </motion.p>

            <motion.p variants={itemV} className="mt-6 text-sm leading-relaxed text-slate-600">
              Our work spans garbage collection, sorting and segregation, e-waste recycling, plastic
              recycling, metal recycling, green energy generation, and green manure production. Recovered
              industrial materials and precious minerals are also traded and exported. Our team of
              experienced professionals is dedicated to ensuring every stream of waste is recovered and put
              back to productive use.
            </motion.p>

            {/* CHECKLIST */}
            <motion.div variants={itemV} className="mt-8 border-t border-slate-200">
              <CheckRow text="Experts in Urban Mining & Industrial Waste Recovery" />
              <div className="border-t border-slate-200" />
              <CheckRow text="From collection to export: one recovery chain, fully managed" />
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE — slider */}
          <motion.div variants={cardV} className="relative lg:order-2">
            <div
              className="relative rounded-md overflow-hidden bg-slate-200"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70" />

              {/* Slider viewport */}
              <div className="relative w-full h-[240px] sm:h-[320px] lg:h-[420px] overflow-hidden">
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                  <motion.img
                    key={active}
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    style={{ y: imgY }}
                    src={slides[active]?.src}
                    alt={slides[active]?.alt ?? "Slider image"}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.06 }}
                  />
                </AnimatePresence>
              </div>

              {/* Shine hover overlay */}
              <motion.div
                className="pointer-events-none absolute inset-0 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                style={{
                  background:
                    "radial-gradient(650px circle at 20% 25%, rgba(255,255,255,0.22), transparent 55%)",
                }}
              />

              {/* Controls */}
              {slides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                               h-10 w-10 rounded-full bg-white/80 backdrop-blur
                               shadow-sm border border-white/60
                               grid place-items-center
                               hover:bg-white transition"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                               h-10 w-10 rounded-full bg-white/80 backdrop-blur
                               shadow-sm border border-white/60
                               grid place-items-center
                               hover:bg-white transition"
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Progress bar instead of dots */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex gap-1.5">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Go to image ${i + 1}`}
                        onClick={() => {
                          setDir(i > active ? 1 : -1);
                          setActive(i);
                        }}
                        className="h-1 flex-1 rounded-full overflow-hidden bg-white/35"
                      >
                        <span
                          className="block h-full rounded-full transition-all duration-300"
                          style={{
                            width: i === active ? "100%" : "0%",
                            backgroundColor: "rgba(255,255,255,0.95)",
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function CheckRow({ text }: { text: string }) {
  const itemV = {
    hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: EASE_OUT },
    },
  };

  return (
    <motion.div variants={itemV} className="group">
      <div className="flex items-center gap-3 py-5">
        <span
          className="h-6 w-6 rounded-full inline-flex items-center justify-center text-white flex-shrink-0"
          style={{ backgroundColor: GREEN }}
        >
          <Check size={16} strokeWidth={3} />
        </span>

        <div
          className="
            text-sm font-semibold
            text-slate-800
            cursor-pointer
            transition-colors duration-200
            group-hover:text-[#1B6B1B]
          "
          style={{ color: ORANGE }}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
}
