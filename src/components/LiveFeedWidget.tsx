'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

interface LogEntry {
  time: string;
  agent: string;
  msg: string;
}

const initialLogs: LogEntry[] = [
  { time: '10:42:01', agent: 'ATHENA', msg: 'Market analysis complete. 3 trends identified.' },
  { time: '10:42:05', agent: 'CALLIOPE', msg: 'Draft generated: "Future of AI Ops".' },
  { time: '10:42:12', agent: 'THEMIS', msg: 'Quality check passed (Score: 98/100).' },
  { time: '10:43:00', agent: 'SYSTEM', msg: 'Hourly backup initiated.' },
  { time: '10:45:22', agent: 'HERMES', msg: 'Campaign scheduled for 20 platforms.' },
];

const agents = ['ATHENA', 'CALLIOPE', 'THEMIS', 'HERMES', 'HERA', 'CHRONOS'];
const actions = [
  'Processing request...',
  'Optimizing workflow...',
  'Fetching external data...',
  'Compiling report...',
  'Syncing with squad...',
  'Updating dashboard stats...'
];

export default function LiveFeedWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Initial animation
    if (feedRef.current) {
      const items = Array.from(feedRef.current.querySelectorAll('.feed-item'));
      animate(items as HTMLElement[], {
        opacity: [0, 1],
        translateX: [-10, 0],
        delay: stagger(150),
        duration: 600,
        easing: 'easeOutQuad'
      });
    }

    // Simulate incoming logs
    const interval = setInterval(() => {
      if (isTyping) return;

      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      const agent = agents[Math.floor(Math.random() * agents.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];

      const newLog: LogEntry = {
        time,
        agent,
        msg: action
      };

      setLogs(prev => {
        const updated = [newLog, ...prev.slice(0, 7)]; // Keep last 8
        return updated;
      });

      // Animate new item
      if (containerRef.current) {
        const newItem = containerRef.current.firstElementChild;
        if (newItem) {
          animate(newItem as HTMLElement, {
            opacity: [0, 1],
            translateX: [-20, 0],
            duration: 400,
            easing: 'easeOutQuad'
          });
        }
      }

    }, 4500);

    // Typing indicator simulation
    const typingInterval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearInterval(typingInterval);
    };
  }, [isTyping]);

  return (
    <div className="bg-black/50 border border-white/10 p-6 h-96 overflow-hidden relative font-mono text-xs flex flex-col">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-mono text-white/60 uppercase tracking-wider">/// Live Operations Terminal</h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/30">{logs.length} events</span>
          <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
        </div>
      </div>
      
      <div ref={feedRef} className="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-hide">
        {logs.map((log, i) => (
          <div 
            key={`${log.time}-${i}`} 
            className="feed-item flex gap-4 border-b border-white/5 pb-2 last:border-0 animate-on-mount"
          >
            <span className="text-white/30 whitespace-nowrap">{log.time}</span>
            <span className={`w-20 whitespace-nowrap ${
              log.agent === 'SYSTEM' ? 'text-amber-500' : 'text-teal-500'
            }`}>{log.agent}</span>
            <span className="text-white/80">{log.msg}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-4 pt-2 feed-item">
            <span className="text-white/30">
              {new Date().toTimeString().split(' ')[0]}
            </span>
            <span className="w-20 text-teal-500">HERA</span>
            <span className="text-white/80 flex items-center gap-1">
              Updating schedule<span className="w-1.5 h-3 bg-white animate-pulse block" />
            </span>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
