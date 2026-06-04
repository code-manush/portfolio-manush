"use client";

import { motion } from "framer-motion";
import { Code2, Trophy, GitMerge, Rocket } from "lucide-react";
import DecryptedText from "@/components/ui/decrypted-text";
import MagneticTag from "@/components/ui/magnetic-tag";
import TiltCard from "@/components/ui/tilt-card";
import CodeStreamBackground from "@/components/ui/code-stream-background";

const stats = [
  {
    title: "3★",
    subtitle: "CodeChef Rating",
    icon: <Trophy className="w-7 h-7" />,
    color: "#E8293A",
  },
  {
    title: "200+",
    subtitle: "DSA Problems Solved",
    icon: <Code2 className="w-7 h-7" />,
    color: "#FF6B35",
  },
  {
    title: "Production",
    subtitle: "Ready Projects Built",
    icon: <Rocket className="w-7 h-7" />,
    color: "#E8293A",
  },
  {
    title: "Full Stack & AI",
    subtitle: "Systems Architected",
    icon: <GitMerge className="w-7 h-7" />,
    color: "#9B1C2E",
  },
];

export default function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Divider line */}
      <div className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent, rgba(232,41,58,0.3), transparent)" }}
      />
      
      {/* Code Stream Background */}
      <CodeStreamBackground />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-7"
          >
            {/* Section label */}
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: "#E8293A" }}
            >
              // about me
            </span>

            <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight flex flex-col gap-1">
              <DecryptedText text="I Build Systems," speed={35} delay={100} className="block" />
              <DecryptedText text="Not Just Projects." speed={35} delay={400} className="block text-gradient neon-glow-text" />
            </h2>

            <div className="flex flex-col gap-4 text-muted-foreground text-base leading-relaxed border-l-2 pl-6"
              style={{ borderColor: "rgba(232,41,58,0.3)" }}
            >
              <p>
                I don't just write code; I architect systems. As a{" "}
                <strong className="text-white font-semibold">Full Stack Developer</strong>{" "}
                and{" "}
                <strong className="text-white font-semibold">AI Engineer</strong>, I specialize in bridging
                the gap between cutting-edge machine learning models and seamless web applications.
              </p>
              <p>
                From deploying computer vision models like YOLOv8 to building scalable MERN stack architectures, my focus is always on delivering robust, production-ready solutions.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mt-4">
              {["Full Stack Dev", "AI Engineering", "Problem Solving", "Open Source", "Production Deployments"].map((tag) => (
                <MagneticTag key={tag}>
                  <span
                    className="text-xs px-4 py-2 rounded-full font-mono text-white/70 border transition-all duration-300 hover:text-white hover:border-primary/60 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(232,41,58,0.2)] cursor-default block"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {tag}
                  </span>
                </MagneticTag>
              ))}
            </div>
          </motion.div>

          {/* Right — stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat, index) => (
                <TiltCard
                  key={index}
                  intensity={15}
                  glowColor={`${stat.color}40`}
                  className="relative rounded-2xl p-7 group border border-white/5 bg-black/40 backdrop-blur-xl hover:border-primary/30 hover:bg-black/60 transition-colors duration-500 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
                >
                  {/* Grid Pattern */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay rounded-[inherit] z-0"
                    style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
                  />

                  {/* Icon */}
                  <div
                    className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(232,41,58,0.2)]"
                    style={{ background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`, color: stat.color, border: `1px solid ${stat.color}30` }}
                  >
                    {stat.icon}
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold font-heading text-white mb-1.5 drop-shadow-md">{stat.title}</h3>
                    <p className="text-white/60 text-sm font-medium">{stat.subtitle}</p>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-500 z-10"
                    style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }}
                  />
                </TiltCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
