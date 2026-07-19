import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { services } from "../data/services";
import {
  Phone,
  Mail,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { site } from "../data/site";
import KeyBenefits from "../components/services/KeyBenefits";

const GREEN = "#1B6B1B";
const EASE_OUT: any = [0.16, 1, 0.3, 1];

// --- Motion presets (slow + natural) ---
const pageIn = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.45, ease: EASE_OUT } },
};

const sectionIn = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14, filter: "blur(2px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE_OUT, delay: i * 0.08 },
  }),
};

const cardIn = {
  hidden: { opacity: 0, y: 16, filter: "blur(2px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

const imgIn = {
  hidden: { opacity: 0, scale: 1.02 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.05, ease: EASE_OUT } },
};

// Arrow swap: ↗ -> → (stable, no hover bugs)
function ArrowSwap({
  size = 16,
  className = "",
  color = "currentColor",
}: {
  size?: number;
  className?: string;
  color?: string;
}) {
  return (
    <span className={`relative inline-flex w-[18px] h-[18px] ${className}`}>
      <span className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-200">
        <ArrowUpRight size={size} style={{ color }} />
      </span>
      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ArrowRight size={size} style={{ color }} />
      </span>
    </span>
  );
}

// Premium “magnet” hover for the green contact card
function useMagnet(strength = 10) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.7 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set((relX / (rect.width / 2)) * strength);
    y.set((relY / (rect.height / 2)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { sx, sy, onMove, onLeave };
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = useMemo(() => services.find((s) => s.slug === slug), [slug]);

  if (!service) {
    return (
      <Container className="py-16">
        <div className="font-semibold text-xl">Service not found</div>
        <Link to="/services" className="text-[#1B6B1B] hover:text-[#F9A826]">
          Back to Services
        </Link>
      </Container>
    );
  }

  const magnet = useMagnet(10);

  return (
    <motion.div variants={pageIn} initial="hidden" animate="show" exit="exit">
      <motion.section
        className="bg-white"
        variants={sectionIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Container className="py-10 lg:py-14">
          <motion.div
            className="grid gap-10 lg:grid-cols-[320px_1fr]"
            variants={sectionIn}
          >
            {/* LEFT SIDEBAR */}
            <motion.aside className="space-y-6" variants={sectionIn}>
              {/* Our Services list */}
              <motion.div variants={fadeUp} custom={0}>
                <motion.div
                  className="text-sm font-semibold text-slate-900 mb-3"
                  variants={fadeUp}
                  custom={0}
                >
                  Our Services
                </motion.div>

                <motion.div
                  className="grid gap-2"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.06,
                        delayChildren: 0.08,
                      },
                    },
                  }}
                >
                  {services.map((s) => {
                    const active = s.slug === service.slug;

                    return (
                      <motion.div key={s.slug} variants={cardIn}>
                        <Link
                          to={`/services/${s.slug}`}
                          className={[
                            "group w-full px-4 py-3 text-sm font-semibold border transition flex items-center justify-between",
                            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B6B1B]/40",
                            active
                              ? "bg-[#1B6B1B] text-white border-[#1B6B1B]"
                              : "bg-[#D4A61A] text-white border-[#D4A61A] hover:opacity-95",
                          ].join(" ")}
                        >
                          <motion.span
                            className="inline-flex items-center gap-2"
                            initial={false}
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.25, ease: EASE_OUT }}
                          >
                            <Sparkles size={16} className="opacity-90" />
                            {s.title.split("|")[0].trim()}
                          </motion.span>

                          <span className="inline-flex items-center">
                            <ArrowSwap size={16} color="#ffffff" />
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>

              {/* Green contact card (magnet hover + fully motionized) */}
              <motion.div
                className="rounded-md overflow-hidden text-white relative"
                style={{
                  backgroundColor: "#2E6B2E",
                  x: magnet.sx,
                  y: magnet.sy,
                }}
                variants={cardIn}
                onMouseMove={magnet.onMove}
                onMouseLeave={magnet.onLeave}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
                }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <motion.div className="p-6" variants={sectionIn}>
                  <motion.div
                    className="text-lg font-extrabold leading-snug"
                    variants={fadeUp}
                    custom={0}
                  >
                    Trusted And Reliable <br />
                    Waste Collection!
                  </motion.div>

                  <motion.p
                    className="mt-3 text-sm text-white/85 leading-relaxed"
                    variants={fadeUp}
                    custom={1}
                  >
                    We offer customers regular collection of trash, on a scheduled
                    or call-in basis, with a safe level of service.
                  </motion.p>

                  <motion.div
                    className="mt-5 space-y-3 text-sm"
                    variants={sectionIn}
                  >
                    <motion.div
                      className="flex items-start gap-3"
                      variants={fadeUp}
                      custom={2}
                    >
                      <Phone size={16} className="mt-[2px]" />
                      <div>
                        <a
                          className="hover:text-[#F9A826] transition-colors font-semibold"
                          href={`tel:${site.phoneDigits}`}
                        >
                          {site.phoneAltDisplay}
                        </a>
                        <div className="text-white/80">
                          <a
                            className="hover:text-[#F9A826] transition-colors font-semibold"
                            href={`tel:${site.phoneDigits}`}
                          >
                            {site.phoneDisplay}
                          </a>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-3 text-white/90"
                      variants={fadeUp}
                      custom={3}
                    >
                      <Mail size={16} />
                      <a
                        className="hover:text-[#F9A826] transition-colors font-semibold"
                        href={`mailto:${site.email}`}
                      >
                        {site.email}
                      </a>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-3 text-xs text-white/80"
                      variants={fadeUp}
                      custom={4}
                    >
                      <MapPin size={14} />
                      <span>EPZ Building, Kitengela.</span>
                    </motion.div>
                  </motion.div>

                  <motion.div className="mt-6" variants={fadeUp} custom={5}>
                    <Link to="/contact" className="group block">
                      <motion.div
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                      >
                        <Button className="w-full !bg-[#1B6B1B] !text-white hover:!bg-[#165B16]">
                          <span className="inline-flex items-center justify-center gap-2">
                            Contact Our Team
                            <ArrowSwap size={18} color="#ffffff" />
                          </span>
                        </Button>
                      </motion.div>
                    </Link>
                  </motion.div>
                </motion.div>

                {/* subtle overlay */}
                <motion.div
                  className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle_at_top,white,transparent_55%)] pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, ease: EASE_OUT }}
                />
              </motion.div>
            </motion.aside>

            {/* RIGHT MAIN CONTENT */}
            <motion.main variants={sectionIn}>
              <motion.div
                className="text-sm font-semibold text-slate-900"
                variants={fadeUp}
                custom={0}
              >
                Overview :{" "}
                <span className="text-[#1B6B1B]">{service.overviewTitle}</span>
              </motion.div>

              <motion.div
                className="mt-4 text-sm text-slate-600 leading-relaxed max-w-3xl"
                variants={fadeUp}
                custom={1}
              >
                {service.overviewText}
              </motion.div>

              {/* ✅ HERO SLIDER (change only) */}
              <motion.div className="mt-6 relative" variants={fadeUp} custom={2}>
                <ServiceHeroSlider
                  title={service.title}
                  images={
                    service.heroImage?.length
                      ? service.heroImage
                      : service.galleryImages?.length
                      ? service.galleryImages.slice(0, 3)
                      : []
                  }
                />

                {/* Bottom overlay */}
                <motion.div
                  className="absolute left-6 bottom-6 flex overflow-hidden shadow-lg"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.8,
                    ease: EASE_OUT,
                    delay: 0.05,
                  }}
                >
                  <Link to="/request-pickup" className="flex cursor-pointer">
                    <div className="bg-[#2E6B2E] px-6 py-5 text-white text-xs font-semibold">
                      Wise Waste Services
                    </div>

                    <div className="bg-[#1B6B1B] px-6 py-5 text-white text-xs font-semibold flex items-center justify-center">
                      <Phone size={16} />
                    </div>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Extra paragraph + mini gallery */}
              <motion.div
                className="mt-6 text-sm text-slate-600 leading-relaxed"
                variants={fadeUp}
                custom={3}
              >
                At Wise Waste Limited, we conduct onsite waste management audits
                in order to create the best alternatives for you, including
                correct NEMA-approved garbage bags and containers, with cost and
                efficiency always at the forefront of our decision-making.
              </motion.div>

              {service.galleryImages?.length ? (
                <motion.div
                  className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.12 } },
                  }}
                >
                  {service.galleryImages.map((src, idx) => (
                    <motion.div
                      key={idx}
                      className="border border-slate-200 overflow-hidden"
                      variants={cardIn}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.45, ease: EASE_OUT }}
                    >
                      <motion.img
                        src={src}
                        alt={`Gallery ${idx + 1}`}
                        className="h-[200px] w-full object-cover"
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.7, ease: EASE_OUT }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : null}

              {/* Included bullets */}
              <motion.div variants={fadeUp} custom={4}>
                <KeyBenefits />
              </motion.div>

              {/* Bottom CTA line (CENTERED) */}
              <motion.section
                className="mt-10 border-t border-slate-200 pt-8"
                variants={fadeUp}
                custom={5}
              >
                <div className="mx-auto max-w-3xl text-sm text-slate-700 leading-relaxed text-center">
                  We have a range of business waste disposal services to suit
                  your needs and get all waste removed. Whatever the waste
                  management needs are, we’ve got a solution that will suit you.{" "}
                  <Link
                    to="/contact"
                    className="group inline-flex items-center justify-center gap-2 font-semibold transition-colors"
                    style={{ color: GREEN }}
                  >
                    <span className="group-hover:opacity-90 transition-opacity duration-200">
                      Request A Quote
                    </span>
                    <ArrowSwap size={18} color={GREEN} />
                  </Link>
                </div>
              </motion.section>
            </motion.main>
          </motion.div>
        </Container>
      </motion.section>
    </motion.div>
  );
}

/* ---------------------------
   HERO SLIDER (new, change only)
---------------------------- */
function ServiceHeroSlider({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const safeImages = images.filter(Boolean);
  const slideCount = safeImages.length;

  // If only one image (or none), fallback to single image block
  if (slideCount <= 1) {
    const src = safeImages[0];
    return (
      <motion.div className="overflow-hidden border border-slate-200" variants={imgIn}>
        {src ? (
          <motion.img
            src={src}
            alt={title}
            className="w-full h-[320px] md:h-[380px] object-cover"
            loading="lazy"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            // render normal, zoom mostly on hover
            whileHover={{ scale: 1.03 }}
          />
        ) : (
          <div className="w-full h-[320px] md:h-[380px] bg-slate-100" />
        )}
      </motion.div>
    );
  }

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);

  const timerRef = useRef<number | null>(null);

  // Optional per-slide timings
  const slideTimings = [5200, 4600, 6400];
  const DEFAULT_TIMING = 5200;
  const currentDelay = slideTimings[index] ?? DEFAULT_TIMING;

  const clampIndex = (i: number) => (i + slideCount) % slideCount;

  const goTo = (nextIndex: number, dir: 1 | -1) => {
    setDirection(dir);
    setIndex(clampIndex(nextIndex));
  };

  const next = () => goTo(index + 1, 1);
  const prev = () => goTo(index - 1, -1);

  // Swipe config
  const SWIPE_CONFIDENCE = 70;

  // Auto-slide + pause on hover/touch
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

  // Gentle slide animation (no default zoom)
  const slideVariants = {
    enter: (dir: 1 | -1) => ({
      opacity: 0,
      x: dir === 1 ? 22 : -22,
      scale: 1,
      filter: "blur(8px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (dir: 1 | -1) => ({
      opacity: 0,
      x: dir === 1 ? -22 : 22,
      scale: 1,
      filter: "blur(8px)",
    }),
  };

  return (
    <div
      className="relative overflow-hidden border border-slate-200"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="relative w-full h-[320px] md:h-[380px] bg-slate-200">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.85, ease: EASE_OUT }}
            className="absolute inset-0"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              const swipePower =
                Math.abs(info.offset.x) + Math.abs(info.velocity.x) * 0.2;

              if (info.offset.x < -SWIPE_CONFIDENCE || swipePower > 260) next();
              else if (info.offset.x > SWIPE_CONFIDENCE || swipePower > 260) prev();
            }}
          >
            <motion.img
              src={safeImages[index]}
              alt={`${title} hero ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Manual arrows */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous image"
          className="
            absolute left-3 top-1/2 -translate-y-1/2 z-20
            h-11 w-11 rounded-full
            bg-white/10 border border-white/20
            text-white flex items-center justify-center
            hover:bg-white/15 transition backdrop-blur
          "
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="
            absolute right-3 top-1/2 -translate-y-1/2 z-20
            h-11 w-11 rounded-full
            bg-white/10 border border-white/20
            text-white flex items-center justify-center
            hover:bg-white/15 transition backdrop-blur
          "
        >
          <ChevronRight size={22} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
          {safeImages.map((_, i) => (
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

        {/* paused hint */}
        {paused && (
          <div className="absolute bottom-4 left-4 z-20 text-[11px] font-semibold text-white/85">
            Paused
          </div>
        )}
      </div>
    </div>
  );
}
