"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Github, Linkedin, Mail, Download } from "lucide-react";
import { clsx } from "clsx";
import { PersonaToggle } from "./PersonaToggle";
import { ThemeToggle } from "./ThemeToggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Record<string, any[]>;
}

export const MobileMenu = ({ isOpen, onClose, menuItems }: MobileMenuProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Optional, useful to click-out */}
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={onClose}
             className="fixed inset-0 top-[64px] bg-black/60 backdrop-blur-sm z-[60] md:hidden"
          />

          {/* Full Width Dropdown Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[64px] left-0 w-full bg-background border-b border-grid-line z-[70] shadow-2xl overflow-y-auto max-h-[calc(100vh-64px)] md:hidden"
          >
            <div className="p-6 flex flex-col">
              
              {/* Links */}
              <div className="space-y-4">
                {(Object.keys(menuItems) as Array<keyof typeof menuItems>).map((section) => (
                  <div key={section} className="border-b border-grid-line pb-4 last:border-0">
                    <button
                      onClick={() => toggleSection(section)}
                      className="flex items-center justify-between w-full text-left font-medium text-foreground text-lg mb-2"
                    >
                      {section}
                      {expandedSection === section ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>
                    
                    <AnimatePresence>
                      {expandedSection === section && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pt-2 space-y-3 pb-2">
                            {menuItems[section].map((item: any) => (
                              <Link 
                                key={item.title}
                                href={item.href}
                                onClick={onClose}
                                className="block group"
                              >
                                <div className="text-foreground/90 font-medium group-hover:text-blue-500 transition-colors flex items-center gap-2">
                                  {item.title}
                                </div>
                                <div className="text-xs text-foreground/50 mt-0.5 ml-0">
                                  {item.desc}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Footer Actions - Portfolio Specific */}
              <div className="pt-6 mt-4 border-t border-grid-line space-y-4">
                 
                 {/* Toggles Row */}
                 <div className="flex items-center justify-center gap-4">
                    <PersonaToggle />
                    <ThemeToggle />
                 </div>

                 {/* Social Links Row */}
                 <div className="flex items-center justify-center gap-6">
                    <Link 
                       href="https://github.com/krishna0605" 
                       target="_blank"
                       className="p-3 hover:bg-foreground/10 rounded-md transition-colors text-foreground"
                    >
                       <Github size={22} />
                    </Link>
                    <Link 
                       href="https://www.linkedin.com/in/krishna-kapoor-517546270/" 
                       target="_blank"
                       className="p-3 hover:bg-foreground/10 rounded-md transition-colors text-foreground"
                    >
                       <Linkedin size={22} />
                    </Link>
                    <Link 
                       href="mailto:krishnakapoor@example.com"
                       className="p-3 hover:bg-foreground/10 rounded-md transition-colors text-foreground"
                    >
                       <Mail size={22} />
                    </Link>
                 </div>

                 {/* Resume Download CTA */}
                 <a 
                    href="/Krishna_Kapoor_Resume_2 .pdf" 
                    download
                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                 >
                    <Download size={18} />
                    Download Resume
                 </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
