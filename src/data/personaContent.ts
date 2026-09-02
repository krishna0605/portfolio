export const siteAssets = {
  resumeHref: "/Krishna-Kapoor-CV.pdf",
  internshipCertificateHref: "/Maincrafts-Internship-Certificate.pdf",
} as const;

export interface Project {
  id: string;
  title: string;
  description: string;
  tag: string;
  techStack: string[];
  featured?: boolean;
  githubUrl?: string;
  projectUrl?: string;
  projectLabel?: string;
  demoUrl?: string;
  docsUrl?: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  status: string;
  summary: string;
  achievements: string[];
  technologies: string[];
  credentialUrl?: string;
}

export const engineerProjects: Project[] = [
  {
    id: "netra",
    title: "NETRA",
    description:
      "A case-oriented network forensics platform that turns authorized PCAP and PCAPNG captures into preserved evidence, explainable security signals, custody history, and investigator-ready reports.",
    tag: "Network Forensics",
    techStack: ["Python", "Django", "React", "TypeScript", "PostgreSQL"],
    githubUrl: "https://github.com/krishna0605/Netra",
    demoUrl: "https://netra-hackathon-console-20260714.vercel.app/",
    featured: true,
  },
  {
    id: "nextstop-ai",
    title: "NextStop.ai",
    description:
      "A final-year AI meeting intelligence system that transforms recordings and transcripts into summaries, decisions, action items, and reviewable outputs through secure background workflows and observable services.",
    tag: "AI + Systems",
    techStack: ["Next.js", "Fastify", "TypeScript", "Redis", "Supabase"],
    githubUrl: "https://github.com/krishna0605/NextStop.AI-Web",
    demoUrl: "https://next-stop-ai-web.vercel.app/",
    featured: true,
  },
  {
    id: "ai-codemate",
    title: "AI CodeMate (WIP)",
    description:
      "Designed a user-friendly interface for repository management, enabling real-time website repository previews with interactive editing. Built an AI-powered assistant to provide code snippets, version history, and optimization suggestions via RAG.",
    tag: "AI Engineering",
    techStack: ["React.js", "Next.js", "TypeScript", "PostgreSQL", "TailwindCSS"],
    githubUrl: "https://github.com/krishna0605",
    demoUrl: "https://ai-codemate-nine.vercel.app/",
  },
  {
    id: "vulnscanner",
    title: "VulnScanner",
    description:
      "Built an enterprise-grade AI-powered URL threat intelligence and vulnerability analysis platform with deep crawling, live scan progress, MFA, scheduled scans, and actionable remediation guidance.",
    tag: "AI + Cybersecurity",
    techStack: ["Next.js", "Fastify", "TypeScript", "Supabase", "Playwright"],
    githubUrl: "https://github.com/krishna0605/vulnscanner",
    demoUrl: "https://vulnscanner.tech/",
    docsUrl: "https://vulnscanner.notion.site/",
  },
  {
    id: "threatforge",
    title: "ThreatForge",
    description:
      "Built an AI-powered threat detection platform for SOC teams to identify malware, steganography, and network anomalies with ML classifiers, YARA rules, reporting, and full observability.",
    tag: "AI + Security",
    techStack: ["Next.js", "Python", "Flask", "Supabase", "Scikit-learn", "Docker"],
    githubUrl: "https://github.com/krishna0605/ThreatForge",
    demoUrl: "https://threat-forge.vercel.app/",
    docsUrl:
      "https://threatforge.notion.site/project_documentation-307c54ff4fff80f1aadbd83065554434?source=copy_link",
  },
  {
    id: "gaia-agent",
    title: "GAIA Benchmark AI Agent",
    description:
      "Built an AI agent for GAIA benchmark evaluations using Python and Gradio, with API handling, question answering, result submission, robust error management, and fallback mechanisms.",
    tag: "AI Agent",
    techStack: ["Python", "Gradio", "Hugging Face API", "Groq API"],
    projectUrl: "https://huggingface.co/spaces/krishna-cc/final_project",
    projectLabel: "Open Space",
  },
  {
    id: "health-doc",
    title: "HealthDoc Query Assistant",
    description:
      "An AI-powered medical document analysis tool for retrieving, summarizing, and answering questions from health records using RAG and language models.",
    tag: "AI + Healthcare",
    techStack: ["Python", "LangChain", "OpenAI", "Streamlit", "Vector DB"],
    githubUrl: "https://github.com/krishna0605/medibot",
    demoUrl: "https://healthdocliv.app/",
    docsUrl:
      "https://healthdocliv.notion.site/PROJECT_DOCUMENTATION-2f5c54ff4fff80618cf9e61f78690a71",
  },
];

export const creativeProjects: Project[] = [
  {
    id: "ets2-trucks",
    title: "TATA Trucks Collection",
    description:
      "High-fidelity ETS2 truck mods featuring the TATA SIGNA 5530.S BSVI-4X2 and TATA PRIMA 5530.S BSVI 4X2, built with accurate modeling, custom textures, and optimized materials.",
    tag: "ETS2 Modding",
    techStack: ["Blender", "3ds Max", "Photoshop", "ETS2 SDK", "PBR Texturing"],
    projectUrl: "https://shopibs.in",
  },
  {
    id: "ibs-gaming",
    title: "IBS Gaming Collaboration",
    description:
      "Collaborated with IBS Gaming to create and publish professional ETS2 mods, contributing to asset development, quality assurance, and community engagement.",
    tag: "3D & Collaboration",
    techStack: ["Blender", "ETS2 SDK", "Substance Painter", "Community Management"],
    projectUrl: "https://shopibs.in",
  },
  {
    id: "brand-liveries",
    title: "Brand Advertising Liveries",
    description:
      "Created high-resolution advertising liveries for gaming brands including Logitech, Booyah, and Loco, optimized for in-game visibility and promotional campaigns.",
    tag: "Design & Branding",
    techStack: ["Photoshop", "Illustrator", "UV Mapping", "Brand Guidelines"],
    projectUrl: "#projects",
    projectLabel: "View Collection",
  },
];

export const workExperience: WorkExperience = {
  company: "Maincrafts Technology",
  role: "Cloud Computing & DevOps Intern",
  period: "February 2026 - August 2026",
  status: "Completed six-month internship",
  summary:
    "Supported production-minded cloud and deployment work while building practical experience across infrastructure, delivery pipelines, monitoring, and security.",
  achievements: [
    "Worked across AWS, Azure, GCP, Docker, Kubernetes, and Linux-based deployment environments.",
    "Contributed to environment configuration, CI/CD, build and release validation, server deployment, monitoring, and technical documentation.",
    "Developed practical awareness of access controls, credential safety, configuration risk, observability, and infrastructure security.",
  ],
  technologies: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Linux", "CI/CD", "Monitoring"],
  credentialUrl: siteAssets.internshipCertificateHref,
};

export const heroContent = {
  engineer: {
    badge: "System Online",
    title: "Engineering secure, intelligent systems",
    subtitle:
      "I build AI-enabled products, cloud platforms, and security systems with production-ready architecture, observability, and reliable delivery in mind.",
    cta1: { label: "View Projects", href: "#projects" },
    cta2: { label: "Download Resume", href: siteAssets.resumeHref },
    typingTexts: ["deploy_pipeline()", "vulnerability_scan()", "ai_inference()"],
  },
  creative: {
    badge: "Creative Mode",
    title: "Crafting immersive visuals & 3D experiences",
    subtitle:
      "I create detailed simulation assets and visual experiences that balance realism, performance, and a clear creative point of view.",
    cta1: { label: "View Portfolio", href: "#projects" },
    cta2: { label: "Collaborate", href: "#contact" },
    typingTexts: ["render_scene()", "texture_paint()", "lighting_setup()"],
  },
};

export const skills = {
  engineer: {
    title: "Engineering",
    categories: [
      { name: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL"] },
      { name: "Frameworks", items: ["Next.js", "React", "FastAPI", "Node.js"] },
      { name: "AI/ML", items: ["LangChain", "TensorFlow", "Scikit-learn", "RAG"] },
      { name: "Security", items: ["Vulnerability Scanning", "Web App Security", "Threat Detection", "Network Security"] },
    ],
  },
  creative: {
    title: "Creative",
    categories: [
      { name: "3D Software", items: ["Blender", "3ds Max", "ZBrush", "Substance Painter"] },
      { name: "Design", items: ["Photoshop", "Illustrator", "Figma", "After Effects"] },
      { name: "Simulation", items: ["ETS2 SDK", "Unity", "Unreal Engine"] },
      { name: "Techniques", items: ["PBR Texturing", "HDRI Lighting", "Compositing", "Motion Graphics"] },
    ],
  },
};

export const aboutContent = {
  engineer: {
    title: "Krishna Kapoor",
    role: "Software Systems, Cloud & Security Engineer",
    headline: "Building systems that stay secure, observable, and understandable.",
    bio: "I work across software architecture, applied AI, cloud delivery, and cybersecurity. My projects turn complex workflows into practical products with explicit attention to reliability, access control, and real-world operation.",
    strengths: ["AI-enabled product architecture", "Cloud, DevOps & observability", "Application and network security"],
    closing: "I care about engineering that remains trustworthy after the demo is over.",
  },
  creative: {
    title: "Krishna Kapoor",
    role: "3D Artist & Creative Technologist",
    headline: "Turning technical detail into expressive visual experiences.",
    bio: "I create simulation assets, 3D models, and visual systems that balance realism with performance. My creative work combines structured production workflows with a strong eye for material, lighting, and brand detail.",
    strengths: ["3D modeling & simulation assets", "PBR texturing & visual design", "Creative collaboration & optimization"],
    closing: "The goal is always purposeful work that looks convincing and feels considered.",
  },
};
