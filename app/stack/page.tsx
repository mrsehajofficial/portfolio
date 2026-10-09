import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CurtainReveal from "@/components/CurtainReveal";
import { STACK, STACK_NOTE } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Stack: AI, Python, Flask, Flutter & Deployment",
  description:
    "Tools behind the work, grouped by delivery: AI (OpenAI, Gemini, RAG, FAISS), Python/Flask backends, WSGI/gunicorn, automation scripts, Flutter, and deployment across Wasmer, Vercel, Netlify, Render and Docker.",
  alternates: { canonical: `${SITE_URL}stack` },
  openGraph: {
    type: "website",
    title: "Stack: AI, Python, Flask & Deployment — Sehaj Varma",
    description:
      "Tools behind the work, grouped by delivery: AI, Python/Flask backends, automation scripts, Flutter and deployment.",
    url: `${SITE_URL}stack`,
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

const TONE: Record<string, string> = {
  AI: "llm",
  Backend: "ok",
  Automation: "hot",
  Frontend: "warn",
  Deployment: "info",
};

export default function StackPage() {
  return (
    <>
      <Nav />

      <section className="page-head">
        <div className="container">
          <CurtainReveal>
            <p className="eyebrow">The stack</p>
            <h1 className="page-title">
              Grouped by what it <em>delivers.</em>
            </h1>
            <p className="lead" style={{ marginTop: 26 }}>
              Not a logo wall. Everything below is something I&apos;ve shipped or
              relied on in a real project, with the receipt for where it shows
              up.
            </p>
            <p className="lead" style={{ marginTop: 18, color: "var(--ink-3)", fontSize: 15.5 }}>
              <b style={{ color: "var(--ink)" }}>How I choose tools.</b>{" "}
              {STACK_NOTE}
            </p>
          </CurtainReveal>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <div className="stack-grid">
            {STACK.map((group) => (
              <article className="card" key={group.name}>
                <div className="card-head">
                  <span className="card-title">
                    <span className={`dot ${TONE[group.name] ?? "accent"}`} />
                    {group.name}
                  </span>
                </div>
                <div className="card-body">
                  <div className="stack-pills">
                    {group.items.map((item) => (
                      <span className="stack-pill" key={item}>{item}</span>
                    ))}
                  </div>
                  <p className="stack-where">{group.where}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="link-row">
            <a className="btn primary" href="/#builds">See where these ship</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
