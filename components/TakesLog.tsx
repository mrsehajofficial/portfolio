import { OPINIONS } from "@/lib/content";

/**
 * TakesLog — opinions formed in production.
 * Deliberately contrarian, deliberately specific. Some visitors will
 * disagree; a portfolio nobody disagrees with is one nobody remembers.
 */
export default function TakesLog() {
  return (
    <section className="section" id="philosophy">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Engineering takes</p>
          <h2 className="section-title">
            Opinions earned the <em>expensive way.</em>
          </h2>
          <p className="lead section-note">
            Not design preferences — these are tradeoffs made when a demo met
            real load. You&apos;re welcome to disagree, but ship the alternative
            first.
          </p>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="takes">
              {OPINIONS.map((o, i) => (
                <div className="take" key={o.take.slice(0, 40)}>
                  <span className="take-no">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="take-title">{o.take}</h3>
                    <p className="take-body">{o.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
