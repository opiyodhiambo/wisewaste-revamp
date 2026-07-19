import { useRef, useState } from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { site } from "../../data/site";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { MapPin, Mail, Phone, ArrowUpRight, ArrowRight } from "lucide-react";

const GREEN = "#1B6B1B";
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];


// --- tiny helper: clamp ---
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function MapSection() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  /**
   * Magnetic feel:
   * - motion values follow cursor position inside the card
   * - spring makes it feel soft (premium)
   * - resets smoothly when leaving
   */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mxSpring = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.7 });
  const mySpring = useSpring(my, { stiffness: 220, damping: 22, mass: 0.7 });

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1

    // translate range (subtle)
    const tx = clamp((px - 0.5) * 16, -10, 10);
    const ty = clamp((py - 0.5) * 16, -10, 10);

    mx.set(tx);
    my.set(ty);
  };

  const resetMagnet = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section className="relative w-full h-[520px] md:h-[600px] overflow-hidden bg-white">
      {/* Map: full width */}
     <motion.iframe
  title="Wisewaste Location"
  src="https://www.google.com/maps?q=-1.3010546,36.8251087&output=embed"
  className="absolute inset-0 w-full h-full border-0"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  initial={{ opacity: 0, scale: 1.015 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 1.1, ease: EASE_OUT }}
/>

      {/* Soft overlay for readability */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Card on top of map */}
      <Container className="relative h-full">
        <motion.div
          ref={cardRef}
          className="
            absolute left-4 right-4 md:right-auto md:left-6
            top-6 md:top-1/2 md:-translate-y-1/2
            max-w-sm rounded-xl bg-white p-6
            border shadow-xl will-change-transform
          "
          style={{
            borderColor: "rgba(27,107,27,0.18)",
            x: mxSpring,
            y: mySpring,
          }}
          initial={{ opacity: 0, x: -24, y: 6 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.95, ease: EASE_OUT }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            resetMagnet();
          }}
          onMouseMove={handleMove}
          whileHover={{
            scale: 1.01,
            boxShadow: "0 28px 85px rgba(0,0,0,0.18)",
            transition: { duration: 0.45, ease: EASE_OUT },
          }}
        >
          {/* Header */}
          <motion.div
            className="flex items-start gap-3"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, ease: EASE_OUT, delay: 0.05 }}
          >
            <motion.div
              className="h-10 w-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: GREEN }}
              animate={{ scale: isHovering ? 1.03 : 1 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
            >
              <MapPin className="text-white" size={18} />
            </motion.div>

            <div className="min-w-0">
              <motion.h3
                className="text-lg font-extrabold"
                style={{ color: "#0B2E22" }}
                animate={{ y: isHovering ? -1 : 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                Nairobi Office
              </motion.h3>

              <motion.div
                className="mt-1 text-sm leading-relaxed"
                style={{ color: "#355E3B" }}
                animate={{ opacity: isHovering ? 0.95 : 1 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                {site.locationShort}
              </motion.div>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="mt-5 h-px w-full"
            style={{ backgroundColor: "rgba(27,107,27,0.18)" }}
            initial={{ scaleX: 0, transformOrigin: "left" }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, ease: EASE_OUT }}
          />

          {/* Contact rows */}
          <motion.div
            className="mt-4 space-y-3 text-sm"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
            }}
          >
            <Row
              icon={<Mail size={18} style={{ color: GREEN }} />}
              href={`mailto:${site.email}`}
              text={site.email}
              isHovering={isHovering}
            />

            <Row
              icon={<Phone size={18} style={{ color: GREEN }} />}
              href={`tel:${site.phoneDigits}`}
              text={site.phoneDisplay}
              isHovering={isHovering}
            />

            <Row
              icon={<Phone size={18} style={{ color: GREEN }} />}
              href={`tel:${site.phoneDigits}`}
              text={site.phoneAltDisplay}
              isHovering={isHovering}
            />
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.06 }}
          >
            <Link to="/request-pickup" className="group block">
              <motion.div
                whileHover={{ y: -1 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                <Button
  style={{
    backgroundColor: "#1B6B1B",
    color: "#FFFFFF",
  }}
  className="w-full cursor:pointer hover:opacity-95"
>
  <span className="inline-flex items-center justify-center gap-2">
    Send Request

    <span className="relative inline-flex w-[18px] h-[18px]">
      <span className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-200">
        <ArrowUpRight size={18} color="#FFFFFF" />
      </span>
      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ArrowRight size={18} color="#FFFFFF" />
      </span>
    </span>
  </span>
</Button>

              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function Row({
  icon,
  href,
  text,
  isHovering,
}: {
  icon: React.ReactNode;
  href: string;
  text: string;
  isHovering: boolean;
}) {
  return (
    <motion.div
      className="flex items-center gap-3"
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
      }}
      animate={{ opacity: isHovering ? 0.98 : 1 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
    >
      <motion.span
        className="shrink-0"
        whileHover={{
          y: [0, -3, 0],
          transition: { duration: 0.55, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {icon}
      </motion.span>

      <a
        href={href}
        className="font-semibold transition-opacity"
        style={{ color: GREEN }}
      >
        {text}
      </a>
    </motion.div>
  );
}
