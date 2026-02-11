'use client';

import { useEffect, useState, useCallback } from 'react';

interface Shortcut {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  const [helpVisible, setHelpVisible] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Ignore if typing in input
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      return;
    }

    // Toggle help with ?
    if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      setHelpVisible((prev) => !prev);
      return;
    }

    // Find matching shortcut
    const matching = shortcuts.find((s) => {
      const keyMatch = s.key.toLowerCase() === e.key.toLowerCase();
      const ctrlMatch = s.ctrl ? e.ctrlKey : !e.ctrlKey && !e.metaKey;
      const metaMatch = s.meta ? e.metaKey : true;
      const shiftMatch = s.shift ? e.shiftKey : !e.shiftKey;
      const altMatch = s.alt ? e.altKey : !e.altKey;
      return keyMatch && ctrlMatch && metaMatch && shiftMatch && altMatch;
    });

    if (matching) {
      e.preventDefault();
      matching.action();
    }
  }, [shortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { helpVisible, setHelpVisible };
}
