import { motion } from "framer-motion";
import HeroSlider from "../components/home/HeroSlider";
import SpecialtyAreasBand from "../components/home/SpecialtyAreasBand";
import HomeIntroSplit from "../components/home/HomeIntroSplit";
import ServicesShowcaseSlider from "../components/home/ServicesShowcaseSlider";
import IndustriesBand from "../components/home/IndustriesBand";
import CenteredIntro from "../components/home/CenteredIntro";
import HowItWorksBand from "../components/home/HowItWorksBand";
import StatsWithImage from "../components/home/StatsWithImage";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
    >
      <HeroSlider />

      
      {/* FULL WIDTH section (exactly like screenshot) */}
      <SpecialtyAreasBand />
      <HomeIntroSplit />
      <ServicesShowcaseSlider />
      <IndustriesBand />
      <CenteredIntro />
      <HowItWorksBand />
      <StatsWithImage />
     
    </motion.div>
  );
}