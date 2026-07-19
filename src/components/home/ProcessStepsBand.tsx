import { useMemo, useState } from "react";
import Container from "../ui/Container";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const GREEN = "#1B6B1B";

const ORANGE = "#F9A826";

const steps = [
  {
    label: "1.",
    title: "Provide Us With The Details",
    desc: "Share your location, service type, and preferred schedule so we can plan the best pickup/service arrangement.",
  },
  {
    label: "2.",
    title: "We Pick Up Trash From You",
    desc: "Our team arrives on schedule with the right equipment to collect waste safely and efficiently.",
  },
  {
    label: "3.",
    title: "Waste Payments",
    desc: "We confirm service delivery and payment based on the agreed plan — transparent and reliable.",
  },
  {
    label: "4.",
    title: "We Collect Waste In A Timely Manner",
    desc: "Regular collections based on your plan to ensure a clean and healthy environment.",
  },
];

const stats = [
  { value: "200", label: "Qualified Employees\nWork With Us" },
  { value: "15000", label: "Happy Clients" },
  { value: "62", label: "Tons Collected Daily" },
];

export default function ProcessStepsBand() {
  const [active, setActive] = useState(3); // highlighted last item like screenshot vibe
  const a = useMemo(() => steps[active], [active]);

  return (
    <section className="bg-white">
      {/* top centered heading */}
      <Container className="pt-12 md:pt-14">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-[11px] font-bold" style={{ color: GREEN }}>
            How it works
          </div>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-[#0B3D2E]">
            Providing Flexible & Trusted <br className="hidden sm:block" />
            Waste Collection Service!
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            We offer a range of waste management solutions for homes and businesses.
            Waste collection made simple and reliable — with eco-friendly practices and
            consistent scheduling.
          </p>

          <div className="mt-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-bold underline underline-offset-8"
              style={{ color: GREEN }}
            >
              Read More <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </Container>

      {/* big image band */}
      <div className="relative mt-10 md:mt-12">
        {/* background image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1612459303155-5b4b1d3e0b8a?auto=format&fit=crop&w=2400&q=80)",
          }}
        />
        {/* green overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,46,34,0.78) 0%, rgba(11,46,34,0.55) 55%, rgba(11,46,34,0.35) 100%)",
          }}
        />

        <Container className="relative py-10 md:py-14">
          <div className="grid gap-6 lg:grid-cols-[420px_1fr] items-start">
            {/* left floating card */}
            <div className="bg-white/95 backdrop-blur rounded-md shadow-[0_22px_70px_rgba(0,0,0,0.25)] overflow-hidden">
              <div className="p-6">
                <div className="text-[11px] font-bold" style={{ color: GREEN }}>
                  How it works
                </div>

                <h3 className="mt-2 text-lg md:text-xl font-extrabold text-[#0B3D2E] leading-snug">
                  Easy Steps For A Clean And <br /> Healthy Environment!
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  We offer garbage sorting and recycling to promote sustainable living
                  and greener environments.
                </p>

                {/* step selector */}
                <div className="mt-5 grid gap-2">
                  {steps.map((s, idx) => {
                    const isActive = idx === active;
                    return (
                      <button
                        key={s.title}
                        onClick={() => setActive(idx)}
                        className={[
                          "w-full text-left rounded-sm px-4 py-3 border transition",
                          isActive
                            ? "bg-[#F3F5EE] border-[#E6E9DC]"
                            : "bg-white border-slate-200 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span
                              className="text-xs font-extrabold"
                              style={{ color: isActive ? GREEN : "#64748b" }}
                            >
                              {s.label}
                            </span>
                            <span
                              className="text-sm font-bold"
                              style={{ color: isActive ? GREEN : "#0f172a" }}
                            >
                              {s.title}
                            </span>
                          </div>

                          {isActive && (
                            <CheckCircle2 size={18} style={{ color: GREEN }} />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* right long green panel */}
            <div
              className="rounded-md shadow-[0_22px_70px_rgba(0,0,0,0.25)] overflow-hidden"
              style={{ backgroundColor: GREEN }}
            >
              <div className="p-8 md:p-10 text-white">
                <div className="text-[11px] font-bold text-white/90">
                  {a.label} Selected Step
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={a.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h4 className="mt-2 text-xl md:text-2xl font-extrabold leading-tight">
                      {a.title}
                    </h4>
                    <p className="mt-4 text-sm md:text-base text-white/90 leading-relaxed max-w-2xl">
                      {a.desc}
                    </p>

                    <div className="mt-6">
                      <Link
                        to="/request-pickup"
                        className="inline-flex items-center gap-2 text-sm font-bold underline underline-offset-8"
                        style={{ color: ORANGE }}
                      >
                        Explore More <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* stats + image row below */}
      <Container className="py-12 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr] items-start">
          {/* stats left */}
          <div className="grid gap-6">
            {stats.map((s) => (
              <div key={s.value} className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-md bg-[#F3F5EE] flex items-center justify-center">
                  <span className="text-sm font-extrabold" style={{ color: GREEN }}>
                    ✳
                  </span>
                </div>
                <div>
                  <div className="text-lg font-extrabold" style={{ color: GREEN }}>
                    {s.value}
                  </div>
                  <div className="text-xs text-slate-600 whitespace-pre-line">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* image right */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-full max-w-[520px] bg-white shadow-soft border border-slate-100 rounded-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=1400&q=80"
                alt="Truck placeholder"
                className="w-full h-[220px] sm:h-[260px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}