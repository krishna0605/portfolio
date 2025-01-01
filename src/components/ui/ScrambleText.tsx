"use client";

import React, { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

interface ScrambleTextProps {
  text: string;
  className?: string;
  hoverTrigger?: boolean; // If true, triggers on internal hover. If false, controlled externally or auto.
  trigger?: boolean; // External trigger
}

export const ScrambleText = ({ text, className, hoverTrigger = true, trigger }: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHovering = useRef(false);

  const startScramble = () => {
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 2; // Speed: 2 frames per character resolve
    }, 30);
  };

  useEffect(() => {
      if (trigger) {
          startScramble();
      }
  }, [trigger]);

  const handleMouseEnter = () => {
    if (hoverTrigger) {
        isHovering.current = true;
        startScramble();
    }
  };

  return (
    <span 
        className={clsx("inline-block", className)}
        onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </span>
  );
};
