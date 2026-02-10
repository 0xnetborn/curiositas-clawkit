'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, createTimeline } from 'animejs';
import Image from 'next/image';

const terminalLines = [
  "> INITIALIZING NEURAL CORE...",
  "> LOADING AGENT SQUAD...",
  "> ESTABLISHING UPLINK...",
  "> SYSTEM READY."
];

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [terminalIndex, setTerminalIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = createTimeline({
      onComplete: () => {
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

    // Fade In Logo
    tl.add('.loader-logo', {
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 800,
      easing: 'outExpo',
    }, 0);

  }, [onComplete]);

  // Independent Terminal Effect
  useEffect(() => {
    if (terminalIndex >= terminalLines.length) return;

    const line = terminalLines[terminalIndex];
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex < line.length) {
        setDisplayedText(prev => prev + line[charIndex]);
        charIndex++;
      } else {
        clearInterval(interval);
        // Pause before next line or exit
        setTimeout(() => {
          setTerminalIndex(prev => {
            if (prev + 1 >= terminalLines.length) {
               // Trigger exit after a short delay
               setTimeout(() => {
                  // We need to find the timeline and finish it, but simpler to call logic outside
                  // Actually, let's just let the manual timeout handle exit below
               }, 500);
               return prev + 1;
            }
            return prev;
          });
          setDisplayedText(prev => prev + "\n");
        }, 200);
      }
    }, 30); // Typing speed

    return () => clearInterval(interval);
  }, [terminalIndex]);

  // Force Exit after 2.5s max
  useEffect(() => {
    const timer = setTimeout(() => {
      // Logic to force close if stuck (handled by parent timeout usually, but we are custom here)
      if (containerRef.current) {
        animate(containerRef.current, {
            translateY: '-100%',
            duration: 800,
            ease: 'inOutExpo'
        });
        if(onComplete) onComplete();
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900/10 via-black/50 to-black pointer-events-none" />

      <div className="loader-logo relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="relative w-24 h-24 mb-6">
           <div className="absolute inset-0 bg-teal-500/20 blur-xl rounded-full" />
           <Image 
            src="/logo.webp" 
            alt="CurioKit Logo" 
            fill
            className="object-contain drop-shadow-[0_0_15px_rgba(20,184,166,0.5)]"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold font-mono tracking-widest text-white mb-8 drop-shadow-lg">
          CURIOKIT
        </h1>

        {/* Terminal Output */}
        <div className="w-full max-w-md bg-black/50 border border-white/10 p-4 font-mono text-xs text-teal-500 shadow-2xl backdrop-blur-sm rounded">
          <div className="flex gap-1.5 mb-2 border-b border-white/5 pb-2">
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
          <div className="whitespace-pre-wrap leading-relaxed">
            {displayedText}
            <span className="animate-blink">_</span>
          </div>
        </div>
      </div>
    </div>
  );
}
