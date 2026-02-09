'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const testimonials = [
  {
    quote: "Ho attivato il pack Marketing e in 10 minuti avevo già il piano settimanale pronto. I quality gates funzionano davvero.",
    author: "Marco R.",
    role: "Solopreneur B2B",
    avatar: "👨‍💼",
  },
  {
    quote: "Non sono un techy, ma con ClawKit ho attivato un workflow operativo in pochi minuti. Finalmente qualcosa di semplice.",
    author: "Giulia M.",
    role: "Freelance Marketing",
    avatar: "👩‍💻",
  },
  {
    quote: "Gli agenti sono diventati parte del mio team. La differenza? Approvo tutto io, niente autopost incasinato.",
    author: "Alessandro T.",
    role: "Founder SaaS",
    avatar: "👨‍🚀",
  },
];

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Title animation
    const title = container.querySelector('h2');
    if (title) {
      animate(title, {
        opacity: [0, 1],
        translateY: [30, 0],
        ease: 'outExpo',
        duration: 800,
      });
    }

    // Cards stagger animation
    animate(container.querySelectorAll('.testimonial-card'), {
      opacity: [0, 1],
      translateY: [50, 0],
      delay: stagger(200),
      ease: 'outExpo',
      duration: 800,
    });

    // Floating animation for icons
    animate(container.querySelectorAll('.floating-icon'), {
      translateY: [-10, 0],
      direction: 'alternate',
      loop: true,
      ease: 'inOutSine',
      duration: 2000,
      delay: stagger(500),
    });
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Chi <span className="text-amber-400">Ne Parla</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Founder, freelance e solopreneur che hanno già attivato i loro squad AI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el!; }}
              className="testimonial-card p-8 rounded-2xl bg-zinc-800/30 border border-zinc-700/30 opacity-0"
            >
              <div className="floating-icon text-4xl mb-4">{t.avatar}</div>
              <blockquote className="text-zinc-300 mb-6 leading-relaxed italic">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-lg">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">{t.author}</div>
                  <div className="text-zinc-500 text-sm">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 border border-zinc-700/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">🚀 Pronto a iniziare?</h4>
              <p className="text-zinc-400">100+ founder e freelance hanno già attivato il loro workspace.</p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors">
                Inizia Gratis
              </button>
              <button className="px-6 py-3 rounded-xl bg-zinc-700 text-white font-semibold hover:bg-zinc-600 transition-colors">
                Scopri di Più
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
