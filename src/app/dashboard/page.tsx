'use client';

import { useEffect, useRef, useState, useCallback, lazy } from 'react';
import { animate, stagger } from 'animejs';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { usePageTracking } from '@/components/AnalyticsContext';
import { useToast } from '@/components/ui/Toast';
import { useKeyboardShortcuts } from '@/components/hooks/useKeyboardShortcuts';
import KeyboardShortcutsHelp from '@/components/KeyboardShortcutsHelp';
import LazyWidget, { 
  LazyChartsWidget, 
  LazySystemStatsWidget, 
  LazyLiveFeedWidget, 
  LazyAnalyticsDashboard,
  LazyQuickActionsWidget,
  WidgetSkeleton
} from '@/components/LazyWidget';

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

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { toast } = useToast();

  // Track page view
  usePageTracking('/dashboard', 'Dashboard | CurioKit');

  const handleDeploy = () => {
    toast({
      title: 'Deployment Initiated',
      description: 'Deploying new agent to the squad...',
      type: 'info'
    });
    // Simulate deployment delay
    setTimeout(() => {
      toast({
        title: 'Agent Deployed',
        description: 'New agent is now active and ready.',
        type: 'success'
      });
    }, 2500);
  };

  // Keyboard shortcuts
  const { helpVisible, setHelpVisible } = useKeyboardShortcuts([
    {
      key: 'n',
      action: () => {
        toast({ title: 'Shortcut', description: 'New Squad triggered', type: 'info' });
      },
      description: 'New Squad'
    },
    {
      key: 't',
      action: () => {
        toast({ title: 'Shortcut', description: 'Create Task triggered', type: 'info' });
      },
      description: 'Create Task'
    },
    {
      key: 's',
      action: () => {
        toast({ title: 'Shortcut', description: 'Schedule triggered', type: 'info' });
      },
      description: 'Schedule'
    },
    {
      key: 'e',
      action: () => {
        toast({ title: 'Shortcut', description: 'Export triggered', type: 'info' });
      },
      description: 'Export'
    },
    {
      key: 'g',
      action: () => setShowAnalytics(prev => !prev),
      description: 'Toggle Analytics'
    },
    {
      key: 'Escape',
      action: () => setHelpVisible(false),
      description: 'Close modal'
    }
  ]);

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
  }, []);

  return (
    <>
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
          <LazyWidget fallback={<WidgetSkeleton height="h-96" />}>
            <LazyAnalyticsDashboard compact={false} />
          </LazyWidget>
        )}

        {/* Quick Actions Widget - Lazy Loaded */}
        <LazyWidget fallback={<WidgetSkeleton height="h-24" />}>
          <LazyQuickActionsWidget />
        </LazyWidget>

        {/* Charts Widget - Lazy Loaded */}
        <LazyWidget fallback={<WidgetSkeleton height="h-64" />}>
          <LazyChartsWidget />
        </LazyWidget>

        {/* System Stats Widget - Lazy Loaded */}
        <LazyWidget fallback={<WidgetSkeleton height="h-32" />}>
          <LazySystemStatsWidget />
        </LazyWidget>

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
          {/* Main: Live Feed - Lazy Loaded */}
          <div className="lg:col-span-2 space-y-6">
            <LazyWidget fallback={<WidgetSkeleton height="h-80" />}>
              <LazyLiveFeedWidget />
            </LazyWidget>
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
              <button 
                onClick={handleDeploy}
                className="text-xs text-white/40 hover:text-white hover:border-teal-500/50 transition-all uppercase tracking-widest border border-transparent hover:border-teal-500/30 px-4 py-2 rounded"
              >
                + Deploy New Agent
              </button>
            </div>
          </div>
        </div>
      </div>

      <KeyboardShortcutsHelp isOpen={helpVisible} onClose={() => setHelpVisible(false)} />
    </>
  );
}
