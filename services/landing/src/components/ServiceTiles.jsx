import './ServiceTiles.css';

const TILES = [
  {
    title: 'About Me',
    body: 'The full arc — from biomedical research to distributed cloud systems.',
    cta: 'Read my story',
    href: '/about-me',
  },
  {
    title: 'Portfolio',
    body: 'Cloud, AI/ML, IoT, Research & more.',
    cta: '→ 12 items',
    href: '/portfolio',
  },
  {
    title: 'Certifications',
    body: 'AWS, Azure, and counting.',
    cta: '→ View badges',
    href: '/certifications',
  },
];

export default function ServiceTiles() {
  return (
    <section id="services" className="tiles-section">
      <ul className="tiles-grid" role="list">
        {TILES.map(({ title, body, cta, href }) => (
          <li key={href}>
            <a href={href} className="tile">
              <h2 className="tile-title">{title}</h2>
              <p className="tile-body">{body}</p>
              <span className="tile-cta">{cta}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
