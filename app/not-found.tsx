import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found — Sehaj Varma",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="page-head" style={{ minHeight: "70vh" }}>
      <div className="container">
        <p className="eyebrow">Error 404 — nothing found</p>
        <h1 className="page-title" style={{ marginTop: 22 }}>
          This path leads <em>nowhere.</em>
        </h1>
        <p className="lead" style={{ marginTop: 26 }}>
          The page you&apos;re after was moved, renamed, or never existed. Same
          behaviour as the retrieval engine on the home page —{" "}
          <b>it refuses to guess.</b>
        </p>
        <div className="link-row">
          <Link className="btn primary" href="/">Back to the portfolio</Link>
        </div>
      </div>
    </section>
  );
}
