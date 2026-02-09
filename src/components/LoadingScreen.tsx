'use client';

import { useEffect, useRef } from 'react';

declare const anime: any;

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = anime.timeline({
      easing: 'easeOutExpo',
    });

    // Logo animation
    tl.fromTo(
      logoRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 800 }
    );

    // Progress bar
    tl.fromTo(
      progressRef.current,
      { width: '0%' },
      { width: '100%', duration: 1500, easing: 'easeInOutQuad' },
      '-=400'
    );

    // Text fade in
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 400 },
      '-=800'
    );

    // Exit animation
    tl.add({
      targets: containerRef.current,
      opacity: 0,
      duration: 500,
      easing: 'easeOutQuad',
      complete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950"
    >
      <div ref={logoRef} className="mb-8">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
          <span className="text-white font-bold text-3xl">C</span>
        </div>
      </div>

      <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden mb-4">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"
          style={{ width: '0%' }}
        />
      </div>

      <div ref={textRef} className="text-zinc-400 text-sm">
        Caricamento...
      </div>
    </div>
  );
}
