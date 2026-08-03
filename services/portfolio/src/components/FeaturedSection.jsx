import './FeaturedSection.css';
import ProjectCard from './ProjectCard';

export default function FeaturedSection({ projects }) {
  const hero = projects.find(p => p.featuredRole === 'hero');
  const halves = projects.filter(p => p.featuredRole === 'half');

  return (
    <section className="featured-section">
      <div className="section-label">// Featured</div>
      <div className="featured-grid">
        {hero && (
          <div className="featured-hero">
            <ProjectCard project={hero} featured />
          </div>
        )}
        {halves.map(p => (
          <ProjectCard key={p.id} project={p} featured />
        ))}
      </div>
    </section>
  );
}
