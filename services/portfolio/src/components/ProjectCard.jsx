import { track } from '../analytics';
import './ProjectCard.css';

const STATUS_META = {
  live:     { label: 'LIVE',     symbol: '●', cls: 'status-live'     },
  research: { label: 'RESEARCH', symbol: '◆', cls: 'status-research' },
  wip:      { label: 'WIP',      symbol: '○', cls: 'status-wip'      },
};

function ComplexityBar({ value, reason }) {
  return (
    <div className="complexity" title={reason}>
      <span className="complexity-label">complexity</span>
      <div className="complexity-bar">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < value ? 'seg filled' : 'seg empty'}>█</span>
        ))}
        <span className="complexity-score">{value}/5</span>
      </div>
    </div>
  );
}

function SpecialBadge() {
  return (
    <div className="special-badge" title="Yes, this is on purpose.">
      ⚠ Intentional Overkill
    </div>
  );
}

export default function ProjectCard({ project, featured = false }) {
  const status = STATUS_META[project.status];

  return (
    <article
      className={`project-card ${featured ? 'featured' : ''} ${project.special ? 'special' : ''}`}
      onClick={() => { track('project-click', { slug: project.slug }); window.location.href = `/portfolio/${project.slug}`; }}
      style={{ cursor: 'pointer' }}
    >
      {featured && <span className="featured-tag">FEATURED</span>}

      <div className="card-top">
        <span className="card-category">{project.category}</span>
        <span className={`card-status ${status.cls}`}>
          {status.symbol} {status.label}
        </span>
      </div>

      <h3 className={`card-title ${featured ? 'card-title--featured' : ''}`}>
        {project.name}
      </h3>

      {featured && project.architectureNote && (
        <p className="card-arch-note">{project.architectureNote}</p>
      )}

      <p className="card-description">{project.description}</p>

      {project.metric && (
        <p className="card-metric">{project.metric}</p>
      )}

      <div className="card-badges">
        {project.techStack.slice(0, 5).map(t => (
          <span key={t} className="tech-badge">{t}</span>
        ))}
        {project.techStack.length > 5 && (
          <span className="tech-badge badge-more">+{project.techStack.length - 5}</span>
        )}
      </div>

      {project.special
        ? <SpecialBadge />
        : project.complexity != null && (
            <ComplexityBar value={project.complexity} reason={project.complexityReason} />
          )
      }

      <p className="card-stack-position">{project.stackPosition}</p>

      <div className="card-cta" onClick={e => e.stopPropagation()}>
        <a className="btn btn-primary" href={`/portfolio/${project.slug}`}>→ Case study</a>
        <a className="btn btn-ghost" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
      </div>
    </article>
  );
}
