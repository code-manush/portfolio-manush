"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
}

export default function TiltCard({
  children,
  className = "",
  intensity = 15,
  glowColor = "rgba(232,41,58,0.3)",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Use framer-motion values for buttery smooth physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity]);

  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);

    // Glow follows cursor within card
    setGlowPos({ x: (mouseX / width) * 100, y: (mouseY / height) * 100 });
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setGlowPos({ x: 50, y: 50 });
    setIsHovered(false);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200, // deeper perspective for more realistic pop
      }}
      animate={{
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative rounded-2xl group ${className}`}
    >
      {/* 3D Pop Container */}
      <motion.div 
        style={{ transformStyle: "preserve-3d" }}
        animate={{ z: isHovered ? 30 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full h-full rounded-[inherit]"
      >
        {children}
      </motion.div>

      {/* Colored Ambient Glow */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 250px at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 70%)`,
          opacity: isHovered ? 0.7 : 0,
          mixBlendMode: "screen"
        }}
      />
      
      {/* White Glass Glare Effect (Tactile Highlight) */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 400px at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.18), transparent 50%)`,
          opacity: isHovered ? 1 : 0,
          mixBlendMode: "overlay"
        }}
      />
      
      {/* Dynamic Border Highlight */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-30 transition-opacity duration-300 border border-white/5"
        style={{
          maskImage: `radial-gradient(circle 200px at ${glowPos.x}% ${glowPos.y}%, black, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 200px at ${glowPos.x}% ${glowPos.y}%, black, transparent 100%)`,
          border: isHovered ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.05)",
          opacity: isHovered ? 1 : 0,
        }}
      />
    </motion.div>
  );
}
