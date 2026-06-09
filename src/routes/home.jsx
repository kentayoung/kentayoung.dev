import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>Kenta Young — Software Engineer</title>
        <meta name="description" content="Kenta Young — Software Engineer and Photographer based in Idaho. Over a decade of experience building Shopify storefronts and polished web experiences." />
        <link rel="canonical" href="https://kentayoung.dev/" />
        <meta property="og:url" content="https://kentayoung.dev/" />
      </Helmet>
      <Masthead />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </motion.div>
  );
};

export default Home;
