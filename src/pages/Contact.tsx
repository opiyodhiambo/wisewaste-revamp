import { motion } from "framer-motion";
import MapSection from "../components/services/MapSection";
import ContactFormSection from "../components/contact/ContactFormSection";
import SatisfactionSection from "../components/contact/SatisfactionSection";
import TestimonialsSection from "../components/contact/TestimonialsSection";
export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
    >
      <MapSection />
      <ContactFormSection />
      <SatisfactionSection />
      <TestimonialsSection /> 
    </motion.div>
  );
}