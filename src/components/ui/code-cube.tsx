"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Terminal, GitMerge, User, Code2 } from "lucide-react";
import { useEffect } from "react";

export default function CodeCube({ imageUrl = "/IMG-20260209-WA0119.jpg" }: { imageUrl?: string }) {
  // Use motion values for continuous rotation that can also be manipulated
  const rotateX = useMotionValue(-20);
  const rotateY = useMotionValue(45);

  const springX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  // Auto-rotate the cube slowly
  useEffect(() => {
    let animationFrameId: number;
    let isDragging = false;

    const animate = () => {
      if (!isDragging) {
        rotateY.set(rotateY.get() + 0.3);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [rotateY]);

  // Framer Motion's drag handles touch and mouse beautifully
  function handleDrag(event: any, info: any) {
    rotateY.set(rotateY.get() + info.delta.x * 0.5);
    rotateX.set(rotateX.get() - info.delta.y * 0.5);
  }

  const faceClasses = "absolute w-[260px] h-[260px] border border-white/20 bg-[#0a0a0f]/90 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden";

  return (
    <div className="relative w-full max-w-sm mx-auto h-[600px] flex items-center justify-center perspective-[1500px]">
      
      {/* Ambient glow behind cube */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        className="w-[260px] h-[260px] relative cursor-grab active:cursor-grabbing"
        style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0} // Disable elastic constraint, let it spin freely on drag
        onDrag={handleDrag}
        whileHover={{ scale: 1.05 }}
      >
        {/* Front Face - Portrait */}
        <div className={faceClasses} style={{ transform: "translateZ(130px)" }}>
           <div className="absolute inset-0 bg-cover bg-center opacity-90" style={{ backgroundImage: `url('${imageUrl}')` }} />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
           <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="flex items-center gap-2 mb-1.5 shadow-black drop-shadow-md">
                 <User className="w-4 h-4 text-primary" />
                 <span className="font-bold tracking-wide">Developer</span>
              </div>
              <p className="text-[11px] text-white/70 uppercase tracking-widest font-semibold">System Architect</p>
           </div>
        </div>

        {/* Back Face */}
        <div className={faceClasses} style={{ transform: "rotateY(180deg) translateZ(130px)" }}>
           <div className="p-6 flex items-center justify-center h-full bg-gradient-to-br from-white/5 to-transparent">
             <div className="text-center">
               <Code2 className="w-16 h-16 text-white/10 mx-auto mb-4" />
               <p className="text-white/30 font-mono text-xs tracking-widest uppercase">Backend Logic</p>
             </div>
           </div>
        </div>

        {/* Right Face - Code Editor */}
        <div className={faceClasses} style={{ transform: "rotateY(90deg) translateZ(130px)" }}>
           <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4">
             <Terminal className="w-3.5 h-3.5 text-white/40 mr-2" />
             <span className="text-[10px] text-white/50 font-mono">core_architecture.ts</span>
           </div>
           <div className="p-5 font-mono text-[11px] text-white/70 whitespace-pre leading-loose">
             <span className="text-purple-400">async function</span> <span className="text-blue-400">initAI</span>() {'{\n'}
             {'  '}const model = <span className="text-purple-400">new</span> <span className="text-yellow-200">NeuralNet</span>();{'\n'}
             {'  '}await model.<span className="text-blue-400">train</span>(data);{'\n'}
             {'  '}<span className="text-purple-400">return</span> model;{'\n'}
             {'}'}
             {'\n\n'}
             <span className="text-emerald-400">// High performance ops</span>
           </div>
        </div>

        {/* Left Face - GitHub Activity */}
        <div className={faceClasses} style={{ transform: "rotateY(-90deg) translateZ(130px)" }}>
           <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4">
             <GitMerge className="w-3.5 h-3.5 text-white/40 mr-2" />
             <span className="text-[10px] text-white/50 font-mono uppercase tracking-widest">Contributions</span>
           </div>
           <div className="p-5 flex flex-wrap gap-1.5 content-start h-full mt-2">
             {Array.from({ length: 90 }).map((_, i) => {
                const isHigh = Math.random() > 0.8;
                const isMed = Math.random() > 0.5;
                const bgClass = isHigh ? 'bg-emerald-400' : isMed ? 'bg-emerald-700' : 'bg-white/10';
                return <div key={i} className={`w-[18px] h-[18px] rounded-sm ${bgClass}`} />
             })}
           </div>
        </div>

        {/* Top Face */}
        <div className={faceClasses} style={{ transform: "rotateX(90deg) translateZ(130px)" }}>
           <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-black opacity-80" />
           <div className="absolute inset-0 flex items-center justify-center text-7xl font-black text-white/5 pointer-events-none">
             M.P
           </div>
        </div>

        {/* Bottom Face */}
        <div className={faceClasses} style={{ transform: "rotateX(-90deg) translateZ(130px)" }}>
           <div className="absolute inset-0 bg-black" />
           <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(232,41,58,0.2)]" />
        </div>
      </motion.div>
      
      {/* Tooltip hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/40 pointer-events-none z-20 tracking-widest bg-black/50 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
        DRAG TO ROTATE
      </div>
    </div>
  );
}
