"use client";

import React from "react";
import Image from "next/image";
import { clsx } from "clsx";

/**
 * MemorySection Component
 * Displays the technical "Memory Architecture" illustration.
 * Context: Dark Background (#202020) to match the site flow.
 */
export const MemorySection = () => {
  return (
    <section className="relative w-full bg-background border-b border-grid-line py-24 md:py-32 overflow-hidden transition-colors duration-300">
      
      {/* Grid Pattern Background */}
      <div 
         className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.1]"
         style={{
             backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
             backgroundSize: '60px 60px',
             maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
         }}
      />

       {/* Blue Glow / Vignette Effect (Deep Blue Match) */}
       <div 
          className="absolute inset-0 pointer-events-none"
          style={{
             background: `radial-gradient(circle at 50% 45%, rgba(0, 82, 255, 0.15), transparent 60%)` // Deep Blue match
          }}
       />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
         
         {/* Illustration */}
         <div className="w-full max-w-[1100px] mb-8 md:mb-12 select-none pointer-events-none relative">
            {/* Inner Glow Center - Deep Blue */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#0052FF]/15 blur-[120px] rounded-full pointer-events-none" />
             
             {/* 
                Image Notes:
                - Source is Black Strokes.
                - Light Mode: No Invert (Black on White).
                - Dark Mode: Invert (White on Dark).
             */}
            <Image 
               src="/letta-memory-illustration.svg" 
               alt="Letta Memory Architecture" 
               width={1138} 
               height={812}
               className="w-full h-auto dark:invert opacity-95 relative z-10 transition-all duration-300" 
               priority
            />
         </div>

         {/* Text Content - Positioned to look like part of the diagram flow */}
         <div className="max-w-3xl text-center relative z-20">
            <p className="text-[21px] md:text-[24px] leading-relaxed font-medium text-foreground tracking-tight">
               Today&apos;s AI agents struggle to remember previous mistakes, and are unable to <br className="hidden md:block"/> learn from new experiences. At Letta, we&apos;re building machines with <br className="hidden md:block"/> real memory that can continually learn and self-improve.
            </p>
         </div>

      </div>
    </section>
  );
};
