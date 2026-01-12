"use client";

import React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { usePersona } from "./PersonaProvider";

const footerLinks = [
  {
    title: "Work",
    links: [
      { label: "Projects", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "Resume", href: "/Krishna_Kapoor_Resume_2 .pdf" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/krishnakapoor" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/krishna-kapoor-517546270/" },
      { label: "Email", href: "mailto:creativesimulation1@gmail.com" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export const Footer = () => {
  const { persona } = usePersona();

  return (
    <footer id="contact" className="border-t border-grid-line bg-background relative z-10">
      <div className="max-w-[1400px] mx-auto border-x border-grid-line">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
          
          <div className="col-span-1 md:col-span-1 lg:col-span-2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-grid-line">
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground block mb-6 font-mono">
              Krishna Kapoor
            </Link>
            <p className="text-sm text-foreground/60 mb-8 max-w-xs">
              {persona === "engineer" 
                ? "Building intelligent systems, secure platforms, and AI-powered applications."
                : "Creating immersive 3D experiences, simulation assets, and visual designs."
              }
            </p>
            <div className="flex items-center gap-4">
              <Link href="mailto:creativesimulation1@gmail.com" className="text-foreground/60 hover:text-foreground transition-colors">
                <Mail size={20} />
              </Link>
              <Link href="https://github.com/krishnakapoor" target="_blank" className="text-foreground/60 hover:text-foreground transition-colors">
                <Github size={20} />
              </Link>
              <Link href="https://www.linkedin.com/in/krishna-kapoor-517546270/" target="_blank" className="text-foreground/60 hover:text-foreground transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, index) => (
            <div 
              key={column.title} 
              className="col-span-1 p-8 md:p-12 border-b md:border-b-0 border-grid-line md:border-r last:border-r-0"
            >
              <h4 className="font-medium text-foreground mb-6">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="p-6 md:px-12 border-t border-grid-line flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/40">
            © {new Date().getFullYear()} Krishna Kapoor. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full animate-pulse ${
              persona === "engineer" ? "bg-blue-500" : "bg-purple-500"
            }`}></span>
            <span className="text-xs text-foreground/60 font-mono">
              {persona === "engineer" ? "Engineer Mode" : "Creative Mode"}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
