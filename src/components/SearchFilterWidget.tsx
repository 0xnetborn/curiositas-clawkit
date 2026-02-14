'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/components/ThemeContext';
import { animate } from 'animejs';

interface SearchResult {
  id: string;
  title: string;
  category: 'navigation' | 'action' | 'widget';
  icon: string;
}

const navItems: SearchResult[] = [
  { id: 'home', title: 'Home', category: 'navigation', icon: '🏠' },
  { id: 'dashboard', title: 'Dashboard', category: 'navigation', icon: '📊' },
  { id: 'squad', title: 'Squad', category: 'navigation', icon: '👥' },
  { id: 'pipeline', title: 'Pipeline', category: 'navigation', icon: '🔄' },
  { id: 'archive', title: 'Archive', category: 'navigation', icon: '📦' },
];

const actions: SearchResult[] = [
  { id: 'new-squad', title: 'New Squad', category: 'action', icon: '➕' },
  { id: 'deploy', title: 'Deploy', category: 'action', icon: '🚀' },
  { id: 'export', title: 'Export Data', category: 'action', icon: '📤' },
  { id: 'settings', title: 'Settings', category: 'action', icon: '⚙️' },
];

interface SearchFilterWidgetProps {
  onNavigate?: (id: string) => void;
}

export default function SearchFilterWidget({ onNavigate }: SearchFilterWidgetProps) {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([...navItems, ...actions]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = [...navItems, ...actions].filter(
      item => item.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (containerRef.current) {
      animate(containerRef.current, {
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 400,
        easing: 'easeOutCubic',
      });
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      onNavigate?.(results[selectedIndex].id);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'navigation': return 'text-blue-400';
      case 'action': return 'text-teal-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div
      ref={containerRef}
      className="rounded-xl p-4 border transition-all duration-300"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(20, 30, 35, 0.8)' : 'rgba(255, 255, 255, 0.9)',
        borderColor: theme === 'dark' ? 'rgba(20, 255, 210, 0.2)' : 'rgba(20, 180, 160, 0.2)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">🔍</span>
        <h3 
          className="font-semibold text-sm uppercase tracking-wider"
          style={{ color: theme === 'dark' ? '#14ffd0' : '#0d9488' }}
        >
          Quick Search
        </h3>
      </div>

      <input
        ref={inputRef}
        type="text"
        placeholder="Search navigation, actions..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-2 rounded-lg mb-3 text-sm outline-none transition-all duration-200 focus:ring-2"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)',
          color: theme === 'dark' ? '#e0e0e0' : '#1a1a1a',
          border: `1px solid ${theme === 'dark' ? 'rgba(20, 255, 210, 0.2)' : 'rgba(20, 180, 160, 0.2)'}`,
          '--tw-ring-color': theme === 'dark' ? '#14ffd0' : '#0d9488',
        } as React.CSSProperties}
      />

      <div className="space-y-1 max-h-48 overflow-y-auto">
        {results.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onNavigate?.(item.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-3 transition-all duration-150 ${
              index === selectedIndex ? 'scale-[1.02]' : 'hover:scale-[1.01]'
            }`}
            style={{
              backgroundColor: index === selectedIndex 
                ? (theme === 'dark' ? 'rgba(20, 255, 210, 0.15)' : 'rgba(20, 180, 160, 0.15)')
                : 'transparent',
            }}
          >
            <span className="text-base">{item.icon}</span>
            <span style={{ color: theme === 'dark' ? '#e0e0e0' : '#1a1a1a' }}>
              {item.title}
            </span>
            <span className={`ml-auto text-xs ${getCategoryColor(item.category)}`}>
              {item.category}
            </span>
          </button>
        ))}
      </div>

      {results.length === 0 && (
        <p className="text-center text-sm py-4" style={{ color: theme === 'dark' ? '#666' : '#999' }}>
          No results found
        </p>
      )}
    </div>
  );
}
