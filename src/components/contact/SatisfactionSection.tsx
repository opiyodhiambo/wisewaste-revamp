import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import vehicle5 from "../../assets/vehicle23.jpeg";
import vehicle4 from "../../assets/vehicle40.jpeg";
import vehicle6 from "../../assets/vehicle36.jpeg";

type Props = {
  imageUrl?: string; // kept for compatibility, unused (slider list is used instead)
  satisfactionPct?: number; // e.g. 97
};

const GREEN = "#1B6B1B";
const GREEN_DARK = "#165B16";
const ORANGE = "#F9A826";
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const BG_SLIDE_MS = 3200;

const capabilities = [
  "Collection & Sorting",
  "E-waste Recycling",
  "Plastic Recycling",
  "Metal Recycling",
  "Green Energy Generation",
  "Green Manure",
  "Trading & Export",
];

function useCountUp(target: number, startWhen: boolean, durationMs = 1100) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!startWhen) return;

    let raf = 0;
    const start = performance.now();
    const from = 0;
    const to = Math.max(0, Math.round(target));

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(from + (to - from) * eased);
      setVal(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, startWhen, durationMs]);

  return val;
}

/** Full-width background slider used behind the top banner */
function BgSlider({ images, inView }: { images: string[]; inView: boolean }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);

  const startX = useRef<number | null>(null);
  const startT = useRef<number | null>(null);

  useEffect(() => {
    if (paused || !inView || images.length <= 1) return;

    const t = setInterval(() => {
      setDir(1);
      setActive((v) => (v + 1) % images.length);
    }, BG_SLIDE_MS);

    return () => clearInterval(t);
  }, [paused, inView, images.length]);

  const prev = () => {
    if (images.length <= 1) return;
    setDir(-1);
    setActive((v) => (v - 1 + images.length) % images.length);
  };

  const next = () => {
    if (images.length <= 1) return;
    setDir(1);
    setActive((v) => (v + 1) % images.length);
  };

  const bgV: Variants = {
    enter: () => ({ opacity: 0, scale: 1.08, filter: "blur(10px)" }),
    center: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.85, ease: EASE_OUT },
    },
    exit: () => ({
      opacity: 0,
      scale: 1.08,
      filter: "blur(10px)",
      transition: { duration: 0.5, ease: EASE_OUT },
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
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.div
          key={active}
          custom={dir}
          variants={bgV}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[active]})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous background"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prev();
            }}
            className="hidden lg:grid absolute left-4 top-1/2 -translate-y-1/2 z-20
                       h-10 w-10 rounded-full bg-black/25 border border-white/20 text-white
                       backdrop-blur grid place-items-center hover:bg-black/35 transition"
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
            className="hidden lg:grid absolute right-4 top-1/2 -translate-y-1/2 z-20
                       h-10 w-10 rounded-full bg-black/25 border border-white/20 text-white
                       backdrop-blur grid place-items-center hover:bg-black/35 transition"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to background ${idx + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDir(idx > active ? 1 : -1);
                  setActive(idx);
                }}
                className="h-1.5 w-1.5 rounded-full transition"
                style={{
                  backgroundColor:
                    idx === active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function SatisfactionSection({ satisfactionPct = 97 }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });
  const count = useCountUp(satisfactionPct, inView, 1200);

  const bgImages = useMemo(() => [vehicle5, vehicle6, vehicle4], []);

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: (d = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE_OUT, delay: d },
    }),
  };

  const chipIn = {
    hidden: { opacity: 0, y: 8, scale: 0.96 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: EASE_OUT, delay: 0.25 + i * 0.05 },
    }),
  };

  return (
    <motion.section
      ref={sectionRef}
      className="bg-white"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* BANNER: full-width slider */}
      <div className="relative h-[280px] sm:h-[360px] lg:h-[420px] overflow-hidden">
        <BgSlider images={bgImages} inView={inView} />
      </div>

      <Container>
        {/* OVERLAPPING STAT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.75, ease: EASE_OUT }}
          className="relative z-10 -mt-16 sm:-mt-20 mx-auto w-full max-w-3xl"
        >
          <div
            className="text-white text-center py-8 px-6 sm:px-10 shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
            style={{ background: GREEN }}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold tabular-nums">{count}%</span>
              <span className="text-xs text-white/85 font-semibold pb-1">(rated)</span>
            </div>
            <div className="mt-1 text-sm font-bold">Customer Satisfaction</div>
            <p className="mt-3 text-xs text-white/85 max-w-md mx-auto leading-relaxed">
              Over 15,000 clients trust us to recover and manage their waste responsibly.
            </p>
          </div>
        </motion.div>

        {/* CAPABILITY CHIPS */}
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {capabilities.map((c, i) => (
            <motion.span
              key={c}
              custom={i}
              variants={chipIn}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="rounded-full border px-4 py-1.5 text-xs font-semibold"
              style={{ borderColor: "rgba(27,107,27,0.25)", color: GREEN_DARK }}
            >
              {c}
            </motion.span>
          ))}
        </div>

        {/* COMPANY COPY */}
        <div className="mt-12 lg:mt-16 pb-14 lg:pb-20 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-14 items-start">
          <motion.div variants={fadeUp} custom={0.1}>
            <div className="text-[11px] font-semibold" style={{ color: GREEN }}>
              Urban Mining, Done Right
            </div>
            <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Serving 15,000 Clients <br className="hidden sm:block" />
              Across Four Counties
            </h3>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.18}>
            <p className="text-sm leading-relaxed" style={{ color: ORANGE }}>
              With strategically located operations across Nairobi, Kiambu, Machakos and Kajiado,
              Wise Waste Services recovers value from waste rather than simply disposing of it. Our
              team collects, sorts, and processes material through recycling, energy generation, and
              export, keeping resources in circulation instead of in landfills.
            </p>

            <p className="mt-5 text-sm text-slate-600 leading-relaxed">
              Whatever the scale of your waste, we work with you to recover as much value from it as
              possible, for your business and for the environment.
            </p>

            <motion.div
              className="mt-8 inline-block"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
            >
              <Link to="/about" className="group inline-flex">
                <Button
                  className="rounded-none px-9 py-3 font-semibold text-white"
                  style={{ background: GREEN }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = GREEN_DARK;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = GREEN;
                  }}
                >
                  <span className="inline-flex items-center gap-2">
                    More About Us
                    <motion.span
                      initial={{ x: 0, y: 0 }}
                      whileHover={{ x: 3, y: -1 }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}
                    >
                      <ArrowUpRight size={18} />
                    </motion.span>
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}
