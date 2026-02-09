'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const quotes = [
  { text: "Operational efficiency increased by 400% within week one.", author: "MARCO R. / SAAS FOUNDER" },
  { text: "The quality gates are rigorous. It feels like a human team.", author: "GIULIA M. / MARKETING LEAD" },
  { text: "Finally, AI orchestration that doesn't feel like a toy.", author: "ALESSANDRO T. / CTO" },
];

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    animate(containerRef.current.children, {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(200),
      ease: 'outExpo',
      duration: 1000
    });
  }, []);

  return (
    <section className="py-32 px-6 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12" ref={containerRef}>
        {quotes.map((q, i) => (
          <div key={i} className="group cursor-default">
            <div className="text-4xl text-white/10 mb-4 font-serif">"</div>
            <p className="text-lg text-white/80 font-light leading-relaxed mb-6 group-hover:text-white transition-colors">
              {q.text}
            </p>
            <div className="h-px w-8 bg-white/20 mb-4 group-hover:w-full transition-all duration-700 ease-out" />
            <span className="text-xs font-mono text-emerald-500 tracking-widest uppercase">
              {q.author}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
