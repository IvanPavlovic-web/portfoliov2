import { useEffect, useState } from "react";
import { usePageTitle } from "@hooks/usePageTitle";
import { Preloader } from "@components/layout/Preloader";
import { Hero } from "@components/layout/Hero";
import { Projects } from "@components/layout/Projects";
import { Certificates } from "@components/layout/Certificates";
import { JobHistory } from "@components/layout/JobHistory";
import { FAQ } from "@components/layout/FAQ";
import { Services } from "@components/layout/Services";
import { Contact } from "@components/layout/Contact";

export function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  usePageTitle(
    "Ivan Pavlovic - Frontend Developer",
    "Portfolio of Ivan Pavlovic, a frontend developer specializing in React, TypeScript, and modern UI.",
  );

  useEffect(() => {
    // Keep the page anchored at the top while the preloader is active.
    const prevOverflow = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;
    const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (!preloaderDone) {
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
    } else {
      document.body.style.overflow = prevOverflow;
      document.body.style.overscrollBehavior = prevOverscroll;
    }

    scrollToTop();
    const rafId = window.requestAnimationFrame(scrollToTop);

    return () => {
      window.cancelAnimationFrame(rafId);
      document.body.style.overflow = prevOverflow;
      document.body.style.overscrollBehavior = prevOverscroll;
    };
  }, [preloaderDone]);

  return (
    <>
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      <div
        aria-hidden={!preloaderDone}
        style={{
          visibility: preloaderDone ? "visible" : "hidden",
          pointerEvents: preloaderDone ? "auto" : "none",
        }}
      >
        <Hero animateName={preloaderDone} />
        <Projects />
        <Certificates />
        <JobHistory />
        <FAQ />
        <Services />
        <Contact />
      </div>
    </>
  );
}
