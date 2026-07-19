import { useMemo, useState } from "react";
import Container from "../ui/Container";
import { ArrowUpRight, Gem } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, type Variants } from "framer-motion";

import vehicle10 from "../../assets/vehicle10.jpeg";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const DARK = "#0B2E22";
const DARK_2 = "#0F4A38";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const steps = [
  {
    title: "Tell Us About Your Material",
    desc: "Share what you're generating, e-waste, plastics, metals, or industrial scrap, along with location and volume, so we can plan intake.",
  },
  {
    title: "Choose A Recovery Plan",
    desc: "We match a plan and frequency to the type and volume of material you're producing, residential or commercial.",
  },
  {
    title: "Confirm & Pay",
    desc: "Plan-based pricing is confirmed upfront. No surprises once intake begins.",
  },
  {
    title: "We Recover, Sort & Reprocess",
    desc: "Material is sorted and processed on schedule, kept in circulation as a resource instead of buried as waste.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT, delay: i * 0.12 },
  }),
};

const panelIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

const listStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const stepItem: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(2px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: EASE_OUT },
  },
};

const underlineDraw: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.35, ease: EASE_OUT } },
};

/** Animated mineral-lattice backdrop for the dark side of the section */
function LatticeBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="howBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={DARK} />
          <stop offset="100%" stopColor={DARK_2} />
        </linearGradient>
        <pattern id="howGrid" width="52" height="52" patternUnits="userSpaceOnUse">
          <path d="M 52 0 L 0 0 0 52" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="800" height="800" fill="url(#howBg)" />
      <rect width="800" height="800" fill="url(#howGrid)" />

      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "620px 180px" }}
      >
        <polygon
          points="620,120 670,148 670,204 620,232 570,204 570,148"
          fill="none"
          stroke={ORANGE}
          strokeOpacity="0.2"
          strokeWidth="2"
        />
      </motion.g>

      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "150px 620px" }}
      >
        <polygon
          points="150,570 196,596 196,648 150,674 104,648 104,596"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="2"
        />
      </motion.g>

      <motion.circle
        cx="400"
        cy="480"
        r="160"
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="1"
        animate={{ r: [160, 172, 160] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function HowItWorksBand() {
  const [active, setActive] = useState(3);
  const a = useMemo(() => steps[active], [active]);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* LEFT SIDE — dark, SVG backdrop, intro copy */}
        <div className="relative overflow-hidden">
          <LatticeBackdrop />

          <Container className="relative">
            <motion.div
              className="pt-16 pb-14 lg:pt-20 lg:pb-24"
              variants={panelIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.div className="text-white/85 text-sm font-semibold" variants={fadeUp} custom={0}>
                See The Recovery Process
              </motion.div>

              <motion.h2
                className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-xl"
                variants={fadeUp}
                custom={1}
              >
                From Intake To Output, <br />
                In Four Steps
              </motion.h2>

              <motion.div className="mt-10 lg:mt-16 max-w-sm" variants={fadeUp} custom={2}>
                <p className="text-white/85 text-sm leading-relaxed font-semibold">
                  We sort and recover material streams, keeping resources in
                  circulation instead of buried as waste.
                </p>

                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <Link
                    to="/services"
                    className="group mt-6 inline-flex items-center justify-center gap-2 bg-white text-sm font-bold px-6 py-4 rounded-sm shadow-[0_18px_55px_rgba(0,0,0,0.35)] transition"
                    style={{ color: ORANGE }}
                  >
                    <motion.span
                      className="inline-flex"
                      initial={{ x: 0 }}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2, ease: EASE_OUT }}
                    >
                      <ArrowUpRight size={18} />
                    </motion.span>

                    <span className="relative">
                      Explore Recovery Services
                      <span
                        className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 opacity-0 transition duration-300 group-hover:scale-x-100 group-hover:opacity-100"
                        style={{ backgroundColor: GREEN }}
                      />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* small photo accent, kept but no longer the section background */}
              <motion.div
                className="mt-10 hidden sm:flex items-center gap-3"
                variants={fadeUp}
                custom={3}
              >
                <div className="h-16 w-24 rounded-md overflow-hidden border border-white/15 shadow-lg shrink-0">
                  <img src={vehicle10} alt="Recovery vehicle on site" className="h-full w-full object-cover" />
                </div>
                <p className="text-white/60 text-xs leading-snug max-w-[180px]">
                  Fleet on the ground, moving material from intake to processing.
                </p>
              </motion.div>
            </motion.div>
          </Container>
        </div>

        {/* RIGHT SIDE — green panel, step list */}
        <div className="relative" style={{ backgroundColor: GREEN }}>
          <Container className="relative">
            <div className="py-14 lg:py-20">
              <RightPanel active={active} setActive={setActive} a={a} />
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

function RightPanel({
  active,
  setActive,
  a,
}: {
  active: number;
  setActive: (i: number) => void;
  a: { title: string; desc: string };
}) {
  return (
    <motion.div
      className="grid gap-10 lg:grid-cols-[260px_1fr] items-start"
      variants={panelIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Step list */}
      <motion.div className="space-y-0" variants={listStagger} initial="hidden" animate="show">
        {steps.map((s, idx) => {
          const isActive = idx === active;
          return (
            <motion.button
              key={s.title}
              onClick={() => setActive(idx)}
              className="group w-full text-left"
              variants={stepItem}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
            >
              <div className="flex items-center gap-4 py-4">
                <motion.span
                  className="h-6 w-6 shrink-0 rounded-full bg-white flex items-center justify-center text-xs font-extrabold"
                  style={{ color: "#0B2E22" }}
                  animate={isActive ? { scale: 1.04 } : { scale: 1 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                >
                  {idx + 1}
                </motion.span>

                <span className="text-sm font-bold text-white relative">
                  {s.title}
                  <span
                    className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 opacity-0 transition duration-300 group-hover:scale-x-100 group-hover:opacity-100"
                    style={{ backgroundColor: ORANGE }}
                  />
                </span>
              </div>

              {idx !== steps.length - 1 && <div className="border-t border-white/20" />}

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key="active-bar"
                    className="h-[2px] w-16 -mt-[2px] origin-left"
                    style={{ backgroundColor: "rgba(255,255,255,0.75)" }}
                    variants={underlineDraw}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Active content */}
      <div className="relative min-h-[220px] sm:min-h-[180px]">
        <motion.div
          className="hidden lg:block absolute right-0 bottom-6 opacity-15"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.15, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <Gem size={96} className="text-white" />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
          >
            <motion.h3
              className="text-white text-xl font-extrabold max-w-md"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
            >
              {a.title}
            </motion.h3>

            <motion.p
              className="mt-4 text-white/90 text-sm leading-relaxed max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.05 }}
            >
              {a.desc}
            </motion.p>

            <div className="mt-6">
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Link to="/services" className="group inline-flex items-center gap-2 text-sm font-bold text-white transition-colors">
                  <span className="relative">
                    Explore More
                    <span
                      className="absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 opacity-0 transition duration-300 group-hover:scale-x-100 group-hover:opacity-100"
                      style={{ backgroundColor: ORANGE }}
                    />
                  </span>

                  <motion.span
                    className="inline-flex"
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    style={{ color: ORANGE }}
                  >
                    <ArrowUpRight size={18} />
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
