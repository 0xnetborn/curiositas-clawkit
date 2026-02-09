'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger, createTimeline } from 'animejs';

const nodes = [
  { id: 'SCAN', label: 'MARKET SCAN', x: 10, y: 50 },
  { id: 'DRAFT', label: 'DRAFTING CORE', x: 30, y: 20 },
  { id: 'AUDIT', label: 'QUALITY GATE', x: 50, y: 50 },
  { id: 'SYNC', label: 'SYNC ENGINE', x: 70, y: 80 },
  { id: 'PUBLISH', label: 'PUBLISH NODE', x: 90, y: 50 },
];

const connections = [
  { from: 'SCAN', to: 'DRAFT' },
  { from: 'DRAFT', to: 'AUDIT' },
  { from: 'AUDIT', to: 'SYNC' },
  { from: 'SYNC', to: 'PUBLISH' },
  { from: 'AUDIT', to: 'DRAFT' }, // Loopback for rejection
];

const setDashoffset = (el: any) => {
  const pathLength = el.getTotalLength();
  el.setAttribute('stroke-dasharray', pathLength);
  return pathLength;
};

export default function PipelinePage() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const tl = createTimeline({
      defaults: {
        ease: 'outExpo',
        duration: 1000,
      }
    });

    // Reveal Nodes
    tl.add('.pipeline-node', {
      scale: [0, 1],
      opacity: [0, 1],
      delay: stagger(100),
    })
    // Draw Connections
    .add('.pipeline-link', {
      strokeDashoffset: [setDashoffset, 0],
      opacity: [0, 1],
      delay: stagger(50),
    }, '-=800');

    // Continuous Data Flow Animation
    animate('.data-packet', {
      strokeDashoffset: [setDashoffset, 0],
      ease: 'linear',
      duration: 2000,
      loop: true,
      delay: stagger(500),
    });

  }, []);

  return (
    <div className="h-full flex flex-col">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-light text-white mb-2">Active Pipelines</h1>
          <p className="text-xs font-mono text-white/40">VISUALIZING WORKFLOW EXECUTION</p>
        </div>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-teal-500/10 text-teal-500 text-[10px] font-mono border border-teal-500/20">RUNNING: 3</span>
          <span className="px-2 py-1 bg-white/5 text-white/40 text-[10px] font-mono border border-white/10">IDLE: 1</span>
        </div>
      </header>

      <div className="flex-1 bg-black/50 border border-white/5 relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        
        <svg ref={svgRef} className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Connections */}
          {connections.map((conn, i) => {
            const start = nodes.find(n => n.id === conn.from)!;
            const end = nodes.find(n => n.id === conn.to)!;
            return (
              <g key={i}>
                <line 
                  x1={start.x} y1={start.y} 
                  x2={end.x} y2={end.y} 
                  stroke="#333" 
                  strokeWidth="0.5" 
                  className="pipeline-link opacity-20"
                />
                <line 
                  x1={start.x} y1={start.y} 
                  x2={end.x} y2={end.y} 
                  stroke="#14B8A6" 
                  strokeWidth="0.5" 
                  strokeDasharray="2 4"
                  className="data-packet opacity-60"
                />
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node, i) => (
            <g key={i} className="pipeline-node origin-center">
              <circle cx={node.x} cy={node.y} r="3" fill="#000" stroke="#333" strokeWidth="0.5" />
              <circle cx={node.x} cy={node.y} r="1.5" fill="#14B8A6" className="animate-pulse" />
              <text x={node.x} y={node.y + 6} fontSize="2" fill="#666" textAnchor="middle" fontFamily="monospace">
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
