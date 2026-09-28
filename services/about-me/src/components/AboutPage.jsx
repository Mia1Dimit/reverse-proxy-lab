import './AboutPage.css';
import profilePhoto from '../assets/profile.jpg';

export default function AboutPage() {
  return (
    <article className="about-page">
      <aside className="about-profile">
        <img className="about-photo" src={profilePhoto} alt="Portrait of Dimitris Miaoulis" />
        <div className="about-identity">
          <p className="about-kicker">ENGINEER / BUILDER</p>
          <h1>Dimitris Miaoulis</h1>
          <p className="about-subtitle">Cloud engineer · IoT engineer · AI builder</p>
        </div>
        <nav className="about-links" aria-label="Profile links">
          <a href="/portfolio">Projects ↗</a>
          <a href="/certifications">Certifications ↗</a>
          <a href="https://github.com/Mia1Dimit" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        </nav>
        <button className="about-cv" type="button" onClick={() => window.print()}>
          Engineer CV <span>Print / Save PDF ↗</span>
        </button>
      </aside>

      <div className="about-story" id="engineer-view">
        <header className="story-header">
          <p className="about-kicker">ABOUT / ENGINEER VIEW</p>
          <h2>From signal to cloud.</h2>
          <p>A story told through the systems I build.</p>
        </header>

        <section className="about-timeline" aria-label="Engineering journey">
          <div className="timeline-node">
            <span className="node-number">01 / HARDWARE</span>
            <h3><a href="/portfolio/muscle-insight">The arc ↗</a></h3>
            <p>
              It started with hardware — sEMG sensors, BLE radios, and signal processing on
              microcontrollers. Building systems that had to work reliably with no internet,
              no cloud, and no margin for error. That constraint is still how I think about
              distributed systems.
            </p>
          </div>

          <blockquote className="about-quote">Design for failure first.</blockquote>

          <div className="timeline-node">
            <span className="node-number">02 / RESEARCH</span>
            <h3><a href="/portfolio/muscle-insight">The research ↗</a></h3>
            <p>
              Biomedical engineering background with a published focus on muscle activity
              classification. The research taught me to care about data quality before
              architecture, and to question every assumption in a pipeline. Those habits
              transferred directly to cloud data platforms and LLM RAG systems.
            </p>
          </div>

          <div className="timeline-node">
            <span className="node-number">03 / CLOUD</span>
            <h3><a href="/portfolio/reverse-proxy-lab">The stack today ↗</a></h3>
            <p>AWS-first cloud engineer, Terraform practitioner, Python and Go engineer.</p>
          </div>

          <div className="timeline-node">
            <span className="node-number">04 / AI</span>
            <h3><a href="/portfolio/linkedin-llm">What comes next ↗</a></h3>
            <p>
              Deep in AI/LLM tooling and sports-tech platforms. The best systems are
              designed by people who have also built them.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
