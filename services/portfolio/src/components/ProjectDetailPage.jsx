import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { PROJECT_DETAILS, PROJECT_USE_CASES } from '../data/projectDetails';
import './ProjectDetailPage.css';

const STATUS_COLOUR = { live: '#22c55e', research: 'var(--color-secondary)', wip: 'var(--color-text-muted)' };

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = PROJECTS.find(p => p.slug === slug);
  const summary = PROJECT_DETAILS[slug];
  const useCase = PROJECT_USE_CASES[slug];

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
          {project.inProgress && (
            <span className="detail-status" style={{ color: STATUS_COLOUR.wip }}>WIP</span>
          )}
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

      <section className="detail-section">
        <h2 className="detail-section-title">// About the project</h2>
        <p className="detail-text">{summary || 'Summary unavailable.'}</p>
      </section>

      <section className="detail-section">
        <h2 className="detail-section-title">// Use Case</h2>
        <p className="detail-text">{useCase}</p>
      </section>
    </article>
  );
}
