import Waveform from './Waveform';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-name">Dimitris Miaoulis</h1>
        <p className="hero-positioning">I build cloud platforms from the signal up.</p>
        <Waveform />
        <ul className="hero-proof" aria-label="Selected credentials and work">
          <li>60+ Terraform modules · private registry</li>
          <li>AWS Developer Associate</li>
          <li>Published research</li>
        </ul>

        <div className="hero-cta">
          <a href="/portfolio" className="btn btn-primary">See my work</a>
          <a href="/about-me"  className="btn btn-ghost">About me</a>
        </div>
      </div>
    </section>
  );
}
