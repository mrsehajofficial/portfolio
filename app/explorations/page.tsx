import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CurtainReveal from "@/components/CurtainReveal";
import { EXPLORATIONS } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { PAGE_PATHS } from "@/lib/routes";
import { personEntity } from "@/lib/entity";

export const metadata: Metadata = {
  title: "Explorations: Systems in Active Development",
  description:
    "Current deep-dive projects: Ovyth, a compiled language for automation and AI tooling that beats Python by 2.5x–310x on loops and stays within 1.8x of -O3 C.",
  alternates: { canonical: `${SITE_URL}explorations` },
  openGraph: {
    type: "website",
    title: "Explorations: Systems in Active Development — Sehaj Varma",
    description:
      "Current deep-dive projects and the engineering decisions behind them.",
    url: `${SITE_URL}explorations`,
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      itemListElement: EXPLORATIONS.map((ex, i) => ({
        "@type": "SoftwareSourceCode",
        position: i,
        name: ex.title,
        description: ex.summary,
        codeRepository: ex.sourceUrl,
        programmingLanguage: ex.tags,
        author: { "@type": "Person", name: "Sehaj Varma", url: SITE_URL },
      })),
    },
    personEntity({
      description:
        "AI Automation Engineer building Python backends, LLM agents, RAG pipelines, and a compiled language for automation.",
    }),
  ],
};

export default function ExplorationsPage() {
  return (
    <>
      <Nav />

      <section className="page-head">
        <div className="container">
          <CurtainReveal>
            <p className="eyebrow">Explorations</p>
            <h1 className="page-title">
              Systems I&apos;m deep in, <em>warts and all.</em>
            </h1>
            <p className="lead" style={{ marginTop: 26 }}>
              These aren&apos;t polished case studies — they&apos;re the active
              deep-dives where the interesting edges live. Every section below is
              a full write-up: the problem that started it, the architecture, the
              measured tradeoffs, and the receipts.
            </p>
          </CurtainReveal>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          {EXPLORATIONS.map((ex) => (
            <article className="card" key={ex.id} id={ex.id}>
              <div className="card-body">
                <div className="build-head">
                  <div>
                    <h2 className="build-name">
                      <span className="build-no">{ex.order}</span>
                      {ex.title}
                    </h2>
                    <p className="build-sub">{ex.subtitle}</p>
                  </div>
                  <div className="build-actions">
                    <span className="card-meta" style={{ textTransform: "lowercase" }}>
                      {ex.status}
                    </span>
                    <span className="card-meta">{ex.year}</span>
                  </div>
                </div>

                <p className="result-summary" style={{ marginTop: 0 }}>
                  {ex.summary}
                </p>

                <div className="row" style={{ padding: "26px 0" }}>
                  <span className="row-title">Problem</span>
                  <p className="row-p">{ex.problem}</p>
                </div>

                <div className="row">
                  <span className="row-title">Built</span>
                  <div>
                    <ul style={{ display: "grid", gap: 12, listStyle: "none", paddingLeft: 0 }}>
                      {ex.built.map((item) => (
                        <li key={item.slice(0, 40)}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="row">
                  <span className="row-title">Result</span>
                  <p className="row-p">{ex.result}</p>
                </div>

                <div className="row">
                  <span className="row-title">Tags</span>
                  <div>
                    <div className="tags">
                      {ex.tags.map((t) => (
                        <span className="tag" key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="link-row">
                  <a
                    className="btn primary"
                    href={ex.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source on GitHub ↗
                  </a>
                  {ex.liveUrl && (
                    <a
                      className="btn outline"
                      href={ex.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live demo ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}

          <div className="link-row">
            <a className="btn outline" href={PAGE_PATHS.work}>
              See finished work
            </a>
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
