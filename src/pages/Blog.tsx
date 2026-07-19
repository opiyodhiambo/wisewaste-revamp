import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import Container from "../components/ui/Container";
import { blogPostsSorted } from "../data/blog";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const POSTS_PER_PAGE = 6;

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// Slow + natural presets
const pageIn = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.45, ease: EASE_OUT } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14, filter: "blur(2px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT, delay: i * 0.08 },
  }),
};

const gridStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.10, delayChildren: 0.05 } },
};

const cardIn = {
  hidden: { opacity: 0, y: 16, filter: "blur(2px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

// Arrow swap: ↗ -> → (stable using group-hover opacity)
function ArrowSwap({
  size = 18,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <span className="relative inline-flex w-[18px] h-[18px]">
      <span className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-200">
        <ArrowUpRight size={size} style={{ color }} />
      </span>
      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ArrowRight size={size} style={{ color }} />
      </span>
    </span>
  );
}

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const pageParam = Number(params.get("page") || "1");

  const totalPages = Math.max(1, Math.ceil(blogPostsSorted.length / POSTS_PER_PAGE));
  const page = clamp(isNaN(pageParam) ? 1 : pageParam, 1, totalPages);

  const start = (page - 1) * POSTS_PER_PAGE;
  const items = blogPostsSorted.slice(start, start + POSTS_PER_PAGE);

  const goTo = (p: number) => setParams({ page: String(p) });

  // “choose this card” hover behavior (dim siblings)
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <motion.div
      variants={pageIn}
      initial="hidden"
      animate="show"
      exit="exit"
      className="bg-white"
    >
      {/* HERO (grey band) */}
      <motion.section
        className="bg-[#BFC3BF]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        variants={gridStagger}
      >
        <Container className="py-10 md:py-14">
          <motion.h1
            className="text-white text-4xl md:text-5xl font-extrabold tracking-tight"
            variants={fadeUp}
            custom={0}
          >
            Our Blog
          </motion.h1>
          <motion.div
            className="mt-3 h-px w-20 bg-white/40"
            variants={fadeUp}
            custom={1}
          />
        </Container>
      </motion.section>

      {/* GRID - centered like screenshot */}
      <motion.section
        className="bg-white"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={gridStagger}
      >
        <Container className="py-12">
          <motion.div className="mx-auto max-w-5xl" variants={gridStagger}>
            <motion.div
              className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
              variants={gridStagger}
            >
              {items.map((p) => {
                const isHovered = hovered === p.slug;
                const dimOthers = hovered && !isHovered;

                return (
                  <motion.div
                    key={p.slug}
                    variants={cardIn}
                    onMouseEnter={() => setHovered(p.slug)}
                    onMouseLeave={() => setHovered(null)}
                    animate={{
                      opacity: dimOthers ? 0.72 : 1,
                      y: isHovered ? -6 : 0,
                      scale: isHovered ? 1.015 : 1,
                    }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                  >
                    <Link to={`/blog/${p.slug}`} className="group block">
                      {/* Image */}
                      <motion.div
                        className="relative overflow-hidden"
                        initial={false}
                        animate={{ borderRadius: isHovered ? 10 : 0 }}
                        transition={{ duration: 0.55, ease: EASE_OUT }}
                      >
                        <motion.img
                          src={p.cover}
                          alt={p.title}
                          className="h-44 w-full object-cover"
                          loading="lazy"
                          initial={false}
                          animate={{ scale: isHovered ? 1.05 : 1 }}
                          transition={{ duration: 0.9, ease: EASE_OUT }}
                        />

                        {/* category chip */}
                        <motion.div
                          className="absolute left-3 top-3"
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 0.75, ease: EASE_OUT, delay: 0.05 }}
                        >
                          <span
                            className="inline-flex items-center px-3 py-1 text-[11px] font-semibold text-white"
                            style={{ backgroundColor: GREEN }}
                          >
                            {p.category}
                          </span>
                        </motion.div>
                      </motion.div>

                      {/* Content */}
                      <motion.div
                        className="pt-3"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.35 }}
                        variants={gridStagger}
                      >
                        <motion.h3
                          className="text-[13px] font-semibold leading-snug text-[#0B2E22]"
                          variants={fadeUp}
                          custom={0}
                          style={{
                            color: isHovered ? GREEN : "#0B2E22",
                          }}
                        >
                          {p.title}
                        </motion.h3>

                        {/* Divider line (soft draw-in; not “orange line” heavy) */}
                        <motion.div
                          className="mt-4 h-px w-full bg-slate-200"
                          initial={{ scaleX: 0, transformOrigin: "left" }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 0.9, ease: EASE_OUT }}
                        />

                        <motion.div
                          className="mt-3 text-[11px]"
                          variants={fadeUp}
                          custom={1}
                        >
                          <span style={{ color: GREEN }}>{p.date}</span>{" "}
                          <span className="text-slate-300">•</span>{" "}
                          <span style={{ color: ORANGE }}>{p.author}</span>
                        </motion.div>

                        {/* Explore micro-cta (↗ -> → on hover, same GREEN) */}
                        <motion.div
                          className="mt-3 inline-flex items-center gap-2 text-[12px] font-semibold"
                          variants={fadeUp}
                          custom={2}
                          style={{ color: GREEN }}
                        >
                          <span className="opacity-90 group-hover:opacity-100 transition-opacity duration-200">
                            Read More
                          </span>
                          <span className="inline-flex items-center">
                            <ArrowSwap size={16} color={GREEN} />
                          </span>
                        </motion.div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Pagination */}
            <motion.div
              className="mt-10 flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
            >
              <motion.button
                onClick={() => goTo(page - 1)}
                disabled={page === 1}
                className={[
                  "group h-10 w-10 border border-slate-200 bg-white text-sm font-semibold",
                  "disabled:opacity-40 disabled:cursor-not-allowed",
                  "hover:border-[#1B6B1B] hover:text-[#1B6B1B]",
                ].join(" ")}
                aria-label="Previous page"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
              >
                <ChevronLeft className="mx-auto" size={18} />
              </motion.button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const p = idx + 1;
                const active = p === page;

                return (
                  <motion.button
                    key={p}
                    onClick={() => goTo(p)}
                    className={[
                      "h-10 w-10 border text-sm font-semibold transition",
                      active
                        ? "bg-[#1B6B1B] border-[#1B6B1B] text-white"
                        : "bg-white border-slate-200 text-slate-700 hover:border-[#1B6B1B] hover:text-[#1B6B1B]",
                    ].join(" ")}
                    aria-label={`Page ${p}`}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    {p}
                  </motion.button>
                );
              })}

              <motion.button
                onClick={() => goTo(page + 1)}
                disabled={page === totalPages}
                className={[
                  "group h-10 w-10 border border-slate-200 bg-white text-sm font-semibold",
                  "disabled:opacity-40 disabled:cursor-not-allowed",
                  "hover:border-[#1B6B1B] hover:text-[#1B6B1B]",
                ].join(" ")}
                aria-label="Next page"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
              >
                <ChevronRight className="mx-auto" size={18} />
              </motion.button>
            </motion.div>
          </motion.div>
        </Container>
      </motion.section>
    </motion.div>
  );
}
