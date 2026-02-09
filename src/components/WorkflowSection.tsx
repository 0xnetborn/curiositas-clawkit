'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const workflows = [
  {
    id: 'PIPE-01',
    name: 'PRESENCE ENGINE',
    steps: ['SCAN', 'DRAFT', 'AUDIT', 'ADAPT', 'SYNC', 'METRICS']
  },
  {
    id: 'PIPE-02',
    name: 'EXECUTION CORE',
    steps: ['PRIORITY', 'EXECUTE', 'VERIFY', 'DECISION', 'LOG']
  }
];

export default function WorkflowSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    animate(sectionRef.current.querySelectorAll('.step-node'), {
      scale: [0, 1],
      opacity: [0, 1],
      delay: stagger(100),
      ease: 'outElastic(1, .6)',
      duration: 1000
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-sm font-mono text-white/40 tracking-widest uppercase mb-16">/// OPERATIONAL PIPELINES</h2>

        <div className="space-y-24">
          {workflows.map((flow, i) => (
            <div key={i} className="relative">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-mono text-teal-500 px-2 py-1 bg-teal-500/10 border border-teal-500/20">
                  {flow.id}
                </span>
                <h3 className="text-xl text-white font-light tracking-wide">{flow.name}</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {flow.steps.map((step, s) => (
                  <div key={s} className="step-node relative group">
                    {/* Connector Line */}
                    {s < flow.steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 left-full w-full h-px bg-white/5 -z-10" />
                    )}
                    
                    <div className="h-24 p-4 border border-white/10 bg-black hover:bg-white/5 hover:border-white/30 transition-all flex flex-col justify-between">
                      <span className="text-[10px] font-mono text-white/30">0{s + 1}</span>
                      <span className="text-sm font-medium text-white tracking-wider">{step}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
