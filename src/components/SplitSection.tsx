"use client";

import React, { useState } from "react";
import { ArrowRight, Award, Code, Shield, Cpu, Database, Globe } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";
import { ScrambleText } from "./ui/ScrambleText";
import { usePersona } from "./PersonaProvider";
import { siteAssets } from "@/data/personaContent";

// Engineering Skills Data - From Resume
const engineerSkills = {
  "Languages": {
    icon: <Code size={16} />,
    items: ["C", "C#", "C++", "Go Lang", "Elixir", "Java", "Python", "TypeScript", "JavaScript"]
  },
  "Frontend": {
    icon: <Globe size={16} />,
    items: ["React.js", "React Native", "Angular", "Vue.js", "Svelte", "Next.js", "Bootstrap", "SASS", "TailwindCSS", "FlutterFlow"]
  },
  "Backend": {
    icon: <Database size={16} />,
    items: ["Node.js", "NPM", "PHP", "AWS", "Azure", "Google Cloud"]
  },
  "Tools": {
    icon: <Cpu size={16} />,
    items: ["Power BI", "Tableau", "MySQL", "DynamoDB", "Cassandra", "Supabase", "SQLite", "Blender", "PyCharm", "VS Code", "IntelliJ"]
  },
  "Soft Skills": {
    icon: <Shield size={16} />,
    items: ["Rapport Building", "Stakeholder Management", "People Management", "Communication"]
  }
};

// Creative Skills Data
const creativeSkills = {
  "3D Modeling": {
    icon: <Cpu size={16} />,
    items: ["Blender", "3ds Max", "ZBrush", "Maya", "Cinema 4D"]
  },
  "Texturing": {
    icon: <Globe size={16} />,
    items: ["Substance Painter", "Photoshop", "Quixel Mixer", "PBR Workflows"]
  },
  "Design": {
    icon: <Code size={16} />,
    items: ["Photoshop", "Illustrator", "Figma", "After Effects", "Premiere Pro"]
  },
  "Simulation": {
    icon: <Shield size={16} />,
    items: ["ETS2 SDK", "Unity", "Unreal Engine", "HDRI Lighting"]
  }
};

// Engineer Certifications - From Resume with Links
const engineerCertifications = [
  { name: "Hugging Face Agent Fundamentals", issuer: "Hugging Face", year: "2025", link: "https://huggingface.co/datasets/agents-course/certificates/resolve/main/certificates/krishna-cc/2025-04-24.png" },
  { name: "Hugging Face Agent Course", issuer: "Hugging Face", year: "2024", link: "/Hugging Face Agent course.pdf" },
  { name: "Cybersecurity Workshop", issuer: "NIT GOA & NFSU GOA", year: "2024", link: "/Cybersecurity Workshop (NIT GOA & NFSU GOA).pdf" },
  { name: "Cloud Cybersecurity Certificate", issuer: "Google Cloud", year: "2024", link: "https://www.credly.com/badges/997ed0ce-3402-4d01-9eb9-19bf40dbd7e9/public_url" },
  { name: "Cloud Computing Foundations", issuer: "Google Cloud", year: "2024", link: "https://www.credly.com/badges/4c0d6237-4dc1-442f-b45b-1b9d97d697f3/public_url" },
  { name: "Python Essentials 1", issuer: "Cisco", year: "2024", link: "https://www.credly.com/badges/6ac1df6c-92a4-45f9-9e48-1941fac84036/public_url" },
  { name: "Cyber Threat Management", issuer: "Cisco", year: "2024", link: "https://www.credly.com/badges/babe8c4f-bd30-44b6-a70b-d06ba833fc54/public_url" },
  { name: "100x DEVs Cohort 3", issuer: "100xDevs", year: "2024", link: "/100x DEVs Cohort 3.pdf" },
];

// Creative Achievements (for creative mode)
const creativeAchievements = [
  { name: "Featured ETS2 Mod Creator", issuer: "Steam Workshop", year: "2024", link: "#" },
  { name: "3D Visualization Excellence", issuer: "ArtStation", year: "2024", link: "#" },
  { name: "Blender Certified", issuer: "Blender Foundation", year: "2023", link: "#" },
  { name: "Adobe Creative Suite", issuer: "Adobe", year: "2023", link: "#" },
];

export const SplitSection = () => {
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);
  const { persona } = usePersona();
  
  const skills = persona === "engineer" ? engineerSkills : creativeSkills;
  const certifications = persona === "engineer" ? engineerCertifications : creativeAchievements;
  const leftTitle = persona === "engineer" ? "Technical Skills" : "Creative Skills";
  const rightTitle = persona === "engineer" ? "Certifications" : "Achievements";

  return (
    <section id="skills" className="relative flex flex-col md:flex-row border-b border-grid-line bg-background transition-colors duration-300">
      
      {/* =========================================
          LEFT PANEL: Skills
      ========================================= */}
      <div 
        className={clsx(
          "w-full md:w-1/2 p-12 md:p-[66px] border-b md:border-b-0 md:border-r border-grid-line relative group/panel-left transition-all duration-300",
          "inverse-hover-panel"
        )}
        onMouseEnter={() => setHoverLeft(true)}
        onMouseLeave={() => setHoverLeft(false)}
      >
         {/* Noise Overlay */}
         <div className="absolute inset-0 noise-overlay opacity-10 pointer-events-none mix-blend-overlay" />

         <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
               {/* Label */}
               <div className="mb-6">
                  <div className={clsx(
                    "inline-flex items-center justify-center px-2 py-0.5 border rounded-sm transition-colors duration-300",
                    "border-black/20 group-hover/panel-left:border-white/20",
                    "dark:border-white/20 dark:group-hover/panel-left:border-black/20"
                  )}>
                    <span className={clsx(
                      "text-[10px] font-mono uppercase tracking-[0.1em] transition-colors duration-300",
                      "text-black/60 group-hover/panel-left:text-white/60",
                      "dark:text-white/90 dark:group-hover/panel-left:text-black/90"
                    )}>{persona === "engineer" ? "Build" : "Create"}</span>
                  </div>
               </div>
               
               {/* Heading */}
               <div className={clsx(
                    "inline-flex items-center gap-2 mb-6 text-[27px] leading-tight font-medium tracking-tight transition-colors duration-300",
                    "text-black group-hover/panel-left:text-white",
                    "dark:text-white dark:group-hover/panel-left:text-black"
                  )}
                >
                  <ScrambleText 
                    text={leftTitle} 
                    className={clsx(
                      "text-black group-hover/panel-left:text-white",
                      "dark:text-white dark:group-hover/panel-left:text-black"
                    )} 
                    trigger={hoverLeft} 
                  />
               </div>
               
               <p className={clsx(
                 "text-[17px] mb-8 max-w-md leading-relaxed transition-colors duration-300",
                 "text-black/70 group-hover/panel-left:text-white/70",
                 "dark:text-white/90 dark:group-hover/panel-left:text-black/90"
               )}>
                  {persona === "engineer" 
                    ? "Full-stack development, AI/ML systems, and cybersecurity expertise."
                    : "3D modeling, visual design, and simulation asset creation."
                  }
               </p>

               {/* Skills Grid */}
               <div className="space-y-6">
                  {Object.entries(skills).map(([category, { icon, items }]) => (
                    <div key={category}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={clsx(
                          "transition-colors",
                          "text-black/50 group-hover/panel-left:text-white/50",
                          "dark:text-white/70 dark:group-hover/panel-left:text-black/70"
                        )}>
                          {icon}
                        </span>
                        <span className={clsx(
                          "text-[11px] font-mono uppercase tracking-widest transition-colors duration-300",
                          "text-black/60 group-hover/panel-left:text-white/70",
                          "dark:text-white/90 dark:group-hover/panel-left:text-black/90"
                        )}>{category}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <span 
                            key={skill}
                            className={clsx(
                              "px-3 py-1.5 text-sm border rounded-sm transition-all duration-300",
                              "border-black/10 bg-black/[0.02] text-black/80",
                              "group-hover/panel-left:border-white/10 group-hover/panel-left:bg-white/[0.05] group-hover/panel-left:text-white/90",
                              "dark:border-white/10 dark:bg-white/[0.02] dark:text-white/90",
                              "dark:group-hover/panel-left:border-black/10 dark:group-hover/panel-left:bg-black/[0.05] dark:group-hover/panel-left:text-black/90"
                            )}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>


      {/* =========================================
          RIGHT PANEL: Certifications
      ========================================= */}
      <div 
        className={clsx(
          "w-full md:w-1/2 p-12 md:p-[66px] relative group/panel-right transition-all duration-300",
          "inverse-hover-panel"
        )}
        onMouseEnter={() => setHoverRight(true)}
        onMouseLeave={() => setHoverRight(false)}
      >
         {/* Noise Overlay */}
         <div className="absolute inset-0 noise-overlay opacity-10 pointer-events-none mix-blend-overlay" />

         <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
               {/* Label */}
               <div className="mb-6">
                  <div className={clsx(
                    "inline-flex items-center justify-center px-2 py-0.5 border rounded-sm transition-colors duration-300",
                    "border-black/20 group-hover/panel-right:border-white/20",
                    "dark:border-white/20 dark:group-hover/panel-right:border-black/20"
                  )}>
                    <span className={clsx(
                      "text-[10px] font-mono uppercase tracking-[0.1em] transition-colors duration-300",
                      "text-black/60 group-hover/panel-right:text-white/60",
                      "dark:text-white/90 dark:group-hover/panel-right:text-black/90"
                    )}>{persona === "engineer" ? "Verified" : "Recognized"}</span>
                  </div>
               </div>
               
               {/* Heading */}
               <div className={clsx(
                    "inline-flex items-center gap-2 mb-6 text-[27px] leading-tight font-medium tracking-tight transition-colors duration-300",
                    "text-black group-hover/panel-right:text-white",
                    "dark:text-white dark:group-hover/panel-right:text-black"
                  )}
                >
                  <ScrambleText 
                    text={rightTitle} 
                    className={clsx(
                      "text-black group-hover/panel-right:text-white",
                      "dark:text-white dark:group-hover/panel-right:text-black"
                    )} 
                    trigger={hoverRight} 
                  />
               </div>
               
               <p className={clsx(
                 "text-[17px] mb-8 max-w-md leading-relaxed transition-colors duration-300",
                 "text-black/70 group-hover/panel-right:text-white/70",
                 "dark:text-white/90 dark:group-hover/panel-right:text-black/90"
               )}>
                  {persona === "engineer"
                    ? "Industry-recognized credentials in AI, cloud, and security."
                    : "Recognition for creative work and design excellence."
                  }
               </p>

               {/* Certifications List */}
               <div className={clsx(
                 "border-t transition-colors",
                 "border-black/10 group-hover/panel-right:border-white/10",
                 "dark:border-white/10 dark:group-hover/panel-right:border-black/10"
               )}>
                  {certifications.map((cert, idx) => (
                     <a 
                       key={idx}
                       href={cert.link || "#"}
                       target={cert.link?.startsWith("http") ? "_blank" : undefined}
                       rel={cert.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                       className={clsx(
                         "py-4 border-b flex items-center justify-between transition-all cursor-pointer group/cert",
                         "border-black/10 hover:bg-black/[0.03]",
                         "group-hover/panel-right:border-white/10 group-hover/panel-right:hover:bg-white/[0.03]",
                         "dark:border-white/10 dark:hover:bg-white/[0.03]",
                         "dark:group-hover/panel-right:border-black/10 dark:group-hover/panel-right:hover:bg-black/[0.03]"
                       )}
                     >
                        <div className="flex items-center gap-3">
                          <Award className={clsx(
                            "transition-colors",
                            persona === "engineer" ? "text-blue-500" : "text-purple-500"
                          )} size={18} />
                          <div>
                            <span className={clsx(
                              "text-[15px] font-medium block transition-colors group-hover/cert:text-blue-500",
                              "text-black group-hover/panel-right:text-white",
                              "dark:text-white dark:group-hover/panel-right:text-black"
                            )}>{cert.name}</span>
                            <span className={clsx(
                              "text-[12px] transition-colors",
                              "text-black/50 group-hover/panel-right:text-white/50",
                              "dark:text-white/60 dark:group-hover/panel-right:text-black/60"
                            )}>{cert.issuer}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={clsx(
                            "text-[11px] font-mono transition-colors",
                            "text-black/40 group-hover/panel-right:text-white/40",
                            "dark:text-white/50 dark:group-hover/panel-right:text-black/50"
                          )}>{cert.year}</span>
                          <ArrowRight size={14} className={clsx(
                            "transition-all group-hover/cert:translate-x-1 group-hover/cert:text-blue-500",
                            "text-black/30 group-hover/panel-right:text-white/30",
                            "dark:text-white/40 dark:group-hover/panel-right:text-black/40"
                          )} />
                        </div>
                     </a>
                  ))}
               </div>
            </div>

            <div className="mt-12">
               <a 
                 href={siteAssets.resumeHref}
                 download
                 className={clsx(
                   "inline-flex items-center gap-2 font-medium transition-colors text-sm",
                   "text-black hover:text-blue-500 group-hover/panel-right:text-white group-hover/panel-right:hover:text-blue-400",
                   "dark:text-white dark:hover:text-blue-400 dark:group-hover/panel-right:text-black dark:group-hover/panel-right:hover:text-blue-600"
                 )}
               >
                  <span className={clsx(
                    "border-b pb-0.5 transition-colors",
                    "border-black/30 group-hover/panel-right:border-white/30",
                    "dark:border-white/30 dark:group-hover/panel-right:border-black/30"
                  )}>Download Full Resume</span>
                  <ArrowRight size={14} />
               </a>
            </div>
         </div>
      </div>

    </section>
  );
};
