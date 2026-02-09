'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const agents = [
  { name: 'ATHENA', role: 'STRATEGIC CORE', type: 'LOGIC', status: 'ONLINE' },
  { name: 'CALLIOPE', role: 'GENERATIVE ENGINE', type: 'CREATIVE', status: 'IDLE' },
  { name: 'THEMIS', role: 'QUALITY GUARD', type: 'AUDIT', status: 'ACTIVE' },
  { name: 'HERMES', role: 'DISTRIBUTION NODE', type: 'NETWORK', status: 'WAITING' },
  { name: 'CHRONOS', role: 'ANALYTICS MAIN', type: 'DATA', status: 'PROCESSING' },
  { name: 'DAEDALUS', role: 'PROJECT MANAGER', type: 'CONTROL', status: 'ONLINE' },
  { name: 'HERA', role: 'OPS CONTROLLER', type: 'SYSTEM', status: 'ONLINE' },
  { name: 'ARGUS', role: 'RESEARCH UNIT', type: 'SCANNER', status: 'ACTIVE' },
  { name: 'PROMETHEUS', role: 'OUTPUT GENERATOR', type: 'BUILDER', status: 'IDLE' },
  { name: 'HESTIA', role: 'CLIENT INTERFACE', type: 'RELAY', status: 'WAITING' },
  { name: 'HERACLES', role: 'TASK RESOLVER', type: 'WORKER', status: 'BUSY' },
  { name: 'MNEMOSYNE', role: 'MEMORY ARCHIVE', type: 'STORAGE', status: 'ONLINE' },
];

export default function SquadSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    animate(gridRef.current.children, {
      opacity: [0, 1],
      scale: [0.9, 1],
      delay: stagger(50, { grid: [4, 3], from: 'center' }),
      ease: 'outExpo',
      duration: 800,
    });
  }, []);

  return (
    <section className="py-32 px-6 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-sm font-mono text-white/40 tracking-widest uppercase mb-2">/// ACTIVE UNITS</h2>
            <h3 className="text-3xl font-medium text-white">Neural Squad</h3>
          </div>
          <div className="hidden md:flex gap-2">
            <span className="w-1 h-1 bg-white/20" />
            <span className="w-1 h-1 bg-white/20" />
            <span className="w-1 h-1 bg-white/20" />
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {agents.map((agent, i) => (
            <div key={i} className="group relative p-6 bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
              <div className="flex justify-between items-start mb-8">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="text-[10px] font-mono text-white/30">{agent.type}</span>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-lg font-medium text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  {agent.name}
                </h4>
                <p className="text-xs font-mono text-white/50">{agent.role}</p>
              </div>

              {/* Technical Corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
