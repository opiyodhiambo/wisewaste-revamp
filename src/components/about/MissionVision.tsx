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
          className="max-w-5xl text-sm leading-relaxed text-slate-600 space-y-6"
        >
          <motion.p variants={itemV}>
            Our commitment to sustainability and environmental responsibility is at the core of everything we do. We are
            always looking for new and innovative ways to reduce waste and promote sustainability, and we work with our
            clients to develop customized waste management plans that meet their specific needs and requirements.
          </motion.p>

          <motion.p variants={itemV}>
            We believe that waste management should be affordable and accessible to everyone, and that is why we offer
            our services at competitive rates. We also pride ourselves on our exceptional customer service, and our team
            is always ready and available to answer any questions or concerns you may have.
          </motion.p>

          <motion.p variants={itemV}>
            We are proud of the work we do, and we are committed to making Nairobi a cleaner, healthier, and more
            sustainable city. Thank you for considering our services, and we look forward to working with you.
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
          <motion.div variants={containerV} className="order-2">
            
            {/* Mission */}
            <motion.div variants={containerV}>
              <motion.div
                variants={itemV}
                className="text-xs font-semibold tracking-wide"
                style={{ color: GREEN }}
              >
                Number One Commercial Waste Collection Service Provider!
              </motion.div>

              <motion.h3
                variants={itemV}
                className="mt-4 text-3xl font-extrabold"
                style={{ color: DARK }}
              >
                Mission
              </motion.h3>

              <motion.p
                variants={itemV}
                className="mt-4 text-sm font-semibold leading-relaxed"
                style={{ color: ORANGE }}
              >
                To engage the best, brightest and most responsive people to innovate & create practices that ensure
                quality services and risk free outcomes.
              </motion.p>
            </motion.div>

            {/* Vision */}
            <motion.div variants={containerV} className="mt-10">
              <motion.div
                variants={itemV}
                className="text-xs font-semibold tracking-wide"
                style={{ color: GREEN }}
              >
                Leading Commercial & Residential Waste Collection Service Provider!
              </motion.div>

              <motion.h3
                variants={itemV}
                className="mt-4 text-3xl font-extrabold"
                style={{ color: DARK }}
              >
                Vision
              </motion.h3>

              <motion.p
                variants={itemV}
                className="mt-4 text-sm font-semibold leading-relaxed"
                style={{ color: ORANGE }}
              >
                To provide safe, consistent and quality services.
              </motion.p>
            </motion.div>

          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
