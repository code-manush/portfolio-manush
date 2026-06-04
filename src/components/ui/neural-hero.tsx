"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function NeuralHero({ imageUrl = "/IMG-20260209-WA0119.jpg" }: { imageUrl?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    let animationFrameId: number;
    
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const mouse = { x: width / 2, y: height / 2, radius: 120 };

    const init = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      particles = [];
      const numParticles = (width * height) / 6000; // Density
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse repel interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const forceDirectionX = dx / dist;
          const forceDirectionY = dy / dist;
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= forceDirectionX * force * 1.5;
          p.y -= forceDirectionY * force * 1.5;
        }
        
        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fill();

        // Connect nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          if (dist2 < 110) {
            ctx.beginPath();
            // Primary color lines (reddish) fading out based on distance
            ctx.strokeStyle = `rgba(232, 41, 58, ${0.25 - dist2 / 440})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = width / 2;
      mouse.y = height / 2;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto h-[500px] flex items-center justify-center">
      {/* Neural Network Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full rounded-3xl"
        style={{ mixBlendMode: "screen" }}
      />
      
      {/* Central Hub (Portrait) */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative z-10 w-52 h-52 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl shadow-[0_0_80px_rgba(232,41,58,0.15)] p-2 group cursor-pointer"
      >
         <div className="w-full h-full rounded-full overflow-hidden relative border border-white/5 ring-1 ring-white/10 shadow-inner">
           <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${imageUrl}')` }} />
           
           {/* Cyberpunk aesthetic overlay */}
           <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent mix-blend-multiply opacity-50 group-hover:opacity-0 transition-opacity duration-500" />
           <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-30" />
         </div>
         
         {/* Orbiting Tech Nodes */}
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
           className="absolute -inset-10 border border-dashed border-white/10 rounded-full"
         >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_15px_rgba(232,41,58,0.3)]">
               AI
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_15px_rgba(232,41,58,0.3)]">
               DB
            </div>
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_15px_rgba(232,41,58,0.3)]">
               UX
            </div>
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_15px_rgba(232,41,58,0.3)]">
               API
            </div>
         </motion.div>
         
         {/* Pulse Ring */}
         <motion.div
           animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="absolute inset-0 rounded-full border border-primary/40 -z-10 pointer-events-none"
         />
      </motion.div>
    </div>
  );
}
