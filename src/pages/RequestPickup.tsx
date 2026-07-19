import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  type MotionProps,
  type Transition,
  type Variants,
  AnimatePresence,
} from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import Container from "../components/ui/Container";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { site } from "../data/site";
import { useForm, ValidationError } from "@formspree/react";

import vehicle2 from "../assets/vehicle2.jpeg";
import vehicle4 from "../assets/vehicle40.jpeg";
import vehicle6 from "../assets/vehicle23.jpeg";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";

// ✅ Using the SAME Formspree ID you confirmed
const FORMSPREE_ID = "xzdaekbw";

// --------------------
// Motion helpers
// --------------------
const EASE: Transition["ease"] = [0.22, 1, 0.36, 1];
const HERO_SLIDE_MS = 3200;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE, delay: i * 0.09 },
  }),
};

const inputV: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const staggerWrap: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
};

// --------------------
// Responsive motion primitives
// --------------------
function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia?.("(pointer: coarse)");
    if (!mq) return;

    const set = () => setCoarse(!!mq.matches);
    set();

    // @ts-ignore
    mq.addEventListener ? mq.addEventListener("change", set) : mq.addListener(set);
    return () => {
      // @ts-ignore
      mq.removeEventListener ? mq.removeEventListener("change", set) : mq.removeListener(set);
    };
  }, []);

  return coarse;
}

function motionPress(shouldReduce: boolean, coarsePointer: boolean): MotionProps {
  if (shouldReduce) return {};

  if (coarsePointer) {
    return {
      whileTap: { scale: 0.97 },
      transition: { duration: 0.12, ease: EASE },
    };
  }

  return {
    whileHover: { y: -2, scale: 1.01 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.16, ease: EASE },
  };
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] font-semibold text-[#0B3D2E] mb-2">{children}</div>;
}

function TextInput(props: HTMLMotionProps<"input">) {
  return (
    <motion.input
      variants={inputV}
      {...props}
      className={[
        "w-full rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm",
        "outline-none transition",
        "focus:border-slate-300 focus:ring-2 focus:ring-[#1B6B1B]/15",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

function SelectInput(props: HTMLMotionProps<"select">) {
  return (
    <motion.select
      variants={inputV}
      {...props}
      className={[
        "w-full rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm",
        "outline-none transition",
        "focus:border-slate-300 focus:ring-2 focus:ring-[#1B6B1B]/15",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

/** ✅ Hero BG slider: autoplay + swipe mobile + arrows desktop + dots */
function HeroBgSlider({
  images,
  paused,
  setPaused,
  className = "",
}: {
  images: string[];
  paused: boolean;
  setPaused: (v: boolean) => void;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const startX = useRef<number | null>(null);
  const startT = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    if (reduce) return;
    if (images.length <= 1) return;

    const t = setInterval(() => {
      setDir(1);
      setActive((v) => (v + 1) % images.length);
    }, HERO_SLIDE_MS);

    return () => clearInterval(t);
  }, [paused, reduce, images.length]);

  const prev = () => {
    if (images.length <= 1) return;
    setDir(-1);
    setActive((v) => (v - 1 + images.length) % images.length);
  };

  const next = () => {
    if (images.length <= 1) return;
    setDir(1);
    setActive((v) => (v + 1) % images.length);
  };

  const bgV: Variants = {
    enter: (d: 1 | -1) => ({
      opacity: 0,
      x: d === 1 ? 26 : -26,
      scale: 1.03,
      filter: "blur(10px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.85, ease: EASE },
    },
    exit: (d: 1 | -1) => ({
      opacity: 0,
      x: d === 1 ? -26 : 26,
      scale: 1.03,
      filter: "blur(10px)",
      transition: { duration: 0.5, ease: EASE },
    }),
  };

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0]?.clientX ?? null;
    startT.current = Date.now();
    setPaused(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0]?.clientX ?? null;
    const sx = startX.current;
    const dt = startT.current ? Date.now() - startT.current : 9999;

    startX.current = null;
    startT.current = null;

    if (sx != null && endX != null) {
      const dx = endX - sx;
      const abs = Math.abs(dx);

      if (abs >= 45 && dt < 900) {
        if (dx > 0) prev();
        else next();
      }
    }

    setPaused(false);
  };

  return (
    <div
      className={["absolute inset-0", className].join(" ")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.div
          key={active}
          custom={dir}
          variants={bgV}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${images[active]})` }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          {/* desktop arrows */}
          <button
            type="button"
            aria-label="Previous hero image"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prev();
            }}
            className="hidden lg:grid absolute left-6 top-1/2 -translate-y-1/2 z-20
                       h-11 w-11 rounded-full bg-white/15 border border-white/15 text-white
                       backdrop-blur grid place-items-center hover:bg-white/20 transition"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            aria-label="Next hero image"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              next();
            }}
            className="hidden lg:grid absolute right-6 top-1/2 -translate-y-1/2 z-20
                       h-11 w-11 rounded-full bg-white/15 border border-white/15 text-white
                       backdrop-blur grid place-items-center hover:bg-white/20 transition"
          >
            <ChevronRight size={18} />
          </button>

          {/* dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to hero slide ${idx + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDir(idx > active ? 1 : -1);
                  setActive(idx);
                }}
                className="h-2.5 w-2.5 rounded-full transition"
                style={{
                  backgroundColor:
                    idx === active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function RequestPickup() {
  const reduce = useReducedMotion();
  const coarse = useIsCoarsePointer();
  const btnMotion = useMemo(() => motionPress(!!reduce, coarse), [reduce, coarse]);

  const heroImages = useMemo(() => [vehicle2, vehicle6, vehicle4], []);
  const [heroPaused, setHeroPaused] = useState(false);

  // ✅ Formspree hook
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  // Local form state (so we can show success/error nicely and reset)
  const [frequency, setFrequency] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleFrequency = (label: string) => {
    setFrequency((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  return (
    <motion.div initial="hidden" animate="show">
      {/* ========================= HERO ========================= */}
      <section className="relative overflow-hidden min-h-[70vh] lg:min-h-[82vh] flex items-stretch">
        <HeroBgSlider images={heroImages} paused={heroPaused} setPaused={setHeroPaused} />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,61,46,0.78) 0%, rgba(11,61,46,0.60) 55%, rgba(11,61,46,0.55) 100%)",
          }}
        />

        <Container className="relative w-full">
          <div className="px-4 sm:px-6 lg:px-10 h-full">
            <div className="min-h-[70vh] lg:min-h-[82vh] flex flex-col items-center justify-center text-center">
              <motion.h1
                variants={fadeUp}
                custom={0}
                className="text-white font-extrabold tracking-tight leading-[1.02]
                           text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Request Pickup
              </motion.h1>

              <motion.div variants={fadeUp} custom={1} className="mt-6 text-white/90 text-xs font-semibold">
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>{" "}
                <span className="mx-1">›</span>
                <span className="text-white">Request Pickup</span>
              </motion.div>
            </div>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: GREEN, opacity: 0.55 }} />
      </section>

      {/* ========================= FORM SECTION ========================= */}
      <section className="bg-white">
        <Container className="py-12 md:py-14">
          <div className="px-4 sm:px-6 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[360px_1fr] lg:gap-10 items-start">
              {/* LEFT GREEN CARD */}
              <motion.aside
                variants={fadeUp}
                custom={0}
                className="rounded-sm overflow-hidden"
                style={{ backgroundColor: GREEN }}
              >
                <div className="p-8 sm:p-10 text-white">
                  <div className="text-2xl font-extrabold leading-snug">
                    Trusted And Reliable
                    <br />
                    Waste Collection!
                  </div>

                  <p className="mt-5 text-sm text-white/90 leading-relaxed font-semibold">
                    We offer customers regular collection of trash, on a scheduled or call basis, with a safe level of service.
                  </p>

                  <div className="mt-8 space-y-4 text-sm font-semibold">
                    <motion.a
                      {...btnMotion}
                      href={`tel:${site.phoneDigits}`}
                      className="flex items-center gap-3 text-white/95 hover:text-white transition"
                    >
                      <Phone size={16} />
                      <span>{site.phoneAltDisplay}</span>
                    </motion.a>

                    <motion.a
                      {...btnMotion}
                      href={`tel:${site.phoneDigits}`}
                      className="flex items-center gap-3 text-white/95 hover:text-white transition"
                    >
                      <Phone size={16} />
                      <span>{site.phoneDisplay}</span>
                    </motion.a>

                    <div className="h-px bg-white/15" />

                    <motion.a
                      {...btnMotion}
                      href={`mailto:${site.email}`}
                      className="flex items-center gap-3 text-white/95 hover:text-white transition break-all"
                    >
                      <Mail size={16} />
                      <span>{site.email}</span>
                    </motion.a>
                  </div>

                  <motion.div variants={fadeUp} custom={2} className="mt-10">
                    <motion.div {...btnMotion} className="w-full">
                      <Link
                        to="/contact"
                        className="
                          group w-full inline-flex items-center justify-center
                          bg-white rounded-sm
                          px-5 sm:px-6 py-4
                          font-extrabold text-sm
                          transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-white/40
                        "
                        style={{ color: ORANGE }}
                      >
                        <span className="mr-2">Contact Our Team</span>
                        <motion.span
                          className="inline-flex items-center"
                          initial={false}
                          animate={{ x: 0 }}
                          whileHover={reduce || coarse ? undefined : { x: 2 }}
                          whileTap={reduce ? undefined : { x: 1 }}
                          transition={{ duration: 0.16, ease: EASE }}
                        >
                          <ArrowUpRight size={18} />
                        </motion.span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.aside>

              {/* RIGHT FORM CARD */}
              <motion.div
                variants={fadeUp}
                custom={1}
                className="bg-white rounded-sm border border-slate-100 shadow-[0_30px_90px_rgba(2,6,23,0.10)]"
              >
                <div className="p-7 sm:p-8 md:p-10">
                  <motion.div variants={fadeUp} custom={0}>
                    <div className="text-xl font-extrabold text-[#0B3D2E]">Request Pickup</div>

                    <div className="mt-3 text-sm text-slate-600 leading-relaxed">
                      Please complete the form below, to request a quote, and we’ll be in touch. Or you can call us{" "}
                      <a className="font-bold underline underline-offset-4" style={{ color: GREEN }} href={`tel:${site.phoneDigits}`}>
                        {site.phoneAltDisplay}
                      </a>{" "}
                      /{" "}
                      <a className="font-bold underline underline-offset-4" style={{ color: GREEN }} href={`tel:${site.phoneDigits}`}>
                        {site.phoneDisplay}
                      </a>{" "}
                      and our specialists will provide the necessary help!
                    </div>
                  </motion.div>

                  {/* ✅ SUCCESS / ERROR banners */}
                  {state.succeeded && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="mt-7 rounded-sm border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
                    >
                      <div className="inline-flex items-center gap-2 font-semibold">
                        <CheckCircle2 size={18} />
                        Request sent successfully. We’ll contact you shortly.
                      </div>
                    </motion.div>
                  )}

                  {errorMsg && !state.succeeded && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="mt-7 rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
                    >
                      <div className="inline-flex items-center gap-2 font-semibold">
                        <AlertTriangle size={18} />
                        {errorMsg}
                      </div>
                    </motion.div>
                  )}

                  {/* ✅ Formspree submit */}
                  {!state.succeeded && (
                    <motion.form
                      variants={staggerWrap}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.25 }}
                      className="mt-8"
                      onSubmit={async (e) => {
                        setErrorMsg(null);

                        // Formspree will handle the POST, but we can block if frequency empty etc.
                        if (frequency.length === 0) {
                          e.preventDefault();
                          setErrorMsg("Please select at least one collection frequency option.");
                          return;
                        }

                        // Let Formspree handleSubmit run
                        try {
                          await handleSubmit(e);
                        } catch {
                          setErrorMsg("Something went wrong. Please try again.");
                        }
                      }}
                    >
                      {/* Optional email subject */}
                      <input type="hidden" name="_subject" value="Request Pickup Submission" />

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <FieldLabel>Enquiry Type</FieldLabel>
                          <SelectInput name="enquiryType" defaultValue="Washroom Hygiene Solutions" required>
                            <option>Washroom Hygiene Solutions</option>
                            <option>Residential Waste And Recycling Services</option>
                            <option>Commercial Waste And Industrial Services</option>
                            <option>Cleaning Services</option>
                            <option>Fumigation & Pest Control</option>
                            <option>Garbage Sorting & Recycling</option>
                          </SelectInput>
                        </div>

                        <div>
                          <FieldLabel>Industry</FieldLabel>
                          <SelectInput name="industry" defaultValue="Manufacturing Facilities" required>
                            <option>Manufacturing Facilities</option>
                            <option>Office Buildings</option>
                            <option>Retail & Shopping Malls</option>
                            <option>Hospitals & Clinics</option>
                            <option>Schools & Institutions</option>
                            <option>Residential Estates</option>
                          </SelectInput>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <div>
                          <FieldLabel>Container Size</FieldLabel>
                          <SelectInput name="containerSize" defaultValue="32 Gallon Container" required>
                            <option>32 Gallon Container</option>
                            <option>64 Gallon Container</option>
                            <option>1100L Bin</option>
                            <option>Skip / Large Container</option>
                          </SelectInput>
                        </div>

                        <div>
                          <FieldLabel>Quantity Of Containers</FieldLabel>
                          <SelectInput name="containerQty" defaultValue="2 Containers" required>
                            <option>1 Container</option>
                            <option>2 Containers</option>
                            <option>3 Containers</option>
                            <option>4+ Containers</option>
                          </SelectInput>
                        </div>
                      </div>

                      <motion.div variants={inputV} className="mt-6">
                        <FieldLabel>Collection Frequency</FieldLabel>

                        <div className="flex flex-wrap gap-6 sm:gap-8 text-sm text-slate-600">
                          {["Once Per Week", "Twice Per Week", "Thrice Per Week"].map((x) => (
                            <motion.label
                              key={x}
                              {...btnMotion}
                              className="inline-flex items-center gap-2 cursor-pointer select-none"
                            >
                              <input
                                type="checkbox"
                                checked={frequency.includes(x)}
                                onChange={() => toggleFrequency(x)}
                                className="h-4 w-4 rounded-sm border-slate-300 text-[#1B6B1B] focus:ring-[#1B6B1B]/20"
                              />
                              <span>{x}</span>
                            </motion.label>
                          ))}
                        </div>

                        {/* ✅ Important: send frequency array to Formspree */}
                        <input type="hidden" name="frequency" value={frequency.join(", ")} />
                      </motion.div>

                      <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <div>
                          <FieldLabel>First Name</FieldLabel>
                          <TextInput name="firstName" placeholder="Type Name" required />
                        </div>
                        <div>
                          <FieldLabel>Last Name</FieldLabel>
                          <TextInput name="lastName" placeholder="Type Name" required />
                        </div>
                      </div>

                      <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <div>
                          <FieldLabel>Email Address</FieldLabel>
                          <TextInput id="email" name="email" placeholder="you@example.com" type="email" required />
                          <ValidationError prefix="Email" field="email" errors={state.errors} />
                        </div>
                        <div>
                          <FieldLabel>Phone Number</FieldLabel>
                          <TextInput name="phone" placeholder="Phone Number" required />
                        </div>
                      </div>

                      <motion.div variants={inputV} className="mt-6">
                        <FieldLabel>Message</FieldLabel>
                        <motion.textarea
                          name="message"
                          className="w-full rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm min-h-32 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-[#1B6B1B]/15"
                          placeholder="Tell us your location and any extra details..."
                          required
                        />
                        <ValidationError prefix="Message" field="message" errors={state.errors} />
                      </motion.div>

                      <motion.div variants={inputV} className="mt-8">
                        <motion.button
                          type="submit"
                          disabled={state.submitting}
                          {...btnMotion}
                          className="
                            w-full rounded-sm
                            px-6 py-4 sm:py-5
                            font-extrabold text-sm
                            text-white
                            shadow-[0_18px_50px_rgba(249,168,38,0.25)]
                            focus:outline-none focus:ring-2 focus:ring-offset-2
                            disabled:opacity-60 disabled:cursor-not-allowed
                          "
                          style={{ backgroundColor: ORANGE }}
                        >
                          <span className="inline-flex items-center justify-center gap-2">
                            {state.submitting ? "Submitting..." : "Submit Request"}
                            <motion.span
                              className="inline-flex"
                              initial={false}
                              whileHover={reduce || coarse ? undefined : { x: 2, y: -1 }}
                              whileTap={reduce ? undefined : { x: 1 }}
                              transition={{ duration: 0.16, ease: EASE }}
                            >
                              <ArrowUpRight size={18} />
                            </motion.span>
                          </span>
                        </motion.button>

                        <motion.div variants={inputV} className="mt-6 text-[11px] text-slate-500 leading-relaxed font-semibold">
                          By submitting your information, you agree that our specialists may contact you via text messages
                          or phone calls and to use your data in accordance with our Privacy Policy.
                        </motion.div>
                      </motion.div>
                    </motion.form>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>
    </motion.div>
  );
}
