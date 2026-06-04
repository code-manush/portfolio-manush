"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Database, Layout, Terminal } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function HolographicCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  // Rotation ranges from -15 to 15 degrees
  const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

  // Glare position
  const glareX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  // Deep parallax for floating icons
  const iconX = useTransform(mouseX, [0, 1], [-30, 30]);
  const iconY = useTransform(mouseY, [0, 1], [-30, 30]);

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;

    x.set(mouseXPos / rect.width);
    y.set(mouseYPos / rect.height);
  }

  function onMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <div
      className="relative w-full max-w-[460px] mx-auto aspect-[3/4] perspective-1000"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        className="w-full h-full relative preserve-3d group cursor-pointer"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >

        {/* CARD 2: THE IDE CARD */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-[#0d1117] border border-white/10 shadow-2xl flex flex-col"
          animate={{
            zIndex: isFlipped ? 20 : 0,
            x: isFlipped ? 95 : 155,
            y: isFlipped ? -40 : -80,
            rotateZ: isFlipped ? -5 : 8,
            scale: isFlipped ? 1 : 0.95,
            boxShadow: isFlipped
              ? "0 25px 50px -12px rgba(0,0,0,0.5)"
              : "0 10px 30px -5px rgba(0,0,0,0.8)"
          }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
        >
          {/* Mac window controls & Filename */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0d1117]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-xs font-mono text-[#6e7681]">manush.config.ts</span>
          </div>

          {/* IDE Content */}
          <div className="flex-1 p-5 font-mono text-[13px] leading-[1.6] text-[#c9d1d9] overflow-hidden">
            <p><span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">developer</span> <span className="text-[#ff7b72]">=</span> {"{"}</p>

            <p className="ml-4"><span className="text-[#79c0ff]">name</span><span className="text-[#c9d1d9]">:</span> <span className="text-[#a5d6ff]">"Manush Patel"</span>,</p>
            <p className="ml-4"><span className="text-[#79c0ff]">role</span><span className="text-[#c9d1d9]">:</span> <span className="text-[#a5d6ff]">"Systems Engineer"</span>,</p>

            <p className="ml-4 mt-1"><span className="text-[#79c0ff]">focus</span><span className="text-[#c9d1d9]">:</span> [</p>
            <p className="ml-8 text-[#a5d6ff]">"Backend Architecture"<span className="text-[#c9d1d9]">,</span></p>
            <p className="ml-8 text-[#a5d6ff]">"Data Pipelines"<span className="text-[#c9d1d9]">,</span></p>
            <p className="ml-8 text-[#a5d6ff]">"AI Integration"<span className="text-[#c9d1d9]">,</span></p>
            <p className="ml-4">],</p>

            <p className="ml-4 mt-1"><span className="text-[#79c0ff]">currentlyBuilding</span><span className="text-[#c9d1d9]">:</span></p>
            <p className="ml-8"><span className="text-[#a5d6ff]">"systems that scale & perform"</span>,</p>
            <p>{"}"};</p>

            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-2 h-4 bg-[#6e7681] inline-block mt-1"
            />
          </div>

          {/* Status Bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-t border-white/5 bg-[#0d1117]">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#162a22] border border-[#234535]">
              <div className="w-2 h-2 rounded-full bg-[#2ea043]" />
              <span className="text-xs font-mono text-[#2ea043]">Live</span>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-[#161b22] border border-white/5">
              <span className="text-xs font-mono text-[#6e7681]">TypeScript</span>
            </div>
          </div>

          {/* IDE Glare Overlay */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{
              background: "radial-gradient(circle at center, rgba(255,255,255,0.6) 0%, transparent 60%)",
              left: glareX,
              top: glareY,
              width: "200%",
              height: "200%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </motion.div>


        {/* CARD 1: THE PORTRAIT CARD (Original) */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border-2 border-white/10 bg-[#0a0a0f]"
          animate={{
            zIndex: !isFlipped ? 20 : 0,
            x: !isFlipped ? 95 : 155,
            y: !isFlipped ? -40 : -80,
            rotateZ: !isFlipped ? -5 : 8,
            scale: !isFlipped ? 1 : 0.95,
            boxShadow: !isFlipped
              ? "0 25px 50px -12px rgba(232, 41, 58, 0.4)"
              : "0 10px 30px -5px rgba(0,0,0,0.8)"
          }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
        >
          {/* Outer Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent z-10 pointer-events-none" />

          {/* Image Layer - Grayscale to Color on Hover */}
          <div className="absolute inset-0 bg-[url('/IMG-20260209-WA0119.jpg')] bg-cover bg-center opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
          
          {/* Gradient Overlay for bottom blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent" />
          
          {/* Subtle red tint that fades away on hover to reveal true colors */}
          <div className="absolute inset-0 bg-primary/20 mix-blend-color group-hover:opacity-0 transition-opacity duration-700" />

          {/* Dynamic Holographic Glare */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
            style={{
              background: "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 60%)",
              left: glareX,
              top: glareY,
              width: "200%",
              height: "200%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Scanline overlay for aesthetic */}
          <div
            className="absolute inset-0 z-30 pointer-events-none opacity-20"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)"
            }}
          />
        </motion.div>

      </motion.div>

      {/* Floating Orbital Badges (Extremely deep parallax) */}
      {/* <motion.div
        className="absolute left-[95px] top-[10%] z-40 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-xl pointer-events-none"
        style={{ x: iconX, y: iconY, translateZ: 50 }}
      >
        <Code2 className="w-6 h-6 text-blue-400" />
      </motion.div>

      <motion.div
        className="absolute right-[-135px] top-[18%] z-40 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-xl pointer-events-none"
        style={{ x: useTransform(mouseX, [0, 1], [40, -40]), y: useTransform(mouseY, [0, 1], [40, -40]), translateZ: 80 }}
      >
        <Terminal className="w-6 h-6 text-yellow-400" />
      </motion.div>

      <motion.div
        className="absolute left-[48%] bottom-[36px] z-40 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-xl pointer-events-none"
        style={{ x: useTransform(mouseX, [0, 1], [-20, 20]), y: useTransform(mouseY, [0, 1], [30, -30]), translateZ: 60 }}
      >
        <Database className="w-6 h-6 text-emerald-400" />
      </motion.div> */}
    </div>
  );
}
