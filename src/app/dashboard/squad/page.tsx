'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger, createTimeline } from 'animejs';

const agents = [
  { id: 'ATHENA', role: 'STRATEGIST', angle: 0 },
  { id: 'CALLIOPE', role: 'WRITER', angle: 30 },
  { id: 'THEMIS', role: 'QUALITY', angle: 60 },
  { id: 'HERMES', role: 'AMPLIFIER', angle: 90 },
  { id: 'CHRONOS', role: 'ANALYTICS', angle: 120 },
  { id: 'DAEDALUS', role: 'PM', angle: 150 },
  { id: 'HERA', role: 'OPERATOR', angle: 180 },
  { id: 'ARGUS', role: 'RESEARCH', angle: 210 },
  { id: 'PROMETHEUS', role: 'PROPOSALS', angle: 240 },
  { id: 'HESTIA', role: 'TRIAGE', angle: 270 },
  { id: 'HERACLES', role: 'UNBLOCKER', angle: 300 },
  { id: 'MNEMOSYNE', role: 'REPORTS', angle: 330 },
];

const setDashoffset = (el: any) => {
  const pathLength = el.getTotalLength();
  el.setAttribute('stroke-dasharray', pathLength);
  return pathLength;
};

export default function SquadPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = createTimeline({
      defaults: { ease: 'outExpo', duration: 1000 }
    });

    // Animate Central Core
    tl.add('.core-node', {
      scale: [0, 1],
      opacity: [0, 1],
    })
    // Expand Network
    .add('.agent-group', {
      opacity: [0, 1],
      translateY: [0, 0], // Just reveal
      scale: [0, 1],
      delay: stagger(50),
    }, '-=800')
    // Draw Lines
    .add('.connection-line', {
      strokeDashoffset: [setDashoffset, 0],
      opacity: [0, 0.2],
      delay: stagger(20),
    }, '-=1000');

    // Continuous Pulse
    animate('.signal-pulse', {
      r: [2, 20],
      opacity: [0.8, 0],
      easing: 'outSine',
      duration: 2000,
      loop: true,
      delay: stagger(200),
    });

  }, []);

  // Helper to calculate position
  const getPos = (angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: 50 + radius * Math.cos(rad),
      y: 50 + radius * Math.sin(rad),
    };
  };

  return (
    <div ref={containerRef} className="h-full flex flex-col">
      <header className="mb-8">
        <h1 className="text-2xl font-light text-white mb-2">Neural Squad Network</h1>
        <p className="text-xs font-mono text-white/40">REAL-TIME AGENT INTERACTION GRAPH</p>
      </header>

      <div className="flex-1 bg-black/50 border border-white/5 relative rounded-xl overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        
        <svg className="w-full h-full max-w-2xl max-h-2xl" viewBox="0 0 100 100">
          {/* Connections */}
          {agents.map((agent, i) => {
            const pos = getPos(agent.angle, 35);
            return (
              <line
                key={`line-${i}`}
                x1="50" y1="50"
                x2={pos.x} y2={pos.y}
                stroke="#14B8A6"
                strokeWidth="0.2"
                className="connection-line opacity-0"
              />
            );
          })}

          {/* Central Core */}
          <g className="core-node origin-center">
            <circle cx="50" cy="50" r="8" fill="#050505" stroke="#14B8A6" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="4" fill="#14B8A6" className="animate-pulse" />
            <circle cx="50" cy="50" r="2" fill="#fff" className="signal-pulse" />
            <text x="50" y="52" fontSize="2" textAnchor="middle" fill="#fff" fontFamily="monospace">CORE</text>
          </g>

          {/* Agents */}
          {agents.map((agent, i) => {
            const pos = getPos(agent.angle, 35);
            return (
              <g key={i} className="agent-group origin-center" style={{ transformBox: 'fill-box' }}>
                {/* Node */}
                <circle cx={pos.x} cy={pos.y} r="4" fill="#050505" stroke="#333" strokeWidth="0.5" />
                <circle cx={pos.x} cy={pos.y} r="1.5" fill={i < 6 ? "#14B8A6" : "#A855F7"} />
                
                {/* Label */}
                <text x={pos.x} y={pos.y + 7} fontSize="1.5" textAnchor="middle" fill="#fff" fontFamily="monospace" fontWeight="bold">
                  {agent.id}
                </text>
                <text x={pos.x} y={pos.y + 9} fontSize="1" textAnchor="middle" fill="#666" fontFamily="monospace">
                  {agent.role}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 p-4 bg-black/80 border border-white/10 rounded-lg backdrop-blur text-[10px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span className="text-white/60">MARKETING UNIT</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-white/60">BUSINESS UNIT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
