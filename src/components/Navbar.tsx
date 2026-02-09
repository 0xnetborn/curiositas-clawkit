'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import Image from 'next/image';
import Link from 'next/link';

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
        <Link href="/" className="flex items-center gap-4 group cursor-pointer">
          <div className="relative w-8 h-8 transition-transform group-hover:scale-110">
            <Image 
              src="/logo.webp" 
              alt="CurioKit Logo" 
              fill 
              className="object-contain invert opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <span className="font-mono text-sm tracking-widest text-white/80 group-hover:text-white transition-colors">
            CURIOKIT
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide text-white/40">
          {['FEATURES', 'WORKFLOW', 'PRICING'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>

        <Link href="/dashboard" className="px-4 py-2 border border-white/10 text-white/60 text-xs font-medium hover:bg-white/5 hover:text-white transition-all">
          ACCESS CONSOLE
        </Link>
      </div>
    </nav>
  );
}
