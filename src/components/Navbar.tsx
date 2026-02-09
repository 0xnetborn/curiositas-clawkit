'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    // Reveal Nav
    animate(navRef.current, {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 1000,
      ease: 'outExpo',
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 py-4 border-b border-white/5 bg-black/50 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer">
          {/* Logo SVG */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white transition-transform group-hover:scale-110">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-mono text-sm tracking-widest text-white/80 group-hover:text-white transition-colors">
            CURIOSITAS
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide text-white/40">
          {['FEATURES', 'WORKFLOW', 'PRICING'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>

        <button className="px-4 py-2 border border-white/10 text-white/60 text-xs font-medium hover:bg-white/5 hover:text-white transition-all">
          ACCESS CONSOLE
        </button>
      </div>
    </nav>
  );
}
