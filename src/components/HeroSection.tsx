'use client';

import { useEffect, useRef } from 'react';
import { createTimeline, stagger, animate } from 'animejs';
import Link from 'next/link';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    // Advanced Grid Animation
    const grid = document.querySelector('.bg-grid');
    if (grid) {
      animate(grid, {
        backgroundPosition: ['0px 0px', '40px 40px'],
        duration: 3000,
        loop: true,
        ease: 'linear',
      });
    }

    const tl = createTimeline({
      defaults: {
        ease: 'outExpo',
        duration: 1200,
      }
    });

    // Scramble Effect for Title with enhanced timing
    const finalBuffer = 'CurioKit';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
    
    if (textRef.current) {
      const proxy = { value: 0 };
      
      tl.add(proxy, {
        value: 1,
        duration: 1200,
        ease: 'outExpo',
        onUpdate: (anim) => {
          if (!textRef.current) return;
          const progress = anim.progress; // 0 to 1
          const length = Math.floor(progress * finalBuffer.length);
          let output = '';
          
          for (let i = 0; i < finalBuffer.length; i++) {
            if (i < length) {
              output += finalBuffer[i];
            } else {
              output += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          textRef.current.innerText = output;
        }
      }, 0); // Start immediately
    }

    // Enhanced Hero Reveal Timeline
    tl.add(titleRef.current, {
      opacity: [0, 1],
      translateY: [50, 0],
      scale: [0.92, 1],
      filter: ['blur(20px)', 'blur(0px)'],
      duration: 1400,
    }, 0);

    // Badge stagger reveal (conditional on badgeRef being available)
    if (badgeRef.current) {
      tl.add(badgeRef.current, {
        opacity: [0, 1],
        translateY: [-15, 0],
        scale: [0.9, 1],
        duration: 800,
      }, '-=800');
    }

    // Enhanced subtitle reveal with blur effect
    tl.add(subtitleRef.current, {
      opacity: [0, 1],
      translateY: [25, 0],
      filter: ['blur(10px)', 'blur(0px)'],
      duration: 1200,
    }, '-=700')
    // Buttons with enhanced stagger
    tl.add('.hero-btn', {
      opacity: [0, 1],
      translateY: [30, 0],
      scale: [0.95, 1],
      delay: stagger(150, { from: 'center' }),
    }, '-=900')
    // Decorative elements reveal
    .add('.hero-decor', {
      opacity: [0, 1],
      translateX: [20, 0],
      delay: stagger(300, { from: 'first' }),
      duration: 800,
    }, '-=600');

    // Enhanced Particle Animation
    animate('.dust-particle', {
      translateY: [0, -150],
      translateX: [0, 20],
      opacity: [0, 0.8, 0],
      scale: [0.5, 1.2, 0.3],
      duration: 5000,
      delay: stagger(150),
      loop: true,
      easing: 'easeInOutSine',
    });

    // Glow ring pulse animation
    animate('.glow-ring', {
      scale: [1, 1.5],
      opacity: [0.3, 0],
      duration: 3000,
      loop: true,
      easing: 'easeOutExpo',
    });

  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Enhanced Data Dust Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div 
            key={i} 
            className="dust-particle absolute w-0.5 h-0.5 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
              animationDuration: `${4 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Animated Glow Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        <div className="glow-ring absolute inset-0 border border-white/5 rounded-full" />
        <div className="glow-ring absolute inset-10 border border-white/5 rounded-full" />
        <div className="glow-ring absolute inset-20 border border-teal-500/10 rounded-full" />
      </div>

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-5xl px-6">
        {/* Enhanced Badge with stagger */}
        <div 
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 opacity-0"
        >
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-xs font-mono text-white/60 tracking-widest">SYSTEM ONLINE v1.0</span>
        </div>

        <h1 
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-tight opacity-0"
        >
          <span ref={textRef} className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 font-mono">
            Loading...
          </span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-white/40 font-light max-w-2xl mx-auto mb-12 opacity-0"
        >
          Deploy AI squads that work, ship, and scale. <br className="hidden md:block" />
          Automated workflows for solopreneurs.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link href="/dashboard" className="hero-btn group relative px-8 py-4 bg-white text-black font-medium text-sm tracking-wide overflow-hidden opacity-0 inline-block cursor-pointer">
            <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 group-hover:text-black transition-colors">INITIATE DEPLOYMENT</span>
          </Link>
          
          <button className="hero-btn group px-8 py-4 border border-white/20 text-white/60 font-medium text-sm tracking-wide hover:text-white hover:border-white/40 transition-all opacity-0 cursor-pointer">
            VIEW DOCUMENTATION
          </button>
        </div>
      </div>
      
      {/* Decorative Grid Lines with reveal */}
      <div className="hero-decor absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0" />
      <div className="hero-decor absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0" />
    </section>
  );
}
