'use client';

import { useState, useEffect, useRef } from 'react';
import * as anime from 'animejs';

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  shortcut: string;
  color: string;
}

export default function QuickActionsWidget() {
  const [pressed, setPressed] = useState<string | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  const actions: QuickAction[] = [
    { id: 'new-squad', label: 'New Squad', icon: '🤖', shortcut: '⌘N', color: 'from-teal-500 to-cyan-500' },
    { id: 'create-task', label: 'Create Task', icon: '✨', shortcut: '⌘T', color: 'from-purple-500 to-pink-500' },
    { id: 'schedule', label: 'Schedule', icon: '📅', shortcut: '⌘S', color: 'from-amber-500 to-orange-500' },
    { id: 'export', label: 'Export', icon: '📤', shortcut: '⌘E', color: 'from-blue-500 to-indigo-500' },
  ];

  useEffect(() => {
    if (widgetRef.current) {
      anime.animate(widgetRef.current.children, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: anime.stagger(100),
        easing: 'easeOutExpo',
      });
    }
  }, []);

  const handlePress = (actionId: string) => {
    setPressed(actionId);
    setTimeout(() => setPressed(null), 150);

    // Add visual feedback
    if (typeof window !== 'undefined' && (window as any).showToast) {
      (window as any).showToast({
        type: 'info',
        message: `${actions.find(a => a.id === actionId)?.label} triggered`,
      });
    }
  };

  return (
    <div ref={widgetRef} className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-teal-500/20 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
        <span className="text-xs text-slate-400">Press for shortcuts</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handlePress(action.id)}
            className={`group relative p-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200 overflow-hidden ${
              pressed === action.id ? 'scale-95' : 'hover:scale-[1.02]'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
            <div className="relative flex flex-col items-center gap-2">
              <span className="text-2xl">{action.icon}</span>
              <span className="text-sm text-slate-200 font-medium">{action.label}</span>
              <span className="text-xs text-slate-500 font-mono bg-slate-700/50 px-2 py-0.5 rounded">
                {action.shortcut}
              </span>
            </div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-teal-500/30 rounded-xl transition-colors" />
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <button className="w-full py-2 text-sm text-slate-400 hover:text-white transition-colors">
          View All Actions →
        </button>
      </div>
    </div>
  );
}
