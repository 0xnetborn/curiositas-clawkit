'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const drafts = [
  { id: 'DFT-492', title: 'LinkedIn: AI Trends Q3', agent: 'CALLIOPE', status: 'PENDING_REVIEW', score: 98 },
  { id: 'DFT-491', title: 'Twitter Thread: Orchestration', agent: 'CALLIOPE', status: 'REJECTED', score: 45 },
  { id: 'DFT-490', title: 'Blog: Why Agents Fail', agent: 'ATHENA', status: 'APPROVED', score: 92 },
];

export default function ArchivePage() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;

    animate(listRef.current.children, {
      opacity: [0, 1],
      translateX: [-10, 0],
      delay: stagger(100),
      ease: 'outExpo',
      duration: 800,
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-light text-white mb-2">Content Archive</h1>
        <p className="text-xs font-mono text-white/40">QUALITY GATE & APPROVAL CONSOLE</p>
      </header>

      <div className="bg-black/50 border border-white/5 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-4 border-b border-white/5 text-[10px] font-mono text-white/30 uppercase tracking-widest">
          <div className="col-span-2">ID</div>
          <div className="col-span-4">Topic</div>
          <div className="col-span-2">Agent</div>
          <div className="col-span-2">Score</div>
          <div className="col-span-2 text-right">Status</div>
        </div>

        <div ref={listRef} className="divide-y divide-white/5">
          {drafts.map((draft, i) => (
            <div key={i} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors group cursor-pointer">
              <div className="col-span-2 font-mono text-xs text-white/40">{draft.id}</div>
              <div className="col-span-4 text-white font-medium">{draft.title}</div>
              <div className="col-span-2 text-xs text-teal-500 font-mono">{draft.agent}</div>
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500" style={{ width: `${draft.score}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-white/60">{draft.score}%</span>
                </div>
              </div>
              <div className="col-span-2 text-right">
                <span className={`px-2 py-1 rounded text-[10px] font-mono border ${
                  draft.status === 'APPROVED' ? 'border-teal-500/30 text-teal-500 bg-teal-500/5' :
                  draft.status === 'REJECTED' ? 'border-red-500/30 text-red-500 bg-red-500/5' :
                  'border-amber-500/30 text-amber-500 bg-amber-500/5'
                }`}>
                  {draft.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
