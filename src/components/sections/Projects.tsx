"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { ExternalLink, X, Layers, GitBranch, Zap, Shield } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import MagneticButton from "@/components/ui/magnetic-button";
import TiltCard from "@/components/ui/tilt-card";

import Link from "next/link";

import { projectsData } from "@/data/projects";


function HorizontalProjectCard({ project, index }: { project: typeof projectsData[0]; index: number }) {
  return (
    <div className="w-[85vw] md:w-[65vw] h-[60vh] md:h-[65vh] shrink-0 relative flex flex-col md:flex-row rounded-[2rem] overflow-hidden border border-white/10 bg-[#050505] group shadow-2xl">
      
      {/* Left Text Content */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-12 flex flex-col justify-center relative z-20">
        <div className="mb-4">
          <span className="text-xs font-mono tracking-widest font-bold px-4 py-2 rounded-full bg-white/5 border border-white/10" style={{ color: project.accent }}>
            0{index + 1} // {project.tagline}
          </span>
        </div>
        
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight mb-4 text-white">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground/80 text-sm md:text-base lg:text-lg leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8 hidden md:flex">
          {project.tech.map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-full text-[10px] md:text-xs font-mono border border-white/10 bg-white/5 text-white/70">
              {t}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4 mt-auto">
          <MagneticButton>
            <a 
              href={project.github} 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-white transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${project.accent}, ${project.accent}80)`, boxShadow: `0 10px 30px -10px ${project.accent}` }}
            >
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5" /> Explore
            </a>
          </MagneticButton>
          <MagneticButton>
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full text-white transition-all hover:scale-105 border border-white/10 bg-white/5 hover:bg-white/10"
            >
              <FaGithub className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-black/50">
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent z-10 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 block md:hidden" />
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
        />
      </div>

      {/* Highlight Gradient Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(circle at 70% 50%, ${project.accent}, transparent)` }} />
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={containerRef} id="projects" className="relative h-[400vh] bg-[#030303]">
      <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ background: "linear-gradient(90deg, transparent, rgba(232,41,58,0.3), transparent)" }} />
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-end pb-[5vh] md:pb-[8vh]">
        
        {/* Fixed Title that stays in place while horizontal scrolling happens */}
        <div className="absolute top-[8vh] left-[5vw] z-20 pointer-events-none">
          <span className="text-xs font-mono tracking-[0.3em] uppercase mb-4 block" style={{ color: "#E8293A" }}>// featured work</span>
          <h2 className="text-5xl md:text-7xl font-black font-heading tracking-tight text-white drop-shadow-2xl">
            Spotlight <span className="text-gradient">Projects</span>
          </h2>
        </div>

        {/* Horizontal Slider */}
        <motion.div style={{ x }} className="flex gap-[5vw] px-[5vw] items-center w-max">
          {projectsData.map((project, index) => (
            <HorizontalProjectCard key={project.slug} project={project} index={index} />
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
