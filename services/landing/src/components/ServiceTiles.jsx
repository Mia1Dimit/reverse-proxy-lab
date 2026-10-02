import './ServiceTiles.css';
import profilePhoto from '../assets/profile.jpg';

export default function ServiceTiles() {
  return (
    <section id="services" className="tiles-section">
      <div className="tiles-heading">
        <h2>Track Record</h2>
      </div>
      <ul className="tiles-grid" role="list">
        <li className="tile-cell tile-lab">
          <a href="/portfolio/reverse-proxy-lab" className="tile">
            <span className="tile-kicker">01 / LIVE INFRASTRUCTURE</span>
            <h3 className="tile-title">Reverse Proxy Lab</h3>
            <p className="tile-body">The site you are on. Three approaches to routing, TLS and service delivery, built side by side.</p>
            <div className="routing-diagram" aria-hidden="true">
              <span>REQUEST</span><span>TRAEFIK</span><span>LANDING</span>
            </div>
            <span className="tile-cta">Explore the architecture →</span>
          </a>
        </li>
        <li className="tile-cell tile-stack">
          <div className="tile">
            <span className="tile-kicker">02 / TOOLBOX</span>
            <h3 className="tile-title">Stack today</h3>
            <p className="tile-body">Cloud platforms and the systems that run on them.</p>
            <ul className="stack-list">
              <li>AWS</li><li>Azure</li><li>Terraform</li><li>Docker</li><li>Azure DevOps</li><li>GitHub Actions</li>
            </ul>
          </div>
        </li>
        <li className="tile-cell tile-research">
          <a href="/portfolio/muscle-insight" className="tile">
            <span className="tile-kicker">03 / RESEARCH</span>
            <h3 className="tile-title">From muscle signals to models.</h3>
            <p className="tile-body">Custom sEMG sensors, BLE telemetry and machine learning for muscle activity classification.</p>
            <span className="tile-cta">See Muscle Insight →</span>
          </a>
        </li>
        <li className="tile-cell tile-certifications">
          <a href="/certifications" className="tile">
            <span className="tile-kicker">04 / CREDENTIALS</span>
            <h3 className="tile-title">Certifications</h3>
            <p className="tile-body">Platform Engineering · Anthropic · AWS · Experis</p>
            <span className="tile-cta">View credentials →</span>
          </a>
        </li>
        <li className="tile-cell tile-cv">
          <a href="/about-me" className="tile">
            <div className="tile-cv-copy">
              <span className="tile-kicker">05 / BACKGROUND</span>
              <h3 className="tile-title">CV &amp; experience</h3>
              <p className="tile-body">The path from biomedical research to cloud engineering.</p>
              <span className="tile-cta">View profile →</span>
            </div>
            <img src={profilePhoto} alt="" className="tile-portrait" />
          </a>
        </li>
      </ul>
    </section>
  );
}
