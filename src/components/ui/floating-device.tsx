"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Activity, ShieldCheck, Database, Cpu } from "lucide-react";

export default function FloatingDevice({ imageUrl = "/IMG-20260209-WA0119.jpg" }: { imageUrl?: string }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  // Rotate phone based on mouse, but also add a constant floating animation
  const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 1], [-20, 20]);
  
  // Dynamic Glare
  const glareX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  }

  function onMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <div 
      className="relative w-full max-w-sm mx-auto h-[600px] flex items-center justify-center perspective-[1200px]"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Ambient floating glow behind the phone */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/20 blur-[100px] rounded-full -z-20 pointer-events-none" />

        <motion.div
          className="relative w-[280px] h-[580px] rounded-[3.5rem] border-[10px] border-[#1a1a1a] bg-black shadow-[0_0_50px_rgba(232,41,58,0.3)] preserve-3d group cursor-pointer"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          {/* Phone Bezels/Edge (fake 3D depth) */}
          <div className="absolute -inset-[12px] rounded-[3.8rem] border-[4px] border-white/5 bg-gradient-to-br from-[#2a2a2a] to-[#0a0a0a] -z-10 transform translate-z-[-10px] shadow-2xl" />
          
          {/* Hardware Buttons */}
          <div className="absolute top-32 -left-[14px] w-[4px] h-10 bg-[#333] rounded-l-md" />
          <div className="absolute top-48 -left-[14px] w-[4px] h-12 bg-[#333] rounded-l-md" />
          <div className="absolute top-40 -right-[14px] w-[4px] h-16 bg-[#333] rounded-r-md" />

          {/* Screen Content */}
          <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden bg-[#0a0a0f] border border-white/5">
             {/* Dynamic Island */}
             <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[95px] h-[28px] bg-black rounded-full z-50 flex items-center justify-between px-2.5 shadow-md border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/80 animate-pulse" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/10" />
             </div>

             {/* App UI Header */}
             <div className="w-full h-28 bg-gradient-to-b from-primary/30 to-transparent absolute top-0 inset-x-0 z-10 pointer-events-none" />

             {/* Personal Portrait Hero Image in App */}
             <div className="relative w-full h-64 mt-12 px-4 z-20">
                <div className="w-full h-full rounded-3xl overflow-hidden relative shadow-2xl ring-1 ring-white/10">
                   <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${imageUrl}')` }} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                   
                   {/* App UI Overlay on Portrait */}
                   <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                     <div>
                       <h3 className="text-white font-semibold text-[13px] tracking-wide">M. Patel</h3>
                       <p className="text-white/60 text-[10px] uppercase tracking-wider mt-0.5">Systems Engineer</p>
                     </div>
                     <div className="bg-primary/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-primary/30 text-primary text-[9px] font-bold tracking-widest flex items-center gap-1.5 shadow-lg shadow-primary/20">
                        <Activity className="w-2.5 h-2.5" /> ONLINE
                     </div>
                   </div>
                </div>
             </div>

             {/* App UI Widgets */}
             <div className="px-4 mt-5 space-y-3 relative z-20">
                {/* Security Widget */}
                <div className="w-full bg-white/5 rounded-2xl p-3.5 border border-white/5 backdrop-blur-md shadow-lg">
                   <div className="flex items-center justify-between mb-3">
                     <div className="flex items-center gap-2">
                       <ShieldCheck className="w-4 h-4 text-emerald-400" />
                       <span className="text-[11px] font-medium text-white/90">Infrastructure</span>
                     </div>
                     <span className="text-[10px] text-emerald-400 font-mono">100%</span>
                   </div>
                   <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden shadow-inner">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: "100%" }}
                       transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                       className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full" 
                     />
                   </div>
                </div>

                {/* Metrics Grid */}
                <div className="flex gap-3">
                   <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-white/5 flex flex-col items-center justify-center gap-2 backdrop-blur-md shadow-lg group-hover:bg-white/10 transition-colors">
                      <Database className="w-5 h-5 text-blue-400" />
                      <span className="text-[10px] text-white/60 font-mono tracking-wider">1.2ms PING</span>
                   </div>
                   <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-white/5 flex flex-col items-center justify-center gap-2 backdrop-blur-md shadow-lg group-hover:bg-white/10 transition-colors">
                      <Cpu className="w-5 h-5 text-purple-400" />
                      <span className="text-[10px] text-white/60 font-mono tracking-wider">0.99 LOAD</span>
                   </div>
                </div>
             </div>
             
             {/* Dynamic Glare Overlay */}
             <motion.div
                className="absolute inset-0 z-40 pointer-events-none transition-opacity duration-300"
                style={{
                  background: "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 50%)",
                  left: glareX,
                  top: glareY,
                  width: "200%",
                  height: "200%",
                  transform: "translate(-50%, -50%)",
                  mixBlendMode: "overlay",
                }}
             />
             
             {/* Edge lighting reflection */}
             <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-white/20 to-transparent pointer-events-none z-30 opacity-50" />
             <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none z-30 opacity-30" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
