"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import BrowserMockup from "@/components/ui/browser-mockup";
import FloatingDevice from "@/components/ui/floating-device";

export default function HeroCarousel({ 
  images, 
  accent, 
  isMobile 
}: { 
  images: string[]; 
  accent: string; 
  isMobile: boolean 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (isMobile) {
     return (
       <div className="relative w-full h-[500px] flex items-center justify-center group">
         <AnimatePresence>
           <motion.div
             key={currentIndex}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.8, ease: "easeInOut" }}
             className="absolute inset-0 flex items-center justify-center scale-90 origin-center"
           >
             <FloatingDevice imageUrl={images[currentIndex]} />
           </motion.div>
         </AnimatePresence>

         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
           {images.map((_, i) => (
             <button 
               key={i}
               onClick={() => setCurrentIndex(i)}
               className="h-2 rounded-full transition-all duration-500"
               style={{ 
                 background: i === currentIndex ? accent : "rgba(255,255,255,0.3)",
                 width: i === currentIndex ? "1.5rem" : "0.5rem"
               }}
             />
           ))}
         </div>
       </div>
     );
  }

  return (
    <div className="relative w-full shadow-2xl rounded-[1.5rem] group">
      <BrowserMockup accent={accent} className="w-full rounded-[1.5rem]">
        <div className="relative aspect-video sm:aspect-[4/3] w-full overflow-hidden rounded-b-[1.5rem] bg-black">
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image 
                src={images[currentIndex]} 
                alt={`Slide ${currentIndex}`} 
                fill
                className="object-cover" 
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </BrowserMockup>
      
      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
        {images.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentIndex(i)}
            className="h-2 rounded-full transition-all duration-500"
            style={{ 
              background: i === currentIndex ? accent : "rgba(255,255,255,0.3)",
              width: i === currentIndex ? "1.5rem" : "0.5rem"
            }}
          />
        ))}
      </div>
    </div>
  );
}
