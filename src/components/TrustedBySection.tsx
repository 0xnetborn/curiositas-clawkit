'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

export default function TrustedBySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && sectionRef.current) {
            const logos = sectionRef.current.querySelectorAll('.trusted-logo');
            animate(sectionRef.current, {
              opacity: [0, 1],
              translateY: [30, 0],
              ease: 'outExpo',
              duration: 800,
            });
            animate(Array.from(logos), {
              opacity: [0, 1],
              translateX: [-20, 0],
              delay: stagger(100),
              ease: 'outQuad',
              duration: 600,
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const logos = [
    { name: 'Next.js', svg: '/next.svg', alt: 'Next.js' },
    { name: 'Vercel', svg: '/vercel.svg', alt: 'Vercel' },
    { name: 'React', text: '⚛️', alt: 'React' },
    { name: 'TypeScript', text: 'TS', alt: 'TypeScript' },
    { name: 'AI', text: '🤖', alt: 'AI' },
    { name: 'OpenSource', text: '◈', alt: 'Open Source' },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-8 px-6 border-t border-white/5 bg-black/50 opacity-0 translate-y-8"
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-xs font-mono text-white/30 uppercase tracking-[0.2em] mb-8">
          Built With
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {logos.map((logo, index) => (
            <div 
              key={logo.name}
              className="trusted-logo opacity-0 flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors duration-300 cursor-default"
            >
              {logo.svg ? (
                <img 
                  src={logo.svg} 
                  alt={logo.alt} 
                  className="h-6 md:h-8 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              ) : (
                <span className="text-lg md:text-xl font-semibold">{logo.text}</span>
              )}
              <span className="text-xs font-mono hidden md:block">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
