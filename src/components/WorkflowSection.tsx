'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const workflows = [
  {
    title: 'Marketing Co-Founder',
    subtitle: 'Presence Engine',
    gradient: 'from-emerald-500 to-teal-600',
    steps: [
      { name: 'Ricerca', icon: '🔍' },
      { name: 'Scrittura', icon: '✍️' },
      { name: 'Review', icon: '✅' },
      { name: 'Repurpose', icon: '♻️' },
      { name: 'Amplificazione', icon: '📈' },
      { name: 'Misurazione', icon: '📊' },
    ],
  },
  {
    title: 'Business Operator',
    subtitle: 'Execution Engine',
    gradient: 'from-violet-500 to-purple-600',
    steps: [
      { name: 'Priorità', icon: '🎯' },
      { name: 'Esecuzione', icon: '⚡' },
      { name: 'Follow-up', icon: '🔄' },
      { name: 'Decisioni', icon: '🤔' },
      { name: 'Report', icon: '📝' },
    ],
  },
];

export default function WorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Animate workflow lines
    animate(container.querySelectorAll('.workflow-line'), {
      width: ['0%', '100%'],
      opacity: [0, 1],
      delay: stagger(200),
      ease: 'outExpo',
      duration: 800,
    });
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Workflow <span className="text-amber-400">Chiavi in Mano</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Flussi controllati, stati visibili, nessun salto.<br />
            Lavori tu, approvi tu, pubblica tu.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {workflows.map((workflow, wi) => (
            <div
              key={wi}
              className="relative p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/50"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${workflow.gradient}`} />
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white">{workflow.title}</h3>
                <p className="text-zinc-500">{workflow.subtitle}</p>
              </div>

              <div className="relative">
                {workflow.steps.map((step, si) => (
                  <div key={si} className="flex items-center gap-4 mb-4 last:mb-0">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${workflow.gradient} flex items-center justify-center text-lg shrink-0`}
                    >
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <span className="text-white font-medium">{step.name}</span>
                      <div className={`workflow-line h-0.5 bg-gradient-to-r ${workflow.gradient} rounded-full opacity-0`} />
                    </div>
                    <span className="text-zinc-600 text-sm font-mono">
                      {(si + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 text-center">
          <p className="text-zinc-400 text-sm mb-4">
            ⚠️ <strong>Modalità v1:</strong> Output in bozza con approvazione umana. Niente autopost.
          </p>
          <p className="text-zinc-500 text-xs">
            I quality gates assicurano accuratezza, leggibilità e coerenza commerciale.
          </p>
        </div>
      </div>
    </section>
  );
}
