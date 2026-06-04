"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";

const items = [
  "Next.js",
  "TypeScript",
  "Python",
  "PyTorch",
  "React",
  "Node.js",
  "Computer Vision",
  "Tailwind CSS",
  "MongoDB",
  "Docker"
];

export default function MarqueeTicker() {
  // Repeat the array to guarantee it spans more than 2x screen width.
  // We use 8 sets total so that the 50% midpoint is a clean boundary.
  const repeatedItems = Array(8).fill(items).flat();

  return (
    <div 
      className="w-full mt-12 md:mt-24 mb-8 py-5 overflow-hidden flex whitespace-nowrap relative z-20"
      style={{ 
        background: "linear-gradient(90deg, rgba(232,41,58,0.02) 0%, rgba(232,41,58,0.08) 50%, rgba(232,41,58,0.02) 100%)",
        borderTop: "1px solid rgba(232,41,58,0.1)",
        borderBottom: "1px solid rgba(232,41,58,0.1)",
        boxShadow: "0 0 20px rgba(232,41,58,0.05)"
      }}
    >
      <motion.div
        className="flex items-center gap-16 px-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        {repeatedItems.map((item, idx) => (
          <Fragment key={idx}>
            <span className="text-primary font-mono text-sm tracking-[0.3em] font-bold uppercase drop-shadow-sm whitespace-nowrap">
              {item}
            </span>
            <span className="text-primary/30 font-bold">·</span>
          </Fragment>
        ))}
      </motion.div>
    </div>
  );
}
