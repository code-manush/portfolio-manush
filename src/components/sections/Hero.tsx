"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import HolographicCard from "@/components/ui/holographic-card";
import MagneticButton from "@/components/ui/magnetic-button";
import WebGLShader from "@/components/ui/webgl-shader";
import { ArrowRight, Download, Code, Cpu, GitMerge } from "lucide-react";

const badges = [
  { icon: <Code className="w-3.5 h-3.5" />, text: "Full Stack MERN" },
  { icon: <Cpu className="w-3.5 h-3.5" />, text: "AI & Computer Vision" },
  { icon: <GitMerge className="w-3.5 h-3.5" />, text: "Open Source" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Scroll-linked animations
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  // Parallax layers (different speeds for 3D depth)
  const bgTextY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]); // Deepest
  const bg1Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]); // slow parallax
  const bg2Y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]); // medium parallax

  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]); // Name
  const taglineY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]); // Tagline
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]); // Subtitle / Buttons
  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]); // 3D canvas

  const letterSpread = useTransform(scrollYProgress, [0, 0.4], ["normal", "0.05em"]);

  // Track scroll as a plain number for the ASCII canvas
  const [scrollNum, setScrollNum] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setScrollNum(v));

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-grid"
    >
      {/* WebGL plasma shader — depth layer 1 (slowest parallax) */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: canvasY }}>
        <WebGLShader />
      </motion.div>

      {/* Depth layer 1 — back glow (slowest) */}
      <motion.div
        style={{ y: bg1Y, background: "radial-gradient(circle, rgba(232,41,58,0.14) 0%, transparent 65%)" }}
        className="absolute top-[-5%] left-[-10%] w-[55vw] h-[55vw] rounded-full pointer-events-none animate-pulse-slow"
      />

      {/* Depth layer 2 — mid glow (medium parallax) */}
      <motion.div
        style={{ y: bg2Y, animationDelay: "2s" }}
        className="absolute bottom-[-10%] right-[-15%] w-[45vw] h-[45vw] rounded-full pointer-events-none animate-pulse-slow"
      >
        <div style={{ background: "radial-gradient(circle, rgba(155,28,46,0.10) 0%, transparent 65%)", width: "100%", height: "100%", borderRadius: "50%" }} />
      </motion.div>

      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(232,41,58,0.018) 2px, rgba(232,41,58,0.018) 3px)",
        }}
      />

      {/* Giant "MP" Background (Deepest Layer) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
        style={{ y: bgTextY }}
      >
        <span className="text-[65vw] font-black leading-none text-white/[0.015] tracking-tighter -mt-20">
          MP
        </span>
      </motion.div>

      {/* Main content — text + 3D */}
      <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text block — scroll-linked */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale }}
          className="flex flex-col gap-6"
        >
          {/* Status & Name - Mid Layer */}
          <motion.div
            style={{ y: nameY }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start gap-4"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white/80 border"
              style={{ background: "rgba(232,41,58,0.08)", borderColor: "rgba(232,41,58,0.25)" }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for Opportunities
            </span>
            <h2 className="text-xl md:text-2xl font-semibold text-white/70 font-mono tracking-tight mt-1">
              Hi, I'm <span className="text-white">Manush Patel</span>.
            </h2>
          </motion.div>

          {/* Headline / Tagline - Closest Layer */}
          <motion.div
            style={{ y: taglineY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.08] font-heading"
              style={{ letterSpacing: letterSpread as any }}
            >
              Building{" "}
              <span className="text-gradient" style={{ textShadow: "0 0 40px rgba(232,41,58,0.25)" }}>
                AI Systems
              </span>
              ,<br />
              Full Stack{" "}
              <span className="text-white/90">Products</span>,<br />
              and{" "}
              <span className="text-gradient-subtle">Ideas That Scale</span>.
            </motion.h1>
          </motion.div>

          {/* Subheading & CTAs - Static/Slowest Layer */}
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col gap-3 mt-2"
          >
            <p className="text-white/90 font-semibold text-lg">CSE Student at IIIT Vadodara</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {badges.map((badge, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/70 border border-white/10 hover:border-primary/30 hover:text-white transition-all"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <span className="text-primary">{badge.icon}</span>
                  {badge.text}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <MagneticButton>
              <button
                className="group flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-sm transition-all"
                style={{
                  background: "linear-gradient(135deg, #E8293A 0%, #9B1C2E 100%)",
                  boxShadow: "0 0 25px rgba(232,41,58,0.4), 0 4px 15px rgba(0,0,0,0.3)",
                }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </MagneticButton>
            <MagneticButton>
              <button
                className="group flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white/80 text-sm border border-white/15 hover:border-primary/40 hover:text-white transition-all"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                Download Resume
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Centerpiece - Holographic Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:w-1/2 flex justify-center mt-12 lg:mt-0"
        >
          <HolographicCard />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity: textOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
