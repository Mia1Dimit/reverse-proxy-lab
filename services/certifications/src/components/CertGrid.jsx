import { useState } from 'react';
import { CERTIFICATIONS } from '../data/certifications';
import CertCard from './CertCard';
import LearningPath from './LearningPath';
import './CertGrid.css';

const FILTERS = ['All', 'AWS', 'Azure', 'In Progress', 'Other'];

function filterCerts(certs, active) {
  if (active === 'All') return certs.filter(c => c.status !== 'expired');
  if (active === 'In Progress') return certs.filter(c => c.status === 'in-progress');
  return certs.filter(c => c.tag === active && c.status !== 'expired');
}

export default function CertGrid() {
  const [active, setActive] = useState('All');
  const visible = filterCerts(CERTIFICATIONS, active);

  return (
    <section className="cert-section">
      <header className="cert-header">
        <div>
          <h1>Certifications</h1>
          <p className="cert-subtitle">Verified knowledge, verified by code.</p>
        </div>
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

      <LearningPath />
    </section>
  );
}
