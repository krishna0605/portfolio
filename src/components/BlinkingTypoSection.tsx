"use client";

import React from "react";
import { motion } from "framer-motion";

export const BlinkingTypoSection = () => {
  return (
    <section className="py-32 px-6 bg-background border-b border-grid-line">
       <div className="max-w-[1400px] mx-auto text-center">
        {/* Animated LLM Design Image (Gentle Animation) */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           viewport={{ once: true }}
           className="mb-20 flex justify-center"
        >
           <div className="w-full max-w-4xl aspect-[16/5] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-white/5 flex items-center justify-center relative overflow-hidden">
               <span className="text-white/20 font-mono text-sm tracking-widest uppercase">
                  LLM_MEMORY_ARCHITECTURE.jpg
               </span>
               {/* Gentle float animation overlay */}
               <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-white/5 mix-blend-overlay"
               />
           </div>
        </motion.div>

        {/* Text with Blinking Typo */}
        <div className="max-w-4xl mx-auto">
           <h3 className="text-3xl md:text-5xl font-light leading-tight text-white/90">
             Today&apos;s AI agents struggle to remember previous mistakes and are <br/> unable to learn from new experiences.
           </h3>
           <p className="mt-12 text-xl text-foreground/60 leading-relaxed font-mono">
             At Letta, we are building machines with <span className="text-white font-bold">real memory</span> that can continually learn and 
             <span className="relative mx-2 inline-block">
                self-improv
                <span className="bg-black text-white ml-0.5 animate-pulse px-1">e</span>
             </span>.
           </p>
        </div>
       </div>
    </section>
  );
};
