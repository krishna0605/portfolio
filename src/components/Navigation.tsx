"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Book, Box, Briefcase, Code, Cpu, Github, Layers, Terminal, Menu, X, Linkedin } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { PersonaToggle } from "./PersonaToggle";
import { MobileMenu } from "./MobileMenu";
import { usePersona } from "./PersonaProvider";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { siteAssets } from "@/data/personaContent";

// Portfolio Menu Data with persona tags for projects
const navigationItems = {
  Projects: [
    { title: "NETRA", desc: "Network evidence and packet forensics", href: "#projects", icon: <Cpu />, persona: "engineer" as const },
    { title: "NextStop.ai", desc: "AI meeting intelligence platform", href: "#projects", icon: <Box />, persona: "engineer" as const },
    { title: "ETS2 Mods", desc: "3D simulation assets", href: "#projects", icon: <Layers />, persona: "creative" as const },
  ],
  Skills: [
    { title: "AI/ML", desc: "LangChain, TensorFlow, RAG systems", href: "#skills", icon: <Book /> },
    { title: "Security", desc: "Threat detection, malware analysis", href: "#skills", icon: <Terminal /> },
  ],
  About: [
    { title: "Background", desc: "Education & experience", href: "#about", icon: <Book /> },
    { title: "Experience", desc: "Cloud Computing & DevOps internship", href: "#experience", icon: <Briefcase /> },
    { title: "GitHub Activity", desc: "Year-by-year contribution history", href: "#contributions", icon: <Github /> },
    { title: "Resume", desc: "Download my CV", href: siteAssets.resumeHref, icon: <Code /> },
    { title: "Contact", desc: "Get in touch", href: "#contact", icon: <Terminal /> },
  ]
};

   // Mega Menu Container
   const NavDropdown = ({ items, isOpen, onItemClick }: { items: any[], isOpen: boolean, onItemClick?: (item: any) => void }) => {
   return (
      <AnimatePresence>
         {isOpen && (
            <motion.div 
               initial={{ opacity: 0, y: 0 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 0 }}
               transition={{ duration: 0.1 }}
               className="absolute top-full left-0 w-full bg-neutral-100 dark:bg-background border-b border-grid-line overflow-hidden z-40 noise-overlay"
               data-active="true"
               id="desktop-navigation-menu"
            >
               <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 border-x border-grid-line/50 relative z-10">
                  {items.map((item, idx) => (
                     <Link 
                        key={item.title} 
                        href={item.href}
                        download={item.href.endsWith(".pdf") ? true : undefined}
                        onClick={() => onItemClick?.(item)}
                        className={clsx(
                           "group block p-8 border-b border-r border-grid-line/50 transition-all duration-200 relative",
                           "hover:bg-black/5 dark:hover:bg-white/5"
                        )}
                     >
                        <div className="flex items-start gap-4 relative z-10">
                           <div className="p-2 border border-black/10 dark:border-white/10 rounded-sm text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white group-hover:border-black/50 dark:group-hover:border-white/50 transition-colors">
                              {item.icon}
                           </div>
                           <div>
                              <h4 className="text-black dark:text-white font-medium mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h4>
                              <p className="text-sm text-black/60 dark:text-white/60 group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors">{item.desc}</p>
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   );
};

export const Navigation = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { persona, setPersona } = usePersona();
  const menuItems = {
    ...navigationItems,
    About: navigationItems.About.filter(
      (item) => !["Experience", "GitHub Activity"].includes(item.title) || persona === "engineer",
    ),
  };

  // Handler to switch persona when clicking on project items
  const handleProjectClick = (item: any) => {
    if (item.persona) {
      setPersona(item.persona);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/0 backdrop-blur-sm border-b border-white/10" onMouseLeave={() => setActiveItem(null)}>
      <div className="max-w-[1400px] mx-auto h-16 flex items-center justify-between px-6 border-x border-white/10 relative z-50">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50">
           <span className="text-xl font-bold tracking-tight text-foreground font-mono">Krishna</span>
        </Link>

        {/* Desktop Links - Centered */}
        <div className="hidden md:flex items-center border-l border-grid-line h-full absolute left-1/2 -translate-x-1/2 top-0">
          {(Object.keys(menuItems) as Array<keyof typeof menuItems>).map((item) => (
            <div 
               key={item}
               className={clsx(
                 "h-full border-r border-grid-line relative transition-all duration-200 noise-overlay",
                     (activeItem === item) 
                     ? "bg-neutral-200 dark:bg-[#d6d6d6] text-black" 
                     : "text-foreground hover:bg-blue-500/5 dark:hover:bg-blue-400/10 hover:text-black dark:hover:text-white"
               )}
               onMouseEnter={() => setActiveItem(item)}
               data-active={activeItem === item}
            >
               <button
                 type="button"
                 aria-expanded={activeItem === item}
                 aria-controls="desktop-navigation-menu"
                 onFocus={() => setActiveItem(item)}
                 onClick={() => setActiveItem(activeItem === item ? null : item)}
                 onKeyDown={(event) => {
                   if (event.key === "Escape") setActiveItem(null);
                 }}
                 className="h-full px-8 flex items-center justify-center cursor-pointer relative z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
               >
                  <span className={clsx(
                      "text-sm font-medium transition-colors select-none",
                      (activeItem === item) ? "font-bold" : "group-hover:font-bold"
                    )}>
                    {item}
                  </span>
               </button>
            </div>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button 
           type="button"
           aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
           aria-expanded={isMobileMenuOpen}
           aria-controls="mobile-navigation-menu"
           className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors z-[60]"
           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
           {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3 z-50">
          <PersonaToggle />
          <ThemeToggle />
          <Link href="https://github.com/krishna0605" target="_blank" rel="noreferrer" aria-label="Krishna Kapoor on GitHub" className="p-2 hover:bg-white/5 rounded-md transition-colors text-foreground hover:text-white">
            <Github size={20} />
          </Link>
          <Link href="https://www.linkedin.com/in/krishna-kapoor-517546270/" target="_blank" rel="noreferrer" aria-label="Krishna Kapoor on LinkedIn" className="p-2 hover:bg-white/5 rounded-md transition-colors text-foreground hover:text-white">
            <Linkedin size={20} />
          </Link>
          <div className="group relative rounded-sm p-[1px] transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <div className="absolute inset-0 rounded-sm bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
            <a 
              href={siteAssets.resumeHref}
              download
              className="relative px-4 py-2 block text-sm font-medium bg-[#DEE1E4] dark:bg-[#1a1a1a] text-black dark:text-white group-hover:text-white group-hover:bg-transparent transition-colors rounded-[1px] z-10"
            >
              Resume
            </a>
          </div>
        </div>
      </div>

      {/* Mega Menu Container */}
      <NavDropdown 
         isOpen={activeItem !== null && activeItem in menuItems} 
         items={activeItem && activeItem in menuItems ? menuItems[activeItem as keyof typeof menuItems] : []} 
         onItemClick={handleProjectClick}
      />

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        menuItems={menuItems} 
      />
    </nav>
  );
};
