"use client";

import { motion } from "framer-motion";
import { Award, Target, Trophy } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const achievements = [
  {
    title: "98.81%",
    subtitle: "JEE Main Percentile",
    icon: <Target className="w-7 h-7" />,
    description: "Top percentile among 1M+ candidates nationwide.",
    color: "#E8293A",
  },
  {
    title: "250+",
    subtitle: "LeetCode Problems",
    icon: <Award className="w-7 h-7" />,
    description: "Consistent focus on algorithms and data structures.",
    color: "#FF6B35",
  },
  {
    title: "Finalist",
    subtitle: "Major Hackathons",
    icon: <Trophy className="w-7 h-7" />,
    description: "Built and shipped products under strict deadlines.",
    color: "#E8293A",
  },
  {
    title: "GSSoC",
    subtitle: "Open Source Contributor",
    icon: <FaGithub className="w-7 h-7" />,
    description: "Actively contributing to the open-source ecosystem.",
    color: "#9B1C2E",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-28 relative">
      {/* Divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(232,41,58,0.3), transparent)" }}
      />

      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase mb-4 block" style={{ color: "#E8293A" }}>
            // milestones
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            Achievements &{" "}
            <span className="text-gradient">Recognition</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative rounded-2xl p-7 glass-card glass-card-hover overflow-hidden group text-center"
            >
              {/* Glow bg */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${item.color}10, transparent 60%)` }}
              />

              {/* Top accent */}
              <div
                className="absolute top-0 left-0 w-full h-0.5"
                style={{ background: `linear-gradient(90deg, transparent, ${item.color}60, transparent)` }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all group-hover:scale-110 duration-300"
                style={{
                  background: `${item.color}15`,
                  color: item.color,
                  boxShadow: `0 0 0 1px ${item.color}20`,
                }}
              >
                {item.icon}
              </div>

              <h3 className="text-2xl font-black font-heading text-white mb-1">{item.title}</h3>
              <h4 className="text-sm font-semibold text-white/70 mb-3">{item.subtitle}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
