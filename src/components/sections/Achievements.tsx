"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Target, Trophy } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const achievements = [
  {
    title: "98.81",
    subtitle: "JEE Main Percentile",
    icon: <Target className="w-8 h-8" />,
    description: "Ranked in the top 1.2% among 1M+ candidates nationwide. Demonstrated extreme problem-solving capability under pressure.",
    color: "#E8293A",
    className: "md:col-span-2 md:row-span-1",
    numeric: 98.81,
    suffix: "%"
  },
  {
    title: "250",
    subtitle: "LeetCode Problems",
    icon: <Award className="w-8 h-8" />,
    description: "Consistent focus on algorithms and data structures.",
    color: "#FF6B35",
    className: "md:col-span-1 md:row-span-1",
    numeric: 250,
    suffix: "+"
  },
  {
    title: "Finalist",
    subtitle: "Major Hackathons",
    icon: <Trophy className="w-8 h-8" />,
    description: "Built and shipped products under strict deadlines.",
    color: "#E8293A",
    className: "md:col-span-1 md:row-span-1",
    numeric: null,
    suffix: ""
  },
  {
    title: "GSSoC",
    subtitle: "Open Source Contributor",
    icon: <FaGithub className="w-8 h-8" />,
    description: "Actively contributing to the open-source ecosystem, squashing bugs and building features.",
    color: "#9B1C2E",
    className: "md:col-span-2 md:row-span-1",
    numeric: null,
    suffix: ""
  },
];

function AchievementCard({ item, index }: { item: typeof achievements[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (isInView && item.numeric !== null) {
      const duration = 2000;
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(easeProgress * item.numeric);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(item.numeric);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, item.numeric]);

  const displayValue = item.numeric !== null 
    ? (item.numeric % 1 !== 0 ? count.toFixed(2) : Math.floor(count)) 
    : item.title;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-[2.5rem] p-px overflow-hidden group ${item.className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
      <div className="absolute inset-0 bg-[#080808] m-[1px] rounded-[39px] z-0" />
      
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{ background: `radial-gradient(600px circle at 50% 100%, ${item.color}15, transparent)` }}
      />
      
      <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
        <div className="flex justify-between items-start mb-auto">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 duration-500 shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${item.color}20, transparent)`,
              color: item.color,
              border: `1px solid ${item.color}30`,
            }}
          >
            {item.icon}
          </div>
          
          <div className="text-right max-w-[50%]">
             <h4 className="text-xs md:text-sm font-mono tracking-widest uppercase text-white/40">{item.subtitle}</h4>
          </div>
        </div>

        <div className="mt-16">
          <h3 
            className="text-5xl lg:text-7xl font-black font-heading tracking-tight mb-4 flex items-baseline gap-1 transition-colors duration-500" 
            style={{ color: isHovered ? item.color : '#ffffff' }}
          >
            {displayValue}
            {item.suffix && <span className="text-3xl lg:text-5xl text-white/30 font-medium">{item.suffix}</span>}
          </h3>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-sm">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-32 relative bg-[#030303]">
      <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ background: "linear-gradient(90deg, transparent, rgba(232,41,58,0.3), transparent)" }} />

      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase mb-4 block" style={{ color: "#E8293A" }}>
            // milestones
          </span>
          <h2 className="text-5xl md:text-7xl font-black font-heading tracking-tight">
            Achievements & <br/>
            <span className="text-gradient">Recognition</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item, index) => (
            <AchievementCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
