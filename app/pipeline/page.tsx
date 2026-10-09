import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CurtainReveal from "@/components/CurtainReveal";
import PipelinePanel from "@/components/PipelinePanel";
import { PIPELINE_STAGES } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { PAGE_PATHS } from "@/lib/routes";

export const metadata: Metadata = {
  title: "The Retrieval Pipeline: How It Works",
  description:
    "The eight stages of a production hybrid RAG pipeline: dense embeddings, BM25 sparse retrieval, Reciprocal Rank Fusion, lexical reranking with veto power, and MMR diversification — in the order they execute.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATHS.pipeline.slice(1)}` },
  openGraph: {
    type: "website",
    title: "The Retrieval Pipeline: How It Works — Sehaj Varma",
    description:
      "Dense + BM25 fused by rank, reranked with veto power, diversified with MMR. The eight stages of a production RAG pipeline, in execution order.",
    url: `${SITE_URL}${PAGE_PATHS.pipeline.slice(1)}`,
    images: [
      {
        url: "/og-image-v3.png",
        width: 1200,
        height: 630,
        alt: "Sehaj Varma — AI Automation Engineer & Backend Developer",
      },
    ],
  },
};

/**
 * The pipeline page — the deep-dive version of the flow on the homepage.
 * The interactive flow component is reused verbatim, so the two can never
 * drift, and each stage is additionally written out as prose below for
 * reading end to end (and for crawlers, and for anyone who can't hover).
 */
export default function PipelinePage() {
  return (
    <>
      <Nav />

      <section className="page-head">
        <div className="container">
          <CurtainReveal>
            <p className="eyebrow">The pipeline</p>
            <h1 className="page-title">
              Eight stages, in the order they <em>actually execute.</em>
            </h1>
            <p className="lead" style={{ marginTop: 26 }}>
              Retrieval is a ranking problem before it is a search problem.
              Dense and sparse retrieval run in parallel and get fused by rank
              — because score distributions that aren&apos;t comparable should
              never be compared — then a lexical reranker takes veto power. The
              sections below are written out in full so you can read the whole
              path without hovering anything.
            </p>
          </CurtainReveal>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <PipelinePanel hideIntro />

          <div className="card">
            <div className="card-head">
              <span className="card-title">
                <span className="dot accent" />
                Stage by stage
              </span>
              <span className="card-meta">
                {PIPELINE_STAGES.length} stages · deterministic
              </span>
            </div>
            <div className="card-body">
              {PIPELINE_STAGES.map((stage, i) => (
                <div className="row" key={stage.name} style={{ padding: "26px 0" }}>
                  <span className="row-title">
                    {String(i + 1).padStart(2, "0")} · {stage.kind}
                  </span>
                  <div>
                    <h2 className="row-h">{stage.name}</h2>
                    <p className="row-p">{stage.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <p className="eyebrow">Why it&apos;s built this way</p>
              <p className="lead" style={{ marginTop: 16 }}>
                A single-vector search looks clean in a demo and quietly fails
                on real content, because cosine similarity rewards{" "}
                <b>topical similarity</b> while the answers people need are
                often <b>exact identifiers</b> — a function name, an error code,
                a model version. Running sparse retrieval alongside dense
                retrieval and fusing by rank is what makes both failure modes
                survivable instead of choosing one.
              </p>
              <p className="lead" style={{ marginTop: 16 }}>
                The reranker gets veto power for the same reason. Fusion can
                surface a chunk that is <b>fluent and irrelevant</b>; the
                lexical-overlap pass is what catches it before it reaches the
                context window. Everything after that — MMR for spread, the
                provider call with its extractive fallback, the trace emitted
                in a <code>finally</code> block — exists so a failure can be
                observed rather than merely suffered.
              </p>
              <div className="link-row">
                <a
                  className="btn primary"
                  href="https://github.com/mrsehajofficial/Rag-pipeline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the source ↗
                </a>
                <a className="btn outline" href={PAGE_PATHS.work}>
                  See the full architecture
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
