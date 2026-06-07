"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  SiReact, SiNextdotjs, SiTailwindcss, SiJavascript, SiTypescript, 
  SiNodedotjs, SiExpress, SiMongodb, SiFirebase, SiPython, 
  SiPytorch, SiOpencv, SiGit, SiGithub, SiPostman, SiDocker, SiVercel,
  SiJsonwebtokens, SiGoogle
} from "react-icons/si";
import { TbBrain, TbApi } from "react-icons/tb";
import { Cpu } from "lucide-react";

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
    color: "#3B82F6",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
      { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8" },
      { name: "YOLOv8", icon: TbBrain, color: "#00FFFF" },
      { name: "Gemini API", icon: SiGoogle, color: "#4285F4" },
    ],
  },
  {
    title: "DevOps",
    label: "05",
    color: "#10B981",
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
  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null);

  return (
    <section id="skills" className="py-28 relative overflow-hidden bg-[#020202]">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,41,58,0.3), transparent)" }} />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,41,58,0.03) 0%, transparent 65%)" }}
      />

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase mb-4 block text-[#E8293A]">// skill_tree.exe</span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white">
            Tech <span className="text-gradient">Tree</span>
          </h2>
        </motion.div>

        {/* TECH TREE CONTAINER */}
        <div className="w-full overflow-x-auto pb-16 pt-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <div className="min-w-max flex justify-center px-4 sm:px-16">
            <div className="flex items-center gap-10 sm:gap-20">
              
              {/* CENTRAL CORE NODE */}
              <div className="relative z-10 shrink-0">
                <motion.div 
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-[#E8293A]/40 bg-black flex flex-col items-center justify-center shadow-[0_0_60px_rgba(232,41,58,0.2)] relative z-10 cursor-crosshair group"
                  animate={{ boxShadow: ["0 0 30px rgba(232,41,58,0.1)", "0 0 70px rgba(232,41,58,0.4)", "0 0 30px rgba(232,41,58,0.1)"] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  onMouseEnter={() => setHoveredBranch("CORE")}
                  onMouseLeave={() => setHoveredBranch(null)}
                >
                  <div className="absolute inset-0 rounded-full border border-[#E8293A]/60 animate-[ping_3s_infinite]" />
                  <Cpu className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-500 ${hoveredBranch ? 'text-[#E8293A]' : 'text-white/50'}`} />
                  <span className={`text-[10px] sm:text-xs font-mono tracking-widest uppercase mt-3 transition-colors duration-500 ${hoveredBranch ? 'text-white' : 'text-white/30'}`}>System Core</span>
                </motion.div>
              </div>

              {/* BRANCHES */}
              <div className="flex flex-col gap-12 sm:gap-16 relative">
                
                {/* Vertical Trunk Line */}
                <div className="absolute left-[-2.5rem] sm:left-[-5rem] top-[50px] bottom-[50px] w-0.5 bg-white/10 -z-10" />

                {skillCategories.map((cat, i) => {
                  const isHovered = hoveredBranch === cat.title || hoveredBranch === "CORE";
                  const isSpecificHover = hoveredBranch === cat.title;
                  
                  return (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-center gap-8 sm:gap-16 relative group" 
                      onMouseEnter={() => setHoveredBranch(cat.title)} 
                      onMouseLeave={() => setHoveredBranch(null)}
                    >
                      {/* Connection from Trunk to Branch Node */}
                      <div className="absolute left-[-2.5rem] sm:left-[-5rem] w-10 sm:w-20 h-0.5 -z-10 transition-all duration-500" 
                           style={{ 
                             backgroundColor: isHovered ? cat.color : "rgba(255,255,255,0.1)",
                             boxShadow: isHovered ? `0 0 15px ${cat.color}` : "none"
                           }} 
                      />

                      {/* BRANCH NODE */}
                      <div className="relative z-10 shrink-0 w-40 sm:w-48">
                        <div 
                          className={`px-6 py-4 rounded-xl border transition-all duration-500 flex flex-col items-center justify-center cursor-crosshair`}
                          style={{
                            borderColor: isHovered ? cat.color : "rgba(255,255,255,0.1)",
                            backgroundColor: isHovered ? `${cat.color}15` : "rgba(10,10,10,0.8)",
                            boxShadow: isHovered ? `0 0 30px ${cat.color}30, inset 0 0 10px ${cat.color}10` : "0 0 20px rgba(0,0,0,0.5)"
                          }}
                        >
                          <span className="text-[10px] font-mono mb-1 opacity-50" style={{ color: isHovered ? cat.color : "rgba(255,255,255,0.5)" }}>[{cat.label}]</span>
                          <span className="font-bold font-heading tracking-wide text-sm sm:text-base" style={{ color: isHovered ? "#fff" : "rgba(255,255,255,0.6)" }}>
                            {cat.title}
                          </span>
                        </div>
                      </div>

                      {/* LEAVES (SKILLS) */}
                      <div className="flex gap-4 sm:gap-6 relative">
                        {/* Connection from Branch Node through Leaves */}
                        <div className="absolute left-[-2rem] sm:left-[-4rem] right-4 top-1/2 -translate-y-1/2 h-0.5 -z-10 transition-all duration-500" 
                             style={{ 
                               backgroundColor: isHovered ? `${cat.color}80` : "rgba(255,255,255,0.05)",
                               boxShadow: isHovered ? `0 0 10px ${cat.color}` : "none"
                             }} 
                        />

                        {cat.skills.map((skill, j) => (
                          <div key={j} className="relative z-10 group/skill">
                            <motion.div
                              whileHover={{ y: -5, scale: 1.1 }}
                              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center bg-[#050505] border transition-all duration-500"
                              style={{
                                borderColor: isSpecificHover ? skill.color : (isHovered ? cat.color : "rgba(255,255,255,0.1)"),
                                boxShadow: isSpecificHover ? `0 0 25px ${skill.color}50, inset 0 0 15px ${skill.color}30` : (isHovered ? `0 0 15px ${cat.color}20` : "0 5px 15px rgba(0,0,0,0.5)")
                              }}
                            >
                              <skill.icon 
                                className="w-7 h-7 sm:w-8 sm:h-8 transition-all duration-500" 
                                style={{ 
                                  color: isSpecificHover ? skill.color : (isHovered ? "#fff" : "rgba(255,255,255,0.3)"), 
                                  filter: isSpecificHover ? `drop-shadow(0 0 10px ${skill.color})` : "none" 
                                }} 
                              />
                            </motion.div>
                            
                            {/* Skill Name Label */}
                            <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono whitespace-nowrap transition-opacity duration-300 pointer-events-none ${isSpecificHover ? 'opacity-100' : 'opacity-0'}`} style={{ color: skill.color }}>
                              {skill.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
