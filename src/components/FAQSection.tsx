'use client';

import { useState, useRef, useEffect } from 'react';
import { animate } from 'animejs';

const faqs = [
  {
    question: 'What is CurioKit?',
    answer: 'CurioKit is a production-ready AI agent toolkit for founders and solopreneurs. It provides pre-built "squads" of specialized AI agents that work together to automate marketing, business operations, and customer engagement.',
  },
  {
    question: 'Do I need coding skills to use CurioKit?',
    answer: 'No! CurioKit is designed for non-technical users. You can deploy and manage AI squads through our intuitive dashboard. However, developers can extend functionality using our API and modular architecture.',
  },
  {
    question: 'How are the AI agents different from ChatGPT or Claude?',
    answer: 'Unlike single-model assistants, CurioKit deploys coordinated squads of specialized agents. Each agent has a specific role (research, writing, quality assurance, amplification) and works together following proven workflows.',
  },
  {
    question: 'Can I customize the agent workflows?',
    answer: 'Absolutely. Every squad is fully configurable. You can adjust agent behavior, add custom prompts, modify workflows, and integrate with your existing tools through our MCP (Model Context Protocol) connections.',
  },
  {
    question: 'What happens to my data?',
    answer: 'Your data is yours. We don\'t train models on your inputs. All agent interactions are encrypted, and you can export all conversation history at any time. Enterprise tiers offer self-hosting options.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! The Starter plan includes a 14-day free trial with full access to all features. No credit card required. Upgrade only when you\'re ready.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(SVGSVGElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    const isOpen = openIndex === index;
    const contentEl = contentRefs.current[index];
    const iconEl = iconRefs.current[index];
    
    if (!contentEl || !iconEl) return;
    
    if (isOpen) {
      // Close current
      animate(contentEl, {
        height: 0,
        opacity: 0,
        duration: 300,
        easing: 'easeOutQuad',
      });
      animate(iconEl, {
        rotate: 0,
        duration: 300,
        easing: 'easeOutQuad',
      });
      setOpenIndex(null);
    } else {
      // Close previously open
      if (openIndex !== null && contentRefs.current[openIndex] && iconRefs.current[openIndex]) {
        animate(contentRefs.current[openIndex]!, {
          height: 0,
          opacity: 0,
          duration: 300,
          easing: 'easeOutQuad',
        });
        animate(iconRefs.current[openIndex]!, {
          rotate: 0,
          duration: 300,
          easing: 'easeOutQuad',
        });
      }
      
      // Open new
      setOpenIndex(index);
      animate(contentEl, {
        height: 'auto',
        opacity: 1,
        duration: 400,
        easing: 'easeOutQuad',
      });
      animate(iconEl, {
        rotate: 180,
        duration: 300,
        easing: 'easeOutQuad',
      });
    }
  };

  useEffect(() => {
    // Initial animation
    const items = document.querySelectorAll('.faq-item');
    animate(items, {
      translateY: [30, 0],
      opacity: [0, 1],
      delay: 100,
      duration: 600,
      easing: 'easeOutQuad',
    });
  }, []);

  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-teal-500/20 bg-teal-500/5 mb-6">
            <span className="w-1.5 h-1.5 bg-teal-500" />
            <span className="text-[10px] font-mono text-teal-500 tracking-widest uppercase">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            Common <span className="text-white/40">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item border border-white/10 bg-white/5 rounded-lg overflow-hidden hover:border-teal-500/30 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                aria-expanded={openIndex === index}
              >
                <span className="text-base font-medium text-white/90 pr-4">
                  {faq.question}
                </span>
                <svg
                  ref={(el) => { iconRefs.current[index] = el; }}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-teal-500 flex-shrink-0"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                ref={(el) => { contentRefs.current[index] = el; }}
                className="h-0 overflow-hidden opacity-0"
              >
                <div className="px-6 pb-6 pt-2 text-white/50 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA after FAQ */}
        <div className="text-center mt-12">
          <p className="text-white/40 text-sm">
            Still have questions?{' '}
            <a href="#" className="text-teal-500 hover:text-teal-400 transition-colors">
              Check our documentation →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
