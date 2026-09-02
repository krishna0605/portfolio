"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Briefcase, CalendarDays, CheckCircle2, ExternalLink } from "lucide-react";
import { workExperience } from "@/data/personaContent";
import { usePersona } from "./PersonaProvider";

export const WorkExperienceSection = () => {
  const { persona } = usePersona();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {persona === "engineer" && (
        <motion.section
          id="experience"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.35, ease: "easeOut" }}
          className="scroll-mt-20 border-b border-grid-line bg-background py-20 md:py-24"
        >
          <div className="mx-auto max-w-[1280px] px-4 md:px-6">
            <div className="mb-12">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-blue-500 dark:text-blue-400">
                {"// PROFESSIONAL_EXPERIENCE"}
              </p>
              <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                Experience beyond the build
              </h2>
              <p className="mt-3 max-w-2xl text-foreground/60">
                Practical cloud and delivery experience supporting the systems thinking behind my engineering work.
              </p>
            </div>

            <article className="border border-grid-line bg-transparent">
              <div className="grid gap-10 p-7 md:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:p-14">
                <div>
                  <div className="mb-7 flex h-12 w-12 items-center justify-center border border-blue-500/25 bg-blue-500/10 text-blue-500 dark:text-blue-400">
                    <Briefcase size={22} />
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/45">
                    {workExperience.company}
                  </p>
                  <h3 className="mt-3 text-2xl font-medium text-foreground md:text-3xl">
                    {workExperience.role}
                  </h3>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 border border-grid-line bg-background/60 px-3 py-1.5 text-xs text-foreground/65">
                      <CalendarDays size={14} /> {workExperience.period}
                    </span>
                    <span className="inline-flex items-center gap-2 border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 size={14} /> {workExperience.status}
                    </span>
                  </div>

                  <p className="mt-7 max-w-lg leading-relaxed text-foreground/65">
                    {workExperience.summary}
                  </p>

                  {workExperience.credentialUrl && (
                    <a
                      href={workExperience.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 border border-foreground/20 px-5 py-3 text-xs font-mono uppercase tracking-widest text-foreground transition-colors hover:border-blue-500 hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      View internship certificate <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                <div className="flex flex-col justify-between">
                  <ul className="space-y-5" aria-label="Maincrafts internship achievements">
                    {workExperience.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-4 border-b border-grid-line pb-5 last:border-b-0">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                        <span className="leading-relaxed text-foreground/75">{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-2 border-t border-grid-line pt-7">
                    {workExperience.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="border border-grid-line bg-background/70 px-3 py-1.5 text-[11px] font-mono text-foreground/60"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
