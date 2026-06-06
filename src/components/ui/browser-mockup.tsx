"use client";

import { motion } from "framer-motion";

export default function BrowserMockup({
  children,
  accent = "#3B82F6",
  className = "",
}: {
  children: React.ReactNode;
  accent?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden border bg-background ${className}`}
      style={{
        borderColor: `${accent}30`,
        boxShadow: `0 10px 40px -10px ${accent}20`,
      }}
    >
      {/* Top Bar */}
      <div
        className="h-8 flex items-center px-4 border-b gap-1.5 backdrop-blur-md"
        style={{
          borderColor: `${accent}20`,
          background: `linear-gradient(to right, rgba(15,15,15,0.8), rgba(20,20,20,0.8))`,
        }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
      </div>

      {/* Content */}
      <div className="relative w-full h-full bg-[#050505]">{children}</div>
    </div>
  );
}
