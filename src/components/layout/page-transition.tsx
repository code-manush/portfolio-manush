"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const pageVariants: Variants = {
  initial: { opacity: 0, scale: 0.96, filter: "blur(10px)" },
  animate: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
  },
  exit: { 
    opacity: 0, 
    scale: 1.02, 
    filter: "blur(10px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
};

const wipePrimary: Variants = {
  initial: { scaleY: 1, transformOrigin: "top" },
  animate: { 
    scaleY: 0, 
    transformOrigin: "top", 
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 } 
  },
  exit: { 
    scaleY: 1, 
    transformOrigin: "bottom", 
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
  },
};

const wipeSecondary: Variants = {
  initial: { scaleY: 1, transformOrigin: "top" },
  animate: { 
    scaleY: 0, 
    transformOrigin: "top", 
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    scaleY: 1, 
    transformOrigin: "bottom", 
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 } 
  },
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // We use a mounted state to prevent hydration mismatches on first load
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <>{children}</>;

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="flex-grow flex flex-col relative w-full h-full">
        
        {/* Page Content */}
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-grow flex flex-col w-full h-full"
        >
          {children}
        </motion.div>

        {/* Cinematic Wipes */}
        <motion.div
          variants={wipePrimary}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[100] pointer-events-none bg-background"
        />
        <motion.div
          variants={wipeSecondary}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[101] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #E8293A, #9B1C2E)" }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
