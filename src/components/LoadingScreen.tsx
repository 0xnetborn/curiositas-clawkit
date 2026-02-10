'use client';

import { useEffect, useRef } from 'react';
import { animate, createTimeline, stagger } from 'animejs';

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = createTimeline({
      onComplete: () => {
        // Exit Animation
        animate(containerRef.current!, {
          translateY: '-100%',
          opacity: 0,
          duration: 1200,
          ease: 'inOutExpo',
          complete: () => {
            if (onComplete) onComplete();
          }
        });
      }
    });

    // 1. Iris Reveal (Background)
    tl.add('.iris-bg', {
      scale: [0, 40],
      opacity: [0, 0.05],
      duration: 1500,
      easing: 'outExpo',
    }, 0);

    // 2. Logo Draw In
    tl.add('.logo-path', {
      strokeDashoffset: [1000, 0],
      opacity: [0, 1],
      duration: 2000,
      easing: 'outExpo',
    }, 500);

    // 3. Text Glitch & Reveal
    tl.add('.boot-text', {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 800,
      delay: stagger(100),
    }, '-=1500');

  }, [onComplete]);

  // Parallel Animations
  useEffect(() => {
    // 4. Percentage Counter
    const proxy = { val: 0 };
    animate(proxy, {
      val: 100,
      duration: 2500,
      delay: 500,
      easing: 'linear',
      round: 1,
      update: (anim: any) => {
        const el = document.querySelector('.progress-val');
        if (el) {
          const val = Math.round(proxy.val);
          el.textContent = val < 10 ? `0${val}%` : `${val}%`;
        }
      }
    });

    // 5. Progress Bar Fill
    animate('.progress-bar', {
      width: ['0%', '100%'],
      duration: 3000,
      delay: 500,
      easing: 'linear',
    });

    // 6. Pulse Core
    animate('.core-pulse', {
      scale: [1, 1.5],
      opacity: [0.8, 0],
      duration: 1000,
      loop: true,
      easing: 'outSine',
    });

  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Iris Effect Element */}
      <div className="iris-bg absolute inset-0 bg-teal-500/5 rounded-full scale-0" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo SVG */}
        <div className="w-24 h-24 mb-12 relative">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path 
              className="logo-path"
              d="M50 20 L80 80 L20 80 Z M50 35 L65 70 L35 70 Z" 
              fill="none" 
              stroke="#14B8A6" 
              strokeWidth="2"
              strokeLinecap="square"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="50" cy="50" r="5" fill="#fff" className="core-pulse" />
          </svg>
        </div>

        {/* Info Text */}
        <div className="flex flex-col items-center space-y-4">
          <h2 className="boot-text font-mono text-sm tracking-[0.5em] text-white/80 uppercase opacity-0">
            Initializing
          </h2>
          
          <div className="flex items-center gap-4 boot-text opacity-0">
            <div className="h-px w-8 bg-white/20" />
            <span className="progress-val font-mono text-xl text-teal-500 font-bold">00%</span>
            <div className="h-px w-8 bg-white/20" />
          </div>

          <p className="boot-text text-[10px] font-mono text-white/30 uppercase tracking-widest opacity-0">
            Neural Link Established
          </p>
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full">
        <div className="h-full bg-teal-500 w-0 shadow-[0_0_20px_rgba(20,184,166,0.5)] progress-bar" />
      </div>
    </div>
  );
}
