'use client';

import { useEffect, useRef } from 'react';
import { animate, createTimeline, stagger } from 'animejs';
import Image from 'next/image';

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = createTimeline({
      onComplete: () => {
        // Exit Animation: Curtain Up
        animate(containerRef.current!, {
          translateY: '-100%',
          duration: 800,
          ease: 'inOutExpo',
          complete: () => {
            if (onComplete) onComplete();
          }
        });
      }
    });

    // 1. Fade In Elements
    tl.add('.loader-content', {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 1000,
      easing: 'outExpo',
    }, 0);

    // 2. Pulse Ring
    tl.add('.pulse-ring', {
      scale: [1, 2],
      opacity: [0.5, 0],
      duration: 2000,
      loop: true,
      easing: 'outSine',
    }, 0);

  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

      <div className="loader-content relative z-10 flex flex-col items-center">
        {/* Logo Container */}
        <div className="relative w-24 h-24 mb-8">
           {/* Glow Effect */}
           <div className="absolute inset-0 bg-teal-500/20 blur-xl rounded-full animate-pulse" />
           
           {/* Pulse Ring */}
           <div className="absolute inset-0 border border-white/10 rounded-full scale-100 pulse-ring pointer-events-none" />

           {/* REAL LOGO */}
           <div className="relative w-full h-full">
             <Image 
              src="/logo.webp" 
              alt="CurioKit Logo" 
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(20,184,166,0.3)]"
              priority
            />
           </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-bold font-mono tracking-widest text-white mb-6">
          CURIOKIT
        </h1>

        {/* Status Text */}
        <div className="flex items-center gap-3 text-xs font-mono text-white/40 tracking-[0.3em] uppercase">
          <span className="animate-blink">Initializing</span>
          <span className="text-white/20">//</span>
          <span className="text-teal-500">System Ready</span>
        </div>
      </div>

      {/* Bottom Progress Line (Optional / Aesthetic) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
        <div className="h-full bg-teal-500 w-full animate-[loading_2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
