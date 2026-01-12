"use client";

import React from "react";
import { clsx } from "clsx";

interface GridPatternProps {
  className?: string;
  size?: number;
}

export const GridPattern = ({ className, size = 64 }: GridPatternProps) => {
  // We'll create a pattern that includes the lines and the "plus" markers
  // The "plus" marker should be at the intersection (top-left of each cell)
  
  const halfSize = size / 2;
  const markerSize = 8; // Size of the plus sign
  const markerOffset = markerSize / 2;

  return (
    <div className={clsx("pointer-events-none absolute inset-0 z-0", className)}>
      <svg
        className="absolute inset-0 w-full h-full stroke-gray-700/30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
            x={-1} // Slight offset to align with borders
            y={-1}
          >
            {/* Grid Lines */}
            <path
              d={`M.5 ${size}V.5H${size}`}
              fill="none"
              strokeDasharray="0" 
            />
            
            {/* Crosshair (+) at intersection (0,0) which repeats */}
            <line x1={-markerOffset} y1={0.5} x2={markerOffset} y2={0.5} stroke="currentColor" strokeWidth="1.5" className="text-gray-500/50" />
            <line x1={0.5} y1={-markerOffset} x2={0.5} y2={markerOffset} stroke="currentColor" strokeWidth="1.5" className="text-gray-500/50" />
          </pattern>
        </defs>
        
        {/* Fill the rect with the pattern */}
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
};

// block that matches the grid for explicit content placement
export const GridBlock = ({ 
  children, 
  className, 
  label 
}: { 
  children: React.ReactNode; 
  className?: string;
  label?: string;
}) => {
  return (
    <div className={clsx("relative border-r border-b border-grid-line p-8 md:p-12", className)}>
       {/* Corner Plus Markers (Absolute to ensure they hit the corners exactly) */}
       <div className="absolute -top-[5px] -left-[5px] text-gray-400 opacity-50 font-sans text-xs">+</div>
       <div className="absolute -top-[5px] -right-[5px] text-gray-400 opacity-50 font-sans text-xs">+</div>
       <div className="absolute -bottom-[5px] -left-[5px] text-gray-400 opacity-50 font-sans text-xs">+</div>
       <div className="absolute -bottom-[5px] -right-[5px] text-gray-400 opacity-50 font-sans text-xs">+</div>

       {/* Technical Label */}
       {label && (
         <div className="absolute top-4 left-4 text-[10px] tracking-widest font-mono text-gray-500 uppercase">
           {label}
         </div>
       )}
       
       {children}
    </div>
  );
};
