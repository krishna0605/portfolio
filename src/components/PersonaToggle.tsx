"use client";

import React from "react";
import { usePersona } from "./PersonaProvider";
import { motion } from "framer-motion";
import { Code, Palette } from "lucide-react";

export const PersonaToggle = () => {
  const { persona, setPersona } = usePersona();

  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-sm p-1">
      <button
        onClick={() => setPersona("engineer")}
        className={`
          relative px-3 py-1.5 text-xs font-medium rounded-sm transition-all duration-300
          flex items-center gap-1.5
          ${persona === "engineer" 
            ? "text-background" 
            : "text-foreground/60 hover:text-foreground"
          }
        `}
      >
        {persona === "engineer" && (
          <motion.div
            layoutId="persona-bg"
            className="absolute inset-0 bg-blue-500 rounded-sm"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <Code size={12} className="relative z-10" />
        <span className="relative z-10">Engineer</span>
      </button>
      
      <button
        onClick={() => setPersona("creative")}
        className={`
          relative px-3 py-1.5 text-xs font-medium rounded-sm transition-all duration-300
          flex items-center gap-1.5
          ${persona === "creative" 
            ? "text-background" 
            : "text-foreground/60 hover:text-foreground"
          }
        `}
      >
        {persona === "creative" && (
          <motion.div
            layoutId="persona-bg"
            className="absolute inset-0 bg-purple-500 rounded-sm"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <Palette size={12} className="relative z-10" />
        <span className="relative z-10">Creative</span>
      </button>
    </div>
  );
};
