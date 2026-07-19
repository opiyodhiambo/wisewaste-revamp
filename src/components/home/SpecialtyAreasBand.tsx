import { Link } from "react-router-dom";
import Container from "../ui/Container";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import {
  ShieldCheck,
  BadgeDollarSign,
  ThumbsUp,
  Leaf,
  BadgeCheck,
  Recycle,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

import vehicle2 from "../../assets/vehicle2.jpeg";
import worker1 from "../../assets/worker1.jpg";
import vehicle36 from "../../assets/vehicle36.jpeg";

const GOLD = "#B38C00";
const GREEN = "#1B6B1B";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const topItems = [
  { title: "Reliable &\nTrustworthy", icon: ShieldCheck },
  { title: "Efficient\n& Low Cost", icon: BadgeDollarSign },
  { title: "Ensure\nSatisfaction", icon: ThumbsUp },
  { title: "Green\nEconomy", icon: Leaf },
  { title: "Certified\nRecovery\nExperts", icon: BadgeCheck },
  { title: "Sustainable\nRecovery", icon: Recycle },
];

const cards = [
  {
    title: "Garbage Collection & Sorting",
    desc: "We collect residential and commercial waste on schedule, then sort it at source to feed clean, recoverable streams into processing.",
    to: "/services",
    image: vehicle2,
  },
  {
    title: "E-Waste, Plastic & Metal Recycling",
    desc: "Electronics, plastics, and scrap metal are recovered and reprocessed, keeping valuable material in circulation instead of landfill.",
    to: "/services",
    image: vehicle36,
  },
  {
    title: "Trading & Export of Recovered Materials",
    desc: "Recovered industrial materials and precious minerals are traded and exported, connecting our recovery chain to real market demand.",
    to: "/services",
    image: worker1,
  },
];

/** Subtle hex/grid texture on top of the gold field, tying back to the hero motif */
function GoldBackdrop() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 620"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="specialtyGrid" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="1440" height="620" fill="url(#specialtyGrid)" />

      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "1260px 90px" }}
      >
        <polygon
          points="1260,40 1310,68 1310,124 1260,152 1210,124 1210,68"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="2"
        />
      </motion.g>

      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 130, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "120px 480px" }}
      >
        <polygon
          points="120,430 168,457 168,511 120,538 72,511 72,457"
          fill="none"
          stroke="rgba(11,61,46,0.22)"
          strokeWidth="2"
        />
      </motion.g>

      <motion.circle
        cx="720"
        cy="80"
        r="120"
        fill="none"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="1"
        animate={{ r: [120, 132, 120] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function SpecialtyAreasBand() {
  const containerV: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.085, delayChildren: 0.05 } },
  };

  const itemV: Variants = {
    hidden: { opacity: 0, y: 18, scale: 0.98, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: EASE_OUT },
    },
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Gold background, same color as before */}
      <div className="absolute inset-0" style={{ backgroundColor: GOLD }} />

      {/* SVG texture layer */}
      <GoldBackdrop />

      {/* White curved shape */}
      <div className="absolute left-0 right-0 bottom-[-1px]">
        <svg viewBox="0 0 1440 180" className="w-full h-[120px] md:h-[160px]">
          <path
            fill="white"
            d="M0,120 C240,190 480,190 720,140 C960,90 1200,90 1440,140 L1440,180 L0,180 Z"
          />
        </svg>
      </div>

      <Container className="relative pt-10 md:pt-12 pb-16 md:pb-24">
        {/* Top icon row */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-wrap items-start justify-center lg:justify-between gap-x-10 gap-y-6 text-white"
        >
          {topItems.map((x) => {
            const Icon = x.icon;
            return (
              <motion.div
                key={x.title}
                variants={itemV}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                className="flex items-start gap-3 min-w-[140px] cursor-default"
              >
                <div className="h-11 w-11 bg-white/10 flex items-center justify-center">
                  <Icon aria-hidden size={22} className="text-white" />
                </div>

                <div className="font-semibold leading-tight whitespace-pre-line">
                  {x.title}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 md:mt-12 grid gap-6 lg:grid-cols-3"
        >
          {cards.map((c) => (
            <motion.div
              key={c.title}
              variants={itemV}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="group bg-white border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden rounded-md"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image block */}
                <div className="md:w-[52%] p-3 md:p-4">
                  <div className="overflow-hidden bg-slate-200 rounded-sm h-44 md:h-[210px] lg:h-[220px]">
                    <motion.img
                      src={c.image}
                      alt={c.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      initial={{ scale: 1.04 }}
                      whileHover={{ scale: 1.12 }}
                      transition={{ duration: 0.5, ease: EASE_OUT }}
                    />
                  </div>
                </div>

                {/* Content block */}
                <div className="md:w-[48%] p-5 md:p-5 md:pl-0 flex flex-col justify-center">
                  <h3 className="text-lg md:text-xl font-extrabold text-[#0B3D2E]">
                    {c.title}
                  </h3>

                  <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-slate-600 line-clamp-3">
                    {c.desc}
                  </p>

                  <div className="mt-4">
                    <Link
                      to={c.to}
                      className="group inline-flex items-center gap-2 text-sm font-extrabold transition-colors duration-200 text-[#1B6B1B] hover:text-[#F9A826]"
                    >
                      <span>Explore More</span>

                      <span className="inline-flex items-center">
                        <span className="group-hover:hidden">
                          <ArrowUpRight size={18} />
                        </span>
                        <span className="hidden group-hover:inline">
                          <ArrowRight size={18} />
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom paragraph + link */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-10 md:mt-12 max-w-4xl mx-auto text-center text-white/90"
        >
          <motion.p
            variants={itemV}
            className="text-sm md:text-base font-semibold leading-relaxed"
          >
            Our operations span collection and sorting, e-waste, plastic and metal
            recycling, green energy generation, green manure, and the trading and
            export of recovered materials. Every stream is tailored for commercial,
            organizational, and residential clients alike.
          </motion.p>

          <motion.div variants={itemV} className="mt-4">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 font-extrabold underline underline-offset-8 transition-all duration-200"
            >
              <span
                className="
                  text-[#1B6B1B]
                  transition-all duration-200
                  group-hover:text-white
                  group-hover:font-black
                "
              >
                Our Specialty Areas
              </span>

              <span className="inline-flex items-center">
                <span className="text-[#1B6B1B] group-hover:hidden">
                  <ArrowUpRight size={18} />
                </span>

                <span className="hidden group-hover:inline text-white">
                  <ArrowRight size={18} />
                </span>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
