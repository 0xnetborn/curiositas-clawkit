'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { animate, stagger, createTimeline } from 'animejs';

// Generate random chart heights once
function generateChartData(count: number) {
  return [...Array(count)].map((_, i) => ({
    key: i,
    height: `${Math.random() * 80 + 20}%`
  }));
}

const nodes = [
  { id: 'SCAN', label: 'MARKET SCAN', status: 'ACTIVE', metrics: '42 sources', x: 10, y: 40 },
  { id: 'DRAFT', label: 'DRAFTING CORE', status: 'PROCESSING', metrics: '12 drafts', x: 35, y: 20 },
  { id: 'AUDIT', label: 'QUALITY GATE', status: 'WAITING', metrics: '98% score', x: 60, y: 40 },
  { id: 'SYNC', label: 'SYNC ENGINE', status: 'IDLE', metrics: 'Queued', x: 85, y: 60 },
];

// Calculate bezier path between two points
const getPath = (x1: number, y1: number, x2: number, y2: number) => {
  const cx1 = x1 + (x2 - x1) / 2;
  const cy1 = y1;
  const cx2 = x1 + (x2 - x1) / 2;
  const cy2 = y2;
  return `M ${x1} ${y1} C ${cx1} ${cy1} ${cx2} ${cy2} ${x2} ${y2}`;
};

const connections = [
  { from: 'SCAN', to: 'DRAFT' },
  { from: 'DRAFT', to: 'AUDIT' },
  { from: 'AUDIT', to: 'SYNC' },
];

const setDashoffset = (el: any) => {
  const pathLength = el.getTotalLength();
  el.setAttribute('stroke-dasharray', pathLength);
  return pathLength;
};

export default function PipelinePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = createTimeline({
      defaults: { ease: 'outExpo', duration: 1000 }
    });

    // Reveal Nodes (Card Animation)
    tl.add('.pipeline-card', {
      scale: [0.9, 1],
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(100),
    })
    // Draw Connections
    .add('.pipeline-link', {
      strokeDashoffset: [setDashoffset, 0],
      opacity: [0, 0.4],
      delay: stagger(100),
    }, '-=800');

    // Continuous Data Flow
    animate('.data-packet', {
      strokeDashoffset: [setDashoffset, 0],
      ease: 'linear',
      duration: 2000,
      loop: true,
      delay: stagger(600),
    });

    // Chart Bars
    if (chartRef.current) {
      animate(chartRef.current.children, {
        height: [0, '100%'],
        opacity: [0, 1],
        delay: stagger(50),
        ease: 'outExpo',
        duration: 800,
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="h-full flex flex-col gap-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-light text-white mb-2">Active Pipelines</h1>
          <p className="text-xs font-mono text-white/40">VISUALIZING WORKFLOW EXECUTION</p>
        </div>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-teal-500/10 text-teal-500 text-[10px] font-mono border border-teal-500/20">RUNNING: 3</span>
        </div>
      </header>

      {/* Visual Pipeline Graph */}
      <div className="flex-1 bg-black/50 border border-white/5 relative overflow-hidden rounded-xl min-h-[400px]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        
        {/* SVG Layer for Connections */}
        <svg className="w-full h-full absolute inset-0 pointer-events-none">
          {connections.map((conn, i) => {
            const start = nodes.find(n => n.id === conn.from)!;
            const end = nodes.find(n => n.id === conn.to)!;
            const path = getPath(start.x, start.y, end.x, end.y);
            return (
              <g key={i}>
                {/* Background Line */}
                <path 
                  d={path}
                  stroke="#333" 
                  strokeWidth="0.2" 
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  className="pipeline-link opacity-0"
                />
                {/* Animated Packet */}
                <path 
                  d={path}
                  stroke="#14B8A6" 
                  strokeWidth="0.4" 
                  fill="none"
                  strokeDasharray="1 10"
                  vectorEffect="non-scaling-stroke"
                  className="data-packet opacity-0"
                />
              </g>
            );
          })}
        </svg>

        {/* HTML Layer for Nodes (Cards) */}
        {nodes.map((node, i) => (
          <div
            key={i}
            className="pipeline-card absolute w-48 -ml-24 -mt-12 bg-black border border-white/10 p-4 rounded-lg shadow-xl hover:border-teal-500/50 transition-colors cursor-pointer group"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {/* Connector Dots */}
            <div className="absolute -left-1 top-1/2 -mt-1 w-2 h-2 bg-black border border-white/20 rounded-full" />
            <div className="absolute -right-1 top-1/2 -mt-1 w-2 h-2 bg-black border border-white/20 rounded-full" />

            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-mono text-white/30">{node.id}</span>
              <div className={`w-1.5 h-1.5 rounded-full ${
                node.status === 'PROCESSING' ? 'bg-teal-500 animate-pulse' :
                node.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-white/20'
              }`} />
            </div>
            
            <h4 className="text-sm font-medium text-white mb-1 group-hover:text-teal-400 transition-colors">{node.label}</h4>
            
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/40">
                <path d="M12 2v20M2 12h20" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[10px] font-mono text-white/60">{node.metrics}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Chart (Compact) */}
      <div className="h-32 bg-black/20 border border-white/5 rounded-xl p-4 relative">
        <div ref={chartRef} className="flex items-end justify-between h-full gap-1">
          {useMemo(() => generateChartData(40), []).map((data) => (
            <div 
              key={data.key} 
              className="w-full bg-teal-500/20 hover:bg-teal-500/60 transition-colors rounded-sm"
              style={{ height: data.height }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
