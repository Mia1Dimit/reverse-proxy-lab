import { useState } from 'react';
import FilterBar from './FilterBar';
import FeaturedSection from './FeaturedSection';
import ProjectSection from './ProjectSection';
import Footer from './Footer';
import { PROJECTS, SECTIONS, sortByStatus } from '../data/projects';
import './PortfolioPage.css';

const featured   = PROJECTS.filter(p => p.featured);
const byCategory = category => sortByStatus(PROJECTS.filter(p => p.category === category && !p.featured));

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStatus,   setActiveStatus]   = useState('All');

  return (
    <div className="portfolio-page">
      <header className="portfolio-header">
        <h1 className="portfolio-title">Portfolio</h1>
        <p className="portfolio-subtitle">Built across the full stack. Literally.</p>
      </header>

      <FilterBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
      />

      <div className="portfolio-content">
        {(activeCategory === 'All') && (
          <FeaturedSection projects={featured} />
        )}

        {SECTIONS.map(section => (
          <ProjectSection
            key={section}
            category={section}
            projects={byCategory(section)}
            activeCategory={activeCategory}
            activeStatus={activeStatus}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
