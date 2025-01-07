"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github, FileText } from "lucide-react";
import { usePersona } from "./PersonaProvider";
import { engineerProjects, creativeProjects } from "@/data/personaContent";
import { motion, AnimatePresence } from "framer-motion";

export const ArticlesSection = () => {
  const { persona } = usePersona();
  const projects = persona === "engineer" ? engineerProjects : creativeProjects;
  const sectionTitle = persona === "engineer" ? "Engineering Projects" : "Creative Portfolio";
  const sectionSubtitle = persona === "engineer" ? "AI, Security & Full-Stack" : "3D, Design & Simulation";

  return (
    <section id="projects" className="w-full bg-background py-24 border-b border-white/5 transition-colors duration-300">
       <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
          
          {/* Header */}
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
                  key={`sub-${persona}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-foreground/60 mt-2"
                >
                  {sectionSubtitle}
                </motion.p>
              </div>
              <Link href="#contact" className="hidden md:flex items-center gap-2 text-sm font-mono text-foreground/60 hover:text-foreground transition-colors uppercase tracking-widest">
                  Contact Me <ArrowRight className="w-4 h-4" />
              </Link>
          </div>

          {/* Projects Grid — Row 1: 3 cards, Row 2: 2 cards centered */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={persona}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6 lg:gap-8"
            >
              {/* Row 1 — 3 equal cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {projects.slice(0, 3).map((project) => (
                  <div 
                    key={project.id} 
                    className="group inverse-hover-panel border border-black/20 hover:border-white/20 dark:border-white/10 dark:hover:border-black/20 relative overflow-hidden transition-all duration-300 flex flex-col"
                  >
                      {/* Header Image Pattern */}
                      <div className="h-[140px] w-full bg-[#151515] border-b border-white/10 relative overflow-hidden flex items-center justify-center transition-colors">
                          <div className="absolute inset-0 opacity-10" 
                               style={{ backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
                          </div>
                          <span className={`font-mono text-xl md:text-2xl font-bold uppercase tracking-widest ${
                            persona === "engineer" ? "text-blue-500/25" : "text-purple-500/25"
                          }`}>
                            {project.tag}
                          </span>
                      </div>
                      
                      <div className="p-6 flex flex-col flex-1">
                           <div className="mb-4 flex items-center justify-between">
                               <span className={`px-2 py-0.5 border text-[9px] font-mono uppercase tracking-widest rounded-sm ${
                                 persona === "engineer" 
                                   ? "border-blue-500/30 text-blue-400/80" 
                                   : "border-purple-500/30 text-purple-400/80"
                               }`}>
                                  {project.tag}
                               </span>
                          </div>
                          <h4 className="text-xl font-medium text-foreground mb-3 transition-colors">
                             {project.title}
                          </h4>
                          <p className="text-foreground/60 text-xs leading-relaxed mb-4">
                            {project.description}
                          </p>
                          
                          <div className="mt-auto">
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {project.techStack.slice(0, 4).map(tech => (
                                <span key={tech} className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] font-mono text-foreground/60 rounded">
                                  {tech}
                                </span>
                              ))}
                              {project.techStack.length > 4 && (
                                <span className="px-2 py-0.5 text-[10px] font-mono text-foreground/40">
                                  +{project.techStack.length - 4}
                                </span>
                              )}
                            </div>
                            
                            <div className="pt-4 border-t border-white/5 flex items-center gap-4 flex-wrap">
                              {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-foreground/50 hover:text-foreground transition-colors uppercase tracking-wider">
                                  <Github size={14} /> View Code
                                </a>
                              )}
                              {(project as any).demoLink && (
                                <a href={(project as any).demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-foreground/50 hover:text-foreground transition-colors uppercase tracking-wider">
                                  <ExternalLink size={14} /> Live Demo
                                </a>
                              )}
                              {(project as any).notionLink && (
                                <a href={(project as any).notionLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-foreground/50 hover:text-foreground transition-colors uppercase tracking-wider">
                                  <FileText size={14} /> Docs
                                </a>
                              )}
                            </div>
                          </div>
                      </div>
                  </div>
                ))}
              </div>

              {/* Row 2 — 2 equal cards, centered */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {projects.slice(3).map((project, idx) => (
                  <div 
                    key={project.id} 
                    className={`group inverse-hover-panel border border-black/20 hover:border-white/20 dark:border-white/10 dark:hover:border-black/20 relative overflow-hidden transition-all duration-300 flex flex-col ${
                      idx === 0 ? "lg:col-start-1" : "lg:col-start-2"
                    }`}
                    style={idx === 0 ? { marginLeft: 'auto', marginRight: 0, width: '100%', gridColumn: undefined } : undefined}
                  >
                      {/* Header Image Pattern */}
                      <div className="h-[140px] w-full bg-[#151515] border-b border-white/10 relative overflow-hidden flex items-center justify-center transition-colors">
                          <div className="absolute inset-0 opacity-10" 
                               style={{ backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
                          </div>
                          <span className={`font-mono text-xl md:text-2xl font-bold uppercase tracking-widest ${
                            persona === "engineer" ? "text-blue-500/25" : "text-purple-500/25"
                          }`}>
                            {project.tag}
                          </span>
                      </div>
                      
                      <div className="p-6 flex flex-col flex-1">
                           <div className="mb-4 flex items-center justify-between">
                               <span className={`px-2 py-0.5 border text-[9px] font-mono uppercase tracking-widest rounded-sm ${
                                 persona === "engineer" 
                                   ? "border-blue-500/30 text-blue-400/80" 
                                   : "border-purple-500/30 text-purple-400/80"
                               }`}>
                                  {project.tag}
                               </span>
                          </div>
                          <h4 className="text-xl font-medium text-foreground mb-3 transition-colors">
                             {project.title}
                          </h4>
                          <p className="text-foreground/60 text-xs leading-relaxed mb-4">
                            {project.description}
                          </p>
                          
                          <div className="mt-auto">
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {project.techStack.slice(0, 4).map(tech => (
                                <span key={tech} className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] font-mono text-foreground/60 rounded">
                                  {tech}
                                </span>
                              ))}
                              {project.techStack.length > 4 && (
                                <span className="px-2 py-0.5 text-[10px] font-mono text-foreground/40">
                                  +{project.techStack.length - 4}
                                </span>
                              )}
                            </div>
                            
                            <div className="pt-4 border-t border-white/5 flex items-center gap-4 flex-wrap">
                              {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-foreground/50 hover:text-foreground transition-colors uppercase tracking-wider">
                                  <Github size={14} /> View Code
                                </a>
                              )}
                              {(project as any).demoLink && (
                                <a href={(project as any).demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-foreground/50 hover:text-foreground transition-colors uppercase tracking-wider">
                                  <ExternalLink size={14} /> Live Demo
                                </a>
                              )}
                              {(project as any).notionLink && (
                                <a href={(project as any).notionLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-foreground/50 hover:text-foreground transition-colors uppercase tracking-wider">
                                  <FileText size={14} /> Docs
                                </a>
                              )}
                            </div>
                          </div>
                      </div>
                  </div>
                ))}
              </div>

          </motion.div>
          </AnimatePresence>

       </div>
    </section>
  );
};
