import { useState } from 'react';
import './AboutPage.css';
import profilePhoto from '../assets/profile.jpg';
import greeceFlag from 'flag-icons/flags/4x3/gr.svg';
import polandFlag from 'flag-icons/flags/4x3/pl.svg';
import spainFlag from 'flag-icons/flags/4x3/es.svg';
import italyFlag from 'flag-icons/flags/4x3/it.svg';

const CHAPTERS = [
  {
    id: 'greece',
    flag: greeceFlag,
    country: 'Greece',
    place: 'Patras & Tripoli',
    years: '2018–2024',
    title: 'Where it began',
    stat: 'Integrated MEng · Patras',
    skills: ['Research', 'Signal processing', 'Embedded systems'],
    paragraphs: [
      'I was born and raised in Greece. School, basketball, and eventually an integrated Master of Engineering in Electrical and Computer Engineering at the University of Patras shaped my early years.',
      'My thesis and research drew me into wireless sEMG sensors and muscle activity. That work led to a publication on measuring muscle fatigue in real time and taught me to care about the quality of a signal before trusting the system built around it.',
    ],
    links: [
      { label: 'See Muscle Insight', href: '/portfolio/muscle-insight' },
      { label: 'See Publication', href: 'https://www.mdpi.com/2079-9292/14/11/2097' },
    ],
  },
  {
    id: 'poland',
    flag: polandFlag,
    country: 'Poland',
    place: 'Poznan',
    years: '2022',
    title: 'A wider view',
    stat: '1 semester · Erasmus',
    skills: ['Erasmus', 'Adaptability'],
    paragraphs: [
      'I spent an Erasmus semester in Poznan. I attended lectures that introduced new perspectives on engineering while exploring the beauty of Poland.',
      'Living and studying abroad for the first time made me more comfortable stepping into unfamiliar places and learning as I went.',
    ],
  },
  {
    id: 'spain',
    flag: spainFlag,
    country: 'Spain',
    place: 'Alicante',
    years: '2024–2025',
    title: 'My introduction to the cloud',
    stat: 'First AWS deployment',
    skills: ['AWS', 'Serverless', 'CI/CD'],
    paragraphs: [
      'A year in Alicante at the European Union Intellectual Property Office, working in the Digital Innovation Department. A good office with a sea view and a taste of what being a cloud engineer means.',
      'There I began building with AWS: Lambda, API Gateway, S3, and the automation needed to bring a serverless service into use. Outside the office there was plenty of sun and a castle above the city.',
    ],
    links: [
      { label: 'See SAM Jenkins Pipeline', href: '/portfolio/sam-jenkins-pipeline' },
      { label: 'See IaC Doc Generator', href: '/portfolio/iac-doc-generator' },
    ],
  },
  {
    id: 'italy',
    flag: italyFlag,
    country: 'Italy',
    place: 'Rome',
    years: '2025–current',
    title: 'Building platforms in Rome',
    stat: '22+ apps · 3 environments',
    skills: ['Platform engineering', 'Terraform', 'GenAI'],
    paragraphs: [
      'I now live in Rome and work as a Platform Engineer at Terna S.p.A. My work spans reusable Terraform modules, cloud infrastructure across Azure and AWS, and the pipelines that help teams ship reliably.',
      'It brings the earlier chapters together: curiosity about new technology, a habit of learning by building, and the discipline to make systems that hold up when conditions change.',
    ],
    tasks: [
      'Followed 22+ applications in Azure (infrastructure, application resources, and configuration) evolving across 3 environments.',
      'Integrated GenAI capabilities into 10+ applications using a custom-built AI platform on Azure Foundry.',
      'Built a FinOps agent on AWS using a custom agentic platform (Bedrock AgentCore + Lambda).',
      'Led a right-sizing initiative, cutting cloud spend by €22k/month.',
      'Designed and implemented a policy strategy on AWS (RCP, SCP, AWS Config).',
    ],
    links: [
      { label: 'Reverse Proxy Lab', href: '/portfolio/reverse-proxy-lab' },
      { label: 'File Secure Exchange', href: '/portfolio/file-secure-exchange' },
      { label: 'EuroleagueTech Platform', href: '/portfolio/euroleaguetech-platform' },
      { label: 'Serverless ArchiveIQ', href: '/portfolio/serverless-archiveiq' },
      { label: 'Asset Inventory Automation', href: '/portfolio/asset-inventory-automation' },
      { label: 'Terraform modules', href: 'https://github.com/Mia1Dimit/Terraform-modules' },
    ],
  },
];

export default function AboutPage() {
  const [selectedCountry, setSelectedCountry] = useState('greece');

  return (
    <article className="about-page">
      <aside className="about-profile">
        <img className="about-photo" src={profilePhoto} alt="Portrait of Dimitris Miaoulis" />
        <div className="about-identity">
          <p className="about-kicker">ENGINEER / BUILDER</p>
          <h1>Dimitris Miaoulis</h1>
          <p className="about-location">Rome, Italy · EU-based</p>
          <p className="about-subtitle">Cloud engineer · IoT engineer · AI builder</p>
        </div>
        <nav className="country-picker" aria-label="Explore my story by country">
          {CHAPTERS.map(({ id, flag, country }) => (
            <button
              key={id}
              type="button"
              className={selectedCountry === id ? 'country-option selected' : 'country-option'}
              aria-pressed={selectedCountry === id}
              aria-controls={`chapter-${id}`}
              onClick={() => setSelectedCountry(id)}
            >
              <img className="country-flag" src={flag} alt="" />
              <span>{country}</span>
            </button>
          ))}
        </nav>
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
          <h2 className="about-kicker">BACKGROUND</h2>
        </header>

        <div className="country-chapters">
          {CHAPTERS.map(({ id, flag, country, place, years, title, stat, skills, paragraphs, tasks, links }, index) => (
            <section
              key={id}
              id={`chapter-${id}`}
              className="country-chapter"
              aria-labelledby={`chapter-title-${id}`}
              hidden={selectedCountry !== id}
            >
              <p className="chapter-eyebrow">0{index + 1} / {country.toUpperCase()} <img src={flag} alt="" /></p>
              <p className="chapter-place">{place} <span>· {years}</span></p>
              <h3 id={`chapter-title-${id}`}>{title}</h3>
              <div className="chapter-signals">
                <span className="chapter-stat">{stat}</span>
                <ul className="chapter-skills" aria-label={`${country} skills`}>
                  {skills.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
              </div>
              {paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {tasks && <div className="chapter-work">
                <h4>What I work on</h4>
                <ul>{tasks.map(task => <li key={task}>{task}</li>)}</ul>
              </div>}
              {links && <div className="chapter-links">
                {links.map(({ label, href }) => (
                  <a key={href} className="chapter-project" href={href} {...(href.startsWith('https://') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{label} ↗</a>
                ))}
              </div>}
            </section>
          ))}
        </div>
        <blockquote className="about-quote">Design for failure first.</blockquote>
      </div>
    </article>
  );
}
