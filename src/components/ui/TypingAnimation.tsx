"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const TypingAnimation = ({ text, delay = 0, className }: { text: string, delay?: number, className?: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const animate = () => {
      const currentLength = displayedText.length;
      const fullLength = text.length;

      if (!isDeleting && currentLength < fullLength) {
        // Typing
        timeout = setTimeout(() => {
          setDisplayedText(text.substring(0, currentLength + 1));
        }, 50 + Math.random() * 50); // Random typing speed
      } else if (!isDeleting && currentLength === fullLength) {
        // Pause at end
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000 + delay);
      } else if (isDeleting && currentLength > 0) {
        // Deleting
        timeout = setTimeout(() => {
          setDisplayedText(text.substring(0, currentLength - 1));
        }, 30);
      } else if (isDeleting && currentLength === 0) {
        // Reset
        setIsDeleting(false);
        timeout = setTimeout(() => {
          // Restart loop
        }, 500);
      }
    };

    timeout = setTimeout(animate, 100);
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, text, delay]);

  return (
    <div className={`font-mono ${className}`}>
      {displayedText}
      <motion.span 
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-2 h-4 bg-blue-400 ml-1 align-middle"
      />
    </div>
  );
};
