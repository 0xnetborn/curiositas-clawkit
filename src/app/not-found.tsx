'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { animate } from 'animejs';

export default function NotFound() {
  const agentRef = useRef<HTMLDivElement>(null);
  const voidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Agent fade in and float
    animate(agentRef.current!, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000,
      easing: 'outExpo',
    });

    // Void pulse animation
    animate(voidRef.current!, {
      scale: [0.8, 1.1, 0.9, 1],
      opacity: [0.3, 0.6, 0.4, 0.5],
      duration: 3000,
      loop: true,
      easing: 'easeInOutSine',
    });

    // Stagger content entrance
    const contentElements = document.querySelectorAll('.notfound-content');
    contentElements.forEach((el, index) => {
      animate(el as HTMLElement, {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: index * 150,
        duration: 600,
        easing: 'outExpo',
      });
    });

  }, []);

  return (
    <div 
      className="min-h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900/5 via-black/80 to-black pointer-events-none" />

      {/* Void Portal Effect */}
      <div 
        ref={voidRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)'
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="notfound-particle absolute w-1 h-1 bg-teal-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Lost Agent Illustration */}
      <div ref={agentRef} className="relative z-10 mb-8">
        <div className="relative w-48 h-48 mx-auto">
          {/* Glow */}
          <div className="absolute inset-0 bg-teal-500/20 blur-3xl rounded-full" />
          
          {/* Agent Icon / Void Gateway */}
          <div className="relative w-full h-full glass-panel rounded-full flex items-center justify-center">
            <div className="text-6xl">🕳️</div>
            <div className="absolute inset-0 border-2 border-teal-500/30 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
          </div>
        </div>
      </div>

      {/* 404 Text */}
      <div className="notfound-content relative z-10 text-center mb-12">
        <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600 mb-4 tracking-tight">
          404
        </h1>
        <p className="text-2xl text-white/80 font-medium mb-2">
          Agent Lost in Void
        </p>
        <p className="text-white/50 max-w-md mx-auto">
          The agent you&apos;re looking for has wandered off the grid. 
          Let&apos;s get you back on mission.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="notfound-content relative z-10 flex flex-wrap gap-4 justify-center mb-16">
        <Link 
          href="/"
          className="group flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(20,184,166,0.4)]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Return Base
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-6 py-3 glass-panel hover:bg-white/10 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Go Back
        </button>
      </div>

      {/* Debug Info */}
      <div className="notfound-content relative z-10 glass-panel px-6 py-4 rounded-lg max-w-md w-full mx-4">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-sm font-mono text-teal-500">DIAGNOSTICS</span>
        </div>
        <div className="space-y-1 text-xs font-mono text-white/60">
          <p>Signal Lost: 404.17 NOT_FOUND</p>
          <p>Agent Status: DISORIENTED</p>
          <p>Grid Position: UNKNOWN</p>
          <p>Recovery: POSSIBLE</p>
        </div>
      </div>

      {/* Footer */}
      <div className="notfound-content absolute bottom-8 text-white/30 text-sm">
        CurioKit v1.0 • Neural Grid Active
      </div>
    </div>
  );
}
