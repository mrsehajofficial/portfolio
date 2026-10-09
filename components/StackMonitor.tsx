import { STACK, STACK_NOTE } from "@/lib/content";

const TONE: Record<string, string> = {
  AI: "llm",
  Backend: "ok",
  Automation: "hot",
  Frontend: "warn",
  Deployment: "info",
};

const STATUS: Record<string, string> = {
  AI: "in production",
  Backend: "in production",
  Automation: "in production",
  Frontend: "shipped",
  Deployment: "in production",
};

/**
 * StackMonitor — capabilities as subsystems.
 * Grouped by what gets delivered rather than by tool, with the receipt for
 * where each one shows up.
 */
export default function StackMonitor() {
  return (
    <section className="section" id="stack">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">The stack</p>
          <h2 className="section-title">
            Grouped by what it <em>delivers.</em>
          </h2>
          <p className="lead section-note">
            No logo wall. Every tool below is something I&apos;ve shipped or
            relied on in a real project, with the note about where it shows up.
          </p>
        </div>

        <div className="stack-grid">
          {STACK.map((group) => (
            <article className="card lift" key={group.name}>
              <div className="card-head">
                <span className="card-title">
                  <span className={`dot ${TONE[group.name] ?? "accent"}`} />
                  {group.name}
                </span>
                <span className="card-meta">{STATUS[group.name] ?? "in use"}</span>
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

        <p className="lead" style={{ marginTop: 40, maxWidth: "78ch" }}>
          <b>How I choose tools.</b> {STACK_NOTE}
        </p>
      </div>
    </section>
  );
}
