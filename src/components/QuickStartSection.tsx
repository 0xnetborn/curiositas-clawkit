'use client';

import { useEffect, useRef } from 'react';
import { stagger } from 'animejs';
import { Timeline } from 'animejs';

export default function QuickStartSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            new Timeline()
              .add('#quick-start-title', {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
              })
              .add('#quick-start-intro', {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
              }, '-=600')
              .add('.quick-start-step', {
                opacity: [0, 1],
                translateX: [-30, 0],
                delay: stagger(150),
                duration: 800,
              }, '-=400');
            
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-6 bg-black border-y border-white/5 relative overflow-hidden"
      aria-labelledby="quick-start-title"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-teal-500/20 bg-teal-500/5 mb-6">
            <span className="w-1.5 h-1.5 bg-teal-500 animate-pulse" />
            <span className="text-[10px] font-mono text-teal-500 tracking-widest uppercase">Quickstart</span>
          </div>
          <h2 id="quick-start-title" className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-white opacity-0">
            Get Started <span className="text-white/30">in Minutes</span>
          </h2>
          <p id="quick-start-intro" className="text-lg text-white/40 max-w-2xl mx-auto opacity-0 leading-relaxed">
            Deploy your first AI squad in three simple steps. No complex setup required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="quick-start-step bg-zinc-900/50 border border-white/5 p-8 rounded-lg opacity-0 hover:border-teal-500/30 transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 flex items-center justify-center rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal-500">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-xs font-mono text-white/20">01</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Initialize Project</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Create a new workspace and choose your deployment target.
            </p>
            <div className="bg-black border border-white/10 rounded p-3 font-mono text-xs text-white/60 overflow-hidden">
              <span className="text-teal-500">$</span> curiokit init my-project<br />
              <span className="text-teal-500">$</span> cd my-project
            </div>
          </div>

          {/* Step 2 */}
          <div className="quick-start-step bg-zinc-900/50 border border-white/5 p-8 rounded-lg opacity-0 hover:border-teal-500/30 transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 flex items-center justify-center rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal-500">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="text-xs font-mono text-white/20">02</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Configure Squad</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Select pre-built agent packs or customize your own.
            </p>
            <div className="bg-black border border-white/10 rounded p-3 font-mono text-xs text-white/60 overflow-hidden">
              <span className="text-teal-500">$</span> curiokit add --pack=marketing<br />
              <span className="text-teal-500">$</span> curiokit configure agents
            </div>
          </div>

          {/* Step 3 */}
          <div className="quick-start-step bg-zinc-900/50 border border-white/5 p-8 rounded-lg opacity-0 hover:border-teal-500/30 transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 flex items-center justify-center rounded-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal-500">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xs font-mono text-white/20">03</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Deploy & Scale</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Launch your squad and monitor performance in real-time.
            </p>
            <div className="bg-black border border-white/10 rounded p-3 font-mono text-xs text-white/60 overflow-hidden">
              <span className="text-teal-500">$</span> curiokit deploy --prod<br />
              <span className="text-teal-500">$</span> curiokit status
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-8 mt-12">
          <a href="#" className="text-sm text-teal-500 hover:text-teal-400 transition-colors flex items-center gap-2 group">
            View Documentation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#" className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2 group">
            Browse Templates
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
