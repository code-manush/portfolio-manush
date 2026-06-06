"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ReadingProgress({ accent }: { accent: string }) {
  const { scrollYProgress } = useScroll();
  
  // Smooth the progress so it doesn't jump abruptly
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
      {/* Background Track */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="6"
          className="text-white/5"
        />
        {/* Animated Progress Indicator */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke={accent}
          strokeWidth="6"
          strokeLinecap="round"
          style={{ pathLength: scaleY }}
        />
      </svg>
      {/* Inner Avatar / Icon */}
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center border bg-background"
        style={{ borderColor: `${accent}30`, boxShadow: `0 0 20px ${accent}20` }}
      >
        <span className="font-mono text-xs font-bold" style={{ color: accent }}>01</span>
      </div>
    </div>
  );
}
