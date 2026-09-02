"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";

const phrase = "FOR COLLABORATION — KRISHNA KAPOOR";
const repetitions = Array.from({ length: 6 }, (_, index) => index);

interface MarqueeGroupProps {
  groupRef?: RefObject<HTMLDivElement>;
}

const MarqueeGroup = ({ groupRef }: MarqueeGroupProps) => (
  <div ref={groupRef} className="flex shrink-0 items-center" aria-hidden="true">
    {repetitions.map((index) => (
      <div key={index} className="flex shrink-0 items-center">
        <span
          className="px-4 text-[2rem] font-bold uppercase leading-none tracking-tight md:px-6 md:text-[3.5rem]"
          style={
            index % 2 === 1
              ? {
                  WebkitTextStroke: "1.5px currentColor",
                  WebkitTextFillColor: "transparent",
                }
              : undefined
          }
        >
          {phrase}
        </span>
        <span className="px-2 text-[2rem] font-bold opacity-30 md:px-4 md:text-[3.5rem]">•</span>
      </div>
    ))}
  </div>
);

export const FooterMarquee = () => {
  const groupRef = useRef<HTMLDivElement>(null);
  const [groupWidth, setGroupWidth] = useState(0);
  const shouldReduceMotion = Boolean(useReducedMotion());

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const measure = () => setGroupWidth(Math.round(group.getBoundingClientRect().width));
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(group);

    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="w-full overflow-hidden border-t border-grid-line bg-black py-3 text-white dark:bg-[#DEE1E4] dark:text-black">
      <span className="sr-only">{phrase}</span>

      {shouldReduceMotion ? (
        <div className="px-5 text-center text-xl font-bold uppercase tracking-tight md:text-3xl">
          {phrase}
        </div>
      ) : (
        <motion.div
          className="flex w-max whitespace-nowrap will-change-transform"
          initial={{ x: 0 }}
          animate={groupWidth > 0 ? { x: [0, -groupWidth] } : { x: 0 }}
          transition={
            groupWidth > 0
              ? {
                  duration: groupWidth / 70,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }
              : undefined
          }
          aria-hidden="true"
        >
          <MarqueeGroup groupRef={groupRef} />
          <MarqueeGroup />
        </motion.div>
      )}
    </div>
  );
};
