"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = []; // unused now

export default function CinematicLoader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<
    "initials" | "sweep" | "reveal" | "done"
  >("initials");

  useEffect(() => {
    // Skip if already seen this session (DISABLED for development so you can see it!)
    // if (sessionStorage.getItem("loader-seen")) {
    //   onComplete();
    //   return;
    // }

    // Phase timeline
    const t1 = setTimeout(() => setPhase("sweep"), 1000);   // initials visible for 1s
    const t2 = setTimeout(() => setPhase("reveal"), 1800);  // sweep takes 0.8s
    const t3 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("loader-seen", "1");
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "#030303" }}
        >
          {/* Subtle scan lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(232,41,58,0.02) 2px, rgba(232,41,58,0.02) 3px)",
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          {/* Corner brackets */}
          {[
            "top-6 left-6",
            "top-6 right-6 rotate-90",
            "bottom-6 right-6 rotate-180",
            "bottom-6 left-6 -rotate-90",
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.15 * i, duration: 0.4 }}
              className={`absolute ${pos}`}
            >
              <div className="w-8 h-8">
                <div className="absolute top-0 left-0 w-full h-px bg-primary/50" />
                <div className="absolute top-0 left-0 w-px h-full bg-primary/50" />
              </div>
            </motion.div>
          ))}

          {/* Center content */}
          <div className="relative flex flex-col items-center">
            {/* "MP" Initials */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: phase === "reveal" ? 0 : 1,
                scale: phase === "reveal" ? 1.2 : 1,
                y: phase === "reveal" ? -30 : 0,
              }}
              transition={{
                opacity: { duration: 0.4 },
                scale: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
                y: { duration: 0.5 },
              }}
              className="relative"
            >
              {/* Glow behind */}
              <div
                className="absolute inset-0 blur-3xl -z-10"
                style={{
                  background:
                    "radial-gradient(circle, rgba(232,41,58,0.35) 0%, transparent 70%)",
                  width: 200,
                  height: 200,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />

              <h1
                className="text-8xl md:text-9xl font-black font-heading tracking-tight select-none"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #E8293A 50%, #9B1C2E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "none",
                  filter: "drop-shadow(0 0 30px rgba(232,41,58,0.4))",
                }}
              >
                MP
              </h1>

              {/* Shimmer line under initials */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                className="h-[2px] mt-3 origin-center"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #E8293A, transparent)",
                }}
              />

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: phase === "reveal" ? 0 : 0.6,
                  y: 0,
                }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-xs font-mono tracking-[0.4em] uppercase text-center mt-4 text-white/60"
              >
                Manush Patel
              </motion.p>
            </motion.div>

            {/* Crimson sweep line — full width */}
            {(phase === "sweep" || phase === "reveal") && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.7,
                  ease: [0.65, 0, 0.35, 1],
                }}
                className="fixed left-0 top-1/2 w-full h-[2px] origin-left -translate-y-1/2 z-10"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #E8293A 15%, #ff4d5e 50%, #E8293A 85%, transparent 100%)",
                  boxShadow:
                    "0 0 20px rgba(232,41,58,0.8), 0 0 60px rgba(232,41,58,0.4)",
                }}
              />
            )}
          </div>

          {/* Reveal wipe — splits screen */}
          {phase === "reveal" && (
            <>
              <motion.div
                initial={{ y: "0%" }}
                animate={{ y: "-100%" }}
                transition={{
                  duration: 0.6,
                  ease: [0.65, 0, 0.35, 1],
                }}
                className="fixed inset-x-0 top-0 h-1/2 z-20"
                style={{ background: "#030303" }}
              />
              <motion.div
                initial={{ y: "0%" }}
                animate={{ y: "100%" }}
                transition={{
                  duration: 0.6,
                  ease: [0.65, 0, 0.35, 1],
                }}
                className="fixed inset-x-0 bottom-0 h-1/2 z-20"
                style={{ background: "#030303" }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
