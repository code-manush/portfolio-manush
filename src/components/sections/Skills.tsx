"use client";

import { motion } from "framer-motion";
import SkillsRadar from "@/components/ui/skills-radar";

const skillCategories = [
  {
    title: "Frontend",
    label: "01",
    skills: ["React", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript"],
    color: "#E8293A",
  },
  {
    title: "Backend",
    label: "02",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT"],
    color: "#FF6B35",
  },
  {
    title: "Databases",
    label: "03",
    skills: ["MongoDB", "Firebase"],
    color: "#9B1C2E",
  },
  {
    title: "AI / ML",
    label: "04",
    skills: ["Python", "PyTorch", "OpenCV", "YOLOv8", "Gemini API"],
    color: "#E8293A",
  },
  {
    title: "DevOps & Tools",
    label: "05",
    skills: ["Git", "GitHub", "Postman", "Docker", "Vercel"],
    color: "#FF6B35",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,41,58,0.3), transparent)" }} />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,41,58,0.04) 0%, transparent 65%)" }}
      />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase mb-4 block" style={{ color: "#E8293A" }}>// technical arsenal</span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
        </motion.div>

        {/* Two-column layout: Radar + Skill Pills */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Radar chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center gap-6"
          >
            <h3 className="text-sm font-mono uppercase tracking-widest" style={{ color: "#E8293A" }}>Proficiency Radar</h3>
            <div
              className="w-full rounded-3xl p-8 glass-card"
              style={{ boxShadow: "0 0 60px rgba(232,41,58,0.05)" }}
            >
              <SkillsRadar />
            </div>
          </motion.div>

          {/* Skill pills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-1 gap-5"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="relative rounded-2xl p-5 glass-card glass-card-hover overflow-hidden group"
              >
                <span
                  className="absolute top-4 right-4 font-mono text-4xl font-black leading-none opacity-5 group-hover:opacity-10 transition-opacity"
                  style={{ color: category.color }}
                >
                  {category.label}
                </span>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ background: category.color, boxShadow: `0 0 6px ${category.color}80` }} />
                  <h3 className="text-sm font-bold font-heading text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.08, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="px-3 py-1 rounded-full text-xs font-medium text-white/80 border transition-all hover:text-white"
                      style={{ background: `${category.color}0a`, borderColor: `${category.color}20`, cursor: "none" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${category.color}60`;
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 10px ${category.color}30`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${category.color}20`;
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
