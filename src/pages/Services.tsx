import { motion } from "framer-motion";
import Container from "../components/ui/Container";
import { services } from "../data/services";
import { Link } from "react-router-dom";
import ServicesHero from "../components/services/ServicesHero";
import MapSection from "../components/services/MapSection";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useState } from "react";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";

// Slow + natural
const EASE_OUT = [0.16, 1, 0.3, 1] as unknown as any;

const pageIn = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.45, ease: EASE_OUT } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_OUT, delay: i * 0.12 },
  }),
};

const gridStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const cardIn = {
  hidden: { opacity: 0, y: 16, filter: "blur(2px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

export default function Services() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <motion.div variants={pageIn} initial="hidden" animate="show" exit="exit">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        <ServicesHero />
      </motion.div>

      {/* Grid section */}
      <motion.section
        className="bg-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Container className="py-12 md:py-16">
          <motion.div className="max-w-2xl" variants={gridStagger}>
            <motion.div
              className="text-xs font-semibold tracking-wide"
              style={{ color: GREEN }}
              variants={fadeUp}
              custom={0}
            >
              Our Specialty Areas
            </motion.div>

            <motion.h2
              className="mt-3 text-2xl md:text-3xl font-extrabold text-[#0B3D2E]"
              variants={fadeUp}
              custom={1}
            >
              A Wide Range Of Services For Your Home And Business!
            </motion.h2>
          </motion.div>

         {/* Cards */}
<motion.div
  className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
  variants={gridStagger}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.2 }}
>
  {services.map((s) => {
    const isHovered = hoveredSlug === s.slug;
    const dimOthers = hoveredSlug && !isHovered;

    const Icon = (s as any).cardIcon; // from services.ts
    const hoverImage = (s as any).hoverImage;

    return (
      <motion.div
        key={s.slug}
        variants={cardIn}
        onMouseEnter={() => setHoveredSlug(s.slug)}
        onMouseLeave={() => setHoveredSlug(null)}
        animate={{
          opacity: dimOthers ? 0.72 : 1,
          scale: isHovered ? 1.01 : 1,
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
      >
        <Link
          to={`/services/${s.slug}`}
          className="
            group relative block overflow-hidden
            bg-white border border-slate-200
            shadow-[0_10px_30px_rgba(0,0,0,0.06)]
            hover:shadow-[0_22px_60px_rgba(0,0,0,0.14)]
            transition
            p-7
          "
        >
          {/* Hover background image + GREEN overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${hoverImage})` }}
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(27,107,27,0.85)" }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* top row: icon left + badge right */}
            <div className="flex items-start justify-between gap-4">
              <div className="h-12 w-12 flex items-center justify-center">
                {Icon ? (
                  <Icon
                    size={34}
                    strokeWidth={1.8}
                    className="
                      text-[#1B6B1B]
                      group-hover:text-white
                      transition-colors duration-300
                    "
                  />
                ) : null}
              </div>

              <div
                className="
                  text-[10px] font-semibold px-3 py-1 rounded-sm
                  bg-slate-100 text-slate-600
                  group-hover:bg-white/15 group-hover:text-white/95
                  transition-colors duration-300
                "
              >
                {s.categoryBadges?.join(", ")}
              </div>
            </div>

            {/* title */}
            <div
              className="
                mt-6 text-[18px] leading-snug font-extrabold
                text-[#0B3D2E]
                group-hover:text-white
                transition-colors duration-300
              "
            >
              {s.title}
            </div>

            {/* excerpt */}
            <p
              className="
                mt-3 text-sm leading-relaxed
                text-slate-600
                group-hover:text-white/90
                transition-colors duration-300
              "
            >
              {s.excerpt}
            </p>

            {/* bullets */}
            <div className="mt-5 space-y-2.5">
              {s.bullets.slice(0, 3).map((b) => (
                <div
                  key={b}
                  className="
                    flex items-start gap-2 text-sm
                    text-slate-700
                    group-hover:text-white/90
                    transition-colors duration-300
                  "
                >
                  <span
                    className="
                      mt-[3px] h-4 w-4 rounded-full flex items-center justify-center
                      bg-[#1B6B1B]/15
                      group-hover:bg-white/20
                      transition-colors duration-300
                    "
                  >
                    <span
                      className="
                        block h-2 w-2 rounded-full
                        bg-[#1B6B1B]
                        group-hover:bg-white
                        transition-colors duration-300
                      "
                    />
                  </span>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Explore More (orange on default; white on hover) */}
            <div
              className="
                mt-6 inline-flex items-center gap-2 text-sm font-semibold
                text-[#F9A826]
                group-hover:text-white
                transition-colors duration-300
              "
            >
              <span>Explore More</span>
              <span className="relative inline-flex w-[18px] h-[18px]">
                <span className="absolute inset-0 inline-flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-200">
                  <ArrowUpRight size={18} />
                </span>
                <span className="absolute inset-0 inline-flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowRight size={18} />
                </span>
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  })}
</motion.div>

        </Container>
      </motion.section>

      {/* Bottom CTA (centered text + centered arrow/icon) */}
      <motion.section
        className="border-t border-slate-200 bg-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <Container className="py-10">
          <motion.div
            className="mx-auto max-w-3xl text-sm text-slate-700 leading-relaxed text-center"
            variants={fadeUp}
            custom={0}
          >
            We have a range of business waste disposal services to suit your needs and get
            all waste removed. Whatever the waste management needs are, we’ve got a
            solution that will suit you.{" "}
            <motion.span className="inline-block">
              {/* ✅ FIXED Request CTA: uses group-hover for swap (no motion hover bugs) */}
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 font-semibold"
                style={{ color: GREEN }}
              >
                <span className="transition-opacity duration-200 group-hover:opacity-90">
                  Request A Quote
                </span>

                {/* Icon swap: ↗ (default) to → (hover) */}
                <span className="relative inline-flex w-[18px] h-[18px]">
                  {/* default ↗ (GREEN) */}
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0"
                    initial={false}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    <ArrowUpRight size={18} color={GREEN} />
                  </motion.span>

                  {/* hover → (ORANGE) */}
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                    initial={false}
                    animate={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    <ArrowRight size={18} color={ORANGE} />
                  </motion.span>
                </span>
              </Link>
            </motion.span>
          </motion.div>
        </Container>
      </motion.section>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        <MapSection />
      </motion.div>
    </motion.div>
  );
}
