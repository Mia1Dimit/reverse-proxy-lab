import './AboutPage.css';

export default function AboutPage() {
  return (
    <article className="about-page">
      <header className="about-header">
        <h1>Dimitris Miaoulis</h1>
        <p className="about-subtitle">Cloud Architect · IoT Engineer · AI Builder</p>
      </header>

      <section className="about-section">
        <h2>The arc</h2>
        <p>
          It started with hardware — sEMG sensors, BLE radios, and signal processing on
          microcontrollers. Building systems that had to work reliably with no internet,
          no cloud, and no margin for error. That constraint is still how I think about
          distributed systems: design for failure first.
        </p>
      </section>

      <section className="about-section">
        <h2>The research</h2>
        <p>
          Biomedical engineering background with a published focus on muscle activity
          classification. The research taught me to care about data quality before
          architecture, and to question every assumption in a pipeline. Those habits
          transferred directly to cloud data platforms and LLM RAG systems.
        </p>
      </section>

      <section className="about-section">
        <h2>The stack today</h2>
        <p>
          AWS-first cloud architect, Terraform practitioner, Python and Go engineer.
          Deep in AI/LLM tooling and sports-tech platforms. Two deliberate tracks —
          architect and engineer — because the best systems are designed by people who
          have also built them.
        </p>
      </section>

      <section className="about-cv">
        <h2>Download CV</h2>
        <div className="cv-buttons">
          <a className="btn btn-primary" href="#" aria-label="Download Architect CV">
            Architect view
          </a>
          <a className="btn btn-ghost" href="#" aria-label="Download Engineer CV">
            Engineer view
          </a>
        </div>
      </section>
    </article>
  );
}
