'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { animate, stagger } from 'animejs';

interface Bookmark {
  id: string;
  label: string;
  icon: string;
  path: string;
  category: 'nav' | 'action';
}

const defaultBookmarks: Bookmark[] = [
  { id: 'home', label: 'Home', icon: '🏠', path: '/', category: 'nav' },
  { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard', category: 'nav' },
  { id: 'squad', label: 'Squad', icon: '🤖', path: '/dashboard/squad', category: 'nav' },
  { id: 'pipeline', label: 'Pipeline', icon: '🔄', path: '/dashboard/pipeline', category: 'nav' },
  { id: 'new-squad', label: 'New Squad', icon: '➕', path: 'action', category: 'action' },
  { id: 'deploy', label: 'Deploy', icon: '🚀', path: 'action', category: 'action' },
  { id: 'export', label: 'Export Data', icon: '📤', path: 'action', category: 'action' },
  { id: 'settings', label: 'Settings', icon: '⚙️', path: '/dashboard/settings', category: 'nav' },
];

export default function BookmarksWidget() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    animate(containerRef.current.querySelectorAll('.bookmark-item'), {
      opacity: [0, 1],
      scale: [0.9, 1],
      delay: stagger(50),
      easing: 'easeOutExpo',
      duration: 400,
    });
  }, []);

  const handleClick = (bookmark: Bookmark) => {
    if (bookmark.category === 'nav') {
      router.push(bookmark.path);
    } else {
      // Handle actions
      console.log('Action triggered:', bookmark.id);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-sm font-mono text-white/60 uppercase tracking-wider flex items-center gap-2">
          <span>🔖</span> Bookmarks
        </h3>
        <button className="text-xs text-white/40 hover:text-white transition-colors">
          + Add
        </button>
      </div>
      
      <div ref={containerRef} className="p-4 grid grid-cols-4 gap-3">
        {defaultBookmarks.map((bookmark) => (
          <button
            key={bookmark.id}
            onClick={() => handleClick(bookmark)}
            className="bookmark-item flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all group"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">{bookmark.icon}</span>
            <span className="text-[10px] text-white/60 text-center leading-tight">{bookmark.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
