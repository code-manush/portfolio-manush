"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, X, Layers, GitBranch, Zap, Shield } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import MagneticButton from "@/components/ui/magnetic-button";
import TiltCard from "@/components/ui/tilt-card";

import Link from "next/link";

import { projectsData } from "@/data/projects";

export default function Projects() {

  return (
    <section id="projects" className="py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,41,58,0.3), transparent)" }} />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase mb-4 block" style={{ color: "#E8293A" }}>// featured work</span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            Production-Grade <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm">Click any project to see full architecture breakdown</p>
        </motion.div>

        <div className="flex flex-col gap-32">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`flex flex-col lg:flex-row gap-14 lg:gap-20 items-center ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Tilt Card Image */}
              <TiltCard
                className="w-full lg:w-[58%] cursor-pointer"
                glowColor={`${project.accent}40`}
                intensity={8}
              >
                <Link href={`/projects/${project.slug}`}>
                  <div
                    className="relative rounded-2xl overflow-hidden border group"
                  style={{
                    borderColor: `${project.accent}25`,
                    boxShadow: `0 0 0 1px ${project.accent}15, 0 30px 80px rgba(0,0,0,0.5)`,
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={750}
                    className="w-full h-auto object-cover"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(0,0,0,0.6)" }}>
                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold" style={{ background: `${project.accent}cc`, backdropFilter: "blur(8px)" }}>
                      <Layers className="w-4 h-4" /> View Architecture
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-semibold text-white/90" style={{ background: `${project.accent}cc`, backdropFilter: "blur(8px)" }}>
                    Featured
                  </div>
                </div>
                </Link>
              </TiltCard>

              {/* Details */}
              <div className="w-full lg:w-[42%] flex flex-col gap-6">
                <div>
                  <span className="text-xs font-mono tracking-widest uppercase mb-2 block" style={{ color: project.accent }}>// 0{index + 1}</span>
                  <h3 className="text-3xl md:text-4xl font-bold font-heading text-white mb-2">{project.title}</h3>
                  <p className="text-muted-foreground font-medium mb-3">{project.tagline}</p>
                  <p className="text-muted-foreground/80 text-sm leading-relaxed">{project.description}</p>
                </div>
                <div className="space-y-2">
                  {project.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span style={{ color: project.accent }}>▸</span>{f}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 rounded-full font-mono text-white/70 border transition-all hover:text-white" style={{ background: `${project.accent}08`, borderColor: `${project.accent}20` }}>{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <MagneticButton>
                    <a href={project.github} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white border border-white/15 hover:border-primary/40 transition-all" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <FaGithub className="w-4 h-4" /> Code
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <Link href={`/projects/${project.slug}`} className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all" style={{ background: `linear-gradient(135deg, ${project.accent}, ${project.accent}bb)`, boxShadow: `0 0 20px ${project.accent}40` }}>
                      <ExternalLink className="w-4 h-4" /> Deep Dive
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
