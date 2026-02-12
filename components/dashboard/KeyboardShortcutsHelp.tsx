'use client';

import { useState, useEffect } from 'react';
import * as anime from 'animejs';

interface Shortcut {
  key: string;
  action: string;
  description: string;
}

export default function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const shortcuts: Shortcut[] = [
    { key: '⌘N', action: 'New Squad', description: 'Create a new agent squad' },
    { key: '⌘T', action: 'New Task', description: 'Queue a new task' },
    { key: '⌘S', action: 'Schedule', description: 'Open scheduling modal' },
    { key: '⌘E', action: 'Export', description: 'Export current configuration' },
    { key: '⌘/', action: 'Help', description: 'Show keyboard shortcuts' },
    { key: '⌘K', action: 'Command', description: 'Open command palette' },
    { key: '⌘P', action: 'Projects', description: 'Quick project switcher' },
    { key: 'Esc', action: 'Close', description: 'Close modal/panel' },
  ];

  const filteredShortcuts = shortcuts.filter(s =>
    s.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      anime.animate('.shortcut-row', {
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 300,
        delay: anime.stagger(50),
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center z-50"
      >
        <span className="text-lg">⌘/</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-teal-500/30 shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Keyboard Shortcuts</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <input
            type="text"
            placeholder="Search shortcuts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
            autoFocus
          />
        </div>

        {/* Shortcuts List */}
        <div className="max-h-80 overflow-y-auto p-4 space-y-2">
          {filteredShortcuts.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl mb-2 block">🔍</span>
              <p className="text-slate-400">No shortcuts found</p>
              <p className="text-slate-500 text-sm">Try a different search term</p>
            </div>
          ) : (
            filteredShortcuts.map((shortcut) => (
              <div
                key={shortcut.key}
                className="shortcut-row flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-white">{shortcut.action}</p>
                  <p className="text-xs text-slate-500">{shortcut.description}</p>
                </div>
                <kbd className="px-3 py-1 bg-slate-800 rounded-lg text-sm text-slate-300 font-mono border border-slate-700/50">
                  {shortcut.key}
                </kbd>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/50 bg-slate-800/30">
          <p className="text-xs text-slate-500 text-center">
            Press <kbd className="px-2 py-0.5 bg-slate-800 rounded text-slate-400 font-mono">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}
