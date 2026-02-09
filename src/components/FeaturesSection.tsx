'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const features = [
  {
    title: "Orchestration",
    desc: "Multi-agent coordination",
    path: "M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"
  },
  {
    title: "Deployment",
    desc: "Instant serverless deploy",
    path: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z polyline points='13 2 13 9 20 9'"
  },
  {
    title: "Security",
    desc: "Enterprise-grade encryption",
    path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  },
  {
    title: "Analytics",
    desc: "Real-time performance metrics",
    path: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z polyline points='3.27 6.96 12 12.01 20.73 6.96' line x1='12' y1='22.08' x2='12' y2='12'"
  },
  {
    title: "Scalability",
    desc: "Horizontal auto-scaling",
    path: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z line x1='3.27' y1='6.96' x2='12' y2='12.01' line x1='12' y1='12.01' x2='20.73' y2='6.96' line x1='12' y1='22.08' x2='12' y2='12'"
  },
  {
    title: "Workflow",
    desc: "Visual graph interface",
    path: "M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"
  }
];

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    animate(containerRef.current.querySelectorAll('.feature-card'), {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(100, { start: 200 }),
      ease: 'outExpo',
      duration: 1000,
    });
  }, []);

  return (
    <section id="features" ref={containerRef} className="py-32 px-6 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-mono text-white/40 mb-12 tracking-widest uppercase">
          /// Core Capabilities
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {features.map((f, i) => (
            <div key={i} className="feature-card bg-black p-8 group hover:bg-white/[0.02] transition-colors relative overflow-hidden opacity-0">
              <div className="w-10 h-10 mb-6 text-white/40 group-hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
                  <path d={f.path} />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/40 font-light">{f.desc}</p>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
