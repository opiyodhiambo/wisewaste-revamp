import Container from "../ui/Container";
import { Link } from "react-router-dom";
import { ArrowUpRight, Cpu, Recycle, Layers, Gem } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const GOLD = "#B38C00";
const DARK = "#0B3D2E";

// typed easing tuple (prevents "number[]" TS error)
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Consistent section animation: slower, softer, slight blur
const containerV: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.08,
    },
  },
};

const itemV: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

// What actually gets recovered — this is the signature element.
// Real content, not decoration: it tells the reader what "urban mining" means here.
const streams = [
  { label: "E-Waste", icon: Cpu },
  { label: "Plastics", icon: Recycle },
  { label: "Metals", icon: Layers },
  { label: "Minerals", icon: Gem },
];

/** Faint mineral-lattice watermark, quiet enough for a white section */
function LatticeBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="introLattice" width="80" height="80" patternUnits="userSpaceOnUse">
          <path
            d="M40 4 L74 22 L74 58 L40 76 L6 58 L6 22 Z"
            fill="none"
            stroke="rgba(11,61,46,0.05)"
            strokeWidth="1.5"
          />
        </pattern>
      </defs>
      <rect width="1200" height="400" fill="url(#introLattice)" />
    </svg>
  );
}

export default function CenteredIntro() {
  return (
    <section className="relative bg-white border-t border-slate-200 border-b border-slate-200 overflow-hidden">
      <LatticeBackdrop />

      <Container className="relative py-14 md:py-20">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {/* tiny kicker */}
          <motion.div
            variants={itemV}
            className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold tracking-wide uppercase"
            style={{ color: GREEN }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
            What Looks Like Waste Is Still Worth Something
          </motion.div>

          {/* big title */}
          <motion.h2
            variants={itemV}
            className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
            style={{ color: DARK }}
          >
            Turning Everyday Waste{" "}
            <br className="hidden sm:block" />
            Into Recoverable Value
          </motion.h2>

          {/* description */}
          <motion.p
            variants={itemV}
            className="mt-6 text-sm md:text-[15px] leading-relaxed text-slate-600 max-w-2xl mx-auto"
          >
            Every load we take in gets a second look before it gets a second life.
            We sort, recover, and reprocess material streams that most collection
            services would simply bury, feeding what's still valuable back into
            industrial supply chains instead of a landfill.{" "}
            <Link
              to="/about"
              className="group inline-flex items-center gap-1 font-bold underline underline-offset-4 transition-colors"
              style={{ color: GREEN }}
              onMouseEnter={(e) => (e.currentTarget.style.color = ORANGE)}
              onMouseLeave={(e) => (e.currentTarget.style.color = GREEN)}
            >
              How Recovery Works{" "}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[1px]"
              />
            </Link>
          </motion.p>

          {/* material stream chips — the signature element */}
          <motion.div
            variants={itemV}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {streams.map(({ label, icon: Icon }) => (
              <motion.div
                key={label}
                whileHover={{ y: -4, borderColor: GOLD }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs md:text-sm font-semibold text-slate-700 cursor-default"
              >
                <Icon size={16} style={{ color: GREEN }} />
                {label}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
