'use client';

import { useState, useEffect, useRef } from 'react';
import * as anime from 'animejs';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

export default function ChartsWidget() {
  const [data] = useState<ChartData[]>([
    { label: 'Agents Active', value: 12, color: '#14b8a6' },
    { label: 'Tasks Today', value: 47, color: '#06b6d4' },
    { label: 'Deployments', value: 8, color: '#0d9488' },
    { label: 'Uptime', value: 99, color: '#5eead4' },
  ]);

  const chartRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (chartRef.current && barsRef.current.length > 0) {
      anime.animate(barsRef.current, {
        height: ((el: any, i: number) => data[i].value + '%') as any,
        duration: 1200,
        easing: 'easeOutElastic(1, 0.8)',
        delay: anime.stagger(150),
      });
    }
  }, [data]);

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div ref={chartRef} className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-teal-500/20 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Performance Metrics</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs font-medium text-teal-400 bg-teal-500/10 rounded-lg hover:bg-teal-500/20 transition-colors">
            24H
          </button>
          <button className="px-3 py-1 text-xs font-medium text-slate-400 hover:text-white transition-colors">
            7D
          </button>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end justify-between h-40 gap-3 mb-4">
        {data.map((item, index) => (
          <div key={item.label} className="flex flex-col items-center gap-2 flex-1">
            <div className="relative w-full h-full flex items-end justify-center">
              <div
                ref={el => { barsRef.current[index] = el; }}
                className="w-full max-w-[50px] rounded-t-lg opacity-0"
                style={{
                  height: '0%',
                  background: `linear-gradient(180deg, ${item.color} 0%, ${item.color}80 100%)`,
                  boxShadow: `0 0 20px ${item.color}40`,
                }}
              />
              <span className="absolute -top-6 text-xs font-medium text-slate-300 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
                {item.value}
              </span>
            </div>
            <span className="text-xs text-slate-400 truncate w-full text-center">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-700/50">
        {data.slice(0, 2).map((item, index) => (
          <div key={item.label} className="bg-slate-800/50 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-slate-400">{item.label}</span>
            </div>
            <span className="text-xl font-bold text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
