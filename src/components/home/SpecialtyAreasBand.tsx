import { Link } from "react-router-dom";
import Container from "../ui/Container";
import { ArrowUpRight, ArrowRight, ChevronLeft,  ChevronRight} from "lucide-react";
import {
  ShieldCheck,
  BadgeDollarSign,
  ThumbsUp,
  Leaf,
  BadgeCheck,
  Recycle,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

import bin from "../../assets/bins.png"
import ewaste from "../../assets/ewaste.png"
import manure from "../../assets/manure.png"
import green_energy from "../../assets/people.png"
import vehicle14 from "../../assets/vehicle14.jpeg";
import { useEffect, useState } from "react";

const GOLD = "#B38C00";


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
    desc: "Scheduled residential, commercial and industrial waste collection with efficient sorting to maximize material recovery.",
    to: "/services/garbage-collection",
    image: bin,
  },
  {
    title: "Plastic, Metal & E-Waste Recycling",
    desc: "Recovering valuable plastics, metals and electronic waste through environmentally responsible recycling processes.",
    to: "/services/recycling/plastic-recycling",
    image: ewaste,
  },
  {
    title: "Compost Manure Production",
    desc: "Organic waste is transformed into nutrient rich compost that supports sustainable agriculture and healthier soils.",
    to: "/services/compost-manure",
    image: manure,
  },
  {
    title: "Green Energy Solutions",
    desc: "Converting organic waste into renewable energy sources that reduce landfill dependence while supporting a cleaner future.",
    to: "/services/green-energy",
    image: green_energy,
  },
  {
    title: "Trading & Export",
    desc: "Recovered materials are processed to international standards and supplied to local and global recycling markets.",
    to: "/services/export",
    image: vehicle14,
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
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % cards.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setActive((i) => (i - 1 + cards.length) % cards.length);

  const next = () =>
    setActive((i) => (i + 1) % cards.length);

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
          className="relative mt-10 md:mt-12"
        >
          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
          >
            <ChevronRight size={20} />
          </button>

          <div className="overflow-hidden px-12">
            <motion.div
              animate={{
                x: `-${active * 100}%`,
              }}
              transition={{
                duration: 0.6,
                ease: EASE_OUT,
              }}
              className="flex"
            >
              {cards.map((c) => (
                <div
                  key={c.title}
                  className="min-w-full flex justify-center"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                    }}
                    className="group w-full max-w-5xl bg-white border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] rounded-md overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-1/2 p-4">
                        <div className="overflow-hidden rounded-sm h-60 md:h-80 bg-slate-200">
                          <motion.img
                            src={c.image}
                            alt={c.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.45 }}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="md:w-1/2 p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-extrabold text-[#0B3D2E]">
                          {c.title}
                        </h3>

                        <p className="mt-4 text-[15px] leading-7 text-slate-600">
                          {c.desc}
                        </p>

                        <div className="mt-8">
                          <Link
                            to={c.to}
                            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#1B6B1B] hover:text-[#F9A826] transition"
                          >
                            Explore More

                            <ArrowRight
                              size={18}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {cards.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={[
                  "h-2.5 rounded-full transition-all duration-300",
                  idx === active
                    ? "w-10 bg-white"
                    : "w-2.5 bg-white/40 hover:bg-white/70",
                ].join(" ")}
              />
            ))}
          </div>
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
