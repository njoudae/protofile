export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  statement: string;
  problem: string;
  approach: string;
  value: string;
  tools: string[];
  visual: "workflow" | "document" | "chat" | "analytics" | "forecast";
  detail?: string;
};

export const identity = {
  name: "Nejood A. Bin Eshaq",
  role: "AI Engineer & Researcher",
  headline: "AI engineering, research, automation & analytics",
  summary: "I translate complex business needs into intelligent, evaluated products—from understanding business needs and analyzing requirements to collecting data, building data pipelines and automated workflows, and developing solutions that deliver measurable value.",
  location: "Saudi Arabia",
  email: "njoodeshaq@gmail.com",
  linkedin: "https://www.linkedin.com/in/nejood-a-eshaq-26a47b208/",
  github: "https://github.com/njoudae",
};

export const projects: Project[] = [
  {
    slug: "ai-purchasing-agent", number: "01", title: "AI Purchasing Agent", category: "Agentic automation",
    statement: "An intelligent procurement system orchestrating the purchasing lifecycle from email request to vendor decision.",
    problem: "Purchasing requests, RFQs, quotations, and approvals required fragmented manual handling.",
    approach: "Structured data extraction, automated RFQ distribution, quotation comparison, approval routing, spreadsheet tracking, audit logging, and weekly reporting.",
    value: "Creates a traceable decision workflow and reduces repetitive procurement processing.",
    tools: ["AI agents", "Workflow automation", "APIs", "Data pipelines"], visual: "workflow",
  },
  {
    slug: "musir", number: "02", title: "Musir", category: "Computer vision · 1st place, Aseer Hackathon",
    statement: "A mobile document-verification system for truck drivers using computer vision and OCR.",
    problem: "Identity and document checks depended on slow, manual verification.",
    approach: "Designed an AI verification flow that extracts and validates document information in a deployed mobile experience.",
    value: "Streamlines identity validation and reduces manual verification steps.",
    tools: ["Computer vision", "OCR", "Mobile application", "AI deployment"], visual: "document",
  },
  {
    slug: "lawyer-ai-assistant", number: "03", title: "Lawyer AI Assistant", category: "RAG · HR Hackathon",
    statement: "A context-aware legal assistant built over structured Saudi law data.",
    problem: "Legal information needed to be searchable and usable for nuanced questions and contract review.",
    approach: "Built a retrieval-augmented generation workflow supporting legal Q&A, contract analysis, and contextual reasoning in a web chat interface.",
    value: "Connects structured legal sources to a focused conversational research experience.",
    tools: ["RAG", "LLMs", "NLP", "Web interface"], visual: "chat",
  },
  {
    slug: "review-analysis", number: "04", title: "Review Intelligence", category: "Analytics automation",
    statement: "An autonomous pipeline that turns Google Maps reviews into structured insight.",
    problem: "Large volumes of unstructured customer feedback are time-consuming to collect and interpret.",
    approach: "Automated review scraping, analysis, and LLM-assisted insight generation.",
    value: "Transforms raw feedback into decision-ready themes and signals.",
    tools: ["Web scraping", "LLMs", "Data pipelines", "Analytics"], visual: "analytics",
  },
  {
    slug: "solar-power-forecasting", number: "05", title: "Solar Power Forecasting", category: "Predictive AI",
    statement: "Predictive models for solar power forecasting using real-world datasets.",
    problem: "Solar generation planning depends on understanding variable real-world conditions.",
    approach: "Prepared data, engineered features, trained predictive models, and evaluated forecast performance.",
    value: "Applies machine learning to a practical forecasting and decision-support problem.",
    tools: ["Python", "Machine learning", "Feature engineering", "Model evaluation"], visual: "forecast",
  },
];

export const expertise = [
  { id: "engineering", number: "01", title: "AI Engineering", statement: "Build deployable intelligent systems around real operational needs.", capabilities: ["LLM applications", "Predictive models", "End-to-end AI pipelines"], tools: ["Python", "FastAPI", "Programming", "LangChain", "Docker"], evidence: ["Lawyer AI Assistant", "Solar Power Forecasting", "Musir"] },
  { id: "research", number: "02", title: "AI Research", statement: "Investigate language and learning systems through rigorous experimentation and evaluation.", capabilities: ["Experimental design", "NLP research", "Model evaluation", "Academic writing"], tools: ["Python", "Deep learning", "LLMs", "Representation learning"], evidence: ["MindLLM at AraHealthQA 2025", "M.S. thesis: Arabic sarcasm detection"] },
  { id: "automation", number: "03", title: "Automation", statement: "Turn multi-step business processes into traceable, agent-assisted workflows.", capabilities: ["Agentic workflows", "Process orchestration", "API integration", "Automated reporting"], tools: ["n8n", "Power Automate", "LangGraph", "APIs", "Codex"], evidence: ["AI Purchasing Agent", "Review Intelligence"] },
  { id: "analytics", number: "04", title: "Data Analytics", statement: "Create the data foundation and reporting layer behind better decisions.", capabilities: ["Data cleaning", "Feature engineering", "KPI analysis", "Dashboard development"], tools: ["SQL", "Python", "Power BI", "Web scraping"], evidence: ["Review Intelligence", "Solar Power Forecasting", "Procurement reporting"] },
  { id: "business", number: "05", title: "Business Analysis", statement: "Frame the right problem before choosing the technology that solves it.", capabilities: ["Requirements analysis", "Process mapping", "Decision support", "Digital transformation"], tools: ["Stakeholder discovery", "Workflow design", "KPI reporting", "Solution mapping"], evidence: ["Freelance client systems", "AI Purchasing Agent", "Digital transformation training"] },
];

export const credentials = [
  { label: "Graduate study", value: "M.S. Computer Science (AI)", detail: "King Khalid University · 2024-2026" },
  { label: "Academic distinction", value: "B.S. Computer Science", detail: "GPA 4.95 / 5.00 · 2019-2023" },
  { label: "Professional signal", value: "Certified Analytics Professional", detail: "60-hour training program" },
  { label: "Language", value: "Arabic · English", detail: "Native · Professional (IELTS 6.0)" },
];

export const technologyGroups = [
  { label: "AI Engineering", items: ["RAG", "OCR", "LLMs", "Machine Learning", "Deep Learning", "Prompt Engineering", "Vibe Coding"] },
  { label: "Development", items: ["Python", "FastAPI", "Docker", "Git"] },
  { label: "Automation", items: ["LangChain", "LangGraph", "n8n", "Power Automate", "API Integration"] },
  { label: "Data", items: ["SQL", "Power BI", "Excel", "Dashboard", "Data Pipelines", "Web Scraping", "Feature Engineering", "Statistics"] },
  { label: "Research", items: ["Research Skills", "LaTeX", "NLP", "Classification", "Text Data Representation", "Contextual Embedding"] },
  { label: "Business Analysis", items: ["Requirements Analysis", "Business Analysis", "Jira"] },
];

export const certifications = ["Machine Learning Specialization · Stanford University", "Deep Learning Specialization · DeepLearning.AI", "Data Analysis Using Excel", "AI Foundations Associate", "Generative AI", "PCEP · Certified in Python Programming", "SQL for Data Analysis · Udacity"];

export const experience = [
  {
    role: "AI & Automation Engineer",
    organization: "Freelance",
    date: "April 2026 - Present",
    duties: [
      "Analyze client requirements and translate business needs into end-to-end AI and automation systems.",
      "Engineer predictive models, web scraping pipelines, and LLM-based agents for real-world applications.",
      "Develop scalable data pipelines and automated workflows for processing, insight generation, and decision support.",
    ],
  },
  {
    role: "Artificial Intelligence Engineer",
    organization: "Deanship of Electronic Services, King Khalid University",
    date: "September 2025 - March 2026",
    duties: [
      "Built and deployed predictive models for solar power forecasting using real-world datasets.",
      "Designed data pipelines, web scraping systems, and agentic AI workflows integrating LLMs.",
      "Delivered training programs on research and digital transformation.",
    ],
  },
  {
    role: "Trainer - GAT Preparation",
    organization: "Shaguf Platform",
    date: "June 2023 - June 2024",
    duties: [
      "Delivered structured training sessions for graduate aptitude test preparation.",
      "Achieved 100% participant satisfaction with consistent high-performance outcomes of 85+ scores.",
    ],
  },
  {
    role: "Administrative Assistant",
    organization: "Public Secondary School",
    date: "October 2023 - June 2024",
    duties: [
      "Managed educational systems, official correspondence, and administrative operations.",
      "Improved workflow efficiency through digital tools and structured data handling.",
    ],
  },
];

export const careerTracks = [
  {
    title: "AI Engineer",
    summary: "Build intelligent applications from data preparation through deployment.",
    skills: ["Machine Learning", "Deep Learning", "LLMs", "FastAPI", "Programming", "Docker"],
  },
  {
    title: "Business Analysis",
    summary: "Translate operational needs into clear requirements, workflows, and technology decisions.",
    skills: ["Requirements Analysis", "Process Mapping", "KPI Design", "Decision Support", "Digital Transformation"],
  },
  {
    title: "AI Research",
    summary: "Study language and learning systems through experimentation and rigorous evaluation.",
    skills: ["NLP", "Representation Learning", "Experimental Design", "Model Evaluation", "Academic Writing"],
  },
  {
    title: "Automation",
    summary: "Connect tools, agents, and data into traceable end-to-end workflows.",
    skills: ["Agentic AI", "LangGraph", "n8n", "Power Automate", "API Integration", "Web Scraping"],
  },
];

export const achievements = [
  {
    title: "Musir",
    award: "1st Place",
    event: "Aseer Tabtaker Hackathon",
    year: "2025",
    description: "An AI-powered document verification solution using computer vision and OCR.",
    image: "/achievement-musir.jpg",
    imagePosition: "center 42%",
  },
  {
    title: "NutriTargetAI",
    award: "1st Place",
    event: "Healthon - Digital Health Innovation Hackathon",
    year: "2025",
    description: "A healthcare big-data and AI project selected from more than 400 ideas.",
    image: "/achievement-nutritargetai.jpg",
    imagePosition: "center 70%",
  },
  {
    title: "Yaqadha",
    award: "2nd Place",
    event: "La Aseer Challenge Hackathon",
    year: "2025",
    description: "An AI-supported application for analyzing children's drawings and identifying psychological indicators.",
    image: "/achievement-yaqadha.png",
    imagePosition: "center 36%",
  },
];
