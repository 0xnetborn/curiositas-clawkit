'use client';

import { useState, useRef, useEffect } from 'react';
import { animate } from 'animejs';

interface DocItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function DocItem({ title, content, isOpen, onClick, index }: DocItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      animate(contentRef.current, {
        height: 'auto',
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
      });
    } else if (contentRef.current) {
      animate(contentRef.current, {
        height: 0,
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInQuad'
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (iconRef.current) {
      animate(iconRef.current, {
        rotate: isOpen ? 180 : 0,
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-white/5">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors px-4"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-teal-500/60">0{index + 1}</span>
          <span className="font-medium text-white/90">{title}</span>
        </div>
        <div ref={iconRef} className="w-5 h-5 flex items-center justify-center text-white/40">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>
      <div ref={contentRef} className="overflow-hidden h-0 opacity-0 px-4 pb-6">
        <div className="pl-8 border-l border-white/10 ml-2">
          <p className="text-white/50 font-light leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}

export default function DocsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && sectionRef.current) {
            animate(entry.target, {
              opacity: [0, 1],
              translateY: [50, 0],
              duration: 800,
              easing: 'outExpo'
            });
            observer.unobserve(entry.target);
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

  const docs = [
    {
      title: "Quick Start Guide",
      content: "Initialize your first agent squad in under 2 minutes. Clone the repository, install dependencies, and run the deployment command. Our CLI handles all configuration automatically."
    },
    {
      title: "Configuration Options",
      content: "Customize agent behavior via `clawkit.config.json`. Adjust model parameters, tool permissions, and automation workflows. Supports environment variables for CI/CD pipelines."
    },
    {
      title: "API Reference",
      content: "Full REST API documentation for integrating CurioKit into your existing infrastructure. Endpoints for agent management, data retrieval, and webhooks are fully documented."
    },
    {
      title: "Security & Compliance",
      content: "Enterprise-grade security features including SOC2 compliance, end-to-end encryption, and granular access controls. Data is isolated per workspace."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-32 px-6 bg-black border-t border-white/5 opacity-0 translate-y-12"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 mb-6">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal-500">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span className="text-[10px] font-mono text-white/60 tracking-widest uppercase">Documentation</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
            System <span className="text-white/40">Manual</span>
          </h2>
          
          <p className="text-lg text-white/40 font-light max-w-2xl mx-auto">
            Everything you need to know to operate and extend CurioKit.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
          {docs.map((doc, index) => (
            <DocItem
              key={index}
              title={doc.title}
              content={doc.content}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center gap-2 text-sm font-mono text-teal-500 hover:text-teal-400 transition-colors uppercase tracking-widest">
            View Full Documentation
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
