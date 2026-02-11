'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, stagger, createTimeline } from 'animejs';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { usePageTracking } from '@/components/AnalyticsContext';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

const metrics = [
  { label: 'TASKS COMPLETED', value: '842', delta: '+12%', trend: 'up' },
  { label: 'ACTIVE AGENTS', value: '12/12', delta: 'OPTIMAL', trend: 'neutral' },
  { label: 'CREDITS USED', value: '4.2K', delta: '65%', trend: 'warning' },
];

const squadStatus = [
  { name: 'ATHENA', status: 'thinking', task: 'Analyzing Q3 Trends' },
  { name: 'CALLIOPE', status: 'writing', task: 'Drafting LinkedIn Post #42' },
  { name: 'THEMIS', status: 'idle', task: 'Waiting for Review' },
  { name: 'HERMES', status: 'working', task: 'Scheduling Campaign' },
];

const logs = [
  { time: '10:42:01', agent: 'ATHENA', msg: 'Market analysis complete. 3 trends identified.' },
  { time: '10:42:05', agent: 'CALLIOPE', msg: 'Draft generated: "Future of AI Ops".' },
  { time: '10:42:12', agent: 'THEMIS', msg: 'Quality check passed (Score: 98/100).' },
  { time: '10:43:00', agent: 'SYSTEM', msg: 'Hourly backup initiated.' },
];

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Track page view
  usePageTracking('/dashboard', 'Dashboard | CurioKit');

  useEffect(() => {
    if (!containerRef.current) return;

    // Stagger entry animation
    animate(containerRef.current.children, {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(100),
      ease: 'outExpo',
      duration: 800,
    });

    // Simulate Live Feed
    if (feedRef.current) {
      const feedItems = feedRef.current.children;
      animate(feedItems, {
        opacity: [0, 1],
        translateX: [-10, 0],
        delay: stagger(200, { start: 500 }),
        ease: 'outQuad',
        duration: 500,
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="space-y-8 max-w-7xl mx-auto">
      {/* Analytics Toggle */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="text-xs px-4 py-2 bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-teal-500/50 transition-colors rounded"
        >
          {showAnalytics ? 'Hide Analytics' : '📊 Show Analytics'}
        </button>
      </div>

      {showAnalytics && (
        <AnalyticsDashboard compact={false} />
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <SpotlightCard key={i} className="p-6 bg-white/5 border border-white/5 opacity-0">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-mono text-white/40 tracking-widest">{m.label}</span>
              <span className={`text-xs font-mono px-1.5 py-0.5 border ${
                m.trend === 'up' ? 'text-teal-500 border-teal-500/30 bg-teal-500/10' : 
                m.trend === 'warning' ? 'text-amber-500 border-amber-500/30 bg-amber-500/10' : 
                'text-white/60 border-white/10'
              }`}>
                {m.delta}
              </span>
            </div>
            <div className="text-4xl font-light text-white">{m.value}</div>
          </SpotlightCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main: Live Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono text-white/60 uppercase tracking-wider">/// Live Operations Terminal</h3>
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
          </div>
          
          <div className="bg-black/50 border border-white/10 p-6 h-96 overflow-hidden relative font-mono text-xs">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            <div ref={feedRef} className="space-y-3">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-4 opacity-0 border-b border-white/5 pb-2 last:border-0">
                  <span className="text-white/30">{log.time}</span>
                  <span className={`w-20 ${
                    log.agent === 'SYSTEM' ? 'text-amber-500' : 'text-teal-500'
                  }`}>{log.agent}</span>
                  <span className="text-white/80">{log.msg}</span>
                </div>
              ))}
              {/* Fake typing cursor */}
              <div className="flex gap-4 pt-2">
                <span className="text-white/30">10:43:05</span>
                <span className="w-20 text-teal-500">HERA</span>
                <span className="text-white/80 flex items-center gap-1">
                  Updating weekly schedule<span className="w-1.5 h-3 bg-white animate-pulse block" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Active Squad */}
        <div className="space-y-6">
          <h3 className="text-sm font-mono text-white/60 uppercase tracking-wider">/// Squad Status</h3>
          
          <div className="space-y-4">
            {squadStatus.map((agent, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 group hover:border-white/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    agent.status === 'thinking' ? 'bg-amber-500 animate-pulse' :
                    agent.status === 'writing' || agent.status === 'working' ? 'bg-teal-500 animate-pulse' :
                    'bg-white/20'
                  }`} />
                  <div>
                    <div className="text-sm font-medium text-white">{agent.name}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wide">{agent.status}</div>
                  </div>
                </div>
                <div className="text-[10px] text-right text-white/30 max-w-[80px] truncate">
                  {agent.task}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border border-dashed border-white/10 text-center">
            <button className="text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest">
              + Deploy New Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
