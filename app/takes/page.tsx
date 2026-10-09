import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CurtainReveal from "@/components/CurtainReveal";
import { OPINIONS } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { PAGE_PATHS } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Engineering Takes: Opinions Earned in Production",
  description:
    "Contrarian engineering positions formed by shipping: why frameworks move work rather than save it, why untested projects don't exist, owning protocol layers, and why SQLite until it genuinely hurts.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATHS.takes.slice(1)}` },
  openGraph: {
    type: "website",
    title: "Engineering Takes: Opinions Earned in Production — Sehaj Varma",
    description:
      "Tradeoffs made when a demo met real load — frameworks, tests, protocol ownership, SQLite, and automation nobody remembers.",
    url: `${SITE_URL}${PAGE_PATHS.takes.slice(1)}`,
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
 * The takes route — the long-form version of the opinions panel on the
 * homepage. Each entry is the claim, the reasoning, and (below) the
 * counter-argument, because a take you can't state against yourself is
 * just a preference.
 */
export default function TakesPage() {
  return (
    <>
      <Nav />

      <section className="page-head">
        <div className="container">
          <CurtainReveal>
            <p className="eyebrow">Engineering takes</p>
            <h1 className="page-title">
              Opinions earned the <em>expensive way.</em>
            </h1>
            <p className="lead" style={{ marginTop: 26 }}>
              Not design preferences — these are tradeoffs made when a demo met
              real load. Every one of them is a position I&apos;ll defend in a
              code review, and every one of them has a case against it worth
              stating honestly.
            </p>
          </CurtainReveal>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <div className="card">
            <div className="card-head">
              <span className="card-title">
                <span className="dot llm" />
                The takes
              </span>
              <span className="card-meta">{OPINIONS.length} entries</span>
            </div>
            <div className="card-body">
              {OPINIONS.map((o, i) => (
                <div className="take" key={o.take.slice(0, 40)}>
                  <span className="take-no">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 className="take-title">{o.take}</h2>
                    <p className="take-body">{o.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <p className="eyebrow">The honest counter-argument</p>
              <p className="lead" style={{ marginTop: 16 }}>
                Every take above has a defensible opposite, and the opposite is
                right for someone. Frameworks genuinely do save time when a
                team changes and the conventions are already written down.
                Postgres genuinely is the better choice the moment you have
                concurrent writers on a multi-GB dataset. And a rented protocol
                buys you a support channel you don&apos;t have to staff.
              </p>
              <p className="lead" style={{ marginTop: 16 }}>
                What ties the takes together is a single preference:{" "}
                <b>I would rather understand a smaller system completely than
                operate a larger one by trial and error.</b> If your scaling
                path requires the opposite trade, we would disagree — and
                neither of us would be wrong.
              </p>
              <div className="link-row">
                <a className="btn primary" href={PAGE_PATHS.work}>
                  See how it shows up in the work
                </a>
                <a className="btn outline" href={PAGE_PATHS.pipeline}>
                  Read the pipeline design
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
