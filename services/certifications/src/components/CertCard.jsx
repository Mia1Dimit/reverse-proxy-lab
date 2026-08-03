import { useState } from 'react';
import './CertCard.css';

function ActiveCard({ cert }) {
  return (
    <div className="cert-card active" tabIndex={0} aria-label={cert.name}>
      <div className="cert-card-inner">
        <div className="cert-face cert-front">
          <div className="cert-badge-placeholder" aria-hidden="true">{cert.tag}</div>
          <div className="cert-front-meta">
            <span className="cert-code">{cert.code}</span>
            <span className="cert-active-dot" aria-label="Active">&#9679; Active</span>
          </div>
          <h3 className="cert-name">{cert.name}</h3>
          <p className="cert-issuer">{cert.issuer}</p>
        </div>

        <div className="cert-face cert-back">
          <dl className="cert-details">
            <dt>Issued</dt>   <dd>{cert.issued}</dd>
            {cert.expires && <><dt>Expires</dt><dd>{cert.expires}</dd></>}
            <dt>Credential ID</dt><dd className="cert-mono">{cert.credentialId}</dd>
          </dl>
          <a
            className="cert-verify"
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Verify →
          </a>
        </div>
      </div>
    </div>
  );
}

function InProgressCard({ cert }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="cert-card in-progress"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      aria-label={`${cert.name} — in progress`}
    >
      <div className="cert-badge-placeholder greyed" aria-hidden="true">{cert.tag}</div>
      <h3 className="cert-name">{cert.name}</h3>
      <p className="cert-issuer">{cert.issuer}</p>
      <div className="cert-progress-wrap" role="progressbar" aria-valuenow={cert.progress} aria-valuemin={0} aria-valuemax={100}>
        <div className="cert-progress-track">
          <div
            className="cert-progress-bar"
            style={{ width: hovered ? `${cert.progress}%` : '0%' }}
          />
        </div>
        <span className="cert-progress-label">{cert.progress}%</span>
      </div>
      <p className="cert-target">Target: {cert.targetDate}</p>
    </div>
  );
}

export default function CertCard({ cert }) {
  if (cert.status === 'in-progress') return <InProgressCard cert={cert} />;
  return <ActiveCard cert={cert} />;
}
