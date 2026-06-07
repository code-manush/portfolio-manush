"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal, Activity, Star } from "lucide-react";

// Number counting animation hook
function useCounter(end: number, decimals = 0, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(easeProgress * end);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return { count: count.toFixed(decimals), ref };
}

export default function Achievements() {
  const leetcodeCount = useCounter(250, 0);
  const codechefCount = useCounter(3, 0);
  const ratingCount = useCounter(1614, 0); // Assuming ~1614 is a 3 star rating, makes for a nice animation
  const shippedCount = useCounter(2, 0);

  const [dateStr, setDateStr] = useState("");
  useEffect(() => {
    setDateStr(new Date().toISOString());
    const interval = setInterval(() => setDateStr(new Date().toISOString()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="achievements" className="py-24 relative bg-[#020202] font-mono">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="text-[#E8293A] text-[10px] md:text-xs tracking-[0.2em] mb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              [ SYSTEM.METRICS ]
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tighter">
              Telemetry & <span className="text-[#E8293A]">Analytics</span>
            </h2>
          </div>
          <div className="text-[10px] text-white/40 text-left md:text-right flex flex-col gap-1">
            <div>SYS_TIME: {dateStr}</div>
            <div className="flex items-center md:justify-end gap-2 text-green-500">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              LIVE_STREAM: CONNECTED
            </div>
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">
          
          {/* PRIORITY 1: CODECHEF (Large panel) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-7 border border-white/10 bg-[#050505] p-6 relative overflow-hidden flex flex-col min-h-[300px]"
          >
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="text-[10px] text-[#3b82f6] tracking-widest uppercase">ALGO_RATING // CODECHEF</div>
              <Activity className="w-4 h-4 text-[#3b82f6] opacity-50" />
            </div>
            
            <p className="text-white/40 text-xs max-w-sm mb-6 relative z-10">
              Achieved 3-Star competitive programming rating. Proven expertise in advanced data structures, graph theory, and dynamic programming under strict time limits.
            </p>

            {/* Rating Graph Visual */}
            <div className="flex-1 w-full relative mb-4 flex items-end justify-between px-2 gap-2 opacity-80">
              {/* Stepped area chart simulating rating history */}
              <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-50">
                <path d="M0 40 L0 35 L20 35 L20 25 L40 25 L40 30 L60 30 L60 15 L80 15 L80 5 L100 5 L100 40 Z" fill="rgba(59,130,246,0.15)" />
                <path d="M0 35 L20 35 L20 25 L40 25 L40 30 L60 30 L60 15 L80 15 L80 5 L100 5" fill="none" stroke="#3b82f6" strokeWidth="1" strokeLinejoin="round" />
                <circle cx="100" cy="5" r="2" fill="#3b82f6" className="animate-pulse" />
              </svg>
            </div>

            <div className="mt-auto relative z-10 flex items-end justify-between">
              <div ref={ratingCount.ref}>
                <div className="text-5xl md:text-7xl font-bold tracking-tighter text-[#3b82f6]">
                  {ratingCount.count}<span className="text-xl md:text-2xl text-white/30 ml-2 font-normal">RATING</span>
                </div>
              </div>
              <div className="flex gap-1 mb-2" ref={codechefCount.ref}>
                 {/* Render 3 stars */}
                 {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.3 + 0.5, type: "spring" }}
                    >
                      <Star className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                    </motion.div>
                 ))}
              </div>
            </div>
          </motion.div>

          {/* PRIORITY 2: HACKATRON 2025 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-5 border border-white/10 bg-[#050505] p-6 relative flex flex-col min-h-[300px]"
          >
             <div className="text-[10px] text-[#E8293A] tracking-widest uppercase mb-4">BUILD_SPRINTS // HACKATRON_2025</div>
             
             <p className="text-white/40 text-[11px] mb-4">Competed in intense 36-hour sprints to architect, build, and pitch a complete product.</p>

             {/* Structured Details */}
             <div className="flex-1 bg-black/50 border border-white/5 p-4 rounded text-[10px] md:text-xs font-mono flex flex-col gap-3 mb-6">
               <div className="flex items-start">
                 <span className="text-white/40 w-20 shrink-0">EVENT:</span>
                 <span className="text-white">Hackatron 2025</span>
               </div>
               <div className="flex items-start">
                 <span className="text-white/40 w-20 shrink-0">SCOPE:</span>
                 <span className="text-white">National Level / 36-Hours</span>
               </div>
               <div className="flex items-start">
                 <span className="text-white/40 w-20 shrink-0">BUILD:</span>
                 <span className="text-white leading-relaxed text-[#E8293A] font-bold">Traff-iq</span>
               </div>
               <div className="flex items-start mt-auto pt-3 border-t border-white/10">
                 <span className="text-white/40 w-20 shrink-0">STATUS:</span>
                 <span className="text-green-400 font-bold tracking-widest animate-pulse text-[10px] md:text-xs whitespace-nowrap">[ FINALIST / 1000 TEAMS ]</span>
               </div>
             </div>

             <div className="text-4xl md:text-5xl font-bold tracking-tighter text-[#E8293A] mt-auto">
               FINALIST
             </div>
          </motion.div>

          {/* PRIORITY 3: DSA / LEETCODE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="md:col-span-4 border border-white/10 bg-[#050505] p-6 relative flex flex-col min-h-[200px]"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-[10px] text-[#f59e0b] tracking-widest uppercase">ALGO_THROUGHPUT</div>
            </div>

            <p className="text-white/40 text-[11px] mb-auto">Consistent focus on algorithms and data structures.</p>

            {/* Bar Chart */}
            <div className="flex items-end h-16 gap-1 mt-6 mb-4">
              {Array.from({ length: 12 }).map((_, i) => {
                const height = 20 + Math.random() * 80;
                return (
                  <div 
                    key={i} 
                    className="flex-1 bg-[#f59e0b] rounded-t-sm transition-all duration-1000 opacity-80"
                    style={{ height: `${height}%`, animation: `pulse ${2 + Math.random()}s infinite alternate` }}
                  />
                );
              })}
            </div>

            <div ref={leetcodeCount.ref}>
              <div className="text-3xl font-bold tracking-tighter text-[#f59e0b]">
                {leetcodeCount.count}<span className="text-xl text-white/30 ml-1 font-normal">+</span>
              </div>
            </div>
          </motion.div>

          {/* PRIORITY 4: OPEN SOURCE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 border border-white/10 bg-[#050505] p-6 relative flex flex-col min-h-[200px]"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-[10px] text-[#10B981] tracking-widest uppercase">OS_CONTRIBUTIONS</div>
            </div>

            <p className="text-white/40 text-[11px] mb-auto">Actively contributing to the open-source ecosystem, squashing bugs and building features.</p>

            {/* Git Commit Graph */}
            <div className="flex items-center gap-1 mt-6 mb-6 overflow-hidden">
               {Array.from({ length: 10 }).map((_, i) => (
                 <div key={i} className="flex flex-col gap-1 w-6">
                    {Array.from({ length: 4 }).map((_, j) => {
                       const isActive = Math.random() > 0.6;
                       return (
                         <div 
                           key={j} 
                           className={`w-3 h-3 md:w-4 md:h-4 rounded-sm ${isActive ? 'bg-[#10B981]' : 'bg-white/5'}`} 
                           style={{ opacity: isActive ? Math.random() * 0.5 + 0.5 : 1 }}
                         />
                       )
                    })}
                 </div>
               ))}
            </div>

            <div className="text-3xl font-bold tracking-tighter text-white">
              GSSoC
            </div>
          </motion.div>

          {/* PRIORITY 5: SPENTA & NAV ASTITVA */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-4 border border-white/10 bg-[#050505] p-6 relative flex flex-col min-h-[200px]"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-[10px] text-[#a855f7] tracking-widest uppercase">PROD_DEPLOYMENTS</div>
            </div>

            <p className="text-white/40 text-[11px] mb-6">Designed and shipped production-grade web platforms for commercial clients and NGOs.</p>

            <div className="flex flex-col gap-3 mb-auto">
              <div className="flex items-center justify-between bg-black border border-white/5 p-2 px-3 rounded text-xs">
                <span className="text-white/60">spenta_engineers</span>
                <span className="text-green-500 animate-pulse">[ ONLINE ]</span>
              </div>
              <div className="flex items-center justify-between bg-black border border-white/5 p-2 px-3 rounded text-xs">
                <span className="text-white/60">nav_astitva_ngo</span>
                <span className="text-green-500 animate-pulse">[ ONLINE ]</span>
              </div>
            </div>

            <div className="mt-6" ref={shippedCount.ref}>
              <div className="text-4xl font-bold tracking-tighter text-[#a855f7]">
                {shippedCount.count}<span className="text-xl text-white/30 ml-2 font-normal">SHIPPED</span>
              </div>
            </div>
          </motion.div>



        </div>
      </div>
    </section>
  );
}
