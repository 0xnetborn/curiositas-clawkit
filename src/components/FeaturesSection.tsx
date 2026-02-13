'use client';

import { useState, useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import SpotlightCard from '@/components/ui/SpotlightCard';

const features = [
  {
    title: "Orchestration",
    desc: "Multi-agent coordination",
    iconPath: "M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z",
    demoColor: "from-teal-500 to-cyan-500"
  },
  {
    title: "Deployment",
    desc: "Instant serverless deploy",
    iconPath: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z polyline points='13 2 13 9 20 9'",
    demoColor: "from-emerald-500 to-green-500"
  },
  {
    title: "Security",
    desc: "Enterprise-grade encryption",
    iconPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    demoColor: "from-amber-500 to-orange-500"
  },
  {
    title: "Analytics",
    desc: "Real-time performance metrics",
    iconPath: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z polyline points='3.27 6.96 12 12.01 20.73 6.96' line x1='12' y1='22.08' x2='12' y2='12'",
    demoColor: "from-purple-500 to-violet-500"
  },
  {
    title: "Scalability",
    desc: "Horizontal auto-scaling",
    iconPath: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z line x1='3.27' y1='6.96' x2='12' y2='12.01' line x1='12' y1='12.01' x2='20.73' y2='6.96' line x1='12' y1='22.08' x2='12' y2='12'",
    demoColor: "from-blue-500 to-indigo-500"
  },
  {
    title: "Workflow",
    desc: "Visual graph interface",
    iconPath: "M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z",
    demoColor: "from-rose-500 to-pink-500"
  }
];

// Demo Component: Orchestration
function OrchestrationDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const agentsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const animateOrchestration = () => {
      agentsRef.current.forEach((agent, i) => {
        if (agent) {
          animate(agent, {
            translateX: Math.sin(i * 1.5) * 30,
            translateY: Math.cos(i * 1.5) * 30,
            scale: [1, 1.2, 1],
            duration: 2000,
            easing: 'easeInOutSine',
          });
        }
      });
    };

    const interval = setInterval(animateOrchestration, 2000);
    animateOrchestration();

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="flex items-center justify-center gap-4 h-full py-8">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => { if (el) agentsRef.current[i] = el; }}
          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${features[i].demoColor} flex items-center justify-center shadow-lg`}
        >
          <span className="text-white text-xs font-mono">A{i + 1}</span>
        </div>
      ))}
    </div>
  );
}

// Demo Component: Deployment
function DeploymentDemo() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setTimeout(() => setProgress(0), 500);
          return 0;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full py-8 gap-4">
      <div className="w-full max-w-[200px] h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs font-mono text-white/60">Deploying... {Math.round(progress)}%</span>
    </div>
  );
}

// Demo Component: Security
function SecurityDemo() {
  const [encrypted, setEncrypted] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  const toggleEncryption = () => {
    if (textRef.current) {
      animate(textRef.current, {
        opacity: [1, 0, 1],
        scale: [1, 0.8, 1],
        duration: 400,
        easing: 'easeInOutQuad',
      });
    }
    setEncrypted(!encrypted);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full py-8 gap-4">
      <button
        onClick={toggleEncryption}
        className="px-4 py-2 bg-amber-500/20 border border-amber-500/40 rounded text-xs font-mono text-amber-400 hover:bg-amber-500/30 transition-colors"
      >
        {encrypted ? '🔓 Decrypt' : '🔒 Encrypt Data'}
      </button>
      <span ref={textRef} className="text-sm font-mono text-white/80">
        {encrypted ? '••••••••••••' : 'Sensitive Data'}
      </span>
    </div>
  );
}

// Demo Component: Analytics
function AnalyticsDemo() {
  const barsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const animateBars = () => {
      barsRef.current.forEach((bar) => {
        if (bar) {
          const height = 20 + Math.random() * 60;
          animate(bar, {
            height: `${height}%`,
            duration: 300 + Math.random() * 200,
            easing: 'easeOutQuad',
          });
        }
      });
    };

    const interval = setInterval(animateBars, 500);
    animateBars();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end justify-center gap-2 h-full py-8 px-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) barsRef.current[i] = el; }}
          className="w-3 bg-gradient-to-t from-purple-500/80 to-violet-500/80 rounded-t"
          style={{ height: '40%', minHeight: '10px' }}
        />
      ))}
    </div>
  );
}

// Demo Component: Scalability
function ScalabilityDemo() {
  const [nodes, setNodes] = useState([1, 2, 3]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prev) => {
        if (prev.length >= 6) return [1, 2, 3];
        if (prev.length <= 3) return [1, 2, 3, 4, 5, 6];
        return prev.length > 3 ? [1, 2, 3] : [1, 2, 3, 4, 5, 6];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 h-full py-8 px-4">
      {nodes.map((i) => (
        <div
          key={i}
          className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg"
        >
          <span className="text-white text-[10px] font-mono">{i}</span>
        </div>
      ))}
      <span className="w-full text-center text-[10px] font-mono text-white/40 mt-2">
        {nodes.length} nodes active
      </span>
    </div>
  );
}

// Demo Component: Workflow
function WorkflowDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const points = [
      { x: 40, y: 80, label: 'Input' },
      { x: 120, y: 40, label: 'Process' },
      { x: 200, y: 80, label: 'Output' },
    ];

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw nodes
      points.forEach((point, i) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 15, 0, Math.PI * 2);
        ctx.fillStyle = i === 1 ? '#14b8a6' : '#3b82f6';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.stroke();

        // Label
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(point.label, point.x, point.y + 30);
      });

      // Animate connection
      const progress = (frame % 60) / 60;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(
        points[0].x + (points[1].x - points[0].x) * progress,
        points[0].y + (points[1].y - points[0].y) * progress
      );
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      if (progress >= 1) {
        ctx.beginPath();
        ctx.moveTo(points[1].x, points[1].y);
        ctx.lineTo(
          points[1].x + (points[2].x - points[1].x) * progress,
          points[1].y + (points[2].y - points[1].y) * progress
        );
        ctx.stroke();
      }

      frame++;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="flex items-center justify-center h-full py-8">
      <canvas
        ref={canvasRef}
        width={240}
        height={120}
        className="border border-white/10 rounded bg-white/5"
      />
    </div>
  );
}

// Demo renderer based on feature index
function renderDemo(index: number) {
  switch (index) {
    case 0: return <OrchestrationDemo />;
    case 1: return <DeploymentDemo />;
    case 2: return <SecurityDemo />;
    case 3: return <AnalyticsDemo />;
    case 4: return <ScalabilityDemo />;
    case 5: return <WorkflowDemo />;
    default: return null;
  }
}

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [activeDemo, setActiveDemo] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Header reveal animation
    if (headerRef.current) {
      animate(headerRef.current, {
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 800,
        easing: 'outExpo',
      });
    }

    // Intersection Observer for scroll-triggered card reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target.querySelectorAll('.feature-icon'), {
              opacity: [0, 1],
              scale: [0.5, 1],
              delay: stagger(80),
              duration: 600,
              easing: 'outBack',
            });
            
            animate(entry.target.querySelectorAll('.feature-card'), {
              opacity: [0, 1],
              translateY: [40, 0],
              delay: stagger(100, { from: 'center' }),
              duration: 800,
              easing: 'outExpo',
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (index: number) => {
    if (demoMode) {
      setActiveDemo(activeDemo === index ? null : index);
    }
  };

  return (
    <section id="features" ref={containerRef} className="py-32 px-6 bg-black border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 
            ref={headerRef}
            className="text-sm font-mono text-white/40 mb-0 tracking-widest uppercase opacity-0"
          >
            <span aria-hidden="true" className="text-white/20">&#47;&#47;</span> Core Capabilities
          </h2>

          {/* Demo Mode Toggle */}
          <button
            onClick={() => {
              setDemoMode(!demoMode);
              setActiveDemo(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded border transition-all duration-300 ${
              demoMode 
                ? 'bg-teal-500/20 border-teal-500/50 text-teal-400' 
                : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'
            }`}
            aria-pressed={demoMode}
          >
            <div className={`w-2 h-2 rounded-full ${demoMode ? 'bg-teal-500 animate-pulse' : 'bg-white/20'}`} />
            <span className="text-xs font-mono uppercase tracking-wider">
              {demoMode ? 'Demo Active' : 'Demo Mode'}
            </span>
          </button>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              onClick={() => handleCardClick(i)}
              className={`cursor-pointer ${demoMode && activeDemo === i ? 'ring-2 ring-teal-500/50' : ''}`}
            >
              <SpotlightCard className="feature-card bg-white/5 border border-white/5 p-8 group relative opacity-0 h-full">
              {demoMode ? (
                <div className="h-full flex flex-col">
                  {/* Demo View */}
                  <div className="flex-1 min-h-[120px]">
                    {activeDemo === i ? renderDemo(i) : (
                      <div className="h-full flex items-center justify-center text-white/20">
                        <span className="text-xs font-mono">Click to preview</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 relative z-10">
                    <h3 className="text-lg font-medium text-white mb-2">{f.title}</h3>
                    <p className="text-sm text-white/40 font-light">{f.desc}</p>
                  </div>
                </div>
              ) : (
                // Standard View
                <>
                  <div className="feature-icon opacity-0 w-10 h-10 mb-6 text-white/40 group-hover:text-white transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
                      <path d={f.iconPath} />
                    </svg>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-lg font-medium text-white mb-2">{f.title}</h3>
                    <p className="text-sm text-white/40 font-light">{f.desc}</p>
                  </div>
                  
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.8)]" />
                  </div>
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className={`absolute inset-0 border border-transparent bg-gradient-to-br ${f.demoColor}/5 rounded-lg`} />
                  </div>
                </>
              )}
              </SpotlightCard>
            </div>
          ))}
        </div>

        {demoMode && (
          <div className="mt-8 text-center">
            <p className="text-xs font-mono text-white/30">
              💡 Tip: Click on any card to see an interactive demonstration
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
