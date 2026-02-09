'use client';

import { useEffect, useRef } from 'react';

interface SquadMember {
  name: string;
  role: string;
  icon: string;
  pack: 'marketing' | 'business';
}

const squadMembers: SquadMember[] = [
  // Marketing Squad
  { name: 'Athena', role: 'Strategist', icon: '🦉', pack: 'marketing' },
  { name: 'Calliope', role: 'Writer', icon: '✍️', pack: 'marketing' },
  { name: 'Themis', role: 'Quality Gate', icon: '⚖️', pack: 'marketing' },
  { name: 'Hermes', role: 'Amplifier', icon: '📢', pack: 'marketing' },
  { name: 'Chronos', role: 'Analytics', icon: '📊', pack: 'marketing' },
  { name: 'Daedalus', role: 'PM', icon: '🏗️', pack: 'marketing' },
  // Business Squad
  { name: 'Hera', role: 'Operator', icon: '👑', pack: 'business' },
  { name: 'Argus', role: 'Research', icon: '👁️', pack: 'business' },
  { name: 'Prometheus', role: 'Proposals', icon: '🔥', pack: 'business' },
  { name: 'Hestia', role: 'Client Triage', icon: '🏠', pack: 'business' },
  { name: 'Heracles', role: 'Unblocker', icon: '💪', pack: 'business' },
  { name: 'Mnemosyne', role: 'Reports', icon: '📝', pack: 'business' },
];

declare const anime: any;

export default function SquadSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Stagger animation for all members
    anime({
      targets: grid.children,
      opacity: [0, 1],
      scale: [0.8, 1],
      delay: anime.stagger(80),
      easing: 'easeOutExpo',
      duration: 600,
    });
  }, []);

  return (
    <section className="py-32 px-6 bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Il tuo <span className="text-amber-400">Squad AI</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            12 agenti specializzati, ognuno con un ruolo preciso.<br />
            L'intelligenza che lavora come un vero team.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {squadMembers.map((member, i) => (
            <div
              key={i}
              className="group p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-300 text-center opacity-0 cursor-pointer"
            >
              <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                {member.icon}
              </div>
              <h4 className="text-sm font-semibold text-white">{member.name}</h4>
              <p className="text-xs text-zinc-500">{member.role}</p>
              <span
                className={`inline-block mt-2 px-2 py-0.5 text-[10px] font-medium rounded-full ${
                  member.pack === 'marketing'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-violet-500/20 text-violet-400'
                }`}
              >
                {member.pack === 'marketing' ? 'Marketing' : 'Business'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
