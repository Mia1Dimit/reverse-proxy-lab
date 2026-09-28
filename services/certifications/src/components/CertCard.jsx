import './CertCard.css';

export default function CertCard({ cert }) {
  return (
    <div className="cert-card active" tabIndex={0} aria-label={cert.name}>
      <div className="cert-card-inner">
        <div className="cert-face cert-front">
          <img className="cert-logo" src={`${import.meta.env.BASE_URL}logos/${cert.logo}`} alt="" />
          <div className="cert-front-meta">
            <span className="cert-active-dot">&#9679; Certified</span>
          </div>
          <h3 className="cert-name">{cert.name}</h3>
          <p className="cert-issuer">{cert.issuer}</p>
        </div>

        <div className="cert-face cert-back">
          <h3 className="cert-name">{cert.name}</h3>
          <p className="cert-issuer">Issued by {cert.issuer}</p>
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
