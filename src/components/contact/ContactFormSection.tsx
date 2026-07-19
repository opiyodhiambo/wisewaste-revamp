
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { site } from "../../data/site";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";

const inquiryOptions = [
  "Garbage Collection",
  "Garbage Sorting & Segregation",
  "E-waste Recycling",
  "Plastic Recycling",
  "Metal Recycling",
  "Green Energy Generation",
  "Green Manure",
  "Trading & Exporting Recycled Materials",
];

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const pageStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.10, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14, filter: "blur(2px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: EASE_OUT, delay: i * 0.07 },
  }),
};

const cardIn = {
  hidden: { opacity: 0, y: 18, filter: "blur(2px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: EASE_OUT },
  },
};

const lineIn = {
  hidden: { scaleX: 0, opacity: 0, transformOrigin: "left" },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.9, ease: EASE_OUT } },
};

function ArrowSwap({ size = 18, color = "white" }: { size?: number; color?: string }) {
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

function MotionIcon({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <motion.span
      className="inline-flex items-center justify-center"
      whileHover={{
        y: [0, -3, 0],
        transition: { duration: 0.55, repeat: Infinity, ease: "easeInOut" },
      }}
      whileTap={{ scale: 0.98 }}
      aria-label={label}
    >
      {children}
    </motion.span>
  );
}

export default function ContactFormSection() {
  // ✅ Replace with your Formspree ID
  const FORMSPREE_ID = "xzdaekbw";

  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  return (
    <motion.section
      className="bg-white"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      variants={pageStagger}
    >
      <Container className="py-14 lg:py-20">
        <motion.div
          className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start"
          variants={pageStagger}
        >
          {/* LEFT COLUMN */}
          <motion.div
            className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
            variants={pageStagger}
          >
            <motion.h2
              className="text-2xl sm:text-[28px] lg:text-[34px] font-extrabold text-slate-900 leading-snug"
              variants={fadeUp}
              custom={0}
            >
              Providing A Regular Trash
              <br />
              Collection On A Schedule On A
              <br />
              Time Or Call In Service.
            </motion.h2>

            <motion.p
              className="mt-4 text-sm text-slate-500 leading-relaxed max-w-md mx-auto lg:mx-0"
              variants={fadeUp}
              custom={1}
            >
              We are your trusted partner in waste collection and materials recovery. From
              collection through sorting, recycling, and export, we put your waste back to work.
            </motion.p>

            {/* Nairobi block */}
            <motion.div className="mt-10" variants={fadeUp} custom={2}>
              <motion.div
                className="flex items-center justify-center lg:justify-start gap-2 text-[12px] font-semibold text-slate-800"
                variants={fadeUp}
                custom={0}
              >
                <motion.span
                  className="h-2 w-2 rounded-full"
                  style={{ background: GREEN }}
                  whileHover={{ scale: 1.25 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                />
                Nairobi Line:
              </motion.div>

              <motion.div className="mt-4 space-y-3 text-sm" variants={pageStagger}>
                {/* phones */}
                <motion.div
                  className="flex items-center justify-center lg:justify-start gap-2 text-slate-700"
                  variants={fadeUp}
                  custom={0}
                >
                  <MotionIcon label="Phone">
                    <Phone size={16} style={{ color: GREEN }} />
                  </MotionIcon>

                  <a href={`tel:${site.phoneDigits}`} className="font-semibold" style={{ color: GREEN }}>
                    {site.phoneAltDisplay}
                  </a>

                  <span className="text-slate-400">/</span>

                  <a href={`tel:${site.phoneDigits}`} className="font-semibold" style={{ color: GREEN }}>
                    {site.phoneDisplay}
                  </a>
                </motion.div>

                {/* location */}
                <motion.div
                  className="flex items-center justify-center lg:justify-start gap-2 text-slate-700"
                  variants={fadeUp}
                  custom={1}
                >
                  <MotionIcon label="Location">
                    <MapPin size={16} style={{ color: GREEN }} />
                  </MotionIcon>
                  <span className="text-slate-500">Location:</span>
                  <span className="font-medium" style={{ color: ORANGE }}>
                    EPZ Building, Kitengela, Kajiado.
                  </span>
                </motion.div>

                {/* hours */}
                <motion.div
                  className="flex items-center justify-center lg:justify-start gap-2 text-slate-700"
                  variants={fadeUp}
                  custom={2}
                >
                  <MotionIcon label="Hours">
                    <Clock size={16} style={{ color: GREEN }} />
                  </MotionIcon>
                  <span className="text-slate-500">Mon - Sat:</span>
                  <span className="font-medium" style={{ color: ORANGE }}>
                    {site.hours}
                  </span>
                </motion.div>
              </motion.div>

              <motion.div className="mt-6 flex justify-center lg:justify-start" variants={fadeUp} custom={3}>
                <Link to="/request-pickup" className="group inline-flex">
                  <Button className="rounded-none px-10 py-3 font-semibold text-white" style={{ background: GREEN }}>
                    <span className="inline-flex items-center gap-2">
                      Request Pickup
                      <ArrowSwap size={18} color="white" />
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Divider */}
            <motion.div className="mt-10" variants={lineIn}>
              <div className="border-t border-slate-200" />
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div className="max-w-xl mx-auto lg:mx-0" variants={pageStagger}>
            <motion.div
              className="bg-white border border-slate-100 rounded-none shadow-[0_26px_80px_rgba(0,0,0,0.18)] relative"
              variants={cardIn}
              whileHover={{
                y: -6,
                scale: 1.01,
                boxShadow: "0_34px_95px rgba(0,0,0,0.22)",
                transition: { duration: 0.55, ease: EASE_OUT },
              }}
            >
              <motion.div
                className="h-[3px] w-full"
                style={{ background: GREEN }}
                initial={{ scaleX: 0, transformOrigin: "left" }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 1.0, ease: EASE_OUT }}
              />

              <div className="p-7 sm:p-9">
                <motion.h3 className="text-lg font-extrabold text-slate-900" variants={fadeUp} custom={0}>
                  Send A Message
                </motion.h3>

                <motion.p className="mt-3 text-sm text-slate-500 leading-relaxed" variants={fadeUp} custom={1}>
                  Please complete the form below, to request a quote, and we’ll be in touch.
                </motion.p>

                {/* ✅ SUCCESS UI */}
                {state.succeeded ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                    className="mt-6 text-sm text-slate-600"
                  >
                    <div className="inline-flex items-center gap-2 font-semibold">
                      <CheckCircle2 size={18} style={{ color: GREEN }} />
                      Message sent successfully. We’ll get back to you shortly.
                    </div>
                  </motion.div>
                ) : (
                  <motion.form className="mt-7 grid gap-5" variants={pageStagger} onSubmit={handleSubmit}>
                    {/* optional subject for email */}
                    <input type="hidden" name="_subject" value="Website Inquiry / Request a Quote" />

                    <motion.div className="grid gap-5 sm:grid-cols-2" variants={pageStagger}>
                      <motion.div variants={fadeUp} custom={0}>
                        <label className="text-xs font-semibold text-slate-700">First Name</label>
                        <motion.input
                          name="firstName"
                          className="mt-2 w-full border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                          placeholder="Type here"
                          required
                          whileFocus={{ borderColor: GREEN, boxShadow: "0 0 0 3px rgba(27,107,27,0.18)" }}
                          transition={{ duration: 0.25, ease: EASE_OUT }}
                        />
                      </motion.div>

                      <motion.div variants={fadeUp} custom={1}>
                        <label className="text-xs font-semibold text-slate-700">Last Name</label>
                        <motion.input
                          name="lastName"
                          className="mt-2 w-full border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                          placeholder="Type here"
                          required
                          whileFocus={{ borderColor: GREEN, boxShadow: "0 0 0 3px rgba(27,107,27,0.18)" }}
                          transition={{ duration: 0.25, ease: EASE_OUT }}
                        />
                      </motion.div>
                    </motion.div>

                    <motion.div className="grid gap-5 sm:grid-cols-2" variants={pageStagger}>
                      <motion.div variants={fadeUp} custom={0}>
                        <label className="text-xs font-semibold text-slate-700">Email Address</label>
                        <motion.input
                          id="email"
                          name="email"
                          type="email"
                          className="mt-2 w-full border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                          placeholder="you@example.com"
                          required
                          whileFocus={{ borderColor: GREEN, boxShadow: "0 0 0 3px rgba(27,107,27,0.18)" }}
                          transition={{ duration: 0.25, ease: EASE_OUT }}
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} />
                      </motion.div>

                      <motion.div variants={fadeUp} custom={1}>
                        <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                        <motion.input
                          name="phone"
                          className="mt-2 w-full border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                          placeholder="Phone Number"
                          required
                          whileFocus={{ borderColor: GREEN, boxShadow: "0 0 0 3px rgba(27,107,27,0.18)" }}
                          transition={{ duration: 0.25, ease: EASE_OUT }}
                        />
                      </motion.div>
                    </motion.div>

                    <motion.div variants={fadeUp} custom={2}>
                      <label className="text-xs font-semibold text-slate-700">What Is Your Inquiry About?</label>
                      <motion.select
                        name="enquiryType"
                        className="mt-2 w-full border border-slate-200 bg-[#F5F5F5] px-4 py-3 text-sm outline-none"
                        required
                        defaultValue={inquiryOptions[0]}
                        whileFocus={{ borderColor: GREEN, boxShadow: "0 0 0 3px rgba(27,107,27,0.18)" }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                      >
                        {inquiryOptions.map((x) => (
                          <option key={x} value={x}>
                            {x}
                          </option>
                        ))}
                      </motion.select>
                    </motion.div>

                    <motion.div variants={fadeUp} custom={3}>
                      <label className="text-xs font-semibold text-slate-700">How We Can Help You?</label>
                      <motion.textarea
                        id="message"
                        name="message"
                        className="mt-2 w-full border border-slate-200 bg-white px-4 py-3 text-sm min-h-36 outline-none"
                        placeholder="Your Message"
                        required
                        whileFocus={{ borderColor: GREEN, boxShadow: "0 0 0 3px rgba(27,107,27,0.18)" }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                      />
                      <ValidationError prefix="Message" field="message" errors={state.errors} />
                    </motion.div>

                    <motion.div
                      variants={fadeUp}
                      custom={4}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.25, ease: EASE_OUT }}
                    >
                      <Button
                        type="submit"
                        disabled={state.submitting}
                        className="group w-full rounded-none py-4 font-semibold text-white disabled:opacity-60"
                        style={{ background: GREEN }}
                      >
                        <span className="inline-flex items-center justify-center gap-2">
                          {state.submitting ? "Sending..." : "Submit Request"}
                          <span className="inline-flex">
                            <ArrowSwap size={18} color="white" />
                          </span>
                        </span>
                      </Button>
                    </motion.div>
                  </motion.form>
                )}

                {/* email row */}
                <motion.div className="mt-6 flex items-center gap-2 text-sm" variants={fadeUp} custom={5}>
                  <MotionIcon label="Email">
                    <Mail size={16} style={{ color: GREEN }} />
                  </MotionIcon>
                  <a href={`mailto:${site.email}`} className="font-semibold" style={{ color: GREEN }}>
                    {site.email}
                  </a>
                </motion.div>

                <motion.div className="mt-6 h-px w-full" style={{ background: "rgba(27,107,27,0.14)" }} variants={lineIn} />
              </div>

              <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[radial-gradient(circle_at_top,black,transparent_55%)]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </motion.section>
  );
}
