'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Agent Deployed',
    message: 'Athena squad is now active with 3 agents.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Credits Low',
    message: 'You have used 85% of your monthly credits.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Pipeline Updated',
    message: 'New tasks added to the marketing pipeline.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
  },
  {
    id: '4',
    type: 'success',
    title: 'Export Complete',
    message: 'Your analytics report is ready for download.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true,
  },
  {
    id: '5',
    type: 'error',
    title: 'Connection Lost',
    message: 'Temporary disconnect from agent network.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
  },
];

export default function NotificationCenter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [expanded, setExpanded] = useState<string | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return '✓';
      case 'warning': return '⚠';
      case 'error': return '✕';
      default: return 'ℹ';
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'success': return 'text-teal-400 bg-teal-500/10 border-teal-500/20';
      case 'warning': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'error': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    }
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleExpand = (id: string) => {
    setExpanded(prev => prev === id ? null : id);
    markAsRead(id);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    animate(containerRef.current.querySelectorAll('.notification-item'), {
      opacity: [0, 1],
      translateX: [-20, 0],
      delay: stagger(80),
      ease: 'outExpo',
      duration: 500,
    });
  }, []);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-mono text-white/60 uppercase tracking-wider">Notifications</h3>
          {unreadCount > 0 && (
            <span className="text-[10px] px-2 py-0.5 bg-teal-500/20 text-teal-400 border border-teal-500/30 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllRead}
            className="text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-wider"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div ref={containerRef} className="space-y-2 max-h-[320px] overflow-y-auto pr-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`
              notification-item p-4 rounded-lg border cursor-pointer transition-all
              ${notification.read ? 'bg-white/5 border-white/5 opacity-60' : 'bg-white/10 border-white/10'}
              hover:border-white/30 hover:opacity-100
              ${expanded === notification.id ? 'bg-white/10' : ''}
            `}
            onClick={() => toggleExpand(notification.id)}
          >
            <div className="flex items-start gap-3">
              <div className={`
                w-6 h-6 rounded flex items-center justify-center text-xs border
                ${getColors(notification.type)}
              `}>
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-sm font-medium ${notification.read ? 'text-white/60' : 'text-white'}`}>
                    {notification.title}
                  </span>
                  <span className="text-[10px] text-white/30 whitespace-nowrap">
                    {formatTime(notification.timestamp)}
                  </span>
                </div>
                
                {expanded === notification.id ? (
                  <p className="text-xs text-white/50 mt-2 leading-relaxed">
                    {notification.message}
                  </p>
                ) : (
                  <p className="text-xs text-white/40 mt-1 truncate">
                    {notification.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-8 text-white/30 text-sm">
          No notifications
        </div>
      )}
    </div>
  );
}
