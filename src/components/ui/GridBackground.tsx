"use client";

import React from "react";
import { clsx } from "clsx";

interface GridBackgroundProps {
  className?: string;
  size?: number;
}

export const GridBackground = ({ className, size = 64 }: GridBackgroundProps) => {
  return (
    <div
      className={clsx(
        "pointer-events-none fixed inset-0 z-[-1] w-full h-full",
        className
      )}
      style={{
        backgroundSize: `${size}px ${size}px`,
        backgroundImage: `
          linear-gradient(to right, var(--color-grid-line) 1px, transparent 1px),
          linear-gradient(to bottom, var(--color-grid-line) 1px, transparent 1px)
        `,
        backgroundPosition: "center top",
      }}
    >
      {/* Optional: Add a subtle gradient mask if needed to fade out edges, 
          but Letta seems to have hard lines mostly. Keeping it simple for now. */}
    </div>
  );
};
