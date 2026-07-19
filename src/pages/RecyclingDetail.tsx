import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowUpRight, Recycle, CheckCircle2, Images } from "lucide-react";
import Container from "../components/ui/Container";
import { recyclingServices } from "../data/recyclingServices";

const GREEN = "#009D4F";
const DARK_GREEN = "#0B3D2E";
const LIGHT_GREEN = "#73BF43";
const ORANGE = "#F9A826";

const SMOOTH_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const pageStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: SMOOTH_EASE,
      delay: i * 0.07,
    },
  }),
};

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04, filter: "blur(8px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: SMOOTH_EASE,
    },
  },
};

export default function RecyclingDetail() {
  const { slug } = useParams();

  const service =
    recyclingServices.find((x) => x.slug === slug) ?? recyclingServices[0];

  if (!slug) {
    return (
      <Navigate
        to={`/services/recycling/${recyclingServices[0].slug}`}
        replace
      />
    );
  }

  return (
    <motion.main
      initial="hidden"
      animate="show"
      variants={pageStagger}
      className="bg-white overflow-hidden"
    >
      <Container className="py-6 sm:py-8 md:py-10">
        {/* HERO STRIP */}
        <motion.section
          variants={fadeUp}
          custom={0}
          className="
            group relative overflow-hidden
            h-[190px] sm:h-[230px] md:h-[290px]
            rounded-sm bg-slate-100
          "
        >
          <motion.img
            variants={imageReveal}
            src={service.image}
            alt={service.heroTitle}
            className="
              absolute inset-0 h-full w-full object-cover
              transition-transform duration-700
              group-hover:scale-[1.04]
            "
          />

          {/* subtle dark shade to improve text visibility */}
          <div className="absolute inset-0 bg-black/5" />

          {/* responsive green overlay */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.75, ease: SMOOTH_EASE }}
            className="
              absolute left-0 top-0 h-full
              w-[54%] sm:w-[48%] md:w-[44%] lg:w-[43%]
              min-w-[205px] sm:min-w-[260px] md:min-w-[330px]
            "
            style={{
              background: "linear-gradient(180deg, #00A651 0%, #72BF44 100%)",
              clipPath:
                "polygon(0 0, 82% 0, 100% 26%, 100% 100%, 0 100%)",
            }}
          />

          <motion.div
            variants={fadeUp}
            custom={1}
            className="
              relative z-10 h-full flex flex-col justify-center
              px-5 sm:px-7 md:px-10
              max-w-[58%] sm:max-w-[52%] md:max-w-[46%]
            "
          >
            <div className="mb-3 inline-flex items-center gap-2 text-white/90 text-xs font-bold">
              <Recycle size={16} />
              Wise Waste Recycling
            </div>

            <h1 className="text-[24px] sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {service.heroTitle}
            </h1>
          </motion.div>
        </motion.section>

        {/* BODY */}
        <motion.section
          variants={pageStagger}
          className="mt-10 md:mt-12 grid gap-10 lg:grid-cols-[280px_1fr]"
        >
          {/* SIDEBAR */}
          <motion.aside variants={fadeUp} custom={1}>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold"
              style={{ color: GREEN }}
            >
              Our Services
            </h2>

            <motion.div
              variants={pageStagger}
              className="
                mt-6 rounded-sm overflow-hidden
                border border-slate-200 lg:border-0
                bg-white
              "
            >
              {recyclingServices.map((item, idx) => {
                const active = item.slug === service.slug;

                return (
                  <motion.div key={item.slug} variants={fadeUp} custom={idx}>
                    <Link
                      to={`/services/recycling/${item.slug}`}
                      className={[
                        "group flex items-center justify-between gap-3 border-b border-slate-200 px-4 lg:px-0 py-3 text-sm transition-all duration-200",
                        active
                          ? "font-bold bg-[#009D4F]/5 lg:bg-transparent text-[#009D4F]"
                          : "text-slate-600 hover:text-[#009D4F] hover:bg-slate-50 lg:hover:bg-transparent",
                      ].join(" ")}
                    >
                      <span>{item.sidebarTitle}</span>
                      <ArrowUpRight
                        size={15}
                        className={[
                          "transition-all duration-200",
                          active
                            ? "opacity-100 text-[#009D4F]"
                            : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0",
                        ].join(" ")}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.aside>

          {/* CONTENT */}
          <motion.article variants={fadeUp} custom={2}>
            <motion.div variants={fadeUp} custom={0}>
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight"
                style={{ color: LIGHT_GREEN }}
              >
                {service.title}
              </h2>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: SMOOTH_EASE }}
                className="mt-5 border-t border-slate-300 origin-left"
              />
            </motion.div>

            <motion.div
              variants={pageStagger}
              className="mt-7 space-y-5 text-[15px] sm:text-base leading-8 text-slate-600 text-left md:text-justify"
            >
              {service.intro.map((p, idx) => (
                <motion.p key={p} variants={fadeUp} custom={idx}>
                  {p}
                </motion.p>
              ))}
            </motion.div>

            {service.sections.map((section, idx) => (
              <motion.section
                key={section.title}
                variants={fadeUp}
                custom={idx + 3}
                className="
                  mt-8 rounded-sm
                  transition-all duration-300
                  hover:bg-slate-50/70
                  md:hover:px-4 md:hover:py-4 md:hover:-mx-4
                "
              >
                <h3
                  className="text-lg sm:text-xl font-extrabold"
                  style={{ color: LIGHT_GREEN }}
                >
                  {section.title}
                </h3>

                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.65, ease: SMOOTH_EASE }}
                  className="mt-4 border-t border-slate-300 origin-left"
                />

                {section.body.length > 0 && (
                  <div className="mt-5 space-y-5 text-[15px] sm:text-base leading-8 text-slate-600 text-left md:text-justify">
                    {section.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                )}

                {section.bullets && (
                  <ul className="mt-5 grid gap-3 text-[15px] sm:text-base leading-7 text-slate-600">
                    {section.bullets.map((b) => (
                      <motion.li
                        key={b}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="
                          group flex gap-3 rounded-sm p-2 -mx-2
                          hover:bg-white hover:shadow-sm
                          transition-all duration-200
                          cursor-default
                        "
                      >
                        <span
                          className="
                            mt-[4px] h-5 w-5 rounded-full flex-shrink-0
                            inline-flex items-center justify-center
                            transition-colors duration-200
                            bg-[#009D4F]/10 group-hover:bg-[#F9A826]/15
                          "
                        >
                          <CheckCircle2
                            size={14}
                            className="text-[#009D4F] group-hover:text-[#F9A826] transition-colors"
                          />
                        </span>
                        <span className="group-hover:text-[#0B3D2E] transition-colors">
                          {b}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.section>
            ))}

            {/* SMALL GALLERY */}
            <motion.section
              variants={fadeUp}
              custom={6}
              className="
                mt-10 rounded-sm border border-slate-200 bg-slate-50/70
                p-4 sm:p-5
              "
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <div
                    className="inline-flex items-center gap-2 text-sm font-extrabold"
                    style={{ color: GREEN }}
                  >
                    <Images size={17} />
                    Recycling Gallery
                  </div>

                  <h3
                    className="mt-1 text-xl sm:text-2xl font-extrabold leading-tight"
                    style={{ color: DARK_GREEN }}
                  >
                    See How We Support Cleaner Waste Recovery
                  </h3>
                </div>

                <span
                  className="
                    hidden sm:inline-flex rounded-full px-3 py-1
                    text-xs font-bold bg-white border border-slate-200
                  "
                  style={{ color: ORANGE }}
                >
                  Wise Waste
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {service.gallery.map((item, idx) => (
                  <motion.div
                    key={`${item.alt}-${idx}`}
                    variants={imageReveal}
                    className="
                      group relative overflow-hidden rounded-sm
                      h-28 sm:h-32 md:h-36 bg-white shadow-sm
                    "
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="
                        h-full w-full object-cover
                        transition-transform duration-500
                        group-hover:scale-110
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent opacity-80" />

                    <div className="absolute bottom-2 left-2 right-2">
                      <span className="inline-flex rounded-sm bg-white/90 px-2 py-1 text-[11px] font-bold text-[#0B3D2E]">
                        {item.alt}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.div
              variants={fadeUp}
              custom={7}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <Link
                to="/request-pickup"
                className="
                  group inline-flex items-center justify-center gap-2
                  px-6 py-3 text-sm font-extrabold text-white
                  transition-all duration-200 hover:-translate-y-1
                "
                style={{ backgroundColor: GREEN }}
              >
                Request Recycling Pickup
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              <Link
                to="/contact"
                className="
                  group inline-flex items-center justify-center gap-2
                  px-6 py-3 text-sm font-extrabold border
                  transition-all duration-200 hover:-translate-y-1
                "
                style={{ color: DARK_GREEN, borderColor: "#d1d5db" }}
              >
                Talk To Our Team
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: ORANGE }}
                />
              </Link>
            </motion.div>
          </motion.article>
        </motion.section>
      </Container>
    </motion.main>
  );
}