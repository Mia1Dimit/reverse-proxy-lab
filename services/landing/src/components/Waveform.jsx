import { useState } from 'react';
import './Waveform.css';

// ECG-like SVG path: flat → P wave → QRS complex → T wave → flat (×2 cycles)
const PATH =
  'M0 25 L30 25 Q40 15 50 25 L65 25 L68 29 L73 3 L78 37 L83 25 L98 25 Q112 15 126 25 L200 25 ' +
  'L230 25 Q240 15 250 25 L265 25 L268 29 L273 3 L278 37 L283 25 L298 25 Q312 15 326 25 L400 25';

export default function Waveform() {
  const [bright, setBright] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);

  function handleClick() {
    setEasterEgg(true);
    setTimeout(() => setEasterEgg(false), 2800);
  }

  return (
    <div className="waveform-wrap">
      <svg
        className={`waveform ${bright ? 'bright' : ''}`}
        viewBox="0 0 400 50"
        preserveAspectRatio="none"
        aria-label="sEMG signal waveform"
        role="img"
        onClick={handleClick}
        onMouseEnter={() => setBright(true)}
        onMouseLeave={() => setBright(false)}
        style={{ cursor: 'pointer' }}
      >
        <path d={PATH} />
      </svg>

      {easterEgg && (
        <p className="waveform-egg" role="status">
          That&apos;s an sEMG signal. I built the sensor.
        </p>
      )}
    </div>
  );
}
