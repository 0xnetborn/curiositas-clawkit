'use client';

import { useEffect, useRef } from 'react';
import { animate, createTimeline, stagger } from 'animejs';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    if (!hero || !title || !subtitle) return;

    const tl = createTimeline({
      defaults: {
        ease: 'outExpo',
        duration: 1000,
      }
    });

    tl.add(hero, {
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 800
    })
    .add(title, {
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 600
    }, '-=400')
    .add(subtitle, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600
    }, '-=300');

    // Animate cards on scroll into view
    const cards = cardsRef.current?.children;
    if (cards) {
      animate(Array.from(cards), {
        opacity: [0, 1],
        translateY: [50, 0],
        delay: stagger(150, { start: 500 }),
        ease: 'outExpo',
        duration: 800,
      });
    }
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-b from-zinc-950 to-zinc-900">
      <div className="text-center max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent opacity-0"
        >
          Curiositas ClawKit
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-zinc-400 mb-12 opacity-0"
        >
          Deploy immediato. Pack orientati a risultati.<br />
          <span className="text-zinc-500">L'intelligenza che lavora per te.</span>
        </p>
      </div>

      <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full mt-8">
        {/* Pack 1 Card */}
        <PackCard
          title="Marketing Co-Founder"
          subtitle="Presence Engine"
          icon="🎯"
          description="Costruisci e mantieni presenza online con senso. Ricerca, scrittura, review, repurpose e amplificazione."
          features={['Athena - Strategist', 'Calliope - Writer', 'Hermes - Amplifier']}
          gradient="from-emerald-500 to-teal-600"
        />

        {/* Pack 2 Card */}
        <PackCard
          title="Business Operator"
          subtitle="Execution Engine"
          icon="⚡"
          description="Governa operatività e gestione business ogni settimana. Priorità, esecuzione, follow-up e decisioni."
          features={['Hera - Operator', 'Argus - Research', 'Prometheus - Proposals']}
          gradient="from-violet-500 to-purple-600"
        />
      </div>
    </section>
  );
}

function PackCard({
  title,
  subtitle,
  icon,
  description,
  features,
  gradient,
}: {
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  features: string[];
  gradient: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="group relative p-8 rounded-2xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 hover:border-zinc-600 transition-all duration-300 opacity-0 cursor-pointer overflow-hidden hover:scale-[1.02]"
    >
      {/* Gradient glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

      <div className="relative z-10">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
        <p className="text-sm font-medium text-amber-400 mb-4">{subtitle}</p>
        <p className="text-zinc-400 mb-6 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {features.map((feature, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-700/50 text-zinc-300 border border-zinc-600/50"
            >
              {feature}
            </span>
          ))}
        </div>

        <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${gradient} text-white font-semibold hover:shadow-lg hover:shadow-${gradient.split('-')[1]}/20 transition-all duration-300 transform group-hover:translate-y-[-2px]`}>
          Attiva Pack
        </button>
      </div>
    </div>
  );
}
