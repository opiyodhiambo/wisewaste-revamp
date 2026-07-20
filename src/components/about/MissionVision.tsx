import Container from "../ui/Container";
import { motion, type Variants } from "framer-motion";
import vehicle11 from "../../assets/vehicle11.png";

const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const DARK = "#0B3D2E";
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function MissionVision() {
  const containerV: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.08,
      },
    },
  };

  const itemV: Variants = {
    hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: EASE_OUT },
    },
  };

  const imageV: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: EASE_OUT },
    },
  };

  const valuesData = [
    {
      title: "Integrity",
      desc: "We act honestly, transparently, and ethically in every engagement.",
      span: "lg:col-span-2",
      highlight: true,
    },
    {
      title: "Reliability",
      desc: "Clients can depend on us for timely and consistent service delivery.",
      span: "lg:col-span-1",
    },
    {
      title: "Sustainability",
      desc: "We promote responsible waste recovery that protects people and the environment.",
      span: "lg:col-span-1",
    },
    {
      title: "Innovation",
      desc: "We continually improve our processes through modern technologies and ideas.",
      span: "lg:col-span-1",
    },
    {
      title: "Customer First",
      desc: "Our clients remain at the center of every decision we make.",
      span: "lg:col-span-1",
    },
    {
      title: "Safety",
      desc: "We prioritize the wellbeing of our employees, customers, and communities.",
      span: "lg:col-span-3",
      accent: true,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50/50 py-16 md:py-24">
      {/* Dynamic Background SVG Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
        >
          <defs>
            <radialGradient id="greenGlow" cx="0%" cy="0%" r="50%">
              <stop offset="0%" stopColor="#1B6B1B" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#1B6B1B" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="orangeGlow" cx="100%" cy="100%" r="50%">
              <stop offset="0%" stopColor="#F9A826" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#F9A826" stopOpacity="0" />
            </radialGradient>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(11, 61, 46, 0.03)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#greenGlow)" />
          <rect width="100%" height="100%" fill="url(#orangeGlow)" />
          {/* Decorative Waves */}
          <path
            d="M-100 200 C 300 100, 500 300, 1500 150"
            stroke="rgba(27, 107, 27, 0.05)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M-100 220 C 300 120, 500 320, 1500 170"
            stroke="rgba(249, 168, 38, 0.05)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* Hero / Top Section */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            variants={itemV}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 bg-emerald-50 border border-emerald-100"
            style={{ color: GREEN }}
          >
            Who We Are
          </motion.div>

          <motion.h2
            variants={itemV}
            className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight"
            style={{ color: DARK }}
          >
            Building a Cleaner & More Sustainable Future
          </motion.h2>

          <motion.p
            variants={itemV}
            className="mt-6 text-slate-600 text-lg leading-relaxed"
          >
            Wisewaste Solutions Limited provides reliable, environmentally
            responsible, and cost-effective waste management across Kenya.
            By fusing modern waste recovery practices with exceptional service,
            we empower communities and businesses to minimize environmental impact.
          </motion.p>
        </motion.div>

        {/* Mission & Vision Offset Section */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid lg:grid-cols-12 gap-8 items-center"
        >
          {/* Asymmetrical Image Frame */}
          <motion.div
            variants={imageV}
            className="lg:col-span-5 relative group"
          >
            <div
              className="absolute -inset-2 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"
              style={{ backgroundColor: GREEN }}
            />
            <div className="relative overflow-hidden rounded-2xl bg-slate-100 shadow-xl border border-white">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src={vehicle11}
                alt="Wisewaste Vehicle"
                className="w-full h-[380px] lg:h-[480px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Cards overlapping/stacked layout */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              variants={itemV}
              className="relative p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm hover:shadow-md transition-all"
            >
              <div
                className="text-xs font-extrabold uppercase tracking-widest"
                style={{ color: GREEN }}
              >
                01. Our Mission
              </div>
              <h3
                className="mt-2 text-2xl font-bold tracking-tight"
                style={{ color: DARK }}
              >
                Delivering Responsible Waste Solutions
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                To engage the best, brightest, and most responsive people to
                innovate and deliver safe, reliable, and environmentally
                responsible waste management solutions that exceed customer
                expectations.
              </p>
            </motion.div>

            <motion.div
              variants={itemV}
              className="relative p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm hover:shadow-md transition-all lg:-translate-x-4"
            >
              <div
                className="text-xs font-extrabold uppercase tracking-widest"
                style={{ color: ORANGE }}
              >
                02. Our Vision
              </div>
              <h3
                className="mt-2 text-2xl font-bold tracking-tight"
                style={{ color: DARK }}
              >
                Leading Sustainable Waste Management
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                To be Kenya's most trusted provider of sustainable waste
                management, recycling, and environmental solutions through
                innovation, operational excellence, and customer satisfaction.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bento Grid Values Section */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-24"
        >
          <motion.div variants={itemV} className="text-center max-w-xl mx-auto">
            <div
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: GREEN }}
            >
              Company Culture
            </div>
            <h2
              className="mt-2 text-3xl md:text-4xl font-extrabold"
              style={{ color: DARK }}
            >
              Our Core Values
            </h2>
            <p className="mt-3 text-slate-600">
              Guided by an unwavering commitment to ethical business and
              environmental stewardship.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {valuesData.map((val) => (
              <motion.div
                key={val.title}
                variants={itemV}
                whileHover={{ y: -4 }}
                className={`group relative overflow-hidden p-8 rounded-2xl border transition-all duration-300 ${
                  val.span
                } ${
                  val.accent
                    ? "bg-slate-900 text-white border-slate-800"
                    : "bg-white/80 backdrop-blur-sm border-slate-200/80 hover:border-slate-300 shadow-sm"
                }`}
              >
                {/* Visual accent indicator */}
                <div
                  className="w-8 h-1 rounded-full mb-6"
                  style={{
                    backgroundColor: val.accent ? ORANGE : GREEN,
                  }}
                />

                <h3
                  className={`text-xl font-bold ${
                    val.accent ? "text-white" : ""
                  }`}
                  style={!val.accent ? { color: DARK } : {}}
                >
                  {val.title}
                </h3>

                <p
                  className={`mt-2 leading-relaxed ${
                    val.accent ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

