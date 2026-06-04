"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\\\/[]{}—=+*^?#_";

export default function DecryptedText({ 
  text, 
  className, 
  speed = 40, 
  delay = 0 
}: { 
  text: string, 
  className?: string, 
  speed?: number, 
  delay?: number 
}) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let timeout: NodeJS.Timeout;
    let iteration = 0;
    
    const startDecryption = () => {
      const interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === " " || char === "\n") return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3; // Number of random frames before resolving a character
      }, speed);
      
      return () => clearInterval(interval);
    };

    if (delay > 0) {
      timeout = setTimeout(startDecryption, delay);
    } else {
      startDecryption();
    }

    return () => clearTimeout(timeout);
  }, [isInView, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      {displayText || text.replace(/[a-zA-Z]/g, "0")}
    </span>
  );
}
