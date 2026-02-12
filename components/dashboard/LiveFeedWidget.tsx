'use client';

import { useState, useEffect, useRef } from 'react';
import * as anime from 'animejs';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

export default function LiveFeedWidget() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const logsRef = useRef<HTMLDivElement>(null);

  const levelColors = {
    info: 'text-blue-400',
    success: 'text-teal-400',
    warning: 'text-amber-400',
    error: 'text-red-400',
  };

  const levelIcons = {
    info: 'ℹ',
    success: '✓',
    warning: '⚠',
    error: '✕',
  };

  const sampleMessages = [
    'Agent "Hermes" deployed successfully',
    'New task queued: Content Generation',
    'System health check passed',
    'Analytics data synced',
    'Deployment pipeline initialized',
    'Security scan completed',
    'Cache invalidated',
    'Database connection established',
    'API rate limit adjusted',
    'User session created',
  ];

  useEffect(() => {
    // Initial empty state
    setLogs([]);

    const interval = setInterval(() => {
      if (isPaused) return;

      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        level: ['info', 'success', 'warning', 'error'][Math.floor(Math.random() * 4)] as LogEntry['level'],
        message: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
      };

      setLogs(prev => [...prev.slice(-19), newLog]);
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (logsRef.current && !isPaused) {
      anime.animate(logsRef.current.children, {
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 300,
        easing: 'easeOutQuad',
        delay: anime.stagger(50),
      });
    }
  }, [logs, isPaused]);

  if (logs.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-teal-500/20 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Live Feed</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            <span className="text-xs text-teal-400">Connecting...</span>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center h-48 text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-slate-700/50 flex items-center justify-center animate-[pulse_2s_ease-in-out_infinite]">
            <span className="text-2xl">📡</span>
          </div>
          <p className="text-slate-400 text-sm">Waiting for live events...</p>
          <p className="text-slate-500 text-xs mt-1">Logs will appear here in real-time</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-teal-500/20 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Live Feed</h3>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
          <span className="text-xs text-teal-400">Live</span>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`ml-2 px-2 py-1 text-xs rounded transition-colors ${
              isPaused ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700/50 text-slate-400'
            }`}
          >
            {isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>
        </div>
      </div>

      <div ref={logsRef} className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-start gap-3 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
          >
            <span className={`text-xs font-mono ${levelColors[log.level]}`}>
              {levelIcons[log.level]}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-200 truncate">{log.message}</p>
              <span className="text-xs text-slate-500">{log.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
