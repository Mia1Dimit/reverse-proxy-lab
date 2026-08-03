import { useState } from 'react';
import { CERTIFICATIONS } from '../data/certifications';
import CertCard from './CertCard';
import './CertGrid.css';

const FILTERS = ['All', 'AWS', 'Azure', 'Other'];

export default function CertGrid() {
  const [active, setActive] = useState('All');

  const visible = active === 'All'
    ? CERTIFICATIONS
    : CERTIFICATIONS.filter(c => c.tag === active);

  return (
    <section className="cert-section">
      <header className="cert-header">
        <h1>Certifications</h1>
        <div className="cert-filters" role="group" aria-label="Filter by provider">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-pill ${active === f ? 'active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <ul className="cert-grid" role="list">
        {visible.map(cert => (
          <li key={cert.id}>
            <CertCard cert={cert} />
          </li>
        ))}
      </ul>
    </section>
  );
}
