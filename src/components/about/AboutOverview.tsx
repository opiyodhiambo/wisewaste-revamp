import Container from "../ui/Container";
import { Check, Gem } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useRef } from "react";

import vehicle6 from "../../assets/vehicle6.jpeg";

const GREEN = "#1B6B1B";
const GOLD = "#B38C00";
const DARK = "#0B3D2E";
const DARK_2 = "#0F4A38";
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Dark hex/mineral backdrop, replaces the photo slider */
function OverviewBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 700 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="overviewBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={DARK} />
          <stop offset="100%" stopColor={DARK_2} />
        </linearGradient>
        <pattern id="overviewGrid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="700" height="700" fill="url(#overviewBg)" />
      <rect width="700" height="700" fill="url(#overviewGrid)" />

      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "540px 160px" }}
      >
        <polygon
          points="540,100 590,128 590,184 540,212 490,184 490,128"
          fill="none"
          stroke={GOLD}
          strokeOpacity="0.3"
          strokeWidth="2"
        />
      </motion.g>

      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 130, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "140px 560px" }}
      >
        <polygon
          points="140,500 190,528 190,584 140,612 90,584 90,528"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="2"
        />
      </motion.g>

      <motion.circle
        cx="350"
        cy="380"
        r="150"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        animate={{ r: [150, 164, 150] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function AboutOverview() {
  const sectionRef = useRef<HTMLElement | null>(null);

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

  return (
    <section ref={sectionRef as any} className="bg-white overflow-hidden">
      <Container className="py-12 md:py-16">
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] items-start"
        >
          {/* LEFT SIDE — copy */}
          <motion.div variants={containerV} className="lg:pt-2 lg:order-1">
            <motion.span
              variants={itemV}
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
              style={{ backgroundColor: "rgba(27,107,27,0.1)", color: GREEN }}
            >
              Mission: Urban Mining Experts
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
                style={{ color: GREEN }}
              >
                1M plus
              </motion.span>{" "}
              Households
            </motion.h2>

            <motion.p
              variants={itemV}
              className="mt-6 text-sm leading-relaxed font-semibold text-slate-700"
            >
              We are a leading urban mining company in Nairobi, recovering
              materials from waste rather than simply disposing of it. Our
              operations turn discarded resources back into usable, tradeable
              material, keeping them in circulation instead of in landfills.
            </motion.p>

            <motion.p variants={itemV} className="mt-6 text-sm leading-relaxed text-slate-600">
              Our work spans e-waste recycling, plastic and metal recovery,
              collection and sorting, green energy generation, and the trading
              and export of recovered industrial materials and minerals. Our
              team of experienced professionals is dedicated to ensuring every
              material stream is recovered and put back to productive use.
            </motion.p>

            {/* CHECKLIST */}
            <motion.div variants={itemV} className="mt-8 border-t border-slate-200">
              <CheckRow text="Experts in Urban Mining & Industrial Waste Recovery" />
              <div className="border-t border-slate-200" />
              <CheckRow text="From collection to export: one recovery chain, fully managed" />
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE — SVG backdrop, replaces the photo slider */}
          <motion.div variants={cardV} className="relative lg:order-2">
            <div className="relative rounded-md overflow-hidden h-[280px] sm:h-[360px] lg:h-[460px]">
              <OverviewBackdrop />

              {/* watermark icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Gem size={180} className="text-white" />
              </div>

              {/* mission chip overlay */}
              <div className="absolute left-6 bottom-6 right-6 sm:right-auto">
                <div className="inline-flex flex-col gap-1 bg-white/10 backdrop-blur border border-white/15 rounded-lg px-5 py-4 max-w-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: GOLD }}>
                    Our Mission
                  </span>
                  <span className="text-white text-sm font-semibold leading-snug">
                    Urban Mining Experts, turning discarded material into recovered value.
                  </span>
                </div>
              </div>

              {/* small photo accent, kept but no longer the section background */}
              <div className="absolute top-6 right-6 hidden sm:block h-20 w-28 rounded-md overflow-hidden border border-white/15 shadow-lg">
                <img src={vehicle6} alt="Recovery fleet on route" className="h-full w-full object-cover" />
              </div>
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

        <div className="text-sm font-semibold text-slate-800 cursor-pointer transition-colors duration-200 group-hover:text-[#F9A826]">
          {text}
        </div>
      </div>
    </motion.div>
  );
}
