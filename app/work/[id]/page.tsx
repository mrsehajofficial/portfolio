import { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CurtainReveal from "@/components/CurtainReveal";
import { getProject, PROJECT_IDS, Project } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { PAGE_PATHS } from "@/lib/routes";
import { personEntity } from "@/lib/entity";

export const dynamicParams = false;

export async function generateStaticParams() {
  return PROJECT_IDS.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title}: ${project.subtitle}`,
    description: project.problem.slice(0, 160),
    alternates: { canonical: `${SITE_URL}work/${id}` },
    openGraph: {
      type: "website",
      title: `${project.title} — Sehaj Varma`,
      description: project.subtitle,
      url: `${SITE_URL}work/${id}`,
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
}

const jsonLd = (project: Project) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareSourceCode",
      name: project.title,
      description: project.subtitle,
      codeRepository: project.sourceUrl,
      programmingLanguage: project.tags,
      author: { "@type": "Person", name: "Sehaj Varma", url: SITE_URL },
    },
    personEntity({
      description: `Sehaj Varma builds ${project.title}, ${project.subtitle}.`,
    }),
  ],
});

/**
 * Individual project page — the full case study for a single build.
 * Reuses the design language of /work but renders one project with its
 * complete problem/built/result narrative, architecture nodes (where
 * available), and build blocks.
 */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) notFound();

  return (
    <>
      <Nav />

      <section className="page-head">
        <div className="container">
          <CurtainReveal>
            <p className="eyebrow">Project {project.projectNo}</p>
            <h1 className="page-title">
              {project.title} — <em>{project.subtitle}</em>
            </h1>
            <p className="lead" style={{ marginTop: 26 }}>
              {project.problem}
            </p>
          </CurtainReveal>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <div className="card">
            <div className="card-head">
              <span className="card-title">
                <span className="dot accent" />
                What was built
              </span>
              <span className="card-meta">{project.built.length} blocks</span>
            </div>
            <div className="card-body">
              {project.built.map((item) => (
                <p className="row-p" key={item.slice(0, 60)}>
                  {item}
                </p>
              ))}
            </div>
          </div>

           <div className="card">
            <div className="card-head">
              <span className="card-title">
                <span className="dot accent" />
                The problem
              </span>
              <span className="card-meta">why this exists</span>
            </div>
            <div className="card-body">
              <p className="lead">
                {project.problem}
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <span className="card-title">
                <span className="dot warn" />
                Why it had to be built
              </span>
              <span className="card-meta">the design constraint</span>
            </div>
            <div className="card-body">
              <p className="lead">
                {project.why}
              </p>
            </div>
          </div>

          {project.buildBlocks && project.buildBlocks.length > 0 && (
            <div className="card">
              <div className="card-head">
                <span className="card-title">
                  <span className="dot info" />
                  Architecture blocks
                </span>
                <span className="card-meta">
                  {project.buildBlocks.length} components
                </span>
              </div>
              <div className="card-body">
                {project.buildBlocks.map((block) => (
                  <div className="row" key={block.label}>
                    <span className="row-title">{block.label}</span>
                    <p className="row-p">{block.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.metrics && (
            <div className="cards-3">
              <div className="card">
                <div className="card-body">
                  <p className="stat-value">{project.metrics.tests}</p>
                  <p className="stat-label">Tests</p>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <p className="stat-value">{project.metrics.coverage}</p>
                  <p className="stat-label">Coverage</p>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <p className="stat-value">{project.metrics.deploy}</p>
                  <p className="stat-label">Deployed</p>
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <div className="card-body">
              <p className="eyebrow">Outcome</p>
              <p className="lead" style={{ marginTop: 16 }}>
                {project.result}
              </p>
            </div>
          </div>

          <div className="tags">
            {project.tags.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>

          <div className="link-row">
            <a
              className="btn primary"
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source on GitHub ↗
            </a>
            {project.liveUrl && (
              <a
                className="btn outline"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live demo ↗
              </a>
            )}
            <a className="btn outline" href={PAGE_PATHS.work}>
              All projects
            </a>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(project)) }}
      />

      <Footer />
    </>
  );
}
