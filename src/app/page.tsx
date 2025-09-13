"use client";

import { motion } from "framer-motion";
import FoodsPage from "../app/components/cards/page";
import HeroSection from "./components/hero/page";
import HeaderBar from "./components/navbar/page";
import OffersSection from "./components/offersection/page";
import Footer from "./components/footer/page"; // Add the footer import

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <HeaderBar />

      <main className="bg-white">
        <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="overflow-hidden">
          <HeroSection />
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="overflow-hidden mt-12">
          <OffersSection />
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="overflow-hidden mt-12">
          <FoodsPage />
        </motion.div>
      </main>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
}
