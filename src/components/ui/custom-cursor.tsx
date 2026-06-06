"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor({ color = "#E8293A" }: { color?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring for the trailing ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    // Detect hoverable elements
    const interactiveEls = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, label, [tabindex]"
    );
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      const newEls = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, label, [tabindex]"
      );
      newEls.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isMounted) return null;

  return (
    <>
      {/* Main dot cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-screen"
        style={{ x: mouseX, y: mouseY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.5 : isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        <div
          className="relative -translate-x-1/2 -translate-y-1/2"
          style={{ width: 8, height: 8 }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 8px ${color}, 0 0 16px ${color}80`,
            }}
          />
        </div>
      </motion.div>

      {/* Trailing ring / Fading light trail */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-screen"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.7 : isHovering ? 2 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: 36,
            height: 36,
            borderColor: isHovering ? color : `${color}80`,
            boxShadow: isHovering
              ? `0 0 12px ${color}80, inset 0 0 8px ${color}1a`
              : "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
            backdropFilter: isHovering ? "blur(0px)" : "none",
          }}
        />
      </motion.div>
    </>
  );
}
