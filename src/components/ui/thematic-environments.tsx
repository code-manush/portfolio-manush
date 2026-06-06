"use client";

import { motion } from "framer-motion";

export function TrafficEnvironment() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* City Grid Perspective */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [transform:perspective(1000px)_rotateX(60deg)_translateY(-100px)_translateZ(-200px)] opacity-50" />
      
      {/* Abstract Ambient Traffic Lights */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 flex flex-row gap-16 mix-blend-screen opacity-80 pointer-events-none">
        <motion.div className="w-32 h-32 rounded-full bg-red-600 blur-[30px]" animate={{ opacity: [0.1, 1, 0.1, 0.1, 0.1], scale: [0.8, 1.2, 0.8, 0.8, 0.8] }} transition={{ duration: 15, repeat: Infinity, times: [0, 0.1, 0.4, 0.5, 1] }} />
        <motion.div className="w-32 h-32 rounded-full bg-yellow-500 blur-[30px]" animate={{ opacity: [0.1, 0.1, 1, 0.1, 0.1], scale: [0.8, 0.8, 1.2, 0.8, 0.8] }} transition={{ duration: 15, repeat: Infinity, times: [0, 0.4, 0.45, 0.5, 1] }} />
        <motion.div className="w-32 h-32 rounded-full bg-green-500 blur-[30px]" animate={{ opacity: [0.1, 0.1, 0.1, 1, 0.1], scale: [0.8, 0.8, 0.8, 1.2, 0.8] }} transition={{ duration: 15, repeat: Infinity, times: [0, 0.5, 0.6, 0.9, 1] }} />
      </div>

      {/* Moving Headlights (White/Yellow) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`head-${i}`}
          className="absolute h-[2px] w-32 bg-gradient-to-r from-transparent via-white to-transparent blur-[1px]"
          style={{ top: `${Math.random() * 100}%`, left: "-10%" }}
          animate={{ left: "110%" }}
          transition={{ duration: 3 + Math.random() * 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
        />
      ))}

      {/* Moving Taillights (Red) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`tail-${i}`}
          className="absolute h-[2px] w-32 bg-gradient-to-l from-transparent via-red-500 to-transparent blur-[1px]"
          style={{ top: `${Math.random() * 100}%`, right: "-10%" }}
          animate={{ right: "110%" }}
          transition={{ duration: 3 + Math.random() * 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
        />
      ))}
    </div>
  );
}

export function WeatherEnvironment() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-sky-950 to-[#0a0a0a]">
      {/* Drifting Clouds / Fog */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white blur-[100px] opacity-[0.03]"
          style={{
            width: 400 + Math.random() * 400,
            height: 200 + Math.random() * 200,
            top: `${Math.random() * 40}%`,
            left: "-30%",
          }}
          animate={{ left: "130%" }}
          transition={{ duration: 40 + Math.random() * 40, repeat: Infinity, ease: "linear", delay: Math.random() * 20 }}
        />
      ))}
      
      {/* Subtle Rain / Snow particles (vertical drop) */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`rain-${i}`}
          className="absolute w-[1px] h-4 bg-white/20"
          style={{ left: `${Math.random() * 100}%`, top: "-10%" }}
          animate={{ top: "110%" }}
          transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
        />
      ))}
    </div>
  );
}

export function StudyEnvironment() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0f1115]">
      {/* Dark Notebook Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.03)_100%)] bg-[size:100%_30px]" />
      <div className="absolute top-0 bottom-0 left-12 w-px bg-red-500/10" />
      <div className="absolute top-0 bottom-0 left-14 w-px bg-red-500/10" />
      
      {/* Desk Lamp Spotlight */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[100px] mix-blend-screen" />
      
      {/* Floating geometric shapes (Books/Pages) */}
      <motion.div className="absolute top-1/4 left-[10%] w-32 h-40 border border-white/5 rounded-sm bg-white/[0.01]" animate={{ rotate: [0, 5, 0], y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-1/4 right-[10%] w-48 h-32 border border-white/5 rounded-sm bg-white/[0.01]" animate={{ rotate: [0, -5, 0], y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
    </div>
  );
}

export function BlueprintEnvironment() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#08121f]">
      {/* Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      {/* Crosshairs */}
      <div className="absolute top-10 left-10 text-cyan-500/30 font-mono text-sm">+</div>
      <div className="absolute top-10 right-10 text-cyan-500/30 font-mono text-sm">+</div>
      <div className="absolute bottom-10 left-10 text-cyan-500/30 font-mono text-sm">+</div>
      <div className="absolute bottom-10 right-10 text-cyan-500/30 font-mono text-sm">+</div>

      {/* Rotating Gear Outlines */}
      <motion.div
        className="absolute -right-32 -bottom-32 w-[500px] h-[500px] border-[2px] border-dashed border-cyan-500/10 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -left-16 top-1/4 w-[300px] h-[300px] border-[1px] border-dashed border-cyan-500/20 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export function OrganicEnvironment() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#11130f]">
      {/* Dark Texture - Increased opacity significantly */}
      <div className="absolute inset-0 opacity-[0.8] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      
      {/* Sunrise Glow - Made much brighter */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[120vw] h-[800px] bg-gradient-to-t from-orange-500/30 via-orange-500/10 to-transparent blur-[120px]" />

      {/* Falling Leaves - Made larger and more visible */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-6 rounded-full bg-orange-500/30 blur-[1px]"
          style={{ top: "-10%", left: `${Math.random() * 100}%`, borderTopRightRadius: "0px", borderBottomLeftRadius: "0px" }}
          animate={{
            top: "110%",
            left: `${Math.random() * 100}%`,
            rotate: 720
          }}
          transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
        />
      ))}
    </div>
  );
}

export default function ThematicEnvironment({ slug }: { slug: string }) {
  switch (slug) {
    case 'traff-iq': return <TrafficEnvironment />;
    case 'climatrix': return <WeatherEnvironment />;
    case 'skillbuddy': return <StudyEnvironment />;
    case 'spenta-engineers': return <BlueprintEnvironment />;
    case 'navastitva': return <OrganicEnvironment />;
    default: return null;
  }
}
