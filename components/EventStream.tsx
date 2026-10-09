"use client";

import { useEffect, useRef, useState } from "react";
import { EVENT_TEMPLATES, type StreamEvent } from "@/lib/content";

type Row = StreamEvent & { id: number; ts: string; ms: number; n: number };

const MAX_ROWS = 5;

/**
 * Seed rows are deterministic (no Date.now) so they match on server and client.
 * A stream that starts blank looks broken; one that starts populated reads as
 * live.
 */
function seedRows(count: number): Row[] {
  const rows: Row[] = [];
  for (let i = 0; i < count; i++) {
    const tpl = EVENT_TEMPLATES[i % EVENT_TEMPLATES.length];
    const n = 2 + ((i * 7) % 41);
    const ms = 0.4 + ((i * 13) % 90) / 10;
    rows.push({
      ...tpl,
      id: i + 1,
      ts: `00:0${i}`,
      ms,
      n,
      msg: tpl.msg
        .replaceAll("{n}", String(n))
        .replaceAll("{ms}", ms.toFixed(1))
        .replaceAll("{id}", String(100000 + ((i * 37) % 899999))),
    });
  }
  return rows;
}

const INITIAL_ROWS = seedRows(MAX_ROWS);

/**
 * EventStream — what a backend actually looks like.
 *
 * Throughput and failure handling don't photograph well, so this shows them:
 * rate limiting arming, the BM25 index contending with a write, a cache hit
 * surviving a restart. Five rows, generous line height — enough to read a
 * single message without effort, which is the point.
 *
 * `hideIntro` is used by the /stream route, which supplies its own heading.
 */
export default function EventStream({ hideIntro = false }: { hideIntro?: boolean }) {
  const [rows, setRows] = useState<Row[]>(INITIAL_ROWS);
  const idx = useRef(INITIAL_ROWS.length);
  const idRef = useRef(INITIAL_ROWS.length);

  useEffect(() => {
    const push = () => {
      const tpl = EVENT_TEMPLATES[idx.current % EVENT_TEMPLATES.length];
      idx.current += 1;
      const n = 2 + ((idx.current * 7) % 41);
      const ms = 0.4 + ((idx.current * 13) % 90) / 10;
      idRef.current += 1;

      const row: Row = {
        ...tpl,
        id: idRef.current,
        ts: new Date().toLocaleTimeString("en-GB", { hour12: false }).slice(3),
        ms,
        n,
        msg: tpl.msg
          .replaceAll("{n}", String(n))
          .replaceAll("{ms}", ms.toFixed(1))
          .replaceAll("{id}", String(100000 + ((idx.current * 37) % 899999))),
      };

      setRows((prev) => [...prev, row].slice(-MAX_ROWS));
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = setInterval(push, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={hideIntro ? undefined : "section"} id="stream" style={hideIntro ? undefined : { paddingTop: 0 }}>
      <div className="container">
        {!hideIntro && (
          <div className="section-head">
            <p className="eyebrow">Live stream</p>
            <h2 className="section-title">
              What the runtime is doing <em>right now.</em>
            </h2>
            <p className="lead section-note">
              A backend&apos;s quality isn&apos;t visible in screenshots — it shows
              up in what happens under load. Every message below is an event shape
              from the systems on this page: rate limiting arming, index
              contention, cache hits, graceful degradation.
            </p>
          </div>
        )}

        <div className="card">
          <div className="card-head">
            <span className="card-title">
              <span className="dot ok" />
              Async event loop
            </span>
            <span className="card-meta">
              {rows.length} of {MAX_ROWS} buffered · no blocking i/o
            </span>
          </div>
          <div className="card-body">
            <div className="feed">
              {rows.map((r) => (
                <div className="feed-row" key={r.id}>
                  <span className="feed-ts">{r.ts}</span>
                  <span className="feed-src">{r.src}</span>
                  <span className="feed-msg">
                    <span className={`feed-tag ${r.tag}`}>{r.kind}</span>
                    {r.msg}
                  </span>
                  <span className="feed-lat">{r.ms.toFixed(1)}ms</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
