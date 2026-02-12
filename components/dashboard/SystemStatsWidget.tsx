'use client';

import { useState, useEffect, useRef } from 'react';
import * as anime from 'animejs';

export default function SystemStatsWidget() {
  const [animatedValues, setAnimatedValues] = useState({
    cpu: 0,
    memory: 0,
    storage: 0,
    network: 0,
  });

  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { label: 'CPU Usage', value: animatedValues.cpu, max: 100, unit: '%', color: 'from-teal-500 to-cyan-500' },
    { label: 'Memory', value: animatedValues.memory, max: 100, unit: '%', color: 'from-purple-500 to-pink-500' },
    { label: 'Storage', value: animatedValues.storage, max: 100, unit: '%', color: 'from-amber-500 to-orange-500' },
    { label: 'Network I/O', value: animatedValues.network, max: 1000, unit: 'MB/s', color: 'from-blue-500 to-indigo-500' },
  ];

  useEffect(() => {
    // Animate values on mount
    setTimeout(() => {
      setAnimatedValues({
        cpu: Math.floor(Math.random() * 40) + 20,
        memory: Math.floor(Math.random() * 30) + 45,
        storage: Math.floor(Math.random() * 10) + 60,
        network: Math.floor(Math.random() * 300) + 150,
      });
    }, 100);

    // Update periodically
    const interval = setInterval(() => {
      setAnimatedValues({
        cpu: Math.floor(Math.random() * 40) + 20,
        memory: Math.floor(Math.random() * 30) + 45,
        storage: Math.floor(Math.random() * 10) + 60,
        network: Math.floor(Math.random() * 300) + 150,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (statsRef.current) {
      anime.animate('.stat-bar', {
        width: ((el: any) => {
          const progress = el.getAttribute('data-progress');
          return `${progress}%`;
        }) as any,
        duration: 800,
        easing: 'easeOutElastic(1, 0.8)',
      });
    }
  }, [animatedValues]);

  return (
    <div ref={statsRef} className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-teal-500/20 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">System Stats</h3>
        <div className="flex items-center gap-1 px-2 py-1 bg-teal-500/10 rounded-full">
          <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
          <span className="text-xs text-teal-400">Real-time</span>
        </div>
      </div>

      <div className="space-y-4">
        {stats.map((stat, index) => {
          const progress = (stat.value / stat.max) * 100;
          return (
            <div key={stat.label} className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">{stat.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white tabular-nums">
                    {stat.unit === '%' ? stat.value : stat.value.toFixed(0)}
                  </span>
                  <span className="text-xs text-slate-500">{stat.unit}</span>
                </div>
              </div>
              <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className={`stat-bar absolute left-0 h-full rounded-full bg-gradient-to-r ${stat.color} opacity-80`}
                  data-progress={progress}
                  style={{ width: '0%' }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ transform: 'translateX(-100%)' }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-slate-700/50">
        <div className="text-center p-3 bg-slate-800/50 rounded-xl">
          <p className="text-2xl font-bold text-white">99.9%</p>
          <p className="text-xs text-slate-400">Uptime</p>
        </div>
        <div className="text-center p-3 bg-slate-800/50 rounded-xl">
          <p className="text-2xl font-bold text-white">24ms</p>
          <p className="text-xs text-slate-400">Latency</p>
        </div>
      </div>
    </div>
  );
}
