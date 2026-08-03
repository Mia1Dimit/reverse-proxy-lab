import { useState } from 'react';
import './CertCard.css';

export default function CertCard({ cert }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`cert-card ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(f => !f)}
      onKeyDown={e => e.key === 'Enter' && setFlipped(f => !f)}
      role="button"
      tabIndex={0}
      aria-label={`${cert.name} — click to see details`}
    >
      <div className="cert-card-inner">
        {/* Front */}
        <div className="cert-face cert-front">
          <div className="cert-badge-placeholder" aria-hidden="true">
            {cert.tag}
          </div>
          <h3 className="cert-name">{cert.name}</h3>
          <p className="cert-issuer">{cert.issuer}</p>
          <span className="cert-hint">Click for details</span>
        </div>

        {/* Back */}
        <div className="cert-face cert-back">
          <dl className="cert-details">
            <dt>Issued</dt>
            <dd>{cert.issued}</dd>
            {cert.expires && <><dt>Expires</dt><dd>{cert.expires}</dd></>}
            <dt>Credential ID</dt>
            <dd className="cert-mono">{cert.credentialId}</dd>
          </dl>
          <a
            className="cert-verify"
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
          >
            Verify →
          </a>
        </div>
      </div>
    </div>
  );
}
