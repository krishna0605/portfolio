"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Github, Linkedin, Mail } from "lucide-react";
import clsx from "clsx";
import { aboutContent } from "@/data/personaContent";
import { usePersona } from "./PersonaProvider";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export const AboutFlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { persona } = usePersona();
  const content = aboutContent[persona];
  const shouldReduceMotion = Boolean(useReducedMotion());
  const frontButtonRef = useRef<HTMLButtonElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const hasInteracted = useRef(false);
  const previousPersona = useRef(persona);

  useEffect(() => {
    if (previousPersona.current !== persona) {
      previousPersona.current = persona;
      hasInteracted.current = false;
      setIsFlipped(false);
    }
  }, [persona]);

  const changeFace = (nextFlippedState: boolean) => {
    hasInteracted.current = true;
    setIsFlipped(nextFlippedState);
  };

  const focusVisibleFace = () => {
    if (!hasInteracted.current) return;
    (isFlipped ? backButtonRef : frontButtonRef).current?.focus({ preventScroll: true });
  };

  const renderFrontFace = (staticView = false) => (
    <div
      aria-hidden={isFlipped && !staticView}
      style={{
        gridArea: staticView ? undefined : "1 / 1",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: staticView ? "none" : "rotateY(0deg) translateZ(1px)",
      }}
      className={clsx(
        "relative flex min-h-[540px] overflow-hidden rounded-xl border border-white/10 bg-[#080808] shadow-2xl",
        !staticView && isFlipped && "pointer-events-none"
      )}
    >
      <Image
        src="/Screenshot 2026-01-12 163017.png"
        alt="Krishna Kapoor at a technology event"
        fill
        priority={false}
        className="object-cover opacity-80 transition-transform duration-700 ease-out hover:scale-[1.025]"
        sizes="(max-width: 900px) 100vw, 900px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/5" />

      <div className="relative z-10 flex w-full flex-col justify-end p-7 sm:p-10 md:p-14">
        <div className="mb-7 md:mb-8">
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl font-mono">
            {content.title}
          </h2>
          <p className="mt-3 max-w-2xl text-xs font-mono uppercase tracking-[0.16em] text-white/65 sm:text-sm sm:tracking-[0.2em]">
            {content.role}
          </p>
        </div>

        <div className="mb-8 flex items-center gap-5 md:mb-10 md:gap-6">
          <a
            href="mailto:creativesimulation1@gmail.com"
            aria-label="Email Krishna Kapoor"
            tabIndex={!staticView && isFlipped ? -1 : 0}
            className={clsx("rounded-sm text-white/70 transition-colors hover:text-white", focusRing)}
          >
            <Mail size={22} strokeWidth={1.5} />
          </a>
          <a
            href="https://github.com/krishna0605"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Krishna Kapoor's GitHub profile"
            tabIndex={!staticView && isFlipped ? -1 : 0}
            className={clsx("rounded-sm text-white/70 transition-colors hover:text-white", focusRing)}
          >
            <Github size={22} strokeWidth={1.5} />
          </a>
          <a
            href="https://www.linkedin.com/in/krishna-kapoor-517546270/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Krishna Kapoor's LinkedIn profile"
            tabIndex={!staticView && isFlipped ? -1 : 0}
            className={clsx("rounded-sm text-white/70 transition-colors hover:text-white", focusRing)}
          >
            <Linkedin size={22} strokeWidth={1.5} />
          </a>
        </div>

        <button
          ref={frontButtonRef}
          type="button"
          onClick={() => changeFace(true)}
          aria-expanded={isFlipped}
          aria-controls="about-card-details"
          tabIndex={!staticView && isFlipped ? -1 : 0}
          className={clsx(
            "inline-flex w-fit items-center gap-3 rounded-sm border border-white/25 bg-black/20 px-6 py-3.5 text-xs font-mono uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black sm:px-8 sm:py-4",
            focusRing
          )}
        >
          About me <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );

  const renderBackFace = (staticView = false) => (
    <div
      id="about-card-details"
      aria-hidden={!isFlipped && !staticView}
      style={{
        gridArea: staticView ? undefined : "1 / 1",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: staticView ? "none" : "rotateY(180deg) translateZ(1px)",
      }}
      className={clsx(
        "flex min-h-[540px] flex-col justify-between rounded-xl border border-white/10 bg-[#080808] p-7 text-left shadow-2xl sm:p-10 md:p-14 lg:p-16",
        !staticView && !isFlipped && "pointer-events-none"
      )}
    >
      <div>
        <span
          className={clsx(
            "inline-block rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-widest",
            persona === "engineer"
              ? "border-blue-400/20 bg-blue-400/5 text-blue-400"
              : "border-purple-400/20 bg-purple-400/5 text-purple-400"
          )}
        >
          {persona === "engineer" ? "System profile" : "Creative profile"}
        </span>

        <h3 className="mt-6 max-w-3xl text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
          {content.headline}
        </h3>
        <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-white/70 sm:text-base md:text-lg">
          {content.bio}
        </p>

        <ul className="mt-7 grid gap-3 sm:grid-cols-3" aria-label={`${persona} strengths`}>
          {content.strengths.map((strength) => (
            <li key={strength} className="flex gap-2.5 border border-white/10 bg-white/[0.025] p-3 text-sm text-white/75">
              <Check
                size={15}
                className={persona === "engineer" ? "mt-0.5 shrink-0 text-blue-400" : "mt-0.5 shrink-0 text-purple-400"}
              />
              <span>{strength}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-white/50">{content.closing}</p>
      </div>

      <button
        ref={backButtonRef}
        type="button"
        onClick={() => changeFace(false)}
        aria-label="Return to the profile photo"
        tabIndex={!staticView && !isFlipped ? -1 : 0}
        className={clsx(
          "mt-8 inline-flex w-fit items-center gap-3 rounded-sm border border-white/15 bg-transparent px-6 py-3.5 text-xs font-mono uppercase tracking-widest text-white/65 transition-colors hover:border-white/40 hover:text-white sm:px-8 sm:py-4",
          focusRing
        )}
      >
        <ArrowRight size={14} className="rotate-180" /> Back to profile
      </button>
    </div>
  );

  return (
    <section id="about" className="scroll-mt-20 relative flex items-center justify-center overflow-hidden border-t border-grid-line bg-background py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <svg className="absolute left-0 top-1/2 h-auto w-[25%] -translate-y-1/2 text-foreground opacity-10" viewBox="0 0 200 400" fill="none" aria-hidden="true">
          <path d="M0 200 H50 V100 H100 V50 H150" stroke="currentColor" strokeWidth="1" />
          <path d="M0 220 H40 V300 H120" stroke="currentColor" strokeWidth="1" />
          <circle cx="150" cy="50" r="3" fill="currentColor" />
          <circle cx="120" cy="300" r="3" fill="currentColor" />
          <path d="M0 100 H30 V180" stroke="currentColor" strokeWidth="1" />
          <rect x="25" y="175" width="10" height="10" stroke="currentColor" strokeWidth="1" />
        </svg>
        <svg className="absolute right-0 top-1/2 h-auto w-[25%] -translate-y-1/2 text-foreground opacity-10" viewBox="0 0 200 400" fill="none" aria-hidden="true">
          <path d="M200 200 H150 V100 H100 V50 H50" stroke="currentColor" strokeWidth="1" />
          <path d="M200 220 H160 V300 H80" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
          <circle cx="80" cy="300" r="3" fill="currentColor" />
        </svg>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,82,255,0.08),transparent_70%)]" />

      <div className="relative z-10 w-full max-w-[900px] px-4" style={{ perspective: "1200px" }}>
        {shouldReduceMotion ? (
          <AnimatePresence mode="wait" initial={false} onExitComplete={focusVisibleFace}>
            <motion.div
              key={isFlipped ? "details" : "profile"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onAnimationComplete={focusVisibleFace}
            >
              {isFlipped ? renderBackFace(true) : renderFrontFace(true)}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            className="grid w-full will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={focusVisibleFace}
          >
            {renderFrontFace()}
            {renderBackFace()}
          </motion.div>
        )}
      </div>
    </section>
  );
};
