import type { Metadata } from "next";
import Link from "next/link";
import PressNav from "@/components/PressNav";
import PressFooter from "@/components/PressFooter";
import CurtainReveal from "@/components/CurtainReveal";
import { PROJECTS, EVIDENCE, PERSON } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI, Python & Telegram Projects — Case Studies",
  description:
    "Detailed engineering case studies for Aegis (Telegram group management & business bot) and Amai Yuki (real-time messaging app), plus automation and RAG work.",
  alternates: { canonical: `${SITE_URL}work` },
  openGraph: {
    type: "website",
    title: "AI, Python & Telegram Projects — Case Studies — Sehaj Varma",
    description:
      "Detailed engineering case studies for Aegis (Telegram group management & business bot) and Amai Yuki (real-time messaging app), plus automation and RAG work.",
    url: `${SITE_URL}work`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sehaj Varma — AI Automation Engineer & Backend Developer Portfolio Banner",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": PROJECTS.map((project) => ({
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.subtitle,
    codeRepository: project.sourceUrl,
    programmingLanguage: project.tags,
    author: { "@type": "Person", name: PERSON.name, url: SITE_URL },
  })),
};

export default function WorkPage() {
  return (
    <>
      <PressNav />

      <section className="page-head">
        <div className="container">
          <CurtainReveal>
            <p className="page-eyebrow mono">Form 02 — case studies</p>
            <h1 className="page-h1">
              Production systems — from zero to{" "}
              <em className="accent-over">shipped.</em>
            </h1>
            <p className="lead">
              The full engineering stories behind Aegis (Telegram group management
              &amp; business automation) and Amai Yuki (cross-platform real-time
              messaging). The architectural decisions, tradeoffs, and parts that
              didn&rsquo;t work the first time.
            </p>
          </CurtainReveal>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              id={project.id}
              style={{
                marginTop: idx > 0 ? 80 : 0,
                paddingTop: idx > 0 ? 60 : 0,
                borderTop: idx > 0 ? "1px dashed var(--ink-20)" : "none",
              }}
            >
              <CurtainReveal>
                <p className="form-eyebrow mono" style={{ color: "var(--ink-50)" }}>
                  project {project.projectNo} — {project.title.toLowerCase()}
                </p>
                <h2 className="group-h2" style={{ marginTop: 16 }}>
                  {project.title}: {project.subtitle}
                </h2>
                <p className="case-label mono" style={{ marginTop: 24 }}>
                  the problem
                </p>
                <p className="section-body" style={{ marginTop: 12 }}>
                  {project.problem}
                </p>
              </CurtainReveal>

              {project.buildBlocks && (
                <CurtainReveal delay={0.05}>
                  <p
                    className="case-label mono"
                    style={{ marginTop: 44 }}
                  >
                    the build blocks
                  </p>
                  {project.buildBlocks.map((block) => (
                    <div className="group-row" key={block.label}>
                      <h3 className="group-h2">{block.label}</h3>
                      <p className="section-body" style={{ marginTop: 12 }}>
                        {block.body}
                      </p>
                    </div>
                  ))}
                </CurtainReveal>
              )}

              <CurtainReveal delay={0.05}>
                <p
                  className="case-label mono"
                  style={{ marginTop: 44 }}
                >
                  the result
                </p>
                <div className="plate-card crop" style={{ marginTop: 16 }}>
                  <h3>{project.title}</h3>
                  <p>{project.result}</p>
                  <div className="tag-row" style={{ marginTop: 18 }}>
                    {project.tags.map((t) => (
                      <span className="pill" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 16, marginTop: 22, flexWrap: "wrap" }}>
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                      className="source-link"
                    >
                      view source ↗
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-hover
                        className="source-link"
                        style={{ color: "var(--vermilion)" }}
                      >
                        live showcase ↗
                      </a>
                    )}
                  </div>
                </div>
              </CurtainReveal>
            </div>
          ))}

          <CurtainReveal delay={0.1}>
            <p
              className="eyebrow-late mono"
              style={{ color: "var(--ink-30)", marginTop: 64 }}
            >
              appendix — more evidence
            </p>
            <div className="cards-3" style={{ marginTop: 20 }}>
              {EVIDENCE.map((card) => (
                <div className="plate-card" key={card.id}>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              ))}
            </div>
          </CurtainReveal>

          <CurtainReveal delay={0.1}>
            <div className="link-row">
              <Link href="/stack" data-cursor-hover className="text-link">
                see the full stack page →
              </Link>
              <Link href="/#contact" data-cursor-hover className="text-link dim">
                get in touch →
              </Link>
            </div>
          </CurtainReveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PressFooter />
    </>
  );
}