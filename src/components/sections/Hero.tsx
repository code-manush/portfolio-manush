"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import HolographicCard from "@/components/ui/holographic-card";
import MagneticButton from "@/components/ui/magnetic-button";
import WebGLShader from "@/components/ui/webgl-shader";
import { ArrowRight, Download, Code, Cpu, GitMerge } from "lucide-react";

const badges = [
  { icon: <Code className="w-3.5 h-3.5" />, text: "Full Stack MERN" },
  { icon: <Cpu className="w-3.5 h-3.5" />, text: "AI & Computer Vision" },
  { icon: <GitMerge className="w-3.5 h-3.5" />, text: "Open Source" },
];

const PASSION_WORDS = [
  "blending AI with sleek interfaces.",
  "building scalable web applications.",
  "crafting beautiful UI/UX designs.",
  "solving complex real-world problems.",
  "contributing to open source."
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = PASSION_WORDS[wordIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        const nextText = currentWord.substring(0, text.length - 1);
        setText(nextText);
        if (nextText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % PASSION_WORDS.length);
        }
      }, 40);
    } else {
      if (text === currentWord) {
        timeout = setTimeout(() => setIsDeleting(true), 2500);
      } else {
        timeout = setTimeout(() => {
          setText(currentWord.substring(0, text.length + 1));
        }, 80);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

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
          className="flex flex-col gap-6 lg:pl-10 xl:pl-16 pt-2 xl:pt-3"
        >
          {/* Status & Name - Mid Layer */}
          <motion.div
            style={{ y: nameY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-start gap-4"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-white/90 border border-white/10 backdrop-blur-md"
              style={{ background: "linear-gradient(90deg, rgba(232,41,58,0.15) 0%, rgba(255,255,255,0.03) 100%)" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for Opportunities
            </div>
            <h2 className="text-lg md:text-xl font-medium text-white/60 tracking-wide mt-2 uppercase font-mono">
              Hello, I'm <span className="text-white font-bold">Manush Patel</span>
            </h2>
          </motion.div>

          {/* Headline / Tagline - Closest Layer */}
          <motion.div
            style={{ y: taglineY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold leading-[1.08] tracking-tight"
              style={{ letterSpacing: letterSpread as any }}
            >
              <span className="text-white">Building systems</span><br />
              <span className="text-white/90">and ideas that</span><br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-400 to-orange-400" style={{ textShadow: "0 0 40px rgba(232,41,58,0.3)" }}>actually scale.</span>
            </motion.h1>
          </motion.div>

          {/* Subheading & CTAs - Static/Slowest Layer */}
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="flex flex-col gap-3 mt-2"
          >
            <div className="text-white/70 font-medium text-lg max-w-lg leading-relaxed min-h-[4.5rem]">
              CSE Student at <span className="text-white/90 font-semibold">IIIT Vadodara</span>.<br />
              Passionate about <span className="text-white/90">{text}</span>
              <span className="animate-pulse inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle" />
            </div>
            <div className="flex flex-wrap gap-2.5 mt-1">
              {badges.map((badge, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/80 border border-white/5 backdrop-blur-md hover:border-primary/50 hover:bg-primary/10 hover:text-white transition-all duration-300 cursor-default shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <span className="text-primary">{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <MagneticButton>
              <button
                className="group relative flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-sm overflow-hidden transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #E8293A 0%, #9B1C2E 100%)",
                  boxShadow: "0 0 20px rgba(232,41,58,0.3), 0 4px 15px rgba(0,0,0,0.3)",
                }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </MagneticButton>
            <MagneticButton>
              <a
                href="/resume.pdf" target="_blank" rel="noreferrer"
                className="group flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white/80 text-sm border border-white/10 hover:bg-white/5 hover:border-white/20 hover:text-white transition-all backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.1)] inline-block"
              >
                <span className="flex items-center gap-2">
                  Download Resume
                  <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Centerpiece - Holographic Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:w-1/2 flex justify-center mt-12 lg:mt-25"
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-semibold text-white/50 tracking-[0.3em] uppercase">Scroll</span>
        <div className="relative w-px h-16 bg-white/10 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-primary to-transparent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
