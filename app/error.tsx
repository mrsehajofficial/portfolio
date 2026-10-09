"use client";

import { useEffect } from "react";

type Props = { error: Error & { digest?: string }; reset: () => void };

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error("[portfolio] Unhandled UI error:", error);
  }, [error]);

  return (
    <section className="page-head" style={{ minHeight: "70vh" }}>
      <div className="container">
        <p className="eyebrow" style={{ color: "var(--alert)" }}>
          Error 500 — something broke
        </p>
        <h1 className="page-title" style={{ marginTop: 22 }}>
          That&apos;s on <em>me.</em>
        </h1>
        <p className="lead" style={{ marginTop: 26 }}>
          An unexpected error interrupted this view. Retrying usually fixes it —
          if it keeps happening, tell me straight and I&apos;ll fix it properly.
        </p>
        <div className="link-row">
          <button className="btn primary" onClick={reset}>Try again</button>
          <a className="btn outline" href="mailto:mr.sehaj.official@gmail.com">
            Report by email
          </a>
        </div>
        {error.digest && (
          <p className="mono" style={{ marginTop: 32 }}>
            reference: {error.digest}
          </p>
        )}
      </div>
    </section>
  );
}
