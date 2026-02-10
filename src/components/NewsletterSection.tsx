'use client';

import { useState, useRef } from 'react';
import { animate } from 'animejs';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Animate success
    if (formRef.current) {
      animate(formRef.current, {
        scale: [1, 0.95, 1],
        duration: 400,
        ease: 'inOutQuad'
      });
    }
    
    if (successRef.current) {
      animate(successRef.current, {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 400,
        ease: 'outQuad'
      });
    }
    
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="py-24 px-6 border-t border-white/5 bg-black relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="max-w-xl mx-auto text-center relative z-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-teal-500/20 bg-teal-500/5 mb-6">
            <span className="w-1.5 h-1.5 bg-teal-500" />
            <span className="text-[10px] font-mono text-teal-500 tracking-widest uppercase">Stay Updated</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Join the <span className="text-teal-500">Newsletter</span>
          </h2>
          
          <p className="text-white/40 font-light leading-relaxed">
            Get weekly updates on new AI agents, features, and Curiositas Studio developments. No spam, just signal.
          </p>
        </div>

        {status === 'success' ? (
          <div 
            className="p-6 border border-teal-500/30 bg-teal-500/10"
            ref={successRef}
          >
            <div className="text-4xl mb-3">✨</div>
            <p className="text-teal-400 font-medium">You're on the list!</p>
            <p className="text-white/40 text-sm mt-2">Check your inbox for a confirmation.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-4 text-xs text-white/40 hover:text-white transition-colors"
            >
              Add another email →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter@email.com"
                required
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-teal-500/50 focus:bg-white/10 transition-all font-mono text-sm"
              />
              <div className="absolute inset-0 rounded-lg border border-teal-500/0 group-focus-within:border-teal-500/30 pointer-events-none transition-all duration-300" />
            </div>
            
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-6 py-4 bg-white text-black font-medium text-sm tracking-wide rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </form>
        )}

        <p className="mt-6 text-xs text-white/30 font-mono">
          2,847 developers already subscribed
        </p>
      </div>
    </section>
  );
}
