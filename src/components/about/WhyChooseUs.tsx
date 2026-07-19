import Container from "../ui/Container";
import { useMemo, useState } from "react";
import { ArrowUpRight, Leaf, BriefcaseBusiness } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants, Easing } from "framer-motion";
import vehicle7 from "../../assets/vehicle7.jpeg";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const DARK = "#0B3D2E";

// ✅ Proper easing type (cubic-bezier tuple)
const EASE_OUT: Easing = [0.16, 1, 0.3, 1];

type ChoiceKey = "sustainability" | "expertise";

type Choice = {
  key: ChoiceKey;
  title: string;
  desc: string;
  cardTitle: string;
  cardBody: string;
  Icon: LucideIcon;
};

export default function WhyChooseUs() {
  const choices: Choice[] = useMemo(
    () => [
      {
        key: "sustainability",
        title: "Sustainability and Responsibility",
        desc:
          "Recycling Facilities essential in producing quality raw materials to the production industry, as they designed to separate recyclables into their individual material streams and prepare them for sale",
        cardTitle: "We are deeply committed to environmental responsibility.",
        cardBody:
          "Our services prioritize sustainability, incorporating eco-friendly practices and recycling solutions that not only benefit your business but also contribute to a greener, more sustainable world.",
        Icon: Leaf,
      },
      {
        key: "expertise",
        title: "Expertise and Experience",
        desc:
          "Our skilled team brings years of hands-on experience, ensuring reliable service delivery and the right solutions for every client.",
        cardTitle: "Experienced team with proven service delivery.",
        cardBody:
          "We bring the right expertise to plan, execute, and support your waste management needs — ensuring consistency, safety, and quality results every time.",
        Icon: BriefcaseBusiness,
      },
    ],
    []
  );

  const [active, setActive] = useState<ChoiceKey>("sustainability");
  const [isBgHovered, setIsBgHovered] = useState(false);

  const current = choices.find((c) => c.key === active)!;

  // ✅ Typed variants
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

  // ✅ background overlay animates ONLY on hover (no overlay by default)
  const bgOverlayV: Variants = {
    rest: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.35, ease: EASE_OUT },
    },
  };

  // ✅ optional subtle bg zoom on hover
  const bgImageV: Variants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.03,
      transition: { duration: 0.8, ease: EASE_OUT },
    },
  };

  return (
    <section className="bg-[#F7F8F6] overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* LEFT PANEL */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Container className="py-12 md:py-16 lg:py-20">
            <div className="max-w-lg">
              <motion.div
                variants={itemV}
                className="text-xs font-semibold tracking-wide"
                style={{ color: GREEN }}
              >
                Excellent Customer Service
              </motion.div>

              <motion.h2
                variants={itemV}
                className="mt-4 text-3xl sm:text-4xl font-extrabold"
                style={{ color: DARK }}
              >
                Why Choose Us
              </motion.h2>

              <motion.p
                variants={itemV}
                className="mt-6 text-sm leading-relaxed text-slate-600"
              >
                We pride ourselves on providing excellent customer service. Our
                team is always available to answer any questions and address any
                concerns that our clients may have.
              </motion.p>

              {/* clickable items */}
              <motion.div variants={containerV} className="mt-10 space-y-7">
                {choices.map((c) => {
                  const isActive = c.key === active;

                  return (
                    <motion.div key={c.key} variants={itemV}>
                      <button
                        type="button"
                        onClick={() => setActive(c.key)}
                        className="w-full flex items-start gap-4 text-left group"
                      >
                        {isActive ? (
                          <span
                            className="mt-1 h-6 w-6 flex items-center justify-center"
                            style={{ backgroundColor: GREEN }}
                            aria-hidden="true"
                          >
                            <ArrowUpRight size={16} className="text-white" />
                          </span>
                        ) : (
                          <span
                            className="mt-1 h-6 w-6 bg-white border border-slate-200 flex items-center justify-center"
                            aria-hidden="true"
                          >
                            <span className="h-2 w-2 rounded-full bg-slate-300" />
                          </span>
                        )}

                        <span
                          className={[
                            "text-sm sm:text-base font-extrabold leading-snug transition",
                            isActive
                              ? "opacity-100"
                              : "opacity-90 group-hover:opacity-100",
                          ].join(" ")}
                          style={{ color: ORANGE }}
                        >
                          {c.title}
                        </span>
                      </button>

                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.p
                            key="desc"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.35, ease: EASE_OUT }}
                            className="mt-3 pl-10 text-sm leading-relaxed text-slate-600"
                          >
                            {c.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </Container>
        </motion.div>

        {/* RIGHT PANEL */}
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsBgHovered(true)}
          onMouseLeave={() => setIsBgHovered(false)}
          onFocus={() => setIsBgHovered(true)}
          onBlur={() => setIsBgHovered(false)}
          tabIndex={0} // allows keyboard focus hover effect too
        >
          {/* background image */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
            viewport={{ once: true }}
          >
            <AnimatePresence initial={false}>
              <motion.img
                key="bg"
                src={vehicle7}
                alt="Why choose us background"
                className="h-full w-full object-cover"
                loading="lazy"
                variants={bgImageV}
                initial="rest"
                animate={isBgHovered ? "hover" : "rest"}
              />
            </AnimatePresence>
          </motion.div>

          {/* ✅ overlay ONLY on hover + framer motion */}
          <motion.div
            className="absolute inset-0"
            variants={bgOverlayV}
            initial="rest"
            animate={isBgHovered ? "hover" : "rest"}
            style={{
              // soft, readable overlay (tweak if you want stronger/weaker)
              background:
                "linear-gradient(90deg, rgba(11,61,46,0.45) 0%, rgba(11,61,46,0.12) 55%, rgba(255,255,255,0.0) 100%)",
            }}
          />

          <Container className="relative py-12 md:py-16 lg:py-20">
            <div className="flex lg:justify-end">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                  className="w-full max-w-sm bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] p-7"
                >
                  <div className="h-12 w-12 flex items-center justify-center rounded-sm bg-[#F3F6EE]">
                    <current.Icon size={26} style={{ color: GREEN }} />
                  </div>

                  <div className="mt-4 font-extrabold text-slate-800 text-sm leading-relaxed">
                    {current.cardTitle}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {current.cardBody}
                  </p>

                  <div
                    className="mt-6 h-[2px] w-14"
                    style={{ backgroundColor: GREEN, opacity: 0.35 }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </Container>
        </motion.div>
      </div>
    </section>
  );
}
