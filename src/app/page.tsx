"use client";

import { useState, useCallback } from "react";
import CinematicLoader from "@/components/features/CinematicLoader";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Achievements from "@/components/sections/Achievements";
import GrowthTimeline from "@/components/sections/GrowthTimeline";
import LearningNow from "@/components/sections/LearningNow";
import InteractiveTerminal from "@/components/features/InteractiveTerminal";
import Contact from "@/components/sections/Contact";
import MarqueeTicker from "@/components/ui/marquee-ticker";
import SectionCounter from "@/components/layout/section-counter";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      {/* Cinematic intro — plays once per session */}
      {!loaded && <CinematicLoader onComplete={handleLoaded} />}
      
      <SectionCounter />

      {/* Main content revealed after loader */}
      <div
        className="flex flex-col w-full min-h-screen"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        <Hero />
        <MarqueeTicker />
        <About />
        <GrowthTimeline />
        <Projects />
        <Skills />
        <LearningNow />
        <Achievements />
        <InteractiveTerminal />
        <Contact />
      </div>
    </>
  );
}
