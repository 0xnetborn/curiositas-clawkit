'use client';

import { useRef, useState } from 'react';
import { animate } from 'animejs';

export default function VideoDemoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    
    if (playButtonRef.current) {
      animate(playButtonRef.current, {
        scale: [1, 1.5],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeOutQuad'
      });
    }

    if (containerRef.current) {
      animate(containerRef.current, {
        scale: [0.98, 1],
        duration: 600,
        easing: 'outExpo'
      });
    }
  };

  return (
    <section 
      className="py-32 px-6 bg-black relative overflow-hidden"
      aria-labelledby="video-demo-heading"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-teal-950/10 to-black pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-teal-500/20 bg-teal-500/5 mb-6">
            <span className="w-1.5 h-1.5 bg-teal-500 animate-pulse" />
            <span className="text-[10px] font-mono text-teal-500 tracking-widest uppercase">See It In Action</span>
          </div>
          
          <h2 id="video-demo-heading" className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-white">
            Watch <span className="text-white/40">CurioKit</span> <span className="text-white">Work</span>
          </h2>
          
          <p className="text-lg text-white/40 font-light max-w-2xl mx-auto leading-relaxed">
            See how AI squads orchestrate your workflow in real-time. From task assignment to completion tracking.
          </p>
        </div>

        {/* Video Container */}
        <div 
          ref={containerRef}
          className="relative aspect-video bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-teal-900/10"
        >
          {/* Device Frame Mockup */}
          <div className="absolute inset-0 flex items-center justify-center">
            {!isPlaying ? (
              /* Play Button Overlay */
              <button
                ref={playButtonRef}
                onClick={handlePlay}
                className="group relative w-24 h-24 flex items-center justify-center rounded-full bg-white/5 border border-white/20 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Play demo video"
              >
                {/* Pulsing Ring */}
                <span className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping" />
                
                {/* Play Icon */}
                <svg 
                  className="w-10 h-10 text-white/80 group-hover:text-teal-400 transition-colors ml-1" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            ) : (
              /* Video Content Placeholder */
              <div className="w-full h-full flex flex-col">
                {/* Mock UI Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-xs font-mono text-white/40">curio-demo.mov</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-1/3 h-full bg-teal-500 animate-pulse" />
                    </div>
                    <span className="text-[10px] font-mono text-white/40">0:23</span>
                  </div>
                </div>
                
                {/* Mock Content */}
                <div className="flex-1 p-8 grid grid-cols-3 gap-6">
                  {/* Sidebar */}
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-10 bg-white/5 rounded border border-white/5 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                    ))}
                  </div>
                  
                  {/* Main Area */}
                  <div className="col-span-2 space-y-4">
                    <div className="h-32 bg-gradient-to-br from-teal-500/10 to-transparent rounded border border-teal-500/20 flex items-center justify-center">
                      <span className="text-xs font-mono text-teal-500/60">🎯 Agent ATHENA Processing</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-20 bg-white/5 rounded border border-white/5" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-teal-500/30 rounded-tl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-teal-500/30 rounded-tr" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-teal-500/30 rounded-bl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-teal-500/30 rounded-br" />
        </div>

        {/* Video Controls / Info */}
        <div className="mt-8 flex items-center justify-center gap-8">
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            <span>HD 1080p</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>2:34 runtime</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Full workflow demo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
