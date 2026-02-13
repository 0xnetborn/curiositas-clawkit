'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { animate, stagger } from 'animejs';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  action: () => void;
  category: string;
}

interface CommandPaletteProps {
  items: CommandItem[];
  placeholder?: string;
}

export default function CommandPalette({ items, placeholder = 'Type a command or search...' }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  // Filter items based on query
  const filteredItems = query
    ? items.filter(
        item =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  // Reset selection when query changes - handled in setQuery
  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    setSelectedIndex(0);
  }, []);

  // Open/close animation
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      animate('.command-item', {
        opacity: [0, 1],
        translateY: [10, 0],
        delay: stagger(30),
        easing: 'easeOutQuad',
        duration: 200,
      });
    }
  }, [isOpen, filteredItems.length]);

  // Global keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      // Close with Escape
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Navigate with arrow keys
  const handleKeyNavigation = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault();
        filteredItems[selectedIndex].action();
        setIsOpen(false);
        setQuery('');
      }
    },
    [filteredItems, selectedIndex]
  );

  // Scroll selected item into view
  useEffect(() => {
    const selectedEl = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    selectedEl?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm"
      onClick={() => {
        setIsOpen(false);
        setQuery('');
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className="w-full max-w-xl bg-[#0a0f1a] border border-teal-500/30 rounded-xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
        role="presentation"
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-teal-500/20">
          <svg
            className="w-5 h-5 text-teal-400 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyNavigation}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
            autoComplete="off"
            aria-label="Search commands"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-gray-400 bg-gray-800/50 rounded border border-gray-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-[50vh] overflow-y-auto py-2"
          role="listbox"
        >
          {filteredItems.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-400">
              No results found for &quot;{query}&quot;
            </div>
          ) : query ? (
            // Show flat list when searching
            filteredItems.map((item, index) => (
              <button
                key={item.id}
                data-index={index}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                  setQuery('');
                }}
                className={`command-item w-full flex items-center px-4 py-3 text-left transition-colors ${
                  index === selectedIndex
                    ? 'bg-teal-500/20 text-teal-300'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
                role="option"
                aria-selected={index === selectedIndex}
              >
                <span className="w-8 text-lg">{item.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  {item.description && (
                    <div className="text-sm text-gray-500">{item.description}</div>
                  )}
                </div>
                <span className="text-xs text-gray-500 px-2 py-1 bg-gray-800/50 rounded">
                  {item.category}
                </span>
              </button>
            ))
          ) : (
            // Show grouped when not searching
            Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div key={category} className="mb-2">
                <div className="px-4 py-2 text-xs font-semibold text-teal-400 uppercase tracking-wider">
                  {category}
                </div>
                {categoryItems.map((item) => {
                  const globalIndex = filteredItems.indexOf(item);
                  return (
                    <button
                      key={item.id}
                      data-index={globalIndex}
                      onClick={() => {
                        item.action();
                        setIsOpen(false);
                        setQuery('');
                      }}
                      className={`command-item w-full flex items-center px-4 py-3 text-left transition-colors ${
                        globalIndex === selectedIndex
                          ? 'bg-teal-500/20 text-teal-300'
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                      role="option"
                      aria-selected={globalIndex === selectedIndex}
                    >
                      <span className="w-8 text-lg">{item.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        {item.description && (
                          <div className="text-sm text-gray-500">{item.description}</div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-teal-500/20 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-800/50 rounded border border-gray-700">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-800/50 rounded border border-gray-700">↵</kbd>
              Select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-800/50 rounded border border-gray-700">⌘K</kbd>
            Toggle
          </span>
        </div>
      </div>
    </div>
  );
}
