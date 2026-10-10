import Link from "next/link";
import { EXPLORATIONS } from "@/lib/content";
import { PAGE_PATHS } from "@/lib/routes";

/**
 * ExplorationsPreview — what's on the bench right now.
 * Small preview cards on the homepage that link through to the full
 * /explorations page for each project.
 */
export default function ExplorationsPreview() {
  return (
    <section className="section" id="explorations">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Explorations</p>
          <h2 className="section-title">
            What I&apos;m building <em>right now.</em>
          </h2>
          <p className="lead section-note">
            Not a resume project — these are the systems I&apos;m deep in,
            warts and all. Every node below links through to the full write-up.
          </p>
        </div>

        <div className="builds">
          {EXPLORATIONS.map((ex) => (
            <article className="card" key={ex.id}>
              <div className="card-body">
                <div className="build-head" style={{ marginBottom: 20 }}>
                  <div>
                    <h3 className="build-name">
                      <span className="build-no">{ex.order}</span>
                      {ex.title}
                    </h3>
                    <p className="build-sub">{ex.subtitle}</p>
                  </div>
                  <div className="build-actions">
                    <span className="card-meta" style={{ textTransform: "lowercase" }}>
                      {ex.status}
                    </span>
                  </div>
                </div>

                <p className="result-summary" style={{ marginTop: 0 }}>
                  {ex.summary}
                </p>

                <div className="tags">
                  {ex.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>

                <div className="link-row" style={{ marginTop: 22 }}>
                  <Link
                    className="btn-ghost primary"
                    href={`${PAGE_PATHS.explorations}${ex.id === "ovyth" ? "" : `#${ex.id}`}`}
                  >
                    Full project ↗
                  </Link>
                  <a
                    className="btn-ghost"
                    href={ex.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="link-row" style={{ marginTop: 32 }}>
          <Link className="btn primary" href={PAGE_PATHS.explorations}>
            All explorations
          </Link>
        </div>
      </div>
    </section>
  );
}
