'use client';

import { useEffect, useRef } from 'react';
import { createTimeline, stagger, animate } from 'animejs';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    // Advanced Grid Animation
    const grid = document.querySelector('.bg-grid');
    if (grid) {
      animate(grid, {
        backgroundPosition: ['0px 0px', '40px 40px'],
        duration: 3000,
        loop: true,
        ease: 'linear',
      });
    }

    const tl = createTimeline({
      defaults: {
        ease: 'outExpo',
        duration: 1200,
      }
    });

    // Stagger letters for title (requires splitting text into spans)
    // For simplicity, we animate lines here, but advanced would be letter-by-letter
    tl.add(titleRef.current, {
      opacity: [0, 1],
      translateY: [40, 0],
      scale: [0.95, 1],
      filter: ['blur(10px)', 'blur(0px)'],
    })
    .add(subtitleRef.current, {
      opacity: [0, 1],
      translateY: [20, 0],
    }, '-=800')
    .add('.hero-btn', {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(100),
    }, '-=800');

  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-5xl px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-white/60 tracking-wider">SYSTEM ONLINE v1.0</span>
        </div>

        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight opacity-0"
        >
          Curiositas <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">ClawKit</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-white/40 font-light max-w-2xl mx-auto mb-12 opacity-0"
        >
          High-performance AI orchestration. <br className="hidden md:block" />
          Deploy intelligent agents with surgical precision.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button className="hero-btn group relative px-8 py-4 bg-white text-black font-medium text-sm tracking-wide overflow-hidden opacity-0">
            <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 group-hover:text-black transition-colors">INITIATE DEPLOYMENT</span>
          </button>
          
          <button className="hero-btn group px-8 py-4 border border-white/20 text-white/60 font-medium text-sm tracking-wide hover:text-white hover:border-white/40 transition-all opacity-0">
            VIEW DOCUMENTATION
          </button>
        </div>
      </div>
      
      {/* Decorative Grid Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
