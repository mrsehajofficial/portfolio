"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { retrieveWithScores } from "@/lib/portfolio-knowledge";

type RetrievalResult = ReturnType<typeof retrieveWithScores>;

type Metric = {
  label: string;
  value: string;
  suffix?: string;
  tone: "ok" | "accent" | "gold" | "info" | "hot" | "llm" | "warn";
  sparkTone: "ok" | "accent" | "gold" | "info" | "llm" | "hot";
  sub: string;
};

// `gold` metrics render in the accent colour — the palette keeps one
// highlight hue so the tiles stay calm.
const TONE_CLASS: Record<string, string> = {
  ok: "v-ok",
  accent: "v-accent",
  gold: "v-accent",
  info: "v-info",
  hot: "v-hot",
  llm: "v-llm",
  warn: "v-info",
};

const SPARK_COLOR: Record<string, string> = {
  ok: "var(--ok)",
  accent: "var(--accent)",
  gold: "var(--accent)",
  info: "var(--info)",
  llm: "var(--llm)",
  hot: "var(--hot)",
};

type Props = { metrics: readonly Metric[] };

const PROMPTS = [
  "What is Aegis?",
  "How does retrieval work?",
  "What's the backend stack?",
  "Where is it deployed?",
  "Is he available?",
];

const DEFAULT_QUERY = "how does hybrid retrieval work";

const SPARK = "▁▂▃▄▅▆▇█";

function sparkline(seed: number, len = 22): string {
  let s = "";
  for (let i = 0; i < len; i++) {
    const v = (Math.sin(seed * (i + 1) * 0.7) + Math.cos(seed * i * 1.3 + 1)) / 2;
    const idx = Math.min(
      SPARK.length - 1,
      Math.max(0, Math.round(((v + 1) / 2) * (SPARK.length - 1)))
    );
    s += SPARK[idx];
  }
  return s;
}

/**
 * Hero — the retrieval console, presented for people.
 *
 * The demonstration is unchanged from the instrument version (same real
 * retriever, same computed relevance scores), but it is now introduced the way
 * a person reads: a headline, a sentence of context, an obviously-inviting
 * search field, and answers that arrive as soft cards with the evidence for
 * their ranking shown underneath. Latency is client-measured only, because
 * performance.now() differs between server and client render.
 */
export default function ConsoleHero({ metrics }: Props) {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [result, setResult] = useState<RetrievalResult>(() =>
    retrieveWithScores(DEFAULT_QUERY, 5)
  );
  const [latency, setLatency] = useState("—");
  const inputRef = useRef<HTMLInputElement>(null);

  const run = useCallback((q: string) => {
    // Time the retriever only, not the React update that follows.
    const started = performance.now();
    const next = retrieveWithScores(q, 5);
    const elapsed = performance.now() - started;
    setQuery(q);
    setResult(next);
    setLatency(`${elapsed.toFixed(2)}ms`);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => run(DEFAULT_QUERY), 40);
    return () => clearTimeout(id);
  }, [run]);

  const { hits, tokens } = result;
  const maxScore = hits.length ? Math.max(...hits.map((h) => h.score)) : 1;

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">AI automation &amp; backend engineering</p>

          <h1 className="hero-title">
            I build systems that answer from <em>real data,</em> not guesses.
          </h1>

          <p className="lead hero-sub">
            Most demos fall over in production. The interesting work lives in
            the gap between the two — so this page doesn&apos;t describe that
            work, it <b>runs it</b>. Ask the field below anything about what
            I&apos;ve built; the ranking is computed by the same hybrid
            retriever that powers this site.
          </p>

          <div className="search">
            <div className="search-shell">
              <span className="search-icon" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
              </span>
              <input
                ref={inputRef}
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") run(query);
                }}
                placeholder="Ask anything about the work…"
                aria-label="Ask this portfolio a question"
                spellCheck={false}
                autoComplete="off"
              />
              <button className="search-run" onClick={() => run(query)}>
                Ask
              </button>
            </div>

            <div className="chips">
              {PROMPTS.map((p) => (
                <button className="chip" key={p} onClick={() => run(p)}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="stats">
            <span>docs indexed <b>9</b></span>
            <span>tokens <b>{tokens.length}</b></span>
            <span>matches <b>{hits.length}</b></span>
            <span>latency <b>{latency}</b></span>
            <span>model calls <b>0</b></span>
          </div>
        </div>

        <div style={{ display: "grid", gap: 15 }}>
          <div className="card">
            <div className="card-head">
              <span className="card-title">
                <span className="dot accent" />
                Live monitors
              </span>
              <span className="card-meta">refreshing 1s</span>
            </div>
            <div className="card-body" style={{ padding: 22 }}>
              <div className="tiles" style={{ gap: 12 }}>
                {metrics.map((m, i) => (
                  <div className="tile" key={m.label}>
                    <p className="tile-label">{m.label}</p>
                    <p className={`tile-value ${TONE_CLASS[m.tone] ?? "v-accent"}`}>
                      {m.value}
                      {m.suffix && <small>{m.suffix}</small>}
                    </p>
                    <p className="tile-sub">{m.sub}</p>
                    <p
                      className="tile-spark"
                      style={{ color: SPARK_COLOR[m.sparkTone] ?? "var(--ink-4)" }}
                    >
                      {sparkline(i + 1)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "clamp(40px, 6vw, 68px)" }}>
        <div className="results" aria-live="polite">
          {hits.length === 0 && (
            <p className="results-empty">
              Nothing above the confidence threshold.{" "}
              <b>The retriever refuses to guess</b> — try asking about Aegis,
              retrieval, the backend stack, deployment, or availability.
            </p>
          )}

          {hits.map((hit, i) => (
            <article
              className={`result${i === 0 ? " top" : ""}`}
              key={hit.card.id}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="result-top">
                <h3 className="result-title">
                  <span className="result-rank">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {hit.card.title}
                  {i === 0 && <span className="best">best match</span>}
                </h3>
                <div className="result-score">
                  <span className="score-num">{hit.score}</span>
                  <span className="score-track">
                    <span
                      className="score-fill"
                      style={{ transform: `scaleX(${hit.score / maxScore})` }}
                    />
                  </span>
                </div>
              </div>

              <p className="result-summary">{hit.card.summary}</p>

              <p className="result-hits">
                <span style={{ color: "var(--ink-4)" }}>matched on</span>
                {hit.hits.slice(0, 4).map((h) => (
                  <b key={h.token}>{h.token}</b>
                ))}
                {hit.hits.length > 4 && (
                  <span style={{ color: "var(--ink-4)" }}>
                    +{hit.hits.length - 4} more
                  </span>
                )}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
