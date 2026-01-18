"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePersona } from "./PersonaProvider";
import { aboutContent } from "@/data/personaContent";
import { Github, Linkedin, Mail, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

export const AboutFlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { persona } = usePersona();
  const content = aboutContent[persona];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden flex items-center justify-center border-t border-grid-line">
      
      {/* Circuit Design Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
         {/* Abstract Circuit Lines - Left Side */}
         <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-[25%] h-auto opacity-10 text-foreground" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M0 200 H50 V100 H100 V50 H150" stroke="currentColor" strokeWidth="1" />
             <path d="M0 220 H40 V300 H120" stroke="currentColor" strokeWidth="1" />
             <circle cx="150" cy="50" r="3" fill="currentColor" />
             <circle cx="120" cy="300" r="3" fill="currentColor" />
             <path d="M0 100 H30 V180" stroke="currentColor" strokeWidth="1" />
             <rect x="25" y="175" width="10" height="10" stroke="currentColor" strokeWidth="1" />
         </svg>
         
         {/* Abstract Circuit Lines - Right Side */}
         <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-[25%] h-auto opacity-10 text-foreground" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M200 200 H150 V100 H100 V50 H50" stroke="currentColor" strokeWidth="1" />
             <path d="M200 220 H160 V300 H80" stroke="currentColor" strokeWidth="1" />
             <circle cx="50" cy="50" r="3" fill="currentColor" />
             <circle cx="80" cy="300" r="3" fill="currentColor" />
         </svg>

         {/* Abstract Circuit Lines - Top Right */}
         <svg className="absolute right-10 top-10 w-[15%] h-auto opacity-10 text-foreground" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M50 0 V50 H150 V150" stroke="currentColor" strokeWidth="1" />
             <rect x="140" y="140" width="20" height="20" stroke="currentColor" strokeWidth="1" />
         </svg>
         
         {/* Bottom Left */}
         <svg className="absolute left-10 bottom-10 w-[15%] h-auto opacity-10 text-foreground" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M150 200 V150 H50 V50" stroke="currentColor" strokeWidth="1" />
             <rect x="40" y="40" width="20" height="20" stroke="currentColor" strokeWidth="1" />
         </svg>
      </div>

      {/* Deep Blue Glow */}
      <div 
         className="absolute inset-0 pointer-events-none"
         style={{
            background: `radial-gradient(circle at 50% 50%, rgba(0, 82, 255, 0.08), transparent 70%)`
         }}
      />
      
      {/* 3D Container */}
      <div className="w-full max-w-[900px] px-4 perspective-1000 h-[550px] flex items-center justify-center relative z-10">
         <motion.div
           style={{ transformStyle: "preserve-3d" }}
           className="relative w-full h-full transition-transform duration-700"
           animate={{ rotateY: isFlipped ? 180 : 0 }}
           transition={{ duration: 0.8, ease: "easeInOut" }}
         >
            {/* FRONT FACE */}
            <div 
              style={{ 
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg) translateZ(1px)"
              }}
              className={clsx(
                "absolute inset-0 bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/10 shadow-2xl group",
                isFlipped ? "pointer-events-none z-0" : "z-10"
              )}
            >
                {/* Background Image - Hides on Flip */}
                <div 
                  className={clsx(
                    "absolute inset-0 transition-opacity duration-300",
                    isFlipped ? "opacity-0" : "opacity-100"
                  )}
                >
                  <Image 
                    src="/Screenshot 2026-01-12 163017.png" 
                    alt="About Cover"
                    fill
                    className="object-cover opacity-80 group-hover:opacity-90 scale-100 group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
                </div>
                
                {/* Front Content */}
                <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end z-10 transition-opacity duration-300">
                    <div className="mb-8">
                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 font-mono tracking-tighter">{content.title}</h2>
                      <p className="text-white/60 font-mono text-sm uppercase tracking-[0.2em]">{content.role}</p>
                    </div>

                    <div className="flex items-center gap-6 mb-10">
                        <a href="mailto:creativesimulation1@gmail.com" className="text-white/70 hover:text-white transition-colors"><Mail size={22} strokeWidth={1.5}/></a>
                        <a href="https://github.com/krishna0605" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors"><Github size={22} strokeWidth={1.5}/></a>
                        <a href="https://www.linkedin.com/in/krishna-kapoor-517546270/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors"><Linkedin size={22} strokeWidth={1.5}/></a>
                    </div>

                    <button 
                      onClick={() => setIsFlipped(true)}
                      className="inline-flex items-center gap-3 text-white border border-white/20 bg-white/5 hover:bg-white hover:text-black px-8 py-4 text-xs font-mono uppercase tracking-widest transition-all rounded-sm backdrop-blur-sm group-hover:border-white/40 w-fit"
                    >
                      About Me <ArrowRight size={14} />
                    </button>
                </div>
            </div>

            {/* BACK FACE */}
            <div 
              style={{ 
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg) translateZ(1px)"
              }}
              className={clsx(
                "absolute inset-0 rounded-xl border p-12 md:p-16 flex flex-col justify-between items-start text-left shadow-2xl bg-[#080808]",
                "border-white/10",
                isFlipped ? "pointer-events-auto z-10" : "pointer-events-none z-0"
              )}
            >
                {/* Content */}
                <div className="relative z-10 w-full">
                  <div className="mb-10">
                    <span className={clsx(
                      "inline-block px-3 py-1 text-[10px] font-mono uppercase tracking-widest border rounded-full mb-6 opacity-70",
                      persona === 'engineer' ? "text-blue-400 border-blue-400/20 bg-blue-400/5" : "text-purple-400 border-purple-400/20 bg-purple-400/5"
                    )}>
                      {persona === 'engineer' ? "System Profile" : "Creative Profile"}
                    </span>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight max-w-2xl">
                       Building the future with <span className={persona === 'engineer' ? "text-blue-400" : "text-purple-400"}>Code</span> & <span className="text-white/50">Creativity</span>.
                    </h3>
                  </div>

                  <div className="space-y-6 max-w-3xl">
                    <p className="text-lg text-white/70 leading-relaxed font-light">
                      {content.bio}
                    </p>
                  </div>
                </div>

                {/* Mirrored Button Location (Bottom Left) */}
                <button 
                  onClick={() => setIsFlipped(false)}
                  className="relative z-20 inline-flex items-center gap-3 text-white/60 hover:text-white border border-white/10 hover:border-white/40 bg-transparent px-8 py-4 text-xs font-mono uppercase tracking-widest transition-all rounded-sm cursor-pointer"
                >
                  <ArrowRight size={14} className="rotate-180" /> Back to Profile
                </button>
            </div>
         </motion.div>
      </div>
    </section>
  );
};
