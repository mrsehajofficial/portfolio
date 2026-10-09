"use client";

import { useEffect, useState } from "react";
import { PIPELINE_STAGES } from "@/lib/content";

/**
 * PipelinePanel — the retrieval pipeline as a flow you can walk through.
 *
 * Same eight stages, hover/focus to inspect, but each stage is a soft card
 * with room to read and the detail panel below is prose rather than a log line.
 *
 * `hideIntro` is used by the /pipeline route, which supplies its own page
 * heading so the two never render competing titles.
 */
export default function PipelinePanel({ hideIntro = false }: { hideIntro?: boolean }) {
  const [pinned, setPinned] = useState(3);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      if (!document.querySelector(".stage:hover")) {
        setActive((a) => (a + 1) % PIPELINE_STAGES.length);
      }
    }, 1100);
    return () => clearInterval(id);
  }, []);

  const stage = PIPELINE_STAGES[pinned];

  return (
    <section className={hideIntro ? undefined : "section"} id="pipeline">
      <div className="container">
        {!hideIntro && (
          <div className="section-head">
            <p className="eyebrow">The retrieval pipeline</p>
            <h2 className="section-title">
              Eight stages, in the order they <em>actually execute.</em>
            </h2>
            <p className="lead section-note">
              Not a diagram for the sake of one. Dense and sparse retrieval run
              in parallel, fuse by rank, then get reranked with veto power —
              because fluent-but-wrong answers come from ranking, not from search.
              Hover any stage to see what it does.
            </p>
          </div>
        )}

        <div className="card">
          <div className="card-head">
            <span className="card-title">
              <span className="dot info" />
              Hybrid query flow
            </span>
            <span className="card-meta">
              {PIPELINE_STAGES.length} stages · deterministic
            </span>
          </div>
          <div className="card-body">
            <div className="flow">
              {PIPELINE_STAGES.map((s, i) => (
                <button
                  className={`stage${active === i ? " is-active" : ""}`}
                  key={s.name}
                  onClick={() => setPinned(i)}
                  onMouseEnter={() => setPinned(i)}
                  onFocus={() => setPinned(i)}
                  aria-label={`Inspect stage: ${s.name}`}
                >
                  <span className="stage-idx">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="stage-name">{s.name}</span>
                  <span className="stage-hint">{s.detail.split(".")[0]}.</span>
                  <span className="stage-bar" aria-hidden="true" />
                </button>
              ))}
            </div>

            <div className="flow-detail">
              <span className="kv">
                stage {String(pinned + 1).padStart(2, "0")} —{" "}
                {/^[aeiou]/i.test(stage.kind) ? "an" : "a"} {stage.kind} stage
              </span>
              <b>{stage.name}:</b> {stage.detail}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
