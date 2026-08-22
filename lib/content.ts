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
    period: "Jul 2025–Present",
    location: "Chennai, India",
    description: "Built CareScribe, a full-stack medical transcription platform that converts doctor-patient conversations into OPD sheets. Implemented PostgreSQL, Express, Node.js, React, WebSockets, Cloud Storage, and Pub/Sub architecture.",
    stack: ["PostgreSQL", "Express.js", "Node.js", "React", "WebSockets", "Cloud Storage", "Pub/Sub"],
  },
  {
    title: "Fullstack Intern Developer",
    company: "Mittai Healthcare Private Limited",
    period: "Mar 2025–Jun 2025",
    location: "Chennai, India",
    description: "Developed healthcare workflows for doctors, including OPD, IPD, and discharge summary generation. Integrated LLM-driven responses and worked across React, Node.js, Python, PostgreSQL, Google Cloud, Docker, Kubernetes, Pub/Sub, and WebSockets.",
    stack: ["React", "Node.js", "Python", "PostgreSQL", "Google Cloud Platform", "Docker", "Kubernetes", "Pub/Sub", "WebSockets"],
  },
  {
    title: "AI/ML Internship Scholar",
    company: "AIIRF-EDII",
    period: "Jun 2024–Jul 2024",
    location: "Chidambaram",
    description: "Learned clustering, regression, deep learning techniques, and practical AI/ML tooling through hands-on model and data processing work.",
    stack: ["AI / ML", "Deep Learning", "Data Processing"],
  },
  {
    title: "UI/UX Internship Scholar",
    company: "AIIRF-EDII",
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

export const projects = [
  {
    number: "01",
    title: "AI Assistant with Document Analysis",
    type: "AI / Knowledge system",
    description: "A dual-mode AI workspace for natural conversation and grounded document Q&A, with real-time indexing, authentication, and exportable sessions.",
    features: ["Semantic document search", "live indexing", "session-based chat"],
    stack: ["FastAPI", "Gemini AI", "React", "LangChain", "FAISS"],
    github: "https://github.com/rajeshravi2004/rajesh-chatbot",
    visual: "assistant",
  },
  {
    number: "02",
    title: "Resume Builder",
    type: "Productivity / SaaS",
    description: "A flexible resume studio with live previews, multiple templates, custom HTML support, structured data import, and production-ready exports.",
    features: ["Live template preview", "JSON import/export", "PDF and DOCX generation"],
    stack: ["React", "Node.js", "Puppeteer", "DOCX"],
    github: "https://github.com/rajeshravi2004/Resume-Builder",
    visual: "resume",
  },
  {
    number: "03",
    title: "Rajify Music Player",
    type: "Desktop / Entertainment",
    description: "A desktop listening experience inspired by modern streaming products, with discovery, playlists, queues, favorites, and persistent controls.",
    features: ["Smart discovery", "queue and playlist controls", "Windows desktop package"],
    stack: ["React 19", "Electron", "Vite", "YouTube API"],
    github: "https://github.com/rajeshravi2004/RajAudios",
    visual: "music",
  },
  {
    number: "04",
    title: "Zoro's Shop",
    type: "Commerce / Conversational AI",
    description: "An AI-powered commerce experience combining secure shopping flows with voice interaction, semantic search, and a site-aware Gemini assistant.",
    features: ["Voice-enabled assistant", "vector product search", "secure Stripe checkout"],
    stack: ["Django 5", "Gemini AI", "FAISS", "Stripe"],
    github: "https://github.com/rajeshravi2004/zoroshop",
    visual: "commerce",
  },
  {
    number: "05",
    title: "College Blockchain Project",
    type: "Academic / Blockchain",
    description: "An academic implementation built during college to explore blockchain architecture, decentralized records, transaction validation, and tamper-aware data handling.",
    features: ["Linked ledger records", "transaction validation flow", "academic blockchain implementation"],
    stack: ["Blockchain Tools", "Web3", "JavaScript"],
    github: null,
    visual: "blockchain",
  },
] as const;
