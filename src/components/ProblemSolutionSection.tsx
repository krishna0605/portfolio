"use client";

import React from "react";
import { Play } from "lucide-react";
import { PixelRevealHover } from "./ui/PixelReveal";
import Link from "next/link";

export const ProblemSolutionSection = () => {
  return (
    <section className="bg-black text-white border-b border-grid-line">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 border-x border-grid-line">
        
        {/* Left: Video / Design Humans Container */}
        <div className="p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-grid-line flex flex-col justify-center">
           <div className="relative w-full aspect-video bg-[#111] border border-white/10 flex items-center justify-center group cursor-pointer overflow-hidden">
              {/* Static Image Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-white/20 font-mono text-xs">DESIGN_HUMANS.mp4</span>
              </div>
              
              {/* Play Button */}
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform z-10">
                 <Play fill="currentColor" className="text-white ml-1" size={24} />
              </div>
           </div>
        </div>

        {/* Right: Text and Buttons */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
           <div className="mb-4 text-xs font-mono text-blue-400 tracking-widest uppercase">
              // OPEN_LAB
           </div>
           
           <h3 className="text-3xl md:text-5xl font-medium leading-tight mb-12">
             Letta is an open AI lab, building intelligent machines that can learn from experiences.
           </h3>

           <div className="flex flex-wrap gap-4">
              {/* About Us Button */}
              <div className="h-12 border border-white/20 w-fit">
                <PixelRevealHover className="h-full px-8 flex items-center justify-center">
                  <Link href="/about" className="text-sm font-medium text-white uppercase tracking-wider">
                    About Us
                  </Link>
                </PixelRevealHover>
              </div>

              {/* Open Rules Button */}
              <div className="h-12 border border-white/20 w-fit">
                <PixelRevealHover className="h-full px-8 flex items-center justify-center">
                  <Link href="/rules" className="text-sm font-medium text-white uppercase tracking-wider">
                    Open Rules
                  </Link>
                </PixelRevealHover>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
