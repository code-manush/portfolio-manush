"use client";

import { motion } from "framer-motion";
import { CircleDashed, Loader2, GitCommit, GitPullRequest, GitBranch } from "lucide-react";

const LEARNING_NOW = [
  {
    topic: "Advanced GSAP Animations",
    id: "job_78a1",
    color: "#8b5cf6", // Purple for testing
    description: "Deep-diving into ScrollTrigger, morphSVG, and timeline sequencing for cinematic web experiences.",
    progress: 65,
  },
  {
    topic: "System Design at Scale",
    id: "job_92c4",
    color: "#3b82f6", // Blue for building
    description: "Studying distributed systems, consistent hashing, and designing for 10M+ concurrent users.",
    progress: 55,
  },
  {
    topic: "LLM Fine-tuning & RAG",
    id: "job_44f2",
    color: "#3b82f6", // Blue for building
    description: "Exploring retrieval-augmented generation pipelines and parameter-efficient fine-tuning (LoRA/QLoRA).",
    progress: 40,
  },
  {
    topic: "Rust for Systems",
    id: "job_11b8",
    color: "#6b7280", // Gray for queued
    description: "Learning memory safety, ownership model, and building CLI tools in Rust.",
    progress: 25,
  },
];

// Helper to determine CI stage
const getPipelineStage = (progress: number) => {
  if (progress < 30) return { label: "In Queue", icon: CircleDashed, color: "#6b7280", spin: false, border: "dashed", glow: false };
  if (progress < 60) return { label: "Building", icon: Loader2, color: "#3b82f6", spin: true, border: "solid", glow: true };
  return { label: "Testing", icon: Loader2, color: "#8b5cf6", spin: true, border: "solid", glow: true };
};

export default function LearningNow() {
  return (
    <section className="py-24 relative bg-[#050505]">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />

      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
        
        {/* Pipeline Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="border border-white/10 rounded-2xl p-6 md:p-8 bg-black/50 backdrop-blur-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <GitPullRequest className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold font-heading text-white tracking-tight">Continuous Learning Pipeline</h2>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-white/40" />
                    <span className="font-mono text-xs text-white/50">branch: <span className="text-white/80">main</span></span>
                  </div>
                  <span className="text-white/20 text-xs">|</span>
                  <div className="flex items-center gap-1.5">
                    <GitCommit className="w-3.5 h-3.5 text-white/40" />
                    <span className="font-mono text-xs text-white/50">commit: <span className="text-blue-400">#b92f4a</span></span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-mono text-white/50 bg-white/5 px-4 py-2.5 rounded-lg border border-white/5">
              <div className="flex flex-col items-start md:items-end gap-1">
                <span>Triggered by <span className="text-white">Manush</span></span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  Running for <span className="text-white">2 months</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pipeline Nodes */}
        <div className="relative pl-8 md:pl-0 pt-4 pb-12">
          {/* Main vertical line */}
          <div className="absolute left-[39px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/20 via-white/10 to-transparent rounded-full" />

          <div className="flex flex-col gap-12 md:gap-16">
            {LEARNING_NOW.map((item, i) => {
              const stage = getPipelineStage(item.progress);
              const isLeft = i % 2 !== 0;

              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex flex-col md:flex-row items-center w-full relative ${isLeft ? 'md:flex-row-reverse' : ''}`}
                >
                  
                  {/* Center Node Icon */}
                  <div className="absolute left-[39px] md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    {/* Glowing effect for active items */}
                    {stage.glow && (
                      <div 
                        className="absolute inset-0 rounded-full animate-ping opacity-20" 
                        style={{ backgroundColor: stage.color }} 
                      />
                    )}
                    <div 
                      className="w-10 h-10 rounded-full bg-[#050505] flex items-center justify-center z-10 transition-colors duration-300" 
                      style={{ 
                        borderWidth: "2px",
                        borderColor: stage.color, 
                        borderStyle: stage.border,
                        boxShadow: stage.glow ? `0 0 15px ${stage.color}40, inset 0 0 10px ${stage.color}20` : "none"
                      }}
                    >
                      <stage.icon className={`w-4 h-4 ${stage.spin ? 'animate-spin' : ''}`} style={{ color: stage.color }} />
                    </div>
                  </div>

                  {/* Horizontal Connector Line (Desktop only) */}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-[calc(50%-48px)] h-px bg-white/10 -z-10 ${isLeft ? 'right-[50%]' : 'left-[50%]'}`} />

                  {/* Job Card */}
                  <div className={`w-full md:w-1/2 flex pl-16 md:pl-0 ${isLeft ? 'md:pr-12 md:justify-end' : 'md:pl-12 md:justify-start'}`}>
                    <div 
                      className="w-full max-w-sm p-6 border rounded-xl bg-black/40 backdrop-blur-md group transition-all duration-300 relative overflow-hidden"
                      style={{ borderColor: "rgba(255,255,255,0.1)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = stage.color;
                        e.currentTarget.style.boxShadow = `0 10px 30px rgba(0,0,0,0.5), 0 0 20px ${stage.color}15`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Top border accent */}
                      <div className="absolute top-0 left-0 right-0 h-1 opacity-50 transition-colors duration-300" style={{ backgroundColor: stage.color }} />

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-widest font-bold" style={{ color: stage.color }}>{stage.label}</span>
                        </div>
                        <span className="text-white/30 text-xs font-mono">{item.id}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-2 tracking-tight transition-colors duration-300">{item.topic}</h3>
                      <p className="text-white/50 text-sm leading-relaxed mb-6">{item.description}</p>

                      {/* Progress Metrics */}
                      <div className="flex items-center justify-between text-xs font-mono pt-4 border-t border-white/10">
                        <span className="text-white/40">Task Completion</span>
                        <span style={{ color: stage.color }}>{item.progress}%</span>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
