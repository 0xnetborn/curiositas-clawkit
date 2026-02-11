'use client';

import { animate } from 'animejs';
import { useEffect, useRef } from 'react';

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  { key: '?', description: 'Show/hide this help' },
  { key: 'N', description: 'New Squad' },
  { key: 'T', description: 'Create Task' },
  { key: 'S', description: 'Schedule' },
  { key: 'E', description: 'Export' },
  { key: 'G', description: 'Toggle Analytics' },
  { key: 'Esc', description: 'Close modal' },
];

export default function KeyboardShortcutsHelp({ isOpen, onClose }: KeyboardShortcutsHelpProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Animate in
      animate(backdropRef.current!, { opacity: [0, 1], duration: 200 });
      animate(modalRef.current!, { opacity: [0, 1], translateY: [20, 0], scale: [0.95, 1], duration: 200 });
    }
  }, [isOpen]);

  const handleClose = () => {
    // Animate out
    animate(backdropRef.current!, { opacity: 0, duration: 150 });
    (animate(modalRef.current!, { opacity: 0, translateY: 20, scale: 0.95, duration: 150 }) as unknown as { finished: Promise<void> }).finished.then(() => onClose());
  };

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md p-6 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-mono text-white">Keyboard Shortcuts</h2>
          <button
            onClick={handleClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((shortcut) => (
            <div key={shortcut.key} className="flex items-center justify-between group">
              <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                {shortcut.description}
              </span>
              <kbd className="px-2 py-1 text-xs font-mono text-teal-400 bg-white/5 border border-white/10 rounded">
                {shortcut.key === '?' ? '?' : shortcut.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-xs text-center text-white/30">
            Press <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-white/40 bg-white/5 border border-white/10 rounded">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}
