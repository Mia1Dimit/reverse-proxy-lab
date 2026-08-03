import './FilterBar.css';

const CATEGORIES = ['All', 'Platform Engineering', 'Infrastructure', 'AI & Intelligence', 'Automation', 'Research & Sensing'];
const STATUSES   = ['All', 'Live', 'Research', 'WIP'];

export default function FilterBar({ activeCategory, setActiveCategory, activeStatus, setActiveStatus }) {
  return (
    <div className="filter-bar" role="search" aria-label="Filter portfolio">
      <div className="filter-row">
        {CATEGORIES.map(c => (
          <button
            key={c}
            className={`pill ${activeCategory === c ? 'active' : ''}`}
            onClick={() => setActiveCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="filter-row filter-row--status">
        {STATUSES.map(s => (
          <button
            key={s}
            className={`pill pill--status ${activeStatus === s ? 'active' : ''} status-${s.toLowerCase()}`}
            onClick={() => setActiveStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
