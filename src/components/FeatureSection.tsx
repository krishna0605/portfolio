"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Terminal, BookOpen, Cpu } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";
import { GridBlock } from "./ui/GridPattern";

const features = [
  {
    title: "Product",
    description: "Letta Cloud provides a managed service for deploying and managing Letta agents.",
    icon: <Cpu className="w-6 h-6" />,
    link: "https://platform.letta.com",
    label: "Launch App",
    gridLabel: "LE-01 // PRODUCT"
  },
  {
    title: "Research",
    description: "Our research focuses on how to give LLMs long-term memory and state management.",
    icon: <BookOpen className="w-6 h-6" />,
    link: "/research",
    label: "Read Papers",
    gridLabel: "LE-02 // RESEARCH"
  },
  {
    title: "Developers",
    description: "Build stateful AI applications with the open source Letta framework.",
    icon: <Terminal className="w-6 h-6" />,
    link: "https://docs.letta.com",
    label: "Read Docs",
    gridLabel: "LE-03 // DEVELOPERS"
  },
];

export const FeatureSection = () => {
  return (
    <section className="relative border-b border-grid-line bg-background">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 border-x border-grid-line">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={clsx(
              "group relative h-[400px]",
              // Add right border to all except the last one on desktop
              index !== features.length - 1 && "md:border-r"
            )}
          >
           <GridBlock label={feature.gridLabel} className="h-full flex flex-col justify-between border-grid-line border-b md:border-b-0 ">
              {/* Hover Highlight */}
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                <div className="mb-6 w-12 h-12 flex items-center justify-center rounded-sm bg-white/5 border border-white/10 text-white group-hover:bg-white/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-medium text-white mb-4">{feature.title}</h3>
                <p className="text-foreground/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-8">
                <Link 
                  href={feature.link}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-blue-200 transition-colors group-hover:translate-x-1 duration-300"
                >
                  {feature.label}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </GridBlock>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
