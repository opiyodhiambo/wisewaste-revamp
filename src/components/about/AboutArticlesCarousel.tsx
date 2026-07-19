import { useMemo, useState } from "react";
import Container from "../ui/Container";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
type Article = {
  id: string;
  category: string;
  title: string;
  date: string;
  author: string;
  image: string;
};

export default function AboutArticlesCarousel() {
  const items: Article[] = useMemo(
    () => [
      {
        id: "1",
        category: "waste management",
        title: "Why Businesses Should Prioritize Smart Waste Management Solutions",
        date: "September 11, 2024",
        author: "flashservices",
        image:
          "https://images.unsplash.com/photo-1527515637462-d928f2446e70?auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: "2",
        category: "waste management",
        title: "Top 5 Benefits of Professional Waste Management Services in Nairobi",
        date: "September 11, 2024",
        author: "flashservices",
        image:
          "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: "3",
        category: "Sustainability",
        title: "The Future of E-Waste Recycling in Kenya: A Sustainable Approach",
        date: "October 17, 2024",
        author: "flashservices",
        image:
          "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: "4",
        category: "Commercial Cleaning Services, Washroom hygiene solutions",
        title: "How to Ensure Your Washrooms Are Hygienic: Top Tips for Nairobi Businesses",
        date: "September 11, 2024",
        author: "flashservices",
        image:
          "https://images.unsplash.com/photo-1581579185169-2f2cfd59b7a4?auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: "5",
        category: "Recycling",
        title: "Recycling Solutions in Nairobi: How Flash Services Helps You Go Green",
        date: "September 11, 2024",
        author: "flashservices",
        image:
          "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: "6",
        category: "Pest Control",
        title: "The Importance of Eco-Friendly Pest Control for Homes and Businesses",
        date: "September 11, 2024",
        author: "flashservices",
        image:
          "https://images.unsplash.com/photo-1581579185169-2f2cfd59b7a4?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  const clamp = (n: number, min: number, max: number) =>
    Math.max(min, Math.min(max, n));

  const perPage = 3;
  const maxIndex = Math.max(0, Math.ceil(items.length / perPage) - 1);

  const prev = () => setIndex((v) => clamp(v - 1, 0, maxIndex));
  const next = () => setIndex((v) => clamp(v + 1, 0, maxIndex));

  // SAME MOTION SYSTEM AS OTHER SECTIONS
  const containerV: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.1,
      },
    },
  };

  const itemV: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: EASE_OUT },
    },
  };

  return (
    <section className="bg-white overflow-hidden">
      <Container className="py-12 md:py-16">
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* header row */}
          <motion.div
            variants={itemV}
            className="flex items-center justify-between gap-4"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Recent News And Articles
            </h2>

            {/* arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                disabled={index === 0}
                className="h-7 w-7 grid place-items-center border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={next}
                disabled={index === maxIndex}
                className="h-7 w-7 grid place-items-center border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* carousel viewport */}
          <motion.div variants={itemV} className="mt-8 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${index * 100}%)`,
              }}
            >
              {chunk(items, perPage).map((page, pageIdx) => (
                <div
                  key={pageIdx}
                  className="min-w-full grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                >
                  {page.map((a) => (
                    <motion.div key={a.id} variants={itemV}>
                      <ArticleCard a={a} />
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemV}
            className="mt-6 md:hidden text-xs text-slate-500"
          >
            Swipe not enabled — use arrows.
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}


function ArticleCard({ a }: { a: Article }) {
  return (
    <motion.article
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <div className="relative">
        <img
          src={a.image}
          alt={a.title}
          className="w-full h-[185px] object-cover rounded-md"
          loading="lazy"
        />
        <span
          className="absolute left-3 top-3 px-3 py-1 text-[11px] font-semibold text-white rounded"
          style={{ backgroundColor: GREEN }}
        >
          {a.category}
        </span>
      </div>

      <h3 className="mt-5 text-sm font-extrabold text-slate-900 leading-snug">
        {a.title}
      </h3>

      <div className="mt-4 h-px w-full bg-slate-200" />

      <div className="mt-4 text-[11px] flex items-center gap-2">
        <span className="text-slate-500">{a.date}</span>
        <span className="text-slate-300">•</span>
        <span style={{ color: ORANGE }} className="font-semibold">
          {a.author}
        </span>
      </div>
    </motion.article>
  );
}


function chunk<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
