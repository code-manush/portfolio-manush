"use client";

import { motion } from "framer-motion";
import { Code2, Trophy, GitMerge, Rocket } from "lucide-react";

const stats = [
  {
    title: "250+",
    subtitle: "DSA Problems Solved",
    icon: <Code2 className="w-7 h-7" />,
    color: "#E8293A",
  },
  {
    title: "Finalist",
    subtitle: "Major Hackathons",
    icon: <Trophy className="w-7 h-7" />,
    color: "#FF6B35",
  },
  {
    title: "GSSoC",
    subtitle: "Open Source Contributor",
    icon: <GitMerge className="w-7 h-7" />,
    color: "#E8293A",
  },
  {
    title: "Live",
    subtitle: "Production Apps Built",
    icon: <Rocket className="w-7 h-7" />,
    color: "#9B1C2E",
  },
];

export default function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Divider line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(232,41,58,0.3), transparent)" }}
      />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-7"
          >
            {/* Section label */}
            <span
              className="text-xs font-mono tracking-[0.3em] uppercase"
              style={{ color: "#E8293A" }}
            >
              // about me
            </span>

            <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight">
              I Build{" "}
              <span className="text-gradient neon-glow-text">Systems</span>,<br />
              Not Just Projects.
            </h2>

            <div className="flex flex-col gap-4 text-muted-foreground text-base leading-relaxed border-l-2 pl-6"
              style={{ borderColor: "rgba(232,41,58,0.3)" }}
            >
              <p>
                My focus lies in{" "}
                <strong className="text-white font-semibold">Full Stack Development</strong>{" "}
                and{" "}
                <strong className="text-white font-semibold">AI Engineering</strong>. I bridge
                the gap between elegant user interfaces and robust, scalable backend architectures.
              </p>
              <p>
                Whether it's optimizing algorithms, designing resilient database schemas, or
                deploying high-availability applications — my approach is always centered on
                real-world impact.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {["Full Stack Dev", "AI Engineering", "Problem Solving", "Open Source", "Production Deployments"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full text-white/60 border transition-all hover:text-white hover:border-primary/40"
                  style={{ background: "rgba(232,41,58,0.05)", borderColor: "rgba(232,41,58,0.15)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative overflow-hidden rounded-2xl p-6 glass-card glass-card-hover"
              >
                {/* Glow corner */}
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl pointer-events-none"
                  style={{ background: `${stat.color}20` }}
                />
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${stat.color}15`, color: stat.color }}
                >
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold font-heading text-white mb-1">{stat.title}</h3>
                <p className="text-muted-foreground text-sm">{stat.subtitle}</p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 w-full h-0.5 opacity-50"
                  style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
