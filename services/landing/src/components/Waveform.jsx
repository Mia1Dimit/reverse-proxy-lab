import './Waveform.css';

const PATH =
  'M0 25 L30 25 Q40 15 50 25 L65 25 L68 29 L73 3 L78 37 L83 25 L98 25 Q112 15 126 25 L200 25 ' +
  'L230 25 Q240 15 250 25 L265 25 L268 29 L273 3 L278 37 L283 25 L298 25 Q312 15 326 25 L400 25';

export default function Waveform() {
  return (
    <div className="waveform-wrap">
      <svg
        className="waveform"
        viewBox="0 0 400 50"
        aria-label="Signal becoming a connected cloud network"
        role="img"
      >
        <path className="waveform-signal" d={PATH} />
        <g className="waveform-network">
          <path d="M15 25 H70 L120 12 H180 L225 25 H280 L330 12 H385 M70 25 L120 38 H180 L225 25 M280 25 L330 38 H385" />
          {[[15, 25], [70, 25], [120, 12], [120, 38], [180, 12], [180, 38], [225, 25], [280, 25], [330, 12], [330, 38], [385, 12], [385, 38]].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" />
          ))}
        </g>
      </svg>
    </div>
  );
}
