"use client";

import { motion } from "framer-motion";

function MarqueeText({ text, direction = 1, speed = 20 }: { text: string; direction?: number; speed?: number }) {
  return (
    <div className="flex whitespace-nowrap overflow-hidden py-1 select-none w-[200%] -ml-[50%]">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: direction > 0 ? [0, -1000] : [-1000, 0] }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
      >
        <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent uppercase tracking-tighter px-4">
          {text} • {text} • {text} • {text} • {text} • {text} • {text} • {text} •
        </span>
      </motion.div>
    </div>
  );
}

export default function KineticHero({ imageUrl = "/IMG-20260209-WA0119.jpg" }: { imageUrl?: string }) {
  return (
    <div className="relative w-full max-w-lg mx-auto h-[550px] flex items-center justify-center overflow-hidden rounded-[2.5rem] bg-[#030303] shadow-2xl border border-white/5">
      
      {/* Background Kinetic Typography */}
      <div className="absolute inset-0 flex flex-col justify-center gap-3 -rotate-[8deg] scale-125 opacity-70">
        <MarqueeText text="SYSTEMS ARCHITECT" speed={25} direction={1} />
        <MarqueeText text="AI ENGINEER" speed={20} direction={-1} />
        <MarqueeText text="FULL STACK DEV" speed={30} direction={1} />
        <MarqueeText text="CREATIVE CODER" speed={22} direction={-1} />
      </div>
      
      {/* The Central Portrait */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
        className="relative z-20 w-64 h-[22rem] md:w-72 md:h-[26rem]"
      >
         <div className="w-full h-full rounded-[2rem] overflow-hidden relative shadow-[0_40px_80px_rgba(0,0,0,0.9)] border border-white/20 group cursor-pointer bg-black">
           
           {/* Image with grayscale effect by default */}
           <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-90 saturate-0 group-hover:saturate-100" style={{ backgroundImage: `url('${imageUrl}')` }} />
           
           {/* Color Splash on hover */}
           <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent mix-blend-color opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
           
           {/* Inner Typography */}
           <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[0.85] mb-4">MANUSH<br/>PATEL</h3>
              <div className="flex items-center gap-3">
                 <div className="h-1.5 w-12 bg-primary rounded-full" />
                 <p className="text-white/60 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">Deploying<br/>Future</p>
              </div>
           </div>
           
           {/* Corner Accents */}
           <div className="absolute top-5 right-5 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(232,41,58,0.8)]" />
         </div>
      </motion.div>
      
      {/* Foreground Overlay Typography (Creates massive depth) */}
      <div className="absolute inset-0 flex flex-col justify-center gap-3 -rotate-[8deg] scale-125 z-30 pointer-events-none mix-blend-overlay opacity-80">
        <MarqueeText text="SYSTEMS ARCHITECT" speed={25} direction={1} />
        <MarqueeText text="AI ENGINEER" speed={20} direction={-1} />
        <MarqueeText text="FULL STACK DEV" speed={30} direction={1} />
        <MarqueeText text="CREATIVE CODER" speed={22} direction={-1} />
      </div>
      
    </div>
  );
}
