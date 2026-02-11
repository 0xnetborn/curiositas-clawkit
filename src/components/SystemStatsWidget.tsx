'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

interface StatsData {
  activeAgents: number;
  tasksCompleted: number;
  uptime: string;
  efficiency: number;
}

export default function SystemStatsWidget() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [stats] = useState<StatsData>({
    activeAgents: 12,
    tasksCompleted: 847,
    uptime: '99.9%',
    efficiency: 94.2,
  });

  useEffect(() => {
    if (statsRef.current) {
      // Entry animation
      animate(statsRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutExpo',
      });

      // Animate stat values
      const statValues = statsRef.current.querySelectorAll('.stat-value');
      statValues.forEach((el, index) => {
        const targetValue = parseFloat((el as HTMLElement).dataset.value || '0');
        const isPercentage = (el as HTMLElement).classList.contains('efficiency');
        
        animate(el as HTMLElement, {
          opacity: [0, 1],
          duration: 800,
          delay: index * 100,
          easing: 'outExpo',
        });

        // Animate innerHTML for numbers
        let current = 0;
        const duration = 1500;
        const steps = 30;
        const increment = targetValue / steps;
        const stepTime = duration / steps;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= targetValue) {
            current = targetValue;
            clearInterval(counter);
          }
          (el as HTMLElement).innerText = isPercentage ? `${Math.round(current)}%` : String(Math.round(current));
        }, stepTime);
      });
    }
  }, [stats]);

  return (
    <div 
      ref={statsRef}
      className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-xl opacity-0"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">System Stats</h3>
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30 hover:border-teal-500/30 transition-colors">
          <p className="text-slate-400 text-sm mb-1">Active Agents</p>
          <p className="stat-value text-2xl font-bold text-emerald-400" data-value={stats.activeAgents}>
            0
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30 hover:border-teal-500/30 transition-colors">
          <p className="text-slate-400 text-sm mb-1">Tasks Today</p>
          <p className="stat-value text-2xl font-bold text-teal-400" data-value={stats.tasksCompleted}>
            0
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30 hover:border-teal-500/30 transition-colors">
          <p className="text-slate-400 text-sm mb-1">Uptime</p>
          <p className="stat-value text-2xl font-bold text-cyan-400" data-value={parseFloat(stats.uptime)}>
            0%
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30 hover:border-teal-500/30 transition-colors">
          <p className="text-slate-400 text-sm mb-1">Efficiency</p>
          <p className="stat-value efficiency text-2xl font-bold text-blue-400" data-value={stats.efficiency}>
            0%
          </p>
        </div>
      </div>
    </div>
  );
}
