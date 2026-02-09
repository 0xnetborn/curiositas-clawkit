'use client';

import { useEffect, useRef } from 'react';
import { createTimeline } from 'animejs';

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const progress = progressRef.current;
    const text = textRef.current;

    if (!container || !logo || !progress || !text) return;

    const tl = createTimeline({
      defaults: {
        ease: 'outExpo',
      }
    });

    tl.add(logo, {
      scale: [0.5, 1],
      opacity: [0, 1],
      duration: 800
    })
    .add(progress, {
      width: ['0%', '100%'],
      duration: 1500,
      ease: 'inOutQuad'
    }, '-=400')
    .add(text, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 400
    }, '-=800')
    .add(container, {
      opacity: 0,
      duration: 500,
      ease: 'outQuad',
      complete: () => {
        container.style.display = 'none';
      }
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
