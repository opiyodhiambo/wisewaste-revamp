import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Container from "../ui/Container";
import { Link } from "react-router-dom";
import { Quote, Star } from "lucide-react";
 
import vehicle3 from "../../assets/vehicle32.jpeg";
import vehicle2 from "../../assets/vehicle2.jpeg";
import vehicle4 from "../../assets/vehicle31.jpeg";
import people from "../../assets/people.png";
import bin from "../../assets/bins.png";
 
const GREEN = "#1B6B1B";
const DARK = "#0B3D2E";
const ORANGE = "#F9A826";
 
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SLIDE_MS = 3200;
 
const v = {
  section: {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
  },
  itemUp: {
    hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: EASE_OUT },
    },
  },
  itemLeft: {
    hidden: { opacity: 0, x: -22, filter: "blur(8px)" },
    show: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: EASE_OUT },
    },
  },
  itemRight: {
    hidden: { opacity: 0, x: 22, filter: "blur(8px)" },
    show: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: EASE_OUT },
    },
  },
  band: {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
  },
  pop: {
    hidden: { opacity: 0, y: 18, scale: 0.985, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: EASE_OUT },
    },
  },
} satisfies Record<string, Variants>;
 
/** Faint hex/grid texture for the white top section, same motif family used across the site */
function TopBackdrop() {
  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      viewBox="0 0 1440 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="industriesGrid" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(11,61,46,0.03)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1440" height="500" fill="url(#industriesGrid)" />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "1320px 90px" }}
      >
        <polygon
          points="1320,45 1364,70 1364,118 1320,143 1276,118 1276,70"
          fill="none"
          stroke="rgba(249,168,38,0.18)"
          strokeWidth="2"
        />
      </motion.g>
    </svg>
  );
}
 
/** Hex/grid texture for the green band, tuned for a darker surface */
function BandBackdrop() {
  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      viewBox="0 0 1440 320"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="bandGrid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1440" height="320" fill="url(#bandGrid)" />
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "160px 250px" }}
      >
        <polygon
          points="160,205 200,228 200,272 160,295 120,272 120,228"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="2"
        />
      </motion.g>
    </svg>
  );
}
 
/** Simple reusable image slider */
function ImageSlider({
  images,
  alt,
  className,
}: {
  images: string[];
  alt: string;
  className: string;
}) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
 
  useEffect(() => {
    if (paused || images.length <= 1) return;
    const t = setInterval(() => {
      setDir(1);
      setActive((i) => (i + 1) % images.length);
    }, SLIDE_MS);
    return () => clearInterval(t);
  }, [paused, images.length]);
 
  const slideV: Variants = {
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
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden">
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
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          />
        </AnimatePresence>
      </div>
 
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to image ${idx + 1}`}
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
      )}
    </div>
  );
}
 
export default function IndustriesBand() {
  const partnerLogos = [
    { src: "/logos/satnavilla.png", alt: "Santa Villa" },
    { src: "/logos/kapiti.png", alt: "Kapiti Estates" },
    { src: "/logos/voltex.png", alt: "Voltex Commodities" },
    { src: "/logos/diamondclad.png", alt: "DiamondClad Security" },
    { src: "/logos/purecore.png", alt: "PureCore Hygiene" },
    { src: "/logos/ncba.png", alt: "NCBA" },
    { src: "/logos/isuzu.png", alt: "Isuzu" },
    { src: "/logos/hino.jpeg", alt: "Hino" },
    { src: "/logos/nissan.png", alt: "Nissan" },
  ];
 
  const marquee = [...partnerLogos, ...partnerLogos];
 
  const topImages = useMemo(() => [vehicle3, vehicle2, vehicle4], []);
  // ✅ local assets only now, no external stock imagery
  const bigImages = useMemo(() => [people, bin, vehicle4], []);
 
  return (
    <section className="relative bg-white overflow-hidden">
      <TopBackdrop />
 
      {/* TOP MINI SPLIT */}
      <Container className="relative pt-12 md:pt-16">
        <motion.div
          variants={v.section}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-8 lg:grid-cols-2 items-start"
        >
          {/* left image slider, collage-framed to match the rest of the site */}
          <motion.div variants={v.itemLeft} className="relative flex justify-center lg:justify-start">
            <div
              className="absolute -inset-3 rounded-2xl -rotate-2 hidden sm:block"
              style={{ backgroundColor: "rgba(27,107,27,0.08)" }}
            />
            <ImageSlider
              images={topImages}
              alt="Waste collection operations"
              className="relative w-full max-w-[400px] h-[280px] rounded-2xl object-cover shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
            />
          </motion.div>
 
          {/* right copy */}
          <motion.div variants={v.itemRight} className="lg:pt-2">
            <div className="text-[11px] font-semibold text-slate-500">
              Leading Urban Mining & Recovery Provider in Kenya
            </div>
            <h3 className="mt-2 text-2xl md:text-3xl font-extrabold leading-tight" style={{ color: DARK }}>
              From Collection To Recovery, <br className="hidden sm:block" />
              We Handle The Full Chain
            </h3>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed max-w-xl">
              Our commitment to resource recovery sets us apart. We consistently introduce practices
              that recover more material and send less to landfill. A customer-first philosophy keeps
              us responsive to the diverse needs of homes, businesses, and institutions across every
              stream we handle.
            </p>
          </motion.div>
        </motion.div>
      </Container>
 
      {/* GREEN BAND */}
      <div className="relative mt-10 md:mt-14">
        <motion.div
          variants={v.band}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative w-full overflow-hidden"
          style={{ backgroundColor: GREEN }}
        >
          <BandBackdrop />
 
          <Container className="relative py-12 md:py-14">
            <motion.div
              variants={v.section}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="grid gap-8 lg:grid-cols-2 items-start text-white"
            >
              <motion.div variants={v.itemLeft} className="lg:pt-4">
                <h3 className="text-lg md:text-xl font-extrabold leading-snug">
                  Serving Every Industry <br />
                  And Every Type Of Facility
                </h3>
              </motion.div>
 
              <motion.div variants={v.itemRight} className="text-sm leading-relaxed text-white/90">
                <p>
                  Every team member is equipped with the right protective gear for the material they're
                  handling, whether that's household waste, e-waste, or scrap metal. Safety scales with
                  the job.
                </p>
                <p className="mt-4 text-white/80">
                  We offer reliable, scheduled or call-in collection and recovery, with the same
                  consistent standard across every industry we serve.
                </p>
              </motion.div>
            </motion.div>
          </Container>
        </motion.div>
 
        {/* OVERLAPPING IMAGE + TRUST CARD */}
        <Container className="relative">
          <div className="relative -mt-10 md:-mt-14 lg:-mt-16 pb-10">
            <motion.div
              variants={v.section}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.22 }}
              className="grid gap-6 lg:grid-cols-[520px_1fr] items-start"
            >
              {/* big image slider */}
              <motion.div variants={v.itemLeft} className="flex justify-center lg:justify-start">
                <ImageSlider
                  images={bigImages}
                  alt="Recovery and sorting operations"
                  className="w-full max-w-[560px] rounded-2xl object-cover shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
                />
              </motion.div>
 
              {/* unified trust card */}
              <motion.div variants={v.itemRight} className="lg:pt-16">
                <motion.div
                  variants={v.pop}
                  className="w-full max-w-[420px] rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.18)] border border-slate-100"
                >
                  {/* rating strip */}
                  <div
                    className="flex items-center gap-3 px-5 py-4 text-white"
                    style={{ backgroundColor: DARK }}
                  >
                    <div className="flex items-center gap-1" style={{ color: ORANGE }}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} size={14} fill={ORANGE} strokeWidth={0} />
                      ))}
                    </div>
                    <div className="text-[11px] leading-snug text-white/90">
                      Rated by clients across four counties for reliable recovery and collection.
                    </div>
                  </div>
 
                  {/* quote block */}
                  <div className="bg-white p-5">
                    <Quote size={20} style={{ color: "rgba(27,107,27,0.35)" }} />
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                      Great company and service. The team was punctual and professional, and it's clear
                      they take waste recovery seriously, not just collection.
                    </p>
 
                    <div className="mt-4">
                      <Link
                        to="/contact"
                        className="group relative inline-flex text-sm font-bold text-[#1B6B1B] hover:text-[#F9A826] transition-colors"
                      >
                        Contact Us Now
                        <span
                          className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(249,168,38,0) 0%, rgba(249,168,38,0.95) 40%, rgba(249,168,38,0) 100%)",
                          }}
                        />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
 
            {/* Partner logos marquee */}
            <div className="mt-12 opacity-90">
              <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-white/0 z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-white/0 z-10" />
 
                <motion.div
                  animate={{ x: ["-50%", "0%"] }}
                  transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                  className="flex items-center gap-12 will-change-transform"
                >
                  {marquee.map((p, idx) => (
                    <div key={`${p.alt}-${idx}`} className="flex items-center justify-center shrink-0">
                      <img
                        src={p.src}
                        alt={p.alt}
                        className="h-8 md:h-9 lg:h-10 w-auto object-contain"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
 
              <div className="mt-4 text-center text-[11px] text-slate-500">
                Trusted by partners across Kenya.
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}