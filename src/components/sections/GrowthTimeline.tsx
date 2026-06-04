"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code, Cpu, Briefcase, Rocket } from "lucide-react";

const TIMELINE = [
  {
    year: "2023",
    title: "JEE Main",
    subtitle: "98.81 Percentile",
    description: "Cleared JEE Main with top percentile among 1M+ students, unlocking doors to premier engineering institutions.",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "#FF6B35",
    tags: ["Mathematics", "Physics", "Chemistry"],
    status: "milestone",
  },
  {
    year: "2023",
    title: "IIIT Vadodara",
    subtitle: "B.Tech CSE — Enrolled",
    description: "Joined the Computer Science & Engineering program, diving deep into algorithms, OS, networks, and AI fundamentals.",
    icon: <Code className="w-5 h-5" />,
    color: "#E8293A",
    tags: ["CSE", "DSA", "Systems"],
    status: "milestone",
  },
  {
    year: "2024",
    title: "GirlScript Summer of Code",
    subtitle: "Open Source Contributor",
    description: "Contributed to multiple repositories, merged PRs, collaborated with global maintainers, and built open-source credibility.",
    icon: <Cpu className="w-5 h-5" />,
    color: "#9B1C2E",
    tags: ["GSSoC", "Open Source", "Community"],
    status: "milestone",
  },
  {
    year: "2024",
    title: "Nav Astitva Foundation",
    subtitle: "SDE Intern — MERN Stack",
    description: "First professional experience: built the NGO's core web platform with automated certification and scalable MERN architecture.",
    icon: <Briefcase className="w-5 h-5" />,
    color: "#E8293A",
    tags: ["MERN", "MongoDB", "Express"],
    status: "milestone",
  },
  {
    year: "2025",
    title: "Spenta Engineers",
    subtitle: "Full Stack Developer",
    description: "End-to-end ownership of production applications — from architecture to deployment, SEO, and ongoing maintenance.",
    icon: <Rocket className="w-5 h-5" />,
    color: "#FF6B35",
    tags: ["React", "Node.js", "DevOps"],
    status: "current",
  },
];

export default function GrowthTimeline() {
  return (
    <section className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,41,58,0.3), transparent)" }} />

      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase mb-4 block" style={{ color: "#E8293A" }}>// my journey</span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            Timeline of <span className="text-gradient">Growth</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm">Every milestone that shaped who I am today.</p>
        </motion.div>

        <div className="relative pl-6 md:pl-10">
          {/* Vertical line */}
          <div
            className="absolute left-1.5 md:left-3.5 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(180deg, #E8293A 0%, rgba(232,41,58,0.15) 100%)" }}
          />

          <div className="space-y-8">
            {TIMELINE.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex gap-6"
              >
                {/* Dot */}
                <div
                  className="absolute -left-[18px] md:-left-[24px] top-4 w-6 h-6 rounded-full flex items-center justify-center border-2 z-10 flex-shrink-0"
                  style={{
                    background: item.color,
                    borderColor: "#080808",
                    boxShadow: `0 0 16px ${item.color}70`,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="flex-1 rounded-2xl p-6 glass-card glass-card-hover relative overflow-hidden group"
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-[0.04]" style={{ background: item.color }} />

                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg flex-shrink-0" style={{ background: `${item.color}15`, color: item.color }}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-heading text-white">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full" style={{ background: `${item.color}15`, color: item.color }}>
                        {item.year}
                      </span>
                      {item.status === "current" && (
                        <span className="flex items-center gap-1 text-[10px] text-green-400 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          current
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, ti) => (
                      <span key={ti} className="text-[11px] px-2.5 py-1 rounded-full font-mono text-white/50 border border-white/8">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
