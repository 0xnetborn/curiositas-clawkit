'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import SpotlightCard from '@/components/ui/SpotlightCard';

const agents = [
  // Marketing Squad
  { name: 'ATHENA', role: 'STRATEGIST', desc: 'Topic & Angles', type: 'LOGIC', status: 'ONLINE' },
  { name: 'CALLIOPE', role: 'WRITER', desc: 'Drafts & Style', type: 'CREATIVE', status: 'IDLE' },
  { name: 'THEMIS', role: 'QUALITY GATE', desc: 'Review & Reject', type: 'AUDIT', status: 'ACTIVE' },
  { name: 'HERMES', role: 'AMPLIFIER', desc: 'Repurpose & Launch', type: 'NETWORK', status: 'WAITING' },
  { name: 'CHRONOS', role: 'ANALYTICS', desc: 'Weekly Report', type: 'DATA', status: 'PROCESSING' },
  { name: 'DAEDALUS', role: 'PM', desc: 'Backlog & Flow', type: 'CONTROL', status: 'ONLINE' },
  
  // Business Squad
  { name: 'HERA', role: 'OPERATOR', desc: 'Weekly Plan', type: 'SYSTEM', status: 'ONLINE' },
  { name: 'ARGUS', role: 'RESEARCH', desc: 'Competitors & Options', type: 'SCANNER', status: 'ACTIVE' },
  { name: 'PROMETHEUS', role: 'PROPOSALS', desc: 'Drafts & Scope', type: 'BUILDER', status: 'IDLE' },
  { name: 'HESTIA', role: 'CLIENT TRIAGE', desc: 'Inbox Zero', type: 'RELAY', status: 'WAITING' },
  { name: 'HERACLES', role: 'UNBLOCKER', desc: 'Blockers & Deadlines', type: 'WORKER', status: 'BUSY' },
  { name: 'MNEMOSYNE', role: 'REPORTS', desc: 'Progress & Moves', type: 'STORAGE', status: 'ONLINE' },
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
    <section className="py-32 px-6 bg-black border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-sm font-mono text-white/40 tracking-widest uppercase mb-2"><span aria-hidden="true" className="text-white/20">&#47;&#47;</span> ACTIVE UNITS</h2>
            <h3 className="text-3xl font-medium text-white">Neural Squad</h3>
          </div>
          <div className="hidden md:flex gap-2">
            <span className="w-1 h-1 bg-white/20" />
            <span className="w-1 h-1 bg-white/20" />
            <span className="w-1 h-1 bg-white/20" />
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent, i) => (
            <SpotlightCard key={i} className="group relative p-6 bg-white/5 border border-white/5 hover:border-white/20 transition-colors opacity-0 cursor-pointer">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)] animate-pulse" />
                  <span className="text-[10px] font-mono text-white/30">{agent.type}</span>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-lg font-medium text-white tracking-tight group-hover:text-teal-400 transition-colors">
                    {agent.name}
                  </h4>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white/70">{agent.role}</span>
                    <span className="text-[10px] font-mono text-white/40 uppercase">{agent.desc}</span>
                  </div>
                </div>
              </div>

              {/* Technical Corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
