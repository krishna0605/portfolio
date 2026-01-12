"use client";

import React from "react";
import { motion } from "framer-motion";

// All the marquee phrases mixed together
const marqueeItems = [
  { text: "LET'S BUILD SOMETHING AMAZING", outline: false },
  { text: "OPEN FOR COLLABORATIONS", outline: true },
  { text: "KRISHNA KAPOOR", outline: false },
  { text: "CODE • CREATE • INNOVATE", outline: true },
  { text: "AVAILABLE FOR PROJECTS", outline: false },
  { text: "WHERE AI MEETS ART", outline: true },
  { text: "HIRE ME", outline: false },
  { text: "ENGINEERING MEETS CREATIVITY", outline: true },
  { text: "TRUCKS • CODE • PIXELS", outline: false },
  { text: "CTRL + ALT + CREATE", outline: true },
  { text: "AI ENGINEER & CREATIVE", outline: false },
  { text: "HELLO WORLD → HELLO FUTURE", outline: true },
];

export const FooterMarquee = () => {
  return (
    <div className="w-full bg-black dark:bg-[#DEE1E4] text-white dark:text-black overflow-hidden py-3 border-t border-grid-line">
      <motion.div
        className="flex whitespace-nowrap items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          duration: 25, 
          ease: "linear", 
          repeat: Infinity 
        }}
      >
        {/* Repeat the entire set twice for seamless loop */}
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex items-center">
            {marqueeItems.map((item, i) => (
              <React.Fragment key={`${setIndex}-${i}`}>
                <span 
                  className="text-[2rem] md:text-[3.5rem] font-bold uppercase tracking-tight leading-none px-4 md:px-6"
                  style={item.outline ? {
                    WebkitTextStroke: '1.5px currentColor',
                    WebkitTextFillColor: 'transparent'
                  } : {}}
                >
                  {item.text}
                </span>
                <span className="text-[2rem] md:text-[3.5rem] font-bold px-2 md:px-4 opacity-30">•</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
