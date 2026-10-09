import { BUILD_GRAPHS } from "@/lib/content";

/**
 * BuildGraphs — projects as their architecture.
 *
 * Each system is drawn as its components. The metric under a node is the
 * property that made it worth building that way, and the highlighted note is
 * the decision the rest of the design followed from.
 */
export default function BuildGraphs() {
  return (
    <section className="section" id="builds">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Selected work</p>
          <h2 className="section-title">
            Three systems, drawn the way they <em>actually run.</em>
          </h2>
          <p className="lead section-note">
            Every node below is a component that exists in the repository, and
            the caption under it is the property that shaped the design. No
            mockups, no placeholder screenshots — the graph is the case study.
          </p>
        </div>

        <div className="builds">
          {BUILD_GRAPHS.map((build) => (
            <article className="card" key={build.id} id={`build-${build.id}`}>
              <div className="card-body">
                <div className="build-head">
                  <div>
                    <h3 className="build-name">
                      <span className="build-no">{build.order}</span>
                      {build.title}
                    </h3>
                    <p className="build-sub">{build.subtitle}</p>
                  </div>
                  <div className="build-actions">
                    <a
                      className="btn-ghost"
                      href={build.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source
                    </a>
                    {build.liveUrl && (
                      <a
                        className="btn-ghost primary"
                        href={build.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live ↗
                      </a>
                    )}
                  </div>
                </div>

                <div className="nodes" style={{ marginTop: 28 }}>
                  {build.nodes.map((node, i) => (
                    <div className="node" key={node.name}>
                      <div className="node-top">
                        <span className="node-no">
                          {String(i + 1).padStart(2, "0")}
                        </span>
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
        </div>
      </div>
    </section>
  );
}
