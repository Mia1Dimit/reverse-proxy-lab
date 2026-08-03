import './ProjectSection.css';
import ProjectCard from './ProjectCard';

export default function ProjectSection({ category, projects, activeCategory, activeStatus }) {
  const categoryMatch = activeCategory === 'All' || activeCategory === category;
  const statusFilter  = activeStatus === 'All' ? null : activeStatus.toLowerCase();
  const visible = statusFilter
    ? projects.filter(p => p.status === statusFilter)
    : projects;

  // Section collapses when a different category is active
  const collapsed = !categoryMatch;

  return (
    <section className="project-section">
      <div className="section-header">
        <span className="section-rule" aria-hidden="true">// {category}</span>
        <span className="section-rule-line" aria-hidden="true" />
        {collapsed && <span className="section-filtered-hint">filtered</span>}
      </div>

      {/* CSS grid-template-rows 0fr trick for smooth collapse without JS height calc */}
      <div className={`section-body ${collapsed ? 'collapsed' : ''}`}>
        <div className="section-body-inner">
          <ul className="section-grid" role="list">
            {visible.map(p => (
              <li key={p.id} className={statusFilter && p.status !== statusFilter ? 'card-hidden' : ''}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
          {visible.length === 0 && (
            <p className="section-empty">No {activeStatus.toLowerCase()} projects in this category.</p>
          )}
        </div>
      </div>
    </section>
  );
}
