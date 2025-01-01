"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export const PixelRevealHover = ({ children, className, isActive }: { children: React.ReactNode, className?: string, isActive?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Create a grid of small divs for the pixel effect
  // Restored to higher density for "Standard" pixel effect
  const pixels = Array.from({ length: 48 }); 

  return (
    <div 
      className={`relative overflow-hidden ${className} ${isActive ? 'bg-black border border-gray-700' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pixel Grid Overlay - Denser grid */}
      {isHovered && !isActive && (
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-4 pointer-events-none z-10">
          {pixels.map((_, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 0.5, 0] }} 
               transition={{ 
                 duration: 0.3, 
                 delay: Math.random() * 0.2,
                 repeat: 0
               }}
               className="bg-white"
             />
          ))}
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
