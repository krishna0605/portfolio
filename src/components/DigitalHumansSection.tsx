import React from "react";
import Link from "next/link";
import { Play } from "lucide-react";

/**
 * DigitalHumansSection
 * HYBRID LAYOUT:
 * 1. Background: Light Grey (#111) + Circuit SVGs (User request: "keep those line designs", "light grey").
 * 2. Structure: 3-Column Grid with Vertical Borders (User Reference Image: 1768195022102.png).
 * 3. Content: Stock 3D Video (Center) + // OPEN_LAB Text (Right).
 */
export const DigitalHumansSection = () => {
  return (
    <section className="relative w-full bg-background py-24 border-b border-grid-line overflow-hidden transition-colors duration-300">
      
      {/* 1. Background Tech Shapes (Restored from Previous "Polish" Version) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none flex justify-center items-center">
         {/* Abstract Circuit Lines - Left Side */}
         <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-[25%] h-auto opacity-10 text-foreground" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M0 200 H50 V100 H100 V50 H150" stroke="currentColor" strokeWidth="1" />
             <path d="M0 220 H40 V300 H120" stroke="currentColor" strokeWidth="1" />
             <circle cx="150" cy="50" r="3" fill="currentColor" />
             <circle cx="120" cy="300" r="3" fill="currentColor" />
         </svg>
         
         {/* Abstract Circuit Lines - Top Right */}
         <svg className="absolute right-10 top-10 w-[15%] h-auto opacity-10 text-foreground" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M50 0 V50 H150 V150" stroke="currentColor" strokeWidth="1" />
             <rect x="140" y="140" width="20" height="20" stroke="currentColor" strokeWidth="1" />
         </svg>
      </div>

       {/* Deep Blue Glow */}
       <div 
          className="absolute inset-0 pointer-events-none"
          style={{
             background: `radial-gradient(circle at 50% 50%, rgba(0, 82, 255, 0.06), transparent 80%)`
          }}
       />

      <div className="container mx-auto px-4 md:px-0 relative z-10">
        
        {/* GRID LAYOUT: Matches the "Columns with Vertical Lines" structure of the reference image */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-t border-b border-grid-line">

            {/* COL 1: Spacer / Left Side (Matches the empty left col in reference) */}
            <div className="hidden md:block md:col-span-3 border-r border-grid-line min-h-[400px] relative">
                 {/* Decorative diagonal lines potentially? Keeping simple for now */}
            </div>

            {/* COL 2: CENTER VIDEO (Matches the middle column) */}
            <div className="col-span-1 md:col-span-5 border-r border-grid-line relative group bg-black overflow-hidden flex items-center justify-center">
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                    src="https://letta.sfo2.cdn.digitaloceanspaces.com/letta-video-thumbnail.mp4"
                />
                
                {/* Central Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full p-4 group-hover:scale-110 transition-transform duration-500">
                        <Play className="w-6 h-6 fill-white text-white" />
                    </div>
                </div>
            </div>

            {/* COL 3: RIGHT CONTENT (Matches the right text col in reference) */}
            <div className="col-span-1 md:col-span-4 p-8 md:p-12 flex flex-col justify-center bg-background/50 backdrop-blur-sm">
                
                 {/* // OPEN_LAB Header */}
                 <div className="font-mono text-[11px] tracking-widest text-blue-500 mb-6 uppercase">
                    {"// OPEN_LAB"}
                 </div>

                 <h3 className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-10">
                    Letta is an <span className="text-foreground border-b border-foreground/20 pb-0.5">open AI lab</span>, building intelligent machines that can learn from experiences.
                 </h3>

                 <div className="flex gap-4">
                    <Link 
                        href="/about" 
                        className="px-6 py-3 bg-foreground text-background text-[11px] font-bold tracking-[0.1em] uppercase hover:opacity-80 transition-opacity"
                    >
                        About Us
                    </Link>
                    <Link 
                        href="/careers" 
                        className="px-6 py-3 border border-foreground/20 text-foreground/80 text-[11px] font-bold tracking-[0.1em] uppercase hover:bg-foreground/5 hover:text-foreground transition-colors"
                    >
                        Open Roles
                    </Link>
                 </div>
            </div>

        </div>

      </div>
    </section>
  );
};
