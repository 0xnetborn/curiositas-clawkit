'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger, createTimeline } from 'animejs';

const nodes = [
  { id: 'SCAN', label: 'MARKET SCAN', x: 10, y: 30 },
  { id: 'DRAFT', label: 'DRAFTING CORE', x: 30, y: 15 },
  { id: 'AUDIT', label: 'QUALITY GATE', x: 50, y: 30 },
  { id: 'SYNC', label: 'SYNC ENGINE', x: 70, y: 45 },
  { id: 'PUBLISH', label: 'PUBLISH NODE', x: 90, y: 30 },
];

const connections = [
  { from: 'SCAN', to: 'DRAFT' },
  { from: 'DRAFT', to: 'AUDIT' },
  { from: 'AUDIT', to: 'SYNC' },
  { from: 'SYNC', to: 'PUBLISH' },
  { from: 'AUDIT', to: 'DRAFT' },
];

const dataPoints = [40, 65, 30, 80, 55, 90, 70, 45, 60, 100, 85, 50];

const setDashoffset = (el: any) => {
  const pathLength = el.getTotalLength();
  el.setAttribute('stroke-dasharray', pathLength);
  return pathLength;
};

export default function PipelinePage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const tl = createTimeline({
      defaults: { ease: 'outExpo', duration: 1000 }
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

    // Continuous Data Flow
    animate('.data-packet', {
      strokeDashoffset: [setDashoffset, 0],
      ease: 'linear',
      duration: 2000,
      loop: true,
      delay: stagger(500),
    });

    // Animate Chart Bars
    if (chartRef.current) {
      animate(chartRef.current.children, {
        height: [0, '100%'], // Scale Y
        opacity: [0, 1],
        delay: stagger(50),
        ease: 'outExpo',
        duration: 800,
      });
    }

  }, []);

  return (
    <div className="h-full flex flex-col gap-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-light text-white mb-2">Active Pipelines</h1>
          <p className="text-xs font-mono text-white/40">VISUALIZING WORKFLOW EXECUTION</p>
        </div>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-teal-500/10 text-teal-500 text-[10px] font-mono border border-teal-500/20">RUNNING: 3</span>
          <span className="px-2 py-1 bg-white/5 text-white/40 text-[10px] font-mono border border-white/10">IDLE: 1</span>
        </div>
      </header>

      {/* Visual Pipeline Graph */}
      <div className="flex-1 bg-black/50 border border-white/5 relative overflow-hidden rounded-xl min-h-[300px]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        
        <svg ref={svgRef} className="w-full h-full absolute inset-0" viewBox="0 0 100 60" preserveAspectRatio="none">
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

      {/* Analytics Chart */}
      <div className="h-48 bg-black/20 border border-white/5 rounded-xl p-6 relative">
        <h3 className="text-xs font-mono text-white/40 uppercase mb-4">Throughput Velocity (24h)</h3>
        <div ref={chartRef} className="flex items-end justify-between h-full gap-2 pb-6">
          {dataPoints.map((val, i) => (
            <div 
              key={i} 
              className="w-full bg-teal-500/20 hover:bg-teal-500/40 transition-colors relative group rounded-t-sm"
              style={{ height: `${val}%` }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 rounded">
                {val} tasks
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
