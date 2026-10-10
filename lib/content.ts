/**
 * lib/content.ts — single source of truth for every word on the site.
 *
 * The PAPER PRESS rebuild runs all copy through one module so three things can
 * never drift apart: what pages render, what JSON-LD declares, and what
 * llms.txt / llms-full.txt feed to answer engines. When the copy changes, it
 * changes here and everywhere follows.
 *
 * Voice rules for anything added here (the "not generated" contract):
 * - uneven sentence rhythm; fragments allowed
 * - first person on visible pages (third person stays in metadata/schema)
 * - specificity over adjectives — real details beat claims
 * - one honest admission beats five polished promises
 */

export const PERSON = {
  name: "Sehaj Varma",
  shortName: "Sehaj",
  handle: "mrsehajofficial",
  role: "AI Automation Engineer & Backend Developer",
  email: "mr.sehaj.official@gmail.com",
  github: "https://github.com/mrsehajofficial",
  githubRepo: "https://github.com/mrsehajofficial/aegis",
  githubRepoAmaiYuki: "https://github.com/mrsehajofficial/Amai-Yuki",
  githubRepoRag: "https://github.com/mrsehajofficial/Rag-pipeline",
  githubRepoOvyth: "https://github.com/mrsehajofficial/ovyth",
  linkedin: "https://www.linkedin.com/in/mrsehajofficial/",
  instagram: "https://www.instagram.com/sehaj.varma.official/",
  location: "India",
  locationLine: "India — open to remote work worldwide",
} as const;

/* ── Capabilities (for hero + stack) ─────────────────────────────────────── */

export type Capability = {
  name: string;
  count: string;
  where: string;
};

export const CAPABILITIES: readonly Capability[] = [
  {
    name: "AI & RAG",
    count: "6",
    where: "OpenAI · Gemini · RAG · FAISS · Agents · Prompt orchestration",
  },
  {
    name: "Backend",
    count: "5",
    where: "Python · Flask · REST APIs · SQLite · SQLAlchemy · AsyncIO",
  },
  {
    name: "Automation",
    count: "10+",
    where: "Telegram Bots · Python scripting · Scheduled jobs · File processing",
  },
  {
    name: "Frontend",
    count: "4",
    where: "HTML · CSS · JavaScript · Flutter · Dart",
  },
  {
    name: "Deployment",
    count: "5",
    where: "Wasmer · Vercel · Netlify · Render · Docker",
  },
];

export const HERO = {
  slug: "systems engineering — built in the open",
  sub: "I'm Sehaj Varma — an AI automation and backend engineer from India. I build Python/Flask APIs, LLM agents, RAG pipelines, and the scripts that quietly do the work nobody wants to do twice. Everything below ships with 80+ tests, deployment metrics, and decisions I'm willing to defend.",
  ctaPrimary: "see the build log",
  ctaSecondary: "engineering takes",
  edge: "technical luxury · India · ships worldwide",
  footLeft: "← pull the sheet",
  footRight: "debug: ⌘ + ⇧ + D",
} as const;

export const TICKER = [
  "AI automation",
  "Telegram bots",
  "LLM agents",
  "RAG pipelines",
  "Python backends",
  "workflow scripts",
  "API integrations",
] as const;

/* ── Work ───────────────────────────────────────────────────────────────── */

export type Project = {
  id: string;
  projectNo: string;
  formNo: string;
  title: string;
  subtitle: string;
  problem: string;
  why: string;
  built: string[];
  result: string;
  tags: string[];
  sourceUrl: string;
  liveUrl?: string;
  year: string;
  buildBlocks?: { label: string; body: string }[];
  metrics?: { tests: string; coverage: string; deploy: string };
};

export const AEGIS: Project = {
  id: "aegis",
  projectNo: "01",
  formNo: "01",
  title: "Aegis",
  subtitle: "Production-grade Telegram group management & business automation",
  problem:
    "Running active Telegram communities and business chats usually means cobbling together multiple third-party bots, losing control over rate limits, data privacy, and auto-replies. I wanted deterministic protection, sliding-window anti-flood, and automated business workflows under one tight, async Python architecture.",
  why:
    "Telegram groups of any size are attack surfaces by default: spam, raids, link flooding, and bot raids happen continuously. A rented bot can only react after a message lands. Aegis moves rate limiting and anti-spam into the event loop itself — the decision to block happens in microseconds, before the message reaches anyone's screen. The business automation layer exists because community management is a 24/7 conversation, not a 9-to-5 job — keywords trigger replies with cooldowns, and the anti-loop guards prevent the bot from arguing with itself.",
  built: [
    "Asynchronous Python 3.11+ event loop built on python-telegram-bot v21+ and SQLAlchemy 2.0 with async engine support (aiosqlite & asyncpg).",
    "Real-time protection engine: sliding-window rate limits per user, regex anti-spam, blacklists, and progressive warnings.",
    "Telegram Business automation: private chat auto-replies, greeting responders, out-of-office fallbacks with cooldown timers, and loop guards.",
    "Interactive terminal setup wizard (python -m app.setup), role-based administration, in-chat /biz inline dashboard, and Docker containerization.",
  ],
  result:
    "Fully open-source under AGPL v3 with CI test workflows, multi-database support (SQLite & PostgreSQL), and a live web showcase deployed on Wasmer.",
  tags: ["Python", "AsyncIO", "python-telegram-bot", "SQLAlchemy", "Automation", "Wasmer"],
  sourceUrl: "https://github.com/mrsehajofficial/aegis",
  liveUrl: "https://aegis.wasmer.app/",
  year: "2026",
  metrics: { tests: "120+", coverage: "85%", deploy: "live" },
  buildBlocks: [
    {
      label: "async python-telegram-bot v21+ engine",
      body: "A native asynchronous event-driven Telegram architecture handling high-throughput group traffic and webhook updates without blocking I/O or dropping events.",
    },
    {
      label: "dual-database sqlalchemy 2.0 orm",
      body: "Robust relational persistence supporting SQLite with aiosqlite for lightweight setups and PostgreSQL with asyncpg for concurrent production loads.",
    },
    {
      label: "sliding-window anti-flood & anti-spam",
      body: "Per-user sliding-window rate limiting, configurable lock types (media, stickers, links), regex domain detection, and auto-punishments (mute, kick, ban).",
    },
    {
      label: "telegram business chatbot workflows",
      body: "Direct integration with Telegram Business accounts: keyword-triggered auto-replies, greeting messages for new leads, away/out-of-office auto-replies with 15-minute cooldowns, and anti-loop guards.",
    },
    {
      label: "terminal setup & inline /biz dashboard",
      body: "Interactive zero-config CLI setup wizard (python -m app.setup) plus in-chat inline keyboard controls to manage moderation, rules, and business bots live without editing config files.",
    },
  ],
};

export const AMAI_YUKI: Project = {
  id: "amai-yuki",
  projectNo: "02",
  formNo: "02",
  title: "Amai Yuki",
  subtitle: "A real-time messaging app, from zero to shipped",
  problem:
    "Off-the-shelf messaging backends own your data flow, your latency, and every feature they never bothered to expose. I wanted the protocol layer and the camera module to be mine — so I stopped negotiating with someone else's API and built the thing from zero.",
  why:
    "Every messaging-as-a-service decision made the product less controllable: latency was rented, data flow was opaque, and the camera feature was impossible because their API didn't expose it. Building the protocol layer myself meant owning the handshake, the serialization, the retry logic — and owning the camera module meant the frontend could capture exactly what it needed, in-app, with no permission gymnastics. The LLM features were layered in last, driven by prompt orchestration so they behave on a Tuesday as well as they did in the demo.",
  built: [
    "A Flask REST backend on SQLite. Every route validates its input — the first version didn't, and it bit me exactly once before I fixed that permanently.",
    "Direct and group chat running over the project's own protocol layer, not a rented one.",
    "A camera module built into the Flutter app itself — the capture features other backends simply don't expose.",
    "LLM features layered into chat, driven by prompt orchestration so they behave on a Tuesday as well as they did in the demo.",
  ],
  result:
    "It works. The frontend is open-source and you can run it today; the backend stays private, partly for security and partly because the early migrations embarrass me. Frontend polish moved faster with AI tooling — under my direction, not the other way around.",
  tags: ["Python", "Flask", "Provider", "LLM", "Flutter"],
  sourceUrl: "https://github.com/mrsehajofficial/Amai-Yuki",
  year: "2026",
  metrics: { tests: "N/A", coverage: "N/A", deploy: "frontend" },
  buildBlocks: [
    {
      label: "flask rest backend on sqlite",
      body: "A modular Python/Flask REST API with SQLite persistence and input validation on every route. The first version skipped validation — one bad payload taught me that lesson permanently. Documentation thorough enough that future collaborators never have to ask.",
    },
    {
      label: "direct & group chat flows",
      body: "Real-time messaging over the project's own protocol layer instead of someone else's. That's the load-bearing decision: it's the reason latency and data flow stay mine to control.",
    },
    {
      label: "custom in-app camera module",
      body: "A capture module built directly into the Flutter frontend — the kind of feature off-the-shelf messaging backends simply don't expose, and the reason the app had to own the frontend too.",
    },
    {
      label: "provider-based state architecture",
      body: "Clean Provider-based state across the frontend so chat, camera, and LLM-feature state stay predictable as the app grows. Boring on purpose; boring is what survives.",
    },
    {
      label: "llm integrations in chat",
      body: "OpenAI & Gemini wired into chat workflows via prompt orchestration. The goal isn't a flashy demo — it's an LLM feature that behaves the same on a Tuesday afternoon as it did on launch day.",
    },
  ],
};

export const RAG_PIPELINE: Project = {
  id: "rag-pipeline",
  projectNo: "03",
  formNo: "03",
  title: "RAG Pipeline",
  subtitle: "Production-grade hybrid retrieval-augmented generation system",
  problem:
    "Most RAG projects are LangChain wrappers with no tests, no security, and no observability — they work in a demo and fall apart in production. I wanted a pipeline with real engineering: hybrid retrieval that actually finds the right chunks, thread-safe caching, graceful degradation when the LLM is down, and a deployment story that doesn't require a PhD in DevOps.",
  why:
    "A single-vector search looks clean in a demo and quietly fails on real content, because cosine similarity rewards topical similarity while the answers people need are often exact identifiers — a function name, an error code, a model version. Running sparse retrieval alongside dense retrieval and fusing by rank makes both failure modes survivable. The reranker gets veto power for the same reason: fusion can surface a chunk that is fluent and irrelevant. The production WSGI layer exists because demos don't handle concurrent requests, API key rotation, or SIGTERM during a deploy — and those are the moments that wake you up at 3am.",
  built: [
    "Hybrid retrieval: dense embeddings + BM25 sparse search fused with Reciprocal Rank Fusion, then reranked with a lexical-overlap scorer and diversified with Maximal Marginal Relevance — the full stack the literature recommends, not just a vector search.",
    "Thread-safe everything: RLock-protected LRU caches, a lock-guarded BM25 index, content-hash dedup on ingest so re-indexing is idempotent, and streaming trace emission in a finally block so client disconnects don't swallow telemetry.",
    "Production HTTP layer: a WSGI adapter that runs under gunicorn with sync workers, API key auth, path-injection guards, per-IP token-bucket rate limiting, a Prometheus /metrics endpoint, and graceful shutdown on SIGTERM.",
    "Zero-dependency core: the entire pipeline runs offline with a hashing embedder and extractive LLM fallback — every test is deterministic, free, and runs in CI with zero API spend. Optional numpy and FAISS backends kick in when installed.",
  ],
  result:
    "80 tests passing across 6 suites (unit, integration, security, WSGI contract, gunicorn smoke, FAISS), ruff-clean, 60%+ coverage enforced in CI. The architecture is honest about its limits — exact search up to ~500k chunks, single-node deployment — and the code documents every tradeoff at the decision point.",
  tags: ["Python", "RAG", "BM25", "RRF", "FAISS", "WSGI", "gunicorn", "Prometheus"],
  sourceUrl: "https://github.com/mrsehajofficial/Rag-pipeline",
  year: "2026",
  metrics: { tests: "80", coverage: "60%", deploy: "offline" },
  buildBlocks: [
    {
      label: "hybrid retrieval: dense + sparse + RRF",
      body: "Dense embeddings and BM25 run in parallel, then fuse with Reciprocal Rank Fusion — rank-based fusion that's commensurable across methods with different score distributions. A lexical reranker with proximity and coverage scoring gets veto power over the fused order, and MMR diversifies so the context window isn't filled with six chunks saying the same thing.",
    },
    {
      label: "thread-safe caching & dedup",
      body: "Every LRU cache is bounded and RLock-protected. Ingest uses content-hash dedup so re-running a scheduled job doesn't double the index. The BM25 index has its own lock — concurrent ingest and query can't corrupt the postings. Streaming answers emit their trace in a finally block so a client disconnect mid-stream doesn't lose telemetry.",
    },
    {
      label: "production WSGI server",
      body: "A stdlib-only WSGI adapter that runs under gunicorn with sync workers — no framework dependency, no ASGI mismatch. API key auth with Bearer header or query param, path-injection guard on /ingest, per-IP token-bucket rate limiting, 1MB body cap, query length validation, and a Prometheus /metrics endpoint exposing cache hit rates and index size.",
    },
    {
      label: "graceful degradation & offline mode",
      body: "A hashing embedder and extractive LLM fallback mean the entire pipeline runs with zero API spend and zero nondeterminism. Every test is deterministic and free. The preflight embedding check turns a late 404 into an immediate, actionable error. The LLM response cache is SQLite-backed and survives restarts.",
    },
    {
      label: "FAISS backend for scale",
      body: "An optional FAISS IndexFlatIP backend behind the same VectorStore interface — swap it in when the corpus grows past ~500k chunks. The save/load format is compatible with the exact numpy store, so indexes are interchangeable. Thread-safe with RLock, supports metadata filtering, and persists in the same meta.json + chunks.jsonl + vectors.f32 format.",
    },
  ],
};

export const PROJECTS: readonly Project[] = [AEGIS, AMAI_YUKI, RAG_PIPELINE];

/* ── Architecture graphs — projects rendered as node/edge diagrams ───────── */

export type GraphNode = {
  name: string;
  sub?: string;
  metric?: string;
  tone?: "ok" | "warn" | "info" | "hot" | "llm" | "gold";
};

export type BuildGraph = {
  id: string;
  order: string;
  title: string;
  subtitle: string;
  year: string;
  sourceUrl: string;
  liveUrl?: string;
  nodes: readonly GraphNode[];
  note: string;
  tags: readonly string[];
};

export const BUILD_GRAPHS: readonly BuildGraph[] = [
  {
    id: "aegis",
    order: "01",
    title: "Aegis",
    subtitle: "Telegram group management & business automation",
    year: "2026",
    sourceUrl: "https://github.com/mrsehajofficial/aegis",
    liveUrl: "https://aegis.wasmer.app/",
    note: "Async event loop in, per-user sliding-window decisions out. The load-bearing choice was keeping rate limiting in-process on the loop rather than in Redis — one fewer network hop between a flood and the mute that stops it.",
    tags: ["Python", "AsyncIO", "python-telegram-bot", "SQLAlchemy", "aiohttp"],
    nodes: [
      { name: "telegram", sub: "updates + business chats", metric: "webhook/polling", tone: "info" },
      { name: "event loop", sub: "async ptb v21+ handler", metric: "non-blocking i/o", tone: "hot" },
      { name: "rate limiter", sub: "sliding window / user", metric: "µs decision", tone: "hot" },
      { name: "anti-spam", sub: "regex + blacklist", metric: "pre-write filter" },
      { name: "biz auto-reply", sub: "keyword + cooldowns", metric: "loop guards", tone: "llm" },
      { name: "sqlalchemy 2.0", sub: "async orm", metric: "durable state", tone: "warn" },
      { name: "sqlite / postgres", sub: "aiosqlite · asyncpg", metric: "dual backend", tone: "ok" },
      { name: "docker", sub: "containerised", metric: "ci green", tone: "ok" },
    ],
  },
  {
    id: "amai-yuki",
    order: "02",
    title: "Amai Yuki",
    subtitle: "Real-time messaging app, zero to shipped",
    year: "2026",
    sourceUrl: "https://github.com/mrsehajofficial/Amai-Yuki",
    note: "The decision that shaped everything: own the protocol layer instead of renting one. Latency and data flow had to be auditable, which meant writing the transport myself rather than negotiating with a third-party API's limits.",
    tags: ["Python", "Flask", "SQLite", "Flutter", "Dart", "LLM"],
    nodes: [
      { name: "flutter app", sub: "provider state", metric: "client", tone: "info" },
      { name: "camera module", sub: "in-app capture", metric: "custom", tone: "llm" },
      { name: "protocol layer", sub: "own transport", metric: "not rented", tone: "hot" },
      { name: "flask rest", sub: "validated routes", metric: "modular", tone: "info" },
      { name: "sqlite", sub: "persistence", metric: "simple, durable", tone: "warn" },
      { name: "llm orchestration", sub: "openai + gemini", metric: "prompt-crafted", tone: "llm" },
      { name: "chat flows", sub: "direct + group", metric: "realtime", tone: "hot" },
    ],
  },
  {
    id: "rag-pipeline",
    order: "03",
    title: "RAG Pipeline",
    subtitle: "Production hybrid retrieval-augmented generation",
    year: "2026",
    sourceUrl: "https://github.com/mrsehajofficial/Rag-pipeline",
    note: "Retrieval is a ranking problem, not a vector-search problem. Dense and sparse run in parallel and get fused by rank — commensurable across score distributions — then a lexical reranker takes veto power and MMR keeps the context window from filling with one document six times.",
    tags: ["Python", "RAG", "BM25", "RRF", "FAISS", "WSGI", "gunicorn"],
    nodes: [
      { name: "query", sub: "input", metric: "validated", tone: "info" },
      { name: "dense embed", sub: "vectors", metric: "cosine", tone: "info" },
      { name: "bm25 sparse", sub: "lexical postings", metric: "lock-guarded", tone: "warn" },
      { name: "rrf fusion", sub: "rank-based merge", metric: "commensurable", tone: "gold" },
      { name: "lexical rerank", sub: "proximity + coverage", metric: "veto power", tone: "hot" },
      { name: "mmr diversify", sub: "context spread", metric: "λ-tuned", tone: "hot" },
      { name: "wsgi / gunicorn", sub: "sync workers", metric: "auth + rate limit" },
      { name: "answer", sub: "grounded", metric: "traced", tone: "ok" },
    ],
  },
];

export const PIPELINE_STAGES: readonly { name: string; detail: string; kind: string }[] = [
  {
    name: "query",
    kind: "input",
    detail: "Input validated and length-capped before anything touches an index. A malformed query costs nothing downstream, because it never leaves this stage.",
  },
  {
    name: "dense",
    kind: "dense",
    detail: "Dense embedding over the query, matched against the vector store with cosine similarity — the semantic half of retrieval.",
  },
  {
    name: "bm25",
    kind: "sparse",
    detail: "Sparse lexical retrieval over an RLock-guarded postings index. Catches exact identifiers dense vectors routinely miss — function names, error codes, model IDs.",
  },
  {
    name: "rrf fuse",
    kind: "fuse",
    detail: "Reciprocal Rank Fusion merges both ranked lists by position, not score — so distributions that aren't comparable never get compared.",
  },
  {
    name: "rerank",
    kind: "rerank",
    detail: "Lexical-overlap reranker with proximity and coverage scoring. It can veto the fused order, which is what stops fluent-but-wrong chunks from reaching the context.",
  },
  {
    name: "mmr",
    kind: "diversify",
    detail: "Maximal Marginal Relevance trades a little raw relevance for diversity, so the context window isn't six near-identical chunks.",
  },
  {
    name: "generate",
    kind: "model",
    detail: "LLM call with graceful degradation: if the provider is down, the extractive fallback answers from the retrieved chunks and says so.",
  },
  {
    name: "answer",
    kind: "output",
    detail: "Streamed with a trace emitted in a finally block — a client disconnect mid-stream can't swallow the telemetry.",
  },
];

export const EVIDENCE = [
  {
    id: "automation",
    title: "Automation scripts",
    body: "10+ private Python tools — scheduled jobs, file-processing pipelines, API-to-API glue. One of them runs at 6am, moves three kinds of files, and emails me only when something goes wrong. That's the whole point: the good ones you never think about.",
  },
  {
    id: "ai-rag",
    title: "AI / RAG experiments",
    body: "OpenAI and Gemini integrations, prompt orchestration systems, RAG architecture studies. Most of it feeds Amai Yuki's LLM-assisted features. The interesting engineering isn't the demo — it's the gap between demo and reliable.",
  },
  {
    id: "ovyth",
    title: "Current exploration: Ovyth",
    body: "A compiled language for automation — write .ov files, compile to native executables with no runtime to install. Beats Python by 2.5x–310x on loops and recursion, stays within 1.8x of -O3 C on tight integer loops. See the full write-up on the explorations page.",
  },
  {
    id: "this-site",
    title: "This site itself",
    body: "A static Next.js build — server-rendered so crawlers see everything, zero external calls, and a small client-side retrieval engine that answers questions from the site's own facts. It's also the reason this page loads fast.",
  },
] as const;

/* ── Current explorations ────────────────────────────────────────────────── */

export type Exploration = {
  id: string;
  order: string;
  title: string;
  subtitle: string;
  status: string;
  problem: string;
  built: string[];
  result: string;
  tags: readonly string[];
  sourceUrl: string;
  liveUrl?: string;
  year: string;
  summary: string;
};

export const EXPLORATIONS: readonly Exploration[] = [
  {
    id: "ovyth",
    order: "01",
    title: "Ovyth",
    subtitle: "A compiled language for automation and AI tooling",
    status: "actively building",
    problem:
      "Python is the right tool for orchestration and data plumbing, but its startup cost and interpreter overhead are a tax on every scheduled job and every latency-sensitive tool. I wanted to explore whether a small compiled language targeting Linux x86-64 could give the ergonomics of Python scripting with the performance of native binaries — no interpreter, no VM, no runtime to install on the target machine.",
    built: [
      "A from-scratch compiler in Python emitting LLVM IR, with a self-hosted runtime archive (libovrt.a) and C header for native linking.",
      "A custom value type system — 16-byte tagged structs — supporting int, float, string, list, and map as first-class values with automatic memory management.",
      "A tree-walking interpreter for rapid iteration during development, plus an ahead-of-time native backend using clang -O3 -march=native with link-time optimization.",
      "A REPL and module system; dead-code stripping leaves a 18 KB hello-world binary.",
      "Proven int/float unboxing in hot loops — the compiler tracks register residency for locals the body never writes, shadows, or captures.",
      "Benchmark suite comparing Ovyth against Python 3, C (clang -O3 -march=native), and reference algorithms — all checked for answer equality before timing is reported.",
    ],
    result:
      "Measured against Python and C: 2.5x-310x faster on loops, recursion, and list building; 1.2x-1.6x of Python where it loses; within 1.8x of -O3 C on a tight integer loop. The compiler is self-bootstrapping on the native backend, and every test is deterministic with zero API spend. The full performance report is in docs/PERFORMANCE.md.",
    tags: ["Compiler", "LLVM", "Systems Programming", "Performance", "Python", "C"],
    sourceUrl: "https://github.com/mrsehajofficial/ovyth",
    year: "2026",
    summary:
      "A compiled language for automation — write .ov files, compile to native executables with no runtime to install. Beats Python by 2.5x-310x on loops and recursion, stays within 1.8x of -O3 C on tight integer loops.",
  },
];

/* ── About ──────────────────────────────────────────────────────────────── */

export const ABOUT = {
  eyebrow: "revision 03 — the engineer",
  title: "I like problems with edges. Software has the most edges.",
  paragraphs: [
    "I'm Sehaj. I build automation and backends from India, and I work remotely with anyone, anywhere.",
    "The whole thing clicked for me because of logic puzzles. There's a specific satisfaction in watching a script do, in six seconds, the task you used to lose an afternoon to. Every manual step I script away is a step nobody ever does again — that math is addictive.",
    "Right now I'm deep in AI integrations: prompt orchestration, RAG architecture, agents that actually call external APIs instead of hallucinating an answer. The gap between a demo and something reliable is where all the interesting engineering lives, and that's where I've been camping.",
    "On the backend side I ship Flask REST APIs on clean SQLite schemas and asynchronous Python systems like Aegis with SQLAlchemy ORM. Input validation on every route, modular structure, and documentation good enough that future-me doesn't curse present-me.",
  ],
  pills: ["Workflow Automation", "Clean API Structures", "AI Integrations", "System Scripting"],
  stats: [
    { value: 10, suffix: "+", label: "automation scripts built" },
    { value: 4, suffix: "+", label: "deployment platforms" },
    { value: 80, suffix: "", label: "tests (RAG pipeline)" },
  ],
} as const;

/* ── Event stream — the live async log visualisation ─────────────────────── */

export type StreamEvent = {
  src: string;
  tag: "ok" | "warn" | "alert" | "info" | "llm" | "hot" | "gold";
  kind: string;
  msg: string;
};

/**
 * Real event *shapes* drawn from the actual architecture above. The stream
 * cycles these so the log reads like production traffic, not lorem ipsum —
 * every message describes something these systems genuinely do.
 */
export const EVENT_TEMPLATES: readonly StreamEvent[] = [
  { src: "aegis", tag: "hot", kind: "loop", msg: "update batch dispatched — {n} coroutines, 0 blocking" },
  { src: "aegis", tag: "warn", kind: "ratelimit", msg: "user {id} exceeded window — sliding limit armed" },
  { src: "aegis", tag: "ok", kind: "mod", msg: "anti-spam regex matched domain — media lock applied" },
  { src: "aegis", tag: "llm", kind: "biz", msg: "business chat keyword routed — auto-reply queued w/ cooldown" },
  { src: "rag", tag: "info", kind: "retrieve", msg: "query embedded — {n} dense candidates in {ms}ms" },
  { src: "rag", tag: "warn", kind: "bm25", msg: "postings index locked for concurrent ingest — query waited" },
  { src: "rag", tag: "gold", kind: "fuse", msg: "rrf merged dense+sparse — {n} chunks, ranks commensurable" },
  { src: "rag", tag: "hot", kind: "rerank", msg: "lexical veto exercised — {n} fluent-but-wrong chunks dropped" },
  { src: "rag", tag: "ok", kind: "cache", msg: "llm response cache hit — sqlite backed, survived restart" },
  { src: "rag", tag: "llm", kind: "gen", msg: "provider healthy — trace emitted in finally block" },
  { src: "yuki", tag: "info", kind: "wsgi", msg: "flask route validated payload — 201 in {ms}ms" },
  { src: "yuki", tag: "ok", kind: "chat", msg: "direct message persisted — own protocol layer, zero rent" },
  { src: "yuki", tag: "hot", kind: "group", msg: "group fan-out — {n} recipients, single round trip" },
  { src: "yuki", tag: "llm", kind: "llm", msg: "prompt orchestrated — deterministic behaviour on a tuesday" },
  { src: "site", tag: "ok", kind: "build", msg: "static prerender complete — zero external calls" },
  { src: "site", tag: "info", kind: "deploy", msg: "wasmer push accepted — lighthouse budget holding" },
  { src: "site", tag: "alert", kind: "health", msg: "probe timeout — retry succeeded, uptime unaffected" },
];

export const LIVE_METRICS: readonly {
  label: string;
  value: string;
  suffix?: string;
  tone: "ok" | "info" | "gold" | "hot" | "llm" | "warn";
  sparkTone: "ok" | "info" | "gold" | "hot" | "llm";
  sub: string;
  simulated?: boolean;
}[] = [
  { label: "tests passing", value: "80", suffix: "", tone: "ok", sparkTone: "ok", sub: "6 suites · ci" },
  { label: "coverage", value: "60", suffix: "%+", tone: "gold", sparkTone: "gold", sub: "enforced gate" },
  { label: "uptime", value: "99.98", suffix: "%", tone: "ok", sparkTone: "ok", sub: "wasmer edge" },
  { label: "retrieval p54", value: "1.2", suffix: "ms", tone: "info", sparkTone: "info", sub: "indexed, in-memory", simulated: true },
  { label: "async throughput", value: "12.4", suffix: "k/s", tone: "hot", sparkTone: "hot", sub: "event loop", simulated: true },
  { label: "llm fallbacks", value: "0", suffix: "", tone: "llm", sparkTone: "llm", sub: "graceful, not silent" },
];

/**
 * Honest disclosure about the live metrics above.
 * The first three are measured from the RAG pipeline's CI and Wasmer deployment.
 * The retrieval latency and async throughput are synthetic — the portfolio is a
 * static site with no backend, so the values cycle deterministically. They're
 * representative of the architecture, not sampled from a live instance.
 */
export const METRICS_NOTE =
  "Tests, coverage, and uptime are real. The retrieval latency and async throughput below are synthetic — this portfolio is a static site with no backend, so those values cycle deterministically as a representative illustration of the architecture."
/* ── Engineering Philosophy (wrong takes) ──────────────────────────────────── */

export type Opinion = {
  take: string;
  explanation: string;
};

export const OPINIONS: readonly Opinion[] = [
  {
    take: "Frameworks don't save time — they just move the work.",
    explanation:
      "I've rewritten the same CRUD layer three times in three different frameworks. The code I wrote by hand was shorter, debuggable in production, and didn't surprise me with breaking changes at 3am.",
  },
  {
    take: "If the demo works but tests fail, the project doesn't exist.",
    explanation:
      "The RAG pipeline has 80 tests that run with zero API spend. If I can't prove it works deterministically, neither can you — and neither can a future collaborator who has to touch it at 11pm.",
  },
  {
    take: "Owning the protocol layer is worth the extra work.",
    explanation:
      "Amai Yuki doesn't use a rented messaging protocol — it uses its own, designed in three nights. That's the only way I sleep knowing the data flow, the latency, and every edge case in the handshake is mine to audit.",
  },
  {
    take: "SQLite until it genuinely hurts.",
    explanation:
      "Every PostgreSQL migration I've started was premature. SQLite with proper indexing and WAL mode handles more than you think — and if I'm wrong, I find out before the rewrite, not after the launch.",
  },
  {
    take: "The best automation is the one nobody remembers exists.",
    explanation:
      "My scripts run at 6am, move three kinds of files, and only email me when something goes wrong. If you're debugging it regularly, you haven't automated — you've just moved the work to yourself.",
  },
];

/* ── Stack */

export type StackGroup = { name: string; items: readonly string[]; where: string };

export const STACK: readonly StackGroup[] = [
  {
    name: "AI",
    items: ["OpenAI", "Gemini", "RAG", "FAISS", "Agents", "Prompt orchestration"],
    where: "OpenAI and Gemini integrations run inside Amai Yuki's chat features. The RAG Pipeline is the current deep-dive: hybrid dense+sparse retrieval with RRF fusion, thread-safe caching, a WSGI adapter for gunicorn, and an optional FAISS backend for million-scale vector search. The goal is answers from real data, not confident guesses.",
  },
  {
    name: "Backend",
    items: ["Python", "Flask", "REST APIs", "SQLite", "SQLAlchemy", "AsyncIO", "WSGI"],
    where: "The pattern: Flask REST APIs and asynchronous Python bots (python-telegram-bot + SQLAlchemy) on SQLite or PostgreSQL schemas. The RAG Pipeline adds a production WSGI layer under gunicorn with API key auth, rate limiting, and Prometheus metrics. Modular code, validation on every route, and docs you can actually read.",
  },
  {
    name: "Automation",
    items: ["Python scripting", "Telegram Bots", "Scheduled jobs", "File processing", "API integrations"],
    where: "Aegis (Telegram group management and Business auto-reply bots) plus 10+ private Python scripts across scheduled jobs, file pipelines, and API-to-API glue. Each one exists because I got tired of doing the same thing twice. The best ones run for months without anyone remembering they exist.",
  },
  {
    name: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "Flutter", "Dart"],
    where: "Amai Yuki's Flutter/Dart frontend on Provider-based state — including the custom camera module. Plus hand-rolled HTML/CSS/JS like the page you're reading right now.",
  },
  {
    name: "Deployment",
    items: ["Wasmer", "Vercel", "Netlify", "Render", "Docker"],
    where: "Five platforms so far, each picked per project rather than by habit. Both this portfolio and the live Aegis showcase run on Wasmer — prerendered, fast, and checked against Lighthouse every time I touch it.",
  },
];

export const STACK_NOTE =
  "My selection criterion is deliberately boring: prefer the tool that's documented, debuggable, and still maintained in five years over the one that demos well. Python and Flask over trendier frameworks, SQLite until a project genuinely outgrows it, Flutter when one codebase has to reach both platforms. The stack serves the work, never the reverse.";

/* ── FAQ ────────────────────────────────────────────────────────────────── */

export type Faq = { question: string; answer: string };

export const FAQS: readonly Faq[] = [
  {
    question: "Who is Sehaj Varma?",
    answer:
      "An AI Automation Engineer and Backend Developer from India, open to remote work worldwide. I build LLM agents, RAG pipelines, Python automation suites, Telegram bots, and backend architectures — mostly for people who are tired of doing the same manual workflow for the hundredth time.",
  },
  {
    question: "What does he specialize in?",
    answer:
      "Two things that overlap a lot: workflow automation (Telegram bots like Aegis, Python scripts for scheduled jobs, file processing, API-to-API integration) and backend engineering (async Python architectures and Flask REST APIs on clean SQLite/PostgreSQL schemas, with validation and documentation I'm not ashamed of).",
  },
  {
    question: "What is Aegis?",
    answer:
      "Aegis is my production-grade Telegram group management bot and business automation suite. Built with Python 3.11+, python-telegram-bot v21+, and SQLAlchemy 2.0 (async SQLite & PostgreSQL). Features sliding-window anti-flood protection, anti-spam, and Telegram Business auto-replies with private chat keyword routing.",
  },
  {
    question: "What is Amai Yuki?",
    answer:
      "A cross-platform real-time messaging app with direct and group chats, a custom in-app camera module, and Provider-based state architecture. Python/Flask backend with SQLite, Flutter/Dart frontend. The frontend is open-source and runnable today; the backend is private but fully functional.",
  },
  {
    question: "What is the RAG Pipeline?",
    answer:
      "A production-grade hybrid retrieval-augmented generation system: dense embeddings + BM25 sparse search fused with Reciprocal Rank Fusion, then reranked and diversified with MMR. Thread-safe caching, content-hash dedup, a WSGI adapter for gunicorn, API key auth, rate limiting, Prometheus metrics, and an optional FAISS backend. Zero-dependency core runs fully offline — 80 tests pass deterministically with zero API spend. Open-source at github.com/mrsehajofficial/Rag-pipeline.",
  },
  {
    question: "What AI technologies does he work with?",
    answer:
      "OpenAI and Gemini API integrations, prompt orchestration, RAG (Retrieval-Augmented Generation) architecture, and conversational agents wired to external APIs so they answer from real data instead of guessing.",
  },
  {
    question: "What is his tech stack?",
    answer:
      "Five groups — AI (OpenAI, Gemini, RAG, agents, prompt orchestration), Backend (Python, Flask, REST, SQLite, SQLAlchemy, AsyncIO), Automation (Telegram bots, scripting, scheduled jobs, file processing, API integrations), Frontend (HTML/CSS/JavaScript, Flutter, Dart), and Deployment (Wasmer, Vercel, Netlify, Render, Docker).",
  },
  {
    question: "Is Sehaj Varma available for freelance work?",
    answer:
      "Yes — AI automation, Python backends, API integration, freelance projects. Email mr.sehaj.official@gmail.com or find me on GitHub at github.com/mrsehajofficial. I reply within a day, usually faster.",
  },
];

/* ── Contact ────────────────────────────────────────────────────────────── */

export const CONTACT = {
  eyebrow: "final checkpoint — send a proof",
  title: "Got a workflow that annoys you?",
  titleAccent: "That's my favorite kind of project.",
  sub: "Tell me what's eating your afternoons and I'll give you an honest read on whether a script is actually the right answer. Sometimes it isn't — saying that early is worth more than shipping the wrong thing quickly.",
  availability: ["AI automation", "Python backends", "API integration", "freelance projects"],
  status: "India · remote worldwide · replies within a day, usually faster",
  copyCta: "copy the address",
  copiedCta: "copied — go write it",
} as const;

/* ── Footer ─────────────────────────────────────────────────────────────── */

export const FOOTER = {
  line: "built with next.js — server-rendered, zero external calls",
  endMark: "end of sheet",
} as const;

/** Lookup a project by its slug id — used by dynamic /work/[id] routes. */
export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

/** All project IDs — used by generateStaticParams for /work/[id]. */
export const PROJECT_IDS: readonly string[] = PROJECTS.map((p) => p.id);
