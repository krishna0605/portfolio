"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { GridPattern } from "./ui/GridPattern";
import { WarpedGridBackground } from "./ui/WarpedGridBackground";
import { TypingAnimation } from "./ui/TypingAnimation";
import { usePersona } from "./PersonaProvider";
import { heroContent } from "@/data/personaContent";

export const Hero = () => {
  const { persona } = usePersona();
  const content = heroContent[persona];

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden border-b border-grid-line bg-background transition-colors duration-300">
      {/* 1. Video Background */}
      <div className="absolute inset-0 z-0">
         <video 
           autoPlay 
           loop 
           muted 
           className="w-full h-full object-cover opacity-60 mix-blend-screen grayscale dark:grayscale-0 transition-all duration-500"
           playsInline
         >
           <source src="https://letta.sfo2.cdn.digitaloceanspaces.com/letta-video-thumbnail.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
         <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      {/* 2. Warped Grid & Forensic Pattern */}
      <WarpedGridBackground />
      <GridPattern className="z-1 opacity-40 mix-blend-overlay" size={60} />
      
      {/* 2.5 Active Grid Cells (Typing Animation) - Persona Aware */}
      <div className="absolute top-[20%] left-[10%] hidden md:block z-10">
        <div className={`bg-black/40 backdrop-blur-sm border border-white/10 p-2 text-xs font-mono ${persona === "engineer" ? "text-blue-300" : "text-purple-300"}`}>
           <TypingAnimation text={content.typingTexts[0]} delay={500} />
        </div>
      </div>
      <div className="absolute bottom-[25%] right-[15%] hidden md:block z-10">
        <div className={`bg-black/40 backdrop-blur-sm border border-white/10 p-2 text-xs font-mono ${persona === "engineer" ? "text-purple-300" : "text-pink-300"}`}>
           <TypingAnimation text={content.typingTexts[1]} delay={1500} />
        </div>
      </div>
      <div className="absolute top-[30%] right-[10%] hidden md:block z-10">
        <div className={`bg-black/40 backdrop-blur-sm border border-white/10 p-2 text-xs font-mono ${persona === "engineer" ? "text-green-300" : "text-orange-300"}`}>
           <TypingAnimation text={content.typingTexts[2]} delay={2500} />
        </div>
      </div>

      {/* 3. Main Container */}
      <div className="max-w-[1400px] w-full mx-auto px-6 h-full flex flex-col items-center relative z-20 pt-20">
        
        {/* Animated Badge - Persona Aware */}
        <motion.div 
          key={`badge-${persona}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`mb-8 px-3 py-1 bg-white/5 border rounded-full flex items-center gap-2 backdrop-blur-sm ${
            persona === "engineer" ? "border-blue-500/30" : "border-purple-500/30"
          }`}
        >
          <span className={`w-2 h-2 rounded-full animate-pulse ${
            persona === "engineer" ? "bg-blue-400" : "bg-purple-400"
          }`} />
          <span className={`text-xs font-mono tracking-wide uppercase ${
            persona === "engineer" ? "text-blue-200" : "text-purple-200"
          }`}>{content.badge}</span>
        </motion.div>

        {/* Heading - Persona Aware */}
        <motion.h1 
          key={`title-${persona}`}
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-semibold text-center tracking-tight text-foreground mb-6 max-w-5xl leading-[0.9]"
        >
          {content.title}
        </motion.h1>

        {/* Subtext - Persona Aware */}
        <motion.p 
          key={`subtitle-${persona}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl text-center text-foreground/70 max-w-2xl mb-12 leading-relaxed font-light"
        >
          {content.subtitle}
        </motion.p>

        {/* Buttons - Persona Aware */}
        <motion.div 
          key={`cta-${persona}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a 
            href={content.cta1.href} 
            className={`h-14 px-8 flex items-center justify-center font-medium border border-transparent transition-all duration-300 ${
              persona === "engineer" 
                ? "bg-foreground text-background hover:bg-blue-600 hover:text-white"
                : "bg-foreground text-background hover:bg-purple-600 hover:text-white"
            }`}
          >
            {content.cta1.label}
          </a>
          
          <a 
            href={content.cta2.href}
            download={content.cta2.href.endsWith('.pdf')}
            className={`group h-14 px-8 flex items-center justify-center bg-transparent border text-foreground font-medium transition-all duration-300 gap-2 ${
              persona === "engineer"
                ? "border-foreground/20 hover:border-blue-400 hover:text-blue-400"
                : "border-foreground/20 hover:border-purple-400 hover:text-purple-400"
            }`}
          >
            {content.cta2.href.endsWith('.pdf') ? <Download size={16} /> : null}
            {content.cta2.label}
            {!content.cta2.href.endsWith('.pdf') && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
          </a>
        </motion.div>
      </div>
      
      {/* Decorative Technical Labels */}
      <div className="absolute top-32 left-8 text-[10px] font-mono text-black/20 dark:text-white/20 hidden md:block rotate-90 origin-left">
        // {persona === "engineer" ? "SYSTEM_INIT v2.0" : "CREATIVE_MODE v2.0"}
      </div>
      <div className="absolute bottom-12 right-12 text-[10px] font-mono text-black/20 dark:text-white/20 hidden md:block">
        PERSONA: {persona.toUpperCase()}
      </div>
    </section>
  );
};
