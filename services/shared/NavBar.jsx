import './NavBar.css';

const LINKS = [
  { label: 'Home',             href: '/' },
  { label: 'About Me',         href: '/about-me' },
  { label: 'Certifications',   href: '/certifications' },
  { label: 'Portfolio',        href: '/portfolio' },
];

function isActive(href) {
  const path = window.location.pathname;
  if (href === '/') return path === '/';
  return path.startsWith(href);
}

export default function NavBar() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <a className="navbar-brand" href="/" aria-label="Dimitris Miaoulis — home">
        <span className="brand-initials">DM</span>
        <span className="brand-tagline">Signal to Cloud</span>
      </a>

      <ul className="navbar-links" role="list">
        {LINKS.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              className={isActive(href) ? 'active' : undefined}
              aria-current={isActive(href) ? 'page' : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
