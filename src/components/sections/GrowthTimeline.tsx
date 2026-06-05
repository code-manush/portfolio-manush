"use client";

import { motion, useScroll, useTransform, useMotionValue, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { GraduationCap, Code, Briefcase, Rocket, TerminalSquare, Code2, BrainCircuit, GitMerge } from "lucide-react";

const TIMELINE = [
  {
    year: "2024",
    title: "JEE Main",
    subtitle: "98.81 Percentile",
    description: "Cleared JEE Main with top percentile among 1M+ students, unlocking doors to premier engineering institutions.",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "#FF6B35",
    tags: ["Mathematics", "Physics", "Chemistry"],
    status: "milestone",
  },
  {
    year: "2024 - Present",
    title: "IIIT Vadodara",
    subtitle: "B.Tech CSE",
    description: "Joined the Computer Science & Engineering program, diving deep into algorithms, OS, networks, and AI fundamentals.",
    icon: <Code className="w-5 h-5" />,
    color: "#E8293A",
    tags: ["CSE", "Systems Engineering"],
    status: "current",
  },
  {
    year: "2024 - 2025",
    title: "Full Stack Development",
    subtitle: "Mastering the MERN Stack",
    description: "Began my journey into web development, building robust backend architectures and highly interactive React applications.",
    icon: <TerminalSquare className="w-5 h-5" />,
    color: "#9B1C2E",
    tags: ["React", "Node.js", "MongoDB"],
    status: "milestone",
  },
  {
    year: "2025 - Present",
    title: "DSA & CP",
    subtitle: "Algorithmic Problem Solving",
    description: "Shifted focus towards mastering data structures and algorithms, achieving 3★ on CodeChef and solving 200+ problems.",
    icon: <Code2 className="w-5 h-5" />,
    color: "#FF6B35",
    tags: ["C++", "Algorithms", "CodeChef"],
    status: "current",
  },
  {
    year: "2025 - Present",
    title: "AI & Computer Vision",
    subtitle: "Machine Learning Engineering",
    description: "Started diving deep into neural networks, PyTorch, and deploying real-time computer vision models like YOLOv8.",
    icon: <BrainCircuit className="w-5 h-5" />,
    color: "#E8293A",
    tags: ["PyTorch", "YOLOv8", "OpenCV"],
    status: "current",
  },
  {
    year: "2025 - 2026",
    title: "Nav Astitva Foundation",
    subtitle: "Full Stack SDE Intern",
    description: "Built the NGO's core web platform with scalable MERN architecture and engineered an automated certificate generation system.",
    icon: <Briefcase className="w-5 h-5" />,
    color: "#9B1C2E",
    tags: ["Internship", "MERN", "Automation"],
    status: "milestone",
  },
  {
    year: "2025 - Present",
    title: "Spenta Engineers",
    subtitle: "Full Stack Developer",
    description: "End-to-end ownership of production applications — from architecture to deployment, SEO optimization, and infrastructure management.",
    icon: <Rocket className="w-5 h-5" />,
    color: "#E8293A",
    tags: ["Production", "Full Stack", "DevOps"],
    status: "current",
  },
  {
    year: "2026",
    title: "GirlScript Summer of Code",
    subtitle: "Open Source Contributor",
    description: "Actively contributed to multiple repositories, enhanced codebase quality, and collaborated with global maintainers.",
    icon: <GitMerge className="w-5 h-5" />,
    color: "#FF6B35",
    tags: ["GSSoC", "Open Source", "Community"],
    status: "milestone",
  },
];

function YearMatrix({ activeYear }: { activeYear: string }) {
  const [particles, setParticles] = useState<{ id: number, x: number, delay: number, duration: number, size: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 20,
      size: 0.8 + Math.random() * 1.5,
    }));
    setParticles(newParticles);
  }, [activeYear]);

  // Extract just the first 4 characters for the falling matrix (e.g., "2024 - Present" -> "2024")
  const displayYear = activeYear.substring(0, 4);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0">
      {particles.map((p) => (
        <motion.div
          key={`${activeYear}-${p.id}`}
          initial={{ y: "-10vh", opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, 0.4, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          className="absolute font-mono font-bold text-primary select-none blur-[1px]"
          style={{ left: `${p.x}%`, scale: p.size }}
        >
          {displayYear}
        </motion.div>
      ))}
    </div>
  );
}

function TimelineItem({
  item,
  index,
  isActive,
  isPast,
  onActive
}: {
  item: typeof TIMELINE[0];
  index: number;
  isActive: boolean;
  isPast: boolean;
  onActive: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Trigger when card enters the center of the viewport
  const isInViewCenter = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInViewCenter) {
      onActive(index);
    }
  }, [isInViewCenter, index, onActive]);

  // Tunnel effect: kicks in when the card is scrolling out the top (0.7 to 1.0)
  const scale = useTransform(scrollYProgress, [0.7, 1], [1, 0.8]);
  const tunnelOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
  const filter = useTransform(scrollYProgress, [0.7, 1], ["blur(0px)", "blur(12px)"]);

  return (
    <motion.div ref={ref} style={{ scale, opacity: tunnelOpacity, filter }} className="relative origin-top w-full mb-12 last:mb-0">

      {/* Central/Left Dot */}
      <motion.div
        animate={{
          borderColor: isActive ? item.color : "rgba(255,255,255,0.2)",
          boxShadow: isActive ? `0 0 20px ${item.color}80` : `0 0 0px transparent`,
        }}
        transition={{ duration: 0.5 }}
        className="absolute left-[11px] md:left-1/2 -translate-x-[11px] md:-translate-x-1/2 top-6 w-6 h-6 rounded-full flex items-center justify-center border-2 z-20 bg-[#080808]"
      >
        <motion.div
          animate={{
            scale: isActive ? [1, 1.5, 1] : 1,
            opacity: isActive ? [0.7, 1, 0.7] : 1
          }}
          transition={{ repeat: isActive ? Infinity : 0, duration: 1.5, ease: "easeInOut" }}
          className="w-2 h-2 rounded-full relative z-10"
          style={{ background: item.color }}
        />
      </motion.div>

      <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12' : 'md:ml-auto md:pl-12'} pl-10 md:pl-0 relative`}>
        {/* Bridge line (desktop only) */}
        <motion.div
          animate={{ opacity: isPast ? 0.2 : 0.5 }}
          className={`hidden md:block absolute top-[35px] w-12 h-[2px] ${isEven ? 'right-0' : 'left-0'} z-0`}
          style={{ background: `linear-gradient(${isEven ? '-90deg' : '90deg'}, ${item.color}, transparent)` }}
        />

        {/* Content Card Wrapper */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10"
        >
          {/* Content Card */}
          <motion.div
            animate={{
              opacity: isPast ? 0.4 : 1,
              scale: isActive ? 1.02 : 1,
              y: isActive ? -5 : 0,
              borderColor: isActive ? `${item.color}80` : "rgba(255,255,255,0.05)",
              boxShadow: isActive ? `0 10px 40px -10px ${item.color}40, inset 0 0 20px ${item.color}10` : `0 0 0 1px rgba(255,255,255,0.02)`
            }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
            className="rounded-2xl p-6 md:p-8 group bg-black/40 backdrop-blur-xl relative overflow-hidden border"
          >
            {/* Background decoration */}
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-bl-[100%] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none"
              style={{ background: `radial-gradient(circle at top right, ${item.color}, transparent)` }}
            />

            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5 relative z-10">
              <div className={`flex items-start gap-4 ${isEven ? 'md:flex-row-reverse md:text-right' : ''}`}>
                <div className="p-3 rounded-xl flex-shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-lg" style={{ background: `linear-gradient(135deg, ${item.color}20, ${item.color}05)`, color: item.color, border: `1px solid ${item.color}30` }}>
                  {item.icon}
                </div>
                <div className="mt-1">
                  <h3 className="text-xl font-bold font-heading text-white tracking-wide">{item.title}</h3>
                  <p className="text-sm text-white/60 font-medium mt-0.5">{item.subtitle}</p>
                </div>
              </div>
              <div className={`flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5 flex-shrink-0 mt-1 sm:mt-0 ${isEven ? 'md:items-start' : ''}`}>
                <span className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-full border shadow-inner" style={{ background: `${item.color}10`, color: item.color, borderColor: `${item.color}25` }}>
                  {item.year}
                </span>
                {item.status === "current" && (
                  <span className="flex items-center gap-1.5 text-[10px] text-green-400 font-mono tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
                    active
                  </span>
                )}
              </div>
            </div>

            <p className="text-white/70 text-sm leading-relaxed mb-6 relative z-10">{item.description}</p>

            {/* Tags (Scroll Links) */}
            <div className="flex flex-wrap gap-2 mt-6 relative z-20">
              {item.tags.map((tag) => (
                <button 
                  key={tag} 
                  onClick={() => {
                    const tagId = `skill-${tag.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
                    const el = document.getElementById(tagId);
                    
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      
                      // Flash highlight effect
                      const originalTransform = el.style.transform;
                      const originalZIndex = el.style.zIndex;
                      
                      el.style.transform = 'scale(1.15)';
                      el.style.zIndex = '50';
                      
                      // Highlight the inner card
                      const innerCard = el.children[0] as HTMLElement;
                      if (innerCard) {
                        const origBoxShadow = innerCard.style.boxShadow;
                        const origBorderColor = innerCard.style.borderColor;
                        innerCard.style.boxShadow = `0 0 40px ${item.color}80, inset 0 0 20px ${item.color}40`;
                        innerCard.style.borderColor = item.color;
                        
                        setTimeout(() => {
                          el.style.transform = originalTransform;
                          el.style.zIndex = originalZIndex;
                          innerCard.style.boxShadow = origBoxShadow;
                          innerCard.style.borderColor = origBorderColor;
                        }, 2000);
                      }
                    } else {
                      // Fallback to section
                      document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wide border bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Bottom glowing line on hover */}
            <div
              className="absolute bottom-0 left-0 w-full h-[2px] opacity-20 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function GrowthTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <YearMatrix activeYear={TIMELINE[activeIndex].year} />

      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ background: "linear-gradient(90deg, transparent, rgba(232,41,58,0.3), transparent)" }} />

      <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 relative z-20"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase mb-4 block" style={{ color: "#E8293A" }}>// journey & growth</span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            The <span className="text-gradient">Timeline</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm">A unified chronological map of my education, skills, and work experience.</p>
        </motion.div>

        <div ref={containerRef} className="relative pb-10">

          {/* Base Vertical line (faded) */}
          <div
            className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] rounded-full z-10"
            style={{ background: "rgba(232,41,58,0.15)" }}
          />

          {/* Glowing Scrollytelling Progress Line */}
          <motion.div
            className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] rounded-full origin-top z-20"
            style={{
              background: "linear-gradient(180deg, #E8293A 0%, #FF6B35 100%)",
              boxShadow: "0 0 20px rgba(232,41,58,0.8)",
              scaleY: pathHeight
            }}
          />

          <div className="relative z-20">
            {TIMELINE.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isActive={activeIndex === index}
                isPast={index < activeIndex}
                onActive={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
