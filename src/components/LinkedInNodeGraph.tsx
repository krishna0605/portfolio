"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Palette, Box, Layers, Cpu, Sparkles } from "lucide-react";
import clsx from "clsx";
import { usePersona } from "./PersonaProvider";

// LinkedIn Profile URL
const linkedInProfileUrl = "https://www.linkedin.com/in/krishna-kapoor-517546270/";

// ========== ENGINEER MODE DATA ==========
const linkedInPosts = [
  {
    id: "post-1",
    title: "AI & RAG Systems",
    date: "Mar 2025",
    url: "https://www.linkedin.com/posts/krishna-kapoor-517546270_ai-machinelearning-retrievalaugmentedgeneration-activity-7310001795357982720-20bo",
    category: "AI",
    color: "#3b82f6", // Blue
  },
  {
    id: "post-2",
    title: "Air-Gapped Systems",
    date: "Mar 2025",
    url: "https://www.linkedin.com/posts/krishna-kapoor-517546270_air-gapped-systems-activity-7308534904080797697-F7I3",
    category: "Security",
    color: "#ef4444", // Red
  },
  {
    id: "post-3",
    title: "GSSoC 2024",
    date: "Oct 2024",
    url: "https://www.linkedin.com/posts/krishna-kapoor-517546270_gssoc2024-opensource-collaboration-activity-7246875221754793987-1b9e",
    category: "Open Source",
    color: "#22c55e", // Green
  },
  {
    id: "post-4",
    title: "FlutterFlow Event",
    date: "Sep 2024",
    url: "https://www.linkedin.com/posts/krishna-kapoor-517546270_ffdggandhinagar-flutterflow-flutter-activity-7235995092258349056-rr34",
    category: "Flutter",
    color: "#8b5cf6", // Purple
  },
  {
    id: "post-5",
    title: "Docker Security",
    date: "Sep 2024",
    url: "https://www.linkedin.com/posts/krishna-kapoor-517546270_docker-containersecurity-ai-activity-7235572933501304832-gVo4",
    category: "DevOps",
    color: "#f59e0b", // Orange/Yellow
  },
];

// ========== CREATIVE MODE DATA ==========
const creativeNodes = [
  {
    id: "creative-1",
    title: "TATA Trucks",
    subtitle: "ETS2 Mods",
    url: "https://shopibs.in",
    category: "Modding",
    color: "#a855f7", // Purple
    icon: "truck",
  },
  {
    id: "creative-2",
    title: "IBS Gaming",
    subtitle: "Collaboration",
    url: "https://shopibs.in",
    category: "Community",
    color: "#ec4899", // Pink
    icon: "box",
  },
  {
    id: "creative-3",
    title: "Brand Liveries",
    subtitle: "Logitech • Booyah • Loco",
    url: "#projects",
    category: "Branding",
    color: "#06b6d4", // Cyan
    icon: "palette",
  },
  {
    id: "creative-4",
    title: "Blender",
    subtitle: "3D Modeling",
    url: "https://www.blender.org/",
    category: "Tool",
    color: "#f97316", // Orange
    icon: "layers",
  },
  {
    id: "creative-5",
    title: "Photoshop",
    subtitle: "Texturing",
    url: "https://www.adobe.com/products/photoshop.html",
    category: "Tool",
    color: "#14b8a6", // Teal
    icon: "cpu",
  },
];

// Define organic node positions (scattered layout like Obsidian)
const nodePositions = [
  { x: 450, y: 275 }, // Center
  { x: 180, y: 120 }, // Top left
  { x: 680, y: 100 }, // Top right
  { x: 120, y: 320 }, // Middle left
  { x: 750, y: 280 }, // Right
  { x: 280, y: 450 }, // Bottom left
  { x: 620, y: 420 }, // Bottom right (extra for flexibility)
];

// Engineer connections
const engineerConnections = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 0, to: 3 },
  { from: 0, to: 4 },
  { from: 0, to: 5 },
  { from: 1, to: 2 },
  { from: 1, to: 5 },
  { from: 2, to: 4 },
  { from: 3, to: 4 },
  { from: 3, to: 5 },
];

// Creative connections (more interconnected web)
const creativeConnections = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 0, to: 3 },
  { from: 0, to: 4 },
  { from: 0, to: 5 },
  { from: 1, to: 2 }, // ETS2 -> 3D Environments
  { from: 2, to: 3 }, // 3D -> Visual Design
  { from: 4, to: 2 }, // Substance -> 3D
  { from: 5, to: 2 }, // ZBrush -> 3D
  { from: 4, to: 5 }, // Substance -> ZBrush
  { from: 1, to: 4 }, // ETS2 -> Substance (texturing)
];

export const LinkedInNodeGraph = () => {
  const { persona } = usePersona();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredCenter, setHoveredCenter] = useState(false);

  // Select data based on persona
  const isEngineer = persona === "engineer";
  const nodes = isEngineer ? linkedInPosts : creativeNodes;
  const connections = isEngineer ? engineerConnections : creativeConnections;
  const accentColor = isEngineer ? "#3b82f6" : "#a855f7";
  const glowColor = isEngineer ? "rgba(0, 82, 255, 0.06)" : "rgba(168, 85, 247, 0.08)";

  // Get connected nodes for highlighting
  const getConnectedNodes = (nodeIndex: number) => {
    return connections
      .filter(c => c.from === nodeIndex || c.to === nodeIndex)
      .map(c => c.from === nodeIndex ? c.to : c.from);
  };

  const hoveredIndex = hoveredNode 
    ? nodes.findIndex(p => p.id === hoveredNode) + 1 
    : (hoveredCenter ? 0 : -1);
  
  const highlightedConnections = hoveredIndex >= 0 ? getConnectedNodes(hoveredIndex) : [];

  // Render icon for creative nodes
  const renderCreativeIcon = (iconType: string) => {
    const iconProps = { size: 12, className: "text-white" };
    switch(iconType) {
      case "palette": return <Palette {...iconProps} />;
      case "box": return <Box {...iconProps} />;
      case "layers": return <Layers {...iconProps} />;
      case "cpu": return <Cpu {...iconProps} />;
      default: return <Sparkles {...iconProps} />;
    }
  };

  return (
    <section className="relative w-full bg-background border-b border-grid-line py-16 md:py-24 overflow-hidden transition-colors duration-300">
      
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Subtle Gradient - Changes based on persona */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${glowColor}, transparent 70%)`
        }}
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header - Changes based on persona */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[11px] tracking-widest text-foreground/50 mb-3 uppercase"
          >
            {isEngineer ? "// KNOWLEDGE_GRAPH" : "// CREATIVE_GALAXY"}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-medium text-foreground"
          >
            {isEngineer ? "Insights & Articles" : "Tools & Projects"}
          </motion.h2>
        </div>

        {/* Node Graph SVG */}
        <div className="flex justify-center">
          <svg 
            viewBox="0 0 900 550" 
            className="w-full max-w-[900px] h-auto"
            style={{ minHeight: '450px' }}
          >
            {/* Connection Lines */}
            {connections.map((conn, index) => {
              const from = nodePositions[conn.from];
              const to = nodePositions[conn.to];
              const isHighlighted = hoveredIndex === conn.from || hoveredIndex === conn.to;
              
              return (
                <motion.line
                  key={`line-${index}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={isHighlighted 
                    ? (isEngineer ? "rgba(59, 130, 246, 0.5)" : "rgba(168, 85, 247, 0.5)") 
                    : "rgba(255, 255, 255, 0.1)"
                  }
                  strokeWidth={isHighlighted ? 1.5 : 0.5}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Center Node */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              onMouseEnter={() => setHoveredCenter(true)}
              onMouseLeave={() => setHoveredCenter(false)}
              style={{ cursor: 'pointer' }}
              onClick={() => isEngineer 
                ? window.open(linkedInProfileUrl, '_blank') 
                : document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              {/* Outer glow */}
              {hoveredCenter && (
                <motion.circle
                  cx={nodePositions[0].x}
                  cy={nodePositions[0].y}
                  r={35}
                  fill={isEngineer ? "rgba(59, 130, 246, 0.2)" : "rgba(168, 85, 247, 0.2)"}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.2 }}
                />
              )}
              <motion.circle
                cx={nodePositions[0].x}
                cy={nodePositions[0].y}
                r={22}
                fill={accentColor}
                animate={{
                  scale: hoveredCenter ? 1.2 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              {/* Center Icon */}
              <foreignObject 
                x={nodePositions[0].x - 10} 
                y={nodePositions[0].y - 10} 
                width={20} 
                height={20}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {isEngineer 
                    ? <Linkedin size={14} className="text-white" />
                    : <Sparkles size={14} className="text-white" />
                  }
                </div>
              </foreignObject>
              {/* Label */}
              <text
                x={nodePositions[0].x}
                y={nodePositions[0].y + 40}
                textAnchor="middle"
                className="fill-white/70 text-[11px] font-medium"
              >
                {isEngineer ? "Profile" : "Portfolio"}
              </text>
            </motion.g>

            {/* Node Items */}
            {nodes.map((node, index) => {
              const pos = nodePositions[index + 1];
              if (!pos) return null;
              const isHovered = hoveredNode === node.id;
              const isConnected = highlightedConnections.includes(index + 1);
              
              return (
                <motion.g
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.08, duration: 0.4, type: "spring" }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => {
                    if (node.url.startsWith('#')) {
                      document.getElementById(node.url.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.open(node.url, '_blank');
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer glow on hover */}
                  {isHovered && (
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={25}
                      fill={`${node.color}30`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1.3 }}
                    />
                  )}
                  
                  {/* Node circle */}
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isHovered ? 14 : (isConnected ? 12 : 10)}
                    fill={node.color}
                    animate={{
                      scale: isHovered ? 1.3 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                      filter: isHovered ? `drop-shadow(0 0 10px ${node.color})` : 'none'
                    }}
                  />

                  {/* Icon inside node for creative mode */}
                  {!isEngineer && 'icon' in node && (
                    <foreignObject 
                      x={pos.x - 6} 
                      y={pos.y - 6} 
                      width={12} 
                      height={12}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        {renderCreativeIcon((node as typeof creativeNodes[0]).icon)}
                      </div>
                    </foreignObject>
                  )}
                  
                  {/* Label - positioned to the side */}
                  <text
                    x={pos.x + (pos.x > 450 ? 22 : -22)}
                    y={pos.y + 4}
                    textAnchor={pos.x > 450 ? "start" : "end"}
                    className={clsx(
                      "text-[11px] font-medium transition-all duration-200",
                      isHovered ? "fill-white" : "fill-white/60"
                    )}
                  >
                    {node.title}
                  </text>
                  
                  {/* Subtitle/Date label below title */}
                  <text
                    x={pos.x + (pos.x > 450 ? 22 : -22)}
                    y={pos.y + 18}
                    textAnchor={pos.x > 450 ? "start" : "end"}
                    className="fill-white/40 text-[9px] font-mono"
                  >
                    {'date' in node ? node.date : ('subtitle' in node ? (node as typeof creativeNodes[0]).subtitle : '')}
                  </text>
                </motion.g>
              );
            })}

            {/* Small decorative nodes */}
            {[
              { x: 320, y: 180 },
              { x: 580, y: 200 },
              { x: 200, y: 400 },
              { x: 700, y: 380 },
              { x: 400, y: 380 },
              { x: 520, y: 140 },
            ].map((pos, i) => (
              <motion.circle
                key={`dot-${i}`}
                cx={pos.x}
                cy={pos.y}
                r={3}
                fill={isEngineer ? "rgba(255, 255, 255, 0.2)" : "rgba(168, 85, 247, 0.3)"}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.05 }}
              />
            ))}
          </svg>
        </div>

        {/* Bottom Text - Changes based on persona */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-foreground/50 max-w-xl mx-auto">
            {isEngineer 
              ? "Explore my thoughts on AI, security, and technology through interconnected insights."
              : "Discover my creative toolkit and how projects connect through shared techniques and inspiration."
            }
          </p>
        </motion.div>

      </div>
    </section>
  );
};
