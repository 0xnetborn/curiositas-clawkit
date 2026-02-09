'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    animate(navRef.current, {
      opacity: [0, 1],
      translateY: [-20, 0],
      ease: 'outExpo',
      duration: 800,
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Curiositas
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-zinc-400 hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</a>
          <a href="#docs" className="text-zinc-400 hover:text-white transition-colors">Docs</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Accedi
          </button>
          <button className="px-5 py-2 text-sm font-semibold rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 transition-colors">
            Inizia Gratis
          </button>
        </div>
      </div>
    </nav>
  );
}
