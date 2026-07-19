import { useMemo, useState, useEffect, useRef } from "react";
import Container from "../ui/Container";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating?: number; // 1-5
};

type Props = {
  items?: Testimonial[];
};

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const INK = "#0B2E22";
const EASE: any = [0.16, 1, 0.3, 1];

export default function TestimonialsSection({ items }: Props) {
  const data = useMemo<Testimonial[]>(
    () =>
      items ?? [
        {
          quote:
            "Great company and service. Wise Waste Services collect our waste on time, their staff are very helpful and their customer service is very excellent.",
          name: "Agnes Kawira",
          role: "Executive Officer",
          rating: 5,
        },
        {
          quote:
            "Reliable and professional. They keep our premises clean and always communicate ahead of schedule changes. Highly recommended.",
          name: "Brian Mutua",
          role: "Operations Manager",
          rating: 5,
        },
        {
          quote:
            "Fast response time and consistent pickups. The team is polite and the service is dependable for our business needs.",
          name: "Faith Wanjiru",
          role: "Facility Supervisor",
          rating: 5,
        },
      ],
    [items]
  );

  const [i, setI] = useState(0);
  const active = data[i];

  const prev = () => setI((v) => (v - 1 + data.length) % data.length);
  const next = () => setI((v) => (v + 1) % data.length);

  // keyboard support (interactive)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length]);

  // section enters from "footer" (bottom) since it’s the last section
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });

  const sectionVariants = {
    hidden: { opacity: 0, y: 60, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: EASE, when: "beforeChildren", staggerChildren: 0.08 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const pop = {
    hidden: { opacity: 0, scale: 0.98, y: 10 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const quoteSwap = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.35, ease: EASE } },
  };

  return (
    <motion.section
      ref={sectionRef as any}
      className="bg-white"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={sectionVariants}
    >
      <Container className="py-16 lg:py-24">
        {/* Keep “separate sides”, but on RIGHT: text first, slider underneath */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          {/* LEFT */}
          <motion.div variants={fadeUp}>
            <motion.div
              className="text-xs font-semibold tracking-wide"
              style={{ color: GREEN }}
              variants={fadeUp}
            >
              What Our Customers Feel About Our Services!
            </motion.div>

            <motion.h2
              className="mt-6 text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.08]"
              style={{ color: INK }}
              variants={fadeUp}
            >
              We Devote Time And Effort
              <br />
              To Provide Quality Services
              <br />
              To Our Clients.
            </motion.h2>
          </motion.div>

          {/* RIGHT */}
          <motion.div className="relative" variants={pop}>
            {/* tiny green square (animated) */}
            <motion.div
              className="absolute -left-6 top-10 hidden lg:block"
              style={{
                width: 14,
                height: 14,
                border: `2px solid ${GREEN}`,
                background: "transparent",
              }}
              initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.6, rotate: -12 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            />

            <div className="relative rounded-2xl">
              {/* Paragraph text stays on top */}
              <motion.div variants={fadeUp}>
                {/* Big faded quotes */}
                <motion.div
                  className="pointer-events-none absolute -top-6 left-2 opacity-[0.06] select-none"
                  initial={{ opacity: 0, y: 6 }}
                  animate={inView ? { opacity: 0.06, y: 0 } : { opacity: 0, y: 6 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                >
                  <div className="text-[140px] leading-none font-black text-slate-900">““</div>
                </motion.div>

                <motion.p
                  className="relative pt-10 sm:pt-14 text-lg sm:text-xl lg:text-2xl font-semibold italic leading-relaxed"
                  style={{ color: INK }}
                  variants={fadeUp}
                >
                  “{active.quote}”
                </motion.p>
              </motion.div>

              {/* SLIDER AREA UNDER THE PARAGRAPH (still RIGHT column) */}
              <motion.div
                className="mt-8 border border-slate-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.10)] p-4 sm:p-5"
                variants={pop}
              >
                {/* Quote content swaps smoothly */}
                <AnimatePresence mode="wait">
                  <motion.div key={i} {...quoteSwap}>
                    <div className="text-[13px] sm:text-sm text-slate-600 leading-relaxed">
                      {active.quote}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Bottom row */}
                <motion.div
                  className="mt-4 flex items-center justify-between gap-4 flex-wrap"
                  variants={fadeUp}
                >
                  {/* Controls (responsive + interactive) */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      type="button"
                      onClick={prev}
                      aria-label="Previous testimonial"
                      className={[
                        "h-11 w-11 sm:h-10 sm:w-10 grid place-items-center",
                        "bg-slate-100 border border-slate-200",
                        "focus:outline-none focus:ring-2 focus:ring-offset-2",
                      ].join(" ")}
                      style={{ outlineColor: GREEN }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ duration: 0.18, ease: EASE }}
                    >
                      <ChevronLeft size={18} style={{ color: ORANGE }} />
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={next}
                      aria-label="Next testimonial"
                      className={[
                        "h-11 w-11 sm:h-10 sm:w-10 grid place-items-center",
                        "bg-slate-100 border border-slate-200",
                        "focus:outline-none focus:ring-2 focus:ring-offset-2",
                      ].join(" ")}
                      style={{ outlineColor: GREEN }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ duration: 0.18, ease: EASE }}
                    >
                      <ChevronRight size={18} style={{ color: ORANGE }} />
                    </motion.button>
                  </div>

                  {/* Stars + name */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="flex items-center gap-1"
                      initial={false}
                      animate={{ opacity: 1 }}
                    >
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, y: 6, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.35, ease: EASE, delay: 0.05 + idx * 0.03 }}
                        >
                          <Star
                            size={16}
                            className="fill-current"
                            style={{
                              color: idx < (active.rating ?? 5) ? GREEN : "#D1D5DB",
                            }}
                          />
                        </motion.span>
                      ))}
                    </motion.div>

                    <motion.div className="text-sm" variants={fadeUp}>
                      <span className="font-bold" style={{ color: INK }}>
                        {active.name},
                      </span>{" "}
                      <span className="text-slate-500">{active.role}</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Dots (touch friendly, responsive) */}
                <motion.div className="mt-4 flex items-center gap-2" variants={fadeUp}>
                  {data.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setI(idx)}
                      aria-label={`Go to testimonial ${idx + 1}`}
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: idx === i ? 28 : 10,
                        background: idx === i ? GREEN : "#D1D5DB",
                      }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.92 }}
                      transition={{ duration: 0.16, ease: EASE }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}
