"use client";

import { motion } from "framer-motion";
import { TerminalSquare, Briefcase, Code } from "lucide-react";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Spenta Engineers",
    duration: "Present",
    icon: <TerminalSquare className="w-5 h-5" />,
    color: "#E8293A",
    responsibilities: [
      "End-to-end development of robust web applications.",
      "Deployment and cloud infrastructure management.",
      "SEO optimization for maximum visibility.",
      "Ongoing maintenance and scalable feature enhancements.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Nav Astitva Foundation",
    duration: "Past",
    icon: <Briefcase className="w-5 h-5" />,
    color: "#FF6B35",
    responsibilities: [
      "MERN stack development for core NGO platforms.",
      "Engineered an automated certificate generation system.",
      "Built a scalable web platform to handle growing traffic.",
    ],
  },
  {
    role: "Open Source Contributor",
    company: "GirlScript Summer of Code",
    duration: "Past",
    icon: <Code className="w-5 h-5" />,
    color: "#9B1C2E",
    responsibilities: [
      "Actively contributed to various open-source repositories.",
      "Collaborated with the community to resolve complex issues.",
      "Enhanced codebase quality and documentation.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-28 relative">
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(232,41,58,0.3), transparent)" }}
      />

      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase mb-4 block" style={{ color: "#E8293A" }}>
            // experience
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            Professional{" "}
            <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8 md:pl-12">
          {/* Vertical line */}
          <div
            className="absolute left-3 md:left-4 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(180deg, #E8293A, rgba(232,41,58,0.1))" }}
          />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Marker dot */}
                <div
                  className="absolute -left-[22px] md:-left-[26px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-background"
                  style={{
                    background: exp.color,
                    boxShadow: `0 0 12px ${exp.color}80`,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="glass-card rounded-2xl p-7 glass-card-hover relative overflow-hidden"
                >
                  {/* Icon bg decoration */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-bl-[100%] opacity-5"
                    style={{ background: exp.color }}
                  />

                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2.5 rounded-lg"
                        style={{ background: `${exp.color}15`, color: exp.color }}
                      >
                        {exp.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold font-heading text-white">{exp.role}</h3>
                        <h4 className="text-muted-foreground font-medium">{exp.company}</h4>
                      </div>
                    </div>
                    <span
                      className="text-xs px-3 py-1.5 rounded-full font-medium w-fit"
                      style={{
                        background: `${exp.color}15`,
                        color: exp.color,
                        border: `1px solid ${exp.color}30`,
                      }}
                    >
                      {exp.duration}
                    </span>
                  </div>

                  {/* Responsibilities */}
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span style={{ color: exp.color }} className="mt-0.5 text-xs">▸</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
