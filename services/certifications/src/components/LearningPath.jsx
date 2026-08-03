import './LearningPath.css';

const R = 6; // node circle radius

// Hardcoded learning path positions matching the spec diagram
const NODES = [
  { id: 'ccp',   label: 'Cloud Practitioner',           x: 60,  y: 45,  inProgress: false },
  { id: 'saa',   label: 'Solutions Architect Associate', x: 210, y: 45,  inProgress: false },
  { id: 'sap',   label: 'Solutions Architect Pro',       x: 380, y: 45,  inProgress: false },
  { id: 'dop',   label: 'DevOps Professional',           x: 380, y: 120, inProgress: true  },
  { id: 'az900', label: 'AZ-900',                        x: 60,  y: 175, inProgress: false },
  { id: 'az104', label: 'AZ-104',                        x: 210, y: 175, inProgress: false },
];

const EDGES = [
  ['ccp', 'saa'],
  ['saa', 'sap'],
  ['saa', 'dop'],
  ['az900', 'az104'],
];

function arrow(nodes, fromId, toId) {
  const s = nodes.find(n => n.id === fromId);
  const t = nodes.find(n => n.id === toId);
  const dx = t.x - s.x;
  const dy = t.y - s.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  const gap = R + 5; // stop before the arrowhead marker
  return {
    x1: s.x + R * ux,
    y1: s.y + R * uy,
    x2: t.x - gap * ux,
    y2: t.y - gap * uy,
  };
}

export default function LearningPath() {
  return (
    <div className="learning-path">
      <p className="learning-path-label">Certification path</p>
      <svg
        viewBox="0 0 480 210"
        aria-label="Certification learning path diagram"
        role="img"
        className="learning-path-svg"
      >
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="currentColor" className="arrow-head" />
          </marker>
        </defs>

        {/* Edges */}
        {EDGES.map(([from, to]) => {
          const pts = arrow(NODES, from, to);
          const toNode = NODES.find(n => n.id === to);
          return (
            <line
              key={`${from}-${to}`}
              x1={pts.x1} y1={pts.y1} x2={pts.x2} y2={pts.y2}
              className={`path-edge ${toNode.inProgress ? 'edge-progress' : ''}`}
              markerEnd="url(#arrow)"
            />
          );
        })}

        {/* Nodes */}
        {NODES.map(n => (
          <g key={n.id}>
            <circle
              cx={n.x} cy={n.y} r={R}
              className={`path-node ${n.inProgress ? 'node-progress' : ''}`}
            />
            <text
              x={n.x} y={n.y + R + 12}
              className={`path-text ${n.inProgress ? 'text-progress' : ''}`}
              textAnchor="middle"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
