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

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={persona}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
            >
             
             {/* FEATURED PROJECT (First one - Spans 6 cols) */}
             <div className="lg:col-span-6 flex flex-col">
                <div className="group h-full inverse-hover-panel border border-black/20 hover:border-white/20 dark:border-white/10 dark:hover:border-black/20 relative overflow-hidden transition-all duration-300 flex flex-col">
                    {/* Image Area */}
                    <div className={`h-[240px] w-full bg-[#151515] border-b border-white/10 flex items-center justify-center overflow-hidden relative transition-colors`}>
                        <div className="absolute inset-0 opacity-20" 
                             style={{ backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
                        </div>
                        <div className={`font-mono text-4xl md:text-5xl font-bold tracking-widest transition-colors uppercase ${
                          persona === "engineer" ? "text-blue-500/30" : "text-purple-500/30"
                        }`}>
                            {projects[0].tag}
                        </div>
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                        <div className="mb-6 flex items-center justify-between">
                             <span className={`px-3 py-1 border text-[10px] font-mono uppercase tracking-widest rounded-sm ${
                               persona === "engineer" 
                                 ? "border-blue-500/30 text-blue-400" 
                                 : "border-purple-500/30 text-purple-400"
                             }`}>
                                {projects[0].tag}
                             </span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-4 transition-colors">
                            {projects[0].title}
                        </h3>
                        
                        <p className="text-foreground/60 text-sm leading-relaxed mb-6 max-w-md">
                            {projects[0].description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {projects[0].techStack.map(tech => (
                            <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 text-xs font-mono text-foreground/70 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-5 flex-wrap">
                          {projects[0].link && (
                            <a href={projects[0].link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-mono text-foreground/60 hover:text-foreground transition-colors">
                              <Github size={18} /> VIEW CODE
                            </a>
                          )}
                          {(projects[0] as any).demoLink && (
                            <a href={(projects[0] as any).demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-mono text-foreground/60 hover:text-foreground transition-colors">
                              <ExternalLink size={18} /> LIVE DEMO
                            </a>
                          )}
                          {(projects[0] as any).notionLink && (
                            <a href={(projects[0] as any).notionLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-mono text-foreground/60 hover:text-foreground transition-colors">
                              <FileText size={18} /> DOCS
                            </a>
                          )}
                        </div>
                    </div>
                </div>
             </div>

             {/* SECONDARY PROJECTS (Other two - Spans 6 cols, split into 2) */}
             <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                
                {projects.slice(1).map((project, idx) => (
                  <div 
                    key={project.id} 
                    className={`group inverse-hover-panel border border-black/20 hover:border-white/20 dark:border-white/10 dark:hover:border-black/20 relative overflow-hidden transition-all duration-300 flex flex-col ${
                      (idx === projects.slice(1).length - 1 && projects.slice(1).length % 2 !== 0) ? "md:col-span-2" : ""
                    }`}
                  >
                      {/* Header Image Pattern */}
                      <div className="h-[120px] w-full bg-[#151515] border-b border-white/10 relative overflow-hidden flex items-center justify-center transition-colors">
                          <span className={`font-mono text-xl font-bold uppercase ${
                            persona === "engineer" ? "text-blue-500/20" : "text-purple-500/20"
                          }`}>
                            {project.tag}
                          </span>
                      </div>
                      
                      <div className="p-6 flex flex-col h-full">
                           <div className="mb-4 flex items-center justify-between">
                               <span className={`px-2 py-0.5 border text-[9px] font-mono uppercase tracking-widest rounded-sm ${
                                 persona === "engineer" 
                                   ? "border-blue-500/30 text-blue-400/80" 
                                   : "border-purple-500/30 text-purple-400/80"
                               }`}>
                                  {project.tag}
                               </span>
                          </div>
                          <h4 className="text-lg font-medium text-foreground mb-2 transition-colors">
                             {project.title}
                          </h4>
                          <p className="text-foreground/60 text-xs leading-relaxed mb-4">
                            {project.description}
                          </p>
                          
                          <div className="mt-auto">
                            <div className="flex flex-wrap gap-1 mb-4">
                              {project.techStack.slice(0, 3).map(tech => (
                                <span key={tech} className="px-2 py-0.5 bg-white/5 text-[10px] font-mono text-foreground/50 rounded">
                                  {tech}
                                </span>
                              ))}
                              {project.techStack.length > 3 && (
                                <span className="px-2 py-0.5 text-[10px] font-mono text-foreground/40">
                                  +{project.techStack.length - 3}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-4 flex-wrap">
                              {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-foreground/50 hover:text-foreground transition-colors uppercase tracking-wider">
                                  View Project <ArrowRight size={14} />
                                </a>
                              )}
                              {(project as any).demoLink && (
                                <a href={(project as any).demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-foreground/50 hover:text-foreground transition-colors uppercase tracking-wider">
                                  Live Demo <ExternalLink size={14} />
                                </a>
                              )}
                              {(project as any).notionLink && (
                                <a href={(project as any).notionLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-foreground/50 hover:text-foreground transition-colors uppercase tracking-wider">
                                  Docs <FileText size={14} />
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
