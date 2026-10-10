"use client";

import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import ConsoleHero from "@/components/ConsoleHero";
import PipelinePanel from "@/components/PipelinePanel";
import EventStream from "@/components/EventStream";
import BuildGraphs from "@/components/BuildGraphs";
import TakesLog from "@/components/TakesLog";
import ExplorationsPreview from "@/components/ExplorationsPreview";
import StackMonitor from "@/components/StackMonitor";
import ContactTerminal from "@/components/ContactTerminal";
import Footer from "@/components/Footer";
import { LIVE_METRICS, ABOUT } from "@/lib/content";

// The retrieval-widget chunk and its index stay deferred; the hero is already
// the demonstrated retrieval surface, so this one is corroborating detail.
const AskConsoleLazy = dynamic(() => import("@/components/AskConsole"), {
  ssr: false,
  loading: () => null,
});

/**
 * The single-page layout.
 *
 * Every panel demonstrates a capability rather than describing one, but each
 * one is paced so a first-time visitor can read top to bottom without effort:
 * claim, proof, method, evidence, opinions, person, stack, invitation.
 */
export default function PortfolioSections() {
  return (
    <>
      <Nav />
      <main className="page" id="main-content">
        <ConsoleHero metrics={LIVE_METRICS} />
        <PipelinePanel />
        <EventStream />
        <BuildGraphs />
        <ExplorationsPreview />
        <TakesLog />
        <OperatorPanel />
        <StackMonitor />
        <AskConsoleLazy />
        <ContactTerminal />
        <Footer />
      </main>
    </>
  );
}

function OperatorPanel() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">About</p>
          <h2 className="section-title">
            The person <em>behind it.</em>
          </h2>
        </div>

        <div className="hero-grid">
          <div className="card">
            <div className="card-head">
              <span className="card-title">
                <span className="dot accent" />
                In short
              </span>
            </div>
            <div className="card-body">
              <div className="prose">
                {ABOUT.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="pills">
                {ABOUT.pills.map((h) => (
                  <span className="pill" key={h}>{h}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <span className="card-title">
                <span className="dot ok" />
                Track record
              </span>
              <span className="card-meta">monotonic counters</span>
            </div>
            <div className="card-body" style={{ display: "grid", gap: 28 }}>
              {ABOUT.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="stat-value">
                    {stat.value}
                    <span>{stat.suffix}</span>
                  </p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
              <p className="lead" style={{ fontSize: 15.5 }}>
                Based in India, working remotely with anyone, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
