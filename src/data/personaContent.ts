// Engineer Mode Projects - AI, Security, Full-Stack
export const engineerProjects = [
  {
    id: "ai-codemate",
    title: "AI CodeMate (WIP)",
    description: "Designed a user-friendly interface for repository management, enabling real-time website repository previews with interactive editing. Built an AI-powered assistant to provide code snippets, version history, and optimization suggestions via RAG.",
    tag: "AI Engineering",
    techStack: ["React.js", "Next.js", "TypeScript", "PostgreSQL", "TailwindCSS"],
    link: "https://github.com/krishna0605",
    demoLink: "https://ai-codemate-nine.vercel.app/",
    image: "/projects/ai-codemate.png",
  },
  {
    id: "vulnscanner",
    title: "VulnScanner",
    description: "Built an enterprise-grade AI-powered URL threat intelligence & vulnerability analysis platform. Features deep web crawling with Playwright, real-time scan progress via WebSockets, MFA authentication, scheduled scans, and an executive security dashboard with actionable remediation guidance.",
    tag: "AI + Cybersecurity",
    techStack: ["Next.js", "Fastify", "TypeScript", "Supabase", "Playwright"],
    link: "https://github.com/krishna0605/vulnscanner",
    demoLink: "https://vulnscanner.tech/",
    notionLink: "https://healthdocliv.notion.site/VulnScanner-Complete-Project-Documentation-300c54ff4fff80d8b62ae4bb49631173?source=copy_link",
    image: "/projects/vulnscanner.png",
  },
  {
    id: "gaia-agent",
    title: "GAIA Benchmark AI Agent",
    description: "Built an AI agent for GAIA benchmark evaluations using Python and Gradio. Integrated API handling, question answering, and result submission with robust error management and fallback mechanisms.",
    tag: "AI Agent",
    techStack: ["Python", "Gradio", "Hugging Face API", "Groq API"],
    link: "https://huggingface.co/spaces/krishna-cc/final_project",
    image: "/projects/gaia-agent.png",
  },
  {
    id: "health-doc",
    title: "HealthDoc Query Assistant",
    description: "AI-powered medical document analysis tool capable of retrieving, summarizing, and answering queries from health records using RAG and LLMs. Optimized for accuracy in medical data processing.",
    tag: "AI + Healthcare",
    techStack: ["Python", "LangChain", "OpenAI", "Streamlit", "Vector DB"],
    link: "https://github.com/krishna0605/medibot",
    demoLink: "https://healthdocliv.app/",
    notionLink: "https://healthdocliv.notion.site/PROJECT_DOCUMENTATION-2f5c54ff4fff80618cf9e61f78690a71",
    image: "/projects/medibot.png",
  },
];

// Creative Mode Projects - 3D, ETS2, Design
export const creativeProjects = [
  {
    id: "ets2-trucks",
    title: "TATA Trucks Collection",
    description: "High-fidelity ETS2 truck mods featuring the TATA SIGNA 5530.S BSVI-4X2 and TATA PRIMA 5530.S BSVI 4X2. Built with accurate 3D modeling, custom textures, realistic materials, and optimized performance for immersive Indian trucking simulation.",
    tag: "ETS2 Modding",
    techStack: ["Blender", "3ds Max", "Photoshop", "ETS2 SDK", "PBR Texturing"],
    link: "https://shopibs.in",
    image: "/projects/tata-trucks.png",
  },
  {
    id: "ibs-gaming",
    title: "IBS Gaming Collaboration",
    description: "Collaborated with IBS Gaming (shopibs.in) to create and publish professional ETS2 mods for the Indian gaming community. Contributed to mod development, quality assurance, and community engagement for realistic simulation assets.",
    tag: "3D & Collaboration",
    techStack: ["Blender", "ETS2 SDK", "Substance Painter", "Community Management"],
    link: "https://shopibs.in",
    image: "/projects/ibs-gaming.png",
  },
  {
    id: "brand-liveries",
    title: "Brand Advertising Liveries",
    description: "Created custom advertising liveries for major gaming brands including Logitech, Booyah, and Loco. Designed high-resolution truck skins featuring brand identities, optimized for in-game visibility and promotional campaigns in ETS2.",
    tag: "Design & Branding",
    techStack: ["Photoshop", "Illustrator", "UV Mapping", "Brand Guidelines"],
    link: "#projects",
    image: "/projects/brand-liveries.png",
  },
];


// Hero content per persona
export const heroContent = {
  engineer: {
    badge: "System Online",
    title: "Building intelligent systems & secure platforms",
    subtitle: "I create AI-powered applications, security tools, and full-stack platforms that solve real-world problems with elegant code.",
    cta1: { label: "View Projects", href: "#projects" },
    cta2: { label: "Download Resume", href: "/Krishna_Kapoor_Resume_2 .pdf" },
    typingTexts: ["function_calling()", "vulnerability_scan()", "ai_inference()"],
  },
  creative: {
    badge: "Creative Mode",
    title: "Crafting immersive visuals & 3D experiences",
    subtitle: "I design stunning 3D environments, simulation assets, and visual experiences that push the boundaries of digital creativity.",
    cta1: { label: "View Portfolio", href: "#projects" },
    cta2: { label: "Contact Me", href: "#contact" },
    typingTexts: ["render_scene()", "texture_paint()", "lighting_setup()"],
  },
};

// Skills per persona
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

// About content per persona
export const aboutContent = {
  engineer: {
    title: "Krishna Kapoor",
    role: "AI Engineer & Security Specialist",
    bio: "I am a software engineer with a strong focus on AI-driven systems, cybersecurity, and full-stack architecture. I enjoy working on problems that require thinking beyond features—considering system design, data flow, security, and performance from the start. My experience comes primarily from hands-on, project-based learning, where I have built real platforms involving AI integration, vulnerability scanning, and end-to-end application development. While my academic CGPA does not fully capture this depth, my work reflects a consistent focus on practical engineering, modern tooling, and production-oriented problem solving. I value clarity, reliability, and security, and I approach engineering as the discipline of building systems that can be trusted in real-world conditions.",
  },
  creative: {
    title: "Krishna Kapoor",
    role: "3D Artist & Visual Designer",
    bio: "I am a creative technologist with a strong background in 3D modeling, simulation design, and visual communication. I enjoy crafting digital experiences that balance realism, performance, and visual clarity, particularly in simulation and interactive environments. My work includes creating ETS2 mods, detailed 3D assets, and polished visual designs using Blender, Photoshop, and Illustrator. I approach design as a structured process—focused not only on aesthetics, but also on usability, optimization, and intent. I believe strong visuals are not decoration, but a way to communicate ideas clearly and make complex systems feel intuitive.",
  },
};
