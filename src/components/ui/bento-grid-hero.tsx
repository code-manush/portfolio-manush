"use client";

import { motion, Variants } from "framer-motion";
import { MapPin, GitMerge, Code2, Database, Terminal, Cpu, Sparkles } from "lucide-react";

export default function BentoGridHero({ imageUrl = "/IMG-20260209-WA0119.jpg" }: { imageUrl?: string }) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="w-full max-w-md mx-auto aspect-square md:aspect-[4/3] perspective-1000">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 grid-rows-3 gap-3 w-full h-full"
      >
        {/* Main Portrait Widget (Spans 2x2) */}
        <motion.div
          variants={item}
          className="col-span-2 row-span-2 relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a0a0f] shadow-2xl group"
        >
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${imageUrl}')` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
          <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
            <div>
              <h3 className="text-white font-bold tracking-wide shadow-black drop-shadow-md">Manush Patel</h3>
              <p className="text-white/70 text-xs mt-0.5 font-medium shadow-black drop-shadow-md">Systems & AI Engineer</p>
            </div>
            <div className="bg-emerald-500/20 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-[9px] font-bold tracking-widest uppercase">Available</span>
            </div>
          </div>
        </motion.div>

        {/* Location Widget (Top Right 1x1) */}
        <motion.div
          variants={item}
          className="col-span-1 row-span-1 relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl overflow-hidden flex flex-col items-center justify-center group"
        >
          {/* Subtle map pattern background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[length:10px_10px]" />

          <MapPin className="w-6 h-6 text-primary mb-2 relative z-10 group-hover:-translate-y-1 transition-transform" />
          <span className="text-[9px] text-white/50 font-mono relative z-10 uppercase tracking-widest mb-0.5">Base</span>
          <span className="text-xs font-bold text-white relative z-10">India</span>
        </motion.div>

        {/* Tech Stack Widget (Middle Right 1x1) */}
        <motion.div
          variants={item}
          className="col-span-1 row-span-1 relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl overflow-hidden flex flex-col items-center justify-center group"
        >
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#111] border border-white/20 flex items-center justify-center z-30 shadow-md group-hover:-translate-y-1 transition-transform delay-75">
              <Database className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#111] border border-white/20 flex items-center justify-center z-20 shadow-md group-hover:-translate-y-1 transition-transform delay-100">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="w-8 h-8 rounded-full bg-[#111] border border-white/20 flex items-center justify-center z-10 shadow-md group-hover:-translate-y-1 transition-transform delay-150">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
          <span className="text-[9px] text-white/50 font-mono mt-3 uppercase tracking-widest">Stack</span>
        </motion.div>

        {/* GitHub Stats Widget (Bottom Left 2x1) */}
        <motion.div
          variants={item}
          className="col-span-2 row-span-1 relative rounded-[2rem] border border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md shadow-xl overflow-hidden p-5 flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
              <GitMerge className="w-5 h-5 text-white/80" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">1,204</h4>
              <p className="text-[9px] text-white/50 uppercase tracking-widest mt-0.5">Commits</p>
            </div>
          </div>

          <div className="flex gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                {[...Array(3)].map((_, j) => (
                  <div
                    key={j}
                    className={`w-2.5 h-2.5 rounded-[2px] ${Math.random() > 0.4 ? 'bg-emerald-500/80' : 'bg-white/10'}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Widget (Bottom Right 1x1) */}
        <motion.div
          variants={item}
          className="col-span-1 row-span-1 relative rounded-3xl border border-primary/30 bg-primary/10 backdrop-blur-md shadow-[0_0_30px_rgba(232,41,58,0.1)] overflow-hidden flex flex-col items-center justify-center group cursor-pointer hover:bg-primary/20 transition-colors"
        >
          <Sparkles className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-[11px] font-bold text-white group-hover:text-primary transition-colors">View Work</span>
        </motion.div>

      </motion.div>
    </div>
  );
}
