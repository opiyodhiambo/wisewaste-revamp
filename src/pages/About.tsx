import { motion } from "framer-motion";
import AboutHero from "../components/about/AboutHero";
import AboutOverview from "../components/about/AboutOverview";
import MissionVision from "../components/about/MissionVision";
import RecyclingBand from "../components/about/RecyclingBand";
import WhyChooseUs from "../components/about/WhyChooseUs";
//import AboutArticlesCarousel from "../components/about/AboutArticlesCarousel";
export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
    >
      <AboutHero />
      <AboutOverview />
      <MissionVision />
      <RecyclingBand /> 
      <WhyChooseUs />
      {/*<AboutArticlesCarousel /> */}
    </motion.div>
  );
}