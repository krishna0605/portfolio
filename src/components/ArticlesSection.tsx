"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, FileText, Github } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { creativeProjects, engineerProjects, type Project } from "@/data/personaContent";
import { usePersona } from "./PersonaProvider";

interface ProjectCardProps {
  project: Project;
  persona: "engineer" | "creative";
}

const ProjectCard = ({ project, persona }: ProjectCardProps) => {
  const isEngineer = persona === "engineer";

  return (
    <article className="group inverse-hover-panel border border-black/20 hover:border-white/20 dark:border-white/10 dark:hover:border-black/20 relative overflow-hidden transition-all duration-300 flex h-full flex-col">
      <div className="relative flex h-[140px] w-full items-center justify-center overflow-hidden border-b border-white/10 bg-[#151515] transition-colors">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(#3f3f46 1px, transparent 1px), linear-gradient(90deg, #3f3f46 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div
          className={`absolute inset-0 ${
            isEngineer
              ? "bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.16),transparent_68%)]"
              : "bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.16),transparent_68%)]"
          }`}
        />
        <span
          className={`relative px-5 text-center font-mono text-xl font-bold uppercase tracking-widest md:text-2xl ${
            isEngineer ? "text-blue-400/30" : "text-purple-400/30"
          }`}
        >
          {project.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span
          className={`mb-4 w-fit rounded-sm border px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest ${
            isEngineer
              ? "border-blue-500/30 text-blue-500 dark:text-blue-400"
              : "border-purple-500/30 text-purple-500 dark:text-purple-400"
          }`}
        >
          {project.tag}
        </span>

        <h3 className="text-xl font-medium text-foreground transition-colors">
          {project.title}
        </h3>
        <p className="mt-3 text-xs leading-relaxed text-foreground/65">
          {project.description}
        </p>

        <div className="mt-auto pt-6">
          <div className="mb-5 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((technology) => (
              <span
                key={technology}
                className="rounded border border-current/10 bg-current/[0.025] px-2 py-1 text-[10px] font-mono text-foreground/65"
              >
                {technology}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 text-[10px] font-mono text-foreground/45">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-current/10 pt-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code`}
                className="inline-flex items-center gap-2 text-xs font-mono text-foreground/55 hover:text-foreground uppercase tracking-wider transition-colors"
              >
                <Github size={14} /> View code
              </a>
            )}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target={project.projectUrl.startsWith("http") ? "_blank" : undefined}
                rel={project.projectUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={`${project.projectLabel ?? "View project"}: ${project.title}`}
                className="inline-flex items-center gap-2 text-xs font-mono text-foreground/55 hover:text-foreground uppercase tracking-wider transition-colors"
              >
                <ExternalLink size={14} /> {project.projectLabel ?? "View project"}
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} live demo`}
                className="inline-flex items-center gap-2 text-xs font-mono text-foreground/55 hover:text-foreground uppercase tracking-wider transition-colors"
              >
                <ExternalLink size={14} /> Live demo
              </a>
            )}
            {project.docsUrl && (
              <a
                href={project.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read ${project.title} documentation`}
                className="inline-flex items-center gap-2 text-xs font-mono text-foreground/55 hover:text-foreground uppercase tracking-wider transition-colors"
              >
                <FileText size={14} /> Docs
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export const ArticlesSection = () => {
  const { persona } = usePersona();
  const projects = persona === "engineer" ? engineerProjects : creativeProjects;
  const sectionTitle = persona === "engineer" ? "Engineering Projects" : "Creative Portfolio";
  const sectionSubtitle = persona === "engineer" ? "AI, Cloud, Security & Full-Stack" : "3D, Design & Simulation";

  return (
    <section id="projects" className="scroll-mt-20 w-full bg-background py-20 md:py-24 border-b border-grid-line transition-colors duration-300">
      <div className="container mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <motion.h2
              key={`title-${persona}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-4xl font-medium text-foreground tracking-tight"
            >
              {sectionTitle}
            </motion.h2>
            <motion.p
              key={`subtitle-${persona}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-2 text-foreground/60"
            >
              {sectionSubtitle}
            </motion.p>
          </div>
          <Link
            href="#contact"
            className="hidden md:flex items-center gap-2 text-sm font-mono text-foreground/60 hover:text-foreground transition-colors uppercase tracking-widest"
          >
            Contact me <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={persona}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className={
              persona === "engineer"
                ? "grid grid-cols-12 gap-6 lg:gap-8"
                : "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            }
          >
            {projects.map((project, index) => {
              const engineerCardClass = [0, 1, 5, 6].includes(index)
                ? "col-span-12 md:col-span-6 lg:col-span-6"
                : "col-span-12 md:col-span-6 lg:col-span-4";
              const centeredTabletCardClass = index === 6 ? "md:col-start-4 lg:col-start-auto" : "";

              return (
                <div
                  key={project.id}
                  className={persona === "engineer" ? `${engineerCardClass} ${centeredTabletCardClass}` : undefined}
                >
                  <ProjectCard project={project} persona={persona} />
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
