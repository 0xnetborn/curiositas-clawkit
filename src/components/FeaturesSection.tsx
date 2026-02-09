'use client';

import { useEffect, useRef } from 'react';

declare const anime: any;

const features = [
  {
    icon: '🎯',
    title: 'Pack Orientati a Risultati',
    description: 'Non configuri agenti. Scegli workflow completi per casi d\'uso reali.',
  },
  {
    icon: '🔒',
    title: 'Affidabilità Gestita',
    description: 'Quality gates, retry automatici, fallback. Tu focalizzati sul lavoro.',
  },
  {
    icon: '👤',
    title: 'Controllo Umano',
    description: 'Niente autopost. Output in bozza, approvazione esplicita, sempre.',
  },
  {
    icon: '⚡',
    title: 'Deploy Istantaneo',
    description: 'Attivi un workspace in pochi minuti. Zero configurazione.',
  },
  {
    icon: '🛡️',
    title: 'Sicurezza Inclusa',
    description: 'Dati crittografati, audit log, compliance base inclusi.',
  },
  {
    icon: '🔄',
    title: 'Flussi Visibili',
    description: 'Stati chiari, blockers evidenti, sempre sai cosa succede.',
  },
];

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const grid = gridRef.current;
    if (!container || !grid) return;

    // Title animation
    anime({
      targets: container.querySelectorAll('h2, p'),
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(100),
      easing: 'easeOutExpo',
      duration: 600,
    });

    // Feature cards stagger
    anime({
      targets: grid.children,
      opacity: [0, 1],
      scale: [0.9, 1],
      delay: anime.stagger(100, { start: 300 }),
      easing: 'easeOutExpo',
      duration: 600,
    });
  }, []);

  return (
    <section ref={containerRef} id="features" className="py-32 px-6 bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Perché <span className="text-amber-400">Curiositas</span>?
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Non un altro tool AI generico. Un sistema pensato per chi<br className="hidden md:block" />
            vuole risultati concreti, senza perdere il controllo.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group p-6 rounded-xl bg-zinc-800/30 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-300 opacity-0 cursor-pointer"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
