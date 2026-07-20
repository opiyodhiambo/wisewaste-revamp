import Container from "../ui/Container";
import { motion, type Variants  } from "framer-motion";
import vehicle11 from "../../assets/vehicle11.png"
const GREEN = "#1B6B1B";
const ORANGE = "#F9A826";
const DARK = "#0B3D2E";
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export default function MissionVision() {
  const containerV = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.08,
      },
    },
  };

  const itemV: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: EASE_OUT },
    },
  };

  const imageV: Variants = {
    hidden: { opacity: 0, x: -60, scale: 0.98 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.9, ease: EASE_OUT },
    },
  };

  return (
    <section className="bg-white">
      <Container className="py-12 md:py-16">
        
        {/* Top paragraphs */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-5xl"
        >
          <motion.h2
            variants={itemV}
            className="text-3xl md:text-4xl font-extrabold"
            style={{ color: DARK }}
          >
            Building a Cleaner and More Sustainable Future
          </motion.h2>

          <motion.p
            variants={itemV}
            className="mt-6 text-slate-600 leading-8"
          >
            Wisewaste Solutions Limited is committed to providing reliable,
            environmentally responsible, and cost effective waste management
            services for homes, businesses, institutions, and industries across
            Kenya. By combining modern waste recovery practices with exceptional
            customer service, we help our clients reduce environmental impact
            while creating cleaner and healthier communities.
          </motion.p>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start"
        >
          {/* LEFT IMAGE */}
          <motion.div variants={imageV} className="order-1 w-full">
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6 }}
              src={vehicle11}
              alt="Mission Vision placeholder"
              className="w-full h-[240px] sm:h-[320px] lg:h-[310px] object-cover rounded-md"
              loading="lazy"
            />
          </motion.div>

          {/* RIGHT CONTENT */}
          <div className="grid gap-6">
            <motion.div
              variants={itemV}
              className="rounded-xl border border-slate-200 p-8 bg-white shadow-sm"
            >
              <div
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: GREEN }}
              >
                Our Mission
              </div>

              <h3
                className="mt-3 text-2xl font-extrabold"
                style={{ color: DARK }}
              >
                Delivering Responsible Waste Solutions
              </h3>

              <p className="mt-4 text-slate-600 leading-7">
                To engage the best, brightest, and most responsive people to
                innovate and deliver safe, reliable, and environmentally
                responsible waste management solutions that exceed customer
                expectations.
              </p>
            </motion.div>

            <motion.div
              variants={itemV}
              className="rounded-xl border border-slate-200 p-8 bg-white shadow-sm"
            >
              <div
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: GREEN }}
              >
                Our Vision
              </div>

              <h3
                className="mt-3 text-2xl font-extrabold"
                style={{ color: DARK }}
              >
                Leading Sustainable Waste Management
              </h3>

              <p className="mt-4 text-slate-600 leading-7">
                To be Kenya's most trusted provider of sustainable waste
                management, recycling, and environmental solutions through
                innovation, operational excellence, and customer satisfaction.
              </p>
            </motion.div>
          </div>
        </motion.div>
        {/* Values */}
<motion.div
  variants={containerV}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  className="mt-20"
>
  <motion.div variants={itemV} className="text-center">
    <div
      className="text-xs font-bold uppercase tracking-widest"
      style={{ color: GREEN }}
    >
      Company Culture
    </div>

    <h2
      className="mt-3 text-3xl md:text-4xl font-extrabold"
      style={{ color: DARK }}
    >
      Our Values
    </h2>

    <p className="mt-4 max-w-2xl mx-auto text-slate-600 leading-7">
      Everything we do is guided by a commitment to ethical business,
      environmental stewardship, and exceptional service delivery.
    </p>
  </motion.div>

  <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {[
      {
        title: "Integrity",
        desc: "We act honestly, transparently, and ethically in every engagement."
      },
      {
        title: "Reliability",
        desc: "Clients can depend on us for timely and consistent service delivery."
      },
      {
        title: "Sustainability",
        desc: "We promote responsible waste recovery that protects people and the environment."
      },
      {
        title: "Innovation",
        desc: "We continually improve our processes through modern technologies and ideas."
      },
      {
        title: "Customer First",
        desc: "Our clients remain at the center of every decision we make."
      },
      {
        title: "Safety",
        desc: "We prioritize the wellbeing of our employees, customers, and communities."
      },
    ].map((value) => (
      <motion.div
        key={value.title}
        variants={itemV}
        whileHover={{ y: -6 }}
        className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm"
      >
        <div
          className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-white"
          style={{ backgroundColor: GREEN }}
        >
          ✓
        </div>

        <h3
          className="mt-5 text-xl font-bold"
          style={{ color: DARK }}
        >
          {value.title}
        </h3>

        <p className="mt-3 text-slate-600 leading-7">
          {value.desc}
        </p>
      </motion.div>
    ))}
  </div>
</motion.div>
      </Container>
    </section>
  );
}
