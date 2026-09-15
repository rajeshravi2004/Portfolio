export const siteConfig = {
  availability: "Available for new opportunities",
  experience: "1+ year building real products",
  email: "ravirajesh988@gmail.com",
  phone: "+91 88837 61709",
  phoneHref: "tel:+918883761709",
  github: "https://github.com/rajeshravi2004",
  linkedin: "https://www.linkedin.com/in/rajesh-ravi-22684130b/",
  carescribe: "https://carescribe.health",
} as const;

export const education = [
  { title: "BE in Information Technology", institution: "Annamalai University", period: "2021–2025", score: "OGPA: 8.73" },
  { title: "Higher Secondary Education", institution: "DVC Hr Sec School", period: "2020–2021", score: "89.9%" },
  { title: "Matriculation", institution: "DVC Hr Sec School", period: "2018–2019", score: "92.0%" },
] as const;

export const certifications = [
  { title: "DCA (Diploma in Computer Application)", year: "2021", detail: "MS Word, Excel, Tally ERP9, and PowerPoint", tools: ["MS Word", "Excel", "Tally ERP9", "PowerPoint"] },
  { title: "Typewriting English Junior", year: "2019", detail: "First class certification", tools: [] },
] as const;

export const roles = [
  {
    title: "Junior Full Stack Developer",
    company: "Mittai Healthcare Private Limited",
    logo: "/company-logos/mittai.png",
    website: "https://carescribe.health",
    period: "Jul 2025–Present",
    location: "Chennai, India",
    description: "Built CareScribe, a full-stack medical transcription platform that converts doctor-patient conversations into OPD sheets. Implemented PostgreSQL, Express, Node.js, React, WebSockets, Cloud Storage, and Pub/Sub architecture.",
    stack: ["PostgreSQL", "Express.js", "Node.js", "React", "WebSockets", "Cloud Storage", "Pub/Sub"],
  },
  {
    title: "Fullstack Intern Developer",
    company: "Mittai Healthcare Private Limited",
    logo: "/company-logos/mittai.png",
    website: "https://carescribe.health",
    period: "Mar 2025–Jun 2025",
    location: "Chennai, India",
    description: "Developed healthcare workflows for doctors, including OPD, IPD, and discharge summary generation. Integrated LLM-driven responses and worked across React, Node.js, Python, PostgreSQL, Google Cloud, Docker, Kubernetes, Pub/Sub, and WebSockets.",
    stack: ["React", "Node.js", "Python", "PostgreSQL", "Google Cloud Platform", "Docker", "Kubernetes", "Pub/Sub", "WebSockets"],
  },
  {
    title: "AI/ML Internship Scholar",
    company: "AIIRF-EDII",
    logo: "/company-logos/aiirf.png",
    website: "https://aiirf.com",
    period: "Jun 2024–Jul 2024",
    location: "Chidambaram",
    description: "Learned clustering, regression, deep learning techniques, and practical AI/ML tooling through hands-on model and data processing work.",
    stack: ["AI / ML", "Deep Learning", "Data Processing"],
  },
  {
    title: "UI/UX Internship Scholar",
    company: "AIIRF-EDII",
    logo: "/company-logos/aiirf.png",
    website: "https://aiirf.com",
    period: "Jun 2023–Jul 2023",
    location: "Chidambaram",
    description: "Worked with app landing templates, project structure, and UI/UX fundamentals for clearer interface design and user flows.",
    stack: ["UI / UX", "Responsive Design"],
  },
] as const;

export const techGroups = [
  { name: "Frontend & State", items: ["React", "Next.js", "Vanilla JavaScript", "JavaScript", "TypeScript", "HTML5", "CSS3", "SCSS", "Stylesheets", "Bootstrap", "Tailwind CSS", "Redux", "Responsive Design", "Electron", "XML"] },
  { name: "Backend & Real-time", items: ["Node.js", "NestJS", "Express.js", "Python", "FastAPI", "Flask", "Django", "REST APIs", "HTTP / HTTPS", "AIOHTTP", "WebSockets"] },
  { name: "Data & Caching", items: ["PostgreSQL", "MySQL", "Qdrant", "MongoDB", "MariaDB", "Redis", "FAISS"] },
  { name: "Automation & Scraping", items: ["Playwright", "Selenium", "Puppeteer", "Beautiful Soup", "Web Scraping", "Automation Testing", "PDF Generation"] },
  { name: "Cloud & Infrastructure", items: ["Google Cloud Platform", "Google Cloud Storage", "Google Cloud API Gateway", "Pub/Sub", "AWS", "Amazon S3", "Docker", "Kubernetes", "API Security"] },
  { name: "AI & Retrieval", items: ["Vertex AI", "LLM Integration", "Prompt Engineering", "RAG", "LangChain", "Google Gemini AI", "Chat APIs"] },
  { name: "Browser Platform", items: ["IndexedDB", "Cookies", "Local Storage", "Session Storage", "Private State Tokens", "Back/Forward Cache", "Background Fetch", "Notifications API", "Payment Handler"] },
  { name: "Languages, Payments & Web3", items: ["C", "Python", "C++", "Java", "C#", "R", "Stripe", "Razorpay", "Invoice Ninja", "Blockchain Tools", "Web3"] },
  { name: "Documentation & Tools", items: ["Swagger Documentation", "OpenAPI", "Postman", "Git", "GitHub", "VS Code", "JSON"] },
] as const;

export const skills = [
  { name: "Frontend Development", items: [["React", 90], ["JavaScript", 85], ["HTML5", 95], ["CSS3", 90], ["Tailwind CSS", 85]] },
  { name: "Backend Development", items: [["Node.js", 85], ["Express.js", 80], ["Python", 90], ["Django", 75], ["Flask", 80]] },
  // Source content is PostgreSQL-heavy, but this supplied group lists MySQL/MongoDB/Oracle. Confirm before changing it.
  { name: "Database & Cloud", items: [["MySQL", 85], ["MongoDB", 80], ["Oracle", 75], ["REST APIs", 85]] },
  { name: "Automation & Tools", items: [["Selenium", 80], ["Playwright", 85], ["Web Scraping", 90], ["Puppeteer", 75], ["Git", 85]] },
] satisfies ReadonlyArray<{ name: string; items: ReadonlyArray<readonly [string, number]> }>;

export type Project = {
  number: string;
  title: string;
  type: string;
  description: string;
  features: readonly string[];
  stack: readonly string[];
  github?: string;
  demo?: string;
  downloads?: readonly { label: string; href: string }[];
  visual: "assistant" | "resume" | "music" | "pilot" | "stocks" | "browser" | "shop";
};

export const projects: readonly Project[] = [
  {
    number: "01",
    title: "Resume Studio",
    type: "Career productivity suite",
    description: "An AI-assisted resume workspace with reusable profiles, tailored resume versions, live previews, and flexible templates for individuals, career coaches, and teams.",
    features: ["ATS analysis and job-description matching", "AI writing and LinkedIn profile import", "PDF, DOCX, HTML, and JSON exports"],
    stack: ["React", "Node.js", "Express.js", "Supabase", "OpenAI", "Puppeteer"],
    github: "https://github.com/rajeshravi2004/Resume-Builder",
    demo: "https://resume-builder-seven-sandy.vercel.app",
    visual: "resume",
  },
  {
    number: "02",
    title: "Rajify",
    type: "Music discovery platform",
    description: "A music discovery experience across web, Windows, and native Flutter Android apps, with YouTube-powered playback, personal libraries, and synced listening preferences.",
    features: ["Playlists, favorites, history, and queue controls", "Google sign-in and cross-device preference sync", "Windows installer and Android APK downloads"],
    stack: ["React 19", "Electron", "Flutter", "Dart", "YouTube API", "Supabase"],
    github: "https://github.com/rajeshravi2004/RajAudios",
    demo: "https://rajaudios.vercel.app",
    downloads: [
      { label: "Windows EXE", href: "https://github.com/rajeshravi2004/RajAudios/releases/download/v1.1.0-downloads-preview/rajify-windows-setup.exe" },
      { label: "Android APK", href: "https://github.com/rajeshravi2004/RajAudios/releases/download/v1.1.0-downloads-preview/rajify-android.apk" },
    ],
    visual: "music",
  },
  {
    number: "03",
    title: "Rajesh OS",
    type: "AI knowledge workspace",
    description: "A multi-tenant workspace for creating document-grounded AI agents with recoverable file ingestion, hybrid retrieval, source citations, and versioned prompts.",
    features: ["Document studio and industry instruction packs", "Private knowledge sources with cited answers", "Publish agents as REST APIs and MCP tools"],
    stack: ["React 19", "TypeScript", "FastAPI", "Gemini AI", "Supabase", "PostgreSQL", "pgvector"],
    github: "https://github.com/rajeshravi2004/rajesh-chatbot",
    demo: "https://learnllm.vercel.app",
    visual: "assistant",
  },
  {
    number: "04",
    title: "Job Apply Pilot",
    type: "Job application workspace",
    description: "A private workspace for managing job searches and applications across LinkedIn and Naukri, with a connected browser, reusable recruiter answers, and scheduled runs.",
    features: ["Application tracking, review requests, and CSV export", "Profile editor and private resume uploads", "Scheduled searches with daily limits and stop controls"],
    stack: ["React 19", "TypeScript", "Node.js", "Supabase", "Playwright"],
    demo: "https://job-apply-copilot-dun.vercel.app",
    visual: "pilot",
  },
  {
    number: "05",
    title: "StockScope",
    type: "Equity research dashboard",
    description: "A stock-research app for Indian and US equities with adjusted-history charts, forecast intervals, watchlists, and live quote monitoring.",
    features: ["Compare stocks and explore investment scenarios", "Walk-forward validation and historical risk analysis", "CSV import/export and live quote streams"],
    stack: ["React 19", "Node.js", "Vite", "Server-Sent Events", "Playwright", "Docker"],
    github: "https://github.com/rajeshravi2004/stockscope",
    demo: "https://stockscope-production.vercel.app",
    visual: "stocks",
  },
  {
    number: "06",
    title: "Browser Lab",
    type: "Browser APIs and DevTools",
    description: "A hands-on browser learning workspace with 57 runnable experiments, editable JavaScript, animated explanations, and guided Chrome DevTools exercises.",
    features: ["Learning paths, bookmarks, and progress tracking", "Networking, storage, workers, and media experiments", "Real CORS, streaming, SSE, and WebSocket endpoints"],
    stack: ["React 19", "Vite", "Node.js", "Web APIs", "WebSockets", "Playwright"],
    github: "https://github.com/rajeshravi2004/browser-lab",
    demo: "https://browser-lab-mu.vercel.app",
    visual: "browser",
  },
  {
    number: "07",
    title: "ZoroShop",
    type: "AI-powered e-commerce",
    description: "An e-commerce platform combining product discovery, shopping carts, order history, and Stripe checkout with a voice-enabled Gemini shopping assistant.",
    features: ["Product catalog, category filters, and cart management", "Site-aware AI answers and semantic search", "Voice input and spoken assistant responses"],
    stack: ["Django", "Python", "Gemini AI", "FAISS", "Stripe", "Tailwind CSS"],
    github: "https://github.com/rajeshravi2004/zoroshop",
    visual: "shop",
  },
] as const;
