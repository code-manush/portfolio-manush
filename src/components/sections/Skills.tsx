"use client";

import { motion } from "framer-motion";
import SkillsRadar from "@/components/ui/skills-radar";
import { 
  SiReact, SiNextdotjs, SiTailwindcss, SiJavascript, SiTypescript, 
  SiNodedotjs, SiExpress, SiMongodb, SiFirebase, SiPython, 
  SiPytorch, SiOpencv, SiGit, SiGithub, SiPostman, SiDocker, SiVercel,
  SiJsonwebtokens, SiGoogle
} from "react-icons/si";
import { TbBrain, TbApi } from "react-icons/tb";

const skillCategories = [
  {
    title: "Frontend",
    label: "01",
    color: "#E8293A",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    ],
  },
  {
    title: "Backend",
    label: "02",
    color: "#FF6B35",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#ffffff" },
      { name: "REST APIs", icon: TbApi, color: "#007ACC" },
      { name: "JWT", icon: SiJsonwebtokens, color: "#ffffff" }
    ],
  },
  {
    title: "Databases",
    label: "03",
    color: "#9B1C2E",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    title: "AI / ML",
    label: "04",
    color: "#E8293A",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
      { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },
      { name: "YOLOv8", icon: TbBrain, color: "#00FFFF" },
      { name: "Gemini API", icon: SiGoogle, color: "#4285F4" },
    ],
  },
  {
    title: "DevOps & Tools",
    label: "05",
    color: "#FF6B35",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#ffffff" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Vercel", icon: SiVercel, color: "#ffffff" },
    ],
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
            Tech <span className="text-gradient">Stack</span>
          </h2>
        </motion.div>

        {/* Two-column layout: Radar + Icon Wall */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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

          {/* Categories Wall */}
          <div className="flex flex-col gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="relative rounded-2xl p-6 glass-card glass-card-hover overflow-hidden group"
              >
                <span
                  className="absolute top-4 right-4 font-mono text-4xl font-black leading-none opacity-5 group-hover:opacity-10 transition-opacity"
                  style={{ color: category.color }}
                >
                  {category.label}
                </span>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-5 rounded-full" style={{ background: category.color, boxShadow: `0 0 6px ${category.color}80` }} />
                  <h3 className="text-lg font-bold font-heading text-white">{category.title}</h3>
                </div>
                
                {/* Icon Grid for this Category */}
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                  {category.skills.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      id={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      className="group/item relative transition-all duration-700"
                    >
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          repeatType: "mirror", 
                          delay: (idx % 3) * 0.4 + (idx % 2) * 0.2, // Offset animation phases
                          ease: "easeInOut" 
                        }}
                        className="flex flex-col items-center justify-center p-3 rounded-2xl glass-card relative overflow-hidden transition-all duration-300 group-hover/item:scale-110 group-hover/item:-translate-y-1 z-10 group-hover/item:z-20"
                        style={{ 
                          background: "rgba(255,255,255,0.02)", 
                          border: "1px solid rgba(255,255,255,0.05)" 
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = skill.color;
                          el.style.background = `rgba(255,255,255,0.04)`;
                          el.style.boxShadow = `0 0 20px ${skill.color}40, inset 0 0 10px ${skill.color}20`;
                          const icon = el.querySelector("svg");
                          if (icon) {
                            icon.style.color = skill.color;
                            icon.style.filter = `drop-shadow(0 0 8px ${skill.color})`;
                          }
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = "rgba(255,255,255,0.05)";
                          el.style.background = "rgba(255,255,255,0.02)";
                          el.style.boxShadow = "none";
                          const icon = el.querySelector("svg");
                          if (icon) {
                            icon.style.color = "rgba(255,255,255,0.5)";
                            icon.style.filter = "none";
                          }
                        }}
                      >
                        <skill.icon className="w-7 h-7 text-white/50 transition-all duration-300 group-hover/item:scale-110" />
                        <span className="mt-2 text-[9px] font-mono tracking-wider text-white/40 group-hover/item:text-white/90 transition-colors uppercase text-center w-full truncate">
                          {skill.name}
                        </span>
                      </motion.div>
                      
                      {/* Glow behind the card on hover */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 blur-lg -z-10"
                        style={{ background: skill.color }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
