import { useState, useEffect } from 'react';
import './TaglineRotator.css';

const TAGLINES = ['Cloud Architect', 'IoT Engineer', 'AI Builder', 'Signal to Cloud'];
// duration each tagline is shown before cycling to the next
const HOLD_MS = 1800;
const FADE_MS = 300;

export default function TaglineRotator({ onComplete }) {
  const [index, setIndex]     = useState(0);
  const [visible, setVisible] = useState(true);
  const done = index === TAGLINES.length - 1;

  useEffect(() => {
    if (done) {
      onComplete?.();
      return;
    }
    const hold = setTimeout(() => {
      setVisible(false);
      const fade = setTimeout(() => {
        setIndex(i => i + 1);
        setVisible(true);
      }, FADE_MS);
      return () => clearTimeout(fade);
    }, HOLD_MS);
    return () => clearTimeout(hold);
  }, [index, done, onComplete]);

  return (
    <div className="tagline-rotator" aria-live="polite">
      <span className={`tagline ${visible ? 'visible' : ''} ${done ? 'final' : ''}`}>
        {TAGLINES[index]}
        {!done && <span className="cursor" aria-hidden="true">_</span>}
      </span>
    </div>
  );
}
