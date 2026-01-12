"use client";

import React from "react";

export const WarpedGridBackground = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-30 pointer-events-none overflow-hidden">
       <svg className="w-full h-full" viewBox="0 0 1400 800" preserveAspectRatio="none">
          {/* Warped Horizontal Lines */}
          <path d="M0,100 Q700,150 1400,100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <path d="M0,300 Q700,450 1400,300" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <path d="M0,500 Q700,550 1400,500" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          
          {/* Warped Vertical Lines */}
          <path d="M100,0 Q150,400 100,800" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <path d="M1300,0 Q1250,400 1300,800" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          
          {/* Central Orbit/Warp lines */}
          <ellipse cx="700" cy="400" rx="600" ry="300" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
          <ellipse cx="700" cy="400" rx="400" ry="150" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
       </svg>
    </div>
  );
};
