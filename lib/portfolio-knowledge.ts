/**
 * The curated fact base behind the "Ask my portfolio" feature.
 *
 * Design constraints chosen deliberately:
 * - 100% static & client-side: no API keys, no cost, no latency, no PII.
 * - Zero hallucination by construction: the UI can only return these cards'
 *   exact text, never generate new sentences around an LLM.
 * - Facts stay consistent with the visible site copy by hand-syncing both
 *   from the same underlying claims.
 */
export type KnowledgeCard = {
  id: string;
  /** Shown as the answer heading. */
  title: string;
  /** High-signal match terms — worth 3 points per hit during retrieval. */
  keywords: string[];
  /** The verbatim answer core (1–3 sentences). */
  summary: string;
  /** Optional supporting sentence rendered under the summary. */
  detail?: string;
  /** Optional outbound links shown under the answer. */
  links?: { label: string; href: string }[];
};

export const KNOWLEDGE_CARDS: KnowledgeCard[] = [
  {
    id: "capabilities",
    title: "Capabilities at a glance",
    keywords: ["stack", "tech", "technology", "tools", "technologies", "skills", "experience"],
    summary:
      "Five capability groups: AI (OpenAI · Gemini · RAG · Agents · Prompt orchestration), Backend (Python · Flask · REST APIs · SQLite · SQLAlchemy · AsyncIO), Automation (Telegram Bots · Python scripting · Scheduled jobs · File processing · API integrations), Frontend (HTML · CSS · JavaScript · Flutter · Dart), and Deployment (Wasmer · Vercel · Netlify · Render · Docker).",
  },
  {
    id: "aegis",
    title: "Aegis — Telegram Group Management Bot",
    keywords: [
      "aegis", "telegram", "bot", "bots", "moderation", "group", "management",
      "antispam", "flood", "business", "sqlalchemy", "asyncio", "python", "project",
    ],
    summary:
      "A production-grade Telegram group management bot and business automation system: async Python 3.11+ architecture using python-telegram-bot v21+ and SQLAlchemy 2.0 (aiosqlite & asyncpg). Features sliding-window anti-flood protection, anti-spam, auto-warns, and Telegram Business auto-replies.",
    detail:
      "Open-source under AGPL v3 with CI test workflows, Docker support, and a live web showcase deployed on Wasmer.",
    links: [
      { label: "View Aegis on GitHub ↗", href: "https://github.com/mrsehajofficial/aegis" },
      { label: "Live Showcase on Wasmer ↗", href: "https://aegis.wasmer.app/" },
    ],
  },
  {
    id: "ai-work",
    title: "AI & LLM work",
    keywords: [
      "ai", "llm", "llms", "gemini", "openai", "rag", "agents", "prompt",
      "projects", "built",
    ],
    summary:
      "Sehaj works with OpenAI and Gemini APIs, engineers prompts and system context for reliable LLM outputs, studies RAG (Retrieval-Augmented Generation) architectures, and is building conversational agents that connect LLMs to external APIs.",
    detail:
      "The applied example is Amai Yuki's LLM-assisted features plus the automation scripts and Telegram bots he writes.",
  },
  {
    id: "amai-yuki",
    title: "Amai Yuki — Real-Time Messaging App",
    keywords: [
      "amai", "yuki", "messaging", "chat", "chats", "app", "application",
      "flutter", "dart", "mobile", "project",
    ],
    summary:
      "A cross-platform real-time messaging application: Python/Flask backend with LLM technologies, direct and group chats, a custom in-app camera module, and Provider-based architecture. The Flutter frontend was developed with AI tooling and advanced prompt engineering.",
    detail:
      "The backend source stays private, but the app is fully functional — you can test it through the open-source frontend repository.",
    links: [
      { label: "View Amai Yuki on GitHub ↗", href: "https://github.com/mrsehajofficial/Amai-Yuki" },
    ],
  },
  {
    id: "backend",
    title: "Backend engineering",
    keywords: [
      "backend", "python", "flask", "rest", "api", "apis", "sqlite", "sqlalchemy", "asyncio",
      "database", "schema", "validation",
    ],
    summary:
      "Structured REST APIs in Flask and asynchronous Python engines with SQLAlchemy ORM on clean SQLite/PostgreSQL schemas — modular codebases, input validation, and documentation thorough enough that future collaborators can read them without asking questions.",
  },
  {
    id: "automation",
    title: "Automation work",
    keywords: [
      "automation", "automate", "scripts", "scripting", "telegram", "bot", "bots", "scheduled", "jobs",
      "cron", "file", "files", "processing", "workflow", "workflows",
      "integration",
    ],
    summary:
      "Sehaj builds Telegram bots like Aegis and Python automation scripts that turn repetitive workflows into repeatable processes: scheduled jobs, file pipelines, and API-to-API integrations.",
  },
  {
    id: "frontend",
    title: "Frontend skills",
    keywords: [
      "frontend", "html", "css", "javascript", "web", "ui", "responsive",
      "accessible", "flutter", "dart",
    ],
    summary:
      "Responsive, accessible interfaces with HTML/CSS/JavaScript, plus Flutter/Dart for mobile — shipped end-to-end in the Amai Yuki messaging app.",
  },
  {
    id: "deployment",
    title: "Deployment & hosting",
    keywords: [
      "deployment", "deploy", "hosting", "hosted", "vercel", "netlify",
      "render", "wasmer", "docker", "platforms", "cloud",
    ],
    summary:
      "Static sites, backend prototypes, and live Telegram bot showcases deployed across Wasmer, Vercel, Netlify, and Render — this very portfolio and Aegis are live on Wasmer.",
  },
  {
    id: "contact",
    title: "Contact & availability",
    keywords: [
      "contact", "email", "reach", "hire", "hiring", "freelance", "available",
      "availability", "work", "collab", "collaborate", "collaboration",
      "rate", "budget", "talk", "message",
    ],
    summary:
      "Email mr.sehaj.official@gmail.com or find him at github.com/mrsehajofficial. Based in India, open to remote work worldwide.",
    detail:
      "Currently available for: AI automation · Python backends · Telegram bots · API integration · freelance projects.",
    links: [
      { label: "mr.sehaj.official@gmail.com", href: "mailto:mr.sehaj.official@gmail.com" },
      { label: "github.com/mrsehajofficial ↗", href: "https://github.com/mrsehajofficial" },
    ],
  },
];

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "is", "are", "was", "were", "be",
  "been", "has", "have", "had", "do", "does", "did", "can", "could", "will",
  "would", "to", "of", "in", "on", "for", "with", "at", "by", "from", "up",
  "about", "into", "over", "after", "what", "whats", "which", "who", "whos",
  "how", "when", "where", "why", "his", "her", "him", "he", "she", "they",
  "them", "their", "you", "your", "it", "its", "this", "that", "these",
  "those", "tell", "me", "my", "any", "some", "there", "here", "using",
  "use", "get", "got",
]);

/** Everyday phrasing mapped onto the knowledge base's vocabulary. */
const SYNONYMS: Record<string, string[]> = {
  ai: ["llm", "gemini", "openai"],
  llm: ["ai"],
  gpt: ["openai"],
  bard: ["gemini"],
  bot: ["agents", "telegram", "aegis"],
  chatbot: ["agents", "messaging", "telegram", "aegis"],
  telegram: ["aegis", "bot", "moderation"],
  aegis: ["telegram", "bot"],
  chat: ["messaging"],
  chats: ["messaging"],
  messaging: ["chat"],
  hire: ["contact", "freelance"],
  hiring: ["contact", "freelance"],
  job: ["contact", "freelance"],
  jobs: ["scheduled"],
  email: ["contact"],
  github: ["contact"],
  rate: ["contact"],
  cost: ["contact"],
  price: ["contact"],
  flask: ["python", "backend"],
  python: ["automation", "backend"],
  api: ["integrations"],
  apis: ["integrations"],
  db: ["sqlite", "sqlalchemy"],
  sql: ["sqlite", "sqlalchemy"],
  database: ["sqlite", "sqlalchemy", "schema"],
  deploy: ["deployment"],
  hosting: ["deployment"],
  cloud: ["deployment"],
  site: ["deployment", "capabilities"],
  website: ["frontend", "deployment"],
  cv: ["contact", "capabilities"],
  resume: ["contact", "capabilities"],
  project: ["projects", "aegis", "amai"],
  projects: ["aegis", "amai"],
  apps: ["app"],
  script: ["scripts"],
};

function tokenize(query: string): string[] {
  const raw = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));

  const expanded = new Set<string>();
  for (const token of raw) {
    expanded.add(token);
    for (const syn of SYNONYMS[token] ?? []) expanded.add(syn);
  }
  return [...expanded];
}

function scoreCard(card: KnowledgeCard, tokens: string[]): number {
  const title = card.title.toLowerCase();
  const body = `${card.summary} ${card.detail ?? ""}`.toLowerCase();

  let score = 0;
  for (const token of tokens) {
    if (card.keywords.some((k) => k === token)) score += 3;
    else if (title.includes(token)) score += 4;
    else if (body.includes(token)) score += 1;
  }
  return score;
}

/**
 * Deterministic retrieval: best-matching card, or null when nothing in the
 * knowledge base plausibly answers the question (fail honestly, never guess).
 */
export function answerFor(query: string): KnowledgeCard | null {
  const tokens = tokenize(query);
  if (tokens.length === 0) return null;

  let best: KnowledgeCard | null = null;
  let bestScore = 0;
  for (const card of KNOWLEDGE_CARDS) {
    const s = scoreCard(card, tokens);
    if (s > bestScore) {
      bestScore = s;
      best = card;
    }
  }

  // Require meaningful overlap relative to how much was asked. Scaling by
  // token count penalizes natural questions ("can he automate my invoices?")
  // where one high-signal verb carries the intent while the nouns are niche.
  // A modest floor rejects zero-signal queries instead.
  const threshold = 3;
  return bestScore >= threshold ? best : null;
}