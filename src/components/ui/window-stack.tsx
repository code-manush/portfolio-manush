"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Terminal, LineChart, Sparkles } from "lucide-react";

export default function WindowStack({ imageUrl = "/IMG-20260209-WA0119.jpg" }: { imageUrl?: string }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseX = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 40 });

  // Rotate entire stack based on mouse
  const rotateX = useTransform(mouseY, [0, 1], [12, -12]);
  const rotateY = useTransform(mouseX, [0, 1], [-12, 12]);

  // Parallax translation for each layer (deepest to closest)
  const zLayer1 = -60; // Back chart window
  const zLayer2 = -20; // Middle terminal window
  const zLayer3 = 40;  // Front portrait window

  const transXLayer1 = useTransform(mouseX, [0, 1], [40, -40]);
  const transYLayer1 = useTransform(mouseY, [0, 1], [40, -40]);

  const transXLayer2 = useTransform(mouseX, [0, 1], [15, -15]);
  const transYLayer2 = useTransform(mouseY, [0, 1], [15, -15]);

  const transXLayer3 = useTransform(mouseX, [0, 1], [-25, 25]);
  const transYLayer3 = useTransform(mouseY, [0, 1], [-25, 25]);

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
      className="relative w-full max-w-md mx-auto h-[500px] flex items-center justify-center perspective-1000"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        className="relative w-[300px] h-[380px] preserve-3d"
        style={{ rotateX, rotateY }}
      >
        {/* Layer 1: Back Window (Analytics Chart) */}
        <motion.div 
          className="absolute inset-0 -top-12 -right-20 w-full h-[260px] rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          style={{ x: transXLayer1, y: transYLayer1, translateZ: zLayer1 }}
        >
          <div className="h-8 border-b border-white/5 bg-white/[0.02] flex items-center px-3 gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="ml-2 text-[10px] text-white/40 font-mono flex items-center gap-1"><LineChart className="w-3 h-3"/> traff_iq_density.json</span>
          </div>
          <div className="p-4 flex-1 flex items-end gap-2 relative">
             <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
             {[30, 70, 45, 90, 60, 100, 80].map((h, i) => (
                <motion.div 
                  key={i} 
                  initial={{ height: 0 }} 
                  animate={{ height: `${h}%` }} 
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="flex-1 bg-white/10 rounded-t-sm" 
                />
             ))}
          </div>
        </motion.div>

        {/* Layer 2: Middle Window (Terminal) */}
        <motion.div 
          className="absolute inset-0 top-16 -left-16 w-[320px] h-[220px] rounded-xl border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          style={{ x: transXLayer2, y: transYLayer2, translateZ: zLayer2 }}
        >
          <div className="h-8 border-b border-white/5 bg-white/[0.02] flex items-center px-3 gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            <span className="ml-2 text-[10px] text-white/40 font-mono flex items-center gap-1"><Terminal className="w-3 h-3"/> zsh</span>
          </div>
          <div className="p-4 font-mono text-[11px] text-white/60 leading-relaxed">
            <p className="text-emerald-400">~/projects/skillbuddy $ <span className="text-white">npm start</span></p>
            <p className="text-white/40 mt-1">&gt; skillbuddy@1.0.0 start</p>
            <p className="text-white/40">&gt; node server.js</p>
            <p className="mt-2 text-yellow-300/80">[INFO] Gemini API Connected.</p>
            <p className="text-yellow-300/80">[INFO] MongoDB cluster active.</p>
            <p className="text-blue-400 mt-2">Server listening on port 5000...</p>
            <motion.div 
               animate={{ opacity: [1, 0] }} 
               transition={{ repeat: Infinity, duration: 0.8 }} 
               className="w-2 h-3 bg-white/40 mt-1" 
            />
          </div>
        </motion.div>

        {/* Layer 3: Front Window (Portrait) */}
        <motion.div 
          className="absolute inset-0 top-0 left-0 w-full h-full rounded-2xl border border-white/20 bg-black/40 backdrop-blur-3xl shadow-[0_30px_60px_-15px_rgba(232,41,58,0.3)] overflow-hidden flex flex-col group"
          style={{ x: transXLayer3, y: transYLayer3, translateZ: zLayer3 }}
        >
          {/* Glass header */}
          <div className="absolute top-0 inset-x-0 h-10 border-b border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-between px-4 z-20">
             <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/30 hover:bg-red-500 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-white/30 hover:bg-yellow-500 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-white/30 hover:bg-green-500 transition-colors cursor-pointer" />
             </div>
             <span className="text-xs font-semibold text-white/80 flex items-center gap-1 shadow-black drop-shadow-md">
                <Sparkles className="w-3 h-3 text-primary" /> Manush Patel
             </span>
             <div className="w-10" />
          </div>

          {/* Portrait Image */}
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-cover bg-center opacity-90 transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${imageUrl}')` }} />
            {/* Aesthetic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent mix-blend-overlay" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
