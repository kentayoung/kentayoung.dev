import { motion } from "framer-motion";

import Masthead from "../components/masthead";
import AboutSection from "../components/about-section";
import SkillsSection from "../components/skills-section";
import ContactSection from "../components/contact-section";
import Footer from "../components/footer";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Masthead />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </motion.div>
  );
};

export default Home;
