import Container from "../ui/Container";
import { Recycle, Leaf, Users, BadgeDollarSign } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import recyle from "../../assets/recyle.png"
const GREEN_BG = "#3E6F3F";
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const features = [
  {
    title: "Great Affordable Service",
    desc: "If your business is looking for reliable, cost effective general waste collection then you should choose us now!",
    Icon: BadgeDollarSign,
  },
  {
    title: "Green Environment",
    desc: "We will work with you to treat trash in the best possible way for environment and to save our beloved planet.",
    Icon: Leaf,
  },
  {
    title: "Trusted And Local Experts",
    desc: "We are here to help you manage your waste removal, regardless of the size and type of your waste.",
    Icon: Users,
  },
  {
    title: "Sustainable Management",
    desc: "Our team of more than 200 employees to carry out all essential operations daily to support our economy collection.",
    Icon: Recycle,
  },
];

export default function RecyclingBand() {
  // EXACT SAME STYLE as your SpecialtyAreasBand
  const containerV = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.085,
        delayChildren: 0.05,
      },
    },
  };

  const itemV: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_OUT, // ✅ CORRECT
    },
  },
};

  return (
    <section className="w-full overflow-hidden relative">
      
      {/* GREEN BACKGROUND WALL – renders first */}
      <motion.div
        initial={{ x: "100%" }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        style={{ backgroundColor: GREEN_BG }}
        className="absolute inset-0 z-0"
      />

      <Container className="relative z-10 py-14 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-12">
          
          {/* LEFT TEXT CONTENT */}
          <motion.div
            variants={containerV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-xl"
          >
            <motion.div variants={itemV}>
              <div className="text-xs font-semibold text-white/90">
                Home and Commercial Waste And Recycling Services
              </div>
            </motion.div>

            <motion.h2
              variants={itemV}
              className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight text-white"
            >
              Processing 62 Tonnes Of Recyclable <br className="hidden sm:block" />
              Waste Daily.
            </motion.h2>

            <motion.p
              variants={itemV}
              className="mt-5 text-sm leading-relaxed text-white/85"
            >
              We are a progressive business continually improving our services to provide a greater flexibility and
              broad range of solutions to ensure we are easy to work with.
            </motion.p>

            {/* FEATURES GRID */}
            <motion.div
              variants={containerV}
              className="mt-10 grid gap-10 sm:grid-cols-2"
            >
              {features.map((f) => (
                <motion.div
                  key={f.title}
                  variants={itemV}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                >
                  <f.Icon
                    size={34}
                    className="text-white/90"
                    strokeWidth={1.6}
                  />

                  <div className="mt-3 font-extrabold text-white text-sm">
                    {f.title}
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-white/80">
                    {f.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT FLOATING IMAGE – SAME STYLE ANIMATION SYSTEM */}
          <motion.div
            variants={containerV}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="relative"
          >
            <motion.div variants={itemV}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="
                  rounded-md overflow-hidden shadow-2xl
                  bg-white p-2
                "
              >
                <motion.img
                  src={recyle}
                  alt="Recycling placeholder"
                  className="
                    h-[320px] sm:h-[380px] lg:h-[420px]
                    w-full object-cover rounded-sm
                  "
                  loading="lazy"
                  initial={{ scale: 1.04 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
