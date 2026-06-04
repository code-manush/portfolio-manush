"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, X, Layers, GitBranch, Zap, Shield } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import MagneticButton from "@/components/ui/magnetic-button";
import TiltCard from "@/components/ui/tilt-card";

import Link from "next/link";

type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  image: string;
  github: string;
  demo: string;
  accent: string;
  architecture: {
    layers: { name: string; icon: React.ReactNode; items: string[]; color: string }[];
  };
  highlights: { icon: React.ReactNode; label: string; value: string }[];
};

const projects: Project[] = [
  {
    slug: "traff-iq",
    title: "Traff-IQ",
    tagline: "AI-Powered Adaptive Traffic Management",
    description:
      "A real-time AI system that uses computer vision to intelligently manage urban traffic signals, detect violations, and prioritize emergency vehicles.",
    features: [
      "YOLOv8 vehicle detection & classification",
      "Real-time multi-camera traffic analysis",
      "Emergency vehicle prioritization",
      "Violation detection with evidence capture",
      "Smart adaptive signal optimization",
    ],
    tech: ["Python", "YOLOv8", "OpenCV", "PyTorch", "React", "Node.js"],
    image: "/traff-iq-mockup.png",
    github: "#",
    demo: "#",
    accent: "#E8293A",
    highlights: [
      { icon: <Zap className="w-4 h-4" />, label: "Latency", value: "<100ms" },
      { icon: <Shield className="w-4 h-4" />, label: "Accuracy", value: "94.3%" },
      { icon: <Layers className="w-4 h-4" />, label: "Cameras", value: "Multi-Feed" },
    ],
    architecture: {
      layers: [
        { name: "Input Layer", icon: <GitBranch className="w-4 h-4" />, items: ["Camera Feeds", "RTSP Streams", "Sensor Data"], color: "#3B82F6" },
        { name: "AI Core", icon: <Zap className="w-4 h-4" />, items: ["YOLOv8 Detection", "PyTorch Models", "OpenCV Processing"], color: "#E8293A" },
        { name: "Logic Engine", icon: <Layers className="w-4 h-4" />, items: ["Priority Queue", "Signal Controller", "Violation Tracker"], color: "#FF6B35" },
        { name: "Frontend", icon: <Shield className="w-4 h-4" />, items: ["React Dashboard", "Node.js API", "Real-time WebSockets"], color: "#9B1C2E" },
      ],
    },
  },
  {
    slug: "skillbuddy",
    title: "SkillBuddy",
    tagline: "AI-Powered Personalized Learning Platform",
    description:
      "An intelligent learning platform that uses Gemini AI to analyze skill gaps, create personalized learning paths, and track progress over time.",
    features: [
      "Adaptive learning path generation",
      "AI-driven skill gap analysis",
      "Gemini API integration for personalization",
      "Real-time progress tracking & analytics",
      "Smart content recommendations",
    ],
    tech: ["React", "Node.js", "MongoDB", "Gemini API", "Express.js", "JWT"],
    image: "/skillbuddy-mockup.png",
    github: "#",
    demo: "#",
    accent: "#9B1C2E",
    highlights: [
      { icon: <Zap className="w-4 h-4" />, label: "AI Model", value: "Gemini Pro" },
      { icon: <Shield className="w-4 h-4" />, label: "Auth", value: "JWT + Bcrypt" },
      { icon: <Layers className="w-4 h-4" />, label: "Stack", value: "MERN" },
    ],
    architecture: {
      layers: [
        { name: "Client", icon: <GitBranch className="w-4 h-4" />, items: ["React 18", "Tailwind CSS", "Framer Motion"], color: "#3B82F6" },
        { name: "API Layer", icon: <Zap className="w-4 h-4" />, items: ["Node.js", "Express.js", "JWT Auth"], color: "#9B1C2E" },
        { name: "AI Service", icon: <Layers className="w-4 h-4" />, items: ["Gemini API", "Prompt Engineering", "RAG Pipeline"], color: "#FF6B35" },
        { name: "Database", icon: <Shield className="w-4 h-4" />, items: ["MongoDB Atlas", "Redis Cache", "CDN Assets"], color: "#E8293A" },
      ],
    },
  },
];

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
          {projects.map((project, index) => (
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
