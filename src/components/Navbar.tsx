'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from './ThemeContext';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Intentionally setting mounted state in effect for hydration mismatch prevention
  useEffect(() => {
    setMounted(true);
  }, []);

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
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 py-4 border-b border-white/5 bg-black/50 backdrop-blur-xl dark:bg-black/50 light:bg-white/50"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-4 group cursor-pointer"
          aria-label="CurioKit home page"
        >
          <div className="relative w-8 h-8 transition-transform group-hover:scale-110">
            <Image
              src="/logo.webp"
              alt="CurioKit Logo"
              fill
              className={`object-contain transition-opacity ${mounted && theme === 'light' ? 'invert-0' : 'invert'} opacity-80 group-hover:opacity-100`}
            />
          </div>
          <span className={`font-mono text-sm tracking-widest transition-colors ${mounted && theme === 'light' ? 'text-slate-800' : 'text-white/80'} group-hover:text-white`}>
            CURIOKIT
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide" role="menubar" aria-label="Primary navigation">
          {['FEATURES', 'WORKFLOW', 'PRICING'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              role="menuitem"
              className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded ${mounted && theme === 'light' ? 'text-slate-600 hover:text-slate-900' : 'text-white/40 hover:text-white'}`}
              tabIndex={0}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all ${mounted && theme === 'light' ? 'text-slate-600 hover:bg-slate-100' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            aria-label="Toggle theme"
            aria-pressed={theme === 'dark'}
          >
            {mounted && theme === 'dark' ? (
              // Sun icon for dark mode
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              // Moon icon for light mode
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <Link 
            href="/dashboard" 
            className={`px-4 py-2 border text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded ${mounted && theme === 'light' ? 'border-slate-200 text-slate-700 hover:bg-slate-50' : 'border-white/10 text-white/60 hover:bg-white/5 hover:text-white'}`}
            aria-label="Access dashboard console"
          >
            ACCESS CONSOLE
          </Link>
        </div>
      </div>
    </nav>
  );
}
