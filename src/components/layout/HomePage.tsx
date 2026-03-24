import { useState } from "react";
import { motion } from "framer-motion";
import { Preloader } from "@components/layout/Preloader";
import { Hero } from "@components/layout/Hero";
import { Projects } from "@components/layout/Projects";

export function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: preloaderDone ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Hero />
        <Projects />
      </motion.div>
    </>
  );
}
