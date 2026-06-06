"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  accent?: string;
  spotlightSize?: number;
}

export default function SpotlightCard({
  children,
  className,
  accent = "rgba(255, 255, 255, 0.15)",
  spotlightSize = 400,
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/5 bg-black/40 backdrop-blur-xl shadow-xl transition-colors hover:border-white/10 group",
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${accent}, transparent 40%)`,
        }}
      />
      {/* Secondary Inner Glow for the background itself (less intense than border) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${accent.replace(/[\d.]+\)$/g, '0.05)')}, transparent 100%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
