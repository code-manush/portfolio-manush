"use client";

import { motion } from "framer-motion";
import { BookOpen, Cpu, Code2, Flame, ArrowRight } from "lucide-react";

// ✅ Update this JSON to change what's shown live
const LEARNING_NOW = [
  {
    topic: "Advanced GSAP Animations",
    category: "Frontend",
    icon: <Flame className="w-5 h-5" />,
    color: "#FF6B35",
    description: "Deep-diving into ScrollTrigger, morphSVG, and timeline sequencing for cinematic web experiences.",
    progress: 65,
  },
  {
    topic: "LLM Fine-tuning & RAG",
    category: "AI/ML",
    icon: <Cpu className="w-5 h-5" />,
    color: "#E8293A",
    description: "Exploring retrieval-augmented generation pipelines and parameter-efficient fine-tuning (LoRA/QLoRA).",
    progress: 40,
  },
  {
    topic: "System Design at Scale",
    category: "Architecture",
    icon: <Code2 className="w-5 h-5" />,
    color: "#9B1C2E",
    description: "Studying distributed systems, consistent hashing, and designing for 10M+ concurrent users.",
    progress: 55,
  },
  {
    topic: "Rust for Systems Programming",
    category: "Languages",
    icon: <BookOpen className="w-5 h-5" />,
    color: "#FF6B35",
    description: "Learning memory safety, ownership model, and building CLI tools in Rust.",
    progress: 25,
  },
];

export default function LearningNow() {
  return (
    <section className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,41,58,0.3), transparent)" }} />

      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase mb-4 block" style={{ color: "#E8293A" }}>// actively learning</span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            What I'm <span className="text-gradient">Learning Now</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
            I'm constantly pushing my boundaries. Here's what I'm exploring right now.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {LEARNING_NOW.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl p-6 glass-card glass-card-hover relative overflow-hidden"
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 w-full h-0.5 opacity-60" style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }} />

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl" style={{ background: `${item.color}15`, color: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: item.color }}>{item.category}</span>
                    <h3 className="text-base font-bold text-white font-heading">{item.topic}</h3>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1 flex-shrink-0" />
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{item.description}</p>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Progress</span>
                  <span style={{ color: item.color }}>{item.progress}%</span>
                </div>
                <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}80)` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
