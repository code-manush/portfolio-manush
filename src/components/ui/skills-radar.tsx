"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Skill = { name: string; level: number; color: string };

const SKILLS: Skill[] = [
  { name: "React / Next.js",   level: 90, color: "#61DAFB" },
  { name: "Node.js",           level: 85, color: "#68A063" },
  { name: "Python / AI/ML",   level: 82, color: "#FF6B35" },
  { name: "MongoDB",           level: 80, color: "#47A248" },
  { name: "TypeScript",        level: 78, color: "#3178C6" },
  { name: "Computer Vision",   level: 75, color: "#E8293A" },
  { name: "Docker / DevOps",  level: 65, color: "#2496ED" },
  { name: "System Design",     level: 70, color: "#9B1C2E" },
];

const R = 120; // radar radius
const CX = 160;
const CY = 160;
const N = SKILLS.length;

function polarToXY(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: CX + radius * Math.sin(rad),
    y: CY - radius * Math.cos(rad),
  };
}

export default function SkillsRadar() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1.0];

  // Axis points
  const axes = SKILLS.map((_, i) => polarToXY((360 / N) * i, R));

  // Data polygon points
  const dataPoints = SKILLS.map((s, i) => polarToXY((360 / N) * i, (s.level / 100) * R));
  const polyPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";

  return (
    <div className="relative">
      <svg
        ref={ref}
        viewBox="0 0 320 320"
        className="w-full max-w-[320px] mx-auto"
        style={{ overflow: "visible" }}
      >
        {/* Grid rings */}
        {rings.map((r, ri) => {
          const pts = SKILLS.map((_, i) => polarToXY((360 / N) * i, R * r));
          const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";
          return (
            <path
              key={ri}
              d={d}
              fill="none"
              stroke="rgba(232,41,58,0.12)"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis lines */}
        {axes.map((pt, i) => (
          <line
            key={i}
            x1={CX} y1={CY}
            x2={pt.x} y2={pt.y}
            stroke="rgba(232,41,58,0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Filled polygon — animated */}
        {inView && (
          <motion.path
            d={polyPath}
            fill="rgba(232,41,58,0.12)"
            stroke="#E8293A"
            strokeWidth="1.5"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        )}

        {/* Data points */}
        {inView && dataPoints.map((pt, i) => (
          <motion.circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r={4}
            fill="#E8293A"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2 + i * 0.06, duration: 0.3 }}
            style={{ filter: "drop-shadow(0 0 6px rgba(232,41,58,0.8))" }}
          />
        ))}

        {/* Labels */}
        {axes.map((pt, i) => {
          const angle = (360 / N) * i;
          const labelPt = polarToXY(angle, R + 28);
          const anchor = labelPt.x < CX - 5 ? "end" : labelPt.x > CX + 5 ? "start" : "middle";
          return (
            <text
              key={i}
              x={labelPt.x}
              y={labelPt.y + 4}
              textAnchor={anchor}
              fontSize="9"
              fill="rgba(255,255,255,0.55)"
              fontFamily="var(--font-inter, sans-serif)"
            >
              {SKILLS[i].name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
