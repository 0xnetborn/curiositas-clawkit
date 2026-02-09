'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const plans = [
  {
    name: 'Starter',
    price: '0€',
    period: '/mese',
    description: 'Per chi vuole provare',
    features: [
      'Accesso a 1 Pack',
      '2 agenti attivi',
      '100 credits/mese',
      'Output in bozza',
      'Supporto community',
    ],
    gradient: 'from-zinc-600 to-zinc-700',
    popular: false,
  },
  {
    name: 'Pro',
    price: '49€',
    period: '/mese',
    description: 'Per freelancer e solopreneur',
    features: [
      'Accesso a tutti i Pack',
      '12 agenti attivi',
      '1.000 credits/mese',
      'Priorità elaborazione',
      'Report settimanali',
      'Supporto email',
    ],
    gradient: 'from-amber-500 to-orange-600',
    popular: true,
  },
  {
    name: 'Team',
    price: '149€',
    period: '/mese',
    description: 'Per micro-team e agenzie',
    features: [
      'Tutto di Pro',
      'Agent illimitati',
      '5.000 credits/mese',
      'Pipeline personalizzate',
      'Multi-workspace',
      'API access',
      'Supporto dedicato',
    ],
    gradient: 'from-violet-500 to-purple-600',
    popular: false,
  },
];

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Animate cards on mount
    animate(container.querySelectorAll('.pricing-card'), {
      opacity: [0, 1],
      translateY: [60, 0],
      delay: stagger(150, { start: 200 }),
      ease: 'outExpo',
      duration: 800,
    });

    // Hover animations for cards
    cardsRef.current.forEach((card) => {
      if (!card) return;
      
      card.addEventListener('mouseenter', () => {
        animate(card, {
          scale: 1.02,
          duration: 300,
          ease: 'outQuad',
        });
      });
      
      card.addEventListener('mouseleave', () => {
        animate(card, {
          scale: 1,
          duration: 300,
          ease: 'outQuad',
        });
      });
    });
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prezzi <span className="text-amber-400">Semplici</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Nessun vincolo. Cancelli quando vuoi.<br />
            Paga solo per quello che usi.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              ref={(el) => { if(el) cardsRef.current[i] = el; }}
              className={`pricing-card relative p-8 rounded-2xl border transition-all duration-300 opacity-0 ${
                plan.popular
                  ? 'bg-zinc-800/80 border-amber-500/50'
                  : 'bg-zinc-900/50 border-zinc-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-semibold">
                  Più Popolare
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-zinc-500 text-sm">{plan.description}</p>
              </div>

              <div className="text-center mb-8">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                <span className="text-zinc-500">{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-center gap-3 text-zinc-300 text-sm">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg hover:shadow-amber-500/20`
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                {plan.price === '0€' ? 'Inizia Gratis' : 'Prova 14 Giorni'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 text-center">
          <p className="text-zinc-400 text-sm">
            💡 <strong>Enterprise?</strong> Contattaci per soluzioni custom e volumi elevati.
          </p>
        </div>
      </div>
    </section>
  );
}
