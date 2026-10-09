import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CurtainReveal from "@/components/CurtainReveal";
import { BUILD_GRAPHS } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work: Systems from Zero to Shipped",
  description:
    "Architecture and engineering decisions behind Aegis (Telegram group management & business automation), Amai Yuki (real-time messaging app), and a production hybrid RAG pipeline — every node is a real component.",
  alternates: { canonical: `${SITE_URL}work` },
  openGraph: {
    type: "website",
    title: "Work: Systems from Zero to Shipped — Sehaj Varma",
    description:
      "Aegis, Amai Yuki, and a production hybrid RAG pipeline — drawn as their architectures, with the decision each design followed from.",
    url: `${SITE_URL}work`,
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": BUILD_GRAPHS.map((build) => ({
    "@type": "SoftwareSourceCode",
    name: build.title,
    description: build.subtitle,
    codeRepository: build.sourceUrl,
    programmingLanguage: build.tags,
    author: { "@type": "Person", name: "Sehaj Varma", url: SITE_URL },
  })),
};

export default function WorkPage() {
  return (
    <>
      <Nav />

      <section className="page-head">
        <div className="container">
          <CurtainReveal>
            <p className="eyebrow">Selected work</p>
            <h1 className="page-title">
              Three systems, drawn the way they <em>actually run.</em>
            </h1>
            <p className="lead" style={{ marginTop: 26 }}>
              The architectural decisions, the tradeoffs made explicit, and the
              load-bearing choice behind each one. Every node below is a real
              component — <b>nothing here is illustrative.</b>
            </p>
          </CurtainReveal>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          {BUILD_GRAPHS.map((build) => (
            <article className="card" key={build.id} id={build.id}>
              <div className="card-body">
                <div className="build-head">
                  <div>
                    <h2 className="build-name">
                      <span className="build-no">{build.order}</span>
                      {build.title}
                    </h2>
                    <p className="build-sub">{build.subtitle}</p>
                  </div>
                  <div className="build-actions">
                    <a className="btn-ghost" href={build.sourceUrl} target="_blank" rel="noopener noreferrer">
                      Source
                    </a>
                    {build.liveUrl && (
                      <a className="btn-ghost primary" href={build.liveUrl} target="_blank" rel="noopener noreferrer">
                        Live ↗
                      </a>
                    )}
                  </div>
                </div>

                <div className="nodes" style={{ marginTop: 28 }}>
                  {build.nodes.map((node, i) => (
                    <div className="node" key={node.name}>
                      <div className="node-top">
                        <span className="node-no">{String(i + 1).padStart(2, "0")}</span>
                        <span className={`dot ${node.tone ?? "accent"}`} />
                      </div>
                      <p className="node-name">{node.name}</p>
                      {node.sub && <p className="node-sub">{node.sub}</p>}
                      {node.metric && <p className="node-metric">{node.metric}</p>}
                    </div>
                  ))}
                </div>

                <p className="note">
                  <b>Load-bearing decision.</b> {build.note}
                </p>

                <div className="tags">
                  {build.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}

          <div className="link-row">
            <a className="btn primary" href="/#contact">Start a conversation</a>
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
