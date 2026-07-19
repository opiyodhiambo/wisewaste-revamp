import Container from "../ui/Container";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";

// ✅ typed cubic-bezier easing tuple
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const featured = {
  category: "Sustainability",
  title: "The Future of E-Waste Recycling in Kenya: A Sustainable Approach",
  date: "October 17, 2024",
  author: "flashservices",
  href: "/blog/the-future-of-e-waste-recycling",
  image:
    "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=2000&q=80",
};

const sidePosts = [
  {
    cats: "Commercial Cleaning Services, Washroom hygiene solutions",
    title: "How to Ensure Your Washrooms Are Hygienic: Top Tips for Nairobi...",
    date: "September 11, 2024",
    author: "flashservices",
    href: "/blog/washroom-hygiene-tips",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
  },
  {
    cats: "Commercial Cleaning Services, Recycling",
    title: "Recycling Solutions in Nairobi: How Flash Services Helps You Go Green",
    date: "September 11, 2024",
    author: "flashservices",
    href: "/blog/recycling-solutions-nairobi",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
  },
  {
    cats: "Commercial Cleaning Services",
    title: "The Importance of Eco-Friendly Pest Control for Homes and Businesses",
    date: "September 11, 2024",
    author: "flashservices",
    href: "/blog/eco-friendly-pest-control",
    image:
      "https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&w=800&q=80",
  },
];

// --- Motion presets (typed) ---
const sectionIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

const fadeOnHover: Variants = {
  rest: { opacity: 1 },
  hover: { opacity: 0.86, transition: { duration: 0.18, ease: EASE_OUT } },
};

const popOnHover: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.18, ease: EASE_OUT } },
};

const imageZoom: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.35, ease: EASE_OUT } },
};

const rightListWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const rightItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

const titleScaleHover: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.18, ease: EASE_OUT } },
};

export default function BlogRecentSection() {
  return (
    <motion.section
      className="bg-white"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={sectionIn}
    >
      <Container className="py-10 md:py-14">
        {/* Title */}
        <motion.h2
          className="text-2xl md:text-3xl font-extrabold text-[#0B3D2E]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          Recent News And Articles
        </motion.h2>

        <motion.div
          className="mt-6 grid gap-8 lg:grid-cols-[1fr_2px_420px] items-start"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.05 }}
        >
          {/* LEFT FEATURED */}
          <motion.div variants={popOnHover} initial="rest" whileHover="hover" animate="rest">
            <Link to={featured.href} className="block">
              <motion.div
                className="relative"
                variants={fadeOnHover}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                {/* big image */}
                <motion.div className="w-full overflow-hidden bg-slate-200" initial="rest" whileHover="hover" animate="rest">
                  <motion.img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover"
                    loading="lazy"
                    variants={imageZoom}
                  />
                </motion.div>

                {/* overlay card */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 bottom-8 w-[86%] bg-white shadow-[0_20px_70px_rgba(0,0,0,0.18)] border border-slate-100"
                  initial={{ y: 8, opacity: 0.98 }}
                  whileHover={{
                    y: 0,
                    scale: 1.015,
                    opacity: 0.92,
                    transition: { duration: 0.2, ease: EASE_OUT },
                  }}
                >
                  {/* category tag */}
                  <motion.div
                    className="absolute -top-4 left-6 px-4 py-2 text-xs font-bold text-white"
                    style={{ backgroundColor: GREEN }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                  >
                    {featured.category}
                  </motion.div>

                  <motion.div
                    className="px-7 py-8"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                  >
                    <motion.h3
                      className="text-lg md:text-xl font-extrabold text-[#0B3D2E] leading-snug"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2, ease: EASE_OUT }}
                    >
                      {featured.title}
                    </motion.h3>

                    <motion.div
                      className="mt-6 border-t border-slate-200"
                      initial={{ scaleX: 0, transformOrigin: "left" }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.55, ease: EASE_OUT }}
                    />

                    <motion.div
                      className="mt-4 text-xs font-semibold text-slate-600"
                      whileHover={{ opacity: 0.9 }}
                      transition={{ duration: 0.2, ease: EASE_OUT }}
                    >
                      <span style={{ color: GREEN }}>{featured.date}</span>
                      <span className="mx-2 text-slate-400">•</span>
                      <span style={{ color: ORANGE }}>{featured.author}</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>

          {/* VERTICAL DIVIDER */}
          <motion.div
            className="hidden lg:block w-[2px] h-full bg-slate-200"
            initial={{ scaleY: 0, transformOrigin: "top" }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          />

          {/* RIGHT LIST */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.05 }}
          >
            <motion.div
              className="grid gap-7"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={rightListWrap}
            >
              {sidePosts.map((p) => (
                <motion.div key={p.href} variants={rightItem}>
                  <Link to={p.href} className="block">
                    <motion.div
                      className="flex gap-4 items-start"
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                      variants={popOnHover}
                    >
                      {/* thumb */}
                      <motion.div
                        className="h-16 w-16 flex-shrink-0 bg-slate-200 overflow-hidden"
                        variants={fadeOnHover}
                      >
                        <motion.img
                          src={p.image}
                          alt={p.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          variants={imageZoom}
                        />
                      </motion.div>

                      {/* content */}
                      <motion.div className="min-w-0" variants={fadeOnHover}>
                        <motion.div
                          className="text-[11px] font-semibold text-slate-500 leading-snug"
                          whileHover={{ opacity: 0.85 }}
                          transition={{ duration: 0.18, ease: EASE_OUT }}
                        >
                          {p.cats}
                        </motion.div>

                        <motion.h4
                          className="mt-1 text-sm font-extrabold text-[#0B3D2E] leading-snug"
                          variants={titleScaleHover}
                        >
                          {p.title}
                          <motion.span
                            className="block h-[2px] w-full mt-1 origin-left"
                            style={{ backgroundColor: ORANGE }}
                            initial={{ scaleX: 0, opacity: 0 }}
                            whileHover={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 0.25, ease: EASE_OUT }}
                          />
                        </motion.h4>

                        <motion.div
                          className="mt-2 text-[11px] font-semibold text-slate-600"
                          whileHover={{ opacity: 0.9 }}
                          transition={{ duration: 0.18, ease: EASE_OUT }}
                        >
                          <span style={{ color: GREEN }}>{p.date}</span>
                          <span className="mx-2 text-slate-400">•</span>
                          <span style={{ color: ORANGE }}>{p.author}</span>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Button */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.05 }}
            >
              <motion.div
                className="inline-block"
                whileHover={{ opacity: 0.78 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.18, ease: EASE_OUT }}
              >
                <Link
                  to="/blog"
                  className="
                    group inline-flex items-center justify-center gap-2
                    px-6 sm:px-8 py-4
                    text-sm font-extrabold text-white
                    shadow-soft w-full sm:w-auto
                  "
                  style={{ backgroundColor: GREEN }}
                >
                  <span className="relative">
                    Check All Blog Posts
                    <span
                      className="absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 opacity-0 transition duration-300 group-hover:scale-x-100 group-hover:opacity-100"
                      style={{ backgroundColor: ORANGE }}
                    />
                  </span>

                  <motion.span
                    className="inline-flex"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.18, ease: EASE_OUT }}
                    style={{ color: ORANGE }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </motion.section>
  );
}
