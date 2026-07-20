
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { services } from "../data/services";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Recycle,
  Layers,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { site } from "../data/site";
import KeyBenefits from "../components/services/KeyBenefits";

const GREEN = "#1B6B1B";
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

function ArrowSwap({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <span className="relative inline-flex h-[18px] w-[18px]">
      <span className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-200">
        <ArrowUpRight size={size} style={{ color }} />
      </span>
      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ArrowRight size={size} style={{ color }} />
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* FULL-PAGE PLAYFUL URBAN-MINING BACKDROP                                    */
/* -------------------------------------------------------------------------- */
function UrbanMiningBackdrop() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[linear-gradient(180deg,#F8FBF8_0%,#FFFFFF_38%,#F8FBF8_100%)]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 2200"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(11,61,46,0.035)" strokeWidth="1" />
          </pattern>

          <linearGradient id="trace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(249,168,38,0.18)" />
            <stop offset="100%" stopColor="rgba(27,107,27,0.18)" />
          </linearGradient>

          <filter id="blur">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        <rect width="1600" height="2200" fill="url(#grid)" />

        <motion.path
          d="M -100 240 C 260 120, 520 420, 880 300 S 1380 520, 1700 380"
          fill="none"
          stroke="url(#trace)"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ pathLength: [0.75, 1, 0.75], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          d="M -80 1240 C 240 1080, 560 1460, 940 1300 S 1380 1560, 1700 1420"
          fill="none"
          stroke="url(#trace)"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ pathLength: [1, 0.8, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "1340px 180px" }}
        >
          <polygon
            points="1340,120 1400,155 1400,225 1340,260 1280,225 1280,155"
            fill="none"
            stroke="rgba(249,168,38,0.22)"
            strokeWidth="2"
          />
        </motion.g>

        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "180px 1760px" }}
        >
          <polygon
            points="180,1700 232,1730 232,1790 180,1820 128,1790 128,1730"
            fill="none"
            stroke="rgba(27,107,27,0.26)"
            strokeWidth="2"
          />
        </motion.g>

        <motion.circle
          cx="1420"
          cy="1320"
          r="170"
          fill="rgba(249,168,38,0.12)"
          filter="url(#blur)"
          animate={{ y: [0, -20, 0], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.circle
          cx="220"
          cy="820"
          r="140"
          fill="rgba(27,107,27,0.12)"
          filter="url(#blur)"
          animate={{ y: [0, 18, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <div className="absolute inset-0 flex items-start justify-center pt-10 pointer-events-none">
        <div className="text-[16vw] font-black tracking-[-0.08em] text-[#0B3D2E]/[0.04] select-none">
          URBAN MINING
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HERO                                                                        */
/* -------------------------------------------------------------------------- */
function HeroShowcase({
  title,
  description,
  images,
}: {
  title: string;
  description: string;
  images: string[];
}) {
  const safe = images.filter(Boolean);
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % safe.length);
  const prev = () => setIndex((i) => (i - 1 + safe.length) % safe.length);

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/80 backdrop-blur-xl shadow-[0_30px_90px_rgba(11,61,46,0.14)]">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-h-[360px] lg:min-h-[520px] overflow-hidden bg-slate-100">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={safe[index]}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-black/10 to-transparent" />

          <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
            Resource Recovery
          </div>

          {safe.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
              >
                <ChevronLeft className="mx-auto" size={20} />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
              >
                <ChevronRight className="mx-auto" size={20} />
              </button>

              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                {safe.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      i === index ? "w-10 bg-white" : "w-2.5 bg-white/50"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="relative flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-[#1B6B1B]/10 px-3 py-1.5 text-[11px] font-semibold text-[#1B6B1B]">
              <Sparkles size={14} />
              Circular Resource Infrastructure
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.05] text-[#0B3D2E]">
              {title}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-sm sm:text-base leading-relaxed text-slate-600">
              {description}
            </motion.p>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-2xl font-black text-[#0B3D2E]">4+</div>
                <div className="mt-1 text-xs font-semibold text-slate-500">Recovery streams</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-2xl font-black text-[#0B3D2E]">24/7</div>
                <div className="mt-1 text-xs font-semibold text-slate-500">Collection support</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/request-pickup" className="group">
              <Button className="w-full sm:w-auto !bg-[#1B6B1B] !text-white hover:!bg-[#165B16]">
                <span className="inline-flex items-center gap-2">
                  Request Pickup
                  <ArrowSwap color="#ffffff" />
                </span>
              </Button>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-[#0B3D2E] transition hover:border-[#F9A826] hover:text-[#F9A826]"
            >
              Talk To Our Team
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MASONRY COLLAGE                                                             */
/* -------------------------------------------------------------------------- */
function MasonryCollage({ images }: { images: string[] }) {
  const items = images.filter(Boolean).slice(0, 6);

  if (!items.length) return null;

  return (
    <div className="grid auto-rows-[170px] grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((src, idx) => {
        const span =
          idx === 0
            ? "md:col-span-2 md:row-span-2"
            : idx === 3
            ? "md:row-span-2"
            : "md:col-span-1 md:row-span-1";

        return (
          <motion.div
            key={idx}
            variants={fadeUp}
            className={`group relative overflow-hidden rounded-[28px] border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_18px_50px_rgba(11,61,46,0.10)] ${span}`}
            whileHover={{ y: -6, rotate: idx % 2 === 0 ? -0.5 : 0.5 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            <img
              src={src}
              alt={`Recovery operation ${idx + 1}`}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

            <div className="absolute left-4 bottom-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#0B3D2E] backdrop-blur">
              {idx === 0
                ? "Primary Recovery"
                : idx === 1
                ? "Sorting Line"
                : idx === 2
                ? "Material Stream"
                : idx === 3
                ? "Processing"
                : idx === 4
                ? "Quality Check"
                : "Export Ready"}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN PAGE                                                                   */
/* -------------------------------------------------------------------------- */
export default function ServiceDetailRedesigned() {
  const { slug } = useParams();
  const service = useMemo(() => services.find((s) => s.slug === slug), [slug]);

  if (!service) {
    return (
      <Container className="py-16">
        <div className="text-xl font-semibold">Service not found</div>
        <Link to="/services" className="mt-3 inline-flex text-[#1B6B1B] hover:text-[#F9A826]">
          Back to Services
        </Link>
      </Container>
    );
  }

  const heroImages =
    service.heroImage?.length
      ? service.heroImage
      : service.galleryImages?.length
      ? service.galleryImages
      : [];

  return (
    <div className="relative min-h-screen">
      <UrbanMiningBackdrop />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10"
      >
        <Container className="py-8 lg:py-10">
          <HeroShowcase
            title={service.title}
            description={service.overviewText}
            images={heroImages}
          />
        </Container>

        <Container className="pb-20">
          <div className="grid gap-8 xl:grid-cols-[300px_1fr]">
            {/* SIDEBAR */}
            <motion.aside variants={fadeUp} className="space-y-5 xl:sticky xl:top-6 self-start">
              <div className="rounded-[28px] border border-white/60 bg-white/75 p-5 backdrop-blur-xl shadow-[0_18px_50px_rgba(11,61,46,0.10)]">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0B3D2E]">
                  <Layers size={18} className="text-[#1B6B1B]" />
                  Recovery Streams
                </div>

                <div className="mt-4 space-y-2">
                  {services.map((s) => {
                    const active = s.slug === service.slug;

                    return (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className={`group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                          active
                            ? "bg-[#1B6B1B] text-white shadow-lg"
                            : "bg-slate-50 text-slate-700 hover:bg-[#F9A826]/10 hover:text-[#0B3D2E]"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              active ? "bg-white" : "bg-[#1B6B1B]"
                            }`}
                          />
                          {s.title.split("|")[0].trim()}
                        </span>

                        <ArrowSwap size={16} color={active ? "#ffffff" : GREEN} />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="overflow-hidden rounded-[28px] border border-white/60 bg-[#0B3D2E] text-white shadow-[0_24px_60px_rgba(11,61,46,0.24)]">
                <div className="relative p-6">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#F9A826]/20 blur-2xl" />

                  <div className="relative">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
                      <ShieldCheck size={14} />
                      Rapid Response
                    </div>

                    <h3 className="mt-4 text-2xl font-black leading-tight">
                      Need Collection Support Today?
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-white/80">
                      Our recovery teams support scheduled, emergency, and project-based collection across commercial, industrial, and institutional facilities.
                    </p>

                    <div className="mt-5 space-y-3 text-sm">
                      <a
                        href={`tel:${site.phoneDigits}`}
                        className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 transition hover:bg-white/15"
                      >
                        <Phone size={16} />
                        <span className="font-semibold">{site.phoneDisplay}</span>
                      </a>

                      <a
                        href={`mailto:${site.email}`}
                        className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 transition hover:bg-white/15"
                      >
                        <Mail size={16} />
                        <span className="font-semibold">{site.email}</span>
                      </a>

                      <div className="flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-3 text-white/85">
                        <MapPin size={16} className="mt-0.5" />
                        <span>EPZ Building, Kitengela</span>
                      </div>
                    </div>

                    <Link to="/contact" className="group mt-6 block">
                      <Button className="w-full !bg-[#1B6B1B] !text-white hover:!bg-[#165B16]">
                        <span className="inline-flex items-center justify-center gap-2">
                          Get A Quote
                          <ArrowSwap color="#ffffff" />
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* CONTENT */}
            <motion.main variants={stagger} className="space-y-8">
              <motion.section
                variants={fadeUp}
                className="rounded-[28px] border border-white/60 bg-white/75 p-6 sm:p-8 backdrop-blur-xl shadow-[0_18px_50px_rgba(11,61,46,0.10)]"
              >
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1B6B1B]">
                  <Recycle size={14} />
                  Recovery Overview
                </div>

                <h2 className="mt-3 text-2xl sm:text-3xl font-black text-[#0B3D2E]">
                  Turning Discarded Material Into Marketable Resources
                </h2>

                <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-600">
                  <p>{service.overviewText}</p>
                  <p>
                    Every collection begins a recovery journey. Materials are separated, processed,
                    quality checked, and prepared for reuse in manufacturing, construction, energy,
                    or export markets, reducing landfill dependency while creating measurable
                    economic value.
                  </p>
                </div>
              </motion.section>

              <motion.section
                variants={fadeUp}
                className="rounded-[28px] border border-white/60 bg-white/75 p-6 sm:p-8 backdrop-blur-xl shadow-[0_18px_50px_rgba(11,61,46,0.10)]"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1B6B1B]">
                      Visual Recovery Story
                    </div>
                    <h3 className="mt-2 text-2xl font-black text-[#0B3D2E]">
                      Operations In Motion
                    </h3>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-[#F9A826]/10 px-3 py-1.5 text-xs font-semibold text-[#0B3D2E]">
                    <Globe size={14} className="text-[#F9A826]" />
                    Collection • Sorting • Recovery • Market
                  </div>
                </div>

                <div className="mt-6">
                  <MasonryCollage images={service.galleryImages ?? heroImages} />
                </div>
              </motion.section>

              <motion.section
                variants={fadeUp}
                className="rounded-[28px] border border-white/60 bg-white/75 p-6 sm:p-8 backdrop-blur-xl shadow-[0_18px_50px_rgba(11,61,46,0.10)]"
              >
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1B6B1B]">
                  <Sparkles size={14} />
                  Why It Matters
                </div>

                <h3 className="mt-2 text-2xl font-black text-[#0B3D2E]">
                  More Than Waste Collection
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  Traditional waste management ends at disposal. Urban mining begins where disposal
                  would normally happen, extracting reusable metals, plastics, electronic components,
                  organic value streams, and other secondary raw materials that can return to industry.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      title: "Material Recovery",
                      body: "Higher-value separation and processing before disposal is considered.",
                    },
                    {
                      title: "Circular Economy",
                      body: "Resources are kept in productive use for as long as possible.",
                    },
                    {
                      title: "Industrial Supply",
                      body: "Recovered materials are prepared for manufacturing and market demand.",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="rounded-2xl border border-slate-200 bg-white p-5"
                    >
                      <div className="text-sm font-bold text-[#0B3D2E]">{card.title}</div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.body}</p>
                    </div>
                  ))}
                </div>
              </motion.section>

              <motion.div variants={fadeUp}>
                <KeyBenefits />
              </motion.div>

              <motion.section
                variants={fadeUp}
                className="relative overflow-hidden rounded-[32px] border border-[#1B6B1B]/10 bg-[#0B3D2E] p-8 sm:p-10 text-white shadow-[0_30px_80px_rgba(11,61,46,0.28)]"
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#F9A826]/20 blur-3xl" />
                <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-[#1B6B1B]/30 blur-3xl" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
                    <Sparkles size={14} />
                    Next Step
                  </div>

                  <h3 className="mt-4 text-3xl sm:text-4xl font-black leading-tight">
                    Let’s Build A Recovery Strategy For Your Facility
                  </h3>

                  <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-white/80">
                    Whether you need routine collection, e-waste handling, plastic and metal recovery,
                    organic processing, or a full-site material recovery audit, our team can design a
                    solution aligned with your operational goals and regulatory requirements.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link to="/contact" className="group">
                      <Button className="w-full sm:w-auto !bg-[#1B6B1B] !text-white hover:!bg-[#165B16]">
                        <span className="inline-flex items-center gap-2">
                          Request A Quote
                          <ArrowSwap color="#ffffff" />
                        </span>
                      </Button>
                    </Link>

                    <Link
                      to="/services"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/15"
                    >
                      Explore Recovery Streams
                    </Link>
                  </div>
                </div>
              </motion.section>
            </motion.main>
          </div>
        </Container>
      </motion.div>
    </div>
  );
}
