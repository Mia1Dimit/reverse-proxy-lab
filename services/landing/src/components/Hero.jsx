import { useState } from 'react';
import ParticleCanvas from './ParticleCanvas';
import Waveform from './Waveform';
import TaglineRotator from './TaglineRotator';
import './Hero.css';

export default function Hero() {
  const [ctaVisible, setCtaVisible] = useState(false);

  return (
    <section className="hero">
      <ParticleCanvas />

      <div className="hero-content">
        <h1 className="hero-name">Dimitris Miaoulis</h1>
        <Waveform />
        <TaglineRotator onComplete={() => setCtaVisible(true)} />

        <div className={`hero-cta ${ctaVisible ? 'visible' : ''}`}>
          <a href="/portfolio" className="btn btn-primary">See my work</a>
          <a href="/about-me"  className="btn btn-ghost">About me</a>
        </div>
      </div>

      <a href="#services" className="scroll-hint" aria-label="Scroll to services">↓</a>
    </section>
  );
}
