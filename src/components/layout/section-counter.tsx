"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "hero", label: "00 // Start" },
  { id: "about", label: "01 // About" },
  { id: "experience", label: "02 // Exp" },
  { id: "projects", label: "03 // Work" },
  { id: "skills", label: "04 // Tech" },
  { id: "contact", label: "05 // End" },
];

export default function SectionCounter() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const observer = new IntersectionObserver(
      (entries) => {
        // We only care about intersecting entries to update the active state
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Root margin triggers when section is generally in the center of the screen
        rootMargin: "-30% 0px -40% 0px",
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-[90] hidden md:flex flex-col items-end gap-0">
      
      {/* Current Active Label */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 mr-4 pointer-events-none flex items-center h-[200px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeSection}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.3 }}
            className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-primary whitespace-nowrap"
            style={{ textShadow: "0 0 10px rgba(232,41,58,0.5)" }}
          >
            {sections.find((s) => s.id === activeSection)?.label}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Vertical Progress Track */}
      <div className="relative h-[220px] w-[2px] bg-white/10 rounded-full flex flex-col justify-between items-center">
        
        {/* Fill Line */}
        <motion.div
          className="absolute top-0 left-0 w-full bg-primary rounded-full origin-top"
          style={{
            boxShadow: "0 0 15px rgba(232,41,58,0.7)"
          }}
          initial={false}
          animate={{
            height: `${(sections.findIndex((s) => s.id === activeSection) / (sections.length - 1)) * 100}%`
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        />

        {/* Nodes */}
        {sections.map(({ id }) => {
          const isActive = id === activeSection;
          const isPassed = sections.findIndex(s => s.id === id) <= sections.findIndex(s => s.id === activeSection);
          
          return (
            <a
              key={id}
              href={`#${id}`}
              className="relative w-6 h-6 flex items-center justify-center group z-10 -my-3"
              aria-label={`Navigate to ${id}`}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.4 : 1,
                  backgroundColor: isActive || isPassed ? "#E8293A" : "rgba(255,255,255,0.15)",
                  boxShadow: isActive ? "0 0 12px rgba(232,41,58,0.9)" : "none"
                }}
                className="w-1.5 h-1.5 rounded-full transition-colors duration-300 group-hover:bg-primary group-hover:scale-125"
              />
            </a>
          );
        })}
      </div>
      
    </div>
  );
}
