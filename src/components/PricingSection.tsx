'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const plans = [
  {
    name: 'STARTER',
    price: '0',
    specs: ['1 PACK', '2 UNITS', '100 CR'],
    features: ['Basic Access', 'Community Support', 'Draft Mode']
  },
  {
    name: 'PRO',
    price: '49',
    specs: ['ALL PACKS', '12 UNITS', '1K CR'],
    features: ['Priority Queue', 'Weekly Reports', 'Email Support']
  },
  {
    name: 'TEAM',
    price: '149',
    specs: ['UNLIMITED', 'API', '5K CR'],
    features: ['Custom Pipeline', 'Dedicated Agent', 'SLA Access']
  }
];

export default function PricingSection() {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tableRef.current) return;
    animate(tableRef.current.children, {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(100),
      ease: 'outExpo',
      duration: 800
    });
  }, []);

  return (
    <section id="pricing" className="py-32 px-6 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm font-mono text-white/40 tracking-widest uppercase mb-16">/// ACCESS PLANS</h2>

        <div ref={tableRef} className="grid md:grid-cols-3 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-white/[0.02]">
          {plans.map((plan, i) => (
            <div key={i} className="p-8 group hover:bg-white/[0.02] transition-colors relative">
              <div className="mb-8 flex justify-between items-start">
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <div className="text-right">
                  <span className="text-3xl font-light text-white">€{plan.price}</span>
                  <span className="text-xs text-white/40 block">/MO</span>
                </div>
              </div>

              <div className="flex gap-2 mb-8">
                {plan.specs.map((spec, s) => (
                  <span key={s} className="text-[10px] font-mono px-1.5 py-0.5 border border-white/10 text-white/60">
                    {spec}
                  </span>
                ))}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, f) => (
                  <li key={f} className="text-sm text-white/60 flex items-center gap-3">
                    <span className="w-1 h-1 bg-emerald-500" />
                    {feat}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 border border-white/20 text-white/80 text-xs font-medium tracking-wide hover:bg-white hover:text-black hover:border-transparent transition-all">
                SELECT PLAN
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
