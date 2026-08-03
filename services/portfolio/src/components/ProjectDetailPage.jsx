import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { PROJECT_DETAILS } from '../data/projectDetails';
import './ProjectDetailPage.css';

const STATUS_COLOUR = { live: '#22c55e', research: 'var(--color-secondary)', wip: 'var(--color-text-muted)' };

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = PROJECTS.find(p => p.slug === slug);
  const detail  = PROJECT_DETAILS[slug];

  if (!project) {
    return (
      <div className="detail-not-found">
        <p>Project not found.</p>
        <Link to="/">← Back to portfolio</Link>
      </div>
    );
  }

  return (
    <article className="detail-page">
      {/* Back link */}
      <Link className="detail-back" to="/">← Portfolio</Link>

      {/* Header */}
      <header className="detail-header">
        <div className="detail-meta">
          <span className="detail-category">{project.category}</span>
          <span className="detail-status" style={{ color: STATUS_COLOUR[project.status] }}>
            {project.status.toUpperCase()}
          </span>
        </div>
        <h1 className="detail-title">{project.name}</h1>
        {project.architectureNote && (
          <p className="detail-arch-note">{project.architectureNote}</p>
        )}

        <div className="detail-ctas">
          {project.liveUrl && (
            <a className="btn btn-primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Visit live site ↗
            </a>
          )}
          <a className="btn btn-ghost" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
        </div>
      </header>

      {/* Tech badges */}
      <section className="detail-section">
        <div className="detail-badges">
          {project.techStack.map(t => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>
      </section>

      {!detail ? (
        <p className="detail-placeholder">Case study coming soon.</p>
      ) : (
        <>
          {/* The Why */}
          <section className="detail-section">
            <h2 className="detail-section-title">// The problem</h2>
            <p className="detail-text">{detail.why}</p>
          </section>

          {/* Key decisions */}
          <section className="detail-section">
            <h2 className="detail-section-title">// Key decisions</h2>
            <ul className="detail-decisions">
              {detail.decisions.map(d => (
                <li key={d.title} className="decision-card">
                  <h3 className="decision-title">{d.title}</h3>
                  <p className="decision-detail">{d.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Tech rationale */}
          <section className="detail-section">
            <h2 className="detail-section-title">// Stack rationale</h2>
            <dl className="detail-rationale">
              {detail.techRationale.map(t => (
                <div key={t.tech} className="rationale-row">
                  <dt className="rationale-tech">{t.tech}</dt>
                  <dd className="rationale-reason">{t.reason}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Outcome */}
          {detail.outcome && (
            <section className="detail-section detail-outcome">
              <h2 className="detail-section-title">// Outcome</h2>
              <p className="detail-text detail-text--accent">{detail.outcome}</p>
            </section>
          )}
        </>
      )}
    </article>
  );
}
