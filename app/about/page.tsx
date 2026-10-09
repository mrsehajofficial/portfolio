import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CurtainReveal from "@/components/CurtainReveal";
import { ABOUT, OPINIONS, PERSON, CONTACT } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { personEntity } from "@/lib/entity";

export const metadata: Metadata = {
  title: "About & Engineering Philosophy",
  description:
    "How Sehaj works: AI automation, LLM agents, RAG pipelines, Python/Flask backends — plus engineering opinions earned in production. Based in India, open to remote worldwide.",
  alternates: { canonical: `${SITE_URL}about` },
  openGraph: {
    type: "website",
    title: "About & Engineering Philosophy — Sehaj Varma",
    description:
      "AI automation, LLM agents, RAG pipelines, Python/Flask backends, and engineering opinions earned in production.",
    url: `${SITE_URL}about`,
    images: [
      {
        url: "/og-image-v3.png",
        width: 1200,
        height: 630,
        alt: "Sehaj Varma — AI Automation Engineer & Backend Developer Portfolio Banner",
      },
    ],
  },
};

const WORKFLOW = [
  {
    title: "Understand the workflow first",
    body: "Before any code, I map the exact steps a human does today. That transcript — screenshots, logs, the half-remembered spreadsheet step — is the real spec.",
  },
  {
    title: "Ship something that runs today",
    body: "A working script that handles the happy path beats a perfect design still on paper. I get it running, then make it robust.",
  },
  {
    title: "Make it repeatable",
    body: "Input validation, clean schemas, scheduled runs — so the fix keeps working after I step away. The best automation is the one nobody has to babysit.",
  },
  {
    title: "Document like future me is reading",
    body: "Write-ups thorough enough that collaborators can read the codebase without asking questions. I hold every private script to this, not just the public ones.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}about#aboutpage`,
      url: `${SITE_URL}about`,
      name: "About Sehaj Varma — AI Automation Engineer & Backend Developer",
      inLanguage: "en",
      mainEntity: { "@id": `${SITE_URL}#sehaj-varma` },
      dateModified: new Date().toISOString().slice(0, 10),
    },
    personEntity({
      description:
        "Sehaj Varma builds AI automation, LLM agents, RAG pipelines, and Python/Flask backends that turn manual workflows into reliable software.",
    }),
  ],
};

export default function AboutPage() {
  return (
    <>
      <Nav />

      <section className="page-head">
        <div className="container">
          <CurtainReveal>
            <p className="eyebrow">About</p>
            <h1 className="page-title">
              I like problems with <em>edges.</em> Software has the most edges.
            </h1>
            <p className="lead" style={{ marginTop: 26 }}>
              {PERSON.locationLine}. Below: how I work, what I believe about
              building software, and the numbers I keep honest.
            </p>
          </CurtainReveal>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <div className="card">
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
                <span className="dot accent" />
                How I work
              </span>
              <span className="card-meta">{WORKFLOW.length} stages</span>
            </div>
            <div className="card-body">
              {WORKFLOW.map((step, i) => (
                <div className="row" key={step.title} style={{ padding: "26px 0" }}>
                  <span className="row-title">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="row-h">{step.title}</h3>
                    <p className="row-p">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <span className="card-title">
                <span className="dot llm" />
                Engineering takes
              </span>
              <span className="card-meta">{OPINIONS.length} entries</span>
            </div>
            <div className="card-body">
              <div className="takes">
                {OPINIONS.map((o, i) => (
                  <div className="take" key={o.take.slice(0, 40)}>
                    <span className="take-no">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="take-title">{o.take}</h3>
                      <p className="take-body">{o.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="cards-3">
            {ABOUT.stats.map((stat) => (
              <div className="card" key={stat.label}>
                <div className="card-body">
                  <p className="stat-value">
                    {stat.value}
                    <span>{stat.suffix}</span>
                  </p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-body">
              <p className="eyebrow">Availability</p>
              <p className="lead" style={{ marginTop: 16 }}>
                Currently available for <b>{CONTACT.availability.join(", ")}</b>.{" "}
                {CONTACT.status}.
              </p>
              <div className="link-row">
                <a className="btn primary" href={`mailto:${PERSON.email}`}>
                  {PERSON.email}
                </a>
                <a
                  className="btn outline"
                  href={PERSON.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Footer />
    </>
  );
}
