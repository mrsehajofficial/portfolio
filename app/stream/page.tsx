import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CurtainReveal from "@/components/CurtainReveal";
import EventStream from "@/components/EventStream";
import { LIVE_METRICS, METRICS_NOTE } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { PAGE_PATHS } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Live Stream: What the Runtime Is Doing",
  description:
    "A live view of async event-loop behaviour: rate limiting arming, BM25 index contention, cache hits surviving a restart, and graceful LLM degradation — the event shapes of a production backend.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATHS.stream.slice(1)}` },
  openGraph: {
    type: "website",
    title: "Live Stream: What the Runtime Is Doing — Sehaj Varma",
    description:
      "Rate limiting, index contention, cache hits and graceful degradation — a backend's real behaviour under load.",
    url: `${SITE_URL}${PAGE_PATHS.stream.slice(1)}`,
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
 * The stream route — the long-form companion to the panel on the homepage.
 * The same EventStream component is reused with its intro suppressed, so the
 * live feed on both pages is literally the same feed.
 */
export default function StreamPage() {
  return (
    <>
      <Nav />

      <section className="page-head">
        <div className="container">
          <CurtainReveal>
            <p className="eyebrow">Live stream</p>
            <h1 className="page-title">
              What the runtime is doing <em>right now.</em>
            </h1>
            <p className="lead" style={{ marginTop: 26 }}>
              A backend&apos;s quality isn&apos;t visible in screenshots — it
              shows up in what happens under load. Every message below is an
              event shape from the systems on this site: rate limiting arming,
              the BM25 index contending with a write, a cache hit surviving a
              restart, a provider falling back rather than failing.
            </p>
          </CurtainReveal>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <EventStream hideIntro />

          <div className="card">
            <div className="card-head">
              <span className="card-title">
                <span className="dot ok" />
                Monitors
              </span>
              <span className="card-meta">refreshing 1s</span>
            </div>
            <div className="card-body" style={{ padding: 22 }}>
              <div className="tiles">
                {LIVE_METRICS.map((m) => (
                  <div className="tile" key={m.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                      <p className="tile-label">{m.label}</p>
                      {m.simulated && (
                        <span className="mono" style={{ fontSize: 10, opacity: 0.5 }}>sim</span>
                      )}
                    </div>
                    <p className="tile-value">
                      {m.value}
                      {m.suffix && <small>{m.suffix}</small>}
                    </p>
                    <p className="tile-sub">{m.sub}</p>
                  </div>
                ))}
              </div>
              <p className="mono" style={{ fontSize: 11, opacity: 0.5, marginTop: 14 }}>
                {METRICS_NOTE}
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <p className="eyebrow">What these events mean</p>
              <p className="lead" style={{ marginTop: 16 }}>
                Every one of these is a decision made ahead of time rather than
                in the moment. <b>Rate limiting arms before the flood</b>, so a
                burst costs nothing.{" "}
                <b>The BM25 postings index is lock-guarded</b>, so a concurrent
                ingest makes a query wait rather than corrupting it.{" "}
                <b>The LLM cache survives restarts</b> because it&apos;s backed by
                SQLite, not a dict that dies with the process.
              </p>
              <p className="lead" style={{ marginTop: 16 }}>
                The one that matters most is the last:{" "}
                <b>when a provider goes down, the pipeline degrades to
                extractive answers and says so</b>. A system that fails honestly
                is worth more than one that fails confidently, and that choice
                only ever appears in the logs — never in the happy path.
              </p>
              <div className="link-row">
                <a className="btn outline" href={PAGE_PATHS.pipeline}>
                  See the full pipeline
                </a>
                <a className="btn outline" href={PAGE_PATHS.work}>
                  See the architecture
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
