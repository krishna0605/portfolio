"use client";

import React from "react";
import { GridBlock } from "./ui/GridPattern";

export const MissionSection = () => {
  return (
    <section className="relative bg-[#B4B9BC] text-[#202020] min-h-[60vh] flex items-center overflow-hidden">
      {/* Background Outlined Text Layer */}
      <div className="absolute top-[20%] left-0 w-full flex justify-center pointer-events-none select-none z-0">
         <span className="text-[15rem] md:text-[25rem] font-bold leading-none tracking-tighter opacity-10"
               style={{ 
                  fontFamily: 'var(--font-inter)',
                  WebkitTextStroke: '2px rgba(0,0,0,0.5)',
                  color: 'transparent'
               }}
         >
           LETTA
         </span>
      </div>

      <div className="max-w-[1400px] mx-auto w-full border-x border-black/10 relative z-10 grid grid-cols-1 md:grid-cols-2">
         {/* Left empty block for spacing/grid */}
         <GridBlock label="MS-01 // CONTEXT" className="hidden md:block h-full border-black/10 border-r" children={null} />

         {/* Right Main Content */}
         <div className="p-8 md:p-16 border-b border-black/10">
            <h2 className="text-4xl md:text-6xl font-semibold mb-8 tracking-tight max-w-xl">
              Letta is an open <br/> AI lab.
            </h2>
            <p className="text-xl md:text-2xl text-[#202020]/80 leading-relaxed font-light mb-12">
               We are building intelligent machines that can learn from experience and possess long-term memory.
            </p>
            
            <div className="flex flex-col gap-4 text-sm font-mono uppercase tracking-widest text-[#202020]/60">
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 bg-black/40 rounded-full"/>
                 STATEFUL LLM SYSTEMS
              </div>
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 bg-black/40 rounded-full"/>
                 O.S. AGENT FRAMEWORK
              </div>
            </div>
         </div>
      </div>
    </section>
  );
};
