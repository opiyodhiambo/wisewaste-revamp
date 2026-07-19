import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import Container from "../components/ui/Container";
import { blogPostsSorted } from "../data/blog";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

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

const stagger = {
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

// ↗ -> → swap (stable with group-hover; no hover state bugs)
//function ArrowSwap({ size = 18, color = ORANGE }: { size?: number; color?: string }) {
  //return (
   // <span className="relative inline-flex w-[18px] h-[18px]">
    //  <span className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-200">
      //  <ArrowUpRight size={size} style={{ color }} />
     // </span>
     // <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
       // <ArrowRight size={size} style={{ color }} />
    //  </span>
   // </span>
 // );
//}

export default function BlogDetail() {
  const { slug } = useParams();
  const idx = blogPostsSorted.findIndex((p) => p.slug === slug);
  const post = idx >= 0 ? blogPostsSorted[idx] : undefined;

  if (!post) {
    return (
      <Container className="py-16">
        <div className="text-xl font-semibold">Post not found</div>
        <Link to="/blog" className="mt-3 inline-block text-[#1B6B1B] hover:text-[#F9A826]">
          Back to Blog
        </Link>
      </Container>
    );
  }

  const prev = idx > 0 ? blogPostsSorted[idx - 1] : undefined;
  const next = idx < blogPostsSorted.length - 1 ? blogPostsSorted[idx + 1] : undefined;

  // optional: make prev/next feel “selectable”
  const [hoverNav, setHoverNav] = useState<"prev" | "next" | null>(null);

  return (
    <motion.div variants={pageIn} initial="hidden" animate="show" exit="exit" className="bg-white">
      {/* thin top border like the site */}
      <motion.div
        className="h-1 w-full"
        style={{ backgroundColor: GREEN }}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
      />

      <Container className="py-10">
        {/* Centered narrow content */}
        <motion.article
          className="mx-auto max-w-[540px]"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* cover */}
          <motion.div
            className="relative overflow-hidden"
            variants={cardIn}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <motion.img
              src={post.cover}
              alt={post.title}
              className="w-full h-[260px] object-cover"
              loading="lazy"
              initial={{ scale: 1.02, opacity: 0.001 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.0, ease: EASE_OUT }}
              whileHover={{ scale: 1.04 }}
            />

            {/* category chip */}
            <motion.div
              className="absolute left-3 top-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE_OUT, delay: 0.1 }}
            >
              <span
                className="inline-flex items-center px-3 py-1 text-[11px] font-semibold text-white"
                style={{ backgroundColor: GREEN }}
              >
                {post.category}
              </span>
            </motion.div>
          </motion.div>

          {/* meta */}
          <motion.div className="mt-4 text-[11px]" variants={fadeUp} custom={0} style={{ color: GREEN }}>
            {post.date} <span className="text-slate-300">•</span>{" "}
            <span className="text-slate-500">By</span>{" "}
            <span style={{ color: ORANGE }}>{post.author}</span>
          </motion.div>

          {/* title */}
          <motion.h1 className="mt-2 text-xl font-semibold leading-snug" variants={fadeUp} custom={1} style={{ color: ORANGE }}>
            {post.title}
          </motion.h1>

          {/* content */}
          <motion.div className="mt-5 space-y-6 text-[13px] leading-relaxed text-slate-700" variants={stagger}>
            {post.content.map((block, i) => (
              <motion.div key={i} variants={fadeUp} custom={i + 2}>
                {block.heading && (
                  <motion.h2
                    className="mt-6 mb-2 text-sm font-semibold text-slate-900"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.85, ease: EASE_OUT }}
                  >
                    {block.heading}
                  </motion.h2>
                )}

                {/* paragraphs with gentle stagger */}
                <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
                  {block.paragraphs.map((t, j) => (
                    <motion.p key={j} variants={fadeUp} custom={j * 0.15}>
                      {t}
                    </motion.p>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* bottom prev / next */}
          <motion.div className="mt-10 grid grid-cols-2 gap-2" variants={fadeUp} custom={99}>
            {/* PREV */}
            <motion.div
              className="border border-slate-200 bg-white"
              onMouseEnter={() => setHoverNav("prev")}
              onMouseLeave={() => setHoverNav(null)}
              animate={{
                opacity: hoverNav === "next" ? 0.72 : 1,
                y: hoverNav === "prev" ? -2 : 0,
              }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              {prev ? (
                <Link
                  to={`/blog/${prev.slug}`}
                  className="group flex items-center justify-between px-3 py-3 text-xs font-semibold text-slate-700 hover:text-[#1B6B1B]"
                >
                  <span className="inline-flex items-center gap-2">
                    <ChevronLeft size={16} style={{ color: GREEN }} />
                    Prev Post
                  </span>
                  
                </Link>
              ) : (
                <div className="px-3 py-3 text-xs text-slate-300 inline-flex items-center gap-2">
                  <ChevronLeft size={16} className="text-slate-300" />
                  Prev Post
                </div>
              )}
            </motion.div>

            {/* NEXT */}
            <motion.div
              className="border border-slate-200 bg-white"
              onMouseEnter={() => setHoverNav("next")}
              onMouseLeave={() => setHoverNav(null)}
              animate={{
                opacity: hoverNav === "prev" ? 0.72 : 1,
                y: hoverNav === "next" ? -2 : 0,
              }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              {next ? (
                <Link
                  to={`/blog/${next.slug}`}
                  className="group flex items-center justify-between px-3 py-3 text-xs font-semibold text-slate-700 hover:text-[#1B6B1B]"
                >
                  <span className="inline-flex items-center gap-2">
                    Next Post
                    <ChevronRight size={16} style={{ color: GREEN }} />
                  </span>
                
                </Link>
              ) : (
                <div className="px-3 py-3 text-xs text-slate-300 text-right inline-flex items-center justify-end gap-2 w-full">
                  Next Post
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* back to blog (centered + smooth) */}
          <motion.div className="mt-7 flex justify-center" variants={fadeUp} custom={100}>
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.25, ease: EASE_OUT }}>
              <Link
                to="/blog"
                className="group inline-flex items-center justify-center gap-2 text-xs font-semibold transition-colors"
                style={{ color: GREEN }}
              >
                <ArrowLeft size={16} style={{ color: GREEN }} />
                <span className="group-hover:opacity-90">Back to Blog</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.article>
      </Container>
    </motion.div>
  );
}
